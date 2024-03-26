import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/services/MasterServices/master.service';

@Component({
  selector: 'app-product-catagory',
  templateUrl: './product-catagory.component.html',
  styleUrls: ['./product-catagory.component.css']
})
export class ProductCatagoryComponent implements OnInit {

  public prodCatagoryList: any;
  constructor(
    private masterService: MasterService
  ) { }

  ngOnInit(): void {
    this.loadProductCatagories();
  }

  public loadProductCatagories() {
    this.masterService.getProductCatagories().subscribe(
      (success) => {
        var data:any;
        data = success;
        console.log(data);
        if(data.responseStatus === "SUCCESS") {
          this.prodCatagoryList = data.ProductCatagoryList;
        }

      },
      (error) => {console.log(error)}
    )
  }
}
