import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoniteurAddCoursModalComponent } from './moniteur-add-cours-modal.component';

describe('MoniteurAddCoursModalComponent', () => {
  let component: MoniteurAddCoursModalComponent;
  let fixture: ComponentFixture<MoniteurAddCoursModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoniteurAddCoursModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoniteurAddCoursModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
