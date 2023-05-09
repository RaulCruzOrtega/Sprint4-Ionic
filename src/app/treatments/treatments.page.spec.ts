import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreatmentsPage } from './treatments.page';

describe('TreatmentsPage', () => {
  let component: TreatmentsPage;
  let fixture: ComponentFixture<TreatmentsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TreatmentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
