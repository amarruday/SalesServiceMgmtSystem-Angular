import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./LoginServices/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private loginService: LoginService,
  ) {

  }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //throw new Error("Method not implemented.");
    //add JWT Token
    const token = this.loginService.getToken();
    let authRequest = req;
    if(token != null && token != undefined && token != '') {
      authRequest = authRequest.clone({
        setHeaders:{Authorization: `Bearer ${token}`}
      });
    }
    return next.handle(authRequest);
  }
  
}

export const authInterceptorProvider = [
  {
    provide : HTTP_INTERCEPTORS, useClass : AuthInterceptor, multi: true
  }
];