import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { TaskService } from '../todo-item/task-service';
import { Task } from '../models/task';
import { TodoItem } from '../todo-item/todo-item';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css'],
  imports: [CommonModule, FormsModule, TodoItem],
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

  updateTaskTitle(taskId: number, newTitle: string) {
    this.taskService.updateTitle(taskId, newTitle);
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