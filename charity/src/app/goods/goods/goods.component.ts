import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthTokenService } from '../../authtoken.service';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.css']
})
export class GoodsComponent {

  constructor(
    private tokenServ: AuthTokenService,
    private router: Router) { }
	
  logout() {
    this.tokenServ.setToken(null);
    this.router.navigate(['/']);
  }

}