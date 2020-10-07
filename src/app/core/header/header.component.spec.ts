import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HeaderComponent } from "./header.component";
import { DataService } from "../service/data.service";
import { Router } from "@angular/router";
import { AuthService } from "angularx-social-login";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let service: DataService;
  let router: Router;
  let authService: AuthService;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ HeaderComponent ]
  //   })
  //   .compileComponents();
  // }));

  // it('should be created', () => {
  //   expect(component).toBeTruthy();
  //   component.adminCheck();
  //   component.signOut();
  //   component.logOut();
  // });

});
