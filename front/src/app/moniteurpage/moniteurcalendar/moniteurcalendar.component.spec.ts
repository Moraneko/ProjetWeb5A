import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoniteurcalendarComponent } from './moniteurcalendar.component';

describe('MoniteurcalendarComponent', () => {
  let component: MoniteurcalendarComponent;
  let fixture: ComponentFixture<MoniteurcalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoniteurcalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoniteurcalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
