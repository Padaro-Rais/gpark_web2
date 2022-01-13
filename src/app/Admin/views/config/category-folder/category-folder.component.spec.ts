import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryFolderComponent } from './category-folder.component';

describe('CategoryFolderComponent', () => {
  let component: CategoryFolderComponent;
  let fixture: ComponentFixture<CategoryFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryFolderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
