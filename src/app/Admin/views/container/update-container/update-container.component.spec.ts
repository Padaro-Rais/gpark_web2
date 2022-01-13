import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateContainerComponent } from './update-container.component';

describe('UpdateContainerComponent', () => {
  let component: UpdateContainerComponent;
  let fixture: ComponentFixture<UpdateContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
