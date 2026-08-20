import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { ApiService } from '../../shared/services/api.service';
import {
  CreateShopVisitRequest, MroSite, NetworkPerformance, ShopVisit, ShopVisitStatus, WorkscopeLevel
} from '../../shared/models/models';
import {
  BarChartComponent, BarDatum, KpiCardComponent, ProgressBarComponent, StateBlockComponent
} from '../../shared/components/ui.components';

const STATUS_FLOW: ShopVisitStatus[] =
  ['Planned', 'InductionScheduled', 'Stripped', 'InRepair', 'Assembly', 'Test', 'Released'];

@Component({
  selector: 'app-mro-operations',
  standalone: true,
  imports: [CommonModule, FormsModule, KpiCardComponent, ProgressBarComponent, BarChartComponent, StateBlockComponent],
  template: `
    <div class="page-header">
      <h1>MRO operations</h1>
      <p>
        Shop visit throughput across the Rolls-Royce and partner network. MRO output grew 13% in H1 2026 and
        refurbishments 35%; the workflow below tracks each engine from induction to release.
      </p>
    </div>

    <app-state-block [loading]="loading" [error]="error" subject="MRO network data"></app-state-block>

    <div class="grid grid-4 block" *ngIf="network as n">
      <app-kpi-card label="Shop visits tracked" [value]="n.totalShopVisits" [meta]="n.activeShopVisits + ' active'"></app-kpi-card>
      <app-kpi-card label="AOG risk" [value]="n.aogRisk" meta="Active visits flagged" [accent]="n.aogRisk > 0"></app-kpi-card>
      <app-kpi-card label="Average turnaround" [value]="n.averageTurnaroundDays + ' days'" meta="Induction to release"></app-kpi-card>
      <app-kpi-card label="HPT blade upgrade coverage" [value]="n.bladeUpgradeCoveragePercent + '%'" meta="Of tracked visits"></app-kpi-card>
    </div>

    <div class="grid grid-2 block" *ngIf="network">
      <div class="card">
        <div class="card-header">
          <div><h2>Workflow position</h2><p>Shop visits by stage.</p></div>
        </div>
        <app-bar-chart [data]="statusChart"></app-bar-chart>
      </div>
      <div class="card">
        <div class="card-header">
          <div><h2>Site utilisation</h2><p>Capacity utilisation across the global network.</p></div>
        </div>
        <app-bar-chart [data]="siteChart" [gold]="true"></app-bar-chart>
      </div>
    </div>

    <div class="card block">
      <div class="card-header">
        <div>
          <h2>Induct a shop visit</h2>
          <p>Creates a planned shop visit with an estimated turnaround and cost for the selected workscope.</p>
        </div>
      </div>
      <form class="form-grid" (ngSubmit)="create()" #svForm="ngForm">
        <div class="form-group">
          <label for="esn">Engine serial number</label>
          <input id="esn" name="esn" required [(ngModel)]="draft.engineSerialNumber" placeholder="ESN-100942" />
        </div>
        <div class="form-group">
          <label for="programme">Programme</label>
          <select id="programme" name="programme" [(ngModel)]="draft.programme" required>
            <option *ngFor="let p of programmeOptions" [value]="p">{{ p }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="operator">Operator</label>
          <input id="operator" name="operator" required [(ngModel)]="draft.operator" placeholder="British Airways" />
        </div>
        <div class="form-group">
          <label for="site">MRO site</label>
          <select id="site" name="site" [(ngModel)]="draft.siteId" required>
            <option *ngFor="let s of sites" [value]="s.id">{{ s.name }} &mdash; {{ s.location }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="workscope">Workscope</label>
          <select id="workscope" name="workscope" [(ngModel)]="draft.workscope">
            <option *ngFor="let w of workscopeOptions" [value]="w">{{ w }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="induction">Induction date</label>
          <input id="induction" name="induction" type="date" required [(ngModel)]="draft.inductionDate" />
        </div>
        <div class="form-group span-2">
          <label for="notes">Notes</label>
          <input id="notes" name="notes" [(ngModel)]="draft.notes" placeholder="Durability driven removal, HPT blade set available" />
        </div>
        <div class="checks">
          <label><input type="checkbox" name="aog" [(ngModel)]="draft.isAogRisk" /> AOG risk</label>
          <label><input type="checkbox" name="blade" [(ngModel)]="draft.hpTurbineBladeUpgrade" /> Embody upgraded HPT blades</label>
        </div>
        <div class="actions">
          <button class="btn-navy" type="submit" [disabled]="svForm.invalid || saving">
            {{ saving ? 'Inducting…' : 'Induct shop visit' }}
          </button>
          <span class="muted" *ngIf="message">{{ message }}</span>
        </div>
      </form>
    </div>

    <div class="card">
      <div class="card-header">
        <div>
          <h2>Shop visit workflow</h2>
          <p>Advance a visit through the workflow or remove a cancelled induction.</p>
        </div>
        <div class="filters">
          <select [(ngModel)]="statusFilter" (ngModelChange)="reloadVisits()" aria-label="Filter by status">
            <option value="">All statuses</option>
            <option *ngFor="let s of statusOptions" [value]="s">{{ label(s) }}</option>
          </select>
          <select [(ngModel)]="siteFilter" (ngModelChange)="reloadVisits()" aria-label="Filter by site">
            <option value="">All sites</option>
            <option *ngFor="let s of sites" [value]="s.id">{{ s.name }}</option>
          </select>
        </div>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th>Engine</th>
            <th>Operator</th>
            <th>Site</th>
            <th>Workscope</th>
            <th>Status</th>
            <th>Progress</th>
            <th class="numeric">TAT (days)</th>
            <th class="numeric">Cost (£k)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let v of visits">
            <td>
              <strong>{{ v.engineSerialNumber }}</strong>
              <div class="muted sub">{{ v.programme }}<span *ngIf="v.hpTurbineBladeUpgrade"> &middot; HPT blade upgrade</span></div>
            </td>
            <td>{{ v.operator }}</td>
            <td>{{ siteName(v.siteId) }}</td>
            <td>{{ v.workscope }}</td>
            <td>
              <span class="badge" [ngClass]="v.status.toLowerCase()">{{ label(v.status) }}</span>
              <span class="badge red" *ngIf="v.isAogRisk">AOG risk</span>
            </td>
            <td><app-progress-bar [value]="progress(v)" [showValue]="false"></app-progress-bar></td>
            <td class="numeric">{{ v.turnaroundDays }}</td>
            <td class="numeric">{{ v.costEstimateGbpK | number }}</td>
            <td class="row-actions">
              <button class="btn-outline" (click)="advance(v)" [disabled]="v.status === 'Released'">Advance</button>
              <button class="btn-outline danger" (click)="remove(v)">Delete</button>
            </td>
          </tr>
          <tr *ngIf="!visits.length && !loading">
            <td colspan="9" class="muted">No shop visits match the current filters.</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .block { margin-bottom: 1.5rem; }
    .sub { display: block; font-size: 0.6875rem; margin-top: 0.15rem; }
    .form-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0 1rem; }
    .span-2 { grid-column: span 2; }
    .checks {
      display: flex; align-items: center; gap: 1.25rem; font-size: 0.8125rem;
      label { display: flex; align-items: center; gap: 0.4rem; cursor: pointer; }
    }
    .actions { grid-column: 1 / -1; display: flex; align-items: center; gap: 1rem; margin-top: 0.5rem; }
    .actions .muted { font-size: 0.8125rem; }
    .filters { display: flex; gap: 0.5rem; }
    .filters select {
      padding: 0.4rem 0.6rem; font-size: 0.8125rem; border: 1px solid var(--rr-border);
      border-radius: 0.375rem; background: #fff; color: var(--rr-navy);
    }
    .row-actions { display: flex; gap: 0.4rem; justify-content: flex-end; }
    .btn-outline.danger { color: var(--rr-destructive); border-color: #FCA5A5; }
  `]
})
export class MroOperationsComponent implements OnInit {
  visits: ShopVisit[] = [];
  sites: MroSite[] = [];
  network?: NetworkPerformance;
  statusChart: BarDatum[] = [];
  siteChart: BarDatum[] = [];
  statusOptions = STATUS_FLOW;
  workscopeOptions: WorkscopeLevel[] = ['Refurbishment', 'Performance', 'Major', 'FullOverhaul'];
  programmeOptions = ['Trent 1000', 'Trent 7000', 'Trent XWB-84', 'Trent XWB-97', 'Trent 900', 'Pearl 700', 'Pearl 10X'];
  statusFilter = '';
  siteFilter = '';
  loading = true;
  error = false;
  saving = false;
  message = '';

