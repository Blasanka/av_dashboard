import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { AdminProductsComponent } from './products/products.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartistModule } from 'ng-chartist';
import { AgmCoreModule } from '@agm/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { PipeModule } from 'app/shared/pipes/pipe.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatchHeightModule } from 'app/shared/directives/match-height.directive';
import { AngularResizedEventModule } from 'angular-resize-event';
import { Dashboard1Component } from './dashboard/dashboard1/dashboard1.component';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxSpinnerModule,
    LoadingBarHttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartistModule,
    AgmCoreModule,
    NgSelectModule,
    SwiperModule,
    PipeModule,
    NgxDatatableModule,
    CommonModule,
    MatchHeightModule,
    AngularResizedEventModule
  ],
  declarations: [
    LoginComponent,
    AdminProductsComponent,
    Dashboard1Component,
  ],
})
export class AdminModule { }