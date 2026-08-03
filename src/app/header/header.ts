import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../core/services/user.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private userService = inject(UserService);
  private router = inject(Router);
  private elementRef = inject(ElementRef);

  user = this.userService.user;
  isOpen = signal(false);

  toggleDropdown() {
    this.isOpen.update(v => !v);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  logout() {
    this.userService.logout().subscribe({
      next: () => {
        this.isOpen.set(false);
        this.router.navigateByUrl('/login');
      },
      error: () => {
        this.isOpen.set(false);
        this.router.navigateByUrl('/login');
      },
    });
  }
}