  draft: CreateShopVisitRequest = this.emptyDraft();

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    forkJoin({
      visits: this.api.getShopVisits(),
      sites: this.api.getMroSites(),
      network: this.api.getNetworkPerformance()
    }).subscribe({
      next: ({ visits, sites, network }) => {
        this.visits = visits;
        this.sites = sites;
        this.applyNetwork(network);
        this.draft.siteId = sites[0]?.id ?? '';
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  private emptyDraft(): CreateShopVisitRequest {
    return {
      engineSerialNumber: '',
      programme: 'Trent 1000',
      operator: '',
      siteId: '',
      workscope: 'Performance',
      inductionDate: new Date().toISOString().slice(0, 10),
      isAogRisk: false,
      hpTurbineBladeUpgrade: false,
      notes: ''
    };
  }

  private applyNetwork(network: NetworkPerformance): void {
    this.network = network;
    this.statusChart = network.byStatus.map(s => ({ label: this.label(s.status), value: s.count, caption: `${s.count}` }));
    this.siteChart = network.bySite.map(s => ({
      label: s.name,
      value: s.utilisationPercent,
      caption: `${s.utilisationPercent}%`
    }));
  }

  private refreshNetwork(): void {
    this.api.getNetworkPerformance().subscribe(network => this.applyNetwork(network));
  }

  reloadVisits(): void {
    this.api.getShopVisits({ status: this.statusFilter, siteId: this.siteFilter })
      .subscribe(visits => (this.visits = visits));
  }

  create(): void {
    this.saving = true;
    this.message = '';
    this.api.createShopVisit(this.draft).subscribe({
      next: visit => {
        this.saving = false;
        this.message = `${visit.engineSerialNumber} inducted at ${this.siteName(visit.siteId)} — ${visit.turnaroundDays} day estimated turnaround.`;
        const siteId = this.draft.siteId;
        this.draft = { ...this.emptyDraft(), siteId };
        this.statusFilter = '';
        this.siteFilter = '';
        this.reloadVisits();
        this.refreshNetwork();
      },
      error: () => {
        this.saving = false;
        this.message = 'Unable to induct the shop visit. Check the form and try again.';
      }
    });
  }

  advance(visit: ShopVisit): void {
    const next = STATUS_FLOW[Math.min(STATUS_FLOW.indexOf(visit.status) + 1, STATUS_FLOW.length - 1)];
    this.api.updateShopVisitStatus(visit.id, next, `Advanced to ${this.label(next)} from the operations board.`)
      .subscribe(updated => {
        this.visits = this.visits.map(v => (v.id === updated.id ? updated : v));
        this.message = `${updated.engineSerialNumber} moved to ${this.label(updated.status)}.`;
        this.refreshNetwork();
      });
  }

  remove(visit: ShopVisit): void {
    this.api.deleteShopVisit(visit.id).subscribe(() => {
      this.visits = this.visits.filter(v => v.id !== visit.id);
      this.message = `${visit.engineSerialNumber} removed from the shop visit plan.`;
      this.refreshNetwork();
    });
  }

  progress(visit: ShopVisit): number {
    return (STATUS_FLOW.indexOf(visit.status) / (STATUS_FLOW.length - 1)) * 100;
  }

  siteName(siteId: string): string {
    return this.sites.find(s => s.id === siteId)?.name ?? siteId;
  }

  label(status: string): string {
    return status.replace(/([a-z])([A-Z])/g, '$1 $2');
  }
}
