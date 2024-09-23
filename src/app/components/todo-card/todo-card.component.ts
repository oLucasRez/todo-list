import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { TodosSignalService } from 'src/app/services/todos-signal.service';
import { TodoKeyoLocalStorage } from 'src/app/models/enum/todo-key-local-storage';
import { Todo } from 'src/app/models/model/todo.model';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgTemplateOutlet,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
  ],
  templateUrl: './todo-card.component.html',
})
export class TodoCardComponent implements OnInit {
  private todosSignalService = inject(TodosSignalService);
  private todosSignal = this.todosSignalService.todosState;

  public todosList = computed(() => this.todosSignal());

  constructor() {
    effect(() => {
      console.log(this.todosSignalService.todosState());
    });
  }

  ngOnInit(): void {
    this.getTodosInLocalStorage();
  }

  getTodosInLocalStorage() {
    const todosData = localStorage.getItem(TodoKeyoLocalStorage.TODO_LIST);

    if (todosData) this.todosSignal.set(JSON.parse(todosData));
  }

  saveTodosInLocalStorage() {
    this.todosSignalService.saveTodosInLocalStorage();
  }

  handleToggleTodo(id: number) {
    this.todosSignal.mutate((todos) => {
      const todoIndex = todos.findIndex((todo) => todo.id === id);

      todos[todoIndex].done = !todos[todoIndex].done;

      this.saveTodosInLocalStorage();
    });
  }

  handleDeleteTodo(todo: Todo) {
    const i = this.todosList().indexOf(todo);

    if (i !== -1) {
      this.todosSignal.mutate((todos) => {
        todos.splice(i, 1);
        this.saveTodosInLocalStorage();
      });
    }
  }
}
