import { Routes, RouterModule } from '@angular/router';

export const CONTENT_ROUTES: Routes = [
     {
        path: '',
        loadChildren: () => import('../../pages/supplier/content-pages/content-pages.module').then(m => m.ContentPagesModule)
    }
];
