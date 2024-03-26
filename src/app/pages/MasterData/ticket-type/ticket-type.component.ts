import { Component, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { MasterService } from 'src/app/services/MasterServices/master.service';
import Swal from 'sweetalert2'

declare var $: any;
@Component({
  selector: 'app-ticket-type',
  templateUrl: './ticket-type.component.html',
  styleUrls: ['./ticket-type.component.css']
})

export class TicketTypeComponent implements OnInit {

  public ticketTypesList: any;
  
  public editTicketTypeBean: any = {
    ticketTypeId:0,
    ticketType:"",
    status:""
  }

  public addTicketTypeBean: any= {};

  constructor(
    private masterService: MasterService
  ) { }
  
  ngOnInit(): void {
    this.loadTicketTypes();
  }

  public loadTicketTypes() {
    this.masterService.getAllTicketTypes().subscribe(
      (success) => {
        this.ticketTypesList = success;
        if(this.ticketTypesList.responseStatus === 'SUCCESS') {
          this.ticketTypesList = this.ticketTypesList.TicketTypeList;
        }
      }, (error) => {
        console.log(error);
      }
    )
  }

  public getTicketType(ticketTypeId: any) {
    this.masterService.getTicketType(ticketTypeId).subscribe(
      (success) => {
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          data = data.TicketType;
          this.editTicketTypeBean.ticketTypeId = data.ticketTypeId;
          this.editTicketTypeBean.ticketType = data.ticketType;
          this.editTicketTypeBean.status = data.status;
          $('#editTicketTypeModal').modal('show');
        }
      },
      (error) => {
        console.log("Error: " + error);
      }
    )
  }

  public addTicketTypeFunction() {
    this.masterService.addTicketType(this.addTicketTypeBean).subscribe(
      (success) => {
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          Swal.fire(
            'Added!',
            data.message,
            'success'
          ).then(() => {
            $("#addTicketTypeModal").modal('hide');
            this.addTicketTypeBean = {}
            this.loadTicketTypes();
          });
        } else if(data.responseStatus === "FAILURE" && data.errorCode != null) {
          Swal.fire(
            'Failed!',
            data.message,
            'error'
          )
          this.addTicketTypeBean.ticketType = "";
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

  public updateTicketType() {
    this.masterService.updateTicketType(this.editTicketTypeBean).subscribe(
      (success)=> {
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          Swal.fire(
            'Updated!',
            data.message,
            'success'
          ).then(() => {
            $("#editTicketTypeModal").modal('hide');
            this.loadTicketTypes();
          });
        }
      }, 
      (error)=> {
        Swal.fire(
          'Failed!',
          'Something went wrong! Contact Administrator',
          'error'
        )
      }
    )
  }

}
