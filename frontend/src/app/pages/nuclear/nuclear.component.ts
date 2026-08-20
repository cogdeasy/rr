import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

import { ApiService } from '../../shared/services/api.service';
import { NuclearProgramme, NuclearSummary, SmrTender } from '../../shared/models/models';
import { KpiCardComponent, ProgressBarComponent, StateBlockComponent } from '../../shared/components/ui.components';

@Component({
  selector: 'app-nuclear',
  standalone: true,
  imports: [CommonModule, KpiCardComponent, ProgressBarComponent, StateBlockComponent],
  template: `
    <div class="page-header">
      <h1>SMR &amp; AMR</h1>
      <p>
        Rolls-Royce SMR has been selected in every competitive European tender it has entered. Advanced Modular Reactor
        research continues with UK and Japanese nuclear authorities alongside the UK civil nuclear services business.
      </p>
    </div>

    <app-state-block [loading]="loading" [error]="error" subject="nuclear pipeline data"></app-state-block>

    <div class="grid grid-4 block" *ngIf="summary as s">
      <app-kpi-card label="Competitive wins" [value]="s.competitiveWins" [meta]="s.inExecution + ' in execution'" [accent]="true"></app-kpi-card>
      <app-kpi-card label="Contracted units" [value]="s.contractedUnits" meta="SMR units under contract"></app-kpi-card>
      <app-kpi-card label="Pipeline tenders" [value]="s.pipelineTenders" [meta]="s.pipelineUnits + ' units in pipeline'"></app-kpi-card>
      <app-kpi-card label="Technology" value="470MWe" meta="Rolls-Royce SMR reference design"></app-kpi-card>
    </div>

    <div class="card block" *ngIf="summary as s">
      <p class="commentary">{{ s.commentary }}</p>
    </div>

    <div class="card block">
      <div class="card-header">
        <div><h2>SMR tenders</h2><p>Awarded contracts and the live European pipeline.</p></div>
      </div>
      <table class="data-table">
        <thead>
          <tr><th>Country</th><th>Customer</th><th class="numeric">Units</th><th>Status</th><th>Award</th><th>Notes</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let t of tenders">
            <td><strong>{{ t.country }}</strong></td>
            <td>{{ t.customer }}</td>
            <td class="numeric">{{ t.units }}</td>
            <td><span class="badge" [ngClass]="t.status.toLowerCase()">{{ t.status }}</span></td>
            <td>{{ t.awardDate || '—' }}</td>
            <td class="muted">{{ t.notes }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="card">
      <div class="card-header">
        <div><h2>Nuclear programmes</h2><p>Advanced modular reactors, micro-reactors and civil nuclear services.</p></div>
      </div>
      <div class="grid grid-2">
        <div class="programme" *ngFor="let p of programmes">
          <div class="p-head">
            <div>
              <strong>{{ p.name }}</strong>
              <span class="muted sub">{{ p.technology }} &middot; {{ p.partner }}</span>
            </div>
            <span class="badge">{{ p.stage }}</span>
          </div>
          <p class="p-desc">{{ p.description }}</p>
          <app-progress-bar [value]="p.progressPercent" [gold]="true"></app-progress-bar>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .block { margin-bottom: 1.5rem; }
    .commentary { font-size: 0.9375rem; line-height: 1.6; color: var(--rr-navy); }
    .sub { display: block; font-size: 0.6875rem; margin-top: 0.15rem; }
    .programme { border: 1px solid var(--rr-border); border-radius: 0.5rem; padding: 1rem; }
    .p-head { display: flex; justify-content: space-between; gap: 0.75rem; align-items: flex-start; }
    .p-head strong { font-size: 0.875rem; }
    .p-desc { font-size: 0.8125rem; color: var(--rr-muted); margin: 0.6rem 0 0.85rem; line-height: 1.5; }
  `]
})
export class NuclearComponent implements OnInit {
  summary?: NuclearSummary;
  tenders: SmrTender[] = [];
  programmes: NuclearProgramme[] = [];
  loading = true;
  error = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    forkJoin({
      summary: this.api.getNuclearSummary(),
      tenders: this.api.getSmrTenders(),
      programmes: this.api.getNuclearProgrammes()
    }).subscribe({
      next: ({ summary, tenders, programmes }) => {
        this.summary = summary;
        this.tenders = tenders;
        this.programmes = programmes;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }
}
