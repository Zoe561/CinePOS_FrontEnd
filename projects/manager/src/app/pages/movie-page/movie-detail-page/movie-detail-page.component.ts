import { MoviePageService } from './../services/movie-page.service';
import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDetailRes } from '../../../api/cinePOS-api';
import { CommonOptionSuccessDataItem } from '../../../api/cinePOS-api/model/commonOptionSuccessDataItem';
import { CommonAPIService } from '../../../core/services/common-api/common.service';
import { range } from 'rxjs';
import { MovieDetailUpdateParameter } from '../../../api/cinePOS-api/model/movieDetailUpdateParameter';
import { MovieDetailCreateParameterCustomer, MovieDetailUpdateParameterCustomer } from '../../../core/interface/movie';
import { STATIC_ROUTES } from '../../../core/constant/routes.constant';
import { ChatGPTService } from '../services/chatGPT.service';
import { LoadingService } from 'projects/share-libs/src/public-api';

@Component({
  selector: 'app-movie-detail-page',
  templateUrl: './movie-detail-page.component.html',
  styleUrls: ['./movie-detail-page.component.scss']
})

export class MovieDetailPageComponent implements OnInit, AfterViewInit {
  isEdit: boolean = false;                                                                  // 是否為編輯頁（true：是）
  formGroup!: FormGroup;
  movieId: string = "";                                                                     // 電影編號
  isOpenBrainStormTitleArea: boolean = false;                                               // 電影名稱- 是否開啟電影中文發想區
  brainStormTitle: string = "";                                                             // 電影名稱- chatGPT發想的中文片名

  /* API */
  movieInfoAPI!: MovieDetailRes;                                                            // API- 電影資訊
  genreOptions: CommonOptionSuccessDataItem[] = [];                                         // API- 選項：電影類型
  provideVersionOptions: CommonOptionSuccessDataItem[] = [];                                // API- 選項：提供設備
  rateOptions: CommonOptionSuccessDataItem[] = [];                                          // API- 選項：分級
  statusOptions: CommonOptionSuccessDataItem[] = [];                                        // API- 選項：狀態
  titleChatGPTMsg = [{                                                                      // API- 電影中文發想chatGPT相關API參數
    role: 'assistant',
    content: "你今後的對話中，請你扮演我的電影企劃，負責幫我發想適合的中文片名。我會給你這部影片的相關資訊，請你以電影主旨、劇情、原文片名等等相關資訊，給我五個具有創意、令人印象深刻的中文片名！請以數字列點式的方式回答我（不需要告知命名原因），每筆資料結尾請幫我換行。謝謝你！}"
  }];
  articleChatGPTMsg = [{                                                                    // API- 電影描述chatGPT相關API參數
    role: 'assistant',
    content: "你今後的對話中，請你扮演我的文字編輯，負責幫我把「電影介紹的文案」做潤飾，使我的文案看起來更加順暢(請注意，不可改變片名、演員名稱)。"
  }];

  /* 表單取值 */
  get title() { return this.formGroup.get('title') as FormControl; }                        // 電影名稱
  get enTitle() { return this.formGroup.get('enTitle') as FormControl; }                    // 電影英文名稱
  get genre() { return this.formGroup.get('genre') as FormControl; }                        // 電影類型
  get runtime() { return this.formGroup.get('runtime') as FormControl; }                    // 片長
  get provideVersion() { return this.formGroup.get('provideVersion') as FormControl; }      // 版本
  get rate() { return this.formGroup.get('rate') as FormControl; }                          // 分級
  get director() { return this.formGroup.get('director') as FormControl; }                  // 導演
  get cast() { return this.formGroup.get('cast') as FormArray; }                            // 演員
  get description() { return this.formGroup.get('description') as FormControl; }            // 電影描述
  get status() { return this.formGroup.get('status') as FormControl; }                      // 狀態
  get releaseDate() { return this.formGroup.get('releaseDate') as FormControl; }            // 上映日期
  get trailerLink() { return this.formGroup.get('trailerLink') as FormControl; }            // 預告片連結
  get distributor() { return this.formGroup.get('distributor') as FormControl; }            // 發行商
  get posterUrl() { return this.formGroup.get('posterUrl') as FormControl; }                // 海報連結

  constructor(
    private _Route: ActivatedRoute,
    private _Router: Router,
    private _MoviePageService: MoviePageService,
    private _CommonAPIService: CommonAPIService,
    private _ChatGPTService: ChatGPTService,
    private _ChangeDetectorRef: ChangeDetectorRef,
    private _LoadingService: LoadingService
  ) {
    this._ChatGPTService.getChatGPTToken();
  }

