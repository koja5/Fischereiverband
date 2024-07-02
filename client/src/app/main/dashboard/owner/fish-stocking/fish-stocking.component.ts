import { Component, OnInit, ViewChild } from "@angular/core";
import { ToastrComponent } from "app/main/@core/common/toastr/toastr.component";
import { DynamicGridComponent } from "app/main/@core/dynamic-component/dynamic-grid/dynamic-grid.component";
import { CallApiService } from "app/services/call-api.service";

@Component({
  selector: "app-fish-stocking",
  templateUrl: "./fish-stocking.component.html",
  styleUrls: ["./fish-stocking.component.scss"],
})
export class FishStockingComponent implements OnInit {
  @ViewChild("grid") grid: DynamicGridComponent;

  public path = "grids/owner";
  public file = "fish-stocking.json";
  public fbzRegister: any;
  public data: any;
  public selectedRegistry: any;
  public loading = false;

  constructor(
    private _service: CallApiService,
    private _toastr: ToastrComponent
  ) {}

  unsavedChanges(): boolean {
    return this.grid.unsavedChanges();
  }

  ngOnInit() {
    this._service
      .callGetMethod("/api/owner/getFbzRegister", "")
      .subscribe((data: any) => {
        this.fbzRegister = data;
        if (data.length) {
          this.selectedRegistry = data[0];
          this.getAllFishStocking();
        }
      });
  }

  getAllFishStocking() {
    this.loading = true;
    this._service
      .callGetMethod(
        "/api/owner/getAllFishStocking?fbz=" +
          this.selectedRegistry.fbz +
          "&year=" +
          this.selectedRegistry.year,
        ""
      )
      .subscribe((data) => {
        this.data = data;
        this.loading = false;
      });
  }

  onChange(event: any) {
    this.selectedRegistry = event;
    this.getAllFishStocking();
  }

  submit(event: any) {
    console.log(event);
    event["fbz"] = this.selectedRegistry.fbz;
    event["year"] = this.selectedRegistry.year;
    this._service
      .callPostMethod("/api/owner/setReportSale", event)
      .subscribe((data) => {
        if (data) {
          this.getAllFishStocking();
          this._toastr.showSuccess();
        }
      });
  }
}
