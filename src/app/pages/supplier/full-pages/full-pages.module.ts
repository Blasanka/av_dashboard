import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SupplierComponent } from './dashboard/supplier.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularResizedEventModule } from 'angular-resize-event';
import { MatchHeightModule } from '../../../shared/directives/match-height.directive';
import { FullPagesRoutingModule } from './full-pages-routing.module';
import { ChartistModule } from 'ng-chartist';
import { AgmCoreModule } from '@agm/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { PipeModule } from 'app/shared/pipes/pipe.module';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AddProductComponent } from './products/add-product/add-product.component';
import { ManageProductComponent } from './products/manage-product/manage-product.component';
import { SupplierProfileComponent } from './profile/supplier-profile.component';
import { ManageOrdersComponent } from './orders/manage-orders/manage-orders.component';
import { NewReviewsComponent } from './reviews/new-reviews/new-reviews.component';
import { NewPromotionsComponent } from './promotions/new-promotions/new-promotions.component';
import { ManagePromotionsComponent } from './promotions/manage-promotions/manage-promotions.component';
import { AllReviewsComponent } from './reviews/all-reviews/all-reviews.component';
import { PendingOrdersComponent } from './orders/pending-orders/pending-orders.component';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { NgxSpinnerModule } from 'ngx-spinner';
import { QuillModule } from 'ngx-quill';
import { UpdateProductComponent } from './products/update-product/update-product.component';

@NgModule({
  imports: [
    FullPagesRoutingModule,
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
    AngularResizedEventModule,
    QuillModule.forRoot(),
  ],
  declarations: [
    SupplierComponent,
    AddProductComponent,
    ManageProductComponent,
    UpdateProductComponent,
    SupplierProfileComponent,
    PendingOrdersComponent,
    ManageOrdersComponent,
    NewReviewsComponent,
    AllReviewsComponent,
    NewPromotionsComponent,
    ManagePromotionsComponent,
  ],
})
export class FullPagesModule {}