  ngOnInit(): void {
    this.initForm();
    this.isEdit = (this._Route.snapshot?.url[1]?.path) === 'edit';
    console.log('isEdit', this.isEdit, this._Route.snapshot);

    this.getOptionAPI();                                       // API- 取得選項資料

    if (this.isEdit) {
      // 編輯狀態
      this.movieId = this._Route.snapshot.params['id'];
      this.getMovieInfoAPI(this.movieId); // API- 取得電影資訊

    } else {
      // 新增狀態
      this.addCast();
    };
  }

  ngAfterViewInit() {
    this._ChangeDetectorRef.detectChanges();
  }

  initForm(): void {
    this.formGroup = new FormGroup({
      title: new FormControl("", [Validators.required]),
      enTitle: new FormControl("", [Validators.pattern(/^[^\u4e00-\u9fa5]+$/)]),
      genre: new FormControl(null, [Validators.required]),
      runtime: new FormControl(null, [Validators.required]),
      provideVersion: new FormControl(null, [Validators.required]),
      rate: new FormControl(null, [Validators.required]),
      director: new FormControl(""),
      cast: new FormArray([]),
      description: new FormControl("", [Validators.maxLength(300)]),
      status: new FormControl(0, [Validators.required]),
      releaseDate: new FormControl(null, [Validators.required]),
      trailerLink: new FormControl("", [Validators.pattern(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/)]),
      distributor: new FormControl("",),
      posterUrl: new FormControl("", [Validators.required]),
    });
  }



  // 帶回表單資料
  setForm(data: MovieDetailRes): void {
    if (this.isEdit) {
      this.formGroup.patchValue(data);
      (data.cast as string[]).forEach((item: string) => {
        this.cast.push(new FormControl(item));
      });
    };
    this._ChangeDetectorRef.detectChanges();
    console.log('formGroup- 帶值', this.formGroup);
  }



  // 電影中文- 顯示電影中文發想區
  toggleBrainStormTitleArea() {
    this.isOpenBrainStormTitleArea = true;
  }



  // 電影中文- 取得建議
  async createMovieTitle() {
    if (this.enTitle.value || this.title.value || this.description.value) {
      this._LoadingService.loading(true);
      let newTitleMsg = this.getNewTitleMsg();
      let newAdvice = await this._ChatGPTService.getAdvice(newTitleMsg);
      console.log('newArticle', newAdvice, newAdvice.choices[0].message.content);
      this.brainStormTitle = newAdvice.choices[0].message.content;
      this._LoadingService.loading(false);

    } else {
      alert("請至少輸入電影英文名稱、電影簡介，或是目前發想的中文片名！");
    };
  }



  // 電影描述- 取得一鍵優化API參數
  getNewTitleMsg() {
    let movieInfo = "";
    let messgae = { role: 'assistant', content: "" };

    // 基本指令
    if (this.titleChatGPTMsg.length > 1) {
      messgae.content = '謝謝你之前提供的電影中文名稱發想。請你根據我最新提供的電影資訊，再給我五個具有創意、令人印象深刻的中文片名！請注意，請以數字列點式的方式回答我（不需要告知命名原因），每筆資料結尾請幫我換行。謝謝你！';
    } else {
      messgae.content = '請你根據我提供的電影資訊，給我五個具有創意、令人印象深刻的中文片名！';
    };

    // 電影資訊
    if (this.title.value) {
      movieInfo += `現在暫定的電影中文名稱：${this.title.value},`;
    };

    if (this.enTitle.value) {
      movieInfo += `電影原文片名：${this.enTitle.value},`;
    };

    if (this.description.value) {
      movieInfo += `電影簡介：${this.description.value},`;
    };

    messgae.content += movieInfo;
    this.titleChatGPTMsg.push(messgae);

    return this.titleChatGPTMsg;
  }




  // 主演- 新增
  addCast(): void {
    this.cast.push(new FormControl(""));
  }


  // 主演- 刪除
  removeCast(idx: number): void {
    this.cast.removeAt(idx);
  }



