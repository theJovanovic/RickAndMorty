import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CharacterListComponent } from './components/character-list/character-list.component'
import { LocationListComponent } from './components/location-list/location-list.component'
import { EpisodeListComponent } from './components/episode-list/episode-list.component'
import { MemoryCardsComponent } from './components/memory-cards/memory-cards.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { RegistrationComponent } from './components/registration/registration.component'
import { LoginComponent } from './components/login/login.component'

const routes: Routes = [
  { path: '', redirectTo: '/character', pathMatch: 'full' },
  { path: 'character', component: CharacterListComponent },
  { path: 'location', component: LocationListComponent },
  { path: 'episode', component: EpisodeListComponent },
  { path: 'memorycards', component: MemoryCardsComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
