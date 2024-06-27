import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

const routes = [];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],

  providers: [],
  exports: [RouterModule],
})
export class OwnerModule {}
