import { Injectable } from '@angular/core';
import { CommonResSuccess, PatchSeatReqInner, StaffService } from '../../../api/cinePOS-api';
import { Observable, filter, forkJoin, tap } from 'rxjs';
import { TextDialogService } from 'projects/share-libs/src/lib/features/text-dialog/services/text-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class ShopCartService {

  constructor(
    private staffService: StaffService,
    private textDialogService:TextDialogService
  ) { }

  /**刪除購物車內容 */
  deleteShopCart$(ticketArr: string[],seatArr:PatchSeatReqInner[]): Observable<any> {
    return forkJoin([
      this.v1StaffTicketDelete$(ticketArr),
      this.v1StaffSeatPatch$(seatArr)
    ])
  }

  /**刪除電影票API */
  v1StaffTicketDelete$(ticketArr: string[]): Observable<CommonResSuccess> {
    return this.staffService.v1StaffTicketDelete(ticketArr)
      .pipe(
        tap(res => res.code !== 1 && this.textDialogService.openErrorDialog(
          {
            title: '刪除電影票錯誤',
            content: res.message!
          }
        )),
        filter(res => res.code === 1)
      )
  }
  /**更新座位狀態API */
  v1StaffSeatPatch$(body: Array<PatchSeatReqInner>): Observable<CommonResSuccess> {
    return this.staffService.v1StaffSeatPatch(body)
      .pipe(
        tap(res => res.code !== 1 && this.textDialogService.openErrorDialog(
          {
            title: '更新座位狀態錯誤',
            content: res.message!
          }
        )),
        filter(res => res.code === 1)
      )
  }


}
