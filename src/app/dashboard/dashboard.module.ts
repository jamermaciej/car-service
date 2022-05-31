import { SharedModule } from './../shared/shared.module';
import { TranslocoLocaleModule } from '@ngneat/transloco-locale';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';
import { MatTableModule } from '@angular/material/table';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashbaord/dashboard/dashboard.component';
import {
  AgendaService,
  DayService,
  MonthAgendaService,
  MonthService,
  TimelineMonthService,
  TimelineViewsService,
  WeekService,
  WorkWeekService
} from '@syncfusion/ej2-angular-schedule';
import { ScheduleComponent } from './schedule/schedule.component';

@NgModule({
  declarations: [DashboardComponent, ScheduleComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatTableModule,
    TranslocoModule,
    MatIconModule,
    TranslocoLocaleModule,
    SharedModule,
  ],
  providers: [
    AgendaService,
    DayService,
    MonthAgendaService,
    MonthService,
    TimelineMonthService,
    TimelineViewsService,
    WeekService,
    WorkWeekService
  ]
})
export class DashboardModule {}
