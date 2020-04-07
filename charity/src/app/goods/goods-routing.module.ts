import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoodsComponent } from './goods/goods.component';
import { CheckInComponent } from './check-in/check-in.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { AuthGuardService } from '../authguard.service';
import { HomeComponent } from './home/home.component';

const goodsRoutes: Routes = [
	{
		path: 'admin',
		component: GoodsComponent,
		canActivate: [AuthGuardService],
		children: [
			{ path: 'home', component: HomeComponent },
			{ path: 'checkin', component: CheckInComponent },
			{ path: 'checkout', component: CheckOutComponent }
		]
	},
];

@NgModule({
    imports: [
        RouterModule.forChild(goodsRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class GoodsRoutingModule {

}