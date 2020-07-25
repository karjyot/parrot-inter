import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MustMatch } from './../helpers/must-match.validator';
import { LoginService } from "./../services/login.service";
import { Router,ActivatedRoute } from "@angular/router";
//import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login-v2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  addUserForm : FormGroup
  submitted = false;
  countries:any;
  //modal: BsModalRef | null;
  referalCode : any;
 countryObj:any
  constructor(private socialAuthService: AuthService,private route: ActivatedRoute,private router : Router,private loginService: LoginService,private formBuilder: FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService) {}

  ngOnInit() {
    this.referalCode =this.route.snapshot.queryParams['code']
  //console.log(this.referalCode)
    if(this.loginService.isLoggedIn()){
      this.router.navigateByUrl('/my-ads');
    }
    this.addUserForm = this.formBuilder.group({ 

      name: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
      c_password: ['',Validators.required],
      type:['buyer',Validators.required],
      terms:['',Validators.required],
      phone:['',Validators.required],
      country:['',Validators.required],
      website:[''],
    },{
      validator: MustMatch('password', 'c_password')
  });
    
  this.getCountries();
  }

  addUser(){

    this.submitted = true;
    if (this.addUserForm.invalid) {
      console.log("dsadsa")
      this.toastr.error("Please fill the required information.")
        return;
    }
    if(this.referalCode){
      this.addUserForm.value.referalCode = this.referalCode
    }
    this.addUserForm.value.countryObj = this.countryObj
    this.ngxService.start();
     this.loginService.registerUser(this.addUserForm.value).subscribe((result) => {
      this.toastr.success('Email Verification link has been sent to your email id');
      this.ngxService.stop();
      this.router.navigateByUrl("/login")
     }, (err) => {
      this.toastr.error('Email already exists.', 'Error');
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
          console.log(err)
          this.toastr.error('You already registerd with PAT.'); 
          this.ngxService.stop();
          }
        );
        
      }
    );
  }

  getCountries(){
    this.ngxService.start();
    this.loginService.countries().subscribe((result:any) => {
      this.countries = result['message']
      this.ngxService.stop();
    
      },(err) => {

        this.ngxService.stop();
       })
  }
  
  filterCountrydata(){

    for(var i=0; i<this.countries.length; i++){
      if(this.countries[i].country == this.addUserForm.value.country){
       this.countryObj = this.countries[i]
        break; 
      }
    }

  }
  get f() { return this.addUserForm.controls; }
}
