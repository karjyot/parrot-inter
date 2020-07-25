import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from "./../services/login.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-payment-requests',
  templateUrl: './payment-requests.component.html',
  styleUrls: ['./payment-requests.component.css']
})
export class PaymentRequestsComponent implements OnInit {

  wallet : any
  totalAmount:any;
  usedAmount : any;
  remaining:any
  constructor(private loginService: LoginService,private router : Router,private formBuilder: FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService) {}

  ngOnInit() {
    this.ngxService.start();
    this.loginService.getPaymentRequests(this.loginService.getUserDetails().id).subscribe((result:any) => {
      this.wallet = result['success'];
      
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

}
