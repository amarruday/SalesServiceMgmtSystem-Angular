import { Component, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/LoginServices/login.service';
import Swal from 'sweetalert2'
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  public loginBean: any = {
    username: "",
    password: "",
  }

  public forgotPasswordBean: any = {
    username: ""
  }

  public user: any = {};
  
  public login() 
  {
    this.loginService.checkLogin(this.loginBean).subscribe(
      (success) => {
        var data: any;
        data = success;
        console.log("Login: ", data);
        if(data.responseStatus === 'SUCCESS') {
          this.loginService.loginUser(data.token);
          this.loginService.getCurrentUser().subscribe(
            (success) => {
              var currentData: any;
              currentData = success;
              if(currentData.responseStatus === 'SUCCESS') {
                this.loginService.setUser(currentData.User);
                this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                  this.router.navigate(['dashboard/index'])
                    .then(() => {
                      window.location.reload();
                  });
                });
              } else {
                Swal.fire(
                  'Oops..!',
                  'Something went wrong! Try again.',
                  'error'
                )
              }
              
            },
            (error) => {
              Swal.fire(
                'Oops..!',
                'Something went wrong! Try again.',
                'error'
              )
            }
          )
          
        } else {
          Swal.fire(
            'Wrong!',
            data.message,
            'error'
          )
        }
      },
      (error) => {
        Swal.fire(
          'Oops..!',
          'Something went wrong! Try again.',
          'error'
        )
      }
    )
  }

  public openForgotPasswordModal(){
    $("#forgotPasswordModal").modal("show");
  }

  public forgotPassword() {
    this.loginService.forgotPassword(this.forgotPasswordBean.username).subscribe(
      (success) => {
        var data: any;
        data = success;
        if(data.responseStatus === 'SUCCESS') {
          
          Swal.fire(
            'Information Sent!',
            data.message,
            'success'
          ).then((result) => {
            $("#forgotPasswordModal").modal("hide");
          })

        } else {
          Swal.fire(
            'Invalid!',
            data.message,
            'error'
          )
        }
      },
      (error) => {
        Swal.fire(
          'Oops..!',
          'Something went wrong! Try again.',
          'error'
        )
      }
    )
  }

}
