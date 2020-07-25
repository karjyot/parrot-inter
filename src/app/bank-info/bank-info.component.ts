import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from "./../services/login.service";
import { Router } from "@angular/router";
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-bank-info',
  templateUrl: './bank-info.component.html',
  styleUrls: ['./bank-info.component.css']
})
export class BankInfoComponent implements OnInit {

  constructor(private _cookieService:CookieService,private loginService: LoginService,private router : Router,private formBuilder: FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService) {}
  bankForm :FormGroup
  submitted = false
  bankaccount:any
  sortCode:any
  ngOnInit() {
    this.bankaccount = this.loginService.getUserDetails().account;
    this.bankForm = this.formBuilder.group({ 
      name: ['', [Validators.required]],
      account:['',[Validators.required]],
      sortCode:['',[Validators.required]],
    
    });
  }
  bank(){
    this.submitted = true
    if(this.bankForm.invalid){
      this.toastr.error("Please fill requierd Information")
      return;
    }
    this.ngxService.start();
    this.bankForm.value.email = this.loginService.getUserDetails().email;
    this.loginService.saveBankInfo(this.bankForm.value,this.loginService.getUserDetails().id).subscribe((result:any) => {
      this.bankaccount = this.bankForm.value.account;

      let details = this.loginService.getUserDetails();
      details.account = this.bankaccount;
      details.sortCode = this.sortCode;
      this.loginService.setUserDetails(details);
      this.toastr.success("Your bank details updated succesfully.");
     // this.router.navigateByUrl('/payments-requests')
      this.ngxService.stop();
      },(err) => {
       try{
         let errMessage = err["error"]["message"];
         this.toastr.error(errMessage);
        }catch(e){
 
        }
        this.ngxService.stop();
       })

  }
  get f() { return this.bankForm.controls; }
}
