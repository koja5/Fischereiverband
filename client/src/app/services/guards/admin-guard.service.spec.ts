import { TestBed } from "@angular/core/testing";

import { AdminGuardService } from "./admin-guard.service";

describe("AdminService", () => {
  let service: AdminGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminGuardService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
