import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CharityService } from '../charity.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GoodsListComponent } from './goods-list.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
		MatSelectModule,
		MatTableModule,
		MatPaginatorModule,
		MatSortModule,
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		ReactiveFormsModule
  ],
  providers:[
    CharityService
  ],
  declarations: [
		GoodsListComponent
	],
	exports: [
		GoodsListComponent
	]
})
export class GoodsListModule { }