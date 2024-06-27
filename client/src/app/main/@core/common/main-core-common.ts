import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { DialogConfirmComponent } from "./dialog-confirm/dialog-confirm.component";
import { ToastrComponent } from "./toastr/toastr.component";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { DialogConfirmTemplateComponent } from "./discard-changes-template/discard-changes-template.component";

const appRoutes: Routes = [];

@NgModule({
  declarations: [
    DialogConfirmComponent,
    ToastrComponent,
    DialogConfirmTemplateComponent,
  ],
  imports: [CommonModule, TranslateModule],
  providers: [],
  bootstrap: [],
  exports: [
    DialogConfirmComponent,
    ToastrComponent,
    DialogConfirmTemplateComponent,
  ],
})
export class MainCoreCommon {}
