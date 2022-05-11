import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService, Todo } from 'src/app/API.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.page.html',
  styleUrls: ['./todo-detail.page.scss']
})
export class TodoDetailPage implements OnInit {
  todo: Todo | undefined | null;

  constructor(private api: APIService, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    const todoId = this.route.snapshot.paramMap.get('id');
    if (todoId !== null) {
      this.api.GetTodo(todoId).then((item) => {
        this.todo = item;
      });
    } else {
      this.todo = null;
    }
  }

}
