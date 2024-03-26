import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from '../helper';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  getProductwiseTicketTypeReport(searchBean: any) {
    throw new Error('Method not implemented.');
  }

  constructor(
    private http: HttpClient
  ) { }

  public getTicketTypeWiseTicketReport(searchBean: any) {
    return this.http.post(`${baseURL}/reports/tickettypewiseticketreport`, searchBean);
  }

  public getProductwiseTicketReport(searchBean: any) {
    return this.http.post(`${baseURL}/reports/productwiseticketreport`, searchBean);
  }

  public getEmployeewiseTicketReport(searchBean: any) {
    return this.http.post(`${baseURL}/reports/employeewiseticketreport`, searchBean);
  }

  public getProductwiseTicketTypCountReport(searchBean: any) {
    return this.http.post(`${baseURL}/reports/productwisetickettypecountreport`, searchBean); 
  }

  public getEnquirySourceEfficacyWiseEnquiryReport(searchBean: any) {
    return this.http.post(`${baseURL}/reports/enquirySourceEfficacyWiseEnquiryReport`, searchBean);
  }

  public getProductWiseEnquiryReport(searchBean: any) {
    return this.http.post(`${baseURL}/reports/productwiseenquiryreport`, searchBean);
  }

  public getEmployeeWiseEnquiryReport(searchBean: any) {
    return this.http.post(`${baseURL}/reports/employeewiseenquiryreport`, searchBean);
  }

  public getProductTypeWiseEnquiryReport() {
    return this.http.get(`${baseURL}/reports/producttypewiseEnquiryChartReport`);
  }

  public getProductTypeWiseTicketReport() {
    return this.http.get(`${baseURL}/reports/producttypewiseTicketChartReport`);
  }

  public getProductTypeWiseTicketChartReport() {
    return this.http.get(`${baseURL}/reports/tickettypewiseTicketChartReport`);
  }

 
}
