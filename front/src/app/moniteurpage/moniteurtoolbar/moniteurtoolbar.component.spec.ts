import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoniteurtoolbarComponent } from './moniteurtoolbar.component';

describe('MoniteurtoolbarComponent', () => {
  let component: MoniteurtoolbarComponent;
  let fixture: ComponentFixture<MoniteurtoolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoniteurtoolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoniteurtoolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
