import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfectationComponent } from './afectation.component';

describe('AfectationComponent', () => {
  let component: AfectationComponent;
  let fixture: ComponentFixture<AfectationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfectationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfectationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
