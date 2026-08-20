import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

import { ApiService } from '../../shared/services/api.service';
import { CapitalPosition, CashFlowLine, GuidanceItem } from '../../shared/models/models';
import { KpiCardComponent, StateBlockComponent } from '../../shared/components/ui.components';

@Component({
  selector: 'app-guidance',
  standalone: true,
  imports: [CommonModule, RouterLink, KpiCardComponent, StateBlockComponent],
  template: `
    <div class="page-header">
      <h1>Guidance &amp; capital allocation</h1>
      <p>
        FY26 guidance was upgraded at the half year on the back of stronger aftermarket performance. Capital allocation
        remains balanced between reinvestment, the interim dividend and the multi-year buyback programme.
      </p>
    </div>

    <app-state-block [loading]="loading" [error]="error" subject="guidance and capital data"></app-state-block>

    <ng-container *ngIf="capital as c">
      <div class="grid grid-2 block">
        <div class="card" *ngFor="let g of guidance">
          <div class="card-header">
            <div>
              <h2>{{ g.metric }}</h2>
              <p>Upgraded from {{ g.previous }}</p>
            </div>
            <span class="badge gold">{{ g.upgraded }}</span>
          </div>
          <div class="split">
            <div>
              <span class="lbl">H1 2026 delivered</span>
              <span class="big">{{ g.halfYearActual }}{{ g.unit }}</span>
            </div>
            <div>
              <span class="lbl">Implied H2</span>
              <span class="big">
                {{ (g.lowerBound - g.halfYearActual) | number: '1.1-2' }}&ndash;{{ (g.upperBound - g.halfYearActual) | number: '1.1-2' }}{{ g.unit }}
              </span>
            </div>
            <div>
              <span class="lbl">H1 share of midpoint</span>
              <span class="big">{{ share(g) | number: '1.0-0' }}%</span>
            </div>
          </div>
          <a class="btn-outline" routerLink="/analytics">Model FY26 outcomes</a>
        </div>
      </div>

      <div class="grid grid-4 block">
        <app-kpi-card label="Net cash" [value]="'£' + (c.netCash | number) + 'm'" meta="30 June 2026"></app-kpi-card>
        <app-kpi-card label="Liquidity" [value]="'£' + (c.liquidity / 1000 | number: '1.1-1') + 'bn'" meta="Cash and undrawn facilities"></app-kpi-card>
        <app-kpi-card label="Gross debt" [value]="'£' + (c.grossDebt / 1000 | number: '1.1-1') + 'bn'" [meta]="'Lease liabilities £' + (c.leaseLiabilities / 1000 | number: '1.1-1') + 'bn'"></app-kpi-card>
        <app-kpi-card label="TCC / gross margin" [value]="c.tccGmRatio + 'x'" meta="Total underlying cash costs" [accent]="true"></app-kpi-card>
      </div>

      <div class="grid grid-2 block">
        <div class="card">
          <div class="card-header">
            <div>
              <h2>Shareholder returns</h2>
              <p>{{ c.buybackProgramme }}</p>
            </div>
          </div>
          <div class="returns">
            <div>
              <span class="lbl">Interim dividend</span>
              <span class="big">{{ c.interimDividendPence }}p</span>
              <span class="muted">per share</span>
            </div>
            <div>
              <span class="lbl">2026 buyback tranche</span>
              <span class="big">£{{ c.buybackTranche / 1000 | number: '1.1-1' }}bn</span>
              <span class="muted">£{{ c.buybackCompleted | number }}m completed</span>
            </div>
          </div>
          <div class="buyback">
            <div class="track"><div class="fill" [style.width.%]="buybackProgress"></div></div>
            <span class="muted">{{ buybackProgress | number: '1.0-0' }}% of the 2026 tranche complete</span>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <div>
              <h2>Credit ratings</h2>
              <p>Investment grade across all three agencies.</p>
            </div>
          </div>
          <table class="data-table">
            <thead>
              <tr><th>Agency</th><th>Rating</th><th>Outlook</th><th>Action</th></tr>
            </thead>
            <tbody>
              <tr *ngFor="let r of c.creditRatings">
                <td>{{ r.agency }}</td>
                <td><span class="badge gold">{{ r.rating }}</span></td>
                <td>{{ r.outlook }}</td>
                <td class="muted">{{ r.action }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div>
            <h2>Trading cash flow bridge</h2>
            <p>£m, H1 2026 against H1 2025.</p>
          </div>
        </div>
        <table class="data-table">
          <thead>
            <tr><th>Line</th><th class="numeric">H1 2026</th><th class="numeric">H1 2025</th><th class="numeric">Change</th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let line of cashFlow" [class.total]="line.isTotal">
              <td>{{ line.label }}</td>
              <td class="numeric">{{ line.currentPeriod | number }}</td>
              <td class="numeric">{{ line.priorPeriod | number }}</td>
              <td class="numeric" [class]="line.currentPeriod - line.priorPeriod >= 0 ? 'delta-up' : 'delta-down'">
                {{ line.currentPeriod - line.priorPeriod >= 0 ? '+' : '' }}{{ line.currentPeriod - line.priorPeriod | number }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ng-container>
  `,
  styles: [`
    .block { margin-bottom: 1.5rem; }
    .split { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; margin-bottom: 1.25rem; }
    .lbl {
      display: block; font-size: 0.625rem; font-weight: 600; letter-spacing: 0.08em;
      text-transform: uppercase; color: var(--rr-muted); margin-bottom: 0.25rem;
    }
    .big { display: block; font-size: 1.125rem; font-weight: 600; font-variant-numeric: tabular-nums; }
    .returns { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 1.25rem; }
    .returns .muted { font-size: 0.75rem; }
    .buyback .track { height: 8px; background: var(--rr-platinum); border-radius: 9999px; overflow: hidden; margin-bottom: 0.4rem; }
    .buyback .fill { height: 100%; background: var(--rr-gold); }
    .buyback .muted { font-size: 0.75rem; }
  `]
})
export class GuidanceComponent implements OnInit {
  guidance: GuidanceItem[] = [];
  capital?: CapitalPosition;
  cashFlow: CashFlowLine[] = [];
  loading = true;
  error = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    forkJoin({
      guidance: this.api.getGuidance(),
      capital: this.api.getCapital(),
      summary: this.api.getGroupSummary()
    }).subscribe({
      next: ({ guidance, capital, summary }) => {
        this.guidance = guidance;
        this.capital = capital;
        this.cashFlow = summary.tradingCashFlow;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  share(g: GuidanceItem): number {
    const midpoint = (g.lowerBound + g.upperBound) / 2;
    return midpoint === 0 ? 0 : (g.halfYearActual / midpoint) * 100;
  }

  get buybackProgress(): number {
    if (!this.capital?.buybackTranche) {
      return 0;
    }
    return (this.capital.buybackCompleted / this.capital.buybackTranche) * 100;
  }
}
