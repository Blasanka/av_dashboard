import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FullLayoutComponent } from './layouts/full/full-layout.component';
import { ContentLayoutComponent } from './layouts/content/content-layout.component';

import { FULL_ROUTES } from './shared/routes/full-layout.routes';
import { CONTENT_ROUTES } from './shared/routes/content-layout.routes';

import { AuthGuardGuard } from './auth-guard.guard';
import { ErrorPageComponent } from './pages/supplier/content-pages/error/error-page.component';
import { SupplierLoginComponent } from './pages/supplier/content-pages/login/supplier-login.component';
import { SupplierRegistrationComponent } from './pages/supplier/content-pages/registration/supplier-registration.component';
import { LoginComponent } from './pages/admin/login/login.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'supplier/login',
    canDeactivate: [AuthGuardGuard],
    pathMatch: 'full',
  },
  {
    path: 'admin',
    redirectTo: 'admin/login',
    canDeactivate: [AuthGuardGuard],
    pathMatch: 'full',
  },
  {
    path: 'admin/login',
    component: LoginComponent,
    data: {
      title: 'Login',
    },
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: FullLayoutComponent,
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: 'supplier/login',
    component: SupplierLoginComponent,
    data: {
      title: 'Login',
    },
    pathMatch: 'full',
  },
  {
    path: 'supplier/register',
    component: SupplierRegistrationComponent,
    data: {
      title: 'Register',
    },
    pathMatch: 'full',
  },
  {
    path: 'supplier',
    component: FullLayoutComponent,
    data: { title: 'Supplier' },
    children: FULL_ROUTES,
  },
  {
    path: 'pages',
    component: ContentLayoutComponent,
    data: { title: 'content Views' },
    children: CONTENT_ROUTES,
    pathMatch: 'full',
  },
  // {
  //   path: 'login',
  //   redirectTo: 'pages/login',
  //   pathMatch: 'full',
  // },
  {
    path: '**',
    component: ErrorPageComponent,
    data: {
      title: '404 Not Found',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
