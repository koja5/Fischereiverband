import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DirtycheckGuard } from "app/services/guards/dirtycheck.guard";
import { DynamicModule } from "app/main/@core/dynamic-component/dynamic.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { ObservationSheetComponent } from "./observation-sheet/observation-sheet.component";
import { FishStockingComponent } from "./fish-stocking/fish-stocking.component";
import { FormsModule } from "@angular/forms";

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
  ],

  providers: [],
  exports: [RouterModule],
})
export class OwnerModule {}
