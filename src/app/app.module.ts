import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { LoginComponent } from './Components/login/login.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { authInterceptorProvider } from './services/auth.interceptor';
import { ManageColdVisitComponent } from './pages/manage-cold-visit/manage-cold-visit.component';
import { ManageEnquiryComponent } from './pages/manage-enquiry/manage-enquiry.component';
import { ActionTypeComponent } from './pages/MasterData/action-type/action-type.component';
import { BrandComponent } from './pages/MasterData/brand/brand.component';
import { CommonReplyComponent } from './pages/MasterData/common-reply/common-reply.component';
import { DepartmentComponent } from './pages/MasterData/department/department.component';
import { EnquirySourceComponent } from './pages/MasterData/enquiry-source/enquiry-source.component';
import { EnquiryTypeComponent } from './pages/MasterData/enquiry-type/enquiry-type.component';
import { ProductTypeComponent } from './pages/MasterData/product-type/product-type.component';
import { ProductCatagoryComponent } from './pages/MasterData/product-catagory/product-catagory.component';
import { CustomerComponent } from './pages/MasterData/customer/customer.component';
import { EmployeeComponent } from './pages/MasterData/employee/employee.component';
import { ProductComponent } from './pages/MasterData/product/product.component';
import { DropdownValidatorDirective } from './Validators/DropdownValidatorDirective.directive';
import { TicketTypeComponent } from './pages/MasterData/ticket-type/ticket-type.component';
import { ManageTicketComponent } from './pages/manage-ticket/manage-ticket.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { NgxPrintModule } from 'ngx-print';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    AboutUsComponent,
    ManageColdVisitComponent,
    ManageEnquiryComponent,
    ActionTypeComponent,
    BrandComponent,
    CommonReplyComponent,
    DropdownValidatorDirective,
    DepartmentComponent,
    EnquirySourceComponent,
    EnquiryTypeComponent,
    ProductCatagoryComponent,
    ProductTypeComponent,
    ProductComponent,
    CustomerComponent,
    EmployeeComponent,
    TicketTypeComponent,
    ManageTicketComponent,
    DashboardComponent,
    ReportsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxPrintModule,
    NgApexchartsModule
  ],
  providers: [authInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
