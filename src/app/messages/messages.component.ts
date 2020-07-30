import { Component, OnInit, Inject } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginService } from "./../services/login.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router,ActivatedRoute } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { WINDOW } from '@ng-toolkit/universal';
import {TranslateService} from '@ngx-translate/core';
declare var $ :any;
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  modalRef: BsModalRef | null;
  modalRef2:BsModalRef
  modalReply:BsModalRef
  userDetails : any;
  searchText:any;
  live:any;
  getMessages:any;
  currentMessage:any;
  messageForm: FormGroup;
  submittedMessage = false;
  selectedType = "recived";
  messageId  :any;
  getMessagesChat:any
  currentMessageID:any
  public messageData = { title:'',  description: '',fromId:'',toId:'' };
  loggedInDetails:any;
  selectedIndex: any;
  selectMessage:any;
  constructor(@Inject(WINDOW) private window: Window, private modalService: BsModalService,private loginService: LoginService,private formBuilder: FormBuilder,private router : Router, private ngxService: NgxUiLoaderService,private toastr: ToastrService,private activatedRoute: ActivatedRoute,private translate: TranslateService) {}

  ngOnInit() {

    this.disableClick();


    this.loggedInDetails = this.loginService.getUserDetails();
    this.messageForm = this.formBuilder.group({    
      title: ['',[Validators.required]],
      description: ['',[Validators.required]],
     
  });
  this.ngxService.start();
    this.userDetails = this.loginService.getUserDetails();
    this.loginService.getRecivedMessage( this.userDetails.id).subscribe(
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
        console.log(this.getMessages)
      this.ngxService.stop();
      },
      err => { 
      
        this.ngxService.stop();
        
      }
    )
    let fromId = this.activatedRoute.snapshot.paramMap.get('id'); 
    this.selectedIndex = fromId;
    if(fromId != 'custom'){
    this.loginService.getThreads(  this.userDetails.id,fromId).subscribe(
      res => {
       this.ngxService.stop();
       
      this.getMessagesChat = res['success'];
      setTimeout(()=>{  
        var objDiv = document.getElementById("chatsData");
        if(objDiv){
          objDiv.scrollTop = objDiv.scrollHeight;
        }
        
      }, 100);
      },
      err => { 
       this.ngxService.stop();
      }
    )
  }
  else{
    let message = this.translate.get('seeMsg')['value'];
    this.selectMessage = message;
  }
  }
  
disableClick(){
  $(this.window).scroll(function() {
    this.disable_click_flag = true;

    clearTimeout($.data(this, 'scrollTimer'));

    $.data(this, 'scrollTimer', setTimeout(function() {
        this.disable_click_flag = false;
    }, 250));
});

$("body").on("click", "a", function(e) {
    if( this.disable_click_flag ){
        e.preventDefault();
    }
});
}
messagesType(type){
  //this.selectMessage = null
  if(type == "recived"){
    this.selectedType = "recived";
    this.ngxService.start();
    this.loginService.getRecivedMessage( this.userDetails.id).subscribe(
      res => {
      this.getMessages = res['success'];
      this.getMessages.sort((val1, val2)=> {return <any> new Date(val2.creation_date) - <any> new 
        Date(val1.creation_date)})
      this.ngxService.stop();
      },
      err => { 
      
        this.ngxService.stop();
        
      }
    )
  }
  else{
    this.selectedType = "sent";
    this.ngxService.start();
    this.loginService.sentMessage( this.userDetails.id).subscribe(
      res => {
      this.getMessages = res['success'];
      this.getMessages.sort((val1, val2)=> {return <any> new Date(val2.creation_date) - <any> new 
        Date(val1.creation_date)})
      this.ngxService.stop();
      },
      err => { 
      
        this.ngxService.stop();
        
      }
    )


  }
 }
 getChatDetails(fromId){

  this.selectMessage = null
this.selectedIndex = fromId;
console.log(this.selectedIndex)
this.ngxService.start();
this.currentMessageID = fromId
let userDetails = this.loginService.getUserDetails();
this.loggedInDetails = userDetails
let loggedInID = userDetails.id;
this.loginService.getThreads(loggedInID,fromId).subscribe(
 res => {
  this.ngxService.stop();
 this.getMessagesChat = res['success'];
 setTimeout(()=>{  
  var objDiv = document.getElementById("chatsData");
  objDiv.scrollTop = objDiv.scrollHeight;
}, 100);
 },
 err => { 
  this.ngxService.stop();
 }
)
}

sendMessage(){
  console.log(this.selectedIndex)
  this.submittedMessage = true;
  if (this.messageData.description == "" || this.messageData.description == null) {
    let message = this.translate.get('req')['value'];
    this.toastr.error(message);
       return;
  }
  this.ngxService.start();
  this.messageData.fromId = this.loggedInDetails.id;
  if(!this.currentMessageID){
    this.messageData.toId = this.selectedIndex
  }else{
    this.messageData.toId = this.selectedIndex
  }


 
  this.loginService.sendMessage(this.messageData).subscribe((result) => {
   
    let message = this.translate.get('msg')['value'];
    this.toastr.success(message);
    this.ngxService.stop();
    this.messageData.description = "";
    
    this.loginService.getThreads(this.loggedInDetails.id, this.selectedIndex).subscribe(
      res => {
       this.ngxService.stop();
      this.getMessagesChat = res['success'];
      setTimeout(()=>{  
      var objDiv = document.getElementById("chatsData");
      objDiv.scrollTop = objDiv.scrollHeight;
    }, 100);
      },
      err => { 
       this.ngxService.stop();
      }
    )
  },
  err => {
    let message = this.translate.get('networkerr')['value'];
    this.toastr.error(message);
  this.ngxService.stop();

    
  }) 
 }

}
