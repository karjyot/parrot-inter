import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { AdminService } from "./../services/admin.service";
import { LoginService } from "./../../services/login.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  constructor(private loginService: LoginService,private adminService: AdminService,private modalService: BsModalService,private formBuilder:FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService,private router : Router,) { }
  listUsers:any;
  signupForm: FormGroup;
  updateInfo: FormGroup;
  perPage = 10;
  totalEntries = "";
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
countryObj:any;
status= "";
countries:any
  public infos = {ns:"",country:"", type:"", fname:'',  lname: '',email:'',phone:'',file:'' };
  public signupData = { ns:"",country:"",type:"buyer",name:'',  lname: '',password:'',email:'',c_password:'',phone:'',file:'' };
submitted = false;
  ngOnInit() {
    
    this.updateInfo = this.formBuilder.group({    
      fname: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      phone: ['', [Validators.required]],
      // id: ['', [Validators.required]],
      type: ['', [Validators.required]],
     
   //   ns: ['', [Validators.required]],
      
  });
   this.signupForm = this.formBuilder.group({    
    fname: ['', [Validators.required]],
    type: ['buyer', [Validators.required]],
     password: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      country: ['', [Validators.required]],
       phone: ['', [Validators.required]],
         cPass: ['', [Validators.required]],
         //file:[''],
        //  id: ['', [Validators.required]],
       //  ns: ['', [Validators.required]],
});
this.ngxService.start()
    this.adminService.getListUsers().subscribe(
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
    this.getCountries()
  }

  viewUserInfo(template: any,users){
    this.currentUser = users
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
 
  }
  addUser(template: any){
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
   this.modalRefAdd.hide();

  }


  signup(){
  this.submitted = true;
  if (this.signupForm.invalid) {
         this.toastr.error('Please provide the required information.');
            return;
      }
      this.ngxService.start()
      const formData = {};
      formData['countryObj'] = this.countryObj
      formData['name'] = this.signupData.name
      formData['email'] = this.signupData.email
      formData['password'] = this.signupData.password
      formData['phone'] = this.signupData.phone
      formData['type'] = this.signupData.type
      // formData.append('id', this.signupData.id);
     // formData.append('ns', this.signupData.ns);
   
    //  formData.append('countryObj', JSON.stringify(this.countryObj));
    //   formData.append('name', this.signupData.name);
    //   formData.append('email', this.signupData.email);
    //   formData.append('password', this.signupData.password);
    //   formData.append('phone', this.signupData.phone);
    //   formData.append('type', this.signupData.type);
      this.loginService.registerUser(formData).subscribe((result) => {
        this.ngxService.stop();
        this.toastr.success('User added succesfully.');
        this.router.navigateByUrl('admin/dashboard', {skipLocationChange: true}).then(()=>
        this.router.navigate(["admin/users"]));
          this.signupForm.reset();
          this.modalRefAdd.hide();
          
       }, (err) => {
        try{
          if(err.error.error.email){
            this.toastr.error(err.error.error.email[0], 'SignUp Error');
          }else if(err.error.error.c_password){
            this.toastr.error("password and confirm password does not matched.", 'SignUp Error');
          }else if(err.error.error == "phoneError"){
            this.toastr.error("Provide phone number with country code..", 'Invalid phone number');
          }
          else if(err.error.error.phone){
            this.toastr.error("This phone number is already registerd.", 'Invalid phone number');
          }
        }catch(e){
          this.toastr.error("Internal Server Error.", 'SignUp Error');
        }
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
    this.infos.fname = userDetails.name;
    this.infos.type =  userDetails.user_type;
    this.infos.email =  userDetails.email;
    this.infos.phone = userDetails.phone;
    // this.infos.id = userDetails.namepros;
   // this.infos.ns = userDetails.ns;
    this.profileImg =  userDetails.image;
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
     
       formData.append('name', this.infos.fname);
       formData.append('email', this.infos.email);
       formData.append('type', this.infos.type);
       formData.append('phone', this.infos.phone);
       //formData.append('ns', this.infos.ns);
      
       this.loginService.updateUser(formData,this.userId).subscribe((result) => {
        this.router.navigateByUrl('admin/dashboard', {skipLocationChange: true}).then(()=>
        this.router.navigate(["admin/users"]));
        this.ngxService.stop();
        this.modalRefUpdate.hide();
       this.toastr.success('Your information updated succesfully.', 'Success');
          
       }, (err) => {
        try{
          if(err.error.error.email){
            this.toastr.error(err.error.error.email[0], 'SignUp Error');
          }else if(err.error.error.c_password){
            this.toastr.error("password and confirm password does not matched.", 'SignUp Error');
          }else if(err.error.error == "phoneError"){
            this.toastr.error("Provide phone number with country code..", 'Invalid phone number');
          }
          else if(err.error.error.phone){
            this.toastr.error("This phone number is already registerd.", 'Invalid phone number');
          }
        }catch(e){
          this.toastr.error("Internal Server Error.", 'SignUp Error');
        }
        this.ngxService.stop();
        
       });
    
      }
      deleteUser(template:any,id){
        this.id = id
        this.modalRefDel = this.modalService.show(template)
      }
      confirmDelete(){
        this.ngxService.start();
        this.adminService.deleteUser(this.id).subscribe(
          res => {
            this.router.navigateByUrl('admin/dashboard', {skipLocationChange: true}).then(()=>
            this.router.navigate(["admin/users"]));
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
            this.router.navigate(["admin/users"]));
          },
          err => { 
           
            
          }
        )
      }

      getCountries(){
        this.loginService.listCountries().subscribe((result) => {
          this.countries = result["message"]
          this.ngxService.stop();
         }, (err) => {
      
          this.ngxService.stop();
         });
      }
      filterCountrydata(){

        for(var i=0; i<this.countries.length; i++){
          if(this.countries[i].country == this.signupData.country){
           this.countryObj = this.countries[i]
            break; 
          }
        }
       // this.getPhoneCodes()
      }
     

}
