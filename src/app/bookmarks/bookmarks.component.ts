import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from "./../services/login.service";
import { Router } from "@angular/router";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})

export class BookmarksComponent implements OnInit {
  bookmarks:any;
  ads: any;
  p: number = 1;
  currentRow:any;
  isLogin:any;
  modal: BsModalRef | null;
  constructor(private modalService: BsModalService,private loginService: LoginService,private router : Router,private formBuilder: FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService,private translate: TranslateService) {}

  ngOnInit() {
    this.listData()
  }

  listData(){
    this.ngxService.start();
    this.loginService.getBookmarks(this.loginService.getUserDetails().id).subscribe((result) => {
     this.ads = result["success"]
     this.ads.sort((val1, val2)=> {return <any> new Date(val2.created_at) - <any> new 
      Date(val1.created_at)})
      this.ngxService.stop();
     }, (err) => {
      let message = this.translate.get('networkerr')['value'];
      this.toastr.error(message);
      this.ngxService.stop();
     });
  }
  confirmation(template:any,data,event){
    this.currentRow = data;
    this.modal= this.modalService.show(template, Object.assign({}, ));
  }
  deleteAd(){
    this.ngxService.start()
    this.loginService.deleteBookmark(this.currentRow).subscribe((result:any) => {
      let message = this.translate.get('remove')['value'];
      this.toastr.success(message);
  
     this.modal.hide()
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
}
