import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

import { User, UserService } from '../../user.service';
import { passwordEquals } from '../password-equals.directive';
import { AuthTokenService } from '../../authtoken.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @ViewChild('pass') pass: ElementRef;
  user : User = { id: 0, name: '', password: '', email: '' };
  registForm: FormGroup;
  passwordValue: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userSer: UserService,
    private tokenServ: AuthTokenService) {
    this.createForm();
  }
  checkValid() {
    //对repassword设置验证规则
    this.repassword.setValidators([Validators.required, passwordEquals(this.pass.nativeElement.value)]);
  }

  //利用FromBulider创建表单
  createForm() {
    this.registForm = this.fb.group({
      'name': [this.user.name, [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(/^[a-z]|[A-Z]|[0-9]$/)]],
      'password': [this.user.password,
      [Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^[A-Z][a-zA-Z0-9_-]+$/)]],
      'email': [this.user.email,
      Validators.pattern(/^([a-zA-Z0-9_\.\-]+)@([a-zA-Z0-9_\.\-]+)\.([a-zA-Z]{2,4})$/)],
      'repassword': [this.user.password, [
        Validators.required]]
    });
  }

  //进行验证必须写get,通过它所属的控件组（FormGroup）的get方法来访问表单控件
  get name() { return this.registForm.get('name'); }
  get password() { return this.registForm.get('password'); }
  get email() { return this.registForm.get('email'); }
  get repassword() { return this.registForm.get('repassword'); }
	
  //重置from
  revert() {
    this.reset();
  }
  //提交数据
  onSubmit() {
    this.user = this.prepareSaveUser();
		this.user.password = String(Md5.hashStr(this.user.password));
    this.userSer.saveUser(this.user).subscribe(
      (value) => {
        console.log(value);
        //this.userSer.setToken(value['token']);
        this.tokenServ.setToken(value['token']);
        this.router.navigate(['/admin']);
        alert('注册成功！');
      },
      (err) =>
        alert(this.userSer.handleError(err)),
      () => {
        console.log('The post observable is now completed.');
      }
    );
    // alert(`${this.user.id} :  ${this.user.name} : ${this.user.email}`);

  }
  //保存注册用户数据
  prepareSaveUser(): User {
    const formModel = this.registForm.value;
    const saveUser: User = {
      id: this.user.id,
      name: formModel.name as string,
      password: formModel.password as string,
      email: formModel.email
    };
    return saveUser;
  }
  //刷新Form
  reset() {
    this.user =  { id: 0, name: '', password: '', email: '' };
    this.registForm.reset({
      name: this.user.name,               //the FormControl called 'name'
      password: this.user.password,
      email: this.user.email
    })
  }

}