import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMomentComponent } from './update-moment.component';

describe('UpdateMomentComponent', () => {
  let component: UpdateMomentComponent;
  let fixture: ComponentFixture<UpdateMomentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMomentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMomentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
