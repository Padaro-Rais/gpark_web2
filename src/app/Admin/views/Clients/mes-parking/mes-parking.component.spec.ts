import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesParkingComponent } from './mes-parking.component';

describe('MesParkingComponent', () => {
  let component: MesParkingComponent;
  let fixture: ComponentFixture<MesParkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesParkingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
