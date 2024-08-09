import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CustomFormBirdDamageComponent } from "./custom-form-bird-damage/custom-form-bird-damage.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [CustomFormBirdDamageComponent],
  imports: [CommonModule, FormsModule, TranslateModule],
  providers: [],
  exports: [CustomFormBirdDamageComponent],
})
export class TemplateModule {}
