import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursmoniteurComponent } from './coursmoniteur.component';

describe('CoursmoniteurComponent', () => {
  let component: CoursmoniteurComponent;
  let fixture: ComponentFixture<CoursmoniteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursmoniteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursmoniteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
