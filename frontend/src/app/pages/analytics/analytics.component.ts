import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApiService } from '../../shared/services/api.service';
import {
  PrognosticsRequest, PrognosticsResult, ScenarioRequest, ScenarioResult,
  WorkscopePrediction, WorkscopePredictionRequest
} from '../../shared/models/models';
import { LineChartComponent, ProgressBarComponent } from '../../shared/components/ui.components';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, FormsModule, LineChartComponent, ProgressBarComponent],
  template: `
    <div class="page-header">
      <h1>AiRR analytics</h1>
      <p>
        Illustrative predictive models over the platform data: workscope planning and engine prognostics support the
        time on wing programme, and the guidance scenario model stress tests the FY26 outlook.
      </p>
    </div>

    <div class="grid grid-2 block">
      <div class="card">
        <div class="card-header">
          <div><h2>Workscope prediction</h2><p>Recommends a shop visit workscope from engine condition inputs.</p></div>
        </div>
        <form (ngSubmit)="predictWorkscope()">
          <div class="two">
            <div class="form-group">
              <label for="ws-programme">Programme</label>
              <select id="ws-programme" name="wsProgramme" [(ngModel)]="workscopeRequest.programme">
                <option *ngFor="let p of programmes" [value]="p">{{ p }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="ws-env">Operating environment</label>
              <select id="ws-env" name="wsEnv" [(ngModel)]="workscopeRequest.operatingEnvironment">
                <option *ngFor="let e of environments" [value]="e">{{ e }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="ws-cycles">Cycles since new ({{ workscopeRequest.cyclesSinceNew }})</label>
              <input id="ws-cycles" name="wsCycles" type="range" min="0" max="12000" step="100" [(ngModel)]="workscopeRequest.cyclesSinceNew" />
            </div>
            <div class="form-group">
              <label for="ws-hours">Hours since last shop visit ({{ workscopeRequest.hoursSinceLastShopVisit }})</label>
              <input id="ws-hours" name="wsHours" type="range" min="0" max="30000" step="250" [(ngModel)]="workscopeRequest.hoursSinceLastShopVisit" />
            </div>
            <div class="form-group">
              <label for="ws-egt">EGT margin ({{ workscopeRequest.exhaustGasTemperatureMargin }}&deg;C)</label>
              <input id="ws-egt" name="wsEgt" type="range" min="0" max="60" [(ngModel)]="workscopeRequest.exhaustGasTemperatureMargin" />
            </div>
            <div class="form-group check">
              <label><input type="checkbox" name="wsBlade" [(ngModel)]="workscopeRequest.hpTurbineBladeUpgraded" /> HPT blade upgrade embodied</label>
            </div>
          </div>
          <button class="btn-navy" type="submit">Predict workscope</button>
        </form>

        <div class="result" *ngIf="workscope as w">
          <div class="result-head">
            <div>
              <span class="lbl">Recommended workscope</span>
              <span class="big">{{ w.recommendedWorkscope }}</span>
            </div>
            <div>
              <span class="lbl">Confidence</span>
              <span class="big">{{ w.confidencePercent }}%</span>
            </div>
            <div>
              <span class="lbl">Turnaround</span>
              <span class="big">{{ w.predictedTurnaroundDays }} days</span>
            </div>
            <div>
              <span class="lbl">Cost</span>
              <span class="big">£{{ w.predictedCostGbpK | number }}k</span>
            </div>
          </div>
          <p class="muted">Predicted time on wing after the visit: {{ w.predictedTimeOnWingCycles | number }} cycles.</p>
          <ul>
            <li *ngFor="let d of w.drivers">{{ d }}</li>
          </ul>
          <div class="section-label"><span class="line"></span><span>Recommended actions</span></div>
          <ul class="gold">
            <li *ngFor="let a of w.recommendedActions">{{ a }}</li>
          </ul>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div><h2>Engine prognostics</h2><p>Remaining useful life and the projected degradation curve.</p></div>
        </div>
        <form (ngSubmit)="runPrognostics()">
          <div class="two">
            <div class="form-group">
              <label for="pg-programme">Programme</label>
              <select id="pg-programme" name="pgProgramme" [(ngModel)]="prognosticsRequest.programme">
                <option *ngFor="let p of programmes" [value]="p">{{ p }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="pg-env">Operating environment</label>
              <select id="pg-env" name="pgEnv" [(ngModel)]="prognosticsRequest.operatingEnvironment">
                <option *ngFor="let e of environments" [value]="e">{{ e }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="pg-cycles">Cycles since new ({{ prognosticsRequest.cyclesSinceNew }})</label>
              <input id="pg-cycles" name="pgCycles" type="range" min="0" max="12000" step="100" [(ngModel)]="prognosticsRequest.cyclesSinceNew" />
            </div>
            <div class="form-group">
              <label for="pg-util">Cycles per month ({{ prognosticsRequest.averageCyclesPerMonth }})</label>
              <input id="pg-util" name="pgUtil" type="range" min="20" max="300" step="5" [(ngModel)]="prognosticsRequest.averageCyclesPerMonth" />
            </div>
            <div class="form-group check">
              <label><input type="checkbox" name="pgBlade" [(ngModel)]="prognosticsRequest.hpTurbineBladeUpgraded" /> HPT blade upgrade embodied</label>
            </div>
          </div>
          <button class="btn-navy" type="submit">Run prognostics</button>
        </form>

        <div class="result" *ngIf="prognostics as p">
          <div class="result-head">
            <div>
              <span class="lbl">Remaining useful life</span>
              <span class="big">{{ p.remainingUsefulLifeCycles | number }} cycles</span>
            </div>
            <div>
              <span class="lbl">Time to removal</span>
              <span class="big">{{ p.remainingUsefulLifeMonths | number: '1.0-1' }} months</span>
            </div>
            <div>
              <span class="lbl">Removal window</span>
              <span class="big">{{ p.recommendedRemovalWindow }}</span>
            </div>
            <div>
              <span class="lbl">Confidence</span>
              <span class="big">{{ p.confidencePercent }}%</span>
            </div>
          </div>
          <app-line-chart [series]="curve" ariaLabel="Projected engine health index against cycles"></app-line-chart>
          <ul>
            <li *ngFor="let a of p.assumptions">{{ a }}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div>
          <h2>FY26 guidance scenario model</h2>
          <p>Flexes volume, margin and supply chain assumptions against the upgraded FY26 guidance ranges.</p>
        </div>
      </div>
      <form class="scenario-form" (ngSubmit)="runScenario()">
        <div class="form-group">
          <label for="sc-efh">Large engine EFH vs 2019 ({{ scenarioRequest.largeEfhPercentOf2019 }}%)</label>
          <input id="sc-efh" name="scEfh" type="range" min="95" max="130" [(ngModel)]="scenarioRequest.largeEfhPercentOf2019" (change)="runScenario()" />
        </div>
        <div class="form-group">
          <label for="sc-sv">Total shop visits ({{ scenarioRequest.totalShopVisits }})</label>
          <input id="sc-sv" name="scSv" type="range" min="1100" max="1900" step="10" [(ngModel)]="scenarioRequest.totalShopVisits" (change)="runScenario()" />
        </div>
        <div class="form-group">
          <label for="sc-oe">OE deliveries ({{ scenarioRequest.oeDeliveries }})</label>
          <input id="sc-oe" name="scOe" type="range" min="450" max="700" step="5" [(ngModel)]="scenarioRequest.oeDeliveries" (change)="runScenario()" />
        </div>
        <div class="form-group">
          <label for="sc-civil">Civil margin delta ({{ scenarioRequest.civilMarginDeltaPoints }}pts)</label>
          <input id="sc-civil" name="scCivil" type="range" min="-5" max="5" step="0.25" [(ngModel)]="scenarioRequest.civilMarginDeltaPoints" (change)="runScenario()" />
        </div>
        <div class="form-group">
          <label for="sc-def">Defence margin delta ({{ scenarioRequest.defenceMarginDeltaPoints }}pts)</label>
          <input id="sc-def" name="scDef" type="range" min="-5" max="5" step="0.25" [(ngModel)]="scenarioRequest.defenceMarginDeltaPoints" (change)="runScenario()" />
        </div>
        <div class="form-group">
          <label for="sc-ps">Power Systems margin delta ({{ scenarioRequest.powerSystemsMarginDeltaPoints }}pts)</label>
          <input id="sc-ps" name="scPs" type="range" min="-5" max="5" step="0.25" [(ngModel)]="scenarioRequest.powerSystemsMarginDeltaPoints" (change)="runScenario()" />
        </div>
        <div class="form-group">
          <label for="sc-supply">Supply chain cash impact (£{{ scenarioRequest.supplyChainCashImpactGbpM }}m)</label>
          <input id="sc-supply" name="scSupply" type="range" min="0" max="400" step="5" [(ngModel)]="scenarioRequest.supplyChainCashImpactGbpM" (change)="runScenario()" />
        </div>
        <div class="form-group actions">
          <button class="btn-navy" type="submit">Run scenario</button>
          <button class="btn-outline" type="button" (click)="resetScenario()">Reset to base case</button>
        </div>
      </form>

      <div class="scenario-result" *ngIf="scenario as s">
        <div class="outcome">
          <div>
            <span class="lbl">Underlying operating profit</span>
            <span class="huge">£{{ s.underlyingOperatingProfitGbpBn | number: '1.2-2' }}bn</span>
            <span class="badge" [ngClass]="statusClass(s.profitGuidanceStatus)">{{ s.profitGuidanceStatus }}</span>
          </div>
          <div>
            <span class="lbl">Free cash flow</span>
            <span class="huge">£{{ s.freeCashFlowGbpBn | number: '1.2-2' }}bn</span>
            <span class="badge" [ngClass]="statusClass(s.cashFlowGuidanceStatus)">{{ s.cashFlowGuidanceStatus }}</span>
          </div>
          <div>
            <span class="lbl">Group operating margin</span>
            <span class="huge">{{ s.operatingMarginPercent | number: '1.1-1' }}%</span>
          </div>
        </div>

        <table class="data-table">
          <thead>
            <tr><th>Division</th><th class="numeric">Revenue (£bn)</th><th class="numeric">Operating profit (£bn)</th><th class="numeric">Margin</th><th>Contribution</th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let c of s.contributions">
              <td>{{ c.division }}</td>
              <td class="numeric">{{ c.revenueGbpBn | number: '1.2-2' }}</td>
              <td class="numeric">{{ c.operatingProfitGbpBn | number: '1.2-2' }}</td>
              <td class="numeric">{{ c.marginPercent | number: '1.1-1' }}%</td>
              <td><app-progress-bar [value]="contributionShare(c.operatingProfitGbpBn, s)" [showValue]="false"></app-progress-bar></td>
            </tr>
          </tbody>
        </table>

        <ul class="commentary">
          <li *ngFor="let c of s.commentary">{{ c }}</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .block { margin-bottom: 1.5rem; }
    .two { display: grid; grid-template-columns: 1fr 1fr; gap: 0 1rem; }
    .form-group.check label { text-transform: none; letter-spacing: 0; font-size: 0.8125rem; display: flex; align-items: center; gap: 0.4rem; color: var(--rr-navy); }
    .result { margin-top: 1.25rem; padding-top: 1.25rem; border-top: 1px solid var(--rr-border); }
    .result-head { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75rem; margin-bottom: 0.85rem; }
    .lbl {
      display: block; font-size: 0.625rem; font-weight: 600; letter-spacing: 0.08em;
      text-transform: uppercase; color: var(--rr-muted); margin-bottom: 0.2rem;
    }
    .big { display: block; font-size: 1rem; font-weight: 600; }
    .huge { display: block; font-size: 1.75rem; font-weight: 600; letter-spacing: -0.02em; margin: 0.1rem 0 0.4rem; }
    .result ul { padding-left: 1rem; margin-top: 0.6rem; display: flex; flex-direction: column; gap: 0.3rem; }
    .result li { font-size: 0.8125rem; line-height: 1.45; }
    .result ul.gold li::marker { color: var(--rr-gold); }
    .result .muted { font-size: 0.8125rem; }
    .scenario-form { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0 1.25rem; }
    .scenario-form .actions { grid-column: 1 / -1; display: flex; gap: 0.5rem; align-items: flex-end; }
    .scenario-result { margin-top: 1.25rem; padding-top: 1.25rem; border-top: 1px solid var(--rr-border); }
    .outcome { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.25rem; }
    .commentary {
      margin-top: 1rem; padding-left: 1rem; display: flex; flex-direction: column; gap: 0.35rem;
      li { font-size: 0.8125rem; line-height: 1.5; }
    }
  `]
})
export class AnalyticsComponent implements OnInit {
  programmes = ['Trent 1000', 'Trent 7000', 'Trent XWB-84', 'Trent XWB-97', 'Trent 900', 'Pearl 700'];
  environments = ['Temperate', 'Tropical', 'Desert', 'Coastal', 'High cycle short haul'];

