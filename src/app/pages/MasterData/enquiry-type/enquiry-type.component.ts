import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/services/MasterServices/master.service';

@Component({
  selector: 'app-enquiry-type',
  templateUrl: './enquiry-type.component.html',
  styleUrls: ['./enquiry-type.component.css']
})
export class EnquiryTypeComponent implements OnInit {

  enquiryTypeList: any;

  constructor(
    private masterService: MasterService
  ) { }

  ngOnInit(): void {
    this.loadEnquriryTypes();
  }

  public loadEnquriryTypes() {
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

}
