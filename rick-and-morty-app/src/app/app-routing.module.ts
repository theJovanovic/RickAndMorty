import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { LocationListComponent } from './components/location-list/location-list.component';
import { EpisodeListComponent } from './components/episode-list/episode-list.component';

const routes: Routes = [
  { path: 'characters/:page', component: CharacterListComponent },
  { path: 'locations/:page', component: LocationListComponent }, 
  { path: 'episodes/:page', component: EpisodeListComponent },
  { path: '', redirectTo: '/characters/1', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
