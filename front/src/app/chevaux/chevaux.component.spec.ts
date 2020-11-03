import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChevauxComponent } from './chevaux.component';

describe('ChevauxComponent', () => {
  let component: ChevauxComponent;
  let fixture: ComponentFixture<ChevauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChevauxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChevauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
