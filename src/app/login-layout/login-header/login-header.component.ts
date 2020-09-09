import { Component, OnInit } from '@angular/core';
import { LoginService } from "./../../services/login.service";
import { NavigationEnd,Router } from "@angular/router";
import {filter} from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
declare var $ :any;
@Component({
  selector: 'app-login-header',
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.css']
})
export class LoginHeaderComponent implements OnInit {
  isLogin : any;
  currentUrl:any;
  imageUrl:any;
  details:any;
  modalRefConfirmEmail = null;
  serverErrorMessages:"";
  isLoggedIn:any;
  live:any;
  submittedForget = false;
  unreadMessage:any
  notifications:any;
  notificationsList:any;
  intervalId:any;
  getMessages:any;
  currentMessage:any;
  showMessages = false
  showNotifications = false
  constructor(private ngxService: NgxUiLoaderService,private loginService: LoginService,private router: Router) { }
  ngOnInit() {
   // this.unreadMessage = "";
   console.log(this.unreadMessage)
    $("#messageNumber").hide();
    this.isLogin = this.loginService.isLoggedIn();
    this.details = this.loginService.getUserDetails();

    if(this.details){
      this.imageUrl = this.details.image;
     
    }

    this.subscribeRouterEvents();
    let userDetails = this.loginService.getUserDetails();
    if(userDetails){
      clearInterval(this.intervalId);
      this.intervalId = setInterval(() => {
      //  
        this.getUnreadMessage(userDetails.id);
       
      }, 20000);
    }
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
  ngAfterViewInit(){
    this.loginService.imageUrl$.subscribe((data) => {
     this.imageUrl = data;
})
this.loginService.userName$.subscribe((data) => {
  this.details.name = data;
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
  subscribeRouterEvents = () => {
    $('.btn-toggle-fullwidth').on('click', function() {
      if(!$('body').hasClass('layout-fullwidth')) {
        $('body').addClass('layout-fullwidth');
  
      } else {
        $('body').removeClass('layout-fullwidth');
        $('body').removeClass('layout-default'); // also remove default behaviour if set
      }
  
      $(this).find('.lnr').toggleClass('lnr-arrow-left-circle lnr-arrow-right-circle');

    });
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
