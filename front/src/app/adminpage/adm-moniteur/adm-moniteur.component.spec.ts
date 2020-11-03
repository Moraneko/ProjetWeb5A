import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmMoniteurComponent } from './adm-moniteur.component';

describe('AdmMoniteurComponent', () => {
  let component: AdmMoniteurComponent;
  let fixture: ComponentFixture<AdmMoniteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmMoniteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmMoniteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
