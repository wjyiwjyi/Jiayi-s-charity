import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersModule } from './users/users.module';
import { GoodsModule } from './goods/goods.module';
import { GoodsListModule } from './goods-list/goods-list.module';

import { UserService } from './user.service';
import { CharityService } from './charity.service';
import { AuthTokenService } from './authtoken.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	  FormsModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		HttpClientModule,
		UsersModule,
		GoodsModule,
		NgbModule,
		GoodsListModule,
		RouterModule.forRoot([])
  ],
  providers: [
	  AuthTokenService,
		CharityService,
		UserService
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
