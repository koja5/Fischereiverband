import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MessageService {
  public configValue = new Subject<any>();

  constructor() {}

  sendConfigValueEmit(value: any) {
    this.configValue.next(value);
  }

  getConfigValueEmit(): Observable<any> {
    return this.configValue.asObservable();
  }
}
