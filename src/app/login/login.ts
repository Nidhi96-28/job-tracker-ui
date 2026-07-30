import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {

  constructor(private fb: FormBuilder) { }
  loginForm!: FormGroup;

  private service = inject(AuthService);
  private router = inject(Router)

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  onSubmit() {
    const payload = this.loginForm.value as LoginUser;
    if (this.loginForm.valid) {
      this.service.login(payload).subscribe(
        {
          next: (response) => {
            this.loginForm.reset();
            this.router.navigate(["/home"]);
            
          },
          error: (err) => {
            console.log('Error ', err);
          }
        }
      )
    }
  }
}
