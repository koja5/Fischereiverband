import { Component, ViewChild } from "@angular/core";
import { DynamicFormsComponent } from "app/main/@core/dynamic-component/dynamic-forms/dynamic-forms.component";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent {
  @ViewChild("form") form: DynamicFormsComponent;
  public path = "forms/general";
  public file = "profile.json";
  public data: any;

  unsavedChanges(): boolean {
    return this.form.unsavedChanges();
  }

  submit(event: any) {}
}
