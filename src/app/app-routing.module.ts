// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import { AuthGuard } from './services/auth.guard';
import { GuestGuard } from './services/guest.guard';
import { TrackComponent } from './demo/ui-component/track/track.component';
import { DefaultComponent } from './demo/default/dashboard/dashboard.component';
import { LiquidatorsComponent } from './demo/ui-component/liquidators/liquidators.component';
import { ReviewApplicationComponent } from './demo/ui-component/review-application/review-application.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
  {
    path: '',
    redirectTo: 'liquidators',
    pathMatch: 'full',
  },
  {
    path: 'dashboard/default',
    component:DefaultComponent,
  },
  {
    path: 'liquidators',
    component: LiquidatorsComponent,
  },
  {
    path: 'track',
    component: TrackComponent,
  },
  {
    path: 'review-application/:applicationId',
    component: ReviewApplicationComponent,
  },
  {
    path: 'approval-status',
    loadComponent: () =>
      import('../app/theme/shared/components/approval-status/approval-status.component').then((m) => m.ApprovalStatusComponent)
  },
]
  },
  {
    path: '',
    component: GuestComponent,
    canActivate: [GuestGuard],  // Protect guest routes with GuestGuard
    children: [
      {
        path: 'login',
        loadComponent: () => import('./demo/authentication/login/login.component').then((m) => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./demo/authentication/register/register.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule {} 
