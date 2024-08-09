import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ToastrComponent } from "app/main/@core/common/toastr/toastr.component";
import {
  BirdDamageModel,
  NestAndSleepingModule,
  RequestedForNextYear,
} from "app/main/dashboard/models/bird-damage.model";
import { CallApiService } from "app/services/call-api.service";

@Component({
  selector: "app-custom-form-bird-damage",
  templateUrl: "./custom-form-bird-damage.component.html",
  styleUrls: ["./custom-form-bird-damage.component.scss"],
})
export class CustomFormBirdDamageComponent {
  @Input() data: BirdDamageModel;
  @Input() disableCRUD = false;
  @Input() disableInput = false;
  @Output() submit = new EventEmitter();

  public managementRegistersData: any;
  public sectionFourTitle: string;
  public year = new Date().getFullYear() + 1;
  objectKeys = Object.keys;

  constructor(
    private _service: CallApiService,
    private _translate: TranslateService,
    private _toastr: ToastrComponent
  ) {}

  ngOnInit() {
    this.sectionFourTitle = this._translate
      .instant("birdDamage.sectionFourTitle")
      .replace("#year", this.year);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.data.nest_and_sleeping && !this.data.nest_and_sleeping.length) {
      this.data.nest_and_sleeping.push(new NestAndSleepingModule());
    }

    if (
      this.data.requested_for_next_year &&
      !this.data.requested_for_next_year.length
    ) {
      this.data.requested_for_next_year.push(new RequestedForNextYear());
    }
  }

  getData() {
    this._service
      .callGetMethod("/api/owner/getBirdDamage")
      .subscribe((data: BirdDamageModel) => {
        this.data = data;
        if (!this.data.nest_and_sleeping.length) {
          this.data.nest_and_sleeping.push(new NestAndSleepingModule());
        }

        if (!this.data.requested_for_next_year.length) {
          this.data.requested_for_next_year.push(new RequestedForNextYear());
        }
      });
  }

  initializeDefaultData() {}

  addNewRowForNestAndSleeping() {
    this.data.nest_and_sleeping.push(new NestAndSleepingModule());
  }

  removeRowFromNestAndSleeping(index) {
    this.data.nest_and_sleeping.splice(index, 1);
  }

  addNewRowForRequestedForNextYear() {
    this.data.requested_for_next_year.push(new RequestedForNextYear());
  }

  removeRowFromRequestedForNextYear(index) {
    this.data.requested_for_next_year.splice(index, 1);
  }

  save() {
    this._service
      .callPostMethod("api/owner/setBirdDamage", this.data)
      .subscribe((data) => {
        if (data) {
          setTimeout(() => {
            this.submit.emit();
            this._toastr.showSuccess();
          }, 20);
        }
      });
  }

  calculatePriceForKomorantage() {
    if (this.data.komorantage_damage_in_euro_per_kg) {
      return (
        this.data.komorantage_damage_in_euro_per_kg *
        this._translate.instant("birdDamagePrice.pricePerKg")
      );
    }
    return "";
  }

  calculatePriceForHeronDemage() {
    if (this.data.heron_damage_in_euro_per_kg) {
      return (
        this.data.heron_damage_in_euro_per_kg *
        this._translate.instant("birdDamagePrice.pricePerKg")
      );
    }
    return "";
  }

  calculateDamageOfSeedlings() {
    if (this.data.number_of_seedlings) {
      return (
        this.data.number_of_seedlings *
        this._translate.instant("birdDamagePrice.pricePerItem")
      );
    }
    return "";
  }

  calculateDamageAmountOfInjured() {
    if (this.data.amount_of_injured_kg) {
      return (
        this.data.amount_of_injured_kg *
        this._translate.instant("birdDamagePrice.pricePerKg")
      );
    }
    return "";
  }
}
