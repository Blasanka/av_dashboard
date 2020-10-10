import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddProductComponent } from './products/add-product/add-product.component';
import { AuthGuardGuard } from 'app/auth-guard.guard';
import { ManageProductComponent } from './products/manage-product/manage-product.component';
import { SupplierComponent } from './dashboard/supplier.component';
import { UpdateProductComponent } from './products/update-product/update-product.component';
import { AddCategoryComponent } from 'app/pages/common/category/add-category/add-category.component';
import { ManageCategoryComponent } from 'app/pages/common/category/manage-category/manage-category.component';
import { ManageSubCategoryComponent } from 'app/pages/common/sub-category/manage-sub-category/manage-sub-category.component';
import { AddSubCategoryComponent } from 'app/pages/common/sub-category/add-sub-category/add-sub-category.component';
import { UpdateCategoryComponent } from 'app/pages/common/category/update-category/update-category.component';
import { UpdateSubCategoryComponent } from 'app/pages/common/sub-category/update-sub-category/update-sub-category.component';

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
        path: 'products/manage/update/:id',
        component: UpdateProductComponent,
        data: {
          title: 'Update Product',
        },
        canActivate: [AuthGuardGuard],
        pathMatch: 'full',
      },
      {
        path: 'categories/add',
        component: AddCategoryComponent,
        data: {
          title: 'Add Category',
        },
        canActivate: [AuthGuardGuard],
        pathMatch: 'full',
      },
      {
        path: 'categories/manage',
        component: ManageCategoryComponent,
        data: {
          title: 'Manage Category',
        },
        canActivate: [AuthGuardGuard],
        pathMatch: 'full',
      },
      {
        path: 'categories/manage/update/:id',
        component: UpdateCategoryComponent,
        data: {
          title: 'Manage Category',
        },
        canActivate: [AuthGuardGuard],
        pathMatch: 'full',
      },
      {
        path: 'sub-categories/add',
        component: AddSubCategoryComponent,
        data: {
          title: 'Add Sub Category',
        },
        canActivate: [AuthGuardGuard],
        pathMatch: 'full',
      },
      {
        path: 'sub-categories/manage',
        component: ManageSubCategoryComponent,
        data: {
          title: 'Manage Sub Category',
        },
        canActivate: [AuthGuardGuard],
        pathMatch: 'full',
      },
      {
        path: 'sub-categories/manage/update/:id',
        component: UpdateSubCategoryComponent,
        data: {
          title: 'Manage Sub Category',
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
