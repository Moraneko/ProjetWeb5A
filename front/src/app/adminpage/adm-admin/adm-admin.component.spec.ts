import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmAdminComponent } from './adm-admin.component';

describe('AdmAdminComponent', () => {
  let component: AdmAdminComponent;
  let fixture: ComponentFixture<AdmAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
