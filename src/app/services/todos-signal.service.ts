import { Injectable, signal } from '@angular/core';
import { Todo } from '../models/model/todo.model';
import { TodoKeyoLocalStorage } from '../models/enum/todo-key-local-storage';

@Injectable({
  providedIn: 'root',
})
export class TodosSignalService {
  public todosState = signal<Todo[]>([]);

  public updateTodos({ id, title, description, done }: Todo) {
    this.todosState.mutate((todos) =>
      todos.push(new Todo(id, title, description, done))
    );

    this.saveTodosInLocalStorage();
  }

  public saveTodosInLocalStorage() {
    const todos = JSON.stringify(this.todosState());
    if (todos) localStorage.setItem(TodoKeyoLocalStorage.TODO_LIST, todos);
  }
}
