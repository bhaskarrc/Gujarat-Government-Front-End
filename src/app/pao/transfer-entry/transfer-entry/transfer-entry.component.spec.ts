import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferEntryComponent } from './transfer-entry.component';

describe('TransferEntryComponent', () => {
  let component: TransferEntryComponent;
  let fixture: ComponentFixture<TransferEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});