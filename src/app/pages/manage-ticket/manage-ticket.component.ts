import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import * as moment from 'moment';
import { TicketService } from 'src/app/services/TicketServices/ticket.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-manage-ticket',
  templateUrl: './manage-ticket.component.html',
  styleUrls: ['./manage-ticket.component.css']
})
export class ManageTicketComponent implements OnInit {

  public totalItems: number;
  page: number = 1;
  public ticketList : any;

  public ticketSearchBean: any = {
    pageNumber: 1,
    pageSize: 10,
    ticketTypeId: 0,
    priority: "All",
    status: "All",
    customerId: 0,
    addedBy: 0,    
  };

  public searchTicketTypeList: any;
  public customerList: any;
  public addedByList: any;

  public ticketDetailsBean: any;
  public ticketActivityList: any;

  public addTicketBean: any = {
    customerId: 0,
    ticketTypeId: 0,
    customerProductLinkId:0,
    priority: "Low",
    productId:0,
    warrantyDate: "",
    machineSerialNumber: "",
    shortDescription: "",
    longDescription: "",
    assignToId:0
  };

  public activeCustomerList: any;
  public activeTicketTypeList: any;
  public customerProductLinkList: any;
  public assignToList: any;
  
  public assignTicketBean: any = {
    ticketId: 0,
    status: 'Assigned',
    assignToId: 0,
    remark: ""
  };

  public changeToInProgress: any = {
    ticketId: 0,
    status: 'InProgress',
    remark: ""
  };

  public completeTicketBean: any = {
    ticketId: 0,
    status: 'Completed',
    remark: ""
  }

  public cancelTicketBean: any = {
    ticketId: 0,
    status: 'Cancelled',
    remark: ""
  }


  constructor(
    private ticketService: TicketService,
    private router: Router
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

    this.getAllTicketTypes();
    this.getCustomerList();
    this.getAddedbyList();
    this.searchTicketFunction();
  }

  public getAllTicketTypes() {
    this.ticketService.getAllTicketTypes().subscribe(
      (success) => {
        this.searchTicketTypeList = success;
        if(this.searchTicketTypeList.responseStatus === 'SUCCESS') {
          this.searchTicketTypeList = this.searchTicketTypeList.TicketTypeList;
        }
      }, (error) => {
        console.log(error);
      }
    )
  }

  public getCustomerList() {
    this.ticketService.getActiveCustomers().subscribe(
      (success) => {
        this.customerList = success;
        if(this.customerList.responseStatus === 'SUCCESS') {
          this.customerList = this.customerList.CustomerList;
        }
      }, (error) => {
        console.log(error);
      }
    )
  }

  public getAddedbyList() {
    this.ticketService.getSRMUsers().subscribe(
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

  public searchTicketFunction() {
    var startDate = $("#startDate").val();
    var endDate = $("#endDate").val();
    var data: any = {};

    this.ticketSearchBean.startDate = moment(startDate).format("yyyy-MM-DD");
    this.ticketSearchBean.endDate = moment(endDate).format("yyyy-MM-DD");
    this.ticketService.searchTickets(this.ticketSearchBean).subscribe(
      (success) => {
        var data: any;
        data = success;      
        if(data.responseStatus === "SUCCESS") {
          this.ticketList = data.TicketList;
          this.totalItems = data.TotalItems;
          this.page = data.CurrentPage;
        }
      },
      (error) => {console.log(error);}
    )
  }

  public changePage(pageNo: any): void {
    this.ticketSearchBean.pageNumber = pageNo;
    this.ticketService.searchTickets(this.ticketSearchBean).subscribe(
      (success) => {
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          this.ticketList = data.TicketList;
          this.totalItems = data.TotalItems;
          this.page = data.CurrentPage;
        }
      },
      (error) => {console.log(error);}
    )
  }

  public openAddTicketPopup() {
    this.addTicketBean = {
      customerId: 0,
      ticketTypeId: 0,
      customerProductLinkId:0,
      priority: "Low",
      productId:0,
      warrantyDate: "",
      machineSerialNumber: "",
      shortDescription: "",
      longDescription: "",
      assignToId:0
    };
    this.getActiveCustomerList();
    this.getActiveTicketTypes();
    this.getAssignToListAddTicket();
    $("#addTicketModal").modal('show');
  }

  public getActiveCustomerList() {
    this.ticketService.getActiveCustomers().subscribe(
      (success) => {
        this.activeCustomerList = success;
        if(this.activeCustomerList.responseStatus === 'SUCCESS') {
          this.activeCustomerList = this.activeCustomerList.CustomerList;
        }
      }, (error) => {
        console.log(error);
      }
    )
  }

  public getActiveTicketTypes() {
    this.ticketService.getActiveTicketTypes().subscribe(
      (success) => {
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          this.activeTicketTypeList = data.TicketTypeList;
        }
      },
      (error) => {console.log(error);}
    )
  }

