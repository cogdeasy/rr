export interface HeadlineMetric {
  key: string;
  label: string;
  value: string;
  priorValue: string;
  priorLabel: string;
  changePercent: number;
  commentary: string;
}

export interface GuidanceItem {
  metric: string;
  upgraded: string;
  previous: string;
  lowerBound: number;
  upperBound: number;
  halfYearActual: number;
  unit: string;
}

export interface DivisionPerformance {
  key: string;
  name: string;
  underlyingRevenue: number;
  revenueOrganicChangePercent: number;
  underlyingOperatingProfit: number;
  profitOrganicChangePercent: number;
  operatingMarginPercent: number;
  marginChangePoints: number;
  tradingCashFlow: number;
  summary: string;
  priorities: string[];
}

export interface CashFlowLine {
  label: string;
  currentPeriod: number;
  priorPeriod: number;
  isTotal: boolean;
}

export interface CreditRating {
  agency: string;
  rating: string;
  outlook: string;
  action: string;
}

export interface CapitalPosition {
  netCash: number;
  grossDebt: number;
  liquidity: number;
  leaseLiabilities: number;
  tccGmRatio: number;
  interimDividendPence: number;
  buybackCompleted: number;
  buybackTranche: number;
  buybackProgramme: string;
  creditRatings: CreditRating[];
}

export interface GroupSummary {
  period: string;
  reportDate: string;
  headline: string;
  ceoQuote: string;
  headlineMetrics: HeadlineMetric[];
  guidance: GuidanceItem[];
  divisions: DivisionPerformance[];
  tradingCashFlow: CashFlowLine[];
  capital: CapitalPosition;
}

export interface EngineProgramme {
  key: string;
  name: string;
  segment: string;
  application: string;
  inServiceEngines: number;
  orderBook: number;
  engineFlyingHoursMillions: number;
  timeOnWingUpliftPercent: number;
  timeOnWingTargetPercent: number;
  aircraftOnGround: number;
  durabilityStatus: string;
  commentary: string;
}

export interface TimeOnWingWorkstream {
  id: string;
  programme: string;
  modification: string;
  phase: string;
  fleetPenetrationPercent: number;
  durabilityUpliftPercent: number;
  targetDate: string;
  status: string;
  description: string;
}

export interface MroSite {
  id: string;
  name: string;
  location: string;
  network: string;
  programmes: string[];
  annualCapacity: number;
  shopVisitsYtd: number;
  utilisationPercent: number;
  averageTurnaroundDays: number;
  status: string;
}

export type ShopVisitStatus =
  | 'Planned' | 'InductionScheduled' | 'Stripped' | 'InRepair' | 'Assembly' | 'Test' | 'Released';

export type WorkscopeLevel = 'Refurbishment' | 'Performance' | 'Major' | 'FullOverhaul';

export interface ShopVisitEvent {
  timestamp: string;
  actor: string;
  action: string;
  detail: string;
}

export interface ShopVisit {
  id: string;
  engineSerialNumber: string;
  programme: string;
  operator: string;
  siteId: string;
  workscope: WorkscopeLevel;
  status: ShopVisitStatus;
  inductionDate: string;
  plannedReleaseDate: string;
  turnaroundDays: number;
  costEstimateGbpK: number;
  isAogRisk: boolean;
  hpTurbineBladeUpgrade: boolean;
  notes: string;
  history: ShopVisitEvent[];
}

export interface CivilAerospaceMetrics {
  largeEngineOeDeliveries: number;
  businessAviationOeDeliveries: number;
  largeEngineFlyingHoursMillions: number;
  businessAviationFlyingHoursMillions: number;
  largeEngineShopVisits: number;
  businessAviationShopVisits: number;
  majorShopVisits: number;
  largeEfhPercentOf2019: number;
  largeEngineOrderBook: number;
  grossContractualMarginImprovement: number;
  netContractualImprovement: number;
  netLtsaBalanceGrowth: number;
  aircraftOnGround: number;
  mroOutputGrowthPercent: number;
  refurbishmentGrowthPercent: number;
}

export interface NetworkPerformance {
  totalShopVisits: number;
  activeShopVisits: number;
  aogRisk: number;
  averageTurnaroundDays: number;
  averageCostGbpK: number;
  bladeUpgradeCoveragePercent: number;
  byStatus: { status: ShopVisitStatus; count: number }[];
  bySite: { id: string; name: string; utilisationPercent: number; active: number }[];
}

export interface DefenceProgramme {
  id: string;
  name: string;
  sector: string;
  platform: string;
  customer: string;
  product: string;
  orderValueGbpM: number;
  phase: string;
  autonomous: boolean;
  latestMilestone: string;
  milestoneDate: string;
  progressPercent: number;
}

export interface DefenceMetrics {
  orderIntakeGbpBn: number;
  bookToBill: number;
  orderBacklogGbpBn: number;
  orderCoverPercent: number;
  revenueGrowthPercent: number;
  combatGrowthPercent: number;
  submarinesGrowthPercent: number;
  transportGrowthPercent: number;
  gcapFundingGbpBn: number;
  autonomyFundingGbpBn: number;
}

export interface SectorBreakdown {
  sector: string;
  programmes: number;
  valueGbpM: number;
  averageProgressPercent: number;
}

