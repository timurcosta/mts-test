import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { GetUser, GetUsers } from '@actions/users.action';
import { DataService } from '@services/data.service';

const defaults = {
  Users: null,
  User: null,
};

export interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IAddress;
  addressString?: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface IUsersModel {
  Users: IUser[];
  User: IUser;
}

@State<IUsersModel>({
  name: 'users',
  defaults,
})
@Injectable()
export class UsersState {
  constructor(private data: DataService) {}

  @Selector()
  static Users(users: IUsersModel) {
    return users.Users;
  }

  @Selector()
  static User(users: IUsersModel) {
    return users.User;
  }

  @Action(GetUsers)
  GetUsers({ patchState }: StateContext<IUsersModel>) {
    this.data.getUsers().subscribe((res) => patchState({ Users: res }));
  }

  @Action(GetUser)
  GetUser({ patchState }: StateContext<IUsersModel>, { payload }) {
    this.data.getUser(payload).subscribe((res) => patchState({ User: res }));
  }
}
