import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/services/MasterServices/master.service';
import Swal from 'sweetalert2'

declare var $: any;
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public usersList:any;
  public userDetails: any;
  public addUserModal : any = {
    fullName: '',
    employeeCode: '',
    email: '',
    mobileNumber: '',
    roleId: 0,
    productCatagoryId:0,
    managerId:0
  }

  public editUserModal : any = {
    userId: 0,
    fullName: '',
    employeeCode: '',
    email: '',
    mobileNumber: '',
    roleId: 0,
    productCatagoryId:0,
    managerId:0,
    status: false
  }

  public roleList : any;
  public productCatagoryList: any;
  public managerList: any;

  constructor(
    private masterService:MasterService
  ) { }

  ngOnInit(): void {
    this.loadUsersList();
  }

  public loadUsersList() {
    this.masterService.getAllUsersList().subscribe(
      success => {
        var data: any;
        data = success;        
        if(data.responseStatus === "SUCCESS") {
          this.usersList = data.Users;
        }
      },
      error => { console.log(error);}
    )
  }

  public openAddCustomerModal() {
    new Promise<void>((successFun) => {
      this.masterService.getRoles().subscribe(
        (success) => {
          var data: any;
          data = success;
          if(data.responseStatus === "SUCCESS") {
            this.roleList = data.Roles;
            successFun();
          }
        },
        (error) => { console.log(error)}
      )
    }).then(() => {
      $("#addUserModal").modal("show");
    });
  }

  public viewCustomerDetails(userId: number) {
    this.masterService.getUserByUserId(userId).subscribe(
      (success) =>{
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          this.userDetails = data.User;
          console.log(this.userDetails);
          $("#viewEmployeeModal").modal('show');
        }
      },
      (error) => { console.log(error);}
    )
  }

  public getSettingsByRole(roleId: any) {
    $("#productCatagoryListDiv").hide();
    $("#managerListListDiv").hide();
    
    if(roleId > 0) {
      this.masterService.getSettinsgByRoleId(roleId).subscribe(
        (success) => {
          var data: any;
          data = success;          
          if(data.responseStatus === "SUCCESS") {
            if(data.ProductCatagoryList != null) {
              this.productCatagoryList = data.ProductCatagoryList;
              this.addUserModal.managerId = 0;
              $("#productCatagoryListDiv").show();

            } else if (data.RoleWiseManagersList != null && data.RoleWiseManagersList.length > 0) {
              this.managerList = data.RoleWiseManagersList;
              this.addUserModal.productCatagoryId = 0;              
              $("#managerListListDiv").show();
            }
          }
        },
        (error) => { console.log(error);}
      )
    }
  }

  public addNewUserFunction() {
    ///var role = $("#roleAddUser").val();
    var status = false;
    var role = $( "#roleAddUser option:selected" ).text();
    if(role === "SALES_MANAGER" || role === "SERVICE_MANAGER") {
      var id = $("#productCatagorySelect").val();
      console.log("Prod Id: " + id)
      if(id > 0) {
        status = true;
        $("#productCatagoryError").html("");
        this.addUserModal.managerId = 0;
      } else {
        $("#productCatagoryError").html("Please select product category");
        $("#productCatagoryError").show();
      }
    } else if(role === "SALES_ENGINEER" || role === "SERVICE_ENGINEER") {
      var id = $("#managerSelect").val();
      console.log("Mgr Id: " + id)
      if(id > 0) {
        status = true;
        $("#managerIdError").html("");
        this.addUserModal.productCatagoryId = 0;
      } else {
        $("#managerIdError").html("Please select manager");
        $("#managerIdError").show();
      }
    }
    
    if(status) {
      this.masterService.addUser(this.addUserModal).subscribe(
        (success) => {
          var data: any;
          data = success;
          if(data.responseStatus === "SUCCESS") {
            Swal.fire(
              'Added!',
              data.message,
              'success'
            ).then(() => {
              $("#addUserModal").modal('hide');
              this.loadUsersList();
            });
          } else if(data.responseStatus === "FAILURE" && data.errorCode != null) {
            Swal.fire(
              'Failed!',
              data.message,
              'error'
            )
          }
        },
        (error) => {console.log(error);}
      )
    }
  }

  public editCustomerById(userId:number) {
    $("#productCatagoryListEditDiv").hide();
    $("#managerListListEditDiv").hide();

    new Promise<void>((successFun) => {
      this.masterService.getRoles().subscribe(
        (success) => {
          var data: any;
          data = success;
          if(data.responseStatus === "SUCCESS") {
            this.roleList = data.Roles;
            successFun();
          }
        },
        (error) => { console.log(error)}
      )
    }).then(() => {
      this.masterService.getUserEditDetails(userId).subscribe(
        (success) => {
          var data: any;
          data = success;          
          if(data.responseStatus === "SUCCESS") {
            if(data.ProductCatagoryList != null) {
              this.productCatagoryList = data.ProductCatagoryList;
              this.editUserModal.productCatagoryId = data.User.productCatagoryId;
              this.editUserModal.managerId = 0;
              $("#productCatagoryListEditDiv").show();
            } else if (data.RoleWiseManagersList != null && data.RoleWiseManagersList.length > 0) {
              this.managerList = data.RoleWiseManagersList;
              this.editUserModal.managerId = data.User.manager.userId;
              this.editUserModal.productCatagoryId = 0;
              $("#managerListListEditDiv").show();
            }
            this.editUserModal.userId = data.User.userId;            
            this.editUserModal.fullName = data.User.fullName;
            this.editUserModal.employeeCode = data.User.employeeCode;
            this.editUserModal.email = data.User.email;
            this.editUserModal.mobileNumber = data.User.mobileNumber;
            this.editUserModal.roleId = data.User.roleId;
            this.editUserModal.status = data.User.status;
            $("#editUserModal").modal("show");
          }
        },
        (error) => { console.log(error)}
      )
    });
  }

  public getSettingsByRoleForEditUser(roleId: number) {
    $("#productCatagoryListEditDiv").hide();
    $("#managerListListEditDiv").hide();
    
    if(roleId > 0) {
      this.masterService.getSettinsgByRoleId(roleId).subscribe(
        (success) => {
          var data: any;
          data = success;          
          if(data.responseStatus === "SUCCESS") {
            if(data.ProductCatagoryList != null) {
              this.productCatagoryList = data.ProductCatagoryList;
              this.editUserModal.managerId = 0;
              $("#productCatagoryListEditDiv").show();

            } else if (data.RoleWiseManagersList != null && data.RoleWiseManagersList.length > 0) {
              this.managerList = data.RoleWiseManagersList;
              this.editUserModal.productCatagoryId = 0;              
              $("#managerListListEditDiv").show();
            }
          }
        },
        (error) => { console.log(error);}
      )
    }
  }

  public updateUser() {
    this.masterService.updateUser(this.editUserModal).subscribe(
      (success) => {
        var data : any;
        console.log("data", success);
        data = success;
        if(data.responseStatus === "SUCCESS") {
          Swal.fire(
            'Added!',
            data.message,
            'success'
          ).then(() => {
            $("#editUserModal").modal('hide');
            this.loadUsersList();
          });
        } else {
          Swal.fire(
            'Failed!',
            "Something went wrong Please try again",
            'error'
          ).then(() => {
            $("#editUserModal").modal('hide');
            this.loadUsersList();
          });
          
        }
      },
      (error) => { console.log(error);}
    )
  }
}
