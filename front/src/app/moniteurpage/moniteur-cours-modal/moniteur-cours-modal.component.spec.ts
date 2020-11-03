import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoniteurCoursModalComponent } from './moniteur-cours-modal.component';

describe('MoniteurCoursModalComponent', () => {
  let component: MoniteurCoursModalComponent;
  let fixture: ComponentFixture<MoniteurCoursModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoniteurCoursModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoniteurCoursModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
