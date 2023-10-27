import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class DataPersistenceService {
  saveTasks(tasks: Task[]): void {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  getTasks(): Task[] {
    const data = localStorage.getItem('tasks');
    return data ? JSON.parse(data) : [];
  }
  
  constructor() { }
}
