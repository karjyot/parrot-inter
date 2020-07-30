import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from "./../services/login.service";
import { Router } from "@angular/router";
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm : FormGroup
  submitted = false
  constructor(private loginService: LoginService,private router : Router,private formBuilder: FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService,private translate: TranslateService) {}
  ngOnInit() {
    if(this.loginService.isLoggedIn()){
      this.router.navigateByUrl('/dashboard');
    }
    this.forgotForm = this.formBuilder.group({ 
      email: ['', [Validators.required,Validators.email]],
    });
  }

  forgot(){
    this.submitted = true;
    if (this.forgotForm.invalid) {
      let message = this.translate.get('req')['value'];
      this.toastr.error(message)
        return;
    }
    this.ngxService.start();
    let email = this.forgotForm.get('email').value
    this.loginService.forgotPassword({email:email}).subscribe((result:any) => {
      let message = this.translate.get('verificationLink')['value'];
      this.toastr.success(message);
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
  get f() { return this.forgotForm.controls; }

}
