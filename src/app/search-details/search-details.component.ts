
import { NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery';
import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from "./../services/login.service";
import { Router,ActivatedRoute } from "@angular/router";
import {CookieService} from 'angular2-cookie/core';
import { Location } from '@angular/common';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { WINDOW } from '@ng-toolkit/universal';
import { Title, Meta } from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-search-details',
  templateUrl: './search-details.component.html',
  styleUrls: ['./search-details.component.css']
})
export class SearchDetailsComponent implements OnInit {
  urlShare:any;
  p: number = 1;
  modalRefShare:BsModalRef | null;
  modalRefAll:BsModalRef | null;
  modalRefMessage:BsModalRef | null;
  submitted = false
  messageForm : FormGroup
  ReportForm:FormGroup
  selectAdDetails:any
  modalRefReport:BsModalRef | null;
  constructor(@Inject(WINDOW) private window: Window, private modalService: BsModalService,private location: Location,private route: ActivatedRoute,private loginService: LoginService,private router : Router,private formBuilder: FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService,private titleService: Title,
  private meta: Meta,private translate: TranslateService) {}

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  adDetails :any;
  creatorID:any;
  userID:any;
  userIDAd:any;
  userAdsListed:any;
  contactForm: FormGroup;
  cmsData:any;
  ngOnInit(): void {  
    this.cmsData = this.loginService.getCms();
    this.messageForm = this.formBuilder.group({ 
      message:['',[Validators.required]],


    })
    this.ReportForm= this.formBuilder.group({ 
      report:['',[Validators.required]],


    })
    this.contactForm = this.formBuilder.group({ 
      name:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      phone:['',[Validators.required]],
      contact:[false],
      message:['',[Validators.required]],
      agree:['',[Validators.required]],
      vehicle:[false],
      test:[false],
      contactMe:[false],
      tradePossible:[false],


    })

    let id =  this.route.snapshot.params.id;
    this.creatorID = id
    this.userIDAd = this.route.snapshot.params.userId
    this.searchDetails(id)
    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAutoPlay :true,
        breakpoint :50,
        
      },
      { "imagePercent": 80, "thumbnailsPercent": 40 }
    ];
  }


  getUserAdsDetails(){
    this.ngxService.start();
  this.loginService.userAdsGet(this.userIDAd).subscribe((result) => {
    this.userAdsListed = result["success"]
    if(this.loginService.getUserDetails()){
      this.loginService.listBookMarksAll(this.loginService.getUserDetails().id).subscribe((result) => {
        let bookmarks = result['success'];

        for(var i=0; i<this.userAdsListed.length; i++){
          for(var j=0; j<bookmarks.length; j++){
            if(this.userAdsListed[i].id == bookmarks[j].ad_id){
              this.userAdsListed[i].isBookMark = true
            }
          }
        }
      })
    }
    this.ngxService.stop();
   
   }, (err) => {
    this.toastr.error('Network error occured.');
    this.ngxService.stop();
   });
  }

