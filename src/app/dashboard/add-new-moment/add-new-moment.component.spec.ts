import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewMomentComponent } from './add-new-moment.component';

describe('AddNewMomentComponent', () => {
  let component: AddNewMomentComponent;
  let fixture: ComponentFixture<AddNewMomentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewMomentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewMomentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
