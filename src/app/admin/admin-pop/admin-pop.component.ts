import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { AdminService } from "./../../admin/services/admin.service";

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-admin-pop',
  templateUrl: './admin-pop.component.html',
  styleUrls: ['./admin-pop.component.css']
})
export class AdminPopComponent implements OnInit {
  modalRef: BsModalRef | null;
  public data = {content:""}
  modalRefStatus:BsModalRef | null;
postStatus = "";
status= "";
id:any
statustext:any
  constructor(private adminService: AdminService,private modalService: BsModalService,private formBuilder:FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService,private router : Router,) { }
  ngOnInit() {
    this.ngxService.start()
    this.adminService.getPOP().subscribe(
      res => {
      this.statustext =  res['success'][0]['status']
      this.id =  res['success'][0]['id']
        let terms = res['success'][0]['content'];
        this.data.content = terms;
       this.ngxService.stop()
      },
      err => { 
        this.ngxService.stop()
        
      }
    )
  }
updateTerms(template:any){

  this.modalRef = this.modalService.show(template,
    Object.assign({}, { class: 'gray modal-lg' })
  );
}

confirm(){
  this.ngxService.start();
  this.adminService.addPop(this.data).subscribe((result) => {
  
    this.router.navigateByUrl('admin/homepage-pop');
    this.ngxService.stop();
    this.modalRef.hide(); 
  
   }, (err) => {
   
    this.ngxService.stop();
    
   });        

}
changePostStatus(status,template:any,id){
  this.id = id
  this.status = status
  this.postStatus = status
  this.modalRefStatus = this.modalService.show(template)
}

confirmChangeStatus(){
  this.ngxService.start()
  this.adminService.changePostStatusPOP( this.id,this.status).subscribe(
    res => {
      this.ngxService.stop()
      this.modalRefStatus.hide();
      this.router.navigateByUrl('admin/dashboard', {skipLocationChange: true}).then(()=>
      this.router.navigate(["admin/homepage-pop"]));
    },
    err => { 
     
      
    }
  )
}
}
