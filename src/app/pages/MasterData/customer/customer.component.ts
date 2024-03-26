import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/services/MasterServices/master.service';
import Swal from 'sweetalert2'

declare var $: any;

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  public totalItems: number;
  page: number = 1;

  public customerList: any;
  public addCustomerModal: any = {
    customerName: "",
    customerEmail: "",
    mobileNumber: ""
  };

  public getCustomer : any = {
    pageNumber: 1,
    pageSize: 10
  }

  public editCustomerModal: any = {
    customerId:0,
    customerName: "",
    customerEmail: "",
    mobileNumber: "",
    status : "Active"
  };

  public cusomerModal: any;

  constructor(
    private masterService: MasterService
  ) { }

  ngOnInit(): void {
    this.loadAllCustomerList();
  }

  public loadAllCustomerList() {
    this.masterService.getAllCustomersPaginated(this.getCustomer).subscribe(
      (success) => {
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          this.customerList = data.CustomerList;
          this.totalItems = data.TotalItems;
          this.page = data.CurrentPage;
        }
      },
      (error) => {console.log(error);}
    )
  }

  public addCustomerFunction() {
    this.masterService.addCustomer(this.addCustomerModal).subscribe(
      (success) => {
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          Swal.fire(
            'Added!',
            data.message,
            'success'
          ).then(() => {
            $("#addCustomerModal").modal('hide');
            this.loadAllCustomerList();
          });
        } else if(data.responseStatus === "FAILURE" && data.errorCode != null) {
          Swal.fire(
            'Failed!',
            data.message,
            'error'
          )
        }
      },
      (error) => {
        Swal.fire(
          'Failed!',
          'Something went wrong! Contact Administrator',
          'error'
        )
      }
    )
  }

  public getCustomerByCustomerId(customerId: number) {
    this.masterService.getCustomerByCustomerId(customerId).subscribe(
      (success) => {
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          this.cusomerModal = data.Customer;
        }
      },
      (error) => {}
    )
  }

  public viewCustomerDetailsOnEditModal(customerId: number) {
    this.masterService.getCustomerByCustomerId(customerId).subscribe(
      (success) => {
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          data = data.Customer;
          this.editCustomerModal.customerId = data.customerId;
          this.editCustomerModal.customerName = data.customerName;
          this.editCustomerModal.customerEmail = data.customerEmail;
          this.editCustomerModal.mobileNumber = data.mobileNumber;
          this.editCustomerModal.birthDate = data.birthDate;
          this.editCustomerModal.address = data.address;
          this.editCustomerModal.customerType = data.customerType;
          this.editCustomerModal.status = data.status;
          $("#editCustomerModal").modal('show');
        }
      },
      (error) => {}
    )
  }

  public editCustomerFunction() {
    this.masterService.updateCustomer(this.editCustomerModal).subscribe(
      success => {
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          Swal.fire(
            'Updated!',
            data.message,
            'success'
          ).then(() => {
            $("#editCustomerModal").modal('hide');
            this.loadAllCustomerList();
          });
        } else if(data.responseStatus === "FAILURE" && data.errorCode != null) {
          Swal.fire(
            'Failed!',
            data.message,
            'error'
          )
        }
      },
      error => {console.log(error);}
      )
  }

  public changePage(pageNo: any): void {
    this.getCustomer.pageNumber = pageNo;
    
    this.masterService.getAllCustomersPaginated(this.getCustomer).subscribe(
      (success) => {
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          this.customerList = data.CustomerList;
          this.totalItems = data.TotalItems;
          this.page = data.CurrentPage;
        }
      },
      (error) => {console.log(error);}
    )
  }
}
