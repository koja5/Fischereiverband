import { Component, EventEmitter, Input, Output } from "@angular/core";
import { BirdDamageModel } from "../../models/bird-damage.model";
import { CallApiService } from "app/services/call-api.service";
import { TranslateService } from "@ngx-translate/core";
import { FishCatchModel } from "../../models/fish-catch.model";
import { ToastrComponent } from "app/main/@core/common/toastr/toastr.component";

@Component({
  selector: "app-custom-form-fish-catch",
  templateUrl: "./custom-form-fish-catch.component.html",
  styleUrls: ["./custom-form-fish-catch.component.scss"],
})
export class CustomFormFishCatchComponent {
  @Input() data: FishCatchModel;
  @Output() submit = new EventEmitter();

  public allFishes: any;

  constructor(
    private _service: CallApiService,
    private _translate: TranslateService,
    private _toastr: ToastrComponent
  ) {}

  ngOnInit() {
    this._service.callGetMethod("/api/owner/getAllFishes").subscribe((data) => {
      this.allFishes = data;
    });
  }

  calculateStockedFishQuantity() {
    if (this.data.edible_fish_quantity && this.data.quantity) {
      this.data.quantity = Number(this.data.quantity);
      this.data.edible_fish_quantity = Number(this.data.edible_fish_quantity);
      if (this.data.quantity >= this.data.edible_fish_quantity) {
        this.data.stocked_fish_quantity =
          this.data.quantity - this.data.edible_fish_quantity;
        return this.data.stocked_fish_quantity;
      } else {
        return "";
      }
    }
    return "";
  }

  checkValues() {
    return Number(this.data.quantity) < Number(this.data.edible_fish_quantity)
      ? true
      : false;
  }

  save() {
    this._service
      .callPostMethod("api/owner/setFishCatch", this.data)
      .subscribe((data) => {
        if (data) {
          setTimeout(() => {
            this.submit.emit();
            this._toastr.showSuccess();
          }, 20);
        }
      });
  }
}
