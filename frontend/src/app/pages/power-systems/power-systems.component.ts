import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { ApiService } from '../../shared/services/api.service';
import {
  BessProject, CreatePowerOrderRequest, OrderStage, PipelineSummary, PowerOrder, PowerSystemsMetrics
} from '../../shared/models/models';
import {
  BarChartComponent, BarDatum, KpiCardComponent, StateBlockComponent
} from '../../shared/components/ui.components';

@Component({
  selector: 'app-power-systems',
  standalone: true,
  imports: [CommonModule, FormsModule, KpiCardComponent, BarChartComponent, StateBlockComponent],
  template: `
    <div class="page-header">
      <h1>Power Systems</h1>
      <p>
        Order intake of £4.6bn at a 1.8x book to bill, led by data centre power generation and governmental demand.
        The pipeline board below tracks opportunities from qualification through to delivery.
      </p>
    </div>

    <app-state-block [loading]="loading" [error]="error" subject="Power Systems data"></app-state-block>

    <div class="grid grid-4 block" *ngIf="metrics as m">
      <app-kpi-card label="Order intake" [value]="'£' + m.orderIntakeGbpBn + 'bn'" [meta]="m.bookToBill + 'x book to bill'"></app-kpi-card>
      <app-kpi-card label="Power generation orders" [value]="'+' + m.powerGenerationOrderGrowthPercent + '%'"
        [meta]="'Revenue +' + m.powerGenerationRevenueGrowthPercent + '%'" [accent]="true"></app-kpi-card>
      <app-kpi-card label="Governmental orders" [value]="'+' + m.governmentalOrderGrowthPercent + '%'"
        [meta]="'Revenue +' + m.governmentalRevenueGrowthPercent + '%'"></app-kpi-card>
      <app-kpi-card label="OE order cover" [value]="m.orderCover2026Percent + '% (2026)'"
        [meta]="'>' + m.orderCover2027Percent + '% of 2027 covered'"></app-kpi-card>
    </div>

    <div class="grid grid-2 block" *ngIf="pipeline as p">
      <div class="card">
        <div class="card-header">
          <div>
            <h2>Pipeline by stage</h2>
            <p>£{{ p.wonValueGbpM | number }}m won &middot; £{{ p.openPipelineGbpM | number }}m still open.</p>
          </div>
        </div>
        <app-bar-chart [data]="stageChart"></app-bar-chart>
      </div>
      <div class="card">
        <div class="card-header">
          <div><h2>Value by segment</h2><p>Contracted and pipeline value, £m.</p></div>
        </div>
        <app-bar-chart [data]="segmentChart" [gold]="true"></app-bar-chart>
      </div>
    </div>

    <div class="card block">
      <div class="card-header">
        <div>
          <h2>Log an opportunity</h2>
          <p>Adds an order to the pipeline board; stages can then be advanced as the deal progresses.</p>
        </div>
      </div>
      <form class="form-grid" (ngSubmit)="create()" #orderForm="ngForm">
        <div class="form-group">
          <label for="customer">Customer</label>
          <input id="customer" name="customer" required [(ngModel)]="draft.customer" placeholder="Hyperscale data centre operator" />
        </div>
        <div class="form-group">
          <label for="segment">Segment</label>
          <select id="segment" name="segment" [(ngModel)]="draft.segment" required>
            <option *ngFor="let s of segmentOptions" [value]="s">{{ s }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="application">Application</label>
          <input id="application" name="application" required [(ngModel)]="draft.application" placeholder="Data centre backup power" />
        </div>
        <div class="form-group">
          <label for="product">Product</label>
          <input id="product" name="product" required [(ngModel)]="draft.product" placeholder="mtu Series 4000" />
        </div>
        <div class="form-group">
          <label for="value">Value (£m)</label>
          <input id="value" name="value" type="number" min="0" required [(ngModel)]="draft.valueGbpM" />
        </div>
        <div class="form-group">
          <label for="units">Units</label>
          <input id="units" name="units" type="number" min="0" [(ngModel)]="draft.units" />
        </div>
        <div class="form-group">
          <label for="region">Region</label>
          <select id="region" name="region" [(ngModel)]="draft.region">
            <option *ngFor="let r of regionOptions" [value]="r">{{ r }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="delivery">Expected delivery</label>
          <input id="delivery" name="delivery" [(ngModel)]="draft.expectedDelivery" placeholder="2027" />
        </div>
        <div class="form-group">
          <label for="stage">Stage</label>
          <select id="stage" name="stage" [(ngModel)]="draft.stage">
            <option *ngFor="let s of stageOptions" [value]="s">{{ s }}</option>
          </select>
        </div>
        <div class="actions">
          <button class="btn-navy" type="submit" [disabled]="orderForm.invalid || saving">
            {{ saving ? 'Saving…' : 'Add to pipeline' }}
          </button>
          <span class="muted" *ngIf="message">{{ message }}</span>
        </div>
      </form>
    </div>

    <div class="card block">
      <div class="card-header">
        <div><h2>Order pipeline</h2><p>Advance an opportunity to the next stage as it converts.</p></div>
        <div class="filters">
          <select [(ngModel)]="segmentFilter" (ngModelChange)="reload()" aria-label="Filter by segment">
            <option value="">All segments</option>
            <option *ngFor="let s of segmentOptions" [value]="s">{{ s }}</option>
          </select>
          <select [(ngModel)]="stageFilter" (ngModelChange)="reload()" aria-label="Filter by stage">
            <option value="">All stages</option>
            <option *ngFor="let s of stageOptions" [value]="s">{{ s }}</option>
          </select>
        </div>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Segment</th>
            <th>Product</th>
            <th>Region</th>
            <th class="numeric">Value (£m)</th>
            <th class="numeric">Units</th>
            <th>Stage</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let o of orders">
            <td>
              <strong>{{ o.customer }}</strong>
              <div class="muted sub">{{ o.application }}<span *ngIf="o.frameworkAgreement"> &middot; framework</span></div>
            </td>
            <td>{{ o.segment }}</td>
            <td>{{ o.product }}</td>
            <td>{{ o.region }}</td>
            <td class="numeric">{{ o.valueGbpM | number }}</td>
            <td class="numeric">{{ o.units | number }}</td>
            <td><span class="badge" [ngClass]="o.stage.toLowerCase()">{{ o.stage }}</span></td>
            <td class="row-actions">
              <button class="btn-outline" (click)="advance(o)" [disabled]="o.stage === 'Delivered'">Advance</button>
            </td>
          </tr>
          <tr *ngIf="!orders.length && !loading">
            <td colspan="8" class="muted">No orders match the current filters.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="card" *ngIf="bess.length">
      <div class="card-header">
        <div>
          <h2>Battery energy storage</h2>
          <p>{{ totalBessMwh | number }} MWh contracted across the European BESS portfolio.</p>
        </div>
      </div>
      <table class="data-table">
        <thead>
          <tr><th>Project</th><th>Customer</th><th>Country</th><th class="numeric">Capacity (MWh)</th><th>Grid connection</th><th>Status</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let b of bess">
            <td><strong>{{ b.name }}</strong></td>
            <td>{{ b.customer }}</td>
            <td>{{ b.country }}</td>
            <td class="numeric">{{ b.capacityMwh | number }}</td>
            <td>{{ b.gridConnection }}</td>
            <td><span class="badge" [class.green]="b.status === 'Operational'">{{ b.status }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .block { margin-bottom: 1.5rem; }
    .sub { display: block; font-size: 0.6875rem; margin-top: 0.15rem; }
    .form-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0 1rem; }
    .actions { grid-column: 1 / -1; display: flex; align-items: center; gap: 1rem; margin-top: 0.5rem; }
    .actions .muted { font-size: 0.8125rem; }
    .filters { display: flex; gap: 0.5rem; }
    .filters select {
      padding: 0.4rem 0.6rem; font-size: 0.8125rem; border: 1px solid var(--rr-border);
      border-radius: 0.375rem; background: #fff; color: var(--rr-navy);
    }
    .row-actions { text-align: right; }
  `]
})
export class PowerSystemsComponent implements OnInit {
  metrics?: PowerSystemsMetrics;
  pipeline?: PipelineSummary;
  orders: PowerOrder[] = [];
  bess: BessProject[] = [];
  stageChart: BarDatum[] = [];
  segmentChart: BarDatum[] = [];
  stageOptions: OrderStage[] = ['Qualified', 'Proposal', 'Negotiation', 'Won', 'Delivered'];
  segmentOptions = ['Power generation', 'Governmental', 'Marine', 'Industrial'];
  regionOptions = ['Europe', 'North America', 'Asia Pacific', 'Middle East'];
  segmentFilter = '';
  stageFilter = '';
  loading = true;
  error = false;
  saving = false;
  message = '';

