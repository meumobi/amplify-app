import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Analytics } from 'aws-amplify';
import { Subscription } from 'rxjs';
import { APIService, Todo } from 'src/app/API.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss']
})
export class TodoListPage implements OnInit {

  public createForm: FormGroup;

  /* declare todos variable */
  public todos: Array<Todo> = [];

  private subscription: Subscription | null = null;

  constructor(private api: APIService, private fb: FormBuilder) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  async ngOnInit() {
    /* fetch todos when app loads */
    this.api.ListTodos().then((event) => {
      this.todos = event.items as Todo[];
    });

    /* subscribe to new todos being created */
    this.subscription = <Subscription>(
      this.api.OnCreateTodoListener.subscribe((event: any) => {
        const newTodo = event.value.data.onCreateTodo;
        this.todos = [newTodo, ...this.todos];
      })
    );
  }

  public onCreate(todo: Todo) {
    this.api
      .CreateTodo(todo)
      .then((event) => {
        console.log('item created!');
        Analytics.record(
          {
            name: 'todoCreate',
            attributes: {
              name: todo.name
            }
          }
        );
        this.createForm.reset();
      })
      .catch((e) => {
        console.log('error creating restaurant...', e);
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = null;
  }
}
