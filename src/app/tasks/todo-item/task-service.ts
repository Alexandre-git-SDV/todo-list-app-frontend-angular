import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [
    { id: 1, title: 'Réécrire', status: 'à faire' },
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
    if (task) task.title = prompt("Entrer le nouveau nom:", newTitle) || task.title;
  }

  toggleStatus(taskId: number) {
    const task = this.tasks.find(t => t.id === taskId);
    if (!task) return;

    if (task.status === 'à faire') {
      task.status = 'en cours';

    } else if (task.status === 'en cours') {
      task.status = 'terminée';
    } else if (task.status === 'terminée') {
      task.status = 'à faire';
    }
  console.log('Tâche sélectionnée et changé:', task.id);
  }

  delete(taskId: number) {
    this.tasks = this.tasks.filter(t => t.id !== taskId);
  }
}
