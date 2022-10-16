import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopGridDefaultComponent } from './shop-grid-default.component';

describe('ShopGridDefaultComponent', () => {
  let component: ShopGridDefaultComponent;
  let fixture: ComponentFixture<ShopGridDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopGridDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopGridDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
