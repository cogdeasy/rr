import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiService } from '../../shared/services/api.service';
import { PrincipalRisk } from '../../shared/models/models';
import { StateBlockComponent } from '../../shared/components/ui.components';

@Component({
  selector: 'app-risks',
  standalone: true,
  imports: [CommonModule, StateBlockComponent],
  template: `
    <div class="page-header">
      <h1>Principal risks</h1>
      <p>Group principal risks with owners, current assessment and the mitigating actions reported at the half year.</p>
    </div>

    <app-state-block [loading]="loading" [error]="error" subject="principal risks"></app-state-block>

    <div class="card" *ngIf="risks.length">
      <table class="data-table">
        <thead>
          <tr><th>Risk</th><th>Category</th><th>Owner</th><th>Likelihood</th><th>Impact</th><th>Trend</th><th>Mitigation</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let r of risks">
            <td><strong>{{ r.name }}</strong></td>
            <td>{{ r.category }}</td>
            <td>{{ r.owner }}</td>
            <td><span class="badge" [ngClass]="severity(r.likelihood)">{{ r.likelihood }}</span></td>
            <td><span class="badge" [ngClass]="severity(r.impact)">{{ r.impact }}</span></td>
            <td>
              <span class="trend" [class.up]="r.trend === 'Increasing'" [class.down]="r.trend === 'Decreasing'">
                {{ arrow(r.trend) }} {{ r.trend }}
              </span>
            </td>
            <td class="muted mitigation">{{ r.mitigation }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .mitigation { max-width: 44ch; line-height: 1.5; }
    .trend { font-size: 0.75rem; font-weight: 600; }
    .trend.up { color: var(--rr-destructive); }
    .trend.down { color: var(--rr-success); }
  `]
})
export class RisksComponent implements OnInit {
  risks: PrincipalRisk[] = [];
  loading = true;
  error = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getRisks().subscribe({
      next: risks => {
        this.risks = risks;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  severity(level: string): string {
    if (level === 'High') {
      return 'red';
    }
    return level === 'Medium' ? 'amber' : 'green';
  }

  arrow(trend: string): string {
    if (trend === 'Increasing') {
      return '\u2191';
    }
    return trend === 'Decreasing' ? '\u2193' : '\u2192';
  }
}
