import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from 'app/auth-guard.guard';
import { AdminProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddNewProductComponent } from './add-product/add-product.component';
import { ManageSuppliersComponent } from './manage-suppliers/manage-suppliers.component';
import { AddCategoryComponent } from '../common/category/add-category/add-category.component';
import { ManageCategoryComponent } from '../common/category/manage-category/manage-category.component';
import { ManageSubCategoryComponent } from '../common/sub-category/manage-sub-category/manage-sub-category.component';
import { AddSubCategoryComponent } from '../common/sub-category/add-sub-category/add-sub-category.component';
import { UpdateCategoryComponent } from '../common/category/update-category/update-category.component';


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
        path: 'suppliers',
        component: ManageSuppliersComponent,
        data: {
          title: 'Suppliers',
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
        component: UpdateCategoryComponent,
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
  exports: [RouterModule]
})
export class AdminRoutingModule { }
