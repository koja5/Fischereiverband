"use strict";(self.webpackChunkFischereiverband=self.webpackChunkFischereiverband||[]).push([[5],{6005:(S,c,n)=>{n.r(c),n.d(c,{SettingsModule:()=>b});var p=n(6895),l=n(1760),h=n(6697),u=n(1634),t=n(4650),m=n(9992),d=n(8283),f=n(3283);const w=["form"];let g=(()=>{class o{constructor(e,s){this._service=e,this._toastr=s,this.path="forms/general/settings",this.file="profile.json"}unsavedChanges(){return this.form.unsavedChanges()}submit(e){"submit"!=e.type&&this._service.callPostMethod("api/saveProfile",e).subscribe(s=>{s?this._toastr.showSuccess():this._toastr.showError()})}static#s=this.\u0275fac=function(s){return new(s||o)(t.Y36(m.f),t.Y36(d.l))};static#t=this.\u0275cmp=t.Xpm({type:o,selectors:[["app-profile"]],viewQuery:function(s,a){if(1&s&&t.Gf(w,5),2&s){let i;t.iGM(i=t.CRH())&&(a.form=i.first)}},decls:2,vars:2,consts:[[3,"path","file","submit"],["form",""]],template:function(s,a){1&s&&(t.TgZ(0,"app-dynamic-forms",0,1),t.NdJ("submit",function(r){return a.submit(r)}),t.qZA()),2&s&&t.Q6J("path",a.path)("file",a.file)},dependencies:[f.b]})}return o})();var C=n(7296);const P=["form"];let v=(()=>{class o{constructor(e,s,a){this._service=e,this._toastr=s,this._translate=a,this.path="forms/general/settings",this.file="change-password.json"}unsavedChanges(){return this.form.unsavedChanges()}resetPassword(e){console.log(e),e.oldPassword===e.newPassword?this._toastr.showWarningCustom(this._translate.instant("resetPassword.oldAndNewPasswordCannotBeSame")):e.newPassword!==e.repeatNewPassword?this._toastr.showWarningCustom(this._translate.instant("resetPassword.passwordsNeedToBeSame")):this._service.callPostMethod("/api/changePassword",e).subscribe(s=>{s?this._toastr.showSuccessCustom(this._translate.instant("resetPassword.successfulyChangedPassword")):this._toastr.showWarningCustom(this._translate.instant("resetPassword.oldPasswordIsWrong"))})}static#s=this.\u0275fac=function(s){return new(s||o)(t.Y36(m.f),t.Y36(d.l),t.Y36(C.sK))};static#t=this.\u0275cmp=t.Xpm({type:o,selectors:[["app-change-password"]],viewQuery:function(s,a){if(1&s&&t.Gf(P,5),2&s){let i;t.iGM(i=t.CRH())&&(a.form=i.first)}},decls:2,vars:2,consts:[[3,"path","file","submit"],["form",""]],template:function(s,a){1&s&&(t.TgZ(0,"app-dynamic-forms",0,1),t.NdJ("submit",function(r){return a.resetPassword(r)}),t.qZA()),2&s&&t.Q6J("path",a.path)("file",a.file)},dependencies:[f.b]})}return o})();var y=n(3735);const T=[{path:"profile",component:g,canDeactivate:[h.T]},{path:"change-password",component:v,canDeactivate:[h.T]}];let b=(()=>{class o{static#s=this.\u0275fac=function(s){return new(s||o)};static#t=this.\u0275mod=t.oAB({type:o});static#e=this.\u0275inj=t.cJS({imports:[p.ez,l.Bz.forChild(T),u.w,y.$,l.Bz]})}return o})()}}]);