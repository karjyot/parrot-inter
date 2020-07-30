
import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from "./../services/login.service";
import { Router } from "@angular/router";
import {CookieService} from 'angular2-cookie/core';
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-confirmation-login',
  templateUrl: './confirmation-login.component.html',
  styleUrls: ['./confirmation-login.component.css']
})
export class ConfirmationLoginComponent implements OnInit {

  constructor(private _cookieService:CookieService,private loginService: LoginService,private router : Router,private formBuilder: FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService,private translate: TranslateService) {}

  ngOnInit() {
  }
  register(type){
    let details =  this.loginService.getsetSellerDetails();
    let countries =  this.loginService.getCountries();
    let currentCountry = this.loginService.getUserLocation().country
    details.country = this.filterCountrydata(countries,currentCountry);

    if(type == 'buyer'){
      this.ngxService.start();
      details.user_type = 'buyer'
      this.loginService.firstTimeSocial(details).subscribe(
        res => {
        
          this.loginService.setUserDetails(res['userDetails'][0])
          this.loginService.setToken(res['token']['token']);
          this.router.navigateByUrl('/bookmarks', {skipLocationChange: true}).then(()=>
          this.router.navigate(["/bookmarks"])); 
          this.ngxService.stop()         
        },
        err => {
          let message = this.translate.get('networkerr')['value'];
        this.toastr.error(message); 
        this.ngxService.stop();
        }
      );
    }else{
      this.ngxService.start();
      details.user_type = 'seller'
      this.loginService.firstTimeSocial(details).subscribe(
       
        res => {
          this.router.navigateByUrl('/my-ads')
          details.id = res['userDetails'][0].id;
          this.loginService.setToken(res['token']['token']);
          this.loginService.setUserDetails(details);
          this.ngxService.stop()         
        },
        err => {
          let message = this.translate.get('networkerr')['value'];
          this.toastr.error(message); 
        this.ngxService.stop();
        }
      );
     
    }
  }


  filterCountrydata(countries,currentCountry){

    for(var i=0; i<countries.length; i++){
      if(countries[i].country.toLowerCase() == currentCountry.toLowerCase()){
       return countries[i]
      }
    }

  }
}
