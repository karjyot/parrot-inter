import { Component, OnInit, Inject } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router,NavigationEnd  } from "@angular/router";
import { LoginService } from "./../services/login.service";
import { WINDOW } from '@ng-toolkit/universal';
@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {
  privacy:any;
  constructor(@Inject(WINDOW) private window: Window, private toastr: ToastrService,private router : Router, private loginService: LoginService,private ngxService: NgxUiLoaderService, private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      this.window.scrollTo(0, 0)
  });

    this.ngxService.start()
    this.loginService.privacy().subscribe(
      res => {
      //  console.log(res['success'])
        if(res['success'].length > 0){
       this.privacy = res['success'][0]['content'];
        }
     
       
       this.ngxService.stop()
      },
      err => { 
        this.ngxService.stop()
        
      }
    )
  }

}
