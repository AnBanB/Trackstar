import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierDeliveriesComponent } from './deliveries.component';

describe('DeliveriesComponent', () => {
  let component: CourierDeliveriesComponent;
  let fixture: ComponentFixture<CourierDeliveriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourierDeliveriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourierDeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
