import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs'
import { RickMortyApiService } from 'src/app/services/rick-morty-api.service';

@Component({
  selector: 'app-navigation-buttons',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() currentPage: number = 1;
  @Input() type: 'characters' | 'locations' | 'episodes' | undefined;
  totalPages: number = 1;

  constructor(private router: Router, private apiService: RickMortyApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const pageFromUrl = Number(params.get('page'));
      if (pageFromUrl) {
        this.currentPage = pageFromUrl;
      }
    });

    switch (this.type) {
      case 'characters':
        this.apiService.getCharacterPages().pipe(
          tap((result) => this.totalPages = result)
        ).subscribe()
        break;
      case 'locations':
        this.apiService.getLocationPages().pipe(
          tap((result) => this.totalPages = result)
        ).subscribe()
        break;
      case 'episodes':
        this.apiService.getEpisodePages().pipe(
          tap((result) => this.totalPages = result)
        ).subscribe()
        break;
      default:
        break;
    }
  }

  navigate(direction: number): void {
    this.currentPage += direction;
    this.currentPage = Math.max(this.currentPage, 1);
    this.currentPage = Math.min(this.currentPage, this.totalPages);
    this.router.navigate([`/${this.type}`, this.currentPage]);
  }
}
