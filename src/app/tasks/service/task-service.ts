import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [
    { id: 1, title: 'Réécrire " Doit-on apprendre ?" ', status: 'à faire' },
    { id: 2, title: 'Tourner', status: 'à faire' },
    { id: 3, title: 'Monter', status: 'à faire' },
    { id: 4, title: 'Poster', status: 'à faire' },
  ];

  getAllTasks(): Task[] {
    return [...this.tasks];
  }

  add(task: { title: string }) {
    const newTask: Task = {
      id: this.tasks.length + 1,
      title: task.title,
      status: 'à faire',
    };

    this.tasks.push(newTask);
    return newTask;
  }

  updateTitle(taskId: number, newTitle: string) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) task.title = newTitle;
  }

  toggleStatus(taskId: number) {
    const task = this.tasks.find(t => t.id === taskId);
    if (!task) return;

    task.status = task.status === 'à faire' ? 'terminée' : 'à faire';
  }

  delete(taskId: number) {
    this.tasks = this.tasks.filter(t => t.id !== taskId);
  }
}
