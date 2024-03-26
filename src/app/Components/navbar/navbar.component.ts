import { Component, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/LoginServices/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public router: Router,
    private loginService: LoginService
  ) { }

  public systemUser: any; 

  ngOnInit(): void {
    this.getCurrentUser();
  }

  public getCurrentUser() {
    this.loginService.getCurrentUser().subscribe(
      (success) => {
        var data : any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          console.log(data.User);
          this.loginService.setUser(data.User);
          this.systemUser = data.User;
        }
      },
      (error) => {}
    )
  }

  public logout() {
    this.loginService.logOut();
  }

  public redirectToDashboard() {
    this.router.navigateByUrl('dashboard/index');
  }

  public redirectToManageTicket() {
    this.router.navigateByUrl('dashboard/ticket/managetickets');
  }

  public redirectToColdVisits() {
    this.router.navigateByUrl('dashboard/enquiry/managecoldvisits');
  }

  public redirectToManageEnquiries() {
    this.router.navigateByUrl('dashboard/enquiry/manageenquiries');
  }

  public redirectToActionTypes() {
    this.router.navigateByUrl('dashboard/MasterData/manageactiontypes');
  }

  public redirectToBrands() {
    this.router.navigateByUrl('dashboard/MasterData/managebrands');
  }

  public redirectToCommonReplies() {
    this.router.navigateByUrl('dashboard/MasterData/managecommonnreplies');
  }

  public redirectToCustomers() {
    this.router.navigateByUrl('dashboard/MasterData/managecustomer');
  }

  public redirectToDeparments() {
    this.router.navigateByUrl('dashboard/MasterData/departments');
  }

  public redirectToEnquirySources() {
    this.router.navigateByUrl('dashboard/MasterData/manageenquirysources');
  }

  public redirectToEnquiryTypes() {
    this.router.navigateByUrl('dashboard/MasterData/enquriryTypes');
  }

  public redirectToEmployees() {
    this.router.navigateByUrl('dashboard/MasterData/manageemployes');
  }

  public redirectToProductCatagories() {
    this.router.navigateByUrl('dashboard/MasterData/productcatagories');
  }

  public redirectToProductTypes() {
    this.router.navigateByUrl('dashboard/MasterData/producttypes');
  }

  public redirectToProducts() {
    this.router.navigateByUrl('dashboard/MasterData/manageproduct');
  }

  public redirectToTicketTypes() {
    this.router.navigateByUrl('dashboard/MasterData/managetickettypes');
  }

  public redirectToReports() {
    this.router.navigateByUrl('dashboard/reports');
  }

}
