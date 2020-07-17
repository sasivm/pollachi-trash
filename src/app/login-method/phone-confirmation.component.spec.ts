import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneConfirmationComponent } from './phone-confirmation.component';

describe('PhoneConfirmationComponent', () => {
  let component: PhoneConfirmationComponent;
  let fixture: ComponentFixture<PhoneConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
