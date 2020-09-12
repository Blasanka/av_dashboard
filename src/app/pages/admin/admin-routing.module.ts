import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from 'app/auth-guard.guard';
import { AdminProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { Dashboard1Component } from './dashboard/dashboard1/dashboard1.component';


const routes: Routes = [
  {
    path: 'dashboard',
    children: [
      {
        path: '',
        component: Dashboard1Component,
        data: {
          title: 'Dashboard',
        },
        canActivate: [AuthGuardGuard],
        pathMatch: 'full',
      },
      {
        path: 'products',
        component: AdminProductsComponent,
        data: {
          title: 'Products',
        },
        canActivate: [AuthGuardGuard],
        pathMatch: 'full',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
