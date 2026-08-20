import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="kpi" [class.accent]="accent">
      <span class="kpi-label">{{ label }}</span>
      <span class="kpi-value">{{ value }}</span>
      <span class="kpi-meta" *ngIf="meta">
        <span *ngIf="change !== undefined" [class]="change >= 0 ? 'delta-up' : 'delta-down'">
          {{ change >= 0 ? '+' : '' }}{{ change }}%
        </span>
        {{ meta }}
      </span>
    </div>
  `,
  styles: [`
    .kpi {
      display: flex; flex-direction: column; gap: 0.35rem;
      background: #fff; border: 1px solid var(--rr-border);
      border-left: 3px solid var(--rr-navy);
      border-radius: 0.5rem; padding: 1.125rem 1.25rem;
    }
    .kpi.accent { border-left-color: var(--rr-gold); }
    .kpi-label {
      font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.08em;
      text-transform: uppercase; color: var(--rr-muted);
    }
    .kpi-value { font-size: 1.5rem; font-weight: 600; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
    .kpi-meta { font-size: 0.75rem; color: var(--rr-muted); display: flex; gap: 0.35rem; }
  `]
})
export class KpiCardComponent {
  @Input() label = '';
  @Input() value: string | number = '';
  @Input() meta = '';
  @Input() change?: number;
  @Input() accent = false;
}

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="wrap">
      <div class="track"><div class="fill" [class.gold]="gold" [style.width.%]="clamped"></div></div>
      <span class="pct" *ngIf="showValue">{{ value | number: '1.0-1' }}%</span>
    </div>
  `,
  styles: [`
    .wrap { display: flex; align-items: center; gap: 0.5rem; min-width: 110px; }
    .track { flex: 1; height: 6px; background: var(--rr-silver-light); border-radius: 9999px; overflow: hidden; }
    .fill { height: 100%; background: var(--rr-navy); border-radius: 9999px; transition: width 0.4s ease; }
    .fill.gold { background: var(--rr-gold); }
    .pct { font-size: 0.75rem; font-variant-numeric: tabular-nums; color: var(--rr-muted); min-width: 38px; text-align: right; }
  `]
})
export class ProgressBarComponent {
  @Input() value = 0;
  @Input() gold = false;
  @Input() showValue = true;

  get clamped(): number {
    return Math.max(0, Math.min(100, this.value));
  }
}

export interface BarDatum {
  label: string;
  value: number;
  caption?: string;
}

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chart">
      <div class="row" *ngFor="let d of data">
        <span class="lbl" [title]="d.label">{{ d.label }}</span>
        <div class="track"><div class="fill" [class.gold]="gold" [style.width.%]="pct(d.value)"></div></div>
        <span class="val">{{ d.caption ?? (d.value | number: '1.0-1') }}</span>
      </div>
      <p class="empty" *ngIf="!data.length">No data available.</p>
    </div>
  `,
  styles: [`
    .chart { display: flex; flex-direction: column; gap: 0.6rem; }
    .row { display: grid; grid-template-columns: 150px 1fr 82px; align-items: center; gap: 0.75rem; }
    .lbl { font-size: 0.75rem; color: var(--rr-navy); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .track { height: 14px; background: var(--rr-platinum); border-radius: 3px; overflow: hidden; }
    .fill { height: 100%; background: linear-gradient(90deg, #001233, #002855); border-radius: 3px; transition: width 0.4s ease; }
    .fill.gold { background: linear-gradient(90deg, #B8860B, #D4A017); }
    .val { font-size: 0.75rem; text-align: right; font-variant-numeric: tabular-nums; font-weight: 600; }
    .empty { font-size: 0.8125rem; color: var(--rr-muted); }
  `]
})
export class BarChartComponent {
  @Input() data: BarDatum[] = [];
  @Input() gold = false;

  pct(value: number): number {
    const max = Math.max(...this.data.map(d => d.value), 1);
    return max <= 0 ? 0 : (value / max) * 100;
  }
}

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg class="line-chart" viewBox="0 0 320 140" preserveAspectRatio="none" role="img" [attr.aria-label]="ariaLabel">
      <line *ngFor="let g of gridLines" x1="0" [attr.y1]="g" x2="320" [attr.y2]="g" stroke="#E5E7EB" stroke-width="1" />
      <polyline [attr.points]="points" fill="none" stroke="#001233" stroke-width="2.5" />
      <polyline [attr.points]="areaPoints" fill="rgba(0,18,51,0.07)" stroke="none" />
    </svg>
  `,
  styles: [`
    .line-chart { width: 100%; height: 150px; display: block; }
  `]
})
export class LineChartComponent {
  @Input() series: { x: number; y: number }[] = [];
  @Input() ariaLabel = 'Trend chart';
  gridLines = [0, 35, 70, 105, 139];

  private scaled(): { x: number; y: number }[] {
    if (!this.series.length) {
      return [];
    }
    const xs = this.series.map(p => p.x);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const spanX = maxX - minX || 1;
    return this.series.map(p => ({
      x: ((p.x - minX) / spanX) * 320,
      y: 139 - (Math.max(0, Math.min(100, p.y)) / 100) * 139
    }));
  }

  get points(): string {
    return this.scaled().map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  }

  get areaPoints(): string {
    const pts = this.scaled();
    if (!pts.length) {
      return '';
    }
    return `0,139 ${pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')} 320,139`;
  }
}

@Component({
  selector: 'app-state-block',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="state" *ngIf="loading">Loading {{ subject }}…</div>
    <div class="state error" *ngIf="!loading && error">
      Unable to load {{ subject }}. Check that the API is running on http://localhost:5062.
    </div>
  `,
  styles: [`
    .state {
      padding: 1.25rem; border: 1px dashed var(--rr-border); border-radius: 0.5rem;
      color: var(--rr-muted); font-size: 0.875rem; background: #fff;
    }
    .state.error { border-color: #FCA5A5; color: var(--rr-destructive); background: #FEF2F2; }
  `]
})
export class StateBlockComponent {
  @Input() loading = false;
  @Input() error = false;
  @Input() subject = 'data';
}
