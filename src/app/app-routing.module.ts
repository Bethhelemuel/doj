// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import { AuthGuard } from './services/auth.guard';
import { GuestGuard } from './services/guest.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard], 
    children: [
      {
        path: '',
        redirectTo: '/dashboard/default',
        pathMatch: 'full'
      },
      {
        path: 'dashboard/default',
        loadComponent: () => import('./demo/default/dashboard/dashboard.component').then((c) => c.DefaultComponent)
      },
      {
        path: 'liquidators',
        loadComponent: () => import('./demo/ui-component/liquidators/liquidators.component').then((m) => m.LiquidatorsComponent)
      },
      {
        path: 'track',
        loadComponent: () => import('./demo/ui-component/track/track.component').then((m) => m.TrackComponent)
      },
      {
        path: 'typography',
        loadComponent: () => import('./demo/ui-component/typography/typography.component')
      },

      {
        path: 'color',
        loadComponent: () => import('./demo/ui-component/ui-color/ui-color.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/other/sample-page/sample-page.component')
      },

    
    ]
  },
  {
    path: 'approval-status',
    loadComponent: () =>
      import('../app/theme/shared/components/approval-status/approval-status.component').then((m) => m.ApprovalStatusComponent)
  },
  {
    path: '',
    component: GuestComponent,
    canActivate: [GuestGuard],  // Protect guest routes with GuestGuard
    children: [
      {
        path: 'login',
        loadComponent: () => import('./demo/authentication/login/login.component')
      },
      {
        path: 'register',
        loadComponent: () => import('./demo/authentication/register/register.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
