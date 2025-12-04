import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { TaskService } from '../task-list/task-service';
import { Task } from '../models/task';
import { TodoItem } from '../todo-item/todo-item';
import { Title } from '@angular/platform-browser';
import { notTestValidator } from '../../../shared/own-validators';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.css'],
})
export class TaskForm {
  @Output() taskCreated = new EventEmitter<{ title: string; description?: string }>();

  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3), notTestValidator]),
    description: new FormControl('')
  });

  constructor(private taskService: TaskService) {}

  onSubmitForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value as { title: string; description?: string };
    // call service to add task (only title is required by API)
    this.taskService.add({ title: value.title });

    // still emit local event for parent components
    this.taskCreated.emit(value);
    console.log('Formulaire validée et envoi de la requête d\'ajout', value);
    this.form.reset();
  }

}
