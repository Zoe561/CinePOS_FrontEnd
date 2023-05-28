import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadersModule } from './features/headers/components/headers.module';
import { MatSliderModule } from '@angular/material/slider';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { TimetablePageComponent } from './pages/timetable-page/timetable-page.component';
import { LayoutComponent } from './core/components/layout/layout.component';
import { ShareLibsModule } from 'projects/share-libs/src/public-api';
import { TableModule } from './features/table/table.module';
import { SamplePageComponent } from './pages/sample-page/sample-page.component';
import { CardModule } from './features/card/card.module';
import { SideNavModule } from './features/side-nav/component/side-nav.module';
import { GuidelineBackComponent } from './pages/guideline-back/guideline-back.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreDirectivesModule } from 'projects/share-libs/src/lib/core/directives/core-directives.module';
import { MatButtonModule } from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DxSchedulerModule,DxDraggableModule } from 'devextreme-angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RatePipe } from './pages/timetable-page/pipe/rate.pipe';
import { ExternalApiModule } from './api/external-api.module';
import { environment } from '../environments/environment';
import { ApiModule as CinePosApiModule ,BASE_PATH, Configuration } from "./api/cinePOS-api";
import { ApiHeaderInterceptor } from './core/interceptor/api-header';
import { ErrorHeaderInterceptor } from './core/interceptor/error-interceptor';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';

const materialModules = [
  MatInputModule,
  MatSliderModule,
  MatRadioModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonModule,
  MatPaginatorModule
];

const featureModules = [
  HeadersModule,
  TableModule,
  CardModule,
  SideNavModule
];
// 自訂日期格式
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'YYYY MMM',
    dateA11yLabel: 'YYYY/MM/DD',
    monthYearA11yLabel: 'YYYY MMM'
  },
};

// 提供 DateAdapter
export class MyDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${year}/${month}/${day}`;
    } else {
      return date.toDateString();
    }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    TimetablePageComponent,
    LayoutComponent,
    SamplePageComponent,
    GuidelineBackComponent,
    RatePipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ...featureModules,
    ...materialModules,
    ShareLibsModule,
    ReactiveFormsModule,
    CoreDirectivesModule,
    DxSchedulerModule,
    HttpClientModule,
    DxDraggableModule,
    CinePosApiModule.forRoot(() => new Configuration()),
  ],
  exports: [
    ...materialModules
  ],
  providers: [
    ExternalApiModule.apiUrlProvider(BASE_PATH, environment.cinePosApi),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiHeaderInterceptor,
      multi: true
    },
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHeaderInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

export function getBaseHref(platformLocation: PlatformLocation): string {
  return platformLocation.getBaseHrefFromDOM();
}
