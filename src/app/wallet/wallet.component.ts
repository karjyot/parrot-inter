import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from "./../services/login.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  wallet : any
  totalAmount:any;
  usedAmount : any;
  remaining:any
  userDetails:any
  constructor(private loginService: LoginService,private router : Router,private formBuilder: FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService) {}

  ngOnInit() {
    this.ngxService.start();
   this.userDetails = JSON.parse(this.loginService.getUserDetails().countryObj)
    this.loginService.getWalletSummary(this.loginService.getUserDetails().id).subscribe((result:any) => {
      this.wallet = result['success'];
      let used = result['used'];
      let total = 0;
      let totalUsed = 0;
      for(var i=0; i<this.wallet.length; i++){
        total = Number(total) + parseFloat(this.wallet[i].amount);
      }

      for(var i=0; i<used.length; i++){
        totalUsed = Number(totalUsed) + parseFloat(used[i].amount);
      }
      this.totalAmount = total;
      this.usedAmount = totalUsed;

      this.remaining = total -  totalUsed;
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
  withdrawRequest(remaining){
    if(!this.loginService.getUserDetails().account){
      this.toastr.error("Plase add your account number.");
      return;
    }
    if(remaining > 0){
      this.ngxService.start();
    this.loginService.withdrawRequest(this.loginService.getUserDetails().id,{amount:remaining}).subscribe((result:any) => {
      this.toastr.success("Your payment request has been submtted successfully.");
      this.router.navigateByUrl('/payments-requests')
      this.ngxService.stop();
      },(err) => {
       try{
         let errMessage = err["error"]["message"];
         this.toastr.error(errMessage);
        }catch(e){
 
        }
        this.ngxService.stop();
       })

    }else{
      this.toastr.error("Your wallet doest not have sufficient amount.");
       
    }
    
    
  }

}
