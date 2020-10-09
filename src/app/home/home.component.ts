import { Component, OnInit,Inject,ChangeDetectorRef,ViewChild } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from "./../services/login.service";
import { AdminService } from "./../admin/services/admin.service";
import {CookieService} from 'angular2-cookie/core';
import { Location } from '@angular/common';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { GooglePlaceModule,GooglePlaceDirective } from "ngx-google-places-autocomplete";
import { Router,ActivatedRoute } from "@angular/router";
import {TranslateService} from '@ngx-translate/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('placesRef',{static: false}) placesRef: GooglePlaceDirective;
  @ViewChild('placesRef1',{static: false}) placesRef1: GooglePlaceDirective;
  @ViewChild('placesRef2',{static: false}) placesRef2: GooglePlaceDirective;
  @ViewChild('placesRef3',{static: false}) placesRef3: GooglePlaceDirective;
  @ViewChild('autoShownModal',{static: true}) autoShownModal: ModalDirective;
  isModalShown: boolean = false;
  searchForm : FormGroup
  conversion:any
  content:any;
  resultMakes:any
  about:any
  countryObj:any
  countries:any
  constructor(private modalService: BsModalService,private location: Location,private route: ActivatedRoute,private loginService: LoginService,private router : Router,private formBuilder: FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService, private titleService: Title,
    private meta: Meta, private ref: ChangeDetectorRef,private translate: TranslateService,private admin:AdminService) {}
  totalRecords:any;
  options:any;
  city:any;
  type = "car";
  makes:any;
  models:any;
  years:any;
  bikeMakes:any;
  makescpy:any;
  truckMakes:any;
  vanMakes:any;
  ngOnInit() {
  this.getHomePOP()
    // this.meta.addTag({name: 'description', content: 'Angular project training on rsgitech.com'});
    // this.meta.addTag({name: 'author', content: 'rsgitech'});
    // this.meta.addTag({name: 'robots', content: 'index, follow'});

    let countrycode = this.loginService.getUserLocation().countryCode;
        this.options = {
      types: ['(cities)'],
      componentRestrictions: { country: countrycode }
      }
    this.searchForm = this.formBuilder.group({ 
      new:[false],
      used:[false],
      registered:[false],
      make:[''],
      model:[''],
      priceFrom:[''],
      priceTo:[''],
      city:[''],
      countryName:[''],
      firstRegistration:[''],
      type:[],
      category:['']
    })
    this.searchForm.value.type = "car";
   
    const now = new Date().getUTCFullYear();    
    const years = Array(now - (now - 30)).fill('').map((v, idx) => now - idx);
    this.years = years;
    this.getMakes();
  this.getCountries();
  this.getAbout()
 

  }



  searchDetails(){

    //this.searchForm.value.type = this.type
  if(this.searchForm.value.new == true){
    this.searchForm.value.new = "New"
  }
  if(this.searchForm.value.used == true){
    this.searchForm.value.used = "Used"
  }
  if(this.searchForm.value.registered == true){
    this.searchForm.value.registered = "Pre-Registered"
  }
  if(this.searchForm.value.city ){
    this.searchForm.value.city  = this.city
  }
    let data = this.searchForm.value;
    console.log(data)
    this.ngxService.start();
    this.loginService.filterSearch(data,this.type).subscribe((result) => {
      this.totalRecords = result["success"].length
      this.ngxService.stop();
      this.loginService.setSearchData(data)
     }, (err) => {
      let message = this.translate.get('networkerr')['value'];
      this.toastr.error(message)
      this.ngxService.stop();
     });
  }

  search(){
    this.router.navigateByUrl('/search/'+this.type)

  }
  checkValue(){
    console.log(this.searchForm.value)
  }
  handleAddressChange(event){

   this.city = event.formatted_address;
     this.searchDetails();
   }
   setType(type){
     this.type = type
     
    
     if(type == 'bike'){
      this.makes = this.bikeMakes
    }else if(type == 'truck'){
      this.makes = this.truckMakes
    }else if(type == 'van'){
      this.makes = this.vanMakes;
    }
      else{
      this.makes = this.makescpy
    }
    this.getCountryCurrency( this.loginService.getUserLocation().country)
    this.searchForm.value.type = type;
    let userCurrentCounry = this.loginService.getUserLocation();
    this.searchForm.value.countryName = userCurrentCounry.country;
    this.searchForm.controls['countryName'].setValue(userCurrentCounry.country);
    let code = this.getcountrycode().country_code
    this.options.componentRestrictions.country = code;
    this.placesRef.reset()
    this.placesRef1.reset()
    this.placesRef2.reset()
    this.placesRef3.reset()
   
    
    this.searchForm.controls['city'].setValue("");
    this.searchForm.controls['model'].setValue("");
    this.searchForm.controls['make'].setValue("");
    this.searchForm.controls['priceFrom'].setValue("");
    this.searchForm.controls['priceTo'].setValue("");
    this.searchForm.controls['firstRegistration'].setValue("");
    this.searchForm.controls['used'].setValue(false);
    this.searchForm.controls['registered'].setValue(false);
    
    this.searchDetails();
   }

   getMakes(){
    this.ngxService.start();
     this.loginService.getMakes().subscribe((result) => {
       let finalArr = [];
       let bikeArr = [];
       let truckArr = [];
       let vanArr = [];
       this.resultMakes = result['success'];
       let makes = result['success'];
       for(var i=0; i<makes.length; i++){
         if(makes[i].type == 'car'){
          finalArr.push(makes[i])
         }else if(makes[i].type == 'bike'){
           bikeArr.push(makes[i])
         }else if(makes[i].type == 'truck'){
           truckArr.push(makes[i])
         }else if(makes[i].type == 'van'){
          vanArr.push(makes[i])
        }
       }
      this.makes = finalArr;
      this.bikeMakes = bikeArr;
      this.truckMakes = truckArr;
      this.vanMakes = vanArr
      this.makescpy = this.makes;
      this.makes.sort(function(a, b){
        if(a.make < b.make) { return -1; }
        if(a.make > b.make) { return 1; }
        return 0;
    })
    this.bikeMakes.sort(function(a, b){
      if(a.make < b.make) { return -1; }
      if(a.make > b.make) { return 1; }
      return 0;
  })
  this.vanMakes.sort(function(a, b){
    if(a.make < b.make) { return -1; }
    if(a.make > b.make) { return 1; }
    return 0;
  })
  this.truckMakes.sort(function(a, b){
    if(a.make < b.make) { return -1; }
    if(a.make > b.make) { return 1; }
    return 0;
})
console.log(this.truckMakes)
     }, (err) => {
      let message = this.translate.get('networkerr')['value'];
      this.toastr.error(message)
      this.ngxService.stop();
     });
   }
 

   getModels(){

    this.ngxService.start();
     
     this.loginService.getModels(this.searchForm.value.make).subscribe((result) => {
      this.models = result["success"]
      this.ngxService.stop();
     }, (err) => {
      let message = this.translate.get('networkerr')['value'];
      this.toastr.error(message)
      this.ngxService.stop();
     });
     let id = this.filterMakeID();
     this.searchDetails();
   }
   getMakesTrucks() {
     let finalArr = [];
    for(var i=0; i<this.resultMakes.length; i++){
      if(this.resultMakes[i].category == this.searchForm.value.category){
        finalArr.push(this.resultMakes[i])
      }
    }
    this.makes = finalArr
    this.searchDetails();
     
   }   
   filterMakeID(){
    for(var i=0; i<this.resultMakes.length; i++){
      if(this.resultMakes[i].id == this.searchForm.value.make){
        this.searchForm.value.make =   this.resultMakes[i].make
        break;
      }
    }
  }

  getCountries(){
    this.ngxService.start();
    this.loginService.countries().subscribe((result:any) => {
      this.countries = result['message'];
      this.loginService.setCountries( this.countries )
      this.getCountryCurrency( this.loginService.getUserLocation().country)
      let userCurrentCounry = this.loginService.getUserLocation();
      this.searchForm.value.countryName = userCurrentCounry.country;
      this.searchForm.controls['countryName'].setValue(userCurrentCounry.country);
      this.options = {
        types: ['(cities)'],
        componentRestrictions: { country: [userCurrentCounry.countryCode] }
        }

        console.log(this.conversion)
      this.ngxService.stop();
      this.searchDetails();
      },(err) => {

        this.ngxService.stop();
       })
  }
  changeCountry(){
    let code = this.getcountrycode().country_code
    this.options.componentRestrictions.country = code;
    this.getCountryCurrency( this.searchForm.value.countryName)
    this.placesRef.reset()
    this.placesRef1.reset()
    this.placesRef2.reset()
    this.placesRef3.reset()
    this.searchDetails();
  }

  getcountrycode(){
    for(var i=0; i<this.countries.length; i++){
      if(this.countries[i].country == this.searchForm.value.countryName){

        return this.countries[i]
      }
    }
  }

  getCountryCurrency(userCurrentCounry){
    let countries = this.loginService.getCountries();
    let currncies = this.loginService.getCurrncies();
 
    
    let countryObj;
    for(var i=0;i<countries.length; i++){
      if(countries[i].country == userCurrentCounry){
        this.countryObj = countries[i];
        break;
      }
    }
    this.conversion =  this.loginService.checkUserCurrency(this.countryObj.code,currncies);
    console.log( this.conversion)

    //let countryCode = userCurrentCounry.countryCode
    //this.conversion =  this.loginService.checkUserCurrency(countryCode,currncies);
  }
  getHomePOP(){
    this.admin.getPOP().subscribe((result) => {
      let newsLetter = sessionStorage.getItem('newsletter');
      if(!newsLetter && result['success'][0]['status'] == 1){
      setTimeout(() => {
        this.content = result['success'][0]['content']
        this.isModalShown = true
      }, 3000);
       
      }
      
    })
  }

  onHidden(): void {
    this.isModalShown = false;
    sessionStorage.setItem('newsletter', 'closed');
  }
  hideModal(): void {
    this.isModalShown = false;

    sessionStorage.setItem('newsletter', 'closed');
  }
  getAbout(){
    this.loginService.about().subscribe(
      res => {
      //  console.log(res['success'])
        if(res['success'].length > 0){
       this.about = res['success'][0]['content'];
       console.log(this.about)
        }
     
       
       this.ngxService.stop()
      },
      err => { 
        this.ngxService.stop()
        
      }
    )
  }
}


