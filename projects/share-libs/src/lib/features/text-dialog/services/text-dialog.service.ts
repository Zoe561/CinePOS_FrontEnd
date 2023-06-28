import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TextDialogComponent } from '../components/text-dialog.component';
interface TextDialogData {
  /**標題(html) */
  title: string
  /**內容(html) */
  content: string;
}
@Injectable({
  providedIn: 'root'
})
export class TextDialogService {

  constructor(
    private dialog: MatDialog,
  ) { }

  /**開啟純文字彈跳視窗 */
  openTextDialog(textDialogData:TextDialogData): void{
    textDialogData.title = `<p class="text-center flex justify-center items-center">
    ${textDialogData.title}</p>`;

    textDialogData.content = `<p class="text-center">${textDialogData.content?? '未知訊息'}</p>`;
    this.dialog.open(TextDialogComponent, {
        width: '450px',
        data: textDialogData
      }
    );
  }

  /**開啟錯誤文字彈跳視窗 */
  openErrorDialog(textDialogData:TextDialogData): void{
    textDialogData.title = `<p class="text-center flex justify-center items-center">
      <img class="inline-block mr-1" src="assets/images/icon/warning.svg" alt="warning">
      ${textDialogData.title}</p>`;

      textDialogData.content = `<p class="text-center">${textDialogData.content?? '未知錯誤'}</p>`;
    this.dialog.open(TextDialogComponent, {
        width: '450px',
        data: textDialogData
      }
    );
  }

  /**開啟成功文字彈跳視窗 */
  openSuccessDialog(textDialogData:TextDialogData): void{
    textDialogData.title = `<p class="text-center flex justify-center items-center">
      <img class="inline-block mr-2 w-5" src="assets/images/icon/ok.png" alt="ok">
      ${textDialogData.title}</p>`;

      textDialogData.content = `<p class="text-center">${textDialogData.content?? '成功'}</p>`;
    this.dialog.open(TextDialogComponent, {
        width: '450px',
        data: textDialogData
      }
    );
  }
}
