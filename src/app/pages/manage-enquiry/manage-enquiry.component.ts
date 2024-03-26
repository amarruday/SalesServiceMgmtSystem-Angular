import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnquiryService } from 'src/app/services/EnquiryService/enquiry.service';
import { LoginService } from 'src/app/services/LoginServices/login.service';
import { MasterService } from 'src/app/services/MasterServices/master.service';
import * as moment from 'moment';
import Swal from 'sweetalert2'
declare var $: any;
@Component({
  selector: 'app-manage-enquiry',
  templateUrl: './manage-enquiry.component.html',
  styleUrls: ['./manage-enquiry.component.css']
})
export class ManageEnquiryComponent implements OnInit {

  public totalItems: number;
  page: number = 1;
  public enquiryList : any;

  public enquiryTypeList : any;
  public enquirySourceList : any;
  public customerList: any;
  public addedByList : any;
  public userWiseproductTypeList : any;
  public brandList: any;
  public productList: any;
  public assignToList: any;

  public enquirySearchBean: any = {
    pageNumber: 1,
    pageSize: 10,
    enquiryTypeId : 0,
    enquirySourceId : 0,
    status: "ALL",
    customerId : 0,
    addedBy : 0
  }

  public systemUser: any;

  public addCustomerModal: any = {
    customerName: "",
    customerEmail: "",
    mobileNumber: ""
  };

  public addEnquiryBean: any = {
    customerId: 0,
    customerName: "",
    customerEmail: "",
    mobileNumber: "",
    address: "",

    enquirySourceId: 0,
    enquiryTypeId: 0,

    productList: [],

    addedById: 5, //temp
    isSelfAssigned: true,

    assignedToId: 0,
    remark: ""
  }

  public productBeanArr: any = [];


  //View Enquiry Details Beans
  public enquiryActivityList : any;
  public enquiryDetailsBean : any;
  
  public assignEnquiryBean: any = {
    enquiryId: 0,
    assignToId: 0,
    assignById: 0,
    remark: ""
  }

  public cancelEnquiryBean: any = {
    enquiryId: 0,
    remark: ""
  }

  public convertToProspectEnquiryBean: any = {
    enquiryId: 0,
    remark: ""
  }

  public wonEnquiryBean: any = {
    enquiryId: 0,
    machineSerialNumber: "",
    purchaseDate: "",
    remark: ""
  }

  public lostEnquiryBean: any = {
    enquiryId: 0,
    remark: ""
  }

  public assignToAssignEnqList: any;

  constructor(
    private masterService: MasterService,
    private enquiryService: EnquiryService,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {

    $('#startDate').datepicker({
      format: 'dd M yyyy',
      autoclose: true,
      endDate: new Date()
    })

    $('#endDate').datepicker({
      format: 'dd M yyyy',
      autoclose: true,
      endDate: new Date()
    })

    $('#startDate').datepicker('setDate', '-7d');
    $('#startDate').datepicker('maxDate', 'today');
    $('#endDate').datepicker('setDate', 'today');
    $('#endDate').datepicker('maxDate', 'today');

    this.getCurrentUser();
    this.getEnquiryTypes();
    this.getEnquirySources();
    this.getCustomerList();
    this.getUsers();
    this.searchEnquiryFunction();

    $("#startDateWonEnquiry").datepicker({
      format: 'dd M yyyy',
      endDate: new Date(),
      keyboardNavigation: false,
      forceParse: false,
      calendarWeeks: true,
      autoclose: true
    });

    $('#startDateWonEnquiry').datepicker('setDate', 'today');
  }

  public getCurrentUser() {
    this.loginService.getCurrentUser().subscribe(
      (success) => {
        var data : any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          this.loginService.setUser(data.User);
          this.systemUser = data.User;
        }
      },
      (error) => {}
    )
  }

