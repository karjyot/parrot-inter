import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from "./../services/login.service";
import { Router } from "@angular/router";
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-vehicle-check',
  templateUrl: './vehicle-check.component.html',
  styleUrls: ['./vehicle-check.component.css']
})
export class VehicleCheckComponent implements OnInit {
  registration:any
  constructor(private _cookieService:CookieService,private loginService: LoginService,private router : Router,private formBuilder: FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService) {}

  ngOnInit() {
  }
  start(){
    console.log(this.registration)
    if(!this.registration){
      this.toastr.error("Please enter registration.")
      return
    }else{
      this.ngxService.start();
      this.loginService.vehicleCheck({registrationNumber:this.registration}).subscribe((result) => {
        this.loginService.setVehicleCheck(result['success'])
        this.router.navigateByUrl('/vehicle-details')
        this.ngxService.stop();
       }, (err) => {
        this.toastr.error('Vehicle Details not found.');
        this.ngxService.stop();
       });

    }
  }
}
