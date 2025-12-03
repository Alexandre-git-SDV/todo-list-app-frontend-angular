import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({ providedIn: 'root' })
export class TaskStore {

  private readonly _tasks = new BehaviorSubject<Task[]>([]);
  readonly task$: Observable<Task[]> = this._tasks.asObservable();

  // ========== MÉTHODES CRUD ========== //

  /** Remplace entièrement la liste des tâches */
  setTasks(tasks: Task[]) {
    this._tasks.next(tasks);
  }

  add(task: Task) {
    const current = [...this._tasks.value];
    this._tasks.next([...current, task]);
  }

  update(id: number, changes: Partial<Task>) {
    const updated = this._tasks.value.map(t =>
      t.id === id ? { ...t, ...changes } : t
    );
    this._tasks.next(updated);
  }

  /** Supprime une tâche grâce à son id */
  remove(id: number) {
    const next = this._tasks.value.filter(t => t.id !== id);
    this._tasks.next(next);
  }
}
