import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DynamicModule } from "app/main/@core/dynamic-component/dynamic.module";
import { AllUsersComponent } from "./all-users/all-users.component";
import { DirtycheckGuard } from "app/services/guards/dirtycheck.guard";
import { AllFishesComponent } from "./all-fishes/all-fishes.component";
import { AgeOfFishesComponent } from "./age-of-fishes/age-of-fishes.component";
import { AllOriginsComponent } from "./all-origins/all-origins.component";
import { AllWatersComponent } from "./all-waters/all-waters.component";
import { ManagementRegistersComponent } from "./management-registers/management-registers.component";
import { AllFishStockingReportsComponent } from "./all-fish-stocking-reports/all-fish-stocking-reports.component";
import { FishStockingReportDetailsComponent } from "./all-fish-stocking-reports/fish-stocking-report-details/fish-stocking-report-details.component";
import { TranslateModule } from "@ngx-translate/core";
import { NgbAlertModule } from "@ng-bootstrap/ng-bootstrap";
import { MainCoreCommonModule } from "app/main/@core/common/main-core-common.module";
import { AllFishCatchReportsComponent } from "./all-fish-catch-reports/all-fish-catch-reports.component";
import { FishCatchReportDetailsComponent } from "./all-fish-catch-reports/fish-catch-report-details/fish-catch-report-details.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule } from "@angular/forms";

const routes = [
  {
    path: "all-users",
    component: AllUsersComponent,
    canDeactivate: [DirtycheckGuard],
  },
  {
    path: "all-fishes",
    component: AllFishesComponent,
    canDeactivate: [DirtycheckGuard],
  },
  {
    path: "all-origins",
    component: AllOriginsComponent,
    canDeactivate: [DirtycheckGuard],
  },
  {
    path: "all-waters",
    component: AllWatersComponent,
    canDeactivate: [DirtycheckGuard],
  },
  {
    path: "age-of-fishes",
    component: AgeOfFishesComponent,
    canDeactivate: [DirtycheckGuard],
  },
  {
    path: "management-registers",
    component: ManagementRegistersComponent,
    canDeactivate: [DirtycheckGuard],
  },
  {
    path: "all-fish-stocking-reports",
    component: AllFishStockingReportsComponent,
  },
  {
    path: "fish-stocking-report-details",
    component: FishStockingReportDetailsComponent,
  },
  {
    path: "all-fish-catch-reports",
    component: AllFishCatchReportsComponent,
  },
  {
    path: "fish-catch-report-details",
    component: FishCatchReportDetailsComponent,
  },
];

@NgModule({
  declarations: [
    AllUsersComponent,
    AllFishesComponent,
    AgeOfFishesComponent,
    AllOriginsComponent,
    AllWatersComponent,
    ManagementRegistersComponent,
    AllFishStockingReportsComponent,
    AllFishCatchReportsComponent,
    FishStockingReportDetailsComponent,
    FishCatchReportDetailsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    DynamicModule,
    TranslateModule,
    NgbAlertModule,
    MainCoreCommonModule,
    NgSelectModule,
  ],

  providers: [],
  exports: [RouterModule],
})
export class AdminModule {}
