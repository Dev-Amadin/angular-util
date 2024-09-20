import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  isSidebarCollapsed = input.required<boolean>();
  changeIsSideBarCollapsed = output<boolean>();

  items = [
    {
      routerLink: '/dashboard',
      label: 'Home',
      icon: 'bi bi-house',
    },
    {
      routerLink: '/login',
      label: 'Login',
      icon: 'bi bi-box-arrow-in-right',
    },
    {
      routerLink: '/register',
      label: 'Register',
      icon: 'bi bi-pencil-square',
    },
    {
      routerLink: '/table-search',
      label: 'Table Search',
      icon: 'bi bi-table',
    },
  ];

  toggleCollapse(): void {
    this.changeIsSideBarCollapsed.emit(!this.isSidebarCollapsed());
  }

  closeSidebar(): void{
    this.changeIsSideBarCollapsed.emit(true);
  }
}
