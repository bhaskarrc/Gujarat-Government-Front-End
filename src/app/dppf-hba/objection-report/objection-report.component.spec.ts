import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectionReportComponent } from './objection-report.component';

describe('ObjectionReportComponent', () => {
  let component: ObjectionReportComponent;
  let fixture: ComponentFixture<ObjectionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});