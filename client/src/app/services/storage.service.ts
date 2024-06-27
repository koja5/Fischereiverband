import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie";
import { JwtHelperService } from "@auth0/angular-jwt";
import * as CryptoJS from "crypto-js";
import { environment } from "../../environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  helper = new JwtHelperService();

  constructor(private cookieService: CookieService) {}

  setSessionStorage(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getSessionStorage(key: string) {
    const storage = sessionStorage.getItem(key);
    if (storage?.startsWith("{") && storage?.endsWith("}")) {
      return JSON.parse(storage);
    } else {
      return storage;
    }
  }

  removeAllSessionStorage() {
    sessionStorage.clear();
  }

  removeSessionStorage(key: string) {
    sessionStorage.removeItem(key);
  }

  setLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getLocalStorage(key: string) {
    const storage = localStorage.getItem(key);
    if (storage?.startsWith("{") && storage?.endsWith("}")) {
      return JSON.parse(storage);
    } else {
      return storage;
    }
  }

  removeAllLocalStorage() {
    localStorage.clear();
  }

  removeLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  path?: string;
  domain?: string;
  expires?: string | Date;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: boolean | "lax" | "strict" | "none";
  storeUnencoded?: boolean;

  setToken(token: any) {
    this.cookieService.put("token", token, {
      expires: new Date(new Date().getTime() + 86400000),
      sameSite: "lax",
    });
  }

  getToken() {
    return this.cookieService.get("token");
  }

  deleteToken() {
    this.cookieService.remove("token");
  }

  setCookie(key: string, value: any) {
    this.cookieService.put(key, value, {
      expires: undefined,
      path: "/",
      sameSite: "lax",
    });
  }

  getCookie(key: string) {
    return this.cookieService.get(key);
  }

  removeCookie(key: string) {
    this.cookieService.remove(key);
  }

  setCookieObject(key: string, value: any) {
    this.cookieService.put(key, JSON.stringify(value), {
      expires: undefined,
      path: "/",
      sameSite: "lax",
    });
  }

  getCookieObject(key: string) {
    if (this.cookieService.get(key)) {
      return JSON.parse(this.cookieService.get(key));
    } else {
      return [];
    }
  }

  getDecodeToken() {
    if (this.getToken()) {
      return this.helper.decodeToken(this.getToken()).user;
    }
    return false;
  }

  getUserId() {
    if (this.getToken()) {
      return this.helper.decodeToken(this.getToken()).user.id;
    }
    return false;
  }

  getLicenseId() {
    if (this.getToken()) {
      return this.helper.decodeToken(this.getToken()).user.license_id;
    }
  }

  getAdminIdSha1() {
    if (this.getToken()) {
      return this.helper.decodeToken(this.getToken()).user.admin_id;
    }
    return false;
  }

  encrypt(value: any) {
    return CryptoJS.AES.encrypt(
      JSON.stringify(value),
      environment.ENCRIPTY_KEY
    ).toString();
  }

  decrypt(value: any) {
    return CryptoJS.AES.decrypt(value, environment.ENCRIPTY_KEY).toString(
      CryptoJS.enc.Utf8
    );
  }

  getSelectedLanguage(check?: boolean) {
    const config = this.getLocalStorage("config");
    if (config) {
      if (config.app.appLanguage === "rs" && check) {
        return "sr-Latn";
      }
      return config.app.appLanguage;
    }
    return "en";
  }

  setAvatarProfileInToken(avatar: any) {
    let user = this.getDecodeToken();
    user.avatar = avatar;

    this.setToken(this.encrypt(user));
  }
}