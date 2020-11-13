import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeInfoUserComponent } from './change-info-user.component';

describe('ChangeInfoUserComponent', () => {
  let component: ChangeInfoUserComponent;
  let fixture: ComponentFixture<ChangeInfoUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeInfoUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeInfoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
