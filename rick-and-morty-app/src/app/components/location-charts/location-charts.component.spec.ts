import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationChartsComponent } from './location-charts.component';

describe('LocationChartsComponent', () => {
  let component: LocationChartsComponent;
  let fixture: ComponentFixture<LocationChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
