import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMoniteurComponent } from './new-moniteur.component';

describe('NewMoniteurComponent', () => {
  let component: NewMoniteurComponent;
  let fixture: ComponentFixture<NewMoniteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMoniteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMoniteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
