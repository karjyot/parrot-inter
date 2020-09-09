import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from "./../services/login.service";
import { Router } from "@angular/router";
import {CookieService} from 'angular2-cookie/core';
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-bank-info',
  templateUrl: './bank-info.component.html',
  styleUrls: ['./bank-info.component.css']
})
export class BankInfoComponent implements OnInit {

  constructor(private _cookieService:CookieService,private loginService: LoginService,private router : Router,private formBuilder: FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService,private translate: TranslateService) {}
  bankForm :FormGroup
  submitted = false
  bankaccount:any
  sortCode:any
  swiftCode:any
  bankName:any
  ibanCode:any
  ngOnInit() {
    this.bankaccount = this.loginService.getUserDetails().account;
    this.bankForm = this.formBuilder.group({ 
      name: ['', [Validators.required]],
      account:['',[Validators.required]],
      sortCode:[''],
      bank_name:['',[Validators.required]],
      swift_code:[''],
      iban_code:[''],
    
    });
  }
  bank(){
    this.submitted = true
    let message = this.translate.get('req')['value'];
    if(this.bankForm.invalid){
      this.toastr.error(message)
      return;
    }
    this.ngxService.start();
    this.bankForm.value.email = this.loginService.getUserDetails().email;
    this.loginService.saveBankInfo(this.bankForm.value,this.loginService.getUserDetails().id).subscribe((result:any) => {
      this.bankaccount = this.bankForm.value.account;
      this.sortCode = this.bankForm.value.sortCode
      this.bankName = this.bankForm.value.bank_name
      this.ibanCode = this.bankForm.value.iban_code
       this.swiftCode = this.bankForm.value.swift_code
      // this.bankName = this.bankForm.value.account


      let details = this.loginService.getUserDetails();
      details.account = this.bankaccount;
      details.sortCode = this.sortCode;
      details.bank_name = this.bankName;
      details.swift_code = this.swiftCode;
      details.iban_code = this.ibanCode;
      this.loginService.setUserDetails(details);
      let message = this.translate.get('bankSuccess')['value'];
      this.toastr.success(message);
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
