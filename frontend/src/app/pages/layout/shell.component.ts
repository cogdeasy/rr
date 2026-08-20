import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './header.component';
import { SidebarComponent } from './sidebar.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent],
  template: `
    <div class="shell">
      <app-header></app-header>
      <div class="body">
        <app-sidebar></app-sidebar>
        <main class="content"><router-outlet></router-outlet></main>
      </div>
    </div>
  `,
  styles: [`
    .shell { display: flex; flex-direction: column; height: 100vh; }
    .body { display: flex; flex: 1; min-height: 0; }
    .content { flex: 1; overflow-y: auto; padding: 1.75rem 2rem 3rem; }
  `]
})
export class ShellComponent {}
