import { Injectable } from '@angular/core';
import { InfoUpdateRes,StaffService } from '../../../api/cinePOS-api';
import { Observable, Subject, filter, tap } from 'rxjs';
import { TextDialogService } from 'projects/share-libs/src/lib/features/text-dialog/services/text-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private staffService: StaffService,
    private textDialogService:TextDialogService
  ) { }
  /**修改員工姓名 */
  changeProfile$(InfoUpdateReq: { newName: string, staffId: string }): Observable<InfoUpdateRes> {
    return this.staffService.v1StaffUserProfilePost(InfoUpdateReq)
      .pipe(
        tap(res => res.code !== 1 && this.textDialogService.openErrorDialog(
          {
            title: '修改員工姓名錯誤',
            content: res.message!
          }
        )),
        filter(res => res.code === 1),
      )
  }

}