  public getProductListByCustomer() {
    var customerId = $("#customerIdAddTicket").val();
    if(customerId > 0) {
      this.ticketService.getProductListByCustomer(customerId).subscribe(
        (success) => {
          var data: any;
          data = success;
          if(data.responseStatus === "SUCCESS") {
            this.customerProductLinkList = data.CustomerProductLinkList;
            this.addTicketBean.customerProductLinkId = 0;
            this.addTicketBean.productId = 0;
            $("#purchaseDateAddTicket").val("");
            $("#warrantyTillAddTicket").val("");
            $("#machineSerialNumberAddTicket").val("");
            this.addTicketBean.warrantyDate = "";
            this.addTicketBean.machineSerialNumber = "";
            $("#productDates").hide();
          } else {
            this.customerProductLinkList = null;
            this.addTicketBean.customerProductLinkId = 0;
            this.addTicketBean.productId = 0;
            $("#purchaseDateAddTicket").val("");
            $("#warrantyTillAddTicket").val("");
            $("#machineSerialNumberAddTicket").val("");
            this.addTicketBean.warrantyDate = "";
            this.addTicketBean.machineSerialNumber = "";
            $("#productDates").hide();
          }
        },
        (error) => {console.log(error);}
      )
    }  
  }

  public getTicketDetails(ticketId: any) {
    this.ticketService.getTicketDetails(ticketId).subscribe(
      (success) => {
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          this.ticketDetailsBean = data.Ticket;
          this.ticketActivityList = data.TicketActivities;
          $("#viewTicketDetailsModal").modal("show");
        }
      },
      (error) => {console.log(error);}
    )
  }

  public selectProduct(event: any) {
    for(var i = 0; i < this.customerProductLinkList.length; i++) {
      if(this.customerProductLinkList[i].customerProductLinkId == event) {
        this.addTicketBean.productId = this.customerProductLinkList[i].product.productId;
        $("#purchaseDateAddTicket").val(moment(this.customerProductLinkList[i].dateOfPurchase).format("DD MMM yyyy"));
        $("#warrantyTillAddTicket").val(moment(this.customerProductLinkList[i].warrantyTill).format("DD MMM yyyy"));
        $("#machineSerialNumberAddTicket").val(this.customerProductLinkList[i].machineSerialNumber);
        this.addTicketBean.warrantyDate = moment(this.customerProductLinkList[i].warrantyTill).format("DD MMM yyyy");
        this.addTicketBean.machineSerialNumber = this.customerProductLinkList[i].machineSerialNumber;
        $("#productDates").show();
      }
    }
  }

  public getAssignToListAddTicket() {
    this.ticketService.getSRMUsers().subscribe(
      (success) => {
        this.assignToList = success;
        if(this.assignToList.responseStatus === 'SUCCESS') {
          this.assignToList = this.assignToList.UsersList;
        }
      }, (error) => {
        console.log(error);
      }
    )
  }

  public addNewTicketFunction() {
    this.addTicketBean.warrantyDate = moment(this.addTicketBean.warrantyDate).format("yyyy-MM-DD");
    this.ticketService.addNewTicket(this.addTicketBean).subscribe(
      (success) => {
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          Swal.fire(
            'Added!',
            data.message,
            'success'
          ).then(() => {
            new Promise<void>((successFun) => {
              $("#addTicketModal").modal('hide');
              this.addTicketBean = {
                customerId: 0,
                ticketTypeId: 0,
                customerProductLinkId:0,
                priority: "Low",
                productId:0,
                warrantyDate: "",
                machineSerialNumber: "",
                shortDescription: "",
                longDescription: "",
                assignToId:0
              };
              successFun();
            }).then(() => {
              this.searchTicketFunction();
            });
          });
        } else {
          Swal.fire(
            'Failed!',
            'Failed to add ticket! Try Again',
            'error'
          )
        }
      }, (error) => {
        console.log(error);
        Swal.fire(
          'Failed!',
          'Something went wrong! Try again',
          'error'
        )
      }
    )
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['dashboard/ticket/managetickets']);
    });
  }

  public openAssignTicketModal(ticketId: any) {
    this.assignTicketBean.ticketId = ticketId;
    this.getAssignToListAddTicket();
    $("#assignTicketModal").modal('show');
  }

  public openChangeToInProgressModal(ticketId: any) {
    this.changeToInProgress.ticketId = ticketId;
    $("#changeToInPrgressTicketModal").modal('show');
  }

  public openCompleteTicketModal(ticketId: any) {
    this.completeTicketBean.ticketId = ticketId;
    $("#completeTicketModal").modal('show');
  }

  public openCancelTicketModal(ticketId: any) {
    this.cancelTicketBean.ticketId = ticketId;
    $("#cancelTicketModal").modal('show');
  }

  public changeTicketStatusFunction(ticketStatusChangeBean: any, modalName: string) {
    this.ticketService.changeTicketStatus(ticketStatusChangeBean).subscribe(
      (success) => {
        var data : any;
        data = success;
        console.log(success);
        if(data.responseStatus === "SUCCESS") {
          Swal.fire(
            'Updated!',
            data.message,
            'success'
          ).then(() => {
            new Promise<void>((successFun) => {
              $('#' + modalName).modal('hide');
              successFun();
            }).then(() => {
              this.searchTicketFunction();
              this.getTicketDetails(data.ticketId);
            });
          });
        }
      },
      (erro) => {
        Swal.fire(
          'Failed!',
          'Something went wrong! Try again',
          'error'
        )
      },
    )

  }
}
