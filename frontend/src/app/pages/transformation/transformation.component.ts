import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { ApiService } from '../../shared/services/api.service';
import { Initiative, ProgressSummary, StrategicPillar } from '../../shared/models/models';
import {
  BarChartComponent, BarDatum, KpiCardComponent, ProgressBarComponent, StateBlockComponent
} from '../../shared/components/ui.components';

@Component({
  selector: 'app-transformation',
  standalone: true,
  imports: [CommonModule, FormsModule, KpiCardComponent, ProgressBarComponent, BarChartComponent, StateBlockComponent],
  template: `
    <div class="page-header">
      <h1>Strategic pillars</h1>
      <p>
        The transformation programme is organised around four pillars. Each initiative below carries an owner, a value
        metric and a progress trail; updates are written back to the platform.
      </p>
    </div>

    <app-state-block [loading]="loading" [error]="error" subject="transformation data"></app-state-block>

    <div class="grid grid-4 block" *ngIf="summary as s">
      <app-kpi-card label="Initiatives" [value]="s.totalInitiatives" [meta]="s.delivered + ' delivered'"></app-kpi-card>
      <app-kpi-card label="Ahead of plan" [value]="s.aheadOfPlan" meta="Initiatives running early" [accent]="true"></app-kpi-card>
      <app-kpi-card label="Average progress" [value]="s.averageProgressPercent + '%'" meta="Across all pillars"></app-kpi-card>
      <app-kpi-card label="Pillars" [value]="pillars.length" meta="Strategy framework"></app-kpi-card>
    </div>

    <div class="card block" *ngIf="pillarChart.length">
      <div class="card-header">
        <div><h2>Progress by pillar</h2><p>Average initiative completion.</p></div>
      </div>
      <app-bar-chart [data]="pillarChart" [gold]="true"></app-bar-chart>
    </div>

    <div class="pillars">
      <div class="card pillar" *ngFor="let p of pillars">
        <div class="pillar-head">
          <div>
            <h2>{{ p.name }}</h2>
            <p class="muted">{{ p.description }}</p>
          </div>
          <span class="badge gold">{{ p.initiatives.length }} initiatives</span>
        </div>

        <div class="initiative" *ngFor="let i of p.initiatives">
          <div class="i-head">
            <div>
              <strong>{{ i.title }}</strong>
              <span class="muted sub">{{ i.division }} &middot; {{ i.owner }} &middot; target {{ i.targetDate }}</span>
            </div>
            <span class="badge" [class.green]="i.status === 'Delivered' || i.status === 'Ahead of plan'">{{ i.status }}</span>
          </div>
          <p class="i-desc">{{ i.description }}</p>
          <div class="i-foot">
            <app-progress-bar [value]="i.progressPercent"></app-progress-bar>
            <span class="metric">{{ i.valueMetric }}</span>
            <button class="btn-outline" (click)="startEdit(i)">Update progress</button>
          </div>

          <form class="edit" *ngIf="editing === i.id" (ngSubmit)="save(i)">
            <div class="form-group">
              <label [attr.for]="'progress-' + i.id">Progress ({{ form.progressPercent }}%)</label>
              <input [id]="'progress-' + i.id" name="progress" type="range" min="0" max="100" [(ngModel)]="form.progressPercent" />
            </div>
            <div class="form-group">
              <label [attr.for]="'status-' + i.id">Status</label>
              <select [id]="'status-' + i.id" name="status" [(ngModel)]="form.status">
                <option *ngFor="let s of statusOptions" [value]="s">{{ s }}</option>
              </select>
            </div>
            <div class="form-group">
              <label [attr.for]="'note-' + i.id">Note</label>
              <input [id]="'note-' + i.id" name="note" [(ngModel)]="form.note" placeholder="Progress commentary for the steering committee" />
            </div>
            <div class="edit-actions">
              <button class="btn-navy" type="submit" [disabled]="saving">{{ saving ? 'Saving…' : 'Save update' }}</button>
              <button class="btn-outline" type="button" (click)="editing = null">Cancel</button>
            </div>
          </form>

          <details class="updates" *ngIf="i.updates.length">
            <summary>{{ i.updates.length }} update{{ i.updates.length === 1 ? '' : 's' }}</summary>
            <div class="update" *ngFor="let u of i.updates">
              <span class="muted">{{ u.timestamp }} &middot; {{ u.author }} &middot; {{ u.progressPercent }}% &middot; {{ u.status }}</span>
              <span>{{ u.note }}</span>
            </div>
          </details>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .block { margin-bottom: 1.5rem; }
    .pillars { display: flex; flex-direction: column; gap: 1.25rem; }
    .pillar-head { display: flex; justify-content: space-between; gap: 1rem; align-items: flex-start; margin-bottom: 1rem; }
    .pillar-head h2 { font-size: 1.0625rem; font-weight: 600; }
    .pillar-head .muted { font-size: 0.8125rem; margin-top: 0.25rem; max-width: 80ch; line-height: 1.5; }
    .initiative { border-top: 1px solid var(--rr-border); padding: 1rem 0; }
    .i-head { display: flex; justify-content: space-between; gap: 1rem; align-items: flex-start; }
    .i-head strong { font-size: 0.875rem; }
    .sub { display: block; font-size: 0.6875rem; margin-top: 0.15rem; }
    .i-desc { font-size: 0.8125rem; color: var(--rr-muted); margin: 0.5rem 0 0.75rem; line-height: 1.5; max-width: 90ch; }
    .i-foot { display: grid; grid-template-columns: 200px 1fr auto; gap: 1rem; align-items: center; }
    .metric { font-size: 0.75rem; color: var(--rr-gold); font-weight: 600; }
    .edit {
      margin-top: 1rem; padding: 1rem; background: var(--rr-platinum); border-radius: 0.5rem;
      display: grid; grid-template-columns: 1fr 1fr 2fr; gap: 0 1rem;
    }
    .edit-actions { grid-column: 1 / -1; display: flex; gap: 0.5rem; }
    .updates { margin-top: 0.85rem; font-size: 0.8125rem; }
    .updates summary { cursor: pointer; color: var(--rr-muted); }
    .update { display: flex; flex-direction: column; gap: 0.15rem; padding: 0.5rem 0; border-bottom: 1px solid var(--rr-border); }
    .update .muted { font-size: 0.6875rem; }
  `]
})
export class TransformationComponent implements OnInit {
  pillars: StrategicPillar[] = [];
  summary?: ProgressSummary;
  pillarChart: BarDatum[] = [];
  statusOptions = ['On track', 'Ahead of plan', 'Behind plan', 'Delivered'];
  editing: string | null = null;
  form = { progressPercent: 0, status: 'On track', note: '' };
  loading = true;
  error = false;
  saving = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    forkJoin({
      pillars: this.api.getPillars(),
      summary: this.api.getProgressSummary()
    }).subscribe({
      next: ({ pillars, summary }) => {
        this.pillars = pillars;
        this.summary = summary;
        this.pillarChart = summary.byPillar.map(p => ({
          label: p.name,
          value: p.averageProgressPercent,
          caption: `${p.averageProgressPercent}%`
        }));
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  startEdit(initiative: Initiative): void {
    this.editing = initiative.id;
    this.form = { progressPercent: initiative.progressPercent, status: initiative.status, note: '' };
  }

  save(initiative: Initiative): void {
    this.saving = true;
    this.api.updateInitiative(initiative.id, Number(this.form.progressPercent), this.form.status, this.form.note)
      .subscribe({
        next: () => {
          this.saving = false;
          this.editing = null;
          this.load();
        },
        error: () => {
          this.saving = false;
        }
      });
  }
}
