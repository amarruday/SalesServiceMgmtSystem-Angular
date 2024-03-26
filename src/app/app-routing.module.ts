import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { LoginComponent } from './Components/login/login.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { ActionTypeComponent } from './pages/MasterData/action-type/action-type.component';
import { BrandComponent } from './pages/MasterData/brand/brand.component';
import { CommonReplyComponent } from './pages/MasterData/common-reply/common-reply.component';
import { CustomerComponent } from './pages/MasterData/customer/customer.component';
import { DepartmentComponent } from './pages/MasterData/department/department.component';
import { EmployeeComponent } from './pages/MasterData/employee/employee.component';
import { EnquirySourceComponent } from './pages/MasterData/enquiry-source/enquiry-source.component';
import { EnquiryTypeComponent } from './pages/MasterData/enquiry-type/enquiry-type.component';
import { ProductCatagoryComponent } from './pages/MasterData/product-catagory/product-catagory.component';
import { ProductTypeComponent } from './pages/MasterData/product-type/product-type.component';
import { ProductComponent } from './pages/MasterData/product/product.component';
import { ManageColdVisitComponent } from './pages/manage-cold-visit/manage-cold-visit.component';
import { ManageEnquiryComponent } from './pages/manage-enquiry/manage-enquiry.component';
import { AdminGuard } from './services/Guards/admin.guard';
import { TicketTypeComponent } from './pages/MasterData/ticket-type/ticket-type.component';
import { ManageTicketComponent } from './pages/manage-ticket/manage-ticket.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReportsComponent } from './pages/reports/reports.component';

const routes: Routes = [
  {
    path: 'dashboard', component: NavbarComponent, 
    children: [
      {path: 'index', component: DashboardComponent},
      { 
        path: 'ticket', 
        children: [
          { path: 'managetickets', component: ManageTicketComponent, pathMatch: 'full'},
        ]
      },
      { 
        path: 'enquiry', 
        children: [
          { path: 'managecoldvisits', component: ManageColdVisitComponent, pathMatch: 'full'},
          { path: 'manageenquiries', component: ManageEnquiryComponent, pathMatch: 'full' },
        ]
      },
      {
        path: 'MasterData',
        children: [
          {
            path: 'managetickettypes',
            component: TicketTypeComponent,
            pathMatch: "full"  
          },
          {
            path: 'manageactiontypes',
            component: ActionTypeComponent,
            pathMatch: "full"  
          },
          {
            path: 'managebrands',
            component: BrandComponent,
            pathMatch: "full"  
          },
          {
            path: 'managecommonnreplies',
            component: CommonReplyComponent,
            pathMatch: "full"  
          }, 
          {
            path: 'managecustomer',
            component: CustomerComponent,
            pathMatch: "full"  
          },
          {
            path: 'departments',
            component: DepartmentComponent,
            pathMatch: "full"  
          }, 
          {
            path: 'manageenquirysources',
            component: EnquirySourceComponent,
            pathMatch: "full"  
          },
          {
            path: 'enquriryTypes',
            component: EnquiryTypeComponent,
            pathMatch: "full"  
          },
          {
            path: 'manageemployes',
            component: EmployeeComponent,
            pathMatch: "full"  
          },
          {
            path: 'productcatagories',
            component: ProductCatagoryComponent,
            pathMatch: "full"
          },
          {
            path: 'producttypes',
            component: ProductTypeComponent,
            pathMatch: "full"
          },
          {
            path: 'manageproduct',
            component: ProductComponent,
            pathMatch: "full"
          }
        ]
        
      },
      { path: 'reports', component: ReportsComponent, pathMatch: 'full'}
    ]
  },
  
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