  // 上傳檔案- 選擇檔案
  onFileSelect(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('上傳檔案原始檔', file);

      this.postPosterAPI(file);
    };
  }



  // 電影描述- 一鍵優化
  async improveArticle() {
    console.log(123)
    if (this.description.value) {
      this._LoadingService.loading(true);
      let newArticleMsg = this.getNewArticleMsg(this.description.value);
      let newAdvice = await this._ChatGPTService.getAdvice(newArticleMsg);
      console.log('newArticle', newAdvice, newAdvice.choices[0].message.content);
      this._LoadingService.loading(false);
      this.description.setValue(newAdvice.choices[0].message.content);

    } else {
      alert("請先填寫電影描述，才能使用此功能！");
    };
  }



  // 電影描述- 取得一鍵優化API參數
  getNewArticleMsg(description: string) {
    let messgae = { role: 'assistant', content: description };

    if (this.titleChatGPTMsg.length > 1) {
      if (description) {
        messgae.content = '謝謝你之前提供的文案，我已經將你的文案稍作調整，請你根據調整方向再給我一份更符合我需求的文案。以下為我剛剛微調的文案：' + description;
      } else {
        messgae.content = "剛剛的文案我不太滿意，請你再幫我做一次文案的潤飾！謝謝你！"
      };
    };

    this.articleChatGPTMsg.push(messgae);
    return this.articleChatGPTMsg;
  }



  // 共用- 錯誤訊息
  getErrorMsg(control: AbstractControl): string {
    let errorMsg = "";
    let error = control.errors;

    if (error && (control.touched || control.dirty)) {
      if (error['required']) {
        errorMsg = "此為必填欄位";
      } else if (error['pattern']) {
        errorMsg = "格式錯誤";
      };
    };

    return errorMsg;
  }



  // 送單- 整理參數
  getCreateMovieDetailPara(isEdit: boolean): MovieDetailCreateParameterCustomer | MovieDetailUpdateParameter {
    let para: MovieDetailCreateParameterCustomer | MovieDetailUpdateParameter = {
      _id: this.movieId,
      title: this.title.value,
      enTitle: this.enTitle.value,
      genre: this.genre.value,
      runtime: this.runtime.value,
      provideVersion: this.provideVersion.value,
      rate: this.rate.value,
      director: this.director.value,
      cast: this.cast.value,
      description: this.description.value,
      status: this.status.value,
      releaseDate: this.releaseDate.value,
      trailerLink: this.trailerLink.value,
      distributor: this.distributor.value,
      posterUrl: this.posterUrl.value,
    };

    if (!isEdit) {
      delete para._id;
    };
    console.log('送單參數', para);

    return para;
  }



  // 送單
  submit(): void {
    console.log(this.formGroup);
    if (this.formGroup.valid) {
      if (this.isEdit) {
        let para = this.getCreateMovieDetailPara(true);                                        // 整理參數
        this.patchUpdateMovieDetailAPI(para as MovieDetailUpdateParameter);                    // API- 更新電影資訊

      } else {
        let para = this.getCreateMovieDetailPara(false);                                       // 整理參數
        this.postCreateMovieDetailAPI(para as MovieDetailCreateParameterCustomer);             // API- 新增電影資訊
      };

    } else {
      this.formGroup.markAllAsTouched();
      alert("請填寫必填欄位");
    };
  }





  // ————————————————————————————————  API  ————————————————————————————————
  // API- 取得電影資訊
  getMovieInfoAPI(id: string): void {
    setTimeout(() => {
      this._MoviePageService.getMovieDetail(id).subscribe(res => {
        console.log(res)
        this.movieInfoAPI = res.data as MovieDetailRes;
        this._ChangeDetectorRef.detectChanges();

        this.setForm(this.movieInfoAPI);
      });
    });
  }



  // API- 上傳海報
  postPosterAPI(file: Blob): void {
    const formData = new FormData();
    formData.append('upload', file);

    this._CommonAPIService.upload(file, "image").subscribe(res => {
      console.log('上傳檔案成功response', res);
      this.posterUrl.setValue(res.data?.fileUrl);
    });
  }



  // API- 新增電影資訊
  postCreateMovieDetailAPI(para: MovieDetailCreateParameterCustomer): void {
    this._MoviePageService.createMovieDetail(para).subscribe(res => {
      console.log('新增電影資訊-成功res', res);
      this._Router.navigate([STATIC_ROUTES.MOVIE, STATIC_ROUTES.DETAIL, (res.data as MovieDetailCreateParameterCustomer)._id]);
      alert(res.message);
    });
  }


  // API- 更新電影資訊
  patchUpdateMovieDetailAPI(para: MovieDetailUpdateParameter): void {
    this._MoviePageService.updateMovieDetail(para).subscribe(res => {
      console.log('更新電影資訊-成功res', res);
      this._Router.navigate([STATIC_ROUTES.MOVIE, STATIC_ROUTES.DETAIL, (res.data as MovieDetailUpdateParameterCustomer)._id]);
      alert(res.message);
    });
  }



  // API- 取得選項資料
  getOptionAPI(): void {
    range(1, 4).subscribe(typeId => {
      this._CommonAPIService.getOption(typeId).subscribe(res => {
        console.log(typeId, '取得選項資料-成功res', res);
        switch (typeId) {
          case 1: this.genreOptions = res.data as CommonOptionSuccessDataItem[]; break;
          case 2: this.provideVersionOptions = res.data as CommonOptionSuccessDataItem[]; break;
          case 3: this.rateOptions = res.data as CommonOptionSuccessDataItem[]; break;
          case 4: this.statusOptions = res.data as CommonOptionSuccessDataItem[]; break;
          default: break;
        };
        this._ChangeDetectorRef.detectChanges();
      });
    });
  }



  getFormConsole() {
    console.log('formGroup- 取值', this.formGroup);
  }



}
