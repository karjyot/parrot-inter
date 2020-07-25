import { Component, OnInit } from '@angular/core';

import { LoginService } from "./../services/login.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from './../helpers/must-match.validator';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-blogsdata',
  templateUrl: './blogsdata.component.html',
  styleUrls: ['./blogsdata.component.css']
})
export class BlogsdataComponent implements OnInit {

  constructor(private location: Location,private router : Router,private formBuilder: FormBuilder,private loginService: LoginService,private toastr: ToastrService,private ngxService: NgxUiLoaderService) { }
  categories:any;
  blogs:any;
  p: number = 1;
  filter='All';
  ngOnInit() {
    this.ngxService.start();
    this.loginService.listCategories().subscribe((result) => {
      this.categories = result["success"]
      this.ngxService.stop();
     }, (err) => {
  
      this.ngxService.stop();
     });

     this.loginService.listBlogs().subscribe((result) => {
      this.blogs = result["success"]
      this.ngxService.stop();
     }, (err) => {
  
      this.ngxService.stop();
     });
  }
  back(){
    this.location.back();
  }
  getBlogDetails(id){
    this.router.navigateByUrl('/blog-details/'+id)
  }
  filterBlogs(cate){
    this.filter = cate.name
    this.ngxService.start();
    this.loginService.filterBlogsData(cate.id).subscribe((result) => {
      this.blogs = result["success"]
      this.ngxService.stop();
     }, (err) => {
  
      this.ngxService.stop();
     });
  }

}
