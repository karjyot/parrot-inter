import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from "./../services/login.service";
import { Router } from "@angular/router";
import {CookieService} from 'angular2-cookie/core';


@Component({
  selector: 'app-vehicle-valuation',
  templateUrl: './vehicle-valuation.component.html',
  styleUrls: ['./vehicle-valuation.component.css']
})
export class VehicleValuationComponent implements OnInit {
  registration:any
  constructor(private _cookieService:CookieService,private loginService: LoginService,private router : Router,private formBuilder: FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService) {}
  mileage:any;
  ngOnInit() {
  }
  start(){
    console.log(this.registration)
    if(!this.registration){
      this.toastr.error("Please enter registration.")
      return
    }else if(!this.mileage){
      this.toastr.error("Please enter mileage.")
      return
    }else{
      this.ngxService.start();
      this.loginService.mileageCheck({registrationNumber:this.registration,mileage:this.mileage}).subscribe((result) => {
        
        console.log(result)
        //this.loginService.setVehicleCheck(result['success'])
      //  this.router.navigateByUrl('/vehicle-details')
        this.ngxService.stop();
       }, (err) => {
         console.log(err)
        this.toastr.error('Vehicle Details not found.');
        this.ngxService.stop();
       });

    }
  }
}
