import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesTransactionComponent } from './mes-transaction.component';

describe('MesTransactionComponent', () => {
  let component: MesTransactionComponent;
  let fixture: ComponentFixture<MesTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
