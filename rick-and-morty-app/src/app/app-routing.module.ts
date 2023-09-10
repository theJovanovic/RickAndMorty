import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CharacterListComponent } from './components/character-list/character-list.component'
import { LocationListComponent } from './components/location-list/location-list.component'
import { EpisodeListComponent } from './components/episode-list/episode-list.component'
import { MemoryCardsComponent } from './components/memory-cards/memory-cards.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'

const routes: Routes = [
  { path: 'characters', component: CharacterListComponent },
  { path: 'locations', component: LocationListComponent },
  { path: 'episodes', component: EpisodeListComponent },
  { path: 'memorycards', component: MemoryCardsComponent },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
