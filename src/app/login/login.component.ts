
import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from "./../services/login.service";
import { Router } from "@angular/router";
import {CookieService} from 'angular2-cookie/core';
import {TranslateService} from '@ngx-translate/core';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login-v2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup
  submitted = false

  constructor(private socialAuthService: AuthService,private _cookieService:CookieService,private loginService: LoginService,private router : Router,private formBuilder: FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService,private translate: TranslateService) {}

  ngOnInit() {

    if(this.loginService.isLoggedIn()){
      this.router.navigateByUrl('/my-ads');
    }
    
    this.loginForm = this.formBuilder.group({ 
        email: ['', [Validators.required,Validators.email]],
        password:['',[Validators.required]],
        rememberme:[]
      });
      let cookies = String(this._cookieService.get('remember'));
    if(cookies == "true") {
      this.loginForm.controls['email'].setValue(this._cookieService.get('username'));
      this.loginForm.controls['password'].setValue(this._cookieService.get('password'));
      this.loginForm.controls['rememberme'].setValue(this._cookieService.get('remember'));
   
   }
    }

  login(){
    this.submitted = true;
    this._cookieService.put('username',this.loginForm.get('email').value);
    this._cookieService.put('password',this.loginForm.get('password').value);
    this._cookieService.put('remember',this.loginForm.get('rememberme').value);
    if (this.loginForm.invalid) {
      let message = this.translate.get('req')['value'];
       this.toastr.error(message)
        return;
    }
    this.ngxService.start();
    this.loginService.login(this.loginForm.value).subscribe((result) => {
      this.loginService.setUserDetails(result['userData'])
      this.loginService.setToken(result['token']);
      if(result['userData'].user_type == 'seller'){
        this.router.navigateByUrl('/my-ads');
      }else{
        this.router.navigateByUrl('/bookmarks');
      }
     
      this.ngxService.stop();
     }, (err) => {
      let message = this.translate.get('invalid')['value'];
      this.toastr.error(message);
      this.ngxService.stop();
     });
   
  } 

  socialLogin(socialPlatform : string){
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
  
        let str = userData.name;
        var res = str.split(" ");
        var socialName = res[0];
       
        var name = socialName
        var email = userData.email
        var image = userData.image
        var password = userData.id
        let data = {"name":name,"email":email,"image":image,"password":password,"token":userData.token}


        this.ngxService.start();
        this.loginService.registerSocial(data).subscribe(
          res => {
          if(res['success'] != 'firstTime'){
            this.loginService.setUserDetails(res['userDetails'][0])
            this.loginService.setToken(res['token']['token']);
            if(res['userDetails'][0].user_type == "seller"){
              this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
              this.router.navigate(["/my-ads"])); 
            }else{
              this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
              this.router.navigate(["/bookmarks"])); 
            }
          
            this.ngxService.stop();
          }else{
            this.ngxService.stop();
            this.loginService.setSellerDetails(data)
            this.router.navigateByUrl('/confirmation')
          }
                    
          
          },
          err => {
            let message = this.translate.get('alreadyRegisterd')['value'];
          this.toastr.error(message); 
          this.ngxService.stop();
          }
        );
        
      }
    );
  }
  get f() { return this.loginForm.controls; }

}