  public getEnquiryTypes() {
    this.masterService.getEnquiryTypes().subscribe(
      (success) => {
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          this.enquiryTypeList = data.EnquiryTypeList;
        }
      },
      (error) => {console.log(error);}
    )
  }

  public getEnquirySources() {
    this.masterService.getEnquirySources().subscribe(
      (success)=>{
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          this.enquirySourceList = data.EnquirySourcesList;
        }
      },
      (error)=>{
        console.log(error);
      },
    )
  }

  public getCustomerList() {
    this.masterService.getAllCustomers().subscribe(
      (success) => {
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          this.customerList = data.CustomerList;
        }
      },
      (error) => {console.log(error)}
    )
  }

  public getUsers() {
    this.enquiryService.getCRMUsers().subscribe(
      (success) => {
        this.addedByList = success;
        if(this.addedByList.responseStatus === 'SUCCESS') {
          this.addedByList = this.addedByList.UsersList;
        }
      }, (error) => {
        console.log(error);
      }
    )
  }

  public searchEnquiryFunction() {
    var startDate = $("#startDate").val();
    var endDate = $("#endDate").val();
    
    this.enquirySearchBean.startDate = moment(startDate).format("yyyy-MM-DD");
    this.enquirySearchBean.endDate = moment(endDate).format("yyyy-MM-DD");
    this.enquiryService.searchEnquiry(this.enquirySearchBean).subscribe(
      (success) => {
        var data: any;
        data = success;      
        if(data.responseStatus === "SUCCESS") {
          this.enquiryList = data.EnquiryList;
          this.totalItems = data.TotalItems;
          this.page = data.CurrentPage;
        }
      },
      (error) => {console.log(error);}
    )
  }

  public changePage(pageNo: any): void {
    this.enquirySearchBean.pageNumber = pageNo;
    this.enquiryService.searchEnquiry(this.enquirySearchBean).subscribe(
      (success) => {
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          this.enquiryList = data.EnquiryList;
          this.totalItems = data.TotalItems;
          this.page = data.CurrentPage;
        }
      },
      (error) => {console.log(error);}
    )
  }

  public openAddEnquiryPopup() {
    this.getCustomerList();
    this.getEnquirySources();
    this.getEnquiryTypes();
    this.getProductTypes();
    this.getBrands();
    $("#addEnquiryModel").modal('show');
  }

  public openNewCustomerModal() {
    $("#addCustomerModal").modal('show');
  }

  public getBrands() {
    this.masterService.getBrands().subscribe(
      success => {
        var data : any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          this.brandList = data.BrandsList;
        }
      },
      error => {console.log(error);}
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
            this.getCustomerList();
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

  public getProductTypes() {
    var currentUserId = 5;
    this.enquiryService.getProductTypesByAssignedProductCatagory(currentUserId).subscribe(
      (success) => {
        var data: any;
        data = success;

        if(data.responseStatus === "SUCCESS") {
          this.userWiseproductTypeList = data.ProductTypeList;
        }
      },
      (error) => {console.log(error);}
    )
  }

  public getProducts() {
    var brandId = $("#brandAddEnquiry").val();
    var productTypeId = $("#productTypeAddEnquiry").val();
    $("#productBean").hide();
    if(productTypeId > 0 && brandId > 0 ) {
      this.enquiryService.getProductsByBrandIdAndProductTypeId(brandId, productTypeId).subscribe(
        (success) => {
          var data: any;
          data = success;
          if(data.responseStatus === "SUCCESS") {
            this.productList = data.ProductsList;
            $("#productBean").show();
          } else if(data.responseStatus === "FAILURE") {
            Swal.fire(
              'Info!',
              'No Product available for this combination',
              'info'
            ).then(() => {
              $("#productBean").hide();
            });
          }
        },
        (error) => {console.log(error);}
      )
    } else {
      alert("Please select brand and product type.");
      $("#productBean").hide();
    }
  }

  public addProductToTable() {
    var productId = $("#productAddEnquiry").val();
    var productName = $("#productAddEnquiry option:selected").text();
    var quantity = $("#quantityAddEnqiry").val();
    var productRemark = $("#productRemarkAddEnqiry").val();
    var status = true;


    if(productId > 0) {
      
    } else {
      var status = false;
      $("#productAddEnquiry-error").html("Please select product");
      $("#productAddEnquiry-error").show();
    }

    if(quantity != null && quantity > 0) {
      
    } else {
      var status = false;
      $("#quantityAddEnqiry-error").html("Please enter product quantity");
      $("#quantityAddEnqiry-error").show();
    }

    if(status) {
      var productAvailable = false;

      for(var i = 0; i < this.productBeanArr.length; i++) {
        var pid = this.productBeanArr[i].productId;
        if(productId == pid) {
          productAvailable = true;
          break;
        }
      }

      if(productAvailable) {
        Swal.fire(
          'Oops!',
          'This product is already added to list',
          'error'
        ).then(() => {
          productAvailable = false;
        });
      } else {
        let newProductBean = {
          productId: 0,
          productName: "",
          quantity: 0,
          productRemark: ""
        };

        newProductBean.productId = productId;
        newProductBean.productName = productName;
        newProductBean.quantity = quantity;
        newProductBean.productRemark = productRemark;
        this.productBeanArr.push(newProductBean);
      }
      
      $("#productAddEnquiry").val(0);
      $("#quantityAddEnqiry").val("");
      $("#productRemarkAddEnqiry").val("");
      $("#productAddEnquiry-error").html("");
      $("#quantityAddEnqiry-error").html("");
      
    }
  }

  public deleteProductFromTable(index: number) {
    this.productBeanArr.splice(index, 1);
  }

  public selfAssignedCheck() {
    $("#assignedToDiv").hide();
    this.addEnquiryBean.assignedToId = 0;
    var status = $('#selfAssignedCheckBox').is(":checked");
    if(!status) {
      this.enquiryService.getAssigendToList().subscribe(
        (success) => {
          var data : any = {};
          data = success;
          if(data.responseStatus === "SUCCESS") {
            this.assignToList = data.AssignToList;
            $("#assignedToDiv").show();
          } else if(data.responseStatus === "FAILURE") {
            $("#assignedToDiv").hide();
            this.addEnquiryBean.assignedToId = 0;
          }
        },
        (error) => {}
      )
      
    }
  }

  public addEnquiryFunction() {
    this.addEnquiryBean.productList = this.productBeanArr;
    if(this.addEnquiryBean.productList.length > 0) {
      if(this.addEnquiryBean.isSelfAssigned) {
        this.addEnquiryBean.assignedToId = this.systemUser.userId;
      }
      this.enquiryService.addEnquiry(this.addEnquiryBean).subscribe(
        (success) => {
          var data : any;
          data = success;

          if(data.responseStatus === "SUCCESS") {
            Swal.fire(
              'Added!',
              data.message,
              'success'
            ).then(() => {
              new Promise<void>((successFun) => {
                $("#addEnquiryModel").modal('hide');
                this.addEnquiryBean = {
                  customerId: 0,
                  customerName: "",
                  customerEmail: "",
                  mobileNumber: "",
                  address: "",
              
                  enquirySourceId: 0,
                  enquiryTypeId: 0,
              
                  productList: [],
              
                  addedById: 5, //temp
                  isSelfAssigned: true,
              
                  assignedToId: 0,
                  remark: ""
                }
                this.productBeanArr = [];
                successFun();
              }).then(() => {
                this.searchEnquiryFunction();
              });
            });
          } else if(data.responseStatus === "FAILURE") {
            Swal.fire(
              'Oops!',
              data.message,
              'error'
            )
          }
        },
        (error) => {
          Swal.fire(
            'Oops!',
            'Something went wrong! Please try again later.',
            'error'
          )
        }
      )

    } else {
      Swal.fire(
        'Oops!',
        'Please add atleast one product',
        'error'
      )
    }
  }

  public getEnquiryDetails(enquiryId: number){
    this.enquiryService.getEnquiryDetails(enquiryId).subscribe(
      (success) => {
        var data : any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          this.enquiryActivityList = data.EnquiryActivities;
          this.enquiryDetailsBean = data.Enquiry;
          $("#viewEnquiryDetailsModal").modal('show');
        }
      },
      (error) => {
        Swal.fire(
          'Oops!',
          'Something went wrong! Try again later.',
          'error'
        )
      }
    )
  }

  //Assign Enquiry
  public openAssignEnquiryModal(enquiryId: number) {
    this.enquiryService.getCRMUsers().subscribe(
      (success) => {
        var data : any = {};
        data = success;
        if(data.responseStatus === "SUCCESS") {
          this.assignToAssignEnqList = data.UsersList;
          this.assignEnquiryBean.enquiryId = enquiryId;
          $("#assignEnqiryModal").modal("show");
        }
      },
      (error) => {console.log(error)}
    )
  }

  public assignEnquiryFunction() {
    this.enquiryService.assignEnquiry(this.assignEnquiryBean).subscribe(
      (success) => {
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          Swal.fire(
            'Assigned!',
            data.message,
            'success'
          ).then(() => {
            //$("#assignEnqiryModal").modal('hide');
            //$("#viewEnquiryDetailsModal").modal("hide");
            //this.reloadCurrentRoute();
            new Promise<void>((successFun) => {
              $("#assignEnqiryModal").modal('hide');
              successFun();
            }).then(() => {
              this.searchEnquiryFunction();
              this.getEnquiryDetails(data.enquiryId);
            });
          });
        }
      },
      (error) => {},
    )
  }

  //Cancel Enquiry
  public openCancelEnquiryModal(enquiryId: number) {
    this.cancelEnquiryBean.enquiryId = enquiryId;
    $("#cancelEnqiryModal").modal("show");
  }

  public cancelEnquiryFunction() {
    this.enquiryService.cancelEnquiry(this.cancelEnquiryBean).subscribe(
      (success) => {
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          Swal.fire(
            'Cancelled!',
            data.message,
            'success'
          ).then(() => {
            //$("#cancelEnqiryModal").modal('hide');
            //$("#viewEnquiryDetailsModal").modal("hide");
            //this.reloadCurrentRoute();
            new Promise<void>((successFun) => {
              $("#cancelEnqiryModal").modal('hide');
              successFun();
            }).then(() => {
              this.searchEnquiryFunction();
              this.getEnquiryDetails(data.enquiryId);
            });
          });
        }
      },
      (error) => {},
    )
  }

  public openChangeToProspectEnquiryModal(enquiryId: number) {
    this.convertToProspectEnquiryBean.enquiryId = enquiryId;
    $("#convertToProspectEnqiryModal").modal('show');
  }

  public converToProspectFunction() {
    this.enquiryService.convertToProspectEnquiry(this.convertToProspectEnquiryBean).subscribe(
      (success) => {
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          Swal.fire(
            'Converted!',
            data.message,
            'success'
          ).then(() => {
            //$("#convertToProspectEnqiryModal").modal('hide');
            //$("#viewEnquiryDetailsModal").modal("hide");
            //this.reloadCurrentRoute();
            new Promise<void>((successFun) => {
              $("#convertToProspectEnqiryModal").modal('hide');
              successFun();
            }).then(() => {
              this.searchEnquiryFunction();
              this.getEnquiryDetails(data.enquiryId);
            });
          });
        }
      },
      (error) => {},
    )
  }

  public openWonEnquiryModal(enquiryId: number) {
    this.wonEnquiryBean.enquiryId = enquiryId;
    $("#wonEnqiryModal").modal('show');
  }

  public wonEnquryFunction() {
    var startDate = $("#startDateWonEnquiry").val();
    this.wonEnquiryBean.purchaseDate = moment(startDate).format("yyyy-MM-DD");
    this.enquiryService.wonEnquiry(this.wonEnquiryBean).subscribe(
      (success) => {
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          Swal.fire(
            'Won!',
            data.message,
            'success'
          ).then(() => {
            //$("#wonEnqiryModal").modal('hide');
            //$("#viewEnquiryDetailsModal").modal("hide");
            //this.reloadCurrentRoute();
            new Promise<void>((successFun) => {
              $("#wonEnqiryModal").modal('hide');
              successFun();
            }).then(() => {
              this.searchEnquiryFunction();
              this.getEnquiryDetails(data.enquiryId);
            });
          });
        }
      },
      (error) => {},
    )
  }

  public openLostEnquiryModal(enquiryId: number) {
    this.lostEnquiryBean.enquiryId = enquiryId;
    $("#lostEnqiryModal").modal('show');
  }

  public lostEnquiryFunction() {
    this.enquiryService.lostEnquiry(this.lostEnquiryBean).subscribe(
      (success) => {
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          Swal.fire(
            'Lost!',
            data.message,
            'success'
          ).then(() => {
            //$("#lostEnqiryModal").modal('hide');
            //$("#viewEnquiryDetailsModal").modal("hide");
            //this.reloadCurrentRoute();
            new Promise<void>((successFun) => {
              $("#lostEnqiryModal").modal('hide');
              successFun();
            }).then(() => {
              this.searchEnquiryFunction();
              this.getEnquiryDetails(data.enquiryId);
            });
          });
        }
      },
      (error) => {},
    )
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['dashboard/enquiry/manageenquiries']);
    });
  }

}
