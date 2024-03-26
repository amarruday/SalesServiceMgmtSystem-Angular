import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from 'src/app/services/ReportService/report.service';
import Swal from 'sweetalert2'
import * as moment from 'moment';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ChartComponent
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

declare var $: any;
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;

  public monthName: string;
  
  constructor(
    private reportService: ReportService
  ) { 
    this.chartOptions = {
      chart: {
        width: '100%',
        type: "pie"
      },  
    };
  }
  
  public ticketTypeWiseTicketReport = new Map();
  public productWiseTicketReport = new Map();
  public employeeWiseTicketReport = new Map();
  public productWiseTicketTypeCountReport = new Map();

  public enquirySourceEfficacyWiseEnquiryReport = new Map();
  public productWiseEnquiryReport = new Map();
  public employeeWiseEnquiryReport = new Map();

  public firstDay : any ;
  public searchBean : any = {};

  ngOnInit(): void {
    this.firstDay = (new Date().getMonth() + 1) + "/" + new Date().getFullYear();
    this.firstDay = "01/" + this.firstDay;

    var  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var d = new Date();
    this.monthName = months[d.getMonth()]; // "July" (or current month)
  }

  public openTicketTypeWiseTicketReportModal() {
    $('#s1').datepicker({
      format: 'dd M yyyy',
      autoclose: true,
      endDate: new Date()
    })

    $('#e1').datepicker({
      format: 'dd M yyyy',
      autoclose: true,
      endDate: new Date()
    })

    $('#s1').datepicker('setDate', this.firstDay);
    $('#s1').datepicker('maxDate', 'today');
    $('#e1').datepicker('setDate', 'today');
    $('#e1').datepicker('maxDate', 'today');

    this.getTicketTypeWiseTicketReport();
    $("#ticketTypeWiseTicketReportModal").modal("show");
  }

  public getTicketTypeWiseTicketReport() {
    
    var startDate = $("#s1").val();
    var endDate = $("#e1").val();

    this.searchBean.startDate = moment(startDate).format("yyyy-MM-DD");
    this.searchBean.endDate = moment(endDate).format("yyyy-MM-DD");
    console.log(this.searchBean);
    this.reportService.getTicketTypeWiseTicketReport(this.searchBean).subscribe(
      (success) => {
        var data : any;
        data = success;
        this.ticketTypeWiseTicketReport = data.ticketTypeWiseTicketList;
      },
      (error) => {},
    )
  }

  public openProductWiseTicketTypeCountReportModal() {
    $('#s7').datepicker({
      format: 'dd M yyyy',
      autoclose: true,
      endDate: new Date()
    })

    $('#e7').datepicker({
      format: 'dd M yyyy',
      autoclose: true,
      endDate: new Date()
    })

    $('#s7').datepicker('setDate', this.firstDay);
    $('#s7').datepicker('maxDate', 'today');
    $('#e7').datepicker('setDate', 'today');
    $('#e7').datepicker('maxDate', 'today');

    this.getProductWiseTicketTypeCountReport();
    $("#productWiseTicketTypeCountReportModal").modal("show");
  }

  public getProductWiseTicketTypeCountReport() {
    var startDate = $("#s7").val();
    var endDate = $("#e7").val();

    this.searchBean.startDate = moment(startDate).format("yyyy-MM-DD");
    this.searchBean.endDate = moment(endDate).format("yyyy-MM-DD");
    
    this.reportService.getProductwiseTicketTypCountReport(this.searchBean).subscribe(
      (success) => {
        var data : any;
        data = success;
        this.productWiseTicketTypeCountReport = data.productWiseTicketTypeCountList;
        console.log(this.productWiseTicketTypeCountReport);
      },
      (error) => {},
    )
  }

  public openProductWiseTicketReportModal() {
    $('#s2').datepicker({
      format: 'dd M yyyy',
      autoclose: true,
      endDate: new Date()
    })

    $('#e2').datepicker({
      format: 'dd M yyyy',
      autoclose: true,
      endDate: new Date()
    })

    $('#s2').datepicker('setDate', this.firstDay);
    $('#s2').datepicker('maxDate', 'today');
    $('#e2').datepicker('setDate', 'today');
    $('#e2').datepicker('maxDate', 'today');
    this.getProductwiseTicketReport();
    $("#productWiseTicketReportModal").modal("show");
  }

  public getProductwiseTicketReport() {

    var startDate = $("#s2").val();
    var endDate = $("#e2").val();

    this.searchBean.startDate = moment(startDate).format("yyyy-MM-DD");
    this.searchBean.endDate = moment(endDate).format("yyyy-MM-DD");
    
    this.reportService.getProductwiseTicketReport(this.searchBean).subscribe(
      (success) => {
        var data : any;
        data = success;
        this.productWiseTicketReport = data.productWiseTicketList;
      },
      (error) => {},
    )
  }


  public openEmployeeWiseTicketReportModal() {
    $('#s3').datepicker({
      format: 'dd M yyyy',
      autoclose: true,
      endDate: new Date()
    })

    $('#e3').datepicker({
      format: 'dd M yyyy',
      autoclose: true,
      endDate: new Date()
    })

    $('#s3').datepicker('setDate', this.firstDay);
    $('#e3').datepicker('setDate', 'today');
    this.getEmployeewiseTicketReport();
    $("#employeeWiseTicketReportModal").modal("show");
  }

  public getEmployeewiseTicketReport() {
    var startDate = $("#s3").val();
    var endDate = $("#e3").val();

    this.searchBean.startDate = moment(startDate).format("yyyy-MM-DD");
    this.searchBean.endDate = moment(endDate).format("yyyy-MM-DD");

    this.reportService.getEmployeewiseTicketReport(this.searchBean).subscribe(
      (success) => {
        var data : any;
        data = success;
        this.employeeWiseTicketReport = data.employeeWiseTicketList;
      },
      (error) => {},
    )
  }

  public openEnquirySourceEfficacyWiseEnquiryReportModal() {
    $('#s4').datepicker({
      format: 'dd M yyyy',
      autoclose: true,
      endDate: new Date()
    })

    $('#e4').datepicker({
      format: 'dd M yyyy',
      autoclose: true,
      endDate: new Date()
    })

    $('#s4').datepicker('setDate', this.firstDay);
    $('#e4').datepicker('setDate', 'today');
    $("#enquirySourceEfficacyEnquiryReportModal").modal("show");
    this.getEnquirySourceEfficacyWiseEnquiryReport();
  }

  //Enquiry
  public getEnquirySourceEfficacyWiseEnquiryReport() {
    var startDate = $("#s4").val();
    var endDate = $("#e4").val();

    this.searchBean.startDate = moment(startDate).format("yyyy-MM-DD");
    this.searchBean.endDate = moment(endDate).format("yyyy-MM-DD");
    
    this.reportService.getEnquirySourceEfficacyWiseEnquiryReport(this.searchBean).subscribe(
      (success) => {
        var data : any;
        data = success;
        this.enquirySourceEfficacyWiseEnquiryReport = data.enquirySourceEfficacyWiseEnquiryList;
        console.log(this.enquirySourceEfficacyWiseEnquiryReport);
      },
      (error) => {},
    )
  }

  public openProductWiseEnquiryReportModal() {
    $('#s5').datepicker({
      format: 'dd M yyyy',
      autoclose: true,
      endDate: new Date()
    })

    $('#e5').datepicker({
      format: 'dd M yyyy',
      autoclose: true,
      endDate: new Date()
    })

    $('#s5').datepicker('setDate', this.firstDay);
    $('#e5').datepicker('setDate', 'today');
    this.getProductWiseEnquiryReport();
    $("#productWiseEnquiryReportModal").modal("show");
  }

  public getProductWiseEnquiryReport() {
    var startDate = $("#s5").val();
    var endDate = $("#e5").val();

    this.searchBean.startDate = moment(startDate).format("yyyy-MM-DD");
    this.searchBean.endDate = moment(endDate).format("yyyy-MM-DD");

    this.reportService.getProductWiseEnquiryReport(this.searchBean).subscribe(
      (success) => {
        var data : any;
        data = success;
        this.productWiseEnquiryReport = data.productWiseEnquiryList;
      },
      (error) => {},
    )
  }

  public openEmployeeWiseEnquiryReportModal() {
    $('#s6').datepicker({
      format: 'dd M yyyy',
      autoclose: true,
      endDate: new Date()
    })

    $('#e6').datepicker({
      format: 'dd M yyyy',
      autoclose: true,
      endDate: new Date()
    })

    $('#s6').datepicker('setDate', this.firstDay);
    $('#e6').datepicker('setDate', 'today');
    this.getEmployeeWiseEnquiryReport();
    $("#employeeWiseEnquiryReportModal").modal("show");
  }


  public getEmployeeWiseEnquiryReport() {
    var startDate = $("#s6").val();
    var endDate = $("#e6").val();

    this.searchBean.startDate = moment(startDate).format("yyyy-MM-DD");
    this.searchBean.endDate = moment(endDate).format("yyyy-MM-DD");

    this.reportService.getEmployeeWiseEnquiryReport(this.searchBean).subscribe(
      (success) => {
        var data : any;
        data = success;
        this.employeeWiseEnquiryReport = data.employeeWiseEnquiryList;
      },
      (error) => {},
    )
  }

  //Chart Reports
  public openProductTypeWiseEnquiryReportModal() {
    this.getProductTypeWiseEnquiryReport();
    $("#productTypeWiseEnquiryReportModal").modal("show");
  }

  public getProductTypeWiseEnquiryReport(){

    this.reportService.getProductTypeWiseEnquiryReport().subscribe(
      (success) => {
        var data : any;
        data = success;
        
        this.chartOptions = {};
        var series = data.totalEnq;
        var labels = data.productTypes;
        
        var seriesLenth = data.totalEnq.length;
       
        if (seriesLenth > 0) {
          this.chartOptions = {
            series: series,
            chart: {
              width: '700',
              type: "pie"
            },
            labels: labels,
          };
          $(".myApexChart").show();
        } else {
          $(".myApexChart").hide();
          Swal.fire(
            'Info!',
            'No records found!',
            'info'
          ).then(() => {
            $("#productTypeWiseEnquiryReportModal").modal("hide");
          })
        }

      },
      (error) => {},
    )

    
  }

  public openProductTypeWiseTicketReportModal() {
    this.getProductTypeWiseTicketReport();
    $("#productTypeWiseTicketReportModal").modal("show");
  }

  public getProductTypeWiseTicketReport() {
    this.reportService.getProductTypeWiseTicketReport().subscribe(
      (success) => {
        var data : any;
        data = success;
        
        this.chartOptions = {};
        var series = data.totalTicks;
        var labels = data.productTypes;
        
        var seriesLenth = data.totalTicks.length;
       
        if (seriesLenth > 0) {
          this.chartOptions = {
            series: series,
            chart: {
              width: '700',
              type: "pie"
            },
            labels: labels,
          };
          $(".myApexChart").show();
        } else {
          $(".myApexChart").hide();
          Swal.fire(
            'Info!',
            'No records found!',
            'info'
          ).then(() => {
            $("#productTypeWiseTicketReportModal").modal("hide");
          })													
        }
        
      },
      (error) => {},
    )
  }

  //ticketTYpe
  public openTicketTypeWiseTicketChartReportModal() {
    this.getTicketTypeWiseTicketChartReport();
    $("#ticketTypeWiseTicketChartReportModal").modal("show");
  }

  public getTicketTypeWiseTicketChartReport() {
    this.reportService.getProductTypeWiseTicketChartReport().subscribe(
      (success) => {
        var data : any;
        data = success;
        
        this.chartOptions = {};
        var series = data.totalTicks;
        var labels = data.ticketTypes;
        
        var seriesLenth = data.totalTicks.length;
       
        if (seriesLenth > 0) {
          this.chartOptions = {
            series: series,
            chart: {
              width: '700',
              type: "pie"
            },
            labels: labels,
          };
          $(".myApexChart").show();
        } else {
          $(".myApexChart").hide();
          Swal.fire(
            'Info!',
            'No records found!',
            'info'
          ).then(() => {
            $("#ticketTypeWiseTicketChartReportModal").modal("hide");
          })
        }
        
      },
      (error) => {},
    )
  }

}


