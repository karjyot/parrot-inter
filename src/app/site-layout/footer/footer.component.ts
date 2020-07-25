import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginService } from "./../../services/login.service";
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  cmsData:any
  email:any
  constructor(private modalService: BsModalService,private loginService: LoginService,private toastr: ToastrService,private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
    this.cmsData = this.loginService.getCms();
    
  }
  subscribe(){
    // var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
    // if(!pattern.test(this.email)){
    //   this.toastr.error("Please enter valid email address.")
    //   return;
    // }
    this.ngxService.start();
    this.loginService.subscribeEmail({email:this.email}).subscribe((result) => {
      this.email = "";
      this.toastr.success("Please check your email for email subscription.")
      this.ngxService.stop();
     }, (err) => {
      this.toastr.error("You have already subscribed")
      this.ngxService.stop();
     });
  
  }

}
