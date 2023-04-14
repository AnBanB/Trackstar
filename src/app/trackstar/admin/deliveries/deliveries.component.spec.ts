import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeliveriesComponent } from './deliveries.component';

describe('DeliveriesComponent', () => {
  let component: AdminDeliveriesComponent;
  let fixture: ComponentFixture<AdminDeliveriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDeliveriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
