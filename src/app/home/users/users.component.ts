import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GetUsers } from '@actions/users.action';
import { IAddress, IUser, UsersState } from '@state/users.state';
import { IUsersModel } from '@state/users.state';
import { filter } from 'rxjs/operators';
import { MatSelectChange } from '@angular/material/select';
import { Navigate } from '@ngxs/router-plugin';

interface ISortType {
  id: string;
  start: string;
  name: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.styl'],
})
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Select(UsersState.Users) users$: Observable<IUsersModel['Users']>;
  displayedColumns: string[] = [
    'avatar',
    'name',
    'username',
    'email',
    'addressString',
  ];
  dataSource: MatTableDataSource<IUser>;
  usersData: IUser[];
  avatarUrl = 'https://via.placeholder.com/120x180';
  companyList: string[];
  sortTypes: ISortType[] = [
    {
      id: 'name',
      start: 'asc',
      name: 'Name Asc',
    },
    {
      id: 'name',
      start: 'desc',
      name: 'Name Desc',
    },
    {
      id: 'username',
      start: 'asc',
      name: 'Username Asc',
    },
    {
      id: 'username',
      start: 'desc',
      name: 'Username Desc',
    },
    {
      id: 'email',
      start: 'asc',
      name: 'Email Asc',
    },
    {
      id: 'email',
      start: 'desc',
      name: 'Email Desc',
    },
    {
      id: 'addressString',
      start: 'asc',
      name: 'Address Asc',
    },
    {
      id: 'addressString',
      start: 'desc',
      name: 'Address Desc',
    },
  ];

  constructor(public store: Store) {}

  ngOnInit(): void {
    this.loadData();
    this.users$.pipe(filter((x) => !!x)).subscribe((res) => {
      this.usersData = JSON.parse(JSON.stringify(res));
      this.usersData = this.usersData.map((x: IUser) =>
        Object.assign(x, { addressString: this.getAddressString(x.address) })
      );
      this.companyList = this.createUniqueCompanyList(this.usersData);
      this.dataSourceLoad(this.usersData);
    });
  }

  loadData() {
    this.store.dispatch(new GetUsers());
  }

  dataSourceLoad(usersData: IUser[], filterValue?: string) {
    if (filterValue) {
      usersData = usersData.filter((x) => x.company.name === filterValue);
    }
    this.dataSource = new MatTableDataSource(usersData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAddressString(addressObj: IAddress): string {
    return `${addressObj.city} ${addressObj.street} ${addressObj.suite}`;
  }

  createUniqueCompanyList(usersData: IUser[]): string[] {
    const companyList: string[] = [];
    usersData.forEach((x: IUser) => {
      companyList.push(x.company.name);
    });
    return [...new Set(companyList)] as string[];
  }

  applyFilter(event: MatSelectChange) {
    const filterValue = event.value;
    this.dataSourceLoad(this.usersData, filterValue);
  }

  sortData(event: MatSelectChange) {
    const sortType = this.sortTypes.find((x) => x.name === event.value);
    const id = sortType.id;
    const start = sortType.start;
    const disableClear = false;
    const currentDirection = this.sort.direction;

    if (start === 'asc' && currentDirection !== 'asc') {
      this.sort.sort({ id: null, start, disableClear });
      this.sort.sort({ id, start, disableClear });
    } else if (start === 'desc' && currentDirection !== 'desc') {
      this.sort.sort({ id: null, start, disableClear });
      this.sort.sort({ id, start, disableClear });
    }
  }

  navigateTo(id: number) {
    this.store.dispatch(new Navigate([`user/${id}`]));
  }
}
