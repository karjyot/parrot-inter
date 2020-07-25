
import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from "./../services/login.service";
import { Router } from "@angular/router";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.component.html',
  styleUrls: ['./my-ads.component.css']
})
export class MyAdsComponent implements OnInit {
  ads:any
  p: number = 1;
  currentRow:any;
  isLogin:any;
  modal: BsModalRef | null;
  constructor(private modalService: BsModalService,private loginService: LoginService,private router : Router,private formBuilder: FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService) {}

  ngOnInit() {
  this.listData();
   
  }
  listData(){
    this.ngxService.start();
    let userID = this.loginService.getUserDetails().id;
    this.loginService.userAdsGet(userID).subscribe((result) => {
      this.ads = result["success"];
      this.ads.sort((val1, val2)=> {return <any> new Date(val2.created_at) - <any> new 
        Date(val1.created_at)})
      this.ngxService.stop();
     }, (err) => {
      this.ngxService.stop();
     });
  }
  createAd(){
    this.router.navigateByUrl("/plans")
  }
  confirmation(template:any,data,event){
    this.currentRow = data;
    this.modal= this.modalService.show(template, Object.assign({}, ));
  }
  deleteAd(){
    this.ngxService.start()
    this.loginService.deleteAd(this.currentRow).subscribe((result:any) => {
     this.modal.hide();
     this.toastr.success("Ad deleted successfully.")
      this.listData()
       this.ngxService.stop()
      },(err) => {
       try{
         let errMessage = err["error"]["message"];
         //this.toastr.error(errMessage);
        }catch(e){
 
        }
        this.ngxService.stop();
       })
  }
  details(id,event){
    this.router.navigateByUrl("/search-details/"+id+'/'+this.loginService.getUserDetails().id)

  }
  editAd(id,event){
    this.router.navigateByUrl("/edit-ad/"+id)
  }
}
