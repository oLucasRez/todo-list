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
import { TodosSignalService } from 'src/app/services/todos-signal.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HeaderComponent } from '../header/header.component';

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
    MatDialogModule,
  ],
  templateUrl: './todo-form.component.html',
})
export class TodoFormComponent {
  private todosSignalService = inject(TodosSignalService);
  private dialogRefService = inject(MatDialogRef<HeaderComponent>);

  public allTodos = this.todosSignalService.todosState();

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

      this.todosSignalService.updateTodos({ id, title, description, done });
      this.dialogRefService.close();
    }
  }

  public handleCloseModal() {
    this.dialogRefService.close();
  }
}
