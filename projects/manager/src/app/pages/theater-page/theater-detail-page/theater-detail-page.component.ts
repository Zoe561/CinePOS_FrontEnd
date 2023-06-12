import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TheaterService } from './../services/theater.service';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonOptionSuccessDataItem } from '../../../api/cinePOS-api';
import { CommonAPIService } from '../../../core/services/common-api/common.service';
import { Router } from '@angular/router';
import { STATIC_ROUTES } from '../../../core/constant/routes.constant';


@Component({
  selector: 'app-theater-detail-page',
  templateUrl: './theater-detail-page.component.html',
  styleUrls: ['./theater-detail-page.component.scss']
})
export class TheaterDetailPageComponent implements OnInit {

  formGroup!: FormGroup;

  /* API */
  typeOptions: CommonOptionSuccessDataItem[] = []; 

  /* 表單取值 */
  get theaterName() { return this.formGroup.get('theaterName') as FormControl; }        // 影廳名稱
  get theaterFloor() { return this.formGroup.get('theaterFloor') as FormControl; }        // 影廳樓層
  get theaterType() { return this.formGroup.get('theaterType') as FormControl; }        // 影廳類型
  get row() { return this.formGroup.get('row') as FormControl; }        // 直排格數
  get col() { return this.formGroup.get('col') as FormControl; }        // 橫排格數
  get rowType() { return this.formGroup.get('rowType') as FormControl; }        // row是英文還數字

  constructor(
    private commonAPIService: CommonAPIService,
    private changeDetectorRef: ChangeDetectorRef,
    private theaterService: TheaterService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
    this.initForm();

    //取得影廳類型資料
    this.getOptionAPI(2); 

    //default: row是英文
    this.formGroup.get('rowType')?.setValue(1);
  }

  // 當row & col輸入為小數點時自動轉為整數
  inputRow!: number;
  inputCol!: number;
  handleChange() {
    this.inputRow = Math.ceil(this.inputRow);
    this.inputCol = Math.ceil(this.inputCol);
  }

  // 查詢- 初始化表單
  initForm() {
    this.formGroup = new FormGroup({
      theaterName: new FormControl(""),
      theaterFloor: new FormControl(""),
      theaterType: new FormControl(""),
      row:  new FormControl(null),
      col: new FormControl(null),
      rowType: new FormControl(true)
    });
  }

  rows: number = 0;
  cols: number = 0;
  name: string = "";
  floor: number = 0;
  equipment: string = "";
  equipmentOption: number = 0;
  type: boolean = true;
  isVisible = false;
  createMap():void {

    this.name = this.theaterName?.value;
    this.floor = this.theaterFloor?.value;
    this.equipmentOption = this.theaterType?.value;
    this.equipment = this.selectedText;
    this.rows = this.row?.value;
    this.cols = this.col?.value;
    this.type = this.rowType?.value;

    if(this.rows > 0 && this.cols > 0){
      this.isVisible = true;
    } else {
      this.isVisible = false;
    }
  }

  step = 1; // 步驟順序
  nextStep():void {
    if(this.step === 1){
      this.name = this.theaterName?.value;
      this.floor = this.theaterFloor?.value;
      this.equipmentOption = this.theaterType?.value;
      this.equipment = this.selectedText;
    }

    if(this.step < 3){
      this.step++;
    }
  }

  lastStep():void {
    if(this.step != 1){
      this.step--;
    }

    // 若沒有按產生座位表，要把上一次輸入的值洗掉
    // TODO: 輸入框的值不知道為什麼洗不掉ＱＱ
    this.formGroup.get('theaterFloor')?.setValue(this.floor);
    this.formGroup.get('theaterType')?.setValue(this.equipmentOption);
    this.formGroup.get('rowType')?.setValue(this.type);
    this.formGroup.get('row')?.setValue(this.rows);
  }

  selectedText = "";
  handleOptionSelected(item: any) {
    this.selectedText = item?.name;
  }

  getSeatMapResult(result: any): void {
    // 在這裡處理回傳的 responseArr
    this.seatMap = result.seatMap;
    this.rowLabel = result.rowLabel;
    this.colLabel = result.colLabel;
  }

  seatMap: string[] = [];
  rowLabel: string[] = [];
  colLabel: string[] = [];

  finish(): void {
    console.log("=== get result ===");
    console.log(this.rowLabel);
    console.log(this.colLabel);
    console.log(this.seatMap);


    let totalCapacity: number = 0;
    let wheelChairCapacity: number = 0;
    for (const seatItem of this.seatMap) {
      if(seatItem != "N"){
        totalCapacity++;
      }

      if(seatItem === "1"){
        wheelChairCapacity++;
      }
    }

    let para: any = {
      name: this.name,
      type: this.equipmentOption,
      floor: this.floor,
      totalCapacity: totalCapacity,
      wheelChairCapacity: wheelChairCapacity,
      row: this.rows,
      col: this.cols,
      rowLabel: this.rowLabel,
      colLabel: this.colLabel,
      seatMap: this.seatMap,
      status: 0
    };

    this.theaterService.createTheater(para).subscribe(res => {
      console.log('新增影廳資訊-成功res', res);
      this.router.navigate([STATIC_ROUTES.THEATER, res.data.theater._id]);
      alert(res.message);
    });
  }

  // ————————————————————————————————  API  ————————————————————————————————
  // API- 取得選項資料
  getOptionAPI(typeId: number): void {
    this.commonAPIService.getOption(typeId).subscribe(res => {
      console.log(typeId, '取得選項資料-成功res', res);
      this.typeOptions = res.data as CommonOptionSuccessDataItem[];
      this.changeDetectorRef.detectChanges();
    });
  }
}
