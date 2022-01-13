import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeContainerComponent } from './type-container.component';

describe('TypeContainerComponent', () => {
  let component: TypeContainerComponent;
  let fixture: ComponentFixture<TypeContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
