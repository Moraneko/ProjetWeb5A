import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeInfoMoniteurComponent } from './change-info-moniteur.component';

describe('ChangeInfoMoniteurComponent', () => {
  let component: ChangeInfoMoniteurComponent;
  let fixture: ComponentFixture<ChangeInfoMoniteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeInfoMoniteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeInfoMoniteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
