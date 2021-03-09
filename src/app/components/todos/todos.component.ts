import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodosDataService } from 'src/services/todos-data.service';
import { TodoListItem } from '../../models/todos';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  items$: Observable<TodoListItem[]>;
  constructor(private service: TodosDataService) { }

  ngOnInit(): void {
    this.service.loadData();
    this.items$ = this.service.getData$();
  }

  onItemAdded(item: string): void {
    this.service.addTodo({ description: item });
  }
}
