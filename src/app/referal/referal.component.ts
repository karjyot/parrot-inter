import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from "./../services/login.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-referal',
  templateUrl: './referal.component.html',
  styleUrls: ['./referal.component.css']
})
export class ReferalComponent implements OnInit {

  referalForm : FormGroup
  submitted = false
  referalLink:any
  perPage = 5;
  p = 1;
  ref:any
  constructor(private loginService: LoginService,private router : Router,private formBuilder: FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService) {}
  ngOnInit() {
    
    this.referalLink =  location.protocol + '//parrotautotrader.co.uk/register?code='+this.loginService.getUserDetails().referal_code
    this.referalForm = this.formBuilder.group({ 
      email: ['', [Validators.required,Validators.email]],
    });
    this.ngxService.start();
    this.loginService.listUserReferencese(this.loginService.getUserDetails().id).subscribe((result:any) => {
     this.ref = result['success']
      this.ngxService.stop();
      },(err) => {
      
        this.ngxService.stop();
       })
  }

  forgot(){
    this.submitted = true;
    if (this.referalForm.invalid) {
      this.toastr.error("Please fill the required information.")
        return;
    }
    this.ngxService.start();
    let email = this.referalForm.get('email').value
    this.loginService.referal({email:email,userId:this.loginService.getUserDetails().id}).subscribe((result:any) => {
      this.toastr.success("Signup link has been sent to email id.");
      this.ngxService.stop();
      },(err) => {
       try{
        this.toastr.error("This email id already registered with PAT.");
        }catch(e){
 
        }
        this.ngxService.stop();
       })

  }
  copyText(){
    this.toastr.success("Link copy successfully!")
  }

  get f() { return this.referalForm.controls; }

}