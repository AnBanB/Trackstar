import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierNavComponent } from './courier-nav.component';

describe('CourierNavComponent', () => {
  let component: CourierNavComponent;
  let fixture: ComponentFixture<CourierNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourierNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourierNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
