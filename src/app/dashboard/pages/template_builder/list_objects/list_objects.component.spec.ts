import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListObjectsComponent } from './list_objects.component';

describe('ListObjectsComponent', () => {
  let component: ListObjectsComponent;
  let fixture: ComponentFixture<ListObjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListObjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListObjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
