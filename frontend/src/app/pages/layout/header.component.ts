import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  path: string;
  label: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="bar">
        <a class="brand" routerLink="/group" aria-label="Rolls-Royce">
          <svg class="roundel" viewBox="0 0 100 116" role="img" aria-label="Rolls-Royce">
            <rect x="0" y="0" width="100" height="116" fill="#10069F" />
            <rect x="5" y="5" width="90" height="106" fill="none" stroke="#fff" stroke-width="3" />
            <text class="word" x="50" y="27">ROLLS</text>
            <line x1="14" y1="34" x2="86" y2="34" stroke="#fff" stroke-width="2.5" />
            <g class="monogram">
              <text x="-35" y="76" transform="scale(-1,1)">R</text>
              <text x="65" y="76">R</text>
            </g>
            <line x1="14" y1="85" x2="86" y2="85" stroke="#fff" stroke-width="2.5" />
            <text class="word" x="50" y="104">ROYCE</text>
          </svg>
          <span class="brand-text">Group Performance &amp; Transformation</span>
        </a>
        <div class="meta">
          <span class="period">H1 2026 &middot; reported 30 July 2026</span>
          <span class="divider"></span>
          <span class="region">GLOBAL</span>
        </div>
      </div>

      <nav class="nav">
        <a *ngFor="let item of nav" [routerLink]="item.path" routerLinkActive="active" class="nav-link">
          {{ item.label }}
        </a>
      </nav>
    </header>
  `,
  styles: [`
    .header {
      background: #fff; position: sticky; top: 0; z-index: 20;
      border-bottom: 1px solid var(--rr-border);
    }
    .bar {
      display: flex; align-items: center; justify-content: space-between;
      gap: 1.5rem; padding: 0.9rem 2rem 0.75rem;
    }
    .brand { display: flex; align-items: center; gap: 1rem; }
    .roundel { height: 54px; width: auto; display: block; }
    .roundel .word {
      fill: #fff; font-size: 19px; font-weight: 700; letter-spacing: 1px; text-anchor: middle;
    }
    .roundel .monogram text {
      fill: #fff; font-size: 42px; font-weight: 700; text-anchor: middle;
    }
    .brand-text {
      font-size: 1.05rem; font-weight: 600; color: var(--rr-blue); letter-spacing: -0.01em;
    }
    .meta { display: flex; align-items: center; gap: 0.85rem; color: var(--rr-muted); font-size: 0.75rem; }
    .divider { width: 1px; height: 14px; background: var(--rr-border); }
    .region { font-weight: 600; letter-spacing: 0.08em; color: var(--rr-blue); }
    .nav {
      display: flex; align-items: center; gap: 1.65rem;
      padding: 0 2rem; overflow-x: auto; scrollbar-width: none;
      &::-webkit-scrollbar { display: none; }
    }
    .nav-link {
      position: relative; white-space: nowrap; padding: 0.55rem 0 0.75rem;
      font-size: 0.9375rem; font-weight: 600; color: var(--rr-blue); opacity: 0.72;
      transition: opacity 0.15s;
    }
    .nav-link:hover { opacity: 1; }
    .nav-link.active { opacity: 1; }
    .nav-link.active::after {
      content: ''; position: absolute; left: 0; right: 0; bottom: 0;
      height: 3px; background: var(--rr-blue);
    }
  `]
})
export class HeaderComponent {
  nav: NavItem[] = [
    { path: '/group', label: 'Group' },
    { path: '/guidance', label: 'Guidance' },
    { path: '/civil-aerospace', label: 'Civil Aerospace' },
    { path: '/mro-operations', label: 'MRO Operations' },
    { path: '/defence', label: 'Defence' },
    { path: '/power-systems', label: 'Power Systems' },
    { path: '/nuclear', label: 'SMR & AMR' },
    { path: '/transformation', label: 'Transformation' },
    { path: '/risks', label: 'Risks' },
    { path: '/analytics', label: 'AiRR Analytics' }
  ];
}
