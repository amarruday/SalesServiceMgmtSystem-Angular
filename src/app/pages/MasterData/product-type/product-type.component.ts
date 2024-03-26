import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/services/MasterServices/master.service';
import Swal from 'sweetalert2'

declare var $: any;

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.css']
})
export class ProductTypeComponent implements OnInit {

  productTypeList: any;
  editProductTypeModal: any = {
    productTypeId : 0,
    productCatagoryId : 0,
    productName: "",
    ticketPrefix: "",
    status : false
  };

  addProductType: any = {
    productCatagoryId : 0,
    productName: "",
    ticketPrefix: ""
  }
  

  prodCatagoryList: any;

  constructor(
    private masterService: MasterService
  ) { }

  ngOnInit(): void {

    this.masterService.getActiveProductCatagories().subscribe(
      (success) => {
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          this.prodCatagoryList = data.ProductCatagoryList;
        }
      },
      (error) => {console.log(error)},
    )

    this.loadProductType();

  }

  public loadProductType() {    
    this.masterService.getAllProductTypes().subscribe(
     (success) => {
       var data : any;
       data = success;
       if(data.responseStatus === "SUCCESS") {
        this.productTypeList = data.ProductTypesList;
       }
     },
     (error) => {console.log(error)}
    )
  }

  public addProductTypeFunction() {
    this.masterService.addProductType(this.addProductType).subscribe(
      (success) => {
        var data : any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          Swal.fire(
            'Added!',
            data.message,
            'success'
          ).then(() => {
            $("#addProductTypeModel").modal('hide');
            this.loadProductType();
          });
        } else if(data.responseStatus === "FAILURE" && data.errorCode != null) {
          Swal.fire(
            'Failed!',
            data.message,
            'error'
          )
        }
      },
      (error) => {console.log(error)}
    )
  }

  public getProductTypeByProductTypeId(productTypeId: number) {
    this.masterService.getProductTypeByProductTypeId(productTypeId).subscribe(
      (success) => {
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          this.editProductTypeModal.productTypeId = data.ProductType.productTypeId;
          this.editProductTypeModal.productCatagoryId = data.ProductType.productCatagory.productCatagoryId;
          this.editProductTypeModal.productName = data.ProductType.productName;
          this.editProductTypeModal.ticketPrefix = data.ProductType.ticketPrefix;
          this.editProductTypeModal.status = data.ProductType.status;
          $("#editProductTypeModel").modal('show');
        }
      },
      (error) => {console.log(error);}
    )
  }

  public editProductTypeFunction() {
    this.masterService.updateProductType(this.editProductTypeModal).subscribe(
      (success) => {
        var data : any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          Swal.fire(
            'Updated!',
            data.message,
            'success'
          ).then(() => {
            $("#editProductTypeModel").modal('hide');
            this.loadProductType();
          });
        } else if(data.responseStatus === "FAILURE" && data.errorCode != null) {
          Swal.fire(
            'Failed!',
            data.message,
            'error'
          )
        }
      },
      (error) => {console.log(error)}
    )
  }

}
