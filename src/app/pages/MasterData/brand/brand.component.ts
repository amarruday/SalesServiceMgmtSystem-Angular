import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/services/MasterServices/master.service';
import Swal from 'sweetalert2'
declare var $: any;

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brandsList: any;
  brand: any = {};
  addBrandModal : any = {};
  constructor(
    private masterService: MasterService
  ) { }

  ngOnInit(): void {
    this.loadBrands();
  }

  public loadBrands() {
    this.masterService.getBrands().subscribe(
      (success) => {
        this.brandsList = success;
        if(this.brandsList.responseStatus === 'SUCCESS') {
          this.brandsList = this.brandsList.BrandsList;
        }
      }, (error) => {
        console.log(error);
      }
    )
  }

  public getBrandById(brandId: number) {
    this.masterService.getBrandById(brandId).subscribe(
      (success) => {
        var data: any;
        data = success;

        if(data.responseStatus === "SUCCESS") {
          data = data.Brand;
          this.brand.brandId = data.brandId;
          this.brand.brandName = data.brandName;
          this.brand.status = data.status;
          $("#editBrandModal").modal('show');
        }
      },
      (error) => {

      }
    )    
  }

  public addBrand() {
    this.masterService.addBrand(this.addBrandModal).subscribe(
      (success) => {
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          Swal.fire(
            'Added!',
            data.message,
            'success'
          ).then(() => {
            this.addBrandModal.brandName = "";
            $("#addBrandModal").modal('hide');
            this.loadBrands();
          });
        } else if(data.responseStatus === "FAILURE" && data.errorCode != null) {
          Swal.fire(
            'Failed!',
            data.message,
            'error'
          )
          this.addBrandModal.brandName = "";
        }
      },
      (error) => {console.log(error);}
    )
  }

  public updateBrand() {
    this.masterService.updateBrand(this.brand).subscribe(
      (success) => {
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          Swal.fire(
            'Added!',
            data.message,
            'success'
          ).then(() => {
            this.brand.brandName = "";
            this.brand.brandId = 0;
            this.brand.status = ""
            $("#editBrandModal").modal('hide');
            this.loadBrands();
          });
        } else if(data.responseStatus === "FAILURE" && data.errorCode != null) {
          Swal.fire(
            'Failed!',
            data.message,
            'error'
          )
          $("#editBrandModal").modal('hide');
        }
      },
      (error) => {}
    )
  }

}
