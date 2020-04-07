import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CharityService, Goods } from '../charity.service';

@Component({
  selector: 'app-goods-list',
  templateUrl: './goods-list.component.html',
  styleUrls: ['./goods-list.component.css']
})
export class GoodsListComponent implements OnInit {
  goods: Goods[] = [];
	
	displayedColumns: string[] = ['id', 'kind', 'quantity', 'amount', 'targetLocation',
	  'donor', 'storeLocation', 'checkOut'];
  dataSource: MatTableDataSource<Goods>;
	
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
	
  constructor(private charityService: CharityService) {
		this.dataSource = new MatTableDataSource();
	}

  ngOnInit() {
    this.getGoods();
		this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
	
	getGoods() {
		this.charityService.getGoods()
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
					}
				},
				(err)=>{
					this.charityService.handleError(err);
				},
				()=>console.log('The Post observable is now completed.')
			);
	}
	
	applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
