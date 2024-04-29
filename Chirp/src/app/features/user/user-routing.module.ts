import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginWindowComponent } from './pages/login-window/login-window.component';
import { Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', component: LoginWindowComponent },
  // { path: 'register', component: RegisterWindowComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class UserRoutingModule { }