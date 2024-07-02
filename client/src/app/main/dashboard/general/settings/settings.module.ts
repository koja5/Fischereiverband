import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DirtycheckGuard } from "app/services/guards/dirtycheck.guard";
import { DynamicModule } from "app/main/@core/dynamic-component/dynamic.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { ProfileComponent } from "./profile/profile.component";

const routes = [
  {
    path: "profile",
    component: ProfileComponent,
    canDeactivate: [DirtycheckGuard],
  },
];

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, RouterModule.forChild(routes), DynamicModule],

  providers: [],
  exports: [RouterModule],
})
export class SettingsModule {}
