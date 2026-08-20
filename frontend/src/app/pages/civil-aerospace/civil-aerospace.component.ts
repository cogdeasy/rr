import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

import { ApiService } from '../../shared/services/api.service';
import { CivilAerospaceMetrics, EngineProgramme, TimeOnWingWorkstream } from '../../shared/models/models';
import {
  BarChartComponent, BarDatum, KpiCardComponent, ProgressBarComponent, StateBlockComponent
} from '../../shared/components/ui.components';

@Component({
  selector: 'app-civil-aerospace',
  standalone: true,
  imports: [CommonModule, RouterLink, KpiCardComponent, ProgressBarComponent, BarChartComponent, StateBlockComponent],
  template: `
    <div class="page-header">
      <h1>Civil Aerospace</h1>
      <p>
        Large engine flying hours are above 2019 levels and the aftermarket is scaling. The priority is durability:
        more than 100% improvement in time on wing across in-production engines by the end of 2027, while sustaining
        the effective elimination of aircraft on ground.
      </p>
    </div>

    <app-state-block [loading]="loading" [error]="error" subject="Civil Aerospace data"></app-state-block>

    <ng-container *ngIf="metrics as m">
      <div class="grid grid-4 block">
        <app-kpi-card label="Large engine EFH" [value]="m.largeEngineFlyingHoursMillions + 'm'"
          [meta]="m.largeEfhPercentOf2019 + '% of 2019 levels'"></app-kpi-card>
        <app-kpi-card label="Large engine OE deliveries" [value]="m.largeEngineOeDeliveries"
          [meta]="m.businessAviationOeDeliveries + ' business aviation & regional'"></app-kpi-card>
        <app-kpi-card label="Shop visits" [value]="m.largeEngineShopVisits + m.businessAviationShopVisits"
          [meta]="m.majorShopVisits + ' major workscopes'"></app-kpi-card>
        <app-kpi-card label="Aircraft on ground" [value]="m.aircraftOnGround"
          meta="Effectively eliminated" [accent]="true"></app-kpi-card>
        <app-kpi-card label="Large engine order book" [value]="(m.largeEngineOrderBook | number) + ' engines'"
          meta="Contracted deliveries"></app-kpi-card>
        <app-kpi-card label="Gross contractual margin improvement" [value]="'£' + m.grossContractualMarginImprovement + 'm'"
          [meta]="'£' + m.netContractualImprovement + 'm net of operational items'"></app-kpi-card>
        <app-kpi-card label="MRO output growth" [value]="m.mroOutputGrowthPercent + '%'"
          [meta]="'Refurbishments +' + m.refurbishmentGrowthPercent + '%'"></app-kpi-card>
        <app-kpi-card label="Net LTSA balance growth" [value]="'£' + m.netLtsaBalanceGrowth + 'm'"
          meta="Long-term service agreements"></app-kpi-card>
      </div>

      <div class="grid grid-2 block">
        <div class="card">
          <div class="card-header">
            <div>
              <h2>Time on wing programme</h2>
              <p>Durability uplift delivered against the 2027 target of more than 100%.</p>
            </div>
          </div>
          <app-bar-chart [data]="upliftChart" [gold]="true"></app-bar-chart>
        </div>
        <div class="card">
          <div class="card-header">
            <div>
              <h2>Engine flying hours by programme</h2>
              <p>Millions of engine flying hours in H1 2026.</p>
            </div>
          </div>
          <app-bar-chart [data]="efhChart"></app-bar-chart>
        </div>
      </div>
    </ng-container>

    <div class="card block" *ngIf="programmes.length">
      <div class="card-header">
        <div>
          <h2>Engine programmes</h2>
          <p>In-service fleet, durability status and order book by programme.</p>
        </div>
        <a class="btn-outline" routerLink="/mro-operations">Shop visit network</a>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>Programme</th>
            <th>Application</th>
            <th class="numeric">In service</th>
            <th class="numeric">Order book</th>
            <th class="numeric">EFH (m)</th>
            <th>Time on wing uplift</th>
            <th class="numeric">AOG</th>
            <th>Durability</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let p of programmes">
            <td>
              <strong>{{ p.name }}</strong>
              <div class="muted sub">{{ p.commentary }}</div>
            </td>
            <td>{{ p.application }}</td>
            <td class="numeric">{{ p.inServiceEngines | number }}</td>
            <td class="numeric">{{ p.orderBook | number }}</td>
            <td class="numeric">{{ p.engineFlyingHoursMillions }}</td>
            <td>
              <app-progress-bar [value]="upliftShare(p)" [gold]="true" [showValue]="false"></app-progress-bar>
              <span class="muted sub">{{ p.timeOnWingUpliftPercent }}% of {{ p.timeOnWingTargetPercent }}% target</span>
            </td>
            <td class="numeric">{{ p.aircraftOnGround }}</td>
            <td><span class="badge">{{ p.durabilityStatus }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="card" *ngIf="workstreams.length">
      <div class="card-header">
        <div>
          <h2>Durability workstreams</h2>
          <p>Hardware modifications and fleet penetration driving the time on wing target.</p>
        </div>
      </div>
      <div class="grid grid-2">
        <div class="workstream" *ngFor="let w of workstreams">
          <div class="ws-head">
            <div>
              <strong>{{ w.programme }} &middot; {{ w.modification }}</strong>
              <span class="muted sub">{{ w.phase }} &middot; target {{ w.targetDate }}</span>
            </div>
            <span class="badge" [ngClass]="workstreamStatusClass(w.status)">{{ w.status }}</span>
          </div>
          <p class="ws-desc">{{ w.description }}</p>
          <div class="ws-metrics">
            <div>
              <span class="lbl">Fleet penetration</span>
              <app-progress-bar [value]="w.fleetPenetrationPercent"></app-progress-bar>
            </div>
            <div>
              <span class="lbl">Durability uplift</span>
              <strong>+{{ w.durabilityUpliftPercent }}%</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .block { margin-bottom: 1.5rem; }
    .sub { display: block; font-size: 0.6875rem; margin-top: 0.15rem; max-width: 40ch; }
    .workstream { border: 1px solid var(--rr-border); border-radius: 0.5rem; padding: 1rem; }
    .ws-head { display: flex; justify-content: space-between; gap: 0.75rem; align-items: flex-start; }
    .ws-head strong { font-size: 0.875rem; }
    .ws-desc { font-size: 0.8125rem; color: var(--rr-muted); margin: 0.65rem 0 0.85rem; line-height: 1.5; }
    .ws-metrics { display: grid; grid-template-columns: 2fr 1fr; gap: 1rem; align-items: center; }
    .lbl {
      display: block; font-size: 0.625rem; font-weight: 600; letter-spacing: 0.08em;
      text-transform: uppercase; color: var(--rr-muted); margin-bottom: 0.3rem;
    }
  `]
})
export class CivilAerospaceComponent implements OnInit {
  metrics?: CivilAerospaceMetrics;
  programmes: EngineProgramme[] = [];
  workstreams: TimeOnWingWorkstream[] = [];
  upliftChart: BarDatum[] = [];
  efhChart: BarDatum[] = [];
  loading = true;
  error = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    forkJoin({
      metrics: this.api.getCivilMetrics(),
      programmes: this.api.getEngineProgrammes(),
      workstreams: this.api.getTimeOnWing()
    }).subscribe({
      next: ({ metrics, programmes, workstreams }) => {
        this.metrics = metrics;
        this.programmes = programmes;
        this.workstreams = workstreams;
        this.upliftChart = programmes
          .filter(p => p.timeOnWingTargetPercent > 0)
          .map(p => ({ label: p.name, value: p.timeOnWingUpliftPercent, caption: `+${p.timeOnWingUpliftPercent}%` }));
        this.efhChart = programmes
          .map(p => ({ label: p.name, value: p.engineFlyingHoursMillions, caption: `${p.engineFlyingHoursMillions}m` }));
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  workstreamStatusClass(status: string): string {
    const value = status.toLowerCase();
    if (value.includes('complete') || value.includes('in service') || value.includes('proven')) {
      return 'green';
    }
    return value.includes('on track') ? 'blue' : '';
  }

  upliftShare(p: EngineProgramme): number {
    return p.timeOnWingTargetPercent === 0 ? 0 : (p.timeOnWingUpliftPercent / p.timeOnWingTargetPercent) * 100;
  }
}