searchDetails(id){
  this.ngxService.start();
  this.galleryImages = [];
  this.loginService.adDetails(id).subscribe((result) => {
    let images =result['success'][0]['files'];
    this.adDetails = result['success'][0];
    this.userID = result['success'][0]['user_id']
    this.adDetails.eqpArr = JSON.parse(JSON.parse(this.adDetails.eqpArr));
    this.adDetails.eqpArrExtra = JSON.parse(JSON.parse(this.adDetails.eqpArrExtra));
    this.adDetails.eqpArrSaftey = JSON.parse(JSON.parse(this.adDetails.eqpArrSaftey));
    this.adDetails.eqpArrEnter = JSON.parse(JSON.parse(this.adDetails.eqpArrEnter));
    this.adDetails.lat = Number(this.adDetails.longi)
    this.adDetails.longi = Number(this.adDetails.lat)
    this.adDetails.exteriorColor = this.adDetails.exteriorColor.split('-')[0]

    if(this.adDetails.vehicleCond == 'Used'){
      this.titleService.setTitle('Parrot Auto Trader- Used ' + this.adDetails.make + ' '+this.adDetails.model );    
      //this.meta.updateTag({ name:'keywords',content:'angulartpoint.com'});  
    }else if(this.adDetails.vehicleCond == 'New'){
      this.titleService.setTitle('Parrot Auto Trader- New ' + this.adDetails.make + ' '+this.adDetails.model);    
    }

    for(var i=0;i<images.length; i++){
      this.galleryImages.push({small:images[i].image,medium:images[i].image,big:images[i].image})

    }
    if(this.loginService.getUserDetails()){
      this.loginService.bookmarkDetails(id,this.loginService.getUserDetails().id).subscribe((result) => {
        if(result['success'].length > 0){
          this.adDetails.isBookMark = true;
        }else{
          this.adDetails.isBookMark = false;
        }
        
  
      }) 
    }
    this.ngxService.stop();
   this.getUserAdsDetails();

   }, (err) => {
    this.toastr.error('Network error occured.');
    this.ngxService.stop();
   });
}
back(){
  this.location.back();
}
openShare(template: any,event,ad,id){
  //let title = this.replaceAll(ad.title, ' ', '-');
  this.urlShare  = location.origin + '/search-details'+'/'+ad.id + '/'+this.userIDAd;
  event.stopPropagation();
  this.modalRefShare = this.modalService.show(template);
 }

 openMessage(template: any,ad){
  this.selectAdDetails =ad
  if(this.loginService.getUserDetails()){
    if(this.loginService.getUserDetails().id == this.selectAdDetails.user_id){
      let message = this.translate.get('cant')['value'];
      this.toastr.error(message)
      return
     
    }
    this.modalRefMessage = this.modalService.show(template);
  }else{
    let message = this.translate.get('msgVal')['value'];
    this.toastr.error(message)
  }

 }

 openReport(template: any,ad){
  this.selectAdDetails =ad
  if(this.loginService.getUserDetails()){
    if(this.loginService.getUserDetails().id == this.selectAdDetails.user_id){
      let message = this.translate.get('repVal')['value'];
    this.toastr.error(message)
      return
     
    }
    this.modalRefReport = this.modalService.show(template);
  }else{
    let message = this.translate.get('rptAd')['value'];
    this.toastr.error(message)

  }

 }

 bookmark(ad,event){
  if(this.loginService.getUserDetails()){
    this.ngxService.start();
    let data = {
      adID:ad.id,
      userID: this.loginService.getUserDetails().id
    };
    this.loginService.bookmark(data).subscribe((result) => {
      let message = this.translate.get('added')['value'];
      this.toastr.success(message)
      this.adDetails.isBookMark = true;
      this.ngxService.stop();
     }, (err) => {

      this.toastr.error(err.error.error);
      this.ngxService.stop();
     });
  }else{
    let message = this.translate.get('bkm')['value'];
    this.toastr.error(message)
  }
 }




createContact(){
 this.contactForm.value.id =  this.userID
 this.contactForm.value.adID=  this.creatorID
  this.submitted = true
  if(this.contactForm.invalid){
    let message = this.translate.get('req')['value'];
    this.toastr.error(message)
    return
  }
    this.ngxService.start();
   
    this.loginService.sellerContact(this.contactForm.value).subscribe((result) => {
      let message = this.translate.get('msg')['value'];
      this.toastr.success(message)
      this.contactForm.reset()
      this.ngxService.stop();
     }, (err) => {
      this.ngxService.stop();
     });
 
//if(this.loginService.getUserDetails().id == this.creatorID)
 // this.toastr.error("you cannot send message yourself.")
}
get f() { return this.contactForm.controls; }
get fM() { return this.messageForm.controls; }
get fR() { return this.ReportForm.controls; }
sendMessage(){

  // this.toastr.error("you cannot send message yourself.")
  let data = {
    fromId:this.loginService.getUserDetails().id,
    toId:this.selectAdDetails.user_id,
    message:this.messageForm.value.message,
  }
  this.submitted = true
  if(this.messageForm.invalid){
    let message = this.translate.get('req')['value'];
    this.toastr.error(message)
    return
  }
  this.ngxService.start()
  this.loginService.messageUser(data).subscribe((result) => {
    let message = this.translate.get('msg')['value'];
    this.toastr.success(message)
    this.ngxService.stop();
    this.modalRefMessage.hide();
   }, (err) => {
    this.ngxService.stop();
   });


}
sendReport(){
  this.submitted = true
  if(this.ReportForm.invalid){
    let message = this.translate.get('req')['value'];
    this.toastr.error(message)
    return
  }
  this.ngxService.start()
  let data = {
    userID:this.loginService.getUserDetails().id,
    adID:this.creatorID,
    report:this.ReportForm.value.report
  }
  this.loginService.reportAD(data).subscribe((result) => {
    this.toastr.success("Report added succesfully.")
    this.ngxService.stop();
    this.modalRefMessage.hide();
   }, (err) => {
    this.ngxService.stop();
   });
}
sendEmail(email){
  this.window.location.href = "mailto:"+email;
}
otherDetails(id,event,userId){
  if(this.modalRefAll){
    this.modalRefAll.hide();
  }
  this.router.navigateByUrl('/register', {skipLocationChange: true}).then(()=>
    this.router.navigate(["/search-details/"+id + '/'+this.userIDAd])); 

}
viewAll(template){
  this.modalRefAll = this.modalService.show(template,Object.assign({}, { class: 'gray modal-lg allAds' })
  );
}
viewDetails(){
  let id = this.userID;
  let userId = this.userIDAd
  this.router.navigateByUrl("/dealer-details/"+this.creatorID + '/'+this.userID)

}
}