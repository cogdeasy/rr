import { Routes } from '@angular/router';

import { ShellComponent } from './pages/layout/shell.component';
import { GroupOverviewComponent } from './pages/group/group-overview.component';
import { GuidanceComponent } from './pages/guidance/guidance.component';
import { CivilAerospaceComponent } from './pages/civil-aerospace/civil-aerospace.component';
import { MroOperationsComponent } from './pages/mro-operations/mro-operations.component';
import { DefenceComponent } from './pages/defence/defence.component';
import { PowerSystemsComponent } from './pages/power-systems/power-systems.component';
import { NuclearComponent } from './pages/nuclear/nuclear.component';
import { TransformationComponent } from './pages/transformation/transformation.component';
import { RisksComponent } from './pages/risks/risks.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: '', redirectTo: 'group', pathMatch: 'full' },
      { path: 'group', component: GroupOverviewComponent },
      { path: 'guidance', component: GuidanceComponent },
      { path: 'civil-aerospace', component: CivilAerospaceComponent },
      { path: 'mro-operations', component: MroOperationsComponent },
      { path: 'defence', component: DefenceComponent },
      { path: 'power-systems', component: PowerSystemsComponent },
      { path: 'nuclear', component: NuclearComponent },
      { path: 'transformation', component: TransformationComponent },
      { path: 'risks', component: RisksComponent },
      { path: 'analytics', component: AnalyticsComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
