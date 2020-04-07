import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs/observable';

export interface Goods {
  id: number,
	kind: string,
	quantity: number,
	amount: number,
	targetLocation: string,
	donor: string,
	storeLocation: string,
	checkOut: boolean
}

@Injectable()
export class CharityService {
	
	constructor(
    private userServ: UserService,
    private http: HttpClient
	) {}
	
	getGoods() {
		return this.http.get('http://localhost:3000/goods/goods-list',
		{
			observe: 'response',
			//在头部加上JWT验证信息
			//headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.userServ.getToken())
		});
	}
	
	getCheckoutGoods() {
		return this.http.get('http://localhost:3000/goods/checkout-goods',
		{
			observe: 'response',
			//在头部加上JWT验证信息
			//headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.userServ.getToken())
		});
	}

	
	addGoods(goods: Goods) {
		const body = {'value': goods};
		return this.http.post('http://localhost:3000/goods/checkin', body);
	}
	
	changeCheckout(uid: number) {
		return this.http.post('http://localhost:3000/goods/checkout', {'value': uid});
	}
	
	changeStoreCheckout(store: string) {
		return this.http.post('http://localhost:3000/goods/storecheckout', {'value': store});
	}
	
	handleError(err: HttpErrorResponse): string {
		if (err.error instanceof Error) {
			return '发生错误，错误信息:' + err.error.message;
		} else {
			console.log(`Backend returned code ${err.status}, body was: ${err.error['msg']}`);
			return err.error['msg'];
		}
	}
	
}
