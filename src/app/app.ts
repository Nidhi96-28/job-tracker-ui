import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { Header } from './header/header';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private router = inject(Router);

  showHeader = signal(true);

  constructor() {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      let route = this.router.routerState.snapshot.root;
      while (route.firstChild) route = route.firstChild;
      this.showHeader.set(!route.data['hideHeader']);
    });
  }
}