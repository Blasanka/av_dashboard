import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from './layouts/full/full-layout.component';
import { ContentLayoutComponent } from './layouts/content/content-layout.component';

import { Full_ROUTES } from './shared/routes/full-layout.routes';
import { CONTENT_ROUTES } from './shared/routes/content-layout.routes';

import { SupplierLoginComponent } from './pages/supplier-login/supplier-login.component';
import { SupplierRegistrationComponent } from './pages/supplier-registration/supplier-registration.component';
import { SupplierProfileComponent } from './pages/supplier-profile/supplier-profile.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { AddProductComponent } from './pages/products/supplier/add-product/add-product.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'supplier/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    redirectTo: 'pages/login',
    pathMatch: 'full',
  },
  {
    path: 'pages',
    component: FullLayoutComponent,
    data: { title: 'full Views' },
    children: Full_ROUTES,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'pages',
    component: ContentLayoutComponent,
    data: { title: 'content Views' },
    children: CONTENT_ROUTES,
  },
  {
    path: 'supplier/login',
    component: SupplierLoginComponent,
    data: {
      title: 'Login Page',
    },
  },
  {
    path: 'supplier/registration',
    component: SupplierRegistrationComponent,
    data: {
      title: 'Login Page',
    },
  },
  {
    path: 'supplier/profile',
    component: SupplierProfileComponent,
    data: {
      title: 'Profile Page',
    },
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'pages/dashboard/supplier/product/add',
    component: AddProductComponent,
    data: {
      title: 'Add New Product',
    },
    canActivate: [AuthGuardGuard],
    pathMatch: 'full',
  },
  // {
  //   path: '**',
  //   redirectTo: 'pages/error',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
