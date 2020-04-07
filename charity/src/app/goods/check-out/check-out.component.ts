import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { CharityService, Goods } from '../../charity.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
	goods: Goods[] = [];
	
	displayedColumns: string[] = ['id', 'kind', 'quantity', 'amount', 'targetLocation',
	  'donor', 'storeLocation', 'checkOut'];
  dataSource: MatTableDataSource<Goods>;
	
  constructor(
	  private charityService: CharityService,
		private router: Router) {
			this.dataSource = new MatTableDataSource();
	}
	
	ngOnInit() {
		this.getCheckoutGoods();
	}
	
	changeCheckout(id: number) {
		this.charityService.changeCheckout(id)
			.subscribe(
				response => {
					alert("出库成功！");
					this.router.navigate(['/admin']);
					console.log(response);
				},
				(err)	=>
					alert(this.charityService.handleError(err)),
					() => console.log('The Post observable is now completed. ')
			);	
	}
	
	changeStoreCheckout(storeLocation: string) {
		console.log(storeLocation);
		this.charityService.changeStoreCheckout(storeLocation)
			.subscribe(
				response => {
					alert("出库成功！");
					console.log(response);
					this.router.navigate(['/admin']);
				},
				(err)	=>
					alert(this.charityService.handleError(err)),
					() => console.log('The Post observable is now completed. ')
			);	
	}
	
	getCheckoutGoods() {
		this.charityService.getCheckoutGoods()
			.subscribe(
				resp => {
					if(resp.body['code'] === '200'){
						let res = resp.body['results'];
						for(let i = 0; i < res.length; i++){
						  let g: Goods = {
								id: res[i]['id'],
								kind: res[i]['kind'],
								quantity: res[i]['quantity'],
								amount: res[i]['amount'],
								targetLocation: res[i]['targetLocation'],
								donor: res[i]['donor'],
								storeLocation: res[i]['storeLocation'],
								checkOut: res[i]['checkOut']
							};
							this.goods.push(g);
						}
						this.dataSource.data = this.goods;
						console.log(this.goods);
					}
				},
				(err)=>{
					this.charityService.handleError(err);
				},
				()=>console.log('The Post observable is now completed.')
			)
	}
	
	applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
	
}
