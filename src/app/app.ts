import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskList } from './feature/tasks/task-list/task-list';
import { TodoItem } from './feature/tasks/todo-item/todo-item';
import { TaskForm } from "./feature/tasks/task-form/task-form";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskList, TaskForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('todo-list-app');
}
