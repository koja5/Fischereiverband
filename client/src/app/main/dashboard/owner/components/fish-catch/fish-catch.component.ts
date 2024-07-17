import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { ToastrComponent } from "app/main/@core/common/toastr/toastr.component";
import { DynamicGridComponent } from "app/main/@core/dynamic-component/dynamic-grid/dynamic-grid.component";
import { CallApiService } from "app/services/call-api.service";
import { ManagementRegisterModel } from "../../../models/management-register-model";
import { FishStockingReportEnum } from "../../../enums/fish-stocking-enum";
import { StorageService } from "app/services/storage.service";
import { DialogConfirmComponent } from "app/main/@core/common/dialog-confirm/dialog-confirm.component";
import { FishCatchModel } from "app/main/dashboard/models/fish-catch.model";
import { FishStockingReportModel } from "app/main/dashboard/models/fish-stocking-report-module";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-fish-catch",
  templateUrl: "./fish-catch.component.html",
  styleUrls: ["./fish-catch.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class FishCatchComponent {
  @ViewChild("grid") grid: DynamicGridComponent;
  @ViewChild("dialogConfirm")
  dialogConfirm: DialogConfirmComponent;
  @ViewChild("dialogRequestForAdditionalChanges")
  dialogRequestForAdditionalChanges: DialogConfirmComponent;

  public path = "grids/owner";
  public file = "fish-catch.json";
  public managementRegistersData: ManagementRegisterModel[];
  public data: FishCatchModel[];
  public fishStockingReport = new FishStockingReportModel();
  public selectedManagementRegistry: ManagementRegisterModel;
  public selectedManagementRegistryId: number;
  public selectNameOfWaterId: number;
  public loading = true;
  public fishStockingReportEnum = FishStockingReportEnum;
  public allWaters: any;

  constructor(
    private _service: CallApiService,
    private _toastr: ToastrComponent,
    private _storageService: StorageService,
    private _translate: TranslateService
  ) {}

  unsavedChanges(): boolean {
    if (this.grid) {
      return this.grid.unsavedChanges();
    }
  }

  ngOnInit() {
    this._service
      .callGetMethod("/api/owner/getFbzRegister", "")
      .subscribe((data: ManagementRegisterModel[]) => {
        this.managementRegistersData = data;
        if (data.length) {
          if (
            this._storageService.getLocalStorage("selectedManagementRegistry")
          ) {
            this.selectedManagementRegistry =
              this._storageService.getLocalStorage(
                "selectedManagementRegistry"
              );
          } else {
            this.selectedManagementRegistry = data[0];
          }
          this.selectedManagementRegistryId =
            this.selectedManagementRegistry.id;
          this.getNameOfWaterForSelectedManagementRegister(
            this.selectedManagementRegistry.fbz
          );
          this.initializeFishCatch();
        }
      });
  }

  initializeFishCatch() {
    this.getFishCatchDetails();
  }

  getFishCatchDetails() {
    this.loading = true;
    this._service
      .callGetMethod(
        "api/owner/getFishCatchForWater?fbz=" +
          this.selectedManagementRegistry.fbz +
          "&id_water=" +
          this.selectNameOfWaterId
      )
      .subscribe((data: FishCatchModel[]) => {
        this.data = data;
        this.loading = false;
      });
  }

  checkCompletedStatusReport() {
    return (
      this.fishStockingReport &&
      this.fishStockingReport.status === FishStockingReportEnum.completed
    );
  }

  onChangeManagementRegisters(event: ManagementRegisterModel) {
    this.selectedManagementRegistry = event;
    if (this.selectedManagementRegistry) {
      this.selectedManagementRegistryId = event.id;
      this.getNameOfWaterForSelectedManagementRegister(event.fbz);
      this._storageService.setLocalStorage(
        "selectedManagementRegistry",
        this.selectedManagementRegistry
      );
      this.initializeFishCatch();
    } else {
      this._storageService.removeLocalStorage("selectedManagementRegistry");
      this.selectedManagementRegistryId = null;
    }
  }

  getNameOfWaterForSelectedManagementRegister(fbz: string) {
    this._service
      .callGetMethod("api/owner/getWatersForSpecificFBZ?fbz=" + fbz)
      .subscribe((data: any) => {
        this.allWaters = data;
        if (data.length === 1) {
          this.selectNameOfWaterId = data[0].id_water;
          this.getFishCatchDetails();
        }
      });
  }

  onChangeNameOfWater(event: any) {
    this.getFishCatchDetails();
  }

  submit(event: FishCatchModel) {
    event.fbz = this.selectedManagementRegistry.fbz;
    event.id_water = this.selectNameOfWaterId;

    if (event.edible_fish_quantity < event.quantity) {
      event.stocked_fish_quantity = event.quantity - event.edible_fish_quantity;
    } else if (event.edible_fish_quantity > event.quantity) {
      this._toastr.showWarningCustom(
        this._translate.instant("actionMessage.successExecuteActionTextDefault")
      );
      return;
    }

    this._service
      .callPostMethod("/api/owner/setFishCatch", event)
      .subscribe((data) => {
        if (data) {
          this._toastr.showSuccess();
          this.getFishCatchDetails();
        }
      });
  }

  refreshGrid() {}

  completeReports() {
    this.dialogConfirm.showQuestionModal();
  }

  requestForAdditionalChanges() {
    this.dialogRequestForAdditionalChanges.showQuestionModal();
  }

  confirmCompleteReport() {
    this.fishStockingReport = {
      fbz: this.selectedManagementRegistry.fbz,
      year: this.selectedManagementRegistry.year,
      status: FishStockingReportEnum.completed,
      date_completed: new Date(),
    };
    this._service
      .callPostMethod("/api/owner/completeReport", this.fishStockingReport)
      .subscribe((data) => {
        if (data) {
          this._toastr.showSuccess();
        }
      });
  }

  requestToAdminForAdditionalChanges() {
    this._service
      .callPostMethod(
        "/api/owner/requestToAdminForAdditionalChanges",
        this.fishStockingReport
      )
      .subscribe((data) => {
        if (data) {
          this._toastr.showSuccess();
        }
      });
  }
}
