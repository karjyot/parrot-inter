import { Component, OnInit } from '@angular/core';

import { LoginService } from "./../services/login.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from './../helpers/must-match.validator';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  submitted = false;
  profileImg :any;
  public files: any[];
  imageUrl:any;
  userType:any;
  countries:any;
  isLogin:any;
  constructor(private router : Router,private formBuilder: FormBuilder,private loginService: LoginService,private toastr: ToastrService,private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
   
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
    
      email: ['', [Validators.required, Validators.email]],
      type : ['', [Validators.required]],
      phone : ['', [Validators.required]],
      website : [''],
     // namepros: [''], 
      //ns: ['',[Validators.required]], 
  })
  this.getCountries();
  
  
  }
  onSubmit() {

    this.submitted = true;
    if (this.profileForm.invalid) {
      this.toastr.error("Please fill required fields.")
        return;
    }
    this.ngxService.start();
    let data = {
      name:this.profileForm.get('name').value,
      email:this.profileForm.get('email').value,
      type:this.profileForm.get('type').value,
      phone:this.profileForm.get('phone').value,
      website:this.profileForm.get('website').value,
     // ns:this.profileForm.get('ns').value,
    }
   
    let id = this.loginService.getUserDetails().id;
    this.loginService.updateUser(data,id).subscribe((result) => {
      let userDetails = this.loginService.getUserDetails();
      userDetails.name = this.profileForm.get('name').value
      userDetails.email = this.profileForm.get('email').value
      userDetails.user_type = this.profileForm.get('type').value
      userDetails.phone = this.profileForm.get('phone').value
      userDetails.website = this.profileForm.get('website').value
      this.loginService.setUserDetails(userDetails)
      this.toastr.success("Profile updated successfully.")
      this.loginService.sendUserTypeUpdate( this.profileForm.get('type').value);
      this.ngxService.stop();
     }, (err) => {
  
      this.ngxService.stop();
     });
  }
  uploadFile(event){
    var allowedExtensions = ["jpg","jpeg","png","JPG","JPEG","PNG"]; // allowed extensions
    let fileExtesion = event.target.files[0].type.split("/")[1]; // image selection extension
    if(allowedExtensions.indexOf(fileExtesion) == -1){
      this.toastr.error("There was an upload error.Make sure to upload a JPG or PNG file and try again.");
      return;
    }
    this.ngxService.start();
  
    this.files = event.target.files;
  
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
  
        const reader = new FileReader();
        reader.onload = e => this.profileImg = reader.result;
  
        reader.readAsDataURL(file);
    }
    setTimeout(()=>{ 
       const formData = new FormData();
        for (const file of this.files) {
            formData.append('file', file, file.name);
        }
        let id = this.loginService.getUserDetails().id;
        formData.append('id', id); 
        this.loginService.updateProfileImage(formData).subscribe((result) => {
          let userDetails = this.loginService.getUserDetails();
          let splitted = userDetails.image.split('uploads/');
          let fileupdated =  splitted[0] + 'uploads/'+this.files[0].name
          userDetails.image = fileupdated
        
          this.loginService.setUserDetails(userDetails)
          this.imageUrl = result["message"];
          this.loginService.sendImageUpdate( this.imageUrl);
          this.toastr.success('Image updated successfully.');
          this.ngxService.stop();
         }, (err) => {
        
          this.ngxService.stop();
         });
        },100);
  }


  getCountries(){

     

      let userDetails = this.loginService.getUserDetails();
      this.profileForm.controls['name'].setValue(userDetails.name);
      this.profileForm.controls['email'].setValue(userDetails.email);
      this.profileForm.controls['type'].setValue(userDetails.user_type);
      this.profileForm.controls['phone'].setValue(userDetails.phone);
      this.profileForm.controls['website'].setValue(userDetails.website);
      this.imageUrl = userDetails.image;
     
  }

  get f() { return this.profileForm.controls; }

}
