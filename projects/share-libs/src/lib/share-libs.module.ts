import { NgModule } from '@angular/core';
import { LoginComponent } from './features/login/components/login.component';
import { ShareLibsComponent } from './share-libs.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CoreDirectivesModule } from './core/directives/core-directives.module';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './features/loading/components/loading.component';
import { LoadingService } from './features/loading/loading.service';
import { LoadingInterceptor } from './features/loading/loading.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { TextDialogComponent } from './features/text-dialog/components/text-dialog.component';
import { ToThousandPipe } from './core/pipe/to-thousand/to-thousand.pipe';



const materialModules = [
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatDialogModule
];


@NgModule({
  declarations: [
    ShareLibsComponent,
    LoginComponent,
    LoadingComponent,
    TextDialogComponent,
    ToThousandPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreDirectivesModule,
    ...materialModules
  ],
  exports: [
    ShareLibsComponent,
    LoginComponent,
    LoadingComponent,
    TextDialogComponent,
    ToThousandPipe
  ],
  providers:[
    LoadingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    }
  ]
})
export class ShareLibsModule { }
