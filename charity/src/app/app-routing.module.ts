import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

const routes: Routes = [ 
  { path: '', redirectTo: '/visitor', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatSelectModule, MatTabsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
