import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseURL from '../helper';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(
    private http: HttpClient
  ) { }

  public getAllTicketTypes() {
    return this.http.get(`${baseURL}/tickettypes/`);
  }

  public getActiveCustomers() {
    return this.http.get(`${baseURL}/customer/`);
  }

  public getSRMUsers() {
    return this.http.get(`${baseURL}/user/getsrmusers`);
  }

  public searchTickets(searchTicketBean: any) {
    return this.http.post(`${baseURL}/ticket/get`, searchTicketBean);
  }

  public getTicketDetails(ticketId:any) {
    return this.http.get(`${baseURL}/ticket/ticketdetails/`+ticketId);
  }

  public getActiveTicketTypes() {
    return this.http.get(`${baseURL}/tickettypes/all/active`);
  }

  public getProductListByCustomer(customerId: any) {
    return this.http.get(`${baseURL}/ticket/getproductdetails/`+customerId);
  }

  public addNewTicket(addTicketBean : any) {
    return this.http.post(`${baseURL}/ticket/`, addTicketBean);
  }

  public changeTicketStatus(ticketStatusBean: any) {
    return this.http.post(`${baseURL}/ticket/changestatus`, ticketStatusBean);
  }
}


