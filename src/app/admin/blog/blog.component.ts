import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { AdminService } from "./../services/admin.service";
import { LoginService } from "./../../services/login.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  public tools: object = {
    type: 'MultiRow',
    items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
'LowerCase', 'UpperCase', '|',
'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
'Outdent', 'Indent', '|',
'CreateLink', 'Image', '|', 'ClearFormat', 'Print',
'SourceCode', 'FullScreen', '|', 'Undo', 'Redo']
};
  constructor(private loginService: LoginService,private adminService: AdminService,private modalService: BsModalService,private formBuilder:FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService,private router : Router,) { }
  listUsers:any;
  signupForm: FormGroup;
  updateInfo: FormGroup;
  perPage = 10;
  totalEntries = "";
  urls:any;
  currentUser :any;
  modalRef: BsModalRef | null;
  modalRefAdd: BsModalRef | null;
  modalRefUpdate: BsModalRef | null;
  public files: any[];
profileImg :any;
categories:any;
userId:'';
id:'';
searchText:'';
p = 1;
modalRefDel:BsModalRef | null;
modalRefStatus:BsModalRef | null;
postStatus = "";
status= "";
countries:any
  public infos = {ns:"",country:"",content:"",category:"", type:"", name:'',fname:'',  lname: '',email:'',phone:'',file:'' };
  public signupData = { ns:"",country:"",content:"",category:"",type:"buyer",name:'',  lname: '',password:'',email:'',c_password:'',phone:'',file:'' };
submitted = false;
  ngOnInit() {

    this.updateInfo = this.formBuilder.group({    
      fname: ['', [Validators.required]],
      category:['',[Validators.required]]
      
  });
   this.signupForm = this.formBuilder.group({    
    fname: ['', [Validators.required]],
    category:['',[Validators.required]],
    
});
this.ngxService.start()
    this.loginService.listBlogs().subscribe(
      res => {
        this.listUsers = res['success'];
        this.totalEntries = this.listUsers.length;
        this.listUsers.sort((val1, val2)=> {return <any> new Date(val2.created_at) - <any> new 
          Date(val1.created_at)})
        this.ngxService.stop();
      },
      err => { 
        this.ngxService.stop();
        
      }
    )
    this.getCountries();
  }

  viewUserInfo(template: any,users){
    this.currentUser = users
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
 
  }
  addUser(template: any){
    this.urls = "";
    this.modalRefAdd = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  cancelAddUser(){
    this.signupData.name = "";
    this.signupData.lname = "";
    this.signupData.email = "";
    this.signupData.password = "";
    this.signupData.c_password = "";
    this.signupData.phone = "";
    this.profileImg = "";
    this.signupData.ns = ""; 
    this.urls = "";
   this.modalRefAdd.hide();

  }


  signup(){
  this.submitted = true;
  if (this.signupForm.invalid) {
         this.toastr.error('Please provide the required information.');
            return;
      }
      this.ngxService.start()
      const formData = new FormData();

      if(this.files){
        for (const file of this.files) {
          formData.append('file', file, file.name);
      
      }
    }
    formData.append('category', this.signupData.category);
      formData.append('name', this.signupData.name);
      formData.append('content', encodeURIComponent(this.signupData.content));
      this.loginService.addBlog(formData).subscribe((result) => {
        this.ngxService.stop();
        this.toastr.success('Category added succesfully.');
        this.router.navigateByUrl('admin/dashboard', {skipLocationChange: true}).then(()=>
        this.router.navigate(["admin/blogs"]));
          this.signupForm.reset();
          this.modalRefAdd.hide();
          this.urls = "";
       }, (err) => {
       
        this.ngxService.stop();
        
       });
  }
  get f() { return this.signupForm.controls; }
  get upateF() { return this.updateInfo.controls; }
 
  updateUser(template:any,userDetails){
   console.log(userDetails.country_code)
    this.modalRefUpdate = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.infos.category = userDetails.category;
    this.infos.name =  userDetails.title;
    this.infos.content =  userDetails.content;
   // this.profileImg =  userDetails.image;
    this.urls =  userDetails.image;
    this.userId = userDetails.id
  }
  update(){
   
        this.submitted = true;
        if (this.updateInfo.invalid) {
          this.toastr.error('Please provide the required information.');
             return;
       }
       this.ngxService.start()
       const formData = new FormData();
       if(this.files){
       for (const file of this.files) {
           formData.append('file', file, file.name);
       }
      }
     
       formData.append('name', this.infos.name);
       formData.append('content', this.infos.content);
       formData.append('category', this.infos.category);      
       this.loginService.updateBlog(formData,this.userId).subscribe((result) => {
        this.router.navigateByUrl('admin/dashboard', {skipLocationChange: true}).then(()=>
        this.router.navigate(["admin/blogs"]));
        this.ngxService.stop();
        this.modalRefUpdate.hide();
       this.toastr.success('Your information updated succesfully.', 'Success');
       this.urls = "";
       }, (err) => {
       
        this.ngxService.stop();
        
       });
    
      }
      deleteUser(template:any,id){
        this.id = id
        this.modalRefDel = this.modalService.show(template)
      }
      confirmDelete(){
        this.ngxService.start();
        this.loginService.deleteBlog(this.id).subscribe(
          res => {
            this.router.navigateByUrl('admin/dashboard', {skipLocationChange: true}).then(()=>
            this.router.navigate(["admin/blogs"]));
            this.modalRefDel.hide();
            this.ngxService.stop();
          },
          err => { 
            this.ngxService.stop();
            
          }
        )
      }

      changePostStatus(status,template:any,id){
        this.id = id
        this.status = status
        this.postStatus = status
        this.modalRefStatus = this.modalService.show(template)
      }
    
      confirmChangeStatus(){
        this.ngxService.start()
        this.adminService.changePostStatus( this.id,this.status).subscribe(
          res => {
            this.ngxService.stop()
            this.modalRefStatus.hide();
            this.router.navigateByUrl('admin/dashboard', {skipLocationChange: true}).then(()=>
            this.router.navigate(["admin/blogs"]));
          },
          err => { 
           
            
          }
        )
      }

      getCountries(){
        this.loginService.listCategories().subscribe((result) => {
          this.countries = result["success"]
          this.ngxService.stop();
         }, (err) => {
      
          this.ngxService.stop();
         });
      }
     

      onSelectFile(event) {
        var allowedExtensions = ["jpg","jpeg","png","JPG","JPEG","PNG"]; // allowed extensions
        let fileExtesion = event.target.files[0].type.split("/")[1]; // image selection extension
        if(allowedExtensions.indexOf(fileExtesion) == -1){
          this.toastr.error("There was an upload error.Make sure to upload a JPG or PNG file and try again.");
          return;
        }
        if(event.target.files[0]){
        if(event.target.files[0].size/1024/1024 > 2){
          this.toastr.error('File size should be less than 2 mb.');
          return;
         }
        }
        
        if (event.target.files && event.target.files[0]) {
          this.files = event.target.files;
          //  for (let i = 0; i < filesAmount; i++) {
                    var reader = new FileReader();
    
                    reader.onload = (event:any) => {
                    
                       this.urls = event.target.result; 
                     
                    }

                    reader.readAsDataURL(event.target.files[0]);
            //}
            
        }
      }
      removeImg(data:any){
        this.urls = "";
      }


}
