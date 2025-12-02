import { Component } from '@angular/core';
import { Task } from '../models/task';
import { TodoItem } from "../todo-item/todo-item";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css'],
  imports: [CommonModule, TodoItem],
})
export class TaskList {
  TaskListTitle = 'Ma liste de tâches';

  tasks: Task[] = [
    {id: 1, title: 'Réécrire " Doit-on apprendre ?" ', status: 'à faire' },
    {id: 2, title: 'Tourner', status: 'à faire' },
    {id: 3, title: 'Monter', status: 'à faire' },
    {id: 4, title: 'Poster', status: 'à faire' },
  ];

  onTaskSelected(task: Task) {
    console.log('Tâche sélectionnée :', task.id);
  }

  constructor() {}
}
