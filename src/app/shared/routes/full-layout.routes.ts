import { Routes, RouterModule } from '@angular/router';
import { SupplierLoginComponent } from 'app/pages/supplier/content-pages/login/supplier-login.component';
import { AuthGuardGuard } from 'app/auth-guard.guard';
import { SupplierRegisterComponent } from 'app/pages/supplier/content-pages/register/supplier-register.component';
import { SupplierProfileComponent } from 'app/pages/supplier/full-pages/profile/supplier-profile.component';

export const FULL_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'profile',
    component: SupplierProfileComponent,
    data: {
      title: 'Profile',
    },
    canActivate: [AuthGuardGuard],
    pathMatch: 'full',
  },
  {
    path: 'components',
    loadChildren: () => import('../../components/ui-components.module').then(m => m.UIComponentsModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('../../pages/supplier/full-pages/full-pages.module').then(m => m.FullPagesModule),
    canActivate: [AuthGuardGuard],
  },
];
