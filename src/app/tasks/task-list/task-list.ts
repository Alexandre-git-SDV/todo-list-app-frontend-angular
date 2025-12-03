import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  newTaskTitle = '';
  newTitle = '';

  constructor(private taskService: TaskService) {}

  onTaskSelected(task: Task) {
    console.log('Tâche sélectionnée :', task.id);
  }

  ngOnInit() {
    this.tasks = this.taskService.getAllTasks();
    console.log('Tâches Affichées :', this.tasks);
  }

  addTask() {
    if (!this.newTaskTitle.trim()) return;

    this.taskService.add({ title: this.newTaskTitle });
    this.tasks = this.taskService.getAllTasks();
    this.newTaskTitle = '';
    console.log('Tâche ajoutée :', this.newTaskTitle);
  }

  updateTaskTitle(taskId: number, newTitle: string) {
    this.taskService.updateTitle(taskId, newTitle);
    this.tasks = this.taskService.getAllTasks();
    console.log('Tâche mise à jour :', taskId, newTitle);
  }

  deleteTask(id: number) {
    this.taskService.delete(id);
    this.tasks = this.taskService.getAllTasks();
    console.log('Tâche supprimée :', id);
  }

  toggleTask(id: number) {
    this.taskService.toggleStatus(id);
    this.tasks = this.taskService.getAllTasks();
  }
}