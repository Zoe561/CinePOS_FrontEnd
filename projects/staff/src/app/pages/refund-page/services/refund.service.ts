import { Injectable } from '@angular/core';
import { CommonResSuccess, PatchOrderReqInner, PatchSeatReqInner, PatchTicketReqInner, StaffOrderSearchSuccess, StaffService } from '../../../api/cinePOS-api';
import { Observable, filter, forkJoin, tap } from 'rxjs';
import { TextDialogService } from 'projects/share-libs/src/lib/features/text-dialog/services/text-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class RefundService {

  constructor(
    private staffService:StaffService,
    private textDialogService:TextDialogService
  ) { }

  /**取得訂單下電影票 */
  v1StaffRefundOrderIdGet$(orderId: string): Observable<StaffOrderSearchSuccess> {
    return this.staffService.v1StaffOrderOrderIdGet(orderId)
      .pipe(
        tap(res => res.code !== 1 && this.textDialogService.openErrorDialog(
          {
            title: '查詢訂單錯誤',
            content: res.message!
          }
        )),
        filter(res => res.code === 1)
      )
  }
  /**退票 */
  refund$(
      seatArr:PatchSeatReqInner[],
      ticketArr:PatchTicketReqInner[],
      orderArr:PatchOrderReqInner[]): Observable<any> {
    return forkJoin([
      this.v1StaffSeatPatch$(seatArr),
      this.v1StaffTicketPatch$(ticketArr),
      this.v1StaffOrderPatch$(orderArr)
    ])
  }

  /**更新訂單狀態*/
  v1StaffOrderPatch$(body: Array<PatchOrderReqInner>): Observable<CommonResSuccess> {
    return this.staffService.v1StaffOrderPatch(body)
      .pipe(
        tap(res => res.code !== 1 && this.textDialogService.openErrorDialog(
          {
            title: '更新訂單狀態錯誤',
            content: res.message!
          }
        )),
        filter(res => res.code === 1)
      )
  }

  /**更新座位狀態*/
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

  /**更新電影票狀態*/
  v1StaffTicketPatch$(body: Array<PatchTicketReqInner>): Observable<CommonResSuccess> {
    return this.staffService.v1StaffTicketPatch(body)
      .pipe(
        tap(res => res.code !== 1 && this.textDialogService.openErrorDialog(
          {
            title: '更新電影票狀態錯誤',
            content: res.message!
          }
        )),
        filter(res => res.code === 1)
      )
  }

}
