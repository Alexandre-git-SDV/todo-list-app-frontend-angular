import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { TaskService } from '../task-list/task-service';
import { CreateTaskDto } from '../models/create-task-dto';
import { Task } from '../models/task';
import { notTestValidator } from '../../../shared/own-validators';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.css'],
})
export class TaskForm {

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

    // still emit local event for parent components
    const dto : CreateTaskDto = this.form.value;
    this.taskService.add(dto)
    console.log('Formulaire validée et envoi de la requête d\'ajout', value);
    this.form.reset();
  }

}
