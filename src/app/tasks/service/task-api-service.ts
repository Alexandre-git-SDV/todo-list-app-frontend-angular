import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskApiService {
  
  /** getAllTasks(): Task[] {
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
    } **/
  
}
