import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from '../helper';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(
    private http: HttpClient
  ) { }

  //ticket Types
  public getAllTicketTypes() {
    return this.http.get(`${baseURL}/tickettypes/`);
  }

  public getTicketType(ticketTypeId: any) {
    return this.http.get(`${baseURL}/tickettypes/`+ticketTypeId);
  }

  public deleteTicketType(ticketTypeId: any) {
    return this.http.delete(`${baseURL}/tickettypes/`+ticketTypeId);
  }

  public addTicketType(ticketType: any) {
    return this.http.post(`${baseURL}/tickettypes/`, ticketType);
  }

  public updateTicketType(editTicketType: any) {
    return this.http.put(`${baseURL}/tickettypes/`, editTicketType);
  }

  //Action Types
  public getAllActionTypes() {
    return this.http.get(`${baseURL}/companyapi/actionType/All`);
  }

  public getActionTypeById(actionTypeId: number) {
    return this.http.get(`${baseURL}/companyapi/actionType/get/`+actionTypeId);
  }

  public addActionType(actionType: any) {
    return this.http.post(`${baseURL}/companyapi/actionType/`, actionType);
  }

  public updateActionType(actionType: any) {
    return this.http.put(`${baseURL}/companyapi/actionType/`, actionType);
  }

  public deleteActionTypeById(actionTypeId: number) {
    return this.http.delete(`${baseURL}/companyapi/actionType/`+actionTypeId);
  }

  //Brands
  public getBrands() {
    return this.http.get(`${baseURL}/companyapi/brand/`);
  }

  public getBrandById(brandId: number) {
    return this.http.get(`${baseURL}/companyapi/brand/`+brandId);
  }

  public addBrand(addBrandModel: any) {
    return this.http.post(`${baseURL}/companyapi/brand/`, addBrandModel);
  }

  public updateBrand(brand: any) {
    return this.http.put(`${baseURL}/companyapi/brand/`, brand);
  }


  //Common Replies
  public getCommonReplies() {
    return this.http.get(`${baseURL}/companyapi/commonReply/`);
  }
  
  public addCommonReply(commonReplyModal: any) {
    return this.http.post(`${baseURL}/companyapi/commonReply/`, commonReplyModal);
  }

  public deleteCommonReply(commonReplyId: number) {
    return this.http.delete(`${baseURL}/companyapi/commonReply/`+commonReplyId);
  }

  //customers
  public getAllCustomers() {
    return this.http.get(`${baseURL}/customer/all`);
  }

  public getAllCustomersPaginated(pageDetails: any) {
    console.log(pageDetails);
    return this.http.post(`${baseURL}/customer/all`, pageDetails);
  }

  public addCustomer(customerModal: any) {
    return this.http.post(`${baseURL}/customer/`, customerModal);
  }

  public getCustomerByCustomerId(customerId: any) {
    return this.http.get(`${baseURL}/customer/`+customerId);
  }

  public updateCustomer(customerModel: any) {
    return this.http.put(`${baseURL}/customer/`, customerModel);
  }
  
  //Departments

  public getDepartments() {
    return this.http.get(`${baseURL}/companyapi/department/`);
  }

  //Enquiry Sources
  public getEnquirySources() {
    return this.http.get(`${baseURL}/companyapi/enquirySources/`);
  }

  public addEnquirySource(enquirySource: any) {
    return this.http.post(`${baseURL}/companyapi/enquirySources/`, enquirySource);
  }

  //enquiry types
  public getEnquiryTypes() {
    return this.http.get(`${baseURL}/companyapi/enquiryType/`);
  }

  //employees
  public getAllUsersList() {
    return this.http.get(`${baseURL}/user/all`);
  }

  public getUserByUserId(userId:number) {
    return this.http.get(`${baseURL}/user/get/`+userId);
  }

  public getRoles() {
    return this.http.get(`${baseURL}/companyapi/role/`);
  }

  public getSettinsgByRoleId(roleId: number) {
    return this.http.get(`${baseURL}/companyapi/getsettingsbyrole/`+roleId);
  }

  public addUser(userModal: any) {
    return this.http.post(`${baseURL}/user/create`, userModal);
  }

  public getUserEditDetails(userId: number) {
    return this.http.get(`${baseURL}/user/getforedit/`+userId);
  }

  public updateUser(user: any) {
    return this.http.put(`${baseURL}/user/`, user);
  }

  //productCategory
  public getProductCatagories() {
    return this.http.get(`${baseURL}/productcatagory/`);
  }

  //product-type
  public getAllProductTypes() {
    return this.http.get(`${baseURL}/producttype/`);
  }

  public getActiveProductCatagories() {
    return this.http.get(`${baseURL}/productcatagory/active`);
  }

  public getProductTypeByProductTypeId(productTypeId: number) {
    return this.http.get(`${baseURL}/producttype/`+productTypeId);
  }

  public addProductType(productType: any) {
    return this.http.post(`${baseURL}/producttype/`, productType);
  }

  public updateProductType(productType: any) {
    return this.http.put(`${baseURL}/producttype/`, productType);
  }

  //Get Products
  public getProducts(productSearchBean: any) {
    return this.http.post(`${baseURL}/product/get`, productSearchBean);
  }

  public getActiveProductTypes() {
    return this.http.get(`${baseURL}/producttype/Active`);
  }

  public getActiveBrands() {
    return this.http.get(`${baseURL}/companyapi/brand/Active`);
  }

  public getProductByProductId(productId: number) {
    return this.http.get(`${baseURL}/product/`+productId);
  }

  public addProduct(product: any) {
    return this.http.post(`${baseURL}/product/add`, product);
  }

  public updateProduct(product: any) {
    return this.http.put(`${baseURL}/product/`, product);
  }

  public deleteProduct(productId: number) {
    return this.http.delete(`${baseURL}/product/`+productId);
  }
}
