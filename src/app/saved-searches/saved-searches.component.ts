
import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from "./../services/login.service";
import { Router } from "@angular/router";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-saved-searches',
  templateUrl: './saved-searches.component.html',
  styleUrls: ['./saved-searches.component.css']
})
export class SavedSearchesComponent implements OnInit {
  adsSearches:any
  p: number = 1;
  currentRow:any;
  isLogin:any;
  modal: BsModalRef | null;
  constructor(private modalService: BsModalService,private loginService: LoginService,private router : Router,private formBuilder: FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService) {}

  ngOnInit() {
    this.ngxService.start();
     let id = this.loginService.getUserDetails().id;
     this.loginService.getSavedSearches(id).subscribe((result) => {
     this.adsSearches = result["success"];
      this.ngxService.stop();
     }, (err) => {
      this.toastr.error('Network error occured.');
      this.ngxService.stop();
     });
   
  }
  details(data,event){
    this.loginService.setSearchData(JSON.parse(data.tags));
    this.router.navigateByUrl("/search/"+data.type)
  }

  confirmation(template:any,data,event){
    this.currentRow = data;
    this.modal= this.modalService.show(template, Object.assign({}, ));
  }
  deleteAd(){
    this.ngxService.start()
    this.loginService.deleteSearch(this.currentRow).subscribe((result:any) => {
     this.modal.hide();
     this.toastr.success("Search deleted successfully.")
     this.ngxService.start();
     let id = this.loginService.getUserDetails().id;
     this.loginService.getSavedSearches(id).subscribe((result) => {
     this.adsSearches = result["success"];
      this.ngxService.stop();
     }, (err) => {
      this.toastr.error('Network error occured.');
      this.ngxService.stop();
     });
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

}
