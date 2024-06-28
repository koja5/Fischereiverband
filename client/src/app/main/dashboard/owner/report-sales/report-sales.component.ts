import { Component, ViewChild } from "@angular/core";
import { DynamicGridComponent } from "app/main/@core/dynamic-component/dynamic-grid/dynamic-grid.component";

@Component({
  selector: "app-report-sales",
  templateUrl: "./report-sales.component.html",
  styleUrls: ["./report-sales.component.scss"],
})
export class ReportSalesComponent {
  @ViewChild("grid") grid: DynamicGridComponent;

  public path = "grids/owner";
  public file = "report-sales.json";

  unsavedChanges(): boolean {
    return this.grid.unsavedChanges();
  }
}
