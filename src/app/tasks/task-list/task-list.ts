import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TaskService } from '../service/task-service';
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

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.tasks = this.taskService.getAllTasks();
  }

  addTask() {
    if (!this.newTaskTitle.trim()) return;

    this.taskService.add({ title: this.newTaskTitle });
    this.tasks = this.taskService.getAllTasks();
    this.newTaskTitle = '';
  }

  deleteTask(id: number) {
    this.taskService.delete(id);
    this.tasks = this.taskService.getAllTasks();
  }

  toggleTask(id: number) {
    this.taskService.toggleStatus(id);
    this.tasks = this.taskService.getAllTasks();
  }
}