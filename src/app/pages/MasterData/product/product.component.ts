import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/services/MasterServices/master.service';
import Swal from 'sweetalert2'

declare var $: any;


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public productTypeList: any;
  public totalItems: number;
  public productDetails:any;
  page: number = 1;
  public brandList: any;
  public productList : any;

  public addProductModal: any = {
    productTypeId: 0,
    brandId: 0,
    productName:'',
    warrantyInYears: 1,
    ticketPrefix: ''
  }

  public editProductModal: any = {
    productId: 0,
    productTypeId: 0,
    brandId: 0,
    productName:'',
    warrantyInYears: 0,
    ticketPrefix: '',
    status: false
  } 

  public activeProductTypeList: any;
  public activeBrandsList: any;

  public productSearchBean: any = {
    pageNumber: 1,
	  pageSize: 10,
	  productTypeId: 0,
	  brandId: 0,
  }

  constructor(
    private masterService: MasterService
  ) { }

  ngOnInit(): void {
    this.loadProductTypes();
    this.loadBrands();
    this.loadProducts();
  }

  public loadProducts() {
    this.masterService.getProducts(this.productSearchBean).subscribe(
      (success) => {
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          this.productList = data.ProductList;
          this.totalItems = data.TotalItems;
        }
      },
      (error) => {console.log(error);}
    )
  }

  public loadProductTypes() {
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

  public loadBrands() {
    this.masterService.getBrands().subscribe(
      (success) => {
        this.brandList = success;
        if(this.brandList.responseStatus === 'SUCCESS') {
          this.brandList = this.brandList.BrandsList;
        }
      }, (error) => {
        console.log(error);
      }
    )
  }

  public changePage(pageNo: any): void {
    this.productSearchBean.pageNumber = pageNo;
    this.masterService.getProducts(this.productSearchBean).subscribe(
      (success) => {
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          this.productList = data.ProductList;
          this.totalItems = data.TotalItems;
          this.page = data.CurrentPage;
        }
      },
      (error) => {console.log(error);}
    )
    
  }

  public searchProductsFunction() {
    this.productSearchBean.pageNumber = 1;
    this.masterService.getProducts(this.productSearchBean).subscribe(
      (success) => {
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          this.productList = data.ProductList;
          this.totalItems = data.TotalItems;
          this.page = data.CurrentPage;
        }
      },
      (error) => {console.log(error);}
    )
  }

  public openAddProductModal() {

    this.masterService.getActiveProductTypes().subscribe(
      success => {
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          this.activeProductTypeList = data.ProductTypeList;
        }
      },
      error => {console.log(error);}
    )

    this.masterService.getActiveBrands().subscribe(
      (success) => {
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          this.activeBrandsList = data.BrandsList;
        }
      },
      (error) => {console.log(error);}
    )

    $("#addProductModal").modal("show");
  }

  public addProductFunction() {
    this.masterService.addProduct(this.addProductModal).subscribe(
      success => {
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          Swal.fire(
            'Added!',
            data.message,
            'success'
          ).then(() => {
            $("#addProductModal").modal('hide');
            this.loadProducts();
            this.addProductModal.productTypeId = 0;
            this.addProductModal.productTypeId = 0;
            this.addProductModal.brandId = 0;
            this.addProductModal.productName = '';
            this.addProductModal.ticketPrefix = '';
          });
        } else if(data.responseStatus === "FAILURE" && data.errorCode != null) {
          Swal.fire(
            'Failed!',
            data.message,
            'error'
          ).then(() => {
            $("#addProductModal").modal('hide');
            this.loadProducts();
            this.addProductModal.productTypeId = 0;
            this.addProductModal.productTypeId = 0;
            this.addProductModal.brandId = 0;
            this.addProductModal.productName = '';
            this.addProductModal.ticketPrefix = '';
          });
        }
      },
      error => {console.log(error);}
      )
  }

  public updateProductFunction() {
    this.masterService.updateProduct(this.editProductModal).subscribe(
      (success) => {
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          Swal.fire(
            'Added!',
            data.message,
            'success'
          ).then(() => {
            $("#editProductModal").modal('hide');
            this.loadProducts();
            this.editProductModal.productTypeId = 0;
            this.editProductModal.productTypeId = 0;
            this.editProductModal.brandId = 0;
            this.editProductModal.productName = '';
            this.editProductModal.warrantyInYears = 0;
            this.editProductModal.ticketPrefix = '';
            this.editProductModal.status = false;
          });
        } else if(data.responseStatus === "FAILURE" && data.errorCode != null) {
          Swal.fire(
            'Failed!',
            data.message,
            'error'
          ).then(() => {
            $("#editProductModal").modal('hide');
            this.loadProducts();
            this.editProductModal.productTypeId = 0;
            this.editProductModal.productTypeId = 0;
            this.editProductModal.brandId = 0;
            this.editProductModal.productName = '';
            this.editProductModal.warrantyInYears = 0;
            this.editProductModal.ticketPrefix = '';
            this.editProductModal.status = false;
          });
        }
      }, 
      (error) => {}
    )
  }

  public getTicketPrefix(event: any) {
    this.addProductModal.ticketPrefix = '';
    var myList = this.activeProductTypeList;
    for(var i = 0; i < myList.length; i++) {
      if(myList[i].productTypeId == event) {
        this.addProductModal.ticketPrefix = myList[i].ticketPrefix;
      }
    }
  }

  public getTicketPrefixEditTicket(event: any) {
    this.editProductModal.ticketPrefix = '';
    var myList = this.activeProductTypeList;
    for(var i = 0; i < myList.length; i++) {
      if(myList[i].productTypeId == event) {
        this.editProductModal.ticketPrefix = myList[i].ticketPrefix;
      }
    }
  }

  public getProductForEdit(productId: number) {

    new Promise<void>((resolve) => {
      this.masterService.getActiveProductTypes().subscribe(
        success => {
          var data: any;
          data = success;
          if(data.responseStatus === "SUCCESS") {
            this.activeProductTypeList = data.ProductTypeList;
          }
        },
        error => {console.log(error);}
      )
  
      this.masterService.getActiveBrands().subscribe(
        (success) => {
          var data: any;
          data = success;
          if(data.responseStatus === "SUCCESS") {
            this.activeBrandsList = data.BrandsList;
            resolve();
          }
        },
        (error) => {console.log(error);}
      )
    }).then(() => {
      this.masterService.getProductByProductId(productId).subscribe(
        (success) => {
          var data: any;
          data = success;
          if(data.responseStatus === "SUCCESS") {
            this.editProductModal.productId = data.Product.productId;
            this.editProductModal.productTypeId = data.Product.productType.productTypeId;
            this.editProductModal.brandId = data.Product.brand.brandId;
            this.editProductModal.ticketPrefix = data.Product.ticketPrefix;
            this.editProductModal.productName = data.Product.productName;
            this.editProductModal.warrantyInYears = data.Product.warrantyInYears;
            this.editProductModal.status = data.Product.status;
            $("#editProductModal").modal('show');
          }
        },
        (error) => {console.log(error)}
      )
    });
  }

  public getProductDetails(productId: number) {
    this.masterService.getProductByProductId(productId).subscribe(
      success => {
        var data : any;
        data = success;

        if(data.responseStatus === "SUCCESS") {
          this.productDetails = data.Product;
          console.log(this.productDetails);
          $("#viewProductDetailsModal").modal('show');
        }
      },
      error => {console.log(error)},
      )
  }

  public deleteProduct(productId: number) {
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
        this.masterService.deleteProduct(productId).subscribe(
          (success) => {
            var data: any;
            data = success;
            console.log(data);
            if(data.responseStatus === "SUCCESS") {
              Swal.fire(
                'Deleted!',
                data.message,
                'success'
              ).then(() => {
                $("#viewProductDetailsModal").modal('hide');
                this.loadProducts();
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
}
