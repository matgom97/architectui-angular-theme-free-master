import { NgModule } from '@angular/core';
import { SharedModule } from './shared.module';
import { BaseChartDirective } from 'ng2-charts';
import { ComponentsModule } from './components.module';

// Dashboard Components
import { AnalyticsComponent } from './DemoPages/Dashboards/analytics/analytics.component';

@NgModule({
  declarations: [
    AnalyticsComponent
  ],
  imports: [
    SharedModule,
    BaseChartDirective,
    ComponentsModule
  ],
  exports: [
    AnalyticsComponent
  ]
})
export class DashboardsModule { }