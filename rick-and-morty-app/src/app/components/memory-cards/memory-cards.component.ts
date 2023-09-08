import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subject, debounceTime, delay, filter, map, tap, mergeMap, of } from 'rxjs'
import { Card } from 'src/app/models/Card';
import * as CharacterActions from "../../store/actions/character.actions"
import { Character } from 'src/app/models/Character';
import { selectCharacters } from 'src/app/store/selectors/character.selectors';

@Component({
  selector: 'app-memory-cards',
  templateUrl: './memory-cards.component.html',
  styleUrls: ['./memory-cards.component.css']
})
export class MemoryCardsComponent implements OnInit {

  canFlip = true;
  cards: Card[] = []
  public numCards: number = 6
  characters$!: Observable<Character[]>
  private flipCardSubject = new Subject<Card>()
  private flippedCardsSubject = new BehaviorSubject<Card[]>([])
  private resetGameSubject = new Subject<void>();

  constructor(private store: Store) { }

  flipCard(card: Card) {
    if (!this.canFlip || card.flipped) return;
    this.flipCardSubject.next(card);
  }

  ngOnInit() {

    // handle character fetching logic
    const characterIds: string = this.generateRandomNumbers(this.numCards)
    this.store.dispatch(CharacterActions.loadSpecificCharacters({ characterIds }))
    this.characters$ = this.store.select(selectCharacters)
    this.characters$.pipe(
      map((characters) => {
        let cards = characters.map(character => new Card(character.image, character.id))
        return cards.concat(cards.map(card => new Card(card.characterImage, card.characterId)))
      }),
      map((cards) => this.shuffle(cards)),
      tap((cards) => this.cards = cards)
    ).subscribe()


    // handle flipping logic
    this.flipCardSubject.pipe(
      tap((card: Card) => {
        card.flipped = true;
        const flipped = this.flippedCardsSubject.value;
        this.flippedCardsSubject.next([...flipped, card]);
      })
    ).subscribe()

    // handle match checking logic
    this.flippedCardsSubject.pipe(
      filter(cards => cards.length === 2),
      tap(() => this.canFlip = false),
      mergeMap((cards: Card[]) => {
        // If cards don't match, use the delay
        if (cards[0].characterId !== cards[1].characterId) {
          return of(cards).pipe(
            delay(1000)
          );
        }
        // If cards match, no delay
        return of(cards);
      }),
      tap((cards: Card[]) => {
        if (cards[0].characterId !== cards[1].characterId) {
          cards[0].flipped = false;
          cards[1].flipped = false;
        }
        this.flippedCardsSubject.next([]);
        this.canFlip = true;
      })
    ).subscribe();

    // handle game reset logic when all cards are flipped
    this.flippedCardsSubject.pipe(
      filter(_ => this.cards.length > 0 && this.cards.every(card => card.flipped)),
      tap(() => this.resetGameSubject.next())
    ).subscribe();

    // reset game logic
    this.resetGameSubject.pipe(
      debounceTime(1000),
      tap(() => {
        this.numCards += 6
        this.updateRoundCounter(this.numCards / 6)
        const characterIds: string = this.generateRandomNumbers(this.numCards)
        this.store.dispatch(CharacterActions.loadSpecificCharacters({ characterIds }))
        Card.idCounter = 0
      })
    ).subscribe();

  }

  private updateRoundCounter(round: number) {
    const counter = document.getElementById('round-header')
    counter!.innerText = `Round: ${round}`
  }

  private generateRandomNumbers(numCards: number): string {
    const numbers = new Set<number>();

    while (numbers.size < numCards / 2) {
      const randomNumber = Math.floor(Math.random() * 825) + 1;
      numbers.add(randomNumber);
    }

    return [...numbers].join(',');
  }

  private shuffle(cards: Card[]) {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]]
    }
    return cards;
  }


}
