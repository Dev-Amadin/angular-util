import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  isSidebarCollapsed = input.required<boolean>();
  screenWidth = input.required<number>();

  sizeClass = computed(() => {
    const isSidebarCollapsed = this.isSidebarCollapsed();
    if (isSidebarCollapsed) {
      return '';
    }
    return this.screenWidth() > 1250 ? 'body-trimmed' : 'body-md-screen';
  });
}
