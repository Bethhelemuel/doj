// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// project import
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CardComponent } from './components/card/card.component';
import { MatDialogModule } from '@angular/material/dialog';

// third party
import { NgScrollbarModule } from 'ngx-scrollbar';
import { IconModule } from '@ant-design/icons-angular';

// bootstrap import
import { NgbDropdownModule, NgbNavModule, NgbModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ApprovalStatusComponent } from './components/approval-status/approval-status.component';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbComponent,
    NgbDropdownModule,
    NgbNavModule,
    NgbModule,
    NgbCollapseModule,
    NgScrollbarModule,
    CardComponent,
    IconModule,
    MatDialogModule,
    ApprovalStatusComponent,
   // SnotifyModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    })
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbComponent,
    SpinnerComponent,
    NgbModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbCollapseModule,
    NgScrollbarModule,
    CardComponent,
    IconModule,
    ApprovalStatusComponent
  ],
  declarations: [SpinnerComponent],
  providers: [
    provideAnimations(),

    provideToastr({
      timeOut: 10000,
      closeButton: true,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true
    }),
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
  //  SnotifyService
  ]
})
export class SharedModule {}
