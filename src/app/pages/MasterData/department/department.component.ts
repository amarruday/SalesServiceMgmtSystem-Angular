import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/services/MasterServices/master.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  constructor(
    private masterService: MasterService
  ) { }
  departmentList: any;

  ngOnInit(): void {
    this.loadDepartmentsList();
  }

  loadDepartmentsList() {
    this.masterService.getDepartments().subscribe(
      (success)=>{
        this.departmentList = success;
      }, (error)=> {
        console.log(error);
      }
    )
  }

}
