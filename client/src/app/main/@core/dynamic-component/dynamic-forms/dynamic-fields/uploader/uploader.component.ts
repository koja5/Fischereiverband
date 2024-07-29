import { Component } from "@angular/core";
import { FieldConfig } from "../../models/field-config";
import { FormGroup } from "@angular/forms";
import { CallApiService } from "app/services/call-api.service";

@Component({
  selector: "app-uploader",
  templateUrl: "./uploader.component.html",
  styleUrls: ["./uploader.component.scss"],
})
export class UploaderComponent {
  public config: FieldConfig;
  public group: FormGroup;
  public savedFiles = [];
  files: any[] = [];

  constructor(private _service: CallApiService) {
    this.config = new FieldConfig();
    this.group = new FormGroup({});
  }

  ngOnInit() {
    console.log(this.config);
    console.log(this.group);
  }

  packFiles(documentation) {
    if (documentation[this.config.name]) {
      let files = documentation[this.config.name].split(";");
      for (let i = 0; i < files.length; i++) {
        this.savedFiles.push(files[i]);
      }
      return files;
    }
  }

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    console.log("USAO SAM!");
    console.log(this.files);
    console.log(index);

    let formData = new FormData();

    for (let i = 0; i < this.files.length; i++) {
      formData.append("files[]", this.files[i], this.files[i].name);
    }

    this.group.controls[this.config.name].setValue({ files: this.files });

    // this._service
    //   .callPostMethod("api/uploader/upload", formData)
    //   .subscribe((data) => {
    //     console.log(data);
    //   });
    // setTimeout(() => {
    //   if (index === this.files.length) {
    //     return;
    //   } else {
    //     const progressInterval = setInterval(() => {
    //       if (this.files[index].progress === 100) {
    //         clearInterval(progressInterval);
    //         this.uploadFilesSimulator(index + 1);
    //       } else {
    //         this.files[index].progress += 5;
    //       }
    //     }, 200);
    //   }
    // }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
}
