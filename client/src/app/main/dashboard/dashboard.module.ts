import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

const routes = [
  {
    path: "owner",
    loadChildren: () =>
      import("./owner/owner.module").then((m) => m.OwnerModule),
  },
  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminModule),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],

  providers: [],
  exports: [RouterModule],
})
export class DashboardModule {}
