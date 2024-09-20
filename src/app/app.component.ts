import { Component, HostListener, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from './user-interface';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainComponent } from './main/main.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, SidebarComponent, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy{

  isSidebarCollapsed = signal<boolean>(false);
  screenWidth = signal<number>(window.innerWidth);

  authService = inject(AuthService);
  http = inject(HttpClient);
  route = inject(Router);

  ngOnInit(): void {
    this.http
      .get<{ user: UserInterface }>('https://api.realworld.io/api/user')
      .subscribe({
        next: (response) => {
          this.authService.currentUserSig.set(response.user);
        },
        error: () => {
          this.authService.currentUserSig.set(null);
          this.route.navigateByUrl('/login');
        },
      });

    this.isSidebarCollapsed.set(this.screenWidth() < 1250);
  }

  @HostListener('window: resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
    this.screenWidth() < 1250
      ? this.isSidebarCollapsed.set(true)
      : this.isSidebarCollapsed.set(false);
  }

  changeIsSidebarCollapsed(isSidebarCollapsed: boolean): void {
    this.isSidebarCollapsed.set(isSidebarCollapsed);
  }

  logout(): void {
    localStorage.setItem('token', '');
    this.authService.currentUserSig.set(null);
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
