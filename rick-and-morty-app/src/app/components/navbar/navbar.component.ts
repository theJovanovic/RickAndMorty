import { Component } from '@angular/core'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  navigateToCharacters() {
    window.location.href = `/characters/?page=1`
  }

  navigateToEpisodes() {
    window.location.href = `/episodes/?page=1`
  }

  navigateToLocations() {
    window.location.href = `/locations/?page=1`
  }
}
