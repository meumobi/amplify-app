import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { TodoListPage } from './todo-list/todo-list.page';
import { TodoDetailPage } from './todo-detail/todo-detail.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TodoListPage,
    TodoDetailPage
  ],
  imports: [
    CommonModule,
    TodosRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TodosModule { }