  workscopeRequest: WorkscopePredictionRequest = {
    programme: 'Trent 1000',
    cyclesSinceNew: 3200,
    hoursSinceLastShopVisit: 12000,
    operatingEnvironment: 'Desert',
    hpTurbineBladeUpgraded: false,
    exhaustGasTemperatureMargin: 18
  };

  prognosticsRequest: PrognosticsRequest = {
    programme: 'Trent 1000',
    cyclesSinceNew: 2400,
    operatingEnvironment: 'Temperate',
    hpTurbineBladeUpgraded: true,
    averageCyclesPerMonth: 120
  };

  scenarioRequest: ScenarioRequest = this.baseScenario();

  workscope?: WorkscopePrediction;
  prognostics?: PrognosticsResult;
  scenario?: ScenarioResult;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.predictWorkscope();
    this.runPrognostics();
    this.runScenario();
  }

  private baseScenario(): ScenarioRequest {
    return {
      largeEfhPercentOf2019: 113,
      totalShopVisits: 1500,
      oeDeliveries: 575,
      civilMarginDeltaPoints: 0,
      defenceMarginDeltaPoints: 0,
      powerSystemsMarginDeltaPoints: 0,
      supplyChainCashImpactGbpM: 175
    };
  }

  predictWorkscope(): void {
    this.api.predictWorkscope(this.numeric(this.workscopeRequest)).subscribe(result => (this.workscope = result));
  }

  runPrognostics(): void {
    this.api.runPrognostics(this.numeric(this.prognosticsRequest)).subscribe(result => (this.prognostics = result));
  }

  runScenario(): void {
    this.api.runScenario(this.numeric(this.scenarioRequest)).subscribe(result => (this.scenario = result));
  }

  resetScenario(): void {
    this.scenarioRequest = this.baseScenario();
    this.runScenario();
  }

  private numeric<T extends object>(request: T): T {
    const clone: Record<string, unknown> = { ...(request as Record<string, unknown>) };
    Object.entries(clone).forEach(([key, value]) => {
      if (typeof value === 'string' && value !== '' && !isNaN(Number(value))) {
        clone[key] = Number(value);
      }
    });
    return clone as T;
  }

  get curve(): { x: number; y: number }[] {
    return (this.prognostics?.degradationCurve ?? []).map(p => ({ x: p.cycles, y: p.healthIndex }));
  }

  statusClass(status: string): string {
    if (status.includes('Above')) {
      return 'green';
    }
    return status.includes('Below') ? 'red' : 'blue';
  }

  contributionShare(profit: number, scenario: ScenarioResult): number {
    const total = scenario.contributions.reduce((sum, c) => sum + c.operatingProfitGbpBn, 0);
    return total === 0 ? 0 : (profit / total) * 100;
  }
}
