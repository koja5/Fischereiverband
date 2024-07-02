import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { StorageService } from "../storage.service";
import { HelpService } from "../help.service";
import { UserTypes } from "app/main/enums/user-types";

@Injectable({
  providedIn: "root",
})
export class OwnerGuardService {
  constructor(
    public _router: Router,
    public _storageService: StorageService,
    private _helpService: HelpService
  ) {}

  canActivate() {
    const user = this._storageService.getDecodeToken();
    if (user.type === UserTypes.owner) {
      return true;
    } else {
      this._helpService.setLocalStorage("previousLink", window.location.href);
      this._router.navigate(["./dashboard/miscellaneous/not-authorized"]);
      return false;
    }
  }
}