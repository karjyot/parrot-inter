import { Component, OnInit } from '@angular/core';

import { LoginService } from "./../services/login.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from './../helpers/must-match.validator';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
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
  constructor(private router : Router,private formBuilder: FormBuilder,private loginService: LoginService,private toastr: ToastrService,private ngxService: NgxUiLoaderService,private translate: TranslateService) { }

  ngOnInit() {
   
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
    
      email: ['', [Validators.required, Validators.email]],
      type : ['', [Validators.required]],
      phone : ['', [Validators.required]],
      website : [''],
      company: [''], 
      facebook: [''], 
      linkedin: [''], 
      twitter: [''], 
      about: [''], 
      //ns: ['',[Validators.required]], 
  })
  this.getCountries();
  
  
  }
  onSubmit() {

    this.submitted = true;
    if (this.profileForm.invalid) {
      let message = this.translate.get('req')['value'];
      this.toastr.error(message)
        return;
    }
    this.ngxService.start();
    let data = {
      name:this.profileForm.get('name').value,
      email:this.profileForm.get('email').value,
      type:this.profileForm.get('type').value,
      phone:this.profileForm.get('phone').value,
      website:this.profileForm.get('website').value,
      company:this.profileForm.get('company').value,
      facebook:this.profileForm.get('facebook').value,
      linkedin:this.profileForm.get('linkedin').value,
      twitter:this.profileForm.get('twitter').value,
      about:this.profileForm.get('about').value,
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
      userDetails.company = this.profileForm.get('company').value
      userDetails.facebook = this.profileForm.get('facebook').value
      userDetails.linkedin = this.profileForm.get('linkedin').value
      userDetails.twitter = this.profileForm.get('twitter').value
      userDetails.about = this.profileForm.get('about').value
      this.loginService.setUserDetails(userDetails)
      this.loginService.sendUserNameUpdate(this.profileForm.get('name').value)
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
      let message = this.translate.get('uploadError')['value'];
      this.toastr.error(message)
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
          let message = this.translate.get('imageUp')['value'];
          this.toastr.success(message)
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
      this.profileForm.controls['company'].setValue(userDetails.company);
      this.profileForm.controls['facebook'].setValue(userDetails.facebook);
      this.profileForm.controls['linkedin'].setValue(userDetails.linkedin);
      this.profileForm.controls['twitter'].setValue(userDetails.twitter);
      this.profileForm.controls['about'].setValue(userDetails.about);
      this.imageUrl = userDetails.image;
     
  }

  get f() { return this.profileForm.controls; }

}
