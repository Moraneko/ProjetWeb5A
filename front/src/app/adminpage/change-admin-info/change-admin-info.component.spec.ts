import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAdminInfoComponent } from './change-admin-info.component';

describe('ChangeAdminInfoComponent', () => {
  let component: ChangeAdminInfoComponent;
  let fixture: ComponentFixture<ChangeAdminInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeAdminInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeAdminInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
