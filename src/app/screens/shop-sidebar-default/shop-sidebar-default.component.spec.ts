import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopSidebarDefaultComponent } from './shop-sidebar-default.component';

describe('ShopSidebarDefaultComponent', () => {
  let component: ShopSidebarDefaultComponent;
  let fixture: ComponentFixture<ShopSidebarDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopSidebarDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopSidebarDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
