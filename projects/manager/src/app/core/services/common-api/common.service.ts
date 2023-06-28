import { Injectable } from '@angular/core';
import { Observable, filter, tap } from 'rxjs';
import { CommonService } from '../../../api/cinePOS-api/api/common.service';
import { CommonUploadSuccess } from '../../../api/cinePOS-api/model/commonUploadSuccess';
import { CommonOptionSuccess } from '../../../api/cinePOS-api/model/commonOptionSuccess';
import { TextDialogService } from 'projects/share-libs/src/lib/features/text-dialog/services/text-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class CommonAPIService {

  constructor(
    private _CommonService: CommonService,
    private textDialogService:TextDialogService
  ) { }

  // 上傳
  upload(upload: Blob, fileType: string): Observable<CommonUploadSuccess> {
    return this._CommonService.v1CommonUploadPostForm(upload, fileType)
      .pipe(
        tap(res => res.code !== 1 && this.textDialogService.openErrorDialog(
          {
            title: '上傳檔案錯誤',
            content: res.message!
          }
        )),
        filter(res => res.code === 1)
      )
  }



  // 取得選項資料
  getOption(typeId: number): Observable<CommonOptionSuccess> {
    return this._CommonService.v1CommonOptionTypeIdGet(typeId)
      .pipe(
        tap(res => res.code !== 1 && this.textDialogService.openErrorDialog(
          {
            title: '取得選項資料錯誤',
            content: res.message!
          }
        )),
        filter(res => res.code === 1)
      )
  }

}
