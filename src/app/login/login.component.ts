import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserInterface } from '../user-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  route = inject(Router)

  form = this.fb.nonNullable.group({
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    this.http.post<{user : UserInterface}>('https://api.realworld.io/api/users/login',{
      user: this.form.getRawValue()
     }).subscribe(response => {
       localStorage.setItem('token', response.user.token);
       this.authService.currentUserSig.set(response.user);
       this.route.navigateByUrl('/');
       console.log('response', response);
     });
 
  }
}
