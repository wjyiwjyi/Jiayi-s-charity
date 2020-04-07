import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

export interface User{
  id: number,
  name: string,
  password: string,
  email: string
}

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }
		
    //register
    saveUser(user: User) {
        const savedUser = {
            name: user.name,
            password: user.password,
            email: user.email
        }
        return this.http.post('http://localhost:3000/users/register', savedUser, {
            responseType: "json"
        });

    }
		
    //login
    getUser(user: User) {
        const loginUser = {
            name: user.name,
            password: user.password
        };
        return this.http.post('http://localhost:3000/users/login', loginUser, {
            observe: 'response' 
        });

    }

    handleError(err: HttpErrorResponse): string {
        if (err.error instanceof Error) {
            return '发生错误，错误信息:' + err.error.message;
        } else {
            console.log(`Backend returned code ${err.status}, body was: ${err.error['msg']}`);
            return err.error['msg'];
        }
    }
}