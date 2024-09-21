import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TodoSignalsService } from 'src/app/services/todo-signals.service';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './todo-form.component.html',
})
export class TodoFormComponent {
  private todoSignalsService = inject(TodoSignalsService);

  public allTodos = this.todoSignalsService.todosState();

  public todoForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  public handleCreateNewTodo() {
    if (this.todoForm.valid) {
      const title = String(this.todoForm.controls.title.value);
      const description = String(this.todoForm.controls.description.value);
      const id = this.allTodos.length + 1;
      const done = false;

      this.todoSignalsService.updateTodos({ id, title, description, done });
    }
  }
}
