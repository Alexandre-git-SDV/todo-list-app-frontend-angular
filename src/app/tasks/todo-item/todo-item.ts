import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../models/task';

@Component({
  selector: 'app-todo-item',
  imports: [],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.css',
})
export class TodoItem {

  @Input() task!: Task;
  @Output() select = new EventEmitter<Task>();

  onClick() {
    this.select.emit(this.task);
  }
}
