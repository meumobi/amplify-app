import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoDetailPage } from './todo-detail/todo-detail.page';
import { TodoListPage } from './todo-list/todo-list.page';

const routes: Routes = [
  { path: '', component: TodoListPage},
  { path: 'detail/:id', component: TodoDetailPage},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }
