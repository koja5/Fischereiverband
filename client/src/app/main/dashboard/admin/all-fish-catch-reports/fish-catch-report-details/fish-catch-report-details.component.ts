import { Component, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DialogConfirmComponent } from "app/main/@core/common/dialog-confirm/dialog-confirm.component";
import { ToastrComponent } from "app/main/@core/common/toastr/toastr.component";
import { DynamicGridComponent } from "app/main/@core/dynamic-component/dynamic-grid/dynamic-grid.component";
import { FishCatchReportEnum } from "app/main/dashboard/enums/fish-catch-enum";
import { FishCatchFilterModel } from "app/main/dashboard/models/fish-catch-filter.model";
import { FishCatchReportModel } from "app/main/dashboard/models/fish-catch-report-model";
import { UserModel } from "app/models/user";
import { CallApiService } from "app/services/call-api.service";

@Component({
  selector: "app-fish-catch-report-details",
  templateUrl: "./fish-catch-report-details.component.html",
  styleUrls: ["./fish-catch-report-details.component.scss"],
})
export class FishCatchReportDetailsComponent {
  @ViewChild("grid") grid: DynamicGridComponent;
  @ViewChild("dialogConfirmBackReport")
  dialogConfirmBackReport: DialogConfirmComponent;
  @ViewChild("dialogConfirmReminderOwner")
  dialogConfirmReminderOwner: DialogConfirmComponent;

  public path = "grids/admin";
  public file = "fish-catch-report-details.json";
  public data: any;
  public fishCatchReport = new FishCatchReportModel();
  public FISH_CATCH_REPORT_ENUM = FishCatchReportEnum;
  public userProfile = new UserModel();
  public ownerName: string;
  public loader = false;

  public allWaters: any;
  public fishCatchFilter = new FishCatchFilterModel();

  constructor(
    private _service: CallApiService,
    private _activatedRouter: ActivatedRoute,
    private _toastr: ToastrComponent
  ) {}

  ngOnInit() {
    this.getFishCatchReportDetails();
    this.getFishCatchReportStatus();
    this.getWatersForSelectedManagementRegister();
  }

  getWatersForSelectedManagementRegister() {
    this._service
      .callGetMethod(
        "api/owner/getAllWaters?fbz=" +
          this._activatedRouter.snapshot.queryParams.fbz
      )
      .subscribe((data: any) => {
        this.allWaters = data;
        if (data.length === 1) {
          this.fishCatchFilter.water = data[0].id_water;
        }
      });
  }

  getFishCatchReportDetails() {
    this.loader = true;
    this._service
      .callGetMethod(
        "/api/admin/getFishCatchReportDetails?fbz=" +
          this._activatedRouter.snapshot.queryParams.fbz +
          "&year=" +
          this._activatedRouter.snapshot.queryParams.year
      )
      .subscribe((data) => {
        this.data = data;
        this.loader = false;
      });
  }

  getFishCatchDetailsForSelectedWater(water: string) {
    this.loader = true;
    this._service
      .callGetMethod(
        "/api/admin/getFishCatchDetailsForSelectedWater?fbz=" +
          this._activatedRouter.snapshot.queryParams.fbz +
          "&year=" +
          this._activatedRouter.snapshot.queryParams.year +
          "&water=" +
          water
      )
      .subscribe((data) => {
        this.data = data;
        this.loader = false;
      });
  }

  getFishCatchReportStatus() {
    this._service
      .callGetMethod(
        "/api/admin/getFishCatchReport?fbz=" +
          this._activatedRouter.snapshot.queryParams.fbz +
          "&year=" +
          this._activatedRouter.snapshot.queryParams.year
      )
      .subscribe((data: FishCatchReportModel) => {
        this.fishCatchReport = data;
        this.getUserProfile();
      });
  }

  getUserProfile() {
    this._service
      .callGetMethod("/api/admin/getUserProfile", this.fishCatchReport.id_owner)
      .subscribe((data: UserModel) => {
        this.userProfile = data;
      });
  }

  dialogConfirmBackReportShow() {
    this.dialogConfirmBackReport.showQuestionModal();
  }

  dialogConfirmReminderOwnerShow() {
    this.dialogConfirmReminderOwner.showQuestionModal();
  }

  reminderOwnerToCompleteFishCatchReport() {
    this.loader = true;
    this._service
      .callPostMethod("/api/mail/reminderOwnerToCompleteFishCatchReport", {
        fishCatchReport: this.fishCatchReport,
        userProfile: this.userProfile,
      })
      .subscribe((data) => {
        if (data) {
          this.loader = false;
          this.fishCatchReport.status = FishCatchReportEnum.draft;
        }
      });
  }

  backFishCatchReportToOwner() {
    this.loader = true;
    this._service
      .callPostMethod("/api/admin/backFishCatchReportToOwner", {
        fishCatchReport: this.fishCatchReport,
        userProfile: this.userProfile,
      })
      .subscribe((data) => {
        if (data) {
          this.loader = false;
          this.fishCatchReport.status = FishCatchReportEnum.draft;
          this._toastr.showSuccess();
        }
      });
  }

  onChangeWater(event: any) {
    if (event) {
      this.getFishCatchDetailsForSelectedWater(event.name);
    } else {
      this.getFishCatchReportDetails();
    }
  }
}
