import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChasRowItemComponent } from './chas-row-item.component';

describe('ChasRowItemComponent', () => {
  let component: ChasRowItemComponent;
  let fixture: ComponentFixture<ChasRowItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChasRowItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChasRowItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
