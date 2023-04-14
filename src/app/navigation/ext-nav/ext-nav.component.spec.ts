import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtNavComponent } from './ext-nav.component';

describe('ExtNavComponent', () => {
  let component: ExtNavComponent;
  let fixture: ComponentFixture<ExtNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
