import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DynamicModule } from "app/main/@core/dynamic-component/dynamic.module";
import { AllUsersComponent } from "./all-users/all-users.component";
import { DirtycheckGuard } from "app/services/guards/dirtycheck.guard";

const routes = [
  {
    path: "all-users",
    component: AllUsersComponent,
    canDeactivate: [DirtycheckGuard],
  },
];

@NgModule({
  declarations: [AllUsersComponent],
  imports: [CommonModule, RouterModule.forChild(routes), DynamicModule],

  providers: [],
  exports: [RouterModule],
})
export class AdminModule {}
