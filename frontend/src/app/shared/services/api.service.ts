import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  BessProject, CivilAerospaceMetrics, CreatePowerOrderRequest, CreateShopVisitRequest,
  DefenceMetrics, DefenceProgramme, DivisionPerformance, EngineProgramme, GroupSummary,
  GuidanceItem, Initiative, MroSite, NetworkPerformance, NuclearProgramme, NuclearSummary,
  PipelineSummary, PowerOrder, PowerSystemsMetrics, PrincipalRisk, PrognosticsRequest,
  PrognosticsResult, ProgressSummary, ScenarioRequest, ScenarioResult, SectorBreakdown,
  ShopVisit, ShopVisitStatus, SmrTender, StrategicPillar, TimeOnWingWorkstream,
  WorkscopePrediction, WorkscopePredictionRequest, CapitalPosition
} from '../models/models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly base = 'http://localhost:5062/api';

  constructor(private http: HttpClient) {}

  getGroupSummary(): Observable<GroupSummary> {
    return this.http.get<GroupSummary>(`${this.base}/group/summary`);
  }

  getDivisions(): Observable<DivisionPerformance[]> {
    return this.http.get<DivisionPerformance[]>(`${this.base}/group/divisions`);
  }

  getGuidance(): Observable<GuidanceItem[]> {
    return this.http.get<GuidanceItem[]>(`${this.base}/group/guidance`);
  }

  getCapital(): Observable<CapitalPosition> {
    return this.http.get<CapitalPosition>(`${this.base}/group/capital`);
  }

  getCivilMetrics(): Observable<CivilAerospaceMetrics> {
    return this.http.get<CivilAerospaceMetrics>(`${this.base}/civil-aerospace/metrics`);
  }

  getEngineProgrammes(): Observable<EngineProgramme[]> {
    return this.http.get<EngineProgramme[]>(`${this.base}/civil-aerospace/programmes`);
  }

  getTimeOnWing(): Observable<TimeOnWingWorkstream[]> {
    return this.http.get<TimeOnWingWorkstream[]>(`${this.base}/civil-aerospace/time-on-wing`);
  }

  getMroSites(): Observable<MroSite[]> {
    return this.http.get<MroSite[]>(`${this.base}/civil-aerospace/sites`);
  }

  getNetworkPerformance(): Observable<NetworkPerformance> {
    return this.http.get<NetworkPerformance>(`${this.base}/civil-aerospace/network-performance`);
  }

  getShopVisits(filters: { status?: string; siteId?: string; programme?: string } = {}): Observable<ShopVisit[]> {
    let params = new HttpParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params = params.set(key, value);
      }
    });
    return this.http.get<ShopVisit[]>(`${this.base}/civil-aerospace/shop-visits`, { params });
  }

  createShopVisit(request: CreateShopVisitRequest): Observable<ShopVisit> {
    return this.http.post<ShopVisit>(`${this.base}/civil-aerospace/shop-visits`, request);
  }

  updateShopVisitStatus(id: string, status: ShopVisitStatus, note: string): Observable<ShopVisit> {
    return this.http.put<ShopVisit>(`${this.base}/civil-aerospace/shop-visits/${id}/status`, {
      status, actor: 'MRO Planner', note
    });
  }

  deleteShopVisit(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/civil-aerospace/shop-visits/${id}`);
  }

  getDefenceMetrics(): Observable<DefenceMetrics> {
    return this.http.get<DefenceMetrics>(`${this.base}/defence/metrics`);
  }

  getDefenceProgrammes(sector?: string, autonomous?: boolean): Observable<DefenceProgramme[]> {
    let params = new HttpParams();
    if (sector) {
      params = params.set('sector', sector);
    }
    if (autonomous !== undefined) {
      params = params.set('autonomous', autonomous);
    }
    return this.http.get<DefenceProgramme[]>(`${this.base}/defence/programmes`, { params });
  }

  getSectorBreakdown(): Observable<SectorBreakdown[]> {
    return this.http.get<SectorBreakdown[]>(`${this.base}/defence/sector-breakdown`);
  }

  getPowerMetrics(): Observable<PowerSystemsMetrics> {
    return this.http.get<PowerSystemsMetrics>(`${this.base}/power-systems/metrics`);
  }

  getPowerOrders(segment?: string, stage?: string): Observable<PowerOrder[]> {
    let params = new HttpParams();
    if (segment) {
      params = params.set('segment', segment);
    }
    if (stage) {
      params = params.set('stage', stage);
    }
    return this.http.get<PowerOrder[]>(`${this.base}/power-systems/orders`, { params });
  }

  createPowerOrder(request: CreatePowerOrderRequest): Observable<PowerOrder> {
    return this.http.post<PowerOrder>(`${this.base}/power-systems/orders`, request);
  }

  advancePowerOrder(id: string): Observable<PowerOrder> {
    return this.http.put<PowerOrder>(`${this.base}/power-systems/orders/${id}/advance`, {});
  }

  getBessProjects(): Observable<BessProject[]> {
    return this.http.get<BessProject[]>(`${this.base}/power-systems/bess-projects`);
  }

  getPipelineSummary(): Observable<PipelineSummary> {
    return this.http.get<PipelineSummary>(`${this.base}/power-systems/pipeline-summary`);
  }

  getSmrTenders(): Observable<SmrTender[]> {
    return this.http.get<SmrTender[]>(`${this.base}/nuclear/tenders`);
  }

  getNuclearProgrammes(): Observable<NuclearProgramme[]> {
    return this.http.get<NuclearProgramme[]>(`${this.base}/nuclear/programmes`);
  }

  getNuclearSummary(): Observable<NuclearSummary> {
    return this.http.get<NuclearSummary>(`${this.base}/nuclear/summary`);
  }

  getPillars(): Observable<StrategicPillar[]> {
    return this.http.get<StrategicPillar[]>(`${this.base}/transformation/pillars`);
  }

  getInitiatives(pillarKey?: string, division?: string): Observable<Initiative[]> {
    let params = new HttpParams();
    if (pillarKey) {
      params = params.set('pillarKey', pillarKey);
    }
    if (division) {
      params = params.set('division', division);
    }
    return this.http.get<Initiative[]>(`${this.base}/transformation/initiatives`, { params });
  }

  updateInitiative(id: string, progressPercent: number, status: string, note: string): Observable<Initiative> {
    return this.http.put<Initiative>(`${this.base}/transformation/initiatives/${id}`, {
      progressPercent, status, author: 'Transformation Office', note
    });
  }

  getProgressSummary(): Observable<ProgressSummary> {
    return this.http.get<ProgressSummary>(`${this.base}/transformation/progress-summary`);
  }

  getRisks(): Observable<PrincipalRisk[]> {
    return this.http.get<PrincipalRisk[]>(`${this.base}/transformation/risks`);
  }

  predictWorkscope(request: WorkscopePredictionRequest): Observable<WorkscopePrediction> {
    return this.http.post<WorkscopePrediction>(`${this.base}/analytics/workscope-prediction`, request);
  }

  runPrognostics(request: PrognosticsRequest): Observable<PrognosticsResult> {
    return this.http.post<PrognosticsResult>(`${this.base}/analytics/prognostics`, request);
  }

  runScenario(request: ScenarioRequest): Observable<ScenarioResult> {
    return this.http.post<ScenarioResult>(`${this.base}/analytics/scenario`, request);
  }
}
