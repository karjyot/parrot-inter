import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from "./../services/login.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-my-plans',
  templateUrl: './my-plans.component.html',
  styleUrls: ['./my-plans.component.css']
})
export class MyPlansComponent implements OnInit {
  userPlan : any;
  constructor(private loginService: LoginService,private router : Router,private formBuilder: FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService) {}


  ngOnInit() {
    this.ngxService.start();
    this.loginService.getUserPlans(this.loginService.getUserDetails().id).subscribe((result) => {
     this.userPlan = result["success"][0];
  
      this.ngxService.stop();
     }, (err) => {
      this.toastr.error('Network Error Occured');
      this.ngxService.stop();
     });
  }

}
