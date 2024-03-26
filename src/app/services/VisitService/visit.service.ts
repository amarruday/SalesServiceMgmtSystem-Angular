import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Visit } from 'src/app/modals/Visit';
import baseURL from '../helper';

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  constructor(
    private http: HttpClient,
  ) { }

  //get Action Types
  public getActionTypes(){
    return this.http.get(`${baseURL}/companyapi/actionType/Active`);
  }

  //get Action Types
  public getCustomers(){
    return this.http.get(`${baseURL}/customer/`);
  }

  //get Action Types
  public getAddedBy(){
    return this.http.get(`${baseURL}/user/getcrmusers`);
  }

  public searchVisits(SearchBean: any) {
    return this.http.post(`${baseURL}/visit/search`, SearchBean);
  }

  public getVisitDetailsById(visitId: number) {
    return this.http.get(`${baseURL}/visit/`+visitId);
  }

  public addVisit(visit: Visit) {
    return this.http.post(`${baseURL}/visit/`, visit);
  }

  public getCommonReplies() {
    return this.http.get(`${baseURL}/companyapi/commonReply/`);
  }
}