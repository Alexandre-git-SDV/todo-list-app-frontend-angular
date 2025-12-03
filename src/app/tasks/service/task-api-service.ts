import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { TaskState } from '../models/task-state.enum';
import { delay, Observable, of, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskApiService {

  private tasks: Task[] = [
    { id: 1, title: 'Réécrire', status: 'à faire' },
    { id: 2, title: 'Tourner', status: 'à faire' },
    { id: 3, title: 'Monter', status: 'à faire' },
    { id: 4, title: 'Poster', status: 'à faire' },
  ];
  
  getAllTasks(): Observable<Task[]> {
      return of([...this.tasks]);
    }
  
    add(task: { title: string }): Observable<Task[]> {
      const newTask: Task = {
        id: this.tasks.length + 1,
        title: task.title,
        status: 'à faire',
      };
  
      this.tasks.push(newTask);
      return of([...this.tasks]);
    }
  
    updateTitle(taskId: number, newTitle: string): Observable<Task[]> {
      const task = this.tasks.find(t => t.id === taskId);
      if (task) task.title = prompt("Nouveau titre de la tâche :", task.title) || task.title;
      return of([...this.tasks]).pipe(delay(250));
    }
  
    toggleStatus(taskId: number): Observable<Task[]> {
      const task = this.tasks.find(t => t.id === taskId);
      if (!task) return of([...this.tasks]).pipe(delay(250));
  
      switch (task.status) {
        case TaskState.ToDo:
          task.status = TaskState.InProgress;
          break;
        case TaskState.InProgress:
          task.status = TaskState.Done;
          break;
        case TaskState.Done:
          task.status = TaskState.ToDo;
          break;
      }
      return of([...this.tasks]).pipe(delay(250));
    }
  
    delete(taskId: number): Observable<Task[]> {
      this.tasks = this.tasks.filter(t => t.id !== taskId);
      return of([...this.tasks]);
    } 
}
