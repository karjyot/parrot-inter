import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { LoginService } from "./../../services/login.service";
import { Router,NavigationEnd } from "@angular/router";
import {CookieService} from 'angular2-cookie/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Location } from '@angular/common';
import {filter} from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core'; 
declare var $ :any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin : any;
  currentUrl:any;
  imageUrl:any;
  details:any
  
  modalRefConfirmEmail = null;
  serverErrorMessages:"";
  isLoggedIn:any;
  submittedForget = false;
  unreadMessage :any;
  notifications:any;
  notificationsList:any;
  intervalId:any;
  getMessages:any;
  currentMessage:any;
  showMessages = false
  showNotifications = false
  live:any;
  cmsData:any;
  constructor(public translate: TranslateService, private location: Location,private _cookieService:CookieService,private modalService: BsModalService,private loginService: LoginService,private router : Router,private formBuilder: FormBuilder,private toastr: ToastrService) {
    this.subscribeRouterEvents(); 
    
    let userDetails = this.loginService.getUserDetails();
    translate.addLangs(['en', 'french','germany','spanish']);  
    if (localStorage.getItem('locale')) {  
      const browserLang = localStorage.getItem('locale');  
      translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');  
    } else {  
      localStorage.setItem('locale', 'en');  
      translate.setDefaultLang('en');  
    }  
    // if(userDetails){
    //   this.intervalId = setInterval(() => {
    //     this.getUnreadMessage(userDetails.id);
       
    //   }, 5000);
    // }
  }
  changeLang(language: string) {  
    localStorage.setItem('locale', language);  
    this.translate.use(language);  
  }  
  subscribeRouterEvents = () => {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(() => {
    this.currentUrl = this.router.url;
    this.isLogin = this.loginService.isLoggedIn();
    this.details = this.loginService.getUserDetails();
    if(this.details){
      this.imageUrl = this.details.image;
      this.details.name = this.details.name.split('')[0]
    }
    })
  }
  ngOnInit() {
    this.cmsData = this.loginService.getCms();
    $("#messageNumber").hide();
    this.currentUrl = this.router.url;
    this.isLogin = this.loginService.isLoggedIn();
    this.details = this.loginService.getUserDetails();
    if(this.details){
      this.imageUrl = this.details.image;
      this.details.name = this.details.name.split(' ')[0]
    }
  }
  ngAfterViewInit(){
    this.loginService.imageUrl$.subscribe((data) => {
     this.imageUrl = data;
})
this.loginService.userType$.subscribe((data) => {
  this.details.user_type = data;
})
this.loginService.updateMessage$.subscribe((data) => {
    
  let userDetails = this.loginService.getUserDetails();
  if(userDetails){
    this.getUnreadMessage(userDetails.id)
  }
 

});
 let userDetails = this.loginService.getUserDetails()
 if(userDetails){
  this.getUnreadMessage(userDetails.id);
  
   this.getMessagesData();
  
 }


}
getUnreadMessage(id){

  this.loginService.getUnreadMessage(id).subscribe(
    res => {
     
      if(res['success'].length == 0){
        this.unreadMessage = "";
      }else{
        this.unreadMessage = res['success'].length;
      }
      this.showMessages = true;
      $("#messageNumber").show();
     
   this.loginService.setUnreadMessages(this.unreadMessage)
    },
    err => { 
    }
  )
 }
  logout(){
    this.loginService.deleteToken();
    this.loginService.deleteUserDetails();
    this.isLogin = false;
    this.loginService.deleteCurr();
    this.loginService.sendLogout(false); 
    this.router.navigateByUrl('/register', {skipLocationChange: true}).then(()=>
    this.router.navigate(["/"])); 
   }
  usedCars(){
  let  data = {
    used:"Used",
    countryName:this.loginService.getUserLocation().country
   // type:"car"
  }
  this.loginService.setSearchData(data);
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
  this.router.navigate(['search/car']));
  
  }
  newCars(){
    let  data = {
      new:"New",
      countryName:this.loginService.getUserLocation().country
    }
    this.loginService.setSearchData(data);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['search/car']));
  }
  bike(){
    let  data = {
     // new:"New",
    //  type:"bike"
    countryName:this.loginService.getUserLocation().country
    }
    this.loginService.setSearchData(data);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['search/bike']));
  }
  back(){
    this.location.back();
  }
  toggleMessages(){
    this.getMessagesData();
    this.isLoggedIn = this.loginService.getUserDetails(); 
    let data = {userId:this.isLoggedIn.id}
    this.loginService.updateMessageStatus(data).subscribe(
      res => {
        this.loginService.messageData('messageUpdated')
      },
      err => {
      }
    );
    $('#messages').toggle();
    
   }
   getMessagesData(){
    //this.ngxService.start();
    let userDetails = this.loginService.getUserDetails();
    this.loginService.getRecivedMessage( userDetails.id).subscribe(
      res => {
      var dataRes= res['success'];
     
      this.getMessages = Object.values(dataRes.reduce((a, {id, creation_date,...rest}) => {
        if (a[id]) {
          if (a[id].creation_date < creation_date) a[id] = {id, creation_date,...rest};
        } else a[id] = {id, creation_date,...rest};
        
        return a;
      }, {}));

      this.getMessages.sort((val1, val2)=> {return <any> new Date(val2.creation_date) - <any> new 
        Date(val1.creation_date)})
     // this.ngxService.stop();
      },
      err => { 
      
       // this.ngxService.stop();
        
      }
    )
   }
   viewMessage(message) {
    $('#messages').hide();
    $('#messagesMobile').hide();
    $('#notfy').hide();
    this.router.navigateByUrl('/register', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/messages/'+message.id])); 

    let userDetails = this.loginService.getUserDetails();
    let data = {messageId:message.messageId,userId:userDetails.id}
    this.loginService.updateMessageStatus(data).subscribe(
      res => {
        this.loginService.messageData('messageUpdated')
      },
      err => {
      }
    );
  this.currentMessage = message;
  //  this.modalRefMessage = this.modalService.show(
  //   template,
  //   Object.assign({}, { class: 'gray modal-lg' })
  // );

   
  }

   
}
