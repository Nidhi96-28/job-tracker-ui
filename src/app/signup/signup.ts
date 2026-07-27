import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup implements OnInit {

  constructor(private fb: FormBuilder) {}
   signupForm!: FormGroup;
  ngOnInit(): void {

  this.signupForm = this.fb.group({
  full_name: [''],
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(8)]],
});
}

onSubmit() {
  if (this.signupForm.valid) {
    console.log('Form Submitted!', this.signupForm.value);
  } else {
    console.log('Form is invalid');
  }
}
}
