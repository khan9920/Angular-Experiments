import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowthChartTsComponent } from './growth-chart-ts.component';

describe('GrowthChartTsComponent', () => {
  let component: GrowthChartTsComponent;
  let fixture: ComponentFixture<GrowthChartTsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowthChartTsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowthChartTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
