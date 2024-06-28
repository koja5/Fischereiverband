import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { AdminGuardService } from "app/services/guards/admin-guard.service";
import { OwnerGuardService } from "app/services/guards/owner-guard.service";

const routes = [
  {
    path: "owner",
    canActivate: [OwnerGuardService],
    loadChildren: () =>
      import("./owner/owner.module").then((m) => m.OwnerModule),
  },
  {
    path: "admin",
    canActivate: [AdminGuardService],
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminModule),
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    NgSelectModule,
  ],

  providers: [],
  exports: [RouterModule],
})
export class DashboardModule {}
