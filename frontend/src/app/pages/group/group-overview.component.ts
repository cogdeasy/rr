import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ApiService } from '../../shared/services/api.service';
import { GroupSummary, GuidanceItem } from '../../shared/models/models';
import { BarChartComponent, BarDatum, KpiCardComponent, StateBlockComponent } from '../../shared/components/ui.components';
import { formatUnit } from '../../shared/format';

@Component({
  selector: 'app-group-overview',
  standalone: true,
  imports: [CommonModule, RouterLink, KpiCardComponent, BarChartComponent, StateBlockComponent],
  template: `
    <app-state-block [loading]="loading" [error]="error" subject="group results"></app-state-block>

    <ng-container *ngIf="summary as s">
      <section class="hero gradient-hero">
        <div class="section-label light"><span class="line"></span><span>{{ s.period }} results</span></div>
        <h1>{{ s.headline }}</h1>
        <p class="quote">&ldquo;{{ s.ceoQuote }}&rdquo;</p>
        <span class="attrib">Tufan Erginbilgic, Chief Executive &middot; reported {{ s.reportDate }}</span>
      </section>

      <div class="grid grid-4 block">
        <app-kpi-card
          *ngFor="let m of s.headlineMetrics"
          [label]="m.label"
          [value]="m.value"
          [change]="m.changePercent"
          [meta]="'vs ' + m.priorValue + ' ' + m.priorLabel">
        </app-kpi-card>
      </div>

      <div class="grid grid-2 block">
        <div class="card">
          <div class="card-header">
            <div>
              <h2>FY26 guidance</h2>
              <p>Upgraded at the half year, with H1 delivery against each range.</p>
            </div>
            <a class="btn-outline" routerLink="/guidance">Scenario model</a>
          </div>
          <div class="guidance" *ngFor="let g of s.guidance">
            <div class="guidance-head">
              <span class="metric">{{ g.metric }}</span>
              <span class="badge gold">{{ g.upgraded }}</span>
            </div>
            <div class="range">
              <div class="range-track">
                <div class="range-band" [style.left.%]="position(g.lowerBound, g)"
                  [style.width.%]="position(g.upperBound, g) - position(g.lowerBound, g)"></div>
                <div class="range-marker" [style.left.%]="position(g.halfYearActual, g)"></div>
              </div>
              <div class="range-labels">
                <span>H1 {{ amount(g.halfYearActual, g.unit, 3) }}</span>
                <span>guidance {{ amount(g.lowerBound, g.unit) }}&ndash;{{ amount(g.upperBound, g.unit) }} &middot; previously {{ g.previous }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <div>
              <h2>Trading cash flow by division</h2>
              <p>£m, H1 2026 against H1 2025.</p>
            </div>
          </div>
          <app-bar-chart [data]="cashFlowChart"></app-bar-chart>
        </div>
      </div>

      <div class="section-label"><span class="line"></span><span>Divisional performance</span></div>
      <div class="grid grid-2 block">
        <div class="card division" *ngFor="let d of s.divisions">
          <div class="division-head">
            <h2>{{ d.name }}</h2>
            <span class="badge" [class.green]="d.operatingMarginPercent >= 20">
              {{ d.operatingMarginPercent }}% margin
            </span>
          </div>
          <div class="division-metrics">
            <div>
              <span class="lbl">Revenue</span>
              <span class="val">£{{ d.underlyingRevenue | number }}m</span>
              <span [class]="d.revenueOrganicChangePercent >= 0 ? 'delta-up' : 'delta-down'">
                {{ d.revenueOrganicChangePercent >= 0 ? '+' : '' }}{{ d.revenueOrganicChangePercent }}% organic
              </span>
            </div>
            <div>
              <span class="lbl">Operating profit</span>
              <span class="val">£{{ d.underlyingOperatingProfit | number }}m</span>
              <span [class]="d.profitOrganicChangePercent >= 0 ? 'delta-up' : 'delta-down'">
                {{ d.profitOrganicChangePercent >= 0 ? '+' : '' }}{{ d.profitOrganicChangePercent }}% organic
              </span>
            </div>
            <div>
              <span class="lbl">Trading cash flow</span>
              <span class="val">£{{ d.tradingCashFlow | number }}m</span>
            </div>
          </div>
          <p class="summary">{{ d.summary }}</p>
          <ul class="priorities">
            <li *ngFor="let p of d.priorities">{{ p }}</li>
          </ul>
        </div>
      </div>
    </ng-container>
  `,
  styles: [`
    .hero {
      border-radius: 0.75rem; padding: 2rem 2.25rem; color: #fff; margin-bottom: 1.5rem;
      h1 { font-size: 1.6rem; font-weight: 600; letter-spacing: -0.01em; max-width: 46ch; }
      .quote { margin-top: 1rem; font-size: 0.9375rem; line-height: 1.6; opacity: 0.82; max-width: 90ch; }
      .attrib { display: block; margin-top: 0.85rem; font-size: 0.75rem; opacity: 0.55; }
    }
    .section-label.light span { color: rgba(255,255,255,0.65); }
    .section-label.light .line { background: rgba(255,255,255,0.4); }
    .block { margin-bottom: 1.5rem; }
    .guidance { padding: 0.9rem 0; border-bottom: 1px solid var(--rr-border); }
    .guidance:last-child { border-bottom: none; padding-bottom: 0; }
    .guidance-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.7rem; }
    .metric { font-size: 0.875rem; font-weight: 500; }
    .range-track { position: relative; height: 8px; background: var(--rr-platinum); border-radius: 9999px; }
    .range-band {
      position: absolute; top: 0; bottom: 0;
      background: rgba(16,6,159,0.28); border-radius: 9999px;
    }
    .range-marker {
      position: absolute; top: -3px; width: 3px; height: 14px; background: var(--rr-navy); border-radius: 2px;
    }
    .range-labels {
      display: flex; justify-content: space-between; margin-top: 0.45rem;
      font-size: 0.75rem; color: var(--rr-muted);
    }
    .division-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
    .division-head h2 { font-size: 1rem; font-weight: 600; }
    .division-metrics {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; margin-bottom: 1rem;
      > div { display: flex; flex-direction: column; gap: 0.15rem; font-size: 0.75rem; }
      .lbl { color: var(--rr-muted); text-transform: uppercase; letter-spacing: 0.06em; font-size: 0.625rem; font-weight: 600; }
      .val { font-size: 1rem; font-weight: 600; font-variant-numeric: tabular-nums; }
    }
    .summary { font-size: 0.8125rem; color: var(--rr-muted); line-height: 1.55; }
    .priorities {
      margin-top: 0.9rem; padding-left: 1rem; display: flex; flex-direction: column; gap: 0.35rem;
      li { font-size: 0.8125rem; line-height: 1.45; }
      li::marker { color: var(--rr-gold); }
    }
  `]
})
export class GroupOverviewComponent implements OnInit {
  amount = formatUnit;

  summary?: GroupSummary;
  cashFlowChart: BarDatum[] = [];
  loading = true;
  error = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getGroupSummary().subscribe({
      next: summary => {
        this.summary = summary;
        this.cashFlowChart = summary.tradingCashFlow
          .filter(line => !line.isTotal)
          .map(line => ({
            label: line.label,
            value: Math.abs(line.currentPeriod),
            caption: `£${line.currentPeriod}m`
          }));
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  /** Positions a value on a 0 to upper-bound-plus-headroom track. */
  position(value: number, guidance: GuidanceItem): number {
    const scale = guidance.upperBound * 1.15;
    return scale <= 0 ? 0 : Math.max(0, Math.min(100, (value / scale) * 100));
  }
}
