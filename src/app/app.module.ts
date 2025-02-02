import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AgmCoreModule } from '@agm/core';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StoreModule } from '@ngrx/store';
import { DragulaService } from 'ng2-dragula';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
} from 'ngx-perfect-scrollbar';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import * as fromApp from './store/app.reducer';
import { AppComponent } from './app.component';
import { ContentLayoutComponent } from './layouts/content/content-layout.component';
import { FullLayoutComponent } from './layouts/full/full-layout.component';

import { AuthService } from './shared/auth/auth.service';
import { AuthGuard } from './shared/auth/auth-guard.service';
import { WINDOW_PROVIDERS } from './shared/services/window.service';
import { SupplierLoginComponent } from './pages/supplier-login/supplier-login.component';
import { SupplierRegistrationComponent } from './pages/supplier-registration/supplier-registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SupplierProfileComponent } from './pages/supplier-profile/supplier-profile.component';
import { NewProductComponent } from './pages/products/new-product/new-product.component';
import { ManageProductsComponent } from './pages/products/manage-products/manage-products.component';
import { PendingOrdersComponent } from './pages/orders/pending-orders/pending-orders.component';
import { ManageOrdersComponent } from './pages/orders/manage-orders/manage-orders.component';
import { NewReviewsComponent } from './pages/reviews/new-reviews/new-reviews.component';
import { AllReviewsComponent } from './pages/reviews/all-reviews/all-reviews.component';
import { NewPromotionsComponent } from './pages/promotions/new-promotions/new-promotions.component';
import { ManagePromotionsComponent } from './pages/promotions/manage-promotions/manage-promotions.component';
import { AddProductComponent } from './pages/products/supplier/add-product/add-product.component';
import { ProductListComponent } from './pages/products/supplier/product-list/product-list.component';

var firebaseConfig = {
  apiKey: 'YOUR_API_KEY', // YOUR_API_KEY
  authDomain: 'YOUR_AUTH_DOMAIN', // YOUR_AUTH_DOMAIN
  databaseURL: 'YOUR_DATABASE_URL', // YOUR_DATABASE_URL
  projectId: 'YOUR_PROJECT_ID', // YOUR_PROJECT_ID
  storageBucket: 'YOUR_STORAGE_BUCKET', // YOUR_STORAGE_BUCKET
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID', // YOUR_MESSAGING_SENDER_ID
  appId: 'YOUR_APP_ID', // YOUR_APP_ID
  measurementId: 'YOUR_MEASUREMENT_ID', // YOUR_MEASUREMENT_ID
};

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false,
};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    ContentLayoutComponent,
    SupplierLoginComponent,
    SupplierRegistrationComponent,
    SupplierProfileComponent,
    NewProductComponent,
    ManageProductsComponent,
    PendingOrdersComponent,
    ManageOrdersComponent,
    NewReviewsComponent,
    AllReviewsComponent,
    NewPromotionsComponent,
    ManagePromotionsComponent,
    AddProductComponent,
    ProductListComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    StoreModule.forRoot(fromApp.appReducer),
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    ToastrModule.forRoot(),
    NgbModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    DeviceDetectorModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAP_API_KEY',
    }),
    PerfectScrollbarModule,
    LoadingBarHttpClientModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    DragulaService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    WINDOW_PROVIDERS,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
