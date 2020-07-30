import { Component, OnInit, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router,NavigationEnd } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from "./../services/login.service";
import { WINDOW } from '@ng-toolkit/universal';
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(@Inject(WINDOW) private window: Window, private toastr: ToastrService,private router : Router, private ngxService: NgxUiLoaderService, private formBuilder:FormBuilder,private loginService: LoginService,private translate: TranslateService) { }
  submitted = false;
  contactForm: FormGroup;
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      this.window.scrollTo(0, 0)
  });
    this.contactForm = this.formBuilder.group({    
      name: ['', [Validators.required]],
        email: ['', [Validators.required,Validators.email]],
         message: ['', [Validators.required]],
  });
  }
  contact(){
   
    this.submitted = true;
    if (this.contactForm.invalid) {
      let message = this.translate.get('req')['value'];
 
         this.toastr.error(message);
            return;
      }
      this.ngxService.start();
      this.loginService.contact(this.contactForm.value).subscribe((result) => {
        let message = this.translate.get('msg')['value'];
        this.toastr.success(message);
        this.contactForm.reset();
        this.ngxService.stop();  
         }, (err) => {
         
          this.ngxService.stop();  
         });

  }
  get f() { return this.contactForm.controls; }
}
