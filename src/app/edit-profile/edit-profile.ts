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
    educations: this.fb.array(
      (this.user()?.educations || []).map(edu => this.createEducationGroup(edu))
    ),
    work_experiences: this.fb.array(
      (this.user()?.work_experiences || []).map(exp => this.createWorkExperienceGroup(exp))
    ),
  });

  get educations(): FormArray {
    return this.profileForm.get('educations') as FormArray;
  }

  get workExperiences(): FormArray {
    return this.profileForm.get('work_experiences') as FormArray;
  }

  addEducation() {
    this.educations.push(this.createEducationGroup());
  }

  removeEducation(index: number) {
    this.educations.removeAt(index);
  }

  addWorkExperience() {
    this.workExperiences.push(this.createWorkExperienceGroup());
  }

  removeWorkExperience(index: number) {
    this.workExperiences.removeAt(index);
  }

  onSubmit() {
    if (this.profileForm.invalid) return;
    const payload = { ...this.user(), ...this.profileForm.value };

    this.service.updateUserProfile(payload as any)
      .subscribe({
        next: () => this.router.navigate(['/home']),
        error: () => this.errorMessage = 'Something went wrong. Try again.',
      });
  }

  private createEducationGroup(edu?: any) {
    return this.fb.group({
      degree: [edu?.degree || '', Validators.required],
      institution: [edu?.institution || '', Validators.required],
      start_year: [edu?.start_year || null],
      end_year: [edu?.end_year || null],
    });
  }

  private createWorkExperienceGroup(exp?: any) {
    return this.fb.group({
      title: [exp?.title || '', Validators.required],
      company: [exp?.company || '', Validators.required],
      start_date: [exp?.start_date || ''],
      end_date: [exp?.end_date || ''],
      is_current: [exp?.is_current || false],
    });
  }
}
