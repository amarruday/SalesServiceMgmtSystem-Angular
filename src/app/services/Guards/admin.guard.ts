import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../LoginServices/login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {


  constructor (
    private loginService: LoginService,
    private router: Router
  ) {

  }

  public user: any;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): 
    Observable<boolean | UrlTree> 
    | Promise<boolean | UrlTree> 
    | boolean | UrlTree {
    
    this.user = this.loginService.getCurrentUserBean();
    console.log("Guard User: ", this.user);
    //if(this.loginService.isLoggedIn() && this.loginService.getUserRole() === "ADMIN") {
      //return true;
    //}

    this.router.navigate(['login']);
    return false;
  }
  
}
