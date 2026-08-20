import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="header">
      <a class="header-left" routerLink="/group">
        <span class="logo-rr">ROLLS-ROYCE</span>
        <span class="logo-divider"></span>
        <span class="logo-text">Group Performance &amp; Transformation</span>
      </a>
      <div class="header-right">
        <span class="period">H1 2026 &middot; Reported 30 July 2026</span>
        <span class="env-badge">LIVE</span>
        <div class="user-avatar" title="Group Strategy Office">GS</div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 1.5rem; height: 56px; background: #001233; color: #fff;
      border-bottom: 1px solid rgba(255,255,255,0.08); position: sticky; top: 0; z-index: 20;
    }
    .header-left { display: flex; align-items: center; gap: 0.75rem; }
    .logo-rr { font-size: 1.05rem; font-weight: 700; letter-spacing: 2px; color: #B8860B; }
    .logo-divider { width: 1px; height: 20px; background: rgba(255,255,255,0.2); }
    .logo-text { font-size: 0.85rem; font-weight: 500; opacity: 0.85; }
    .header-right { display: flex; align-items: center; gap: 1rem; }
    .period { font-size: 0.75rem; opacity: 0.65; }
    .env-badge {
      padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.65rem; font-weight: 600;
      background: rgba(16,185,129,0.2); color: #10b981; letter-spacing: 0.05em;
    }
    .user-avatar {
      width: 30px; height: 30px; border-radius: 50%; background: #B8860B; color: #fff;
      display: flex; align-items: center; justify-content: center;
      font-size: 0.7rem; font-weight: 600;
    }
  `]
})
export class HeaderComponent {}