  draft: CreatePowerOrderRequest = this.emptyDraft();

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    forkJoin({
      metrics: this.api.getPowerMetrics(),
      orders: this.api.getPowerOrders(),
      bess: this.api.getBessProjects(),
      pipeline: this.api.getPipelineSummary()
    }).subscribe({
      next: ({ metrics, orders, bess, pipeline }) => {
        this.metrics = metrics;
        this.orders = orders;
        this.bess = bess;
        this.applyPipeline(pipeline);
        this.segmentOptions = [...new Set([...this.segmentOptions, ...orders.map(o => o.segment)])];
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  private emptyDraft(): CreatePowerOrderRequest {
    return {
      customer: '',
      segment: 'Power generation',
      application: '',
      product: '',
      region: 'Europe',
      valueGbpM: 50,
      units: 10,
      stage: 'Qualified',
      expectedDelivery: '2027',
      frameworkAgreement: false,
      notes: ''
    };
  }

  private applyPipeline(pipeline: PipelineSummary): void {
    this.pipeline = pipeline;
    this.stageChart = pipeline.byStage.map(s => ({
      label: `${s.stage} (${s.count})`,
      value: s.valueGbpM,
      caption: `£${s.valueGbpM.toLocaleString()}m`
    }));
    this.segmentChart = pipeline.bySegment.map(s => ({
      label: s.segment,
      value: s.valueGbpM,
      caption: `£${s.valueGbpM.toLocaleString()}m`
    }));
  }

  private refreshPipeline(): void {
    this.api.getPipelineSummary().subscribe(pipeline => this.applyPipeline(pipeline));
  }

  reload(): void {
    this.api.getPowerOrders(this.segmentFilter || undefined, this.stageFilter || undefined)
      .subscribe(orders => (this.orders = orders));
  }

  create(): void {
    this.saving = true;
    this.message = '';
    this.api.createPowerOrder({ ...this.draft, valueGbpM: Number(this.draft.valueGbpM), units: Number(this.draft.units) })
      .subscribe({
        next: order => {
          this.saving = false;
          this.message = `${order.customer} added to the pipeline at £${order.valueGbpM}m.`;
          this.draft = this.emptyDraft();
          this.reload();
          this.refreshPipeline();
        },
        error: () => {
          this.saving = false;
          this.message = 'Unable to save the order. Check the form and try again.';
        }
      });
  }

  advance(order: PowerOrder): void {
    this.api.advancePowerOrder(order.id).subscribe(updated => {
      this.orders = this.orders.map(o => (o.id === updated.id ? updated : o));
      this.message = `${updated.customer} advanced to ${updated.stage}.`;
      this.refreshPipeline();
    });
  }

  get totalBessMwh(): number {
    return this.pipeline?.totalBessCapacityMwh ?? 0;
  }
}
