import { AuthGuardService } from './services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ListComponent } from './feedback/list/list.component';
import { CreateComponent } from './feedback/create/create.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  }, {
    path: 'login',
    component: LoginComponent,
  }, {
    path: 'list',
    component: ListComponent,
    canActivate: [AuthGuardService]
  }, {
    path: 'create',
    component: CreateComponent,
    canActivate: [AuthGuardService]
  }, {
    path: 'edit/:id',
    component: CreateComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
