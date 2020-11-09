import { GetTodos } from '@actions/todos.action';
import { GetUser } from '@actions/users.action';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Navigate } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';
import { ITodo, ITodosModel, TodosState } from '@state/todos.state';
import { IUsersModel, UsersState } from '@state/users.state';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.styl'],
})
export class UserComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @Select(UsersState.User) user$: Observable<IUsersModel['User']>;
  @Select(TodosState.Todos) todos$: Observable<ITodosModel['Todos']>;

  displayedColumns: string[] = ['id', 'title', 'completed'];
  dataSource: MatTableDataSource<ITodo>;

  constructor(private route: ActivatedRoute, private store: Store) {}
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.loadData(id);
    this.todos$.pipe(filter((x) => !!x)).subscribe((res) => {
      this.dataSourceLoad(res);
    });
  }

  loadData(id: number) {
    const payload = { id };
    this.store.dispatch(new GetUser(payload));
    this.store.dispatch(new GetTodos(payload));
  }

  dataSourceLoad(usersData: ITodo[]) {
    this.dataSource = new MatTableDataSource(usersData);
    this.dataSource.sort = this.sort;
  }

  goHome() {
    this.store.dispatch(new Navigate([`/`]));
  }
}
