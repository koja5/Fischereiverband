import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DirtycheckGuard } from "app/services/guards/dirtycheck.guard";
import { DynamicModule } from "app/main/@core/dynamic-component/dynamic.module";
import { NgSelectModule } from "@ng-select/ng-select";
import { ObservationSheetComponent } from "./components/observation-sheet/observation-sheet.component";
import { FishStockingComponent } from "./components/fish-stocking/fish-stocking.component";
import { FormsModule } from "@angular/forms";
import { MainCoreCommonModule } from "app/main/@core/common/main-core-common.module";
import { TranslateModule } from "@ngx-translate/core";
import { NgbAlert, NgbAlertModule } from "@ng-bootstrap/ng-bootstrap";

const routes = [
  {
    path: "fish-stocking",
    component: FishStockingComponent,
    canDeactivate: [DirtycheckGuard],
  },
  {
    path: "observation-sheet",
    component: ObservationSheetComponent,
    canDeactivate: [DirtycheckGuard],
  },
];

@NgModule({
  declarations: [FishStockingComponent, ObservationSheetComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    DynamicModule,
    NgSelectModule,
    MainCoreCommonModule,
    TranslateModule,
    NgbAlertModule,
  ],

  providers: [],
  exports: [RouterModule],
})
export class OwnerModule {}
