import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ReferralcodeComponent } from "./referralcode.component";
import { DataService } from 'src/app/core/service/data.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

describe('ReferralcodeComponent', () => {
  let component: ReferralcodeComponent;
  let service: DataService;
  let httpClient: HttpClient;
  // let fixture: ComponentFixture<ReferralcodeComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ ReferralcodeComponent ]
  //   })
  //   .compileComponents();
  // }));

  beforeEach(() => {
    service = new DataService(httpClient);
    component = new ReferralcodeComponent(service);

  });
it('should return success message', () => {
  let data = {
    response: {
      message: 'message send'
    }
  }
  spyOn(service , 'sendEmail').and.returnValue(of(data));
component.ngOnInit();
component.group = new FormGroup({
  code: new FormControl('abc@gmail.com')
})

component.submitEmail();
expect(component.message).toEqual('message send');

})

});
