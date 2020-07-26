import { Component, OnInit,Inject,ChangeDetectorRef,ViewChild } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from "./../services/login.service";

import {CookieService} from 'angular2-cookie/core';
import { Location } from '@angular/common';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { GooglePlaceModule,GooglePlaceDirective } from "ngx-google-places-autocomplete";
import { Router,ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('placesRef',{static: false}) placesRef: GooglePlaceDirective;
  searchForm : FormGroup
  resultMakes:any
  countries:any
  constructor(private modalService: BsModalService,private location: Location,private route: ActivatedRoute,private loginService: LoginService,private router : Router,private formBuilder: FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService, private titleService: Title,
    private meta: Meta, private ref: ChangeDetectorRef) {}
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
  this.getCountries()
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
      this.toastr.error('Network error occured.');
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

    this.searchForm.value.type = type;
    //this.searchForm.value.city = "";
    //this.searchForm.value.model = "";
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
      this.toastr.error('Network error occured.');
      this.ngxService.stop();
     });
   }
 

   getModels(){

    this.ngxService.start();
     
     this.loginService.getModels(this.searchForm.value.make).subscribe((result) => {
      this.models = result["success"]
      this.ngxService.stop();
     }, (err) => {
      this.toastr.error('Network error occured.');
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
      let userCurrentCounry = this.loginService.getUserLocation();
      this.searchForm.value.countryName = userCurrentCounry.country;
      this.searchForm.controls['countryName'].setValue(userCurrentCounry.country);
      this.options = {
        types: ['(cities)'],
        componentRestrictions: { country: [userCurrentCounry.countryCode] }
        }

      this.ngxService.stop();
      this.searchDetails();
      },(err) => {

        this.ngxService.stop();
       })
  }
  changeCountry(){
    let code = this.getcountrycode().country_code
    console.log(code)
    this.options.componentRestrictions.country = code;
    
    this.placesRef.reset()
    this.searchDetails();
  }

  getcountrycode(){
    for(var i=0; i<this.countries.length; i++){
      if(this.countries[i].country == this.searchForm.value.countryName){

        return this.countries[i]
      }
    }
  }

}


