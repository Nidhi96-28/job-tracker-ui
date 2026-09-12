import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../../../core/services/application.service';

@Component({
  selector: 'app-new-application',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-new-application.html',
  styleUrl: './add-new-application.css',
})
export class AddNewApplication implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(ApplicationService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  errorMessage = '';
  companies = signal<{ id: number; name: string }[]>([]);
  isOtherCompany = signal(false);

  applicationId: number | null = null;
  isEditMode = false;

  applicationForm = this.fb.group({
    company_id: [null as number | null],
    new_company_name: [''],
    role_title: ['', Validators.required],
    status: ['applied', Validators.required],
    applied_date: ['', Validators.required],
    job_url: [''],
    notes: [''],
  });

  ngOnInit() {
    this.service.getCompanies().subscribe(companies => this.companies.set(companies));

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.applicationId = Number(idParam);

      this.service.getApplication(this.applicationId).subscribe(app => {
        this.applicationForm.patchValue({
          company_id: app.company_id,
          role_title: app.role_title,
          status: app.status,
          applied_date: app.applied_date,
          job_url: app.job_url,
          notes: app.notes,
        });
      });
    }
  }

  onCompanyChange(value: string) {
    if (value === 'other') {
      this.isOtherCompany.set(true);
      this.applicationForm.patchValue({ company_id: null });
      this.applicationForm.get('new_company_name')?.setValidators(Validators.required);
    } else {
      this.isOtherCompany.set(false);
      this.applicationForm.patchValue({ company_id: Number(value), new_company_name: '' });
      this.applicationForm.get('new_company_name')?.clearValidators();
    }
    this.applicationForm.get('new_company_name')?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.applicationForm.invalid) return;

    if (this.isOtherCompany()) {
      const newName = this.applicationForm.value.new_company_name!;
      this.service.createCompany(newName).subscribe({
        next: (company) => {
          this.applicationForm.patchValue({ company_id: company.id });
          this.saveApplication();
        },
        error: () => (this.errorMessage = 'Could not add company. Try again.'),
      });
    } else {
      this.saveApplication();
    }
  }

  private saveApplication() {
    const { new_company_name, ...payload } = this.applicationForm.value;

    const request = this.isEditMode
      ? this.service.updateApplication(this.applicationId!, payload)
      : this.service.createApplication(payload);

    request.subscribe({
      next: () => this.router.navigateByUrl('/home'),
      error: () => (this.errorMessage = 'Something went wrong. Try again.'),
    });
  }
}