import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Task } from '../../feature/tasks/models/task';
import { TaskState } from '../../feature/tasks/models/task-state.enum';

@Injectable()
export class MockTaskApiInterceptor implements HttpInterceptor {
  private tasks: Task[] = [
    { id: 1, title: 'Réécrire', status: TaskState.ToDo },
    { id: 2, title: 'Tourner', status: TaskState.ToDo },
    { id: 3, title: 'Monter', status: TaskState.ToDo },
    { id: 4, title: 'Poster', status: TaskState.ToDo },
  ];

  intercept(req: HttpRequest<any>, _next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, body } = req;

    // Only intercept /api/tasks routes
    if (!url.startsWith('/api/tasks')) {
      return _next.handle(req);
    }

    const idMatch = url.match(/\/api\/tasks\/(\d+)$/);
    const id = idMatch ? parseInt(idMatch[1], 10) : null;

    // GET /api/tasks
    if (url === '/api/tasks' && method === 'GET') {
      return of(new HttpResponse({ status: 200, body: [...this.tasks] }));
    }

    // POST /api/tasks
    if (url === '/api/tasks' && method === 'POST') {
      const title = body?.title || 'Nouvelle tâche';
      const newId = this.tasks.length ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1;
      const newTask: Task = { id: newId, title, status: TaskState.ToDo };
      this.tasks.push(newTask);
      return of(new HttpResponse({ status: 201, body: [...this.tasks] }));
    }

    // PUT /api/tasks/:id
    if (id !== null && method === 'PUT') {
      const task = this.tasks.find(t => t.id === id);
      if (!task) return of(new HttpResponse({ status: 404 }));

      if (body?.action === 'toggle') {
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
      }

      if (typeof body?.title === 'string') {
        task.title = body.title;
      }

      return of(new HttpResponse({ status: 200, body: [...this.tasks] }));
    }

    // DELETE /api/tasks/:id
    if (id !== null && method === 'DELETE') {
      const exists = this.tasks.some(t => t.id === id);
      if (!exists) return of(new HttpResponse({ status: 404 }));
      this.tasks = this.tasks.filter(t => t.id !== id);
      return of(new HttpResponse({ status: 204 }));
    }

    // Pour toutes les autres requêtes, continuer le traitement normal
    return _next.handle(req);
  }
}
