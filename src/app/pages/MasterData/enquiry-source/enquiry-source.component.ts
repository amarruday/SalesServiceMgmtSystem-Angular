import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/services/MasterServices/master.service';
import Swal from 'sweetalert2'
declare var $: any;

@Component({
  selector: 'app-enquiry-source',
  templateUrl: './enquiry-source.component.html',
  styleUrls: ['./enquiry-source.component.css']
})
export class EnquirySourceComponent implements OnInit {

  enquirySourceList: any;
  addEnquirySourceModal: any ={};
  constructor(
    private masterService: MasterService
  ) { }

  ngOnInit(): void {
    this.loadEnquirySources();
  }

  public loadEnquirySources() {
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

  public addEnquirySource() {
    this.masterService.addEnquirySource(this.addEnquirySourceModal).subscribe(
      (success) => {
        var data : any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          Swal.fire(
            'Added!',
            data.message,
            'success'
          ).then(() => {
            this.addEnquirySourceModal.enquirySource = "";
            $("#addEnquirySourceModal").modal('hide');
            this.loadEnquirySources();
          });
        } else if(data.responseStatus === "FAILURE" && data.errorCode != null) {
          Swal.fire(
            'Failed!',
            data.message,
            'error'
          )
          this.addEnquirySourceModal.enquirySource = "";
        }
      },
      (error) => {console.log(error);}
    )
  }

  

}
