import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from '../helper';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient
  ) { }

  public getDashboardDetails() {
    return this.http.get(`${baseURL}/dashboards/`);
  }
}
