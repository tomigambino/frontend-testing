import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Footer } from './components/footer/footer.component';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, Footer, NgIf, CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  protected title = 'frontend-testing';

  showNavbar = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // rutas donde NO quiero navbar
        this.showNavbar = !['/login', '/sign-up'].includes(event.urlAfterRedirects);
      }
    });
  }
}
