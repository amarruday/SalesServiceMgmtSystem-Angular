import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from '../helper';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {
  
  constructor(
    private http: HttpClient
  ) { }

  //get Action Types
  public getCRMUsers(){
    return this.http.get(`${baseURL}/user/getcrmusers`);
  }

  public searchEnquiry(searchBean: any) {
    return this.http.post(`${baseURL}/enquiry/get`, searchBean);
  }

  public getAllCustomers() {
    return this.http.get(`${baseURL}/customer/`);
  }

  public getProductTypesByAssignedProductCatagory(currentUserId: any) {
    return this.http.get(`${baseURL}/product/getproductTypesByAssigedCatagory/` + currentUserId);  
  }

  public getProductsByBrandIdAndProductTypeId(brandId: any, productTypeId: any) {
    return this.http.get(`${baseURL}/product/getproducts/` + brandId + `/` + productTypeId);  
  }

  public getAssigendToList() {
    return this.http.get(`${baseURL}/enquiry/getassignedtolist/`);
  }

  public addEnquiry(addEnquiryBean: any) {
    return this.http.post(`${baseURL}/enquiry/`, addEnquiryBean);
  }

  public getEnquiryDetails(enquriyId: number) {
    return this.http.get(`${baseURL}/enquiry/getenquirydetails/`+enquriyId);
  }

  public assignEnquiry(assignEnquiryBean: any) {
    return this.http.post(`${baseURL}/enquiry/assign`, assignEnquiryBean);
  }

  public cancelEnquiry(cancelEnquiry: any) {
    return this.http.post(`${baseURL}/enquiry/cancel`, cancelEnquiry);
  }

  public convertToProspectEnquiry(convertToProspectEnquiry: any) {
    return this.http.post(`${baseURL}/enquiry/convertToProspect`, convertToProspectEnquiry);
  }

  public wonEnquiry(wonEnquiry: any) {
    return this.http.post(`${baseURL}/enquiry/won`, wonEnquiry);
  }

  public lostEnquiry(lostEnquiry: any) {
    return this.http.post(`${baseURL}/enquiry/lost`, lostEnquiry);
  }
}
