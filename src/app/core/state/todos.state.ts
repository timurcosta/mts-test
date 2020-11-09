import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { GetTodos } from '@actions/todos.action';
import { DataService } from '@services/data.service';

const defaults = {
  Todos: null,
};

export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface ITodosModel {
  Todos: ITodo[];
}

@State<ITodosModel>({
  name: 'todos',
  defaults,
})
@Injectable()
export class TodosState {
  constructor(private data: DataService) {}

  @Selector()
  static Todos(todos: ITodosModel) {
    return todos.Todos;
  }

  @Action(GetTodos)
  GetTodos({ patchState }: StateContext<ITodosModel>, { payload }) {
    this.data.getTodos(payload).subscribe((res) => patchState({ Todos: res }));
  }
}
