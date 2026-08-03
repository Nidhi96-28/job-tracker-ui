import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../core/services/user.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private userService = inject(UserService);

  user = this.userService.user;

  applicationCount = 0; // wire up to ApplicationService once available
  interviewCount = 0;
  offerCount = 0;

  profileIncomplete = computed(() => {
    const u = this.user();
    if (!u) return false;
    return !u.dateOfBirth || !u.phoneNumber || !u.address;
  });
}