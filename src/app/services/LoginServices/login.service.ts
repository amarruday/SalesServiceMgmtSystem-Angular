import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import baseURL from '../helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { 

  }

  public checkLogin(loginBean: any) {
    return this.http.post(`${baseURL}/auth/generate-token`, loginBean);
  }

  public forgotPassword(username : string) {
    return this.http.get(`${baseURL}/password/forgotpassword/`+ username);
  }

  public loginUser(token: any) {
    sessionStorage.setItem("token", token);
    return true;
  }

  public getCurrentUser() {
    return this.http.get(`${baseURL}/user/currentloggedinuser`);
  }

  public isLoggedIn() {
    let tokenStr = sessionStorage.getItem("token");
    if(tokenStr != undefined && tokenStr != null && tokenStr != '') {
      return true;
    } else {
      return false;
    }
  }

  public logOut() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("User");
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/'])
        .then(() => {
          window.location.reload();
      });
    });
  }

  public getToken() {
    return sessionStorage.getItem("token");
  }

  public setUser(user: any) {
    sessionStorage.setItem("User", user);
  }

  public getUser() {
    let user = sessionStorage.getItem("User");
    if(user != null) {
      return user;
    } else {return null;}
  }

  public getCurrentUserBean() {
    this.getCurrentUser().subscribe(
      (success) => {
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          return data.User;
        } else {
          return null;
        }
      },
      (error) => {}
    )
  }
}
