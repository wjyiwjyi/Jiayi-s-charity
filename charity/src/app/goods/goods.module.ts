import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CharityService } from '../charity.service';
import { AuthGuardService } from '../authguard.service';
import { AuthInterceptor } from '../auth-interceptor';

import { GoodsRoutingModule } from './goods-routing.module';

import { GoodsComponent } from './goods/goods.component';
import { CheckInComponent } from './check-in/check-in.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GoodsRoutingModule,
    NgbModule,
		MatCardModule,
		MatListModule,
		MatSelectModule,
		MatTableModule,
		MatFormFieldModule,
		MatRadioModule,
		MatInputModule,
		FormsModule,
		ReactiveFormsModule
  ],
  providers:[
    CharityService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true
    }
  ],
  declarations: [
		GoodsComponent,
		CheckInComponent,
		CheckOutComponent,
		HomeComponent
	]
})
export class GoodsModule { }