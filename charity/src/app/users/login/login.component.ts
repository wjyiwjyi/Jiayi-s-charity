import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { User, UserService } from '../../user.service';
import { AuthTokenService } from '../../authtoken.service';
import { Md5 } from 'ts-md5/dist/md5';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user : User = { id: 0, name: '', password: '', email: '' };
  imgSrc = "../../img/eye-off.png";
  passtype = 'password';
  notPass = false;
  constructor(
    private route: Router,
    private userServ: UserService,
    private tokenServ: AuthTokenService) {}
		
  onSubmit() {
		this.user.password = String(Md5.hashStr(this.user.password));
    this.userServ.getUser(this.user).subscribe(
      (resp) => {
        //this.userServ.setToken(resp.body['token']);
        this.tokenServ.setToken(resp.body['token']);
        this.route.navigate(['/admin']);
        console.log(resp.body);
        alert('登录成功！');
      },
      (err)=>
      alert(this.userServ.handleError(err)),
      () => console.log('The Post observable is now completed. ')
    )
  }

}