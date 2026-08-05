import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormArray, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-edit-profile',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css',
})
export class EditProfile {
  private fb = inject(FormBuilder);
  private service = inject(UserService);
  private router = inject(Router);

  errorMessage = '';
  user = this.service.user;

  profileForm = this.fb.group({
    date_of_birth: [this.user()?.date_of_birth || ''],
    phone_number: [this.user()?.phone_number || ''],
    address: [this.user()?.address || ''],
    educations: this.fb.array(this.user()?.educations || []),
    work_experiences: this.fb.array(this.user()?.work_experiences || []),
  });

  get educations(): FormArray {
    return this.profileForm.get('educations') as FormArray;
  }

  get workExperiences(): FormArray {
    return this.profileForm.get('work_experiences') as FormArray;
  }

  addEducation() {
    this.educations.push(
      this.fb.group({
        degree: ['', Validators.required],
        institution: ['', Validators.required],
        start_year: [null],
        end_year: [null],
      })
    );
  }

  removeEducation(index: number) {
    this.educations.removeAt(index);
  }

  addWorkExperience() {
    this.workExperiences.push(
      this.fb.group({
        title: ['', Validators.required],
        company: ['', Validators.required],
        start_date: [''],
        end_date: [''],
        is_current: [false],
      })
    );
  }

  removeWorkExperience(index: number) {
    this.workExperiences.removeAt(index);
  }

  onSubmit() {
    if (this.profileForm.invalid) return;
    const payload = {...this.user(), ...this.profileForm.value};

    this.service.updateUserProfile(payload as any)
      .subscribe({
        next: () => this.router.navigate(['/home']),
        error: () => this.errorMessage = 'Something went wrong. Try again.',
      });
  }
}
