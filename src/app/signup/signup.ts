import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup implements OnInit {

  constructor(private fb: FormBuilder) {}
   signupForm!: FormGroup;
  
   private userService = inject(UserService);
   private router = inject(Router);
  ngOnInit(): void {

  this.signupForm = this.fb.group({
  full_name: [''],
  email: ['', [Validators.required, Validators.email]],
  hashed_password: ['', [Validators.required, Validators.minLength(8)]],
  role: ['', Validators.required]
});
}

onSubmit() {
  const payload = this.signupForm.value as User;

  this.userService.signup(payload)
      .subscribe({
        next: (response) => {
          this.signupForm.reset();
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log('Error:', err);
        }
      });
}
}
