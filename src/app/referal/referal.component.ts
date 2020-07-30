import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from "./../services/login.service";
import { Router } from "@angular/router";
import {TranslateService} from '@ngx-translate/core';

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
  constructor(private loginService: LoginService,private router : Router,private formBuilder: FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService,private translate: TranslateService) {}
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
      let message = this.translate.get('req')['value'];
      this.toastr.error(message)
        return;
    }
    this.ngxService.start();
    let email = this.referalForm.get('email').value
    this.loginService.referal({email:email,userId:this.loginService.getUserDetails().id}).subscribe((result:any) => {
      let message = this.translate.get('signupLink')['value'];
      this.toastr.success(message);
      this.ngxService.stop();
      },(err) => {
       try{
        let message = this.translate.get('alreadyRegisterd')['value'];
        this.toastr.error(message);
      
        }catch(e){
 
        }
        this.ngxService.stop();
       })

  }
  copyText(){
    let message = this.translate.get('cpy')['value'];
    this.toastr.success(message)
  }

  get f() { return this.referalForm.controls; }

}