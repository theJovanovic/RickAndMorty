import { Component } from '@angular/core'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  navigateToCharacters() {
    window.location.href = `/character`
  }

  navigateToEpisodes() {
    window.location.href = `/episode`
  }

  navigateToLocations() {
    window.location.href = `/location`
  }
}
