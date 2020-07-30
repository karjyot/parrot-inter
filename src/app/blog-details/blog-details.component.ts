import { Component, OnInit } from '@angular/core';

import { LoginService } from "./../services/login.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from './../helpers/must-match.validator';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Location } from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  comment:any
  constructor(private location: Location,private route: ActivatedRoute,private router : Router,private formBuilder: FormBuilder,private loginService: LoginService,private toastr: ToastrService,private ngxService: NgxUiLoaderService,private translate: TranslateService) { }
  blogData:any;
  blogId:any;
  blogComments:any;
  userDetails:any;
  ngOnInit() {
    this.ngxService.start();
    this.userDetails = this.loginService.getUserDetails();
    let id =  this.route.snapshot.params.id;
    this.blogId = id
    this.loginService.blogDetails(id).subscribe((result) => {

    this.blogData = result["success"];
    this.loginService.listComments(id).subscribe((result) => {
      
      this.blogComments = result["success"];
      this.blogComments.sort((val1, val2)=> {return <any> new Date(val2.created_at) - <any> new 
        Date(val1.created_at)})
        this.ngxService.stop();
       }, (err) => {
    
        this.ngxService.stop();
       });

     }, (err) => {
  
      this.ngxService.stop();
     });
  }
  back(){
    this.location.back();
  }
  addComment(){
    if(!this.loginService.getUserDetails()){
      let message = this.translate.get('blogEr')['value'];
      this.toastr.error(message);
      return
    }
    if(!this.comment){
      let message = this.translate.get('enterComment')['value'];
      this.toastr.error(message);
      return
    }
    
    this.ngxService.start();   
    this.loginService.addCommentBlog({blogId:this.blogId,comment:this.comment,userId:this.loginService.getUserDetails().id}).subscribe((result) => {
      this.toastr.success("Comment added succesfully.")
      this.loginService.listComments(this.blogId).subscribe((result) => {
        this.blogComments = result["success"];
        this.blogComments.sort((val1, val2)=> {return <any> new Date(val2.created_at) - <any> new 
          Date(val1.created_at)})
          this.ngxService.stop();
         }, (err) => {
      
          this.ngxService.stop();
         });
  
     }, (err) => {
  
      this.ngxService.stop();
     });

  }
}
