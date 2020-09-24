import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

import { ContentPagesRoutingModule } from './content-pages-routing.module';

import { ComingSoonPageComponent } from './coming-soon/coming-soon-page.component';
import { ErrorPageComponent } from './error/error-page.component';
import { ForgotPasswordPageComponent } from './forgot-password/forgot-password-page.component';
import { LockScreenPageComponent } from './lock-screen/lock-screen-page.component';
import { LoginPageComponent } from './signin/login-page.component';
import { MaintenancePageComponent } from './maintenance/maintenance-page.component';
import { SupplierRegisterComponent } from './register/supplier-register.component';
import { SupplierLoginComponent } from './login/supplier-login.component';
import { FullPagesRoutingModule } from '../full-pages/full-pages-routing.module';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

@NgModule({
    imports: [
        CommonModule,
        ContentPagesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NgxSpinnerModule,
        FullPagesRoutingModule,
        LoadingBarHttpClientModule,
    ],
    declarations: [
        SupplierLoginComponent,
        SupplierRegisterComponent,
        ComingSoonPageComponent,
        ErrorPageComponent,
        ForgotPasswordPageComponent,
        LockScreenPageComponent,
        LoginPageComponent,
        MaintenancePageComponent
    ],
})
export class ContentPagesModule { }
