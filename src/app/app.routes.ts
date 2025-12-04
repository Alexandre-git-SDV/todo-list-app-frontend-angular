import { Routes } from '@angular/router';
import { TaskForm } from './feature/tasks/task-form/task-form';
import { TaskList } from './feature/tasks/task-list/task-list';
import { TodoItem } from './feature/tasks/todo-item/todo-item';

export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskList },
  { path: 'tasks/new', component: TaskForm },
  { path: 'tasks/:id', component: TodoItem }
];
