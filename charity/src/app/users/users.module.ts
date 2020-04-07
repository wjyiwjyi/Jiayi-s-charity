import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

import { GoodsListModule } from '../goods-list/goods-list.module';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsersRoutingModule,
		GoodsListModule,
    NgbModule,
		RouterModule.forRoot([])
  ],
  declarations: [
    UsersComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent
	]
})
export class UsersModule { }