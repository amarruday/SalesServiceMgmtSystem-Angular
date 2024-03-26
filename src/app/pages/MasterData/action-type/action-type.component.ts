import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/services/MasterServices/master.service';
import Swal from 'sweetalert2'

declare var $: any;

@Component({
  selector: 'app-action-type',
  templateUrl: './action-type.component.html',
  styleUrls: ['./action-type.component.css']
})
export class ActionTypeComponent implements OnInit {

  actionTypeList: any;
  public addActionType: any = {};
  public updateActionTypeModel: any = {};

  constructor(
    private masterService: MasterService
  ) { }

  ngOnInit(): void {
    this.loadActionTypes();
  }

  public loadActionTypes() {
    this.masterService.getAllActionTypes().subscribe(
      (success) => {
        this.actionTypeList = success;
        if(this.actionTypeList.responseStatus === 'SUCCESS') {
          this.actionTypeList = this.actionTypeList.ActionTypeList;
        }
      }, (error) => {
        console.log(error);
      }
    )
  }

  public getActionType(actionTypeId: number){
    this.masterService.getActionTypeById(actionTypeId).subscribe(
      (success) => {
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          data = data.ActionType;
          this.updateActionTypeModel.actionTypeId = data.actionTypeId;
          this.updateActionTypeModel.actionType = data.actionType;
          this.updateActionTypeModel.status = data.status;
          $('#editActionTypeModal').modal('show');
        }
      },
      (error) => {
        console.log("Error: " + error);
      }
    )
  }

  public addActionTypeFunction() {
    this.masterService.addActionType(this.addActionType).subscribe(
      (success) => {
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          Swal.fire(
            'Added!',
            data.message,
            'success'
          ).then(() => {
            $("#addActionTypeModal").modal('hide');
            this.loadActionTypes();
          });
        } else if(data.responseStatus === "FAILURE" && data.errorCode != null) {
          Swal.fire(
            'Failed!',
            data.message,
            'error'
          )
          this.addActionType.actionType = "";
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

  public deleteActionTypeById(actionTypeId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3c8dbc',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.masterService.deleteActionTypeById(actionTypeId).subscribe(
          (success) => {
            var data: any;
            data = success;
            if(data.responseStatus === "SUCCESS") {
              Swal.fire(
                'Deleted!',
                data.message,
                'success'
              ).then(() => {
                this.loadActionTypes();
              });
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
    })
  }

  public updateActionType() {
    this.masterService.updateActionType(this.updateActionTypeModel).subscribe(
      (success)=> {
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          Swal.fire(
            'Updated!',
            data.message,
            'success'
          ).then(() => {
            $("#editActionTypeModal").modal('hide');
            this.loadActionTypes();
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
