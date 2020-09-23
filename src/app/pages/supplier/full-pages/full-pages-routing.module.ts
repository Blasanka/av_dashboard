import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddProductComponent } from './products/add-product/add-product.component';
import { AuthGuardGuard } from 'app/auth-guard.guard';
import { ManageProductComponent } from './products/manage-product/manage-product.component';
import { SupplierComponent } from './dashboard/supplier.component';
import { UpdateProductComponent } from './products/update-product/update-product.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: SupplierComponent,
        data: {
          title: 'Dashboard',
        },
        canActivate: [AuthGuardGuard],
      },
      {
        path: 'products/add',
        component: AddProductComponent,
        data: {
          title: 'Add New Product',
        },
        canActivate: [AuthGuardGuard],
        pathMatch: 'full',
      },
      {
        path: 'products/manage',
        component: ManageProductComponent,
        data: {
          title: 'Manage Your Products',
        },
        canActivate: [AuthGuardGuard],
        pathMatch: 'full',
      },
      {
        path: 'products/manage/update',
        component: UpdateProductComponent,
        data: {
          title: 'Update Product',
        },
        canActivate: [AuthGuardGuard],
        pathMatch: 'full',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullPagesRoutingModule { }
