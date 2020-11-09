export interface IGetUserParams {
  id: number;
}

export class GetUsers {
  static readonly type = '[Users] GetUsers';
  constructor() {}
}

export class GetUser {
  static readonly type = '[Users] GetUser';
  constructor(public payload: IGetUserParams) {}
}
