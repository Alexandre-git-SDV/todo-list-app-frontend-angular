import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { CreateTaskDto } from '../models/create-task-dto';
import { TaskApiService } from '../../../core/service/task-api-service';
import { TaskStore } from '../store/task-store';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  
  constructor(
    private apiService: TaskApiService,
    private taskStore: TaskStore) {}


  loadAllTasks() {
    this.apiService.getAllTasks().subscribe(tasks => {
      this.taskStore.setTasks(tasks);
    });
  }
  
  get tasks$() {
    return this.taskStore.task$;
  }

  setTasks(tasks: Task[]) {
    this.taskStore.setTasks(tasks);
  }

  add(task: CreateTaskDto) {
    this.apiService.add(task).subscribe(updatedTasks => {
      this.taskStore.setTasks(updatedTasks);
    });
  }

  updateTitle(taskId: number, newTitle: string, title: string) {
    this.apiService.updateTitle(taskId, newTitle, title).subscribe(updatedTasks => {
      this.taskStore.setTasks(updatedTasks);
    });
  }

  toggleStatus(taskId: number) {
    this.apiService.toggleStatus(taskId).subscribe(updatedTasks => {
      this.taskStore.setTasks(updatedTasks);
    });
  }

  delete(taskId: number) {
    this.apiService.delete(taskId).subscribe(updatedTasks => {
      this.taskStore.setTasks(updatedTasks);
    });
  }
}
