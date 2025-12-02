import { Component } from '@angular/core';
import { empty } from 'rxjs';

interface Task {
  title: string;
  status: 'à faire' | 'en cours' | 'terminée';
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css'],
})
export class TaskList {
  TaskListTitle = 'Ma liste de tâches';

  tasks: Task[] = [
    { title: 'Réécrire " Doit-on apprendre ?" ', status: 'à faire' },
    { title: 'Tourner', status: 'à faire' },
    { title: 'Monter', status: 'à faire' },
    { title: 'Poster', status: 'à faire' },
  ];

  constructor() {}
}
