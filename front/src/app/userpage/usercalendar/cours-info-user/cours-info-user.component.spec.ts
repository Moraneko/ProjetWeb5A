import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursInfoUserComponent } from './cours-info-user.component';

describe('CoursInfoUserComponent', () => {
  let component: CoursInfoUserComponent;
  let fixture: ComponentFixture<CoursInfoUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursInfoUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursInfoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
