import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DirtycheckGuard } from "app/services/guards/dirtycheck.guard";
import { ReportSalesComponent } from "./report-sales/report-sales.component";
import { DynamicModule } from "app/main/@core/dynamic-component/dynamic.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";

const routes = [
  {
    path: "report-sales",
    component: ReportSalesComponent,
    canDeactivate: [DirtycheckGuard],
  },
];

@NgModule({
  declarations: [ReportSalesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DynamicModule
  ],

  providers: [],
  exports: [RouterModule],
})
export class OwnerModule {}
