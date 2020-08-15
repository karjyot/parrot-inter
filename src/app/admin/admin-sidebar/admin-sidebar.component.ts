import { Component, OnInit } from '@angular/core';
import { NavigationEnd,Router } from "@angular/router";
@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {
  selectedPage = "dashboard"
  constructor(private router : Router) { }

  ngOnInit() {
  }
  redirectUrl(type){
    if(type == 'dashboard'){
      this.selectedPage = 'dashboard'
      this.router.navigateByUrl('admin/dashboard');
    }
    if(type == 'ads'){
      this.selectedPage = 'ads'
      this.router.navigateByUrl('admin/ads');
    }
    if(type == 'users'){
      this.selectedPage = 'users'
      this.router.navigateByUrl('admin/users');
    } if(type == 'referal-requests'){
      this.selectedPage = 'referal-requests'
      this.router.navigateByUrl('admin/referal-requests');
    } if(type == 'models'){
      this.selectedPage = 'models'
      this.router.navigateByUrl('admin/models');
    } if(type == 'payments'){
      this.selectedPage = 'payments'
      this.router.navigateByUrl('admin/payments');
    } 
    if(type == 'admin-plans'){
      this.selectedPage = 'admin-plans'
      this.router.navigateByUrl('admin/plans');
    } 
    if(type == 'motor-packages'){
      this.selectedPage = 'motor-packages'
      this.router.navigateByUrl('admin/motor-packages');
    }
    
    if(type == 'terms'){
      this.selectedPage = 'terms'
      this.router.navigateByUrl('admin/terms');
    } 
    if(type == 'privacy'){
      this.selectedPage = 'privacy'
      this.router.navigateByUrl('admin/privacy');
    } 
    if(type == 'dataprotection'){
      this.selectedPage = 'dataprotection'
      this.router.navigateByUrl('admin/data-protection');
    } 
    if(type == 'make'){
      this.selectedPage = 'make'
      this.router.navigateByUrl('admin/make');
    } 
    if(type == 'terms'){
      this.selectedPage = 'terms'
      this.router.navigateByUrl('admin/terms');
    } 
    if(type == 'privacy'){
      this.selectedPage = 'privacy'
      this.router.navigateByUrl('admin/privacy');
    } 
    if(type == 'about'){
      this.selectedPage = 'about'
      this.router.navigateByUrl('admin/about-us');
    } 
    if(type == 'admin-percentage'){
      this.selectedPage = 'admin-percentage'
      this.router.navigateByUrl('admin/percentage');
    } 
    if(type == 'cms'){
      this.selectedPage = 'cms'
      this.router.navigateByUrl('admin/cms');
    } 
    if(type == 'carriers'){
      this.selectedPage = 'carriers'
      this.router.navigateByUrl('admin/carriers');
    } 

    if(type == 'categories'){
      this.selectedPage = 'categories'
      this.router.navigateByUrl('admin/categories');
    } 
    if(type == 'comments'){
      this.selectedPage = 'comments'
      this.router.navigateByUrl('admin/comments');
    } 
    if(type == 'blogs'){
      this.selectedPage = 'blogs'
      this.router.navigateByUrl('admin/blogs');
    } 
    
  }
}
