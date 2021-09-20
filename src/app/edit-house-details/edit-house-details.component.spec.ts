import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHouseDetailsComponent } from './edit-house-details.component';

describe('EditHouseDetailsComponent', () => {
  let component: EditHouseDetailsComponent;
  let fixture: ComponentFixture<EditHouseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHouseDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHouseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
