import { Injectable } from '@angular/core';
import { Observable, filter, tap } from 'rxjs';
import { ManagerService } from '../../../api/cinePOS-api/api/manager.service';
import { DashboardMetricSuccess } from '../../../api/cinePOS-api/model/dashboardMetricSuccess';
import { DashboardBoxOfficeChartSuccess } from '../../../api/cinePOS-api/model/dashboardBoxOfficeChartSuccess';
import { TextDialogService } from 'projects/share-libs/src/lib/features/text-dialog/services/text-dialog.service';

@Injectable({
  providedIn: 'root'
})

export class DashboardPageService {

  constructor(
    private _ManagerService: ManagerService,
    private textDialogService:TextDialogService
  ) { }

  // 取得當日營收
  getMetric(searchDate: string): Observable<DashboardMetricSuccess> {
    return this._ManagerService.v1ManagerDashboardMetricGet(searchDate)
      .pipe(
        tap(res => res.code !== 1 && this.textDialogService.openErrorDialog(
          {
            title: '取得當日營收錯誤',
            content: res.message!
          }
        )),
        filter(res => res.code === 1)
      )
  }


  // 取得票房圖表資料
  getBoxOfficeChartData(searchDate: string): Observable<DashboardBoxOfficeChartSuccess> {
    return this._ManagerService.v1ManagerDashboardBoxOfficeGet(searchDate)
      .pipe(
        tap(res => res.code !== 1 && this.textDialogService.openErrorDialog(
          {
            title: '取得票房圖表錯誤',
            content: res.message!
          }
        )),
        filter(res => res.code === 1)
      )
  }



}
