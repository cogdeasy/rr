import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { ApiService } from '../../shared/services/api.service';
import { DefenceMetrics, DefenceProgramme, SectorBreakdown } from '../../shared/models/models';
import {
  BarChartComponent, BarDatum, KpiCardComponent, ProgressBarComponent, StateBlockComponent
} from '../../shared/components/ui.components';

@Component({
  selector: 'app-defence',
  standalone: true,
  imports: [CommonModule, FormsModule, KpiCardComponent, ProgressBarComponent, BarChartComponent, StateBlockComponent],
  template: `
    <div class="page-header">
      <h1>Defence</h1>
      <p>
        Defence spending commitments across NATO are converting into long-term programme funding. The order backlog
        stands at £17.5bn with around 90% order cover for the remainder of 2026, and autonomy is the key growth vector.
      </p>
    </div>

    <app-state-block [loading]="loading" [error]="error" subject="Defence data"></app-state-block>

    <div class="grid grid-4 block" *ngIf="metrics as m">
      <app-kpi-card label="Order intake" [value]="'£' + m.orderIntakeGbpBn + 'bn'" [meta]="m.bookToBill + 'x book to bill'"></app-kpi-card>
      <app-kpi-card label="Order backlog" [value]="'£' + m.orderBacklogGbpBn + 'bn'" [meta]="m.orderCoverPercent + '% cover for FY26'"></app-kpi-card>
      <app-kpi-card label="GCAP funding" [value]="'£' + m.gcapFundingGbpBn + 'bn'" meta="Through the end of the decade" [accent]="true"></app-kpi-card>
      <app-kpi-card label="UK autonomy funding" [value]="'£' + m.autonomyFundingGbpBn + 'bn'" meta="Autonomous collaborative platforms" [accent]="true"></app-kpi-card>
    </div>

    <div class="grid grid-2 block" *ngIf="metrics as m">
      <div class="card">
        <div class="card-header">
          <div><h2>Revenue growth by sector</h2><p>Organic growth, H1 2026.</p></div>
        </div>
        <app-bar-chart [data]="growthChart"></app-bar-chart>
      </div>
      <div class="card">
        <div class="card-header">
          <div><h2>Programme value by sector</h2><p>Contracted programme value, £m.</p></div>
        </div>
        <app-bar-chart [data]="sectorChart" [gold]="true"></app-bar-chart>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div>
          <h2>Programmes</h2>
          <p>Seeded from the H1 2026 programme commentary across combat, submarines, naval and transport.</p>
        </div>
        <div class="filters">
          <select [(ngModel)]="sectorFilter" (ngModelChange)="reload()" aria-label="Filter by sector">
            <option value="">All sectors</option>
            <option *ngFor="let s of sectors" [value]="s">{{ s }}</option>
          </select>
          <label class="toggle">
            <input type="checkbox" [(ngModel)]="autonomousOnly" (ngModelChange)="reload()" /> Autonomy only
          </label>
        </div>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>Programme</th>
            <th>Sector</th>
            <th>Customer</th>
            <th>Product</th>
            <th class="numeric">Value (£m)</th>
            <th>Phase</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let p of programmes">
            <td>
              <strong>{{ p.name }}</strong>
              <div class="muted sub">{{ p.latestMilestone }} &middot; {{ p.milestoneDate }}</div>
            </td>
            <td>
              {{ p.sector }}
              <span class="badge gold" *ngIf="p.autonomous">Autonomy</span>
            </td>
            <td>{{ p.customer }}</td>
            <td>{{ p.product }}</td>
            <td class="numeric">{{ p.orderValueGbpM | number }}</td>
            <td><span class="badge">{{ p.phase }}</span></td>
            <td><app-progress-bar [value]="p.progressPercent"></app-progress-bar></td>
          </tr>
          <tr *ngIf="!programmes.length && !loading">
            <td colspan="7" class="muted">No programmes match the current filters.</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .block { margin-bottom: 1.5rem; }
    .sub { display: block; font-size: 0.6875rem; margin-top: 0.15rem; }
    .filters { display: flex; align-items: center; gap: 0.75rem; }
    .filters select {
      padding: 0.4rem 0.6rem; font-size: 0.8125rem; border: 1px solid var(--rr-border);
      border-radius: 0.375rem; background: #fff; color: var(--rr-navy);
    }
    .toggle { display: flex; align-items: center; gap: 0.4rem; font-size: 0.8125rem; cursor: pointer; }
  `]
})
export class DefenceComponent implements OnInit {
  metrics?: DefenceMetrics;
  programmes: DefenceProgramme[] = [];
  breakdown: SectorBreakdown[] = [];
  growthChart: BarDatum[] = [];
  sectorChart: BarDatum[] = [];
  sectors: string[] = [];
  sectorFilter = '';
  autonomousOnly = false;
  loading = true;
  error = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    forkJoin({
      metrics: this.api.getDefenceMetrics(),
      programmes: this.api.getDefenceProgrammes(),
      breakdown: this.api.getSectorBreakdown()
    }).subscribe({
      next: ({ metrics, programmes, breakdown }) => {
        this.metrics = metrics;
        this.programmes = programmes;
        this.breakdown = breakdown;
        this.sectors = [...new Set(programmes.map(p => p.sector))];
        this.growthChart = [
          { label: 'Combat', value: metrics.combatGrowthPercent, caption: `${metrics.combatGrowthPercent}%` },
          { label: 'Submarines', value: metrics.submarinesGrowthPercent, caption: `${metrics.submarinesGrowthPercent}%` },
          { label: 'Transport', value: metrics.transportGrowthPercent, caption: `${metrics.transportGrowthPercent}%` },
          { label: 'Division total', value: metrics.revenueGrowthPercent, caption: `${metrics.revenueGrowthPercent}%` }
        ];
        this.sectorChart = breakdown.map(b => ({
          label: b.sector,
          value: b.valueGbpM,
          caption: `£${b.valueGbpM.toLocaleString()}m`
        }));
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  reload(): void {
    this.api.getDefenceProgrammes(this.sectorFilter || undefined, this.autonomousOnly ? true : undefined)
      .subscribe(programmes => (this.programmes = programmes));
  }
}
