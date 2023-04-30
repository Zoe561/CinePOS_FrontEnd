"use strict";(self.webpackChunkstaff=self.webpackChunkstaff||[]).push([[217],{8217:(A,c,i)=>{i.r(c),i.d(c,{LoginPageModule:()=>U});var p=i(6895),f=i(9429),t=i(4650),d=i(1189),h=i(8505),g=i(2366),v=i(2149);let C=(()=>{class n{constructor(e,o){this.accountService=e,this.storageService=o}logInPost$(e){return this.accountService.logInPost(e).pipe((0,h.b)(o=>{this.storageService.setLocalStorage(g.d.token,o.user.token),this.storageService.setLocalStorage(g.d.name,o.user.name)}))}}return n.\u0275fac=function(e){return new(e||n)(t.LFG(d.BR),t.LFG(v.V))},n.\u0275prov=t.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})();var m=i(3321),s=i(4006);let D=(()=>{class n{constructor(e){this._ngControl=e}handleInput(e){const o=e.currentTarget;o.value=o.value.toUpperCase(),this._ngControl.control?.setValue(o.value),this._ngControl.control?.updateValueAndValidity()}handlePaste(e){e.preventDefault();const a=e.clipboardData?.getData("text")?.replace(/\s+/g,"").toUpperCase();this._ngControl.control?.setValue(a),this._ngControl.control?.updateValueAndValidity()}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(s.a5))},n.\u0275dir=t.lG2({type:n,selectors:[["","toUpperCase",""]],hostBindings:function(e,o){1&e&&t.NdJ("input",function(l){return o.handleInput(l)})("paste",function(l){return o.handlePaste(l)})}}),n})(),y=(()=>{class n{constructor(e){this._ngControl=e}handleInput(e){" "===e.key&&e.preventDefault()}handlePaste(e){e.preventDefault();const a=e.clipboardData?.getData("text")?.replace(/\s+/g,"");this._ngControl.control?.setValue(a),this._ngControl.control?.updateValueAndValidity()}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(s.a5))},n.\u0275dir=t.lG2({type:n,selectors:[["","noWhiteSpace",""]],hostBindings:function(e,o){1&e&&t.NdJ("keydown",function(l){return o.handleInput(l)})("paste",function(l){return o.handlePaste(l)})}}),n})();var u=i(4988),I=i(4144),L=i(4859);function b(n,r){if(1&n&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&n){const e=t.oxw();let o;t.xp6(1),t.hij(" ",null==(o=e.form.get("staffId"))||null==o.errors?null:o.errors.englishNumberInvalid," ")}}let B=(()=>{class n{constructor(e){this.fb=e,this.loginDataEmit=new t.vpe,this.form=this.fb.group({staffId:["",[s.kI.required,n=>{const r=n.value??"";var e=new RegExp(/[^\a-\z\A-\Z0-9]/).test(r);return r&&e?{englishNumberInvalid:"\u8acb\u8f38\u5165\u82f1\u6216\u6578\u5b57"}:null}]],password:["",s.kI.required]})}ngOnInit(){}onSubmit(){this.form.invalid||this.loginDataEmit.emit(this.form.value)}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(s.QS))},n.\u0275cmp=t.Xpm({type:n,selectors:[["lib-login"]],outputs:{loginDataEmit:"loginDataEmit"},decls:23,vars:5,consts:[[1,"w-72"],[1,"flex","justify-center","items-center","w-full"],[1,"example-form","w-full","mt-6",3,"formGroup","ngSubmit"],["appearance","fill",1,"example-full-width","w-full"],["matInput","","toUpperCase","","noWhiteSpace","","placeholder","\u8acb\u8f38\u5165\u5e33\u865f","formControlName","staffId","type","text"],[4,"ngIf"],["matInput","","placeholder","\u8acb\u8f38\u5165\u5bc6\u78bc","formControlName","password","type","password"],["mat-raised-button","","color","primary","type","submit",1,"w-full",3,"disabled"],[1,"text-center","mt-2"],["mat-button","","type","button"]],template:function(e,o){if(1&e&&(t.TgZ(0,"section",0)(1,"div",1)(2,"h1"),t._uU(3,"CinePos"),t.qZA()(),t.TgZ(4,"form",2),t.NdJ("ngSubmit",function(){return o.onSubmit()}),t.TgZ(5,"ul")(6,"li")(7,"mat-form-field",3)(8,"mat-label"),t._uU(9,"\u5e33\u865f"),t.qZA(),t._UZ(10,"input",4),t.YNc(11,b,2,1,"mat-error",5),t.qZA()(),t.TgZ(12,"li")(13,"mat-form-field",3)(14,"mat-label"),t._uU(15,"\u5bc6\u78bc"),t.qZA(),t._UZ(16,"input",6),t.qZA()(),t.TgZ(17,"li")(18,"button",7),t._uU(19,"\u767b\u5165"),t.qZA()(),t.TgZ(20,"li",8)(21,"button",9),t._uU(22,"\u5fd8\u8a18\u5bc6\u78bc"),t.qZA()()()()()),2&e){let a,l;t.xp6(4),t.Q6J("formGroup",o.form),t.xp6(3),t.ekj("mb-4",null==(a=o.form.get("staffId"))||null==a.errors?null:a.errors.englishNumberInvalid),t.xp6(4),t.Q6J("ngIf",null==(l=o.form.get("staffId"))||null==l.errors?null:l.errors.englishNumberInvalid),t.xp6(7),t.Q6J("disabled",o.form.invalid)}},dependencies:[p.O5,s._Y,s.Fj,s.JJ,s.JL,s.sg,s.u,D,y,u.TO,u.KE,u.hX,I.Nt,L.lW]}),n})(),Z=(()=>{class n{constructor(e,o){this.loginService=e,this.router=o}ngOnInit(){}login(e){this.loginService.logInPost$(e).subscribe(()=>{this.router.navigate([f.F.HOME])})}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(C),t.Y36(m.F0))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-login-page"]],decls:2,vars:0,consts:[[1,"w-screen","h-screen","flex","justify-center","items-center"],[3,"loginDataEmit"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0)(1,"lib-login",1),t.NdJ("loginDataEmit",function(l){return o.login(l)}),t.qZA()())},dependencies:[B]}),n})();var N=i(8989);const P=[{path:"",component:Z}];let U=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[p.ez,m.Bz.forChild(P),N.Pu]}),n})()}}]);