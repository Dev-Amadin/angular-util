import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserInterface } from '../user-interface';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  route = inject(Router)

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required],
  })


  onSubmit():void {
    this.http.post<{user : UserInterface}>('https://api.realworld.io/api/users',{
       user: this.form.getRawValue()
      }).subscribe(response => {
        localStorage.setItem('token', response.user.token);
        this.authService.currentUserSig.set(response.user);
        this.route.navigateByUrl('/');
        console.log('response', response);
      });
  
  }
}
