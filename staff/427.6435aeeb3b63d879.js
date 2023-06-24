"use strict";(self.webpackChunkstaff=self.webpackChunkstaff||[]).push([[427],{1427:(E,g,r)=>{r.r(g),r.d(g,{LoginPageModule:()=>B});var c=r(6895),v=r(9429),h=r(8063),S=r(4351),t=r(4650),u=r(8505),m=r(9300),p=r(2366),C=r(1189),Z=r(2149);let U=(()=>{class o{constructor(n,e){this.staffService=n,this.storageService=e}v1StaffLoginPost$(n){return this.staffService.v1StaffLoginPost(n).pipe((0,u.b)(e=>1!==e.code&&alert(e.message)),(0,m.h)(e=>1===e.code),(0,u.b)(e=>{this.storageService.setLocalStorage(p.d.token,e.data.token)}))}v1StaffUserProfileStaffIdGet(n){return this.staffService.v1StaffUserProfileStaffIdGet(n).pipe((0,u.b)(e=>1!==e.code&&alert(e.message)),(0,m.h)(e=>1===e.code),(0,u.b)(e=>{this.storageService.setLocalStorage(p.d.profileData,{name:e.data?.name,staffId:e.data.staffId,imgUrl:e.data.stickerUrl?e.data.stickerUrl:"assets/images/angular-icon.webp"})}))}}return o.\u0275fac=function(n){return new(n||o)(t.LFG(C.x5),t.LFG(Z.V))},o.\u0275prov=t.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})();var d=r(9030),l=r(4006);let I=(()=>{class o{constructor(n){this._ngControl=n}handleInput(n){const e=n.currentTarget;e.value=e.value.toUpperCase(),this._ngControl.control?.setValue(e.value),this._ngControl.control?.updateValueAndValidity()}handlePaste(n){n.preventDefault();const a=n.clipboardData?.getData("text")?.replace(/\s+/g,"").toUpperCase();this._ngControl.control?.setValue(a),this._ngControl.control?.updateValueAndValidity()}}return o.\u0275fac=function(n){return new(n||o)(t.Y36(l.a5))},o.\u0275dir=t.lG2({type:o,selectors:[["","toUpperCase",""]],hostBindings:function(n,e){1&n&&t.NdJ("input",function(s){return e.handleInput(s)})("paste",function(s){return e.handlePaste(s)})}}),o})();var b=r(3211),f=r(9549),y=r(4144),A=r(4859);function P(o,i){if(1&o&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&o){const n=t.oxw();let e;t.xp6(1),t.hij(" ",null==(e=n.form.get("staffId"))||null==e.errors?null:e.errors.englishNumberInvalid," ")}}let x=(()=>{class o{constructor(n){this.fb=n,this.loginDataEmit=new t.vpe,this.logoSrc="",this.form=this.fb.group({staffId:["",[l.kI.required,o=>{const i=o.value??"";var n=new RegExp(/[^\a-\z\A-\Z0-9]/).test(i);return i&&n?{englishNumberInvalid:"\u8acb\u8f38\u5165\u82f1\u6216\u6578\u5b57"}:null}]],password:["",l.kI.required]})}ngOnInit(){}onSubmit(){this.form.invalid||this.loginDataEmit.emit(this.form.value)}}return o.\u0275fac=function(n){return new(n||o)(t.Y36(l.QS))},o.\u0275cmp=t.Xpm({type:o,selectors:[["lib-login"]],inputs:{logoSrc:"logoSrc"},outputs:{loginDataEmit:"loginDataEmit"},decls:24,vars:8,consts:[[1,"w-80"],[1,"flex","justify-center","items-center","w-full"],["alt","logo",3,"src"],[1,"ml-4","text-4xl"],[1,"example-form","w-full","mt-14",3,"formGroup","ngSubmit"],["appearance","fill",1,"example-full-width","w-full"],["matInput","","toUpperCase","","noWhiteSpace","","placeholder","\u8acb\u8f38\u5165\u5e33\u865f","formControlName","staffId","type","text"],[4,"ngIf"],[1,"-mt-2"],["matInput","","placeholder","\u8acb\u8f38\u5165\u5bc6\u78bc","formControlName","password","type","password"],["mat-raised-button","","color","primary","type","submit",1,"w-full",3,"disabled"],[1,"text-center","mt-2"],["mat-button","","type","button"]],template:function(n,e){if(1&n&&(t.TgZ(0,"section",0)(1,"div",1),t._UZ(2,"img",2),t.TgZ(3,"h1",3),t._uU(4,"CinePOS"),t.qZA()(),t.TgZ(5,"form",4),t.NdJ("ngSubmit",function(){return e.onSubmit()}),t.TgZ(6,"ul")(7,"li")(8,"mat-form-field",5)(9,"mat-label"),t._uU(10,"\u5e33\u865f"),t.qZA(),t._UZ(11,"input",6),t.YNc(12,P,2,1,"mat-error",7),t.qZA()(),t.TgZ(13,"li",8)(14,"mat-form-field",5)(15,"mat-label"),t._uU(16,"\u5bc6\u78bc"),t.qZA(),t._UZ(17,"input",9),t.qZA()(),t.TgZ(18,"li")(19,"button",10),t._uU(20,"\u767b\u5165"),t.qZA()(),t.TgZ(21,"li",11)(22,"button",12),t._uU(23,"\u5fd8\u8a18\u5bc6\u78bc"),t.qZA()()()()()),2&n){let a,s;t.xp6(2),t.Q6J("src",e.logoSrc,t.LSH),t.xp6(3),t.Q6J("formGroup",e.form),t.xp6(3),t.ekj("mb-4",null==(a=e.form.get("staffId"))||null==a.errors?null:a.errors.englishNumberInvalid),t.xp6(4),t.Q6J("ngIf",null==(s=e.form.get("staffId"))||null==s.errors?null:s.errors.englishNumberInvalid),t.xp6(7),t.ekj("valid-form",!e.form.invalid),t.Q6J("disabled",e.form.invalid)}},dependencies:[c.O5,l._Y,l.Fj,l.JJ,l.JL,l.sg,l.u,I,b.w,f.TO,f.KE,f.hX,y.Nt,A.lW]}),o})(),D=(()=>{class o{constructor(n,e){this.loginService=n,this.router=e,this.currentVersion=h.N.appVersion}ngOnInit(){}login(n){this.loginService.v1StaffLoginPost$(n).pipe((0,S.b)(e=>this.loginService.v1StaffUserProfileStaffIdGet(e.data?.staffId))).subscribe(()=>{this.router.navigate([v.F.HOME])})}}return o.\u0275fac=function(n){return new(n||o)(t.Y36(U),t.Y36(d.F0))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-login-page"]],decls:11,vars:2,consts:[[1,"relative","truncate"],[1,"w-screen","h-screen","flex","flex-row","justify-center","items-center"],[1,"basis-1/2","flex","justify-end","items-center"],[3,"logoSrc","loginDataEmit"],["src","assets/images/logo/logo.svg","alt","logo",1,"w-full","max-w-md","-mr-28"],[1,"absolute","bottom-6","right-0","left-0","px-8","flex","justify-between","text-sm","text-gray-400"]],template:function(n,e){1&n&&(t.TgZ(0,"div",0)(1,"ul",1)(2,"li",2)(3,"lib-login",3),t.NdJ("loginDataEmit",function(s){return e.login(s)}),t.qZA()(),t.TgZ(4,"li",2),t._UZ(5,"img",4),t.qZA()(),t.TgZ(6,"div",5)(7,"span"),t._uU(8),t.qZA(),t.TgZ(9,"span"),t._uU(10,"\xa9 2023 CinePOS All Right Reserved."),t.qZA()()()),2&n&&(t.xp6(3),t.Q6J("logoSrc","assets/images/logo/logo.svg"),t.xp6(5),t.Oqu(e.currentVersion))},dependencies:[x]}),o})();var T=r(4075);const F=[{path:"",component:D}];let B=(()=>{class o{}return o.\u0275fac=function(n){return new(n||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[c.ez,d.Bz.forChild(F),T.Pu]}),o})()}}]);