export type OrderStage = 'Qualified' | 'Proposal' | 'Negotiation' | 'Won' | 'Delivered';

export interface PowerOrder {
  id: string;
  customer: string;
  segment: string;
  application: string;
  product: string;
  region: string;
  valueGbpM: number;
  units: number;
  stage: OrderStage;
  expectedDelivery: string;
  frameworkAgreement: boolean;
  notes: string;
}

export interface BessProject {
  id: string;
  name: string;
  customer: string;
  country: string;
  capacityMwh: number;
  status: string;
  gridConnection: string;
}

export interface PowerSystemsMetrics {
  orderIntakeGbpBn: number;
  bookToBill: number;
  powerGenerationOrderGrowthPercent: number;
  governmentalOrderGrowthPercent: number;
  powerGenerationRevenueGrowthPercent: number;
  governmentalRevenueGrowthPercent: number;
  powerGenerationOeGrowthTo2030Percent: number;
  governmentalOeGrowthTo2030Percent: number;
  orderCover2026Percent: number;
  orderCover2027Percent: number;
}

export interface PipelineSummary {
  wonValueGbpM: number;
  openPipelineGbpM: number;
  byStage: { stage: OrderStage; count: number; valueGbpM: number }[];
  bySegment: { segment: string; valueGbpM: number; count: number }[];
  totalBessCapacityMwh: number;
}

export interface SmrTender {
  id: string;
  country: string;
  customer: string;
  status: string;
  units: number;
  awardDate: string;
  notes: string;
}

export interface NuclearProgramme {
  id: string;
  name: string;
  technology: string;
  partner: string;
  stage: string;
  progressPercent: number;
  description: string;
}

export interface NuclearSummary {
  competitiveWins: number;
  inExecution: number;
  pipelineTenders: number;
  contractedUnits: number;
  pipelineUnits: number;
  commentary: string;
}

export interface InitiativeUpdate {
  timestamp: string;
  author: string;
  progressPercent: number;
  status: string;
  note: string;
}

export interface Initiative {
  id: string;
  pillarKey: string;
  title: string;
  division: string;
  owner: string;
  progressPercent: number;
  status: string;
  targetDate: string;
  valueMetric: string;
  description: string;
  updates: InitiativeUpdate[];
}

export interface StrategicPillar {
  key: string;
  name: string;
  description: string;
  initiatives: Initiative[];
}

export interface PrincipalRisk {
  id: string;
  name: string;
  category: string;
  owner: string;
  likelihood: string;
  impact: string;
  trend: string;
  mitigation: string;
}

export interface ProgressSummary {
  totalInitiatives: number;
  delivered: number;
  aheadOfPlan: number;
  averageProgressPercent: number;
  byPillar: { key: string; name: string; initiatives: number; averageProgressPercent: number }[];
}

export interface WorkscopePredictionRequest {
  programme: string;
  cyclesSinceNew: number;
  hoursSinceLastShopVisit: number;
  operatingEnvironment: string;
  hpTurbineBladeUpgraded: boolean;
  exhaustGasTemperatureMargin: number;
}

export interface WorkscopePrediction {
  recommendedWorkscope: WorkscopeLevel;
  confidencePercent: number;
  predictedTurnaroundDays: number;
  predictedCostGbpK: number;
  predictedTimeOnWingCycles: number;
  drivers: string[];
  recommendedActions: string[];
}

export interface PrognosticsRequest {
  programme: string;
  cyclesSinceNew: number;
  operatingEnvironment: string;
  hpTurbineBladeUpgraded: boolean;
  averageCyclesPerMonth: number;
}

export interface PrognosticsResult {
  programme: string;
  remainingUsefulLifeCycles: number;
  remainingUsefulLifeMonths: number;
  recommendedRemovalWindow: string;
  confidencePercent: number;
  degradationCurve: { cycles: number; healthIndex: number }[];
  assumptions: string[];
}

export interface ScenarioRequest {
  largeEfhPercentOf2019: number;
  totalShopVisits: number;
  oeDeliveries: number;
  civilMarginDeltaPoints: number;
  defenceMarginDeltaPoints: number;
  powerSystemsMarginDeltaPoints: number;
  supplyChainCashImpactGbpM: number;
}

export interface ScenarioResult {
  underlyingOperatingProfitGbpBn: number;
  freeCashFlowGbpBn: number;
  operatingMarginPercent: number;
  profitGuidanceStatus: string;
  cashFlowGuidanceStatus: string;
  contributions: { division: string; revenueGbpBn: number; operatingProfitGbpBn: number; marginPercent: number }[];
  commentary: string[];
}

export interface CreateShopVisitRequest {
  engineSerialNumber: string;
  programme: string;
  operator: string;
  siteId: string;
  workscope: WorkscopeLevel;
  inductionDate: string;
  isAogRisk: boolean;
  hpTurbineBladeUpgrade: boolean;
  notes: string;
}

export interface CreatePowerOrderRequest {
  customer: string;
  segment: string;
  application: string;
  product: string;
  region: string;
  valueGbpM: number;
  units: number;
  stage: OrderStage;
  expectedDelivery: string;
  frameworkAgreement: boolean;
  notes: string;
}
