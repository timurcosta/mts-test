import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IGetUserParams } from '@actions/users.action';
import { IGetTodoParams } from '@actions/todos.action';
import { IUser } from '@state/users.state';
import { ITodo } from '@state/todos.state';
import { API_TODOS, API_USERS } from '@paths/api.path';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<IUser[]>(`${API_USERS}`);
  }

  getUser(payload: IGetUserParams) {
    const { id } = payload;
    return this.http.get<IUser>(`${API_USERS}?id=${id}`);
  }

  getTodos(payload: IGetTodoParams) {
    const { id } = payload;
    return this.http.get<ITodo[]>(`${API_TODOS}?userId=${id}`);
  }
}
