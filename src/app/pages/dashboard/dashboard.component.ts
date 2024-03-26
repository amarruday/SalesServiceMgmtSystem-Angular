import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/LoginServices/login.service';
import * as moment from 'moment';
import Swal from 'sweetalert2'
import { DashboardService } from 'src/app/services/DashboardServices/dashboard.service';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private systemUser : any;
  
  constructor(
    private loginService : LoginService,
    private dashboardService : DashboardService
  ) { }

  public ticketStats : any = {
    "unassignedCount" : 0,
    "assignedCount" : 0,
    "inProgressCount": 0,
    "completedCount" : 0,
    "cancelledCount" : 0,
    "totalTicketsCount" : 0
  }

  public enquiryStats : any = {
    "unassignedCount" : 0,
    "assignedCount" : 0,
    "prospectCount" : 0,
    "cancelledCount": 0,
    "wonCount" : 0,
    "lostCount" : 0
  }

  public monthName: string;

  public recentThreeTickets: any;
  public recentThreeEnquiries: any;

  ngOnInit(): void {
    this.loginService.getCurrentUser().subscribe(
      (success) => {
        var data : any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          this.systemUser = data.User;
          this.getDashboardDetails();
        }
      },
      (error) => {}
    );

    var  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var d = new Date();
    this.monthName = months[d.getMonth()]; // "July" (or current month)
  }

  public getDashboardDetails() {
    if(this.systemUser != null) {
      console.log(this.systemUser);
      var roleName = this.systemUser.roleName;
      if(roleName != null && roleName === "ADMIN") {
        this.dashboardService.getDashboardDetails().subscribe(
          (success) => {
            var data : any;
            data = success;
            if(data.responseStatus === "SUCCESS") {

              //TicketStats
              if(data.ticketStatistics.Unassigned != null && data.ticketStatistics.Unassigned != undefined) {
                this.ticketStats.unassignedCount = data.ticketStatistics.Unassigned;
              }

              if(data.ticketStatistics.Assigned != null && data.ticketStatistics.Assigned != undefined) {
                this.ticketStats.assignedCount = data.ticketStatistics.Assigned;
              }

              if(data.ticketStatistics.InProgress != null && data.ticketStatistics.InProgress != undefined) {
                this.ticketStats.inProgressCount = data.ticketStatistics.InProgress;
              }

              if(data.ticketStatistics.Cancelled != null && data.ticketStatistics.Cancelled != undefined) {
                this.ticketStats.cancelledCount = data.ticketStatistics.Cancelled;
              }

              if(data.ticketStatistics.Completed != null && data.ticketStatistics.Completed != undefined) {
                this.ticketStats.completedCount = data.ticketStatistics.Completed;
              }

              this.ticketStats.totalTicketsCount = 
              this.ticketStats.unassignedCount + 
              this.ticketStats.assignedCount + 
              this.ticketStats.inProgressCount + 
              this.ticketStats.cancelledCount + this.ticketStats.completedCount;

              //Recent three assigned pending
              this.recentThreeTickets = data.recentThreeTickets;

              //Enquiry Statistics
              if(data.enquiryStatistics.Unassigned != null && data.enquiryStatistics.Unassigned != undefined) {
                this.enquiryStats.unassignedCount = data.enquiryStatistics.Unassigned;
              }

              if(data.enquiryStatistics.Assigned != null && data.enquiryStatistics.Assigned != undefined) {
                this.enquiryStats.assignedCount = data.enquiryStatistics.Assigned;
              }

              if(data.enquiryStatistics.Prospect != null && data.enquiryStatistics.Prospect != undefined) {
                this.enquiryStats.prospectCount = data.enquiryStatistics.Prospect;
              }

              if(data.enquiryStatistics.Cancelled != null && data.enquiryStatistics.Cancelled != undefined) {
                this.enquiryStats.cancelledCount = data.enquiryStatistics.Cancelled;
              }

              if(data.enquiryStatistics.Won != null && data.enquiryStatistics.Won != undefined) {
                this.enquiryStats.wonCount = data.enquiryStatistics.Won;
              }

              if(data.enquiryStatistics.Lost != null && data.enquiryStatistics.Lost != undefined) {
                this.enquiryStats.lostCount = data.enquiryStatistics.Lost;
              }

              this.recentThreeEnquiries = data.recentThreeEnquiries;
              $("#adminDashboard").show();

            } else {
              $("#adminDashboard").hide();
            }
          },
          (error) => {}
        )
        
      }
    }
  }

}
