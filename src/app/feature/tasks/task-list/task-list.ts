import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { TaskService } from './task-service';
import { Task } from '../models/task';
import { TodoItem } from '../todo-item/todo-item';
import { TaskForm } from "../task-form/task-form";

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css'],
  imports: [CommonModule, FormsModule, TodoItem, TaskForm],
})
export class TaskList {

  TaskListTitle = 'Ma liste de tâches';
  tasks: Task[] = [];
  tasks$!: Observable<Task[]>;
  newTaskTitle = '';
  newTitle = '';

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.tasks$;
    this.taskService.loadAllTasks();
  }

  onTaskSelected(task: Task) {
    console.log('Tâche sélectionnée :', task.id);
  }

  ngOnInit() {
    this.tasks$.subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  addTask() {
    if (!this.newTaskTitle.trim()) return;

    this.taskService.add({ title: this.newTaskTitle });
    this.newTaskTitle = this.newTaskTitle;
    console.log('Tâche ajoutée :', this.newTaskTitle , this.tasks.length + 1 );
  }

  updateTaskTitle(taskId: number, newTitle: string, title: string) {
    this.taskService.updateTitle(taskId, newTitle, title);
    console.log('Tâche mise à jour :', taskId, newTitle);
  }

  deleteTask(id: number) {
    this.taskService.delete(id);
    console.log('Tâche supprimée :', id);
  }

  toggleTask(id: number) {
    this.taskService.toggleStatus(id);
    console.log('Status de Tâche changé :', id);
  }
}