import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersSearchResultComponent } from './offers-search-result.component';

describe('OffersSearchResultComponent', () => {
  let component: OffersSearchResultComponent;
  let fixture: ComponentFixture<OffersSearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffersSearchResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
