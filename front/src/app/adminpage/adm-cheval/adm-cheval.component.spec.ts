import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmChevalComponent } from './adm-cheval.component';

describe('AdmChevalComponent', () => {
  let component: AdmChevalComponent;
  let fixture: ComponentFixture<AdmChevalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmChevalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmChevalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
