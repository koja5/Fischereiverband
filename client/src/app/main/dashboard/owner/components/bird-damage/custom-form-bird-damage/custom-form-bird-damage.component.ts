import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BirdDamageModel } from "app/main/dashboard/models/bird-damage.model";
import { CallApiService } from "app/services/call-api.service";

@Component({
  selector: "app-custom-form-bird-damage",
  templateUrl: "./custom-form-bird-damage.component.html",
  styleUrls: ["./custom-form-bird-damage.component.scss"],
})
export class CustomFormBirdDamageComponent {
  public managementRegistersData: any;
  public sectionFourTitle: string;
  public year = new Date().getFullYear() + 1;
  public data = new BirdDamageModel();

  constructor(
    private _service: CallApiService,
    private _translate: TranslateService
  ) {}

  ngOnInit() {
    this.getManagementRegistersData();
    this.sectionFourTitle = this._translate
      .instant("birdDamage.sectionFourTitle")
      .replace("#year", this.year);
  }

  getManagementRegistersData() {
    this._service
      .callGetMethod("/api/owner/getManagementRegistersData")
      .subscribe((data) => {
        this.managementRegistersData = data;
      });
  }

  addNewRow() {}

  submit() {
    console.log(this.data);
  }
}
