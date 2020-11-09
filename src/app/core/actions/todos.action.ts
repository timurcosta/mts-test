export interface IGetTodoParams {
  id: number;
}

export class GetTodos {
  static readonly type = '[Todos] GetTodos';
  constructor(public payload: IGetTodoParams) {}
}
