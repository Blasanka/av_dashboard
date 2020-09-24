import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from 'app/auth-guard.guard';
import { AdminProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddNewProductComponent } from './add-product/add-product.component';


const routes: Routes = [
  {
    path: 'dashboard',
    children: [
      {
        path: '',
        component: DashboardComponent,
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
      {
        path: 'products/add',
        component: AddNewProductComponent,
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
