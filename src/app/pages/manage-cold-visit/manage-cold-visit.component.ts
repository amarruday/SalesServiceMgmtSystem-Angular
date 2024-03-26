import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Visit } from 'src/app/modals/Visit';
import { VisitService } from 'src/app/services/VisitService/visit.service';
import Swal from 'sweetalert2'
declare var $: any;

@Component({
  selector: 'app-manage-cold-visit',
  templateUrl: './manage-cold-visit.component.html',
  styleUrls: ['./manage-cold-visit.component.css']
})
export class ManageColdVisitComponent implements OnInit {

  visit: Visit;
  actionTypsList: any;
  customerList: any;
  addedByList: any;
  visitList: any;
  visitDetails: any;
  commonReplyList: any;

  SearchVisitBean : any={
    actionTypeId: 0,
    userId: 0,
    customerId: 0
  };

  constructor(
    private visitService: VisitService,
  ) {
    this.visit = new Visit();
  }

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
    $('#endDate').datepicker('setDate', 'today');

    $('.select2').select2();

    this.visitService.getActionTypes().subscribe(
      (success) => {
        this.actionTypsList = success;
        if(this.actionTypsList.responseStatus === 'SUCCESS') {
          this.actionTypsList = this.actionTypsList.ActionTypeList;
        }
      }, (error) => {
        console.log(error);
      }
    )

    this.visitService.getCustomers().subscribe(
      (success) => {
        this.customerList = success;
        if(this.customerList.responseStatus === 'SUCCESS') {
          this.customerList = this.customerList.CustomerList;
        }
      }, (error) => {
        console.log(error);
      }
    )

    this.visitService.getAddedBy().subscribe(
      (success) => {
        this.addedByList = success;
        if(this.addedByList.responseStatus === 'SUCCESS') {
          this.addedByList = this.addedByList.UsersList;
        }
      }, (error) => {
        console.log(error);
      }
    )

    this.loadInitialVisits();
  }

  public addVisit() {
    
    this.visitService.addVisit(this.visit).subscribe(
      (success) => {
        var data: any;
        data = success;
        if(data.responseStatus === 'SUCCESS') {
          Swal.fire(
            'Added!',
            data.message,
            'success'
          ).then(() => {
            $("#addVisitModal").modal('hide');
            this.loadInitialVisits();
          });
        }
      },
      (error) => {console.log(error);}
    )
  }

  public loadInitialVisits() {
    var startDate = $("#startDate").val();
    var endDate = $("#endDate").val();
    var data: any = {};

    this.SearchVisitBean.startDate = moment(startDate).format("yyyy-MM-DD");
    this.SearchVisitBean.endDate = moment(endDate).format("yyyy-MM-DD");
    
    this.visitService.searchVisits(this.SearchVisitBean).subscribe(
      (success) => {
        data = success;
        if(data.responseStatus === 'SUCCESS') {
          this.visitList = null;
          if(data.VisitList != null) {
            this.visitList = data.VisitList;
          }
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

  searchVisits() {
    var startDate = $("#startDate").val();
    var endDate = $("#endDate").val();
    var data: any = {};

    this.SearchVisitBean.startDate = moment(startDate).format("yyyy-MM-DD");
    this.SearchVisitBean.endDate = moment(endDate).format("yyyy-MM-DD");
    this.visitService.searchVisits(this.SearchVisitBean).subscribe(
      (success) => {
        data = success;
        if(data.responseStatus === 'SUCCESS') {          
          this.visitList = null;
          if(data.VisitList != null) {
            this.visitList = data.VisitList;
          }
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

  viewVisitDetails(visitId: number) {
    this.visitService.getVisitDetailsById(visitId).subscribe(
      (success) => {
        this.visitDetails = success;
        if(this.visitDetails.responseStatus === "SUCCESS") {
          this.visitDetails = this.visitDetails.Visit;
          if(this.visitDetails != null) {
            $('#visitDetailsModal').modal('show');
          }
        }
      },
      (error) => {
        console.log("Error: " + error);
      }
    )
  }

  getCustomerDetails(customerId: any) {
    if(this.customerList.length > 0){
      for(var i = 0; i < this.customerList.length; i++) {
        if(this.customerList[i].customerId == customerId) {
          $("#customerEmailAddVisit").val("");
          $("#mobileNumberAddVisit").val("");
          $("#customerAddressAddVisit").val("");
          $("#customerEmailAddVisit").val(this.customerList[i].customerEmail);
          $("#mobileNumberAddVisit").val(this.customerList[i].mobileNumber);
          $("#customerAddressAddVisit").val(this.customerList[i].address);
        }
      }
    }
  }

  public getCommonReplies() {
    this.visitService.getCommonReplies().subscribe(
      (success) => {
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          this.commonReplyList = data.CommonReplyList;
          console.log(this.commonReplyList);
          $("#commonReplyModal").modal('show');
        }
      }, 
      (error) => {
        console.log(error);
      }
    )
  }

  public saveCommonReplies() {
    var n: any;
    var t : any;
		n = "";
		$('[name="CommonReplyId"]:checked').each(function(_t: any, i: { value: string; }) {
			n += i.value + ", "
		});
		$(".CommonReplyTextBox").val() != "" ? (t = $(".CommonReplyTextBox").val(), t += ", " + n.trimEnd().slice(0, -1), $(".CommonReplyTextBox").val(t)) : $(".CommonReplyTextBox").val(n.trimEnd().slice(0, -1));
    this.visit.description = $(".CommonReplyTextBox").val();
		$("#commonReplyModal").modal("hide");
  }

}
