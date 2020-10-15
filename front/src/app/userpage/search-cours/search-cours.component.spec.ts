import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCoursComponent } from './search-cours.component';

describe('SearchCoursComponent', () => {
  let component: SearchCoursComponent;
  let fixture: ComponentFixture<SearchCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
