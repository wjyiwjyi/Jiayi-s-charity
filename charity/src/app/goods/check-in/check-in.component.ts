import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CharityService, Goods } from '../../charity.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent{
  goods: Goods = {
		id: 0,
		kind: '',
		quantity: 0,
		amount: 0,
		targetLocation: '',
		donor: '',
		storeLocation: '',
		checkOut: false
	};
  
  constructor(
	  private charityService: CharityService,
		private router: Router) {}

  addGoods() {
		this.charityService.addGoods(this.goods)
			.subscribe(
			  response => {
					alert("添加成功！");
					console.log(response);
					this.router.navigate(['/admin']);
				},
				(err)=>
					alert(this.charityService.handleError(err)),
						() => console.log('The Post observable is now completed. ')
			);
  }
}
