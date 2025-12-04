import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { TaskState } from '../models/task-state.enum';
import { Observable, of, switchMap } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskApiService {
  constructor(private http: HttpClient) {}

  // HTTP-backed methods
  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>('/api/tasks');
  }

  create(task: { title: string }): Observable<Task[]> {
    return this.http.post<Task[]>('/api/tasks', task, { observe: 'response' }).pipe(
      switchMap((res: HttpResponse<Task[]>) => {
        if (res.status === 201 && res.body) return of(res.body);
        return this.getAll();
      })
    );
  }

  update(taskId: number, body: any): Observable<Task[]> {
    return this.http.put<Task[]>(`/api/tasks/${taskId}`, body, { observe: 'response' }).pipe(
      switchMap((res: HttpResponse<Task[]>) => {
        if (res.status === 200 && res.body) return of(res.body);
        return this.getAll();
      })
    );
  }

  delete(taskId: number): Observable<Task[]> {
    return this.http.delete(`/api/tasks/${taskId}`, { observe: 'response' }).pipe(
      switchMap((res: HttpResponse<any>) => {
        if (res.status === 204) return this.getAll();
        return this.getAll();
      })
    );
  }

  // backward-compatible wrappers used by existing services/components
  getAllTasks(): Observable<Task[]> {
    return this.getAll();
  }

  add(task: { title: string }): Observable<Task[]> {
    return this.create(task);
  }

  updateTitle(taskId: number, newTitle: string): Observable<Task[]> {
    return this.update(taskId, { title: newTitle });
  }

  toggleStatus(taskId: number): Observable<Task[]> {
    return this.update(taskId, { action: 'toggle' });
  }
}
