import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './home/user/user.component';
import { UsersComponent } from './home/users/users.component';

const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/:id', component: UserComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
