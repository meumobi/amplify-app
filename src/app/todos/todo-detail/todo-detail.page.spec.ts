import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDetailPage } from './todo-detail.page';

describe('TodoDetailPage', () => {
  let component: TodoDetailPage;
  let fixture: ComponentFixture<TodoDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoDetailPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
