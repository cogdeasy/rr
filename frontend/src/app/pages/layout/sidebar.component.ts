import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  path: string;
  label: string;
  icon: string;
  caption: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="sidebar">
      <p class="nav-group">Group</p>
      <a *ngFor="let item of groupNav" [routerLink]="item.path" routerLinkActive="active" class="nav-item">
        <span class="icon">{{ item.icon }}</span>
        <span class="labels">
          <span class="label">{{ item.label }}</span>
          <span class="caption">{{ item.caption }}</span>
        </span>
      </a>
      <p class="nav-group">Divisions</p>
      <a *ngFor="let item of divisionNav" [routerLink]="item.path" routerLinkActive="active" class="nav-item">
        <span class="icon">{{ item.icon }}</span>
        <span class="labels">
          <span class="label">{{ item.label }}</span>
          <span class="caption">{{ item.caption }}</span>
        </span>
      </a>
      <p class="nav-group">Transformation</p>
      <a *ngFor="let item of transformNav" [routerLink]="item.path" routerLinkActive="active" class="nav-item">
        <span class="icon">{{ item.icon }}</span>
        <span class="labels">
          <span class="label">{{ item.label }}</span>
          <span class="caption">{{ item.caption }}</span>
        </span>
      </a>
    </nav>
  `,
  styles: [`
    .sidebar {
      width: 244px; flex-shrink: 0; background: #fff; border-right: 1px solid var(--rr-border);
      padding: 1rem 0.75rem 2rem; overflow-y: auto;
    }
    .nav-group {
      font-size: 0.625rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
      color: var(--rr-silver-dark); padding: 0.75rem 0.75rem 0.4rem;
    }
    .nav-item {
      display: flex; align-items: center; gap: 0.7rem; padding: 0.55rem 0.75rem;
      border-radius: 0.375rem; transition: background 0.15s; cursor: pointer;
    }
    .nav-item:hover { background: var(--rr-platinum); }
    .nav-item.active { background: var(--rr-navy); color: #fff; }
    .nav-item.active .caption { color: rgba(255,255,255,0.6); }
    .icon { font-size: 0.95rem; width: 18px; text-align: center; }
    .labels { display: flex; flex-direction: column; }
    .label { font-size: 0.8125rem; font-weight: 500; }
    .caption { font-size: 0.6875rem; color: var(--rr-muted); }
  `]
})
export class SidebarComponent {
  groupNav: NavItem[] = [
    { path: '/group', label: 'Group performance', icon: '\u25C6', caption: 'H1 2026 results' },
    { path: '/guidance', label: 'Guidance & capital', icon: '\u00A3', caption: 'FY26 outlook' }
  ];

  divisionNav: NavItem[] = [
    { path: '/civil-aerospace', label: 'Civil Aerospace', icon: '\u2708', caption: 'Fleet & durability' },
    { path: '/mro-operations', label: 'MRO operations', icon: '\u2699', caption: 'Shop visit network' },
    { path: '/defence', label: 'Defence', icon: '\u25B2', caption: 'Programmes & backlog' },
    { path: '/power-systems', label: 'Power Systems', icon: '\u26A1', caption: 'Orders & BESS' },
    { path: '/nuclear', label: 'SMR & AMR', icon: '\u2622', caption: 'Nuclear pipeline' }
  ];

  transformNav: NavItem[] = [
    { path: '/transformation', label: 'Strategic pillars', icon: '\u25A6', caption: 'Initiatives' },
    { path: '/risks', label: 'Principal risks', icon: '\u26A0', caption: 'Mitigations' },
    { path: '/analytics', label: 'AiRR analytics', icon: '\u25D4', caption: 'Predictive models' }
  ];
}
