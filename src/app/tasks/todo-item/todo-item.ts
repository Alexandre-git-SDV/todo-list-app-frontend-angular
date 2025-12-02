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

  @Output() delete = new EventEmitter<number>();
  @Output() toggle = new EventEmitter<number>();

  onClick() {
    this.select.emit(this.task);
  }

  onDelete() {
    this.delete.emit(this.task.id);
  }

  onToggle() {
    this.toggle.emit(this.task.id);
  }
}
