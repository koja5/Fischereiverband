import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { DialogConfirmComponent } from "./dialog-confirm/dialog-confirm.component";
import { ToastrComponent } from "./toastr/toastr.component";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { DialogConfirmTemplateComponent } from "./discard-changes-template/discard-changes-template.component";
import { LoaderComponent } from "./loader/loader.component";
import { NoDataComponent } from "./no-data/no-data.component";

const appRoutes: Routes = [];

@NgModule({
  declarations: [
    DialogConfirmComponent,
    ToastrComponent,
    DialogConfirmTemplateComponent,
    LoaderComponent,
    NoDataComponent
  ],
  imports: [CommonModule, TranslateModule],
  providers: [],
  bootstrap: [],
  exports: [
    DialogConfirmComponent,
    ToastrComponent,
    DialogConfirmTemplateComponent,
    LoaderComponent,
    NoDataComponent
  ],
})
export class MainCoreCommonModule {}