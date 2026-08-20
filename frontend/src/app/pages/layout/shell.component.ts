import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './header.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  template: `
    <div class="shell">
      <app-header></app-header>
      <main class="content"><router-outlet></router-outlet></main>
      <footer class="footer">
        <span>Rolls-Royce Holdings plc &middot; Group Performance &amp; Transformation Platform</span>
        <span>Illustrative platform built on the H1 2026 results</span>
      </footer>
    </div>
  `,
  styles: [`
    .shell { display: flex; flex-direction: column; min-height: 100vh; background: var(--rr-platinum); }
    .content { flex: 1; width: 100%; max-width: 1440px; margin: 0 auto; padding: 2rem 2rem 3.5rem; }
    .footer {
      display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap;
      padding: 1.25rem 2rem; background: var(--rr-blue); color: rgba(255,255,255,0.75);
      font-size: 0.75rem;
    }
  `]
})
export class ShellComponent {}
