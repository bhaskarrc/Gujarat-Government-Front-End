import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseConfirmDialogComponent } from './close-confirm-dialog.component';

describe('CloseConfirmDialogComponent', () => {
  let component: CloseConfirmDialogComponent;
  let fixture: ComponentFixture<CloseConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});