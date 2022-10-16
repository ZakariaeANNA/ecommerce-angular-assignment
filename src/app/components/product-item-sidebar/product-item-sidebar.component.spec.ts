import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemSidebarComponent } from './product-item-sidebar.component';

describe('ProductItemSidebarComponent', () => {
  let component: ProductItemSidebarComponent;
  let fixture: ComponentFixture<ProductItemSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductItemSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
