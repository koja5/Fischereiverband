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
];

@NgModule({
  declarations: [
    AllUsersComponent,
    AllFishesComponent,
    AgeOfFishesComponent,
    AllOriginsComponent,
    AllWatersComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), DynamicModule],

  providers: [],
  exports: [RouterModule],
})
export class AdminModule {}
