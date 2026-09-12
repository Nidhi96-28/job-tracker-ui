import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { UserService } from '../../../core/services/user.service';
import { ApplicationService } from '../../../core/services/application.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private userService = inject(UserService);
  private applicationService = inject(ApplicationService);
  private router = inject(Router);

  user = this.userService.user;
  applications = signal<any[]>([]);
  companyMap = signal<Record<number, string>>({});
  loading = signal(true);

  applicationCount = computed(() => this.applications().length);
  interviewCount = computed(() => this.applications().filter(a => a.status === 'interview').length);
  offerCount = computed(() => this.applications().filter(a => a.status === 'offer').length);

  profileIncomplete = computed(() => {
    const u = this.user();
    if (!u) return false;
    return !u.date_of_birth || !u.phone_number || !u.address;
  });

  ngOnInit() {
    forkJoin({
      companies: this.applicationService.getCompanies(),
      applications: this.applicationService.getApplications(),
    }).subscribe({
      next: ({ companies, applications }) => {
        const map: Record<number, string> = {};
        companies.forEach((c: any) => (map[c.id] = c.name));
        this.companyMap.set(map);
        this.applications.set(applications);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  companyName(id: number): string {
    return this.companyMap()[id] ?? 'Unknown company';
  }

  editApplication(id: number) {
    this.router.navigateByUrl(`/applications/${id}/edit`);
  }

  confirmDelete(id: number) {
    if (!confirm('Delete this application? This cannot be undone.')) return;

    this.applicationService.deleteApplication(id).subscribe({
      next: () => {
        this.applications.update(apps => apps.filter(a => a.id !== id));
      },
      error: () => alert('Could not delete application. Try again.'),
    });
  }
}