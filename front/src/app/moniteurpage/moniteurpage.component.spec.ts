import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoniteurpageComponent } from './moniteurpage.component';

describe('MoniteurpageComponent', () => {
  let component: MoniteurpageComponent;
  let fixture: ComponentFixture<MoniteurpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoniteurpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoniteurpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
