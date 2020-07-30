import { Component, OnInit,Inject,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from "./../services/login.service";
import { Router,ActivatedRoute} from "@angular/router";
import {CookieService} from 'angular2-cookie/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Location } from '@angular/common';
import { GooglePlaceModule,GooglePlaceDirective } from "ngx-google-places-autocomplete";
import { Title, Meta } from '@angular/platform-browser';
declare var $ :any;
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild('placesRef',{static: false}) placesRef: GooglePlaceDirective;
  vehicalConditon:any
  constructor(private location: Location,private route: ActivatedRoute,private _cookieService:CookieService,private modalService: BsModalService,private loginService: LoginService,private router : Router,private formBuilder: FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService,private titleService: Title,
    private meta: Meta,private translate: TranslateService) {}
  resultMakes:any;
  countryObj:any
  eqps:any;
  doors:any = 2;
  seller = '';
  owners:any = 1;
  emmison:any = 1;
  searchAddr:any;
  condition:any;
  vehicleCond = '';
  lat:any
  countries:any
  long:any
  truckMakes:any;
  makes:any
  models:any;
  equpments:any;
  conversion:any
  bikeEqps:any;
  bikeMakes:any;
  makescpy:any;
  vehicleType:any;
  cmsData:any;

  color = [{name:"beige",checked:false},{name:"blue",checked:false},{name:"brown",checked:false},{name:"yellow",checked:false},{name:"grey",checked:false},{name:"green",checked:false},{name:"red",checked:false},{name:"black",checked:false},{name:"white",checked:false}]

  upholsetry = [{name:"alcantara",checked:false},{name:"Cloth",checked:false},{name:"Full leather",checked:false},{name:"Part leather",checked:false},{name:"Velour",checked:false},{name:"Other",checked:false}]

  vehicalCondions = [{name:"New",checked:false},{name:"Used",checked:false},{name:"Employee's Car",checked:false},{name:"Antique Classic",checked:false},{name:"Demonstration",checked:false},{name:"Pre-Registered",checked:false}]
  vehicalCondionsBike =  [{name:"New",checked:false},{name:"Used",checked:false},{name:"Antique Classic",checked:false},{name:"Demonstration",checked:false},{name:"Pre-Registered",checked:false}]
  gurrantee = [{name:"Gurantee",checked:false},{name:"With Full Service History",checked:false},{name:"no smoking vehicle",checked:false}]
  bodyTypes = [
    {
      name: "Compact"
    },{
      name: "Hatch Back"
    },{
      name: "Saloon"
    },{
      name: "Estate "
    },{
      name: "Convertible"
    },{
      name: "Coupe"
    },{
      name: "Off-Road/Pick-up"
    },{
      name: "Sedans"
    },{
      name: "Station wagon"
    },{
      name: "Transporter"
    },{
      name: "Van"
    },{
      name: "Other"
    }
  ]
  bodyTypesTrucks = [
    {
      name: "Alcove"
    },{
      name: "Integrated"
    },{
      name: "Semi-Integrated"
    },{
      name: "Panel van "
    },{
      name: "Cabin"
    },{
      name: "Pick-up camper"
    },{
      name: "Other campers"
    },{
      name: "Caravan"
    },{
      name: "Mobile home"
    },{
      name: "Transporter"
    },{
      name: "Other"
    }
  ]


  bodyTypesVans = [
    {
      name: "Panel van"
    },{
      name: "Roll-off tipper"
    },{
      name: "Breakdown truck"
    },{
      name: "Dumper truck"
    },{
      name: "Truck-mounted crane"
    },{
      name: "Car transport"
    },{
      name: "Three-sided tipper"
    },{
      name: "Chassis"
    },{
      name: "Mobile Shop / Food truck"
    },{
      name: "Refrigerated truck"
    },{
      name: "Armored truck"
    },
    {
      name: "Beverages van"
    },{
      name: "Glass transport superstructure"
    },{
      name: "Hydraulic work platform"
    },{
      name: "Van-high roof"
    },{
      name: "Tipper"
    },{
      name: "Box"
    },{
      name: "Station wagon/van"
    },{
      name: "Cattle carrier"
    },{
      name: "Flatbed van"
    },{
      name: "Flatbed+tarpaulin"
    },{
      name: "Other"
    }
  ]


  bodyTypesBikes = [
    {
      name: "Scooter"
    },{
      name: "Naked Bike"
    },{
      name: "Supersport"
    },{
      name: "Chopper/Cruiser "
    },{
      name: "Sport touring"
    },{
      name: "Quad"
    },{
      name: "Tourer"
    },{
      name: "Touring Enduro"
    },{
      name: "Enduro Bike"
    },{
      name: "Sidecar"
    },{
      name: "Minibike"
    },{
      name: "Moped"
    },
    {
        name: "Motocrosser"
      },{
        name: "Rally"
      },{
        name: "Racing"
      },{
        name: "Streetfighter"
      },{
        name: "Super Moto"
      },{
        name: "Trials Bike"
      },{
        name: "Three Wheeler"
      },{
        name: "Others"
      }
  ]

  diesalTypes = [
    {
      name: "Petrol"
    },{
      name: "Diesel"
    },{
      name: "Coupe"
    },{
      name: "Ethanol"
    },{
      name: "Electric"
    },{
      name: "Hydrogen"
    },{
      name: "LPG"
    },{
      name: "CNG"
    },{
      name: "Electric/Petrol"
    },
  {
      name: "Others"
    },{
      name: "Electric/Diesel"
    }
  ]

  gearTypes = [
    {
      name: "Automatic"
    },{
      name: "Manual"
    },{
      name: "Semi-automatic"
    }
  ]
 
 
  gurantee:any
  postData:any;
  options:any;
  intCol = '';
  extCol: '';
  upholeData:'';
  years:any;
  adType:any;
  userDetails:any;
  ads:any;
  p: number = 1;
  urlShare:any;
  modalRefShare:BsModalRef | null;
  searchTags:any;
  filterSelction =  this.translate.get('dateAsc')['value'];
  searchForm : FormGroup
  ngOnInit() {
    let countrycode = this.loginService.getUserLocation().countryCode;
    this.options = {
    types: ['(cities)'],
    componentRestrictions: { country: countrycode }
    }
    this.getCountryCurrency( this.loginService.getUserLocation().country)
    this.cmsData = this.loginService.getCms();
    this.userDetails = this.loginService.getUserDetails()
    let id =  this.route.snapshot.params.id;
    this.adType = id
    this.getMakes();
    this.getEqps();
    this.searchForm = this.formBuilder.group({ 
      make:[''],
      model:[''],
      firstRegistration:[''],
      price:[''],
      city:[''],
      variant:[''],
      bodyType:[''],
      fuelType:[''],
      mileageFrom:[''],
      mileageTo:[''],
      power:[''],
      gear:[''],
      seats:[''],
      accident:[''],
      vat:[""],
      filter:[""],
      engineSize:[''],
      accleration:[''],
      annualTax:[''],
      fuelConsumpation:[''],
      co2:[''],
      priceFrom:[''],
      priceTo:[''],
      emmison:[''],
      category:[''],
      countryName:['']
      })

      const now = new Date().getUTCFullYear();    
      const years = Array(now - (now - 30)).fill('').map((v, idx) => now - idx);
      this.years = years;

    let tags = [];
    let searchTags = this.loginService.getSearchData();
    console.log(searchTags)
    this.vehicleType =  this.loginService.getSearchData().type
    if(searchTags.make){
      this.searchForm.controls['make'].setValue(searchTags.make);
    }
    if(searchTags.model){
      this.searchForm.controls['model'].setValue(searchTags.model);
    }
    if(searchTags.countryName){
      this.searchForm.controls['countryName'].setValue(searchTags.countryName);
    }
    if(searchTags.city){
      this.searchForm.controls['city'].setValue(searchTags.city);
    }
    if(searchTags.priceFrom){
      this.searchForm.controls['priceFrom'].setValue(searchTags.priceFrom);
    }
    if(searchTags.priceTo){
      this.searchForm.controls['priceTo'].setValue(searchTags.priceTo);
    }
    if(searchTags.new){
     for(var i=0; i< this.vehicalCondions.length; i++){
       if(this.vehicalCondions[i].name == "New"){
        this.vehicalCondions[i].checked = true
       }
     } 
     if(searchTags.used){
      for(var i=0; i< this.vehicalCondions.length; i++){
        if(this.vehicalCondions[i].name == "Used"){
         this.vehicalCondions[i].checked = true
        }
      } 
    }
    if(searchTags.registered){
      for(var i=0; i< this.vehicalCondions.length; i++){
        if(this.vehicalCondions[i].name == "Pre-Registered"){
         this.vehicalCondions[i].checked = true
        }
      } 
    }
  }
     console.log(this.vehicleType)
  if(this.adType == 'car' && searchTags.used){
    this.titleService.setTitle('Parrot Auto Trader- Used Cars');    
    //this.meta.updateTag({ name:'keywords',content:'angulartpoint.com'});  
  }else if(this.adType == 'car' && searchTags.new){
    this.titleService.setTitle('Parrot Auto Trader- New Cars');    
  }else if(this.adType == 'car'){
    this.titleService.setTitle('Parrot Auto Trader- New and Used Cars');    
  }else if(this.adType == 'bike'){
    this.titleService.setTitle('Parrot Auto Trader- New and Used Bikes');    
  }else if(this.adType == 'truck'){
    this.titleService.setTitle('Parrot Auto Trader- New and Used Trucks');    
  }else if(this.adType == 'van'){
    this.titleService.setTitle('Parrot Auto Trader- New and Used Vans');    
  }
    

    if(searchTags.used){
      this.searchForm.controls['model'].setValue(searchTags.model);
    }
    for(var key in searchTags){
     
      if(searchTags[key]){
        if(searchTags[key] !='car' && searchTags[key] !='bike'){
          tags.push(searchTags[key])
        }
       
      }

    }
   this.searchTags = tags
   console.log(this.searchTags)
this.getCountries()
    this.getAds();

  }

  deleteTag(type){
    let searchTags = this.loginService.getSearchData();
    for(var key in searchTags){
      if(searchTags[key] == type){
        delete searchTags[key];
        break;
      }
    }
    for(var j=0;j<this.searchTags.length; j++){
      if(this.searchTags[j] == type){
        this.searchTags.splice(j,1)
        break;
      }
    }
    this.loginService.setSearchData(searchTags);
    this.getAds();
  }
  getAds(){
    let searchData = this.loginService.getSearchData();
    this.ngxService.start();
    this.loginService.filterSearch(searchData,this.adType).subscribe((result) => {
      this.ads = result["success"];
      this.ads.sort((val1, val2)=> {return <any> new Date(val2.created_at) - <any> new 
        Date(val1.created_at)})
        if(this.loginService.getUserDetails()){
          this.loginService.listBookMarksAll(this.loginService.getUserDetails().id).subscribe((result) => {
            let bookmarks = result['success'];
  
            for(var i=0; i<this.ads.length; i++){
              for(var j=0; j<bookmarks.length; j++){
                if(this.ads[i].id == bookmarks[j].ad_id){
                  this.ads[i].isBookMark = true
                }
              }
            }
          })
        }
     

      this.ngxService.stop();
     }, (err) => {
      this.toastr.error('Network error occured.');
      this.ngxService.stop();
     });
  }



  replaceAll(input: string, find: string, replace: string): string {
    return input.replace(new RegExp(find, 'g'), replace);
 }
  openShare(template: any,event,ad,eventData){
    //let title = this.replaceAll(ad.title, ' ', '-');
    this.urlShare  = location.origin + '/search-details'+'/'+ad.id + '/' +ad.user_id;
    event.stopPropagation();
    this.modalRefShare = this.modalService.show(template);
   }
   details(id,event,userId){
    this.router.navigateByUrl("/search-details/"+id + '/'+userId)

  }

   bookmark(ad,event){

  
    if(this.loginService.getUserDetails()){
      this.ngxService.start();
      let data = {
        adID:ad.id,
        userID: this.loginService.getUserDetails().id
      };
      
      this.loginService.bookmark(data).subscribe((result) => {
        for(var i=0; i<this.ads.length; i++){
          if(this.ads[i].id == ad.id){
            this.ads[i].isBookMark = true;
            break;
          }
        }
        this.ads = result["success"];
        this.toastr.success("List added succesfully.")

        this.ngxService.stop();
       }, (err) => {

        this.toastr.error(err.error.error);
        this.ngxService.stop();
       });
    }else{
      let message = this.translate.get('bkm')['value'];
      this.toastr.error(message)
   
    }
    

   }
   back() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  sortArray(type,event){
    if(type == 'priceAsc'){
      this.ads.sort((val1, val2)=> {return <any> (val2.price) - <any> (val1.price)});
      let message = this.translate.get('priceAsc')['value'];
      this.filterSelction = message;
    }
    if(type == 'priceDesc'){
      this.ads.sort((val1, val2)=> {return <any> (val1.price) - <any> (val2.php )})
      let message = this.translate.get('priceDsc')['value'];
      this.filterSelction = message;
    }
    if(type == 'mileAsc'){
      this.ads.sort((val1, val2)=> {return <any> (val2.mileage) - <any> (val1.mileage)})
      let message = this.translate.get('mileAsc')['value'];
      this.filterSelction = message;
    }
    if(type == 'mileDesc'){
      this.ads.sort((val1, val2)=> {return <any> (val1.mileage) - <any> (val2.mileage)})
      let message = this.translate.get('mileDsc')['value'];
      this.filterSelction = message;
    }
    if(type == 'powerAsc'){
      this.ads.sort((val1, val2)=> {return <any> (val2.power) - <any> (val1.power)})
      let message = this.translate.get('powerAsc')['value'];
      this.filterSelction = message;
    }
    if(type == 'powerDesc'){
      this.ads.sort((val1, val2)=> {return <any> (val1.power) - <any> (val2.power)})
      let message = this.translate.get('powerDsc')['value'];
      this.filterSelction = message;
    }
    if(type == 'firstRegAsc'){
      this.ads.sort((val1, val2)=> {return <any> (val2.registration) - <any> (val1.registration)})
      let message = this.translate.get('firstRegAsc')['value'];
      this.filterSelction = message;
    }
    if(type == 'firstRegDesc'){
      this.ads.sort((val1, val2)=> {return <any> (val1.registration) - <any> (val2.registration)})
      let message = this.translate.get('firstRegDsc')['value'];
      this.filterSelction = message;
    }
    if(type == 'dateAsc'){
      this.ads.sort((val1, val2)=> {return <any> new Date(val1.created_at) - <any> new 
        Date(val2.created_at)})
        let message = this.translate.get('dateAsc')['value'];
        this.filterSelction = message;
    }
    if(type == 'dateDesc'){
      this.ads.sort((val1, val2)=> {return <any> new Date(val2.created_at) - <any> new 
        Date(val1.created_at)})
        let message = this.translate.get('dateDsc')['value'];
        this.filterSelction = message;
    }
    $("#products").addClass("hide");
    $("#products").removeClass("show");
  }




  //dont delete
  getDoors(val){
    let unique = true
    this.doors = val
    if(this.doors){
      for(var i=0; i<this.searchTags.length; i++){
        if(this.searchTags[i] == this.doors){
          unique = false;
        }
      }
      if(unique == true){
        this.searchTags.push("Doors:"+this.doors)
        let data = this.loginService.getSearchData();
        data.doors = this.doors;
        this.loginService.setSearchData(data);
        this.getAds();
      }
      
    }

  }
  getSeller(val){
    let unique = true
    this.seller = val
    if(this.seller){
      for(var i=0; i<this.searchTags.length; i++){
        if(this.searchTags[i] == this.seller){
          unique = false;
        }
      }
      if(unique == true){
        this.searchTags.push(this.seller)
       
        let data = this.loginService.getSearchData();
        data.seller = this.seller;
        this.loginService.setSearchData(data);
        this.getAds();
      }
      
    }
  }
  getOwner(val){
    this.owners = val
    let unique = true
    if(this.owners){
      for(var i=0; i<this.searchTags.length; i++){
        if(this.searchTags[i] == this.owners){
          unique = false;
        }
      }
      if(unique == true){
        this.searchTags.push(this.owners)
        let data = this.loginService.getSearchData();
        data.owners = this.owners;
        this.loginService.setSearchData(data);
        this.getAds();
      }
      
    }
  }
  getEmmisonLabel(val){
    this.emmison = val
    let unique = true
    if(this.emmison){
      for(var i=0; i<this.searchTags.length; i++){
        if(this.searchTags[i] == this.emmison){
          unique = false;
        }
      }
      if(unique == true){
        this.searchTags.push("Emission:"+this.emmison)
        let data = this.loginService.getSearchData();
        data.emission = this.emmison;
        this.loginService.setSearchData(data);
        this.getAds();
      }
      
    }
  }
  
  selectOnlyThis(id) {
   
  //   var myCheckbox = document.getElementsByName("myCheckbox");
  //   Array.prototype.forEach.call(myCheckbox,function(el){
  //     el.checked = false;
  //   });
  //   id.srcElement.checked = true;
  //   var target = id.target || id.srcElement || id.currentTarget;
  //   var idAttr = target.attributes.id;
  //   var value = idAttr.nodeValue;
  //  this.vehicleCond = value
  //  let unique = true
  //  if(this.vehicleCond){
  //    for(var i=0; i<this.searchTags.length; i++){
  //      if(this.searchTags[i] == this.vehicleCond){
  //        unique = false;
  //      }
  //    }
  //    if(unique == true){
  //      this.searchTags.push(this.vehicleCond)
  //    }
     
  //  }


  this.vehicalCondions
        .filter(opt => opt['checked'])
        .map(opt => opt.name);
    
      
        for(var i=0; i<this.vehicalCondions.length;i++){
          let unique = true
          if(this.vehicalCondions[i].checked){
            for(var j=0; j<this.searchTags.length; j++){
              if(this.searchTags[j] == this.vehicalCondions[i].name){
                unique = false;
               
              }
            }
            if(unique == true){
              this.searchTags.push(this.vehicalCondions[i].name)
              let data = this.loginService.getSearchData();
              data.vehicalCond = this.vehicalCondions[i].name;
              this.loginService.setSearchData(data);
              this.getAds();
            }

          }
        }


}

getEqpValues()
{
  this.equpments
        .filter(opt => opt['checked'])
        .map(opt => opt.name);
    
      
        for(var i=0; i<this.equpments.length;i++){
          let unique = true
          if(this.equpments[i].checked){
            for(var j=0; j<this.searchTags.length; j++){
              if(this.searchTags[j] == this.equpments[i].name){
                unique = false;
               
              }
            }
            if(unique == true){
              this.searchTags.push(this.equpments[i].name)
              let data = this.loginService.getSearchData();
              data.eqp = this.equpments[i].name;
              this.loginService.setSearchData(data);
              this.getAds();
            }

          }
          
        }
        
}

handleAddressChange(event){

  this.city = event.formatted_address;
  let unique =true
  if(this.city){
    for(var i=0; i<this.searchTags.length; i++){
      if(this.searchTags[i] == this.city){
        unique = false;
      }
    }
    if(unique == true){
      this.searchTags.push(this.city)
    }
    
  }
  }
selectOnlyThisColor(id){
  this.color
  .filter(opt => opt['checked'])
  .map(opt => opt.name);


  for(var i=0; i<this.color.length;i++){
    let unique = true
    if(this.color[i].checked){
      for(var j=0; j<this.searchTags.length; j++){
        if(this.searchTags[j] == this.color[i].name){
          unique = false;
         
        }
      }
      if(unique == true){
        this.searchTags.push(this.color[i].name)
        let data = this.loginService.getSearchData();
        data.color = this.color[i].name;
        this.loginService.setSearchData(data);
        this.getAds();
      }

    }
    
  }
}
exteriorColor(id){
  // var myCheckbox = document.getElementsByName("colorCheckboxExt");
  // Array.prototype.forEach.call(myCheckbox,function(el){
  //   el.checked = false;
  // });
  // id.srcElement.checked = true;
  // var target = id.target || id.srcElement || id.currentTarget;
  // var idAttr = target.attributes.id;
  // var value = idAttr.nodeValue;
  // this.extCol = value
  this.color
        .filter(opt => opt['checked'])
        .map(opt => opt.name);
    
      
        for(var i=0; i<this.color.length;i++){
          let unique = true
          if(this.color[i].checked){
            for(var j=0; j<this.searchTags.length; j++){
              if(this.searchTags[j] == this.color[i].name){
                unique = false;
               
              }
            }
            if(unique == true){
              this.searchTags.push(this.color[i].name)
              let data = this.loginService.getSearchData();
              data.color = this.color[i].name;
              this.loginService.setSearchData(data);
              this.getAds();
 
            }

          }
          
        }


}

uphole(id){
  var myCheckbox = document.getElementsByName("uphole");
  Array.prototype.forEach.call(myCheckbox,function(el){
    el.checked = false;
  });
  id.srcElement.checked = true;
  var target = id.target || id.srcElement || id.currentTarget;
  var idAttr = target.attributes.id;
  var value = idAttr.nodeValue;
 this.upholeData = value
}


setGurantee(id){
  var myCheckbox = document.getElementsByName("guranteeType");
  Array.prototype.forEach.call(myCheckbox,function(el){
    el.checked = false;
  });
  id.srcElement.checked = true;
  var target = id.target || id.srcElement || id.currentTarget;
  var idAttr = target.attributes.id;
  var value = idAttr.nodeValue;
 this.gurantee = value
}

searchDetailsMake(){
  //let searchData = this.loginService.getSearchData();
  let value = this.searchForm.value.make;
  let unique = true;
  if(value){
    for(var i=0; i<this.searchTags.length; i++){
      if(this.searchTags[i] == value){
        unique = false;
      }
    }
    if(unique == true){
      this.searchTags.push(value)
    }
    
  }
  let data = this.loginService.getSearchData();
  data.make = value;
  this.loginService.setSearchData(data);
  this.getAds();
 
}

searchDetailsModel(){
  //let searchData = this.loginService.getSearchData();
  let value = this.searchForm.value.model;
  let unique = true;
  if(value){
    for(var i=0; i<this.searchTags.length; i++){
      if(this.searchTags[i] == value){
        unique = false;
      }
    }
    if(unique == true){
      this.searchTags.push(value)
    }
    
  }
  let data = this.loginService.getSearchData();
  data.model = value;
  this.loginService.setSearchData(data);
  this.getAds();
 
}
variant(){
  //let searchData = this.loginService.getSearchData();
  let value = this.searchForm.value.variant;
  let unique = true;
  if(value){
    for(var i=0; i<this.searchTags.length; i++){
      if(this.searchTags[i] == value){
        unique = false;
      }
    }
    if(unique == true){
      this.searchTags.push(value)
    }
    
  }
  let data = this.loginService.getSearchData();
  data.variant = value;
  this.loginService.setSearchData(data);
  this.getAds();
 
}
bodyType(){
  //let searchData = this.loginService.getSearchData();
  let value = this.searchForm.value.bodyType;
  let unique = true;
  if(value){
    for(var i=0; i<this.searchTags.length; i++){
      if(this.searchTags[i] == value){
        unique = false;
      }
    }
    if(unique == true){
      this.searchTags.push(value)
    }
    
  }
  let data = this.loginService.getSearchData();
  data.bodyType = value;
  this.loginService.setSearchData(data);
  this.getAds();
 
 
}
firstRegistration(){
  //let searchData = this.loginService.getSearchData();
  let value = this.searchForm.value.firstRegistration;
  let unique = true;
  if(value){
    for(var i=0; i<this.searchTags.length; i++){
      if(this.searchTags[i] == value){
        unique = false;
      }
    }
    if(unique == true){
      this.searchTags.push(value)
    }
    
  }
  let data = this.loginService.getSearchData();
  data.registration = value;
  this.loginService.setSearchData(data);
  this.getAds();
 
 
}
price(){
  //let searchData = this.loginService.getSearchData();
  let value = this.searchForm.value.priceFrom;
  let unique = true;
  if(value){
    for(var i=0; i<this.searchTags.length; i++){
      if(this.searchTags[i] == value){
        unique = false;
      }
    }
    if(unique == true){
      this.searchTags.push(value)
    }
    
  }
  let data = this.loginService.getSearchData();
  data.priceFrom = value;
  this.loginService.setSearchData(data);
  this.getAds();
 
 
}

priceTo(){
  //let searchData = this.loginService.getSearchData();
  let value = this.searchForm.value.priceTo;
  let unique = true;
  if(value){
    for(var i=0; i<this.searchTags.length; i++){
      if(this.searchTags[i] == value){
        unique = false;
      }
    }
    if(unique == true){
      this.searchTags.push(value)
    }
    
  }
  let data = this.loginService.getSearchData();
  data.priceTo = value;
  this.loginService.setSearchData(data);
  this.getAds();
 
 
}
city(){
  //let searchData = this.loginService.getSearchData();
  let value = this.searchForm.value.city;
  let unique = true;
  if(value){
    for(var i=0; i<this.searchTags.length; i++){
      if(this.searchTags[i] == value){
        unique = false;
      }
    }
    if(unique == true){
      this.searchTags.push(value)
    }
    
  }
  let data = this.loginService.getSearchData();
  data.city = value;
  this.loginService.setSearchData(data);
  this.getAds();
 
 
}

mileage(){
  //let searchData = this.loginService.getSearchData();
  let value = this.searchForm.value.mileageFrom;
  let unique = true;
  if(value){
    for(var i=0; i<this.searchTags.length; i++){
      if(this.searchTags[i] == value){
        unique = false;
      }
    }
    if(unique == true){
      this.searchTags.push(value)
    }
    
  }
  let data = this.loginService.getSearchData();
  data.mileageFrom = value;
  this.loginService.setSearchData(data);
  this.getAds();
 
 
}
mileageTo(){
  //let searchData = this.loginService.getSearchData();
  let value = this.searchForm.value.mileageTo;
  let unique = true;
  if(value){
    for(var i=0; i<this.searchTags.length; i++){
      if(this.searchTags[i] == value){
        unique = false;
      }
    }
    if(unique == true){
      this.searchTags.push(value)
    }
    
  }
  let data = this.loginService.getSearchData();
  data.mileageTo = value;
  this.loginService.setSearchData(data);
  this.getAds();
 
 
}

power(){
  //let searchData = this.loginService.getSearchData();
  let value = this.searchForm.value.power;
  let unique = true;
  if(value){
    for(var i=0; i<this.searchTags.length; i++){
      if(this.searchTags[i] == value){
        unique = false;
      }
    }
    if(unique == true){
      this.searchTags.push(value)
    }
    
  }
  let data = this.loginService.getSearchData();
  data.power = value;
  this.loginService.setSearchData(data);
  this.getAds();
 
 
}
gear(){
  //let searchData = this.loginService.getSearchData();
  let value = this.searchForm.value.gear;
  let unique = true;
  if(value){
    for(var i=0; i<this.searchTags.length; i++){
      if(this.searchTags[i] == value){
        unique = false;
      }
    }
    if(unique == true){
      this.searchTags.push(value)
    }
    
  }
  let data = this.loginService.getSearchData();
  data.gear = value;
  this.loginService.setSearchData(data);
  this.getAds();
 
 
}

seats(){
  //let searchData = this.loginService.getSearchData();
  let value = this.searchForm.value.seats;
  let unique = true;
  if(value){
    for(var i=0; i<this.searchTags.length; i++){
      if(this.searchTags[i] == value){
        unique = false;
      }
    }
    if(unique == true){
      this.searchTags.push(value)
    }
    
  }
  let data = this.loginService.getSearchData();
  data.seats = value;
  this.loginService.setSearchData(data);
  this.getAds();
 
 
}
accident(){
  let value = this.searchForm.value.accident;
  let unique = true;
  if(value){
    for(var i=0; i<this.searchTags.length; i++){
      if(this.searchTags[i] == value){
        unique = false;
      }
    }
    if(unique == true){
      this.searchTags.push(value)
    }
    
  }
  let data = this.loginService.getSearchData();
  data.accident = value;
  this.loginService.setSearchData(data);
  this.getAds();
 
}

fuelType(){
  //let searchData = this.loginService.getSearchData();
  let value = this.searchForm.value.fuelType;
  let unique = true;
  if(value){
    for(var i=0; i<this.searchTags.length; i++){
      if(this.searchTags[i] == value){
        unique = false;
      }
    }
    if(unique == true){
      this.searchTags.push(value)
    }
    
  }
  let data = this.loginService.getSearchData();
  data.fuelType = value;
  this.loginService.setSearchData(data);
  this.getAds();
 
 
}
vat(){
  let unique =true;
  if(this.searchForm.value.vat){
    this.searchTags.push("Vat Deductable")

  }
  let data = this.loginService.getSearchData();
  data.vat = true;
  this.loginService.setSearchData(data);
  this.getAds();
 
}
filter(){
  console.log(this.searchForm.value.filter)
  let unique =true;
  if(this.searchForm.value.filter){
    
    this.searchTags.push("Particular filter")
  }
  let data = this.loginService.getSearchData();
  data.filter = true;
  this.loginService.setSearchData(data);
  this.getAds();
 
}

getMakes(){
  this.ngxService.start();
   this.loginService.getMakes().subscribe((result) => {
     let finalArr = [];
     let bikeArr = [];
     let truckArr = [];
     let vanArr = []
     let makes = result['success'];
     this.resultMakes = makes
     for(var i=0; i<makes.length; i++){
      if(makes[i].type == 'car'){
        finalArr.push(makes[i])
       }else if(makes[i].type == 'bike'){
         bikeArr.push(makes[i])
       }else if(makes[i].type == 'truck'){
         truckArr.push(makes[i])
       }
      else if(makes[i].type == 'van'){
        vanArr.push(makes[i])
      }
       
     }
    this.makes = finalArr;
    this.bikeMakes = bikeArr;
    this.makescpy = this.makes;
    this.truckMakes = truckArr;
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
this.truckMakes.sort(function(a, b){
  if(a.make < b.make) { return -1; }
  if(a.make > b.make) { return 1; }
  return 0;
})
vanArr.sort(function(a, b){
  if(a.make < b.make) { return -1; }
  if(a.make > b.make) { return 1; }
  return 0;
})

if(this.adType == 'car'){
  this.makes = this.makescpy;
}else if(this.adType == 'bike'){
  this.makes = this.bikeMakes;
}else if(this.adType == 'truck'){
  this.makes = this.truckMakes;
}else{
  this.makes =  vanArr;
}
   }, (err) => {
    this.toastr.error('Network error occured.');
    this.ngxService.stop();
   });
 }
 

 getModels(){

  this.ngxService.start();
   let id = this.filterMakeID();
   this.loginService.getModels(id).subscribe((result) => {
    this.models = result["success"]
    this.ngxService.stop();
   }, (err) => {
    this.toastr.error('Network error occured.');
    this.ngxService.stop();
   });
   let value = this.searchForm.value.make;
   let unique = true;
   if(value){
     for(var i=0; i<this.searchTags.length; i++){
       if(this.searchTags[i] == value){
         unique = false;
       }
     }
     if(unique == true){
       this.searchTags.push(value)
     }
     
   }
   let dataSearch = this.loginService.getSearchData();
   dataSearch.make = value;
   this.loginService.setSearchData(dataSearch);
   this.getAds();
 }
    getMakesTrucks() {
     let finalArr = [];
    for(var i=0; i<this.resultMakes.length; i++){
      if(this.resultMakes[i].category == this.searchForm.value.category){
        finalArr.push(this.resultMakes[i])
      }
    }
    this.makes = finalArr
    let value = this.searchForm.value.category;
    let unique = true;
    if(value){
      for(var i=0; i<this.searchTags.length; i++){
        if(this.searchTags[i] == value){
          unique = false;
        }
      }
      if(unique == true){
        this.searchTags.push(value)
      }
      
    }
    let data = this.loginService.getSearchData();
    data.category = value;
    this.loginService.setSearchData(data);
    this.getAds();
     
      
    } 
 filterMakeID(){
  for(var i=0; i<this.makes.length; i++){
    if(this.makes[i].make == this.searchForm.value.make){
      return this.makes[i].id
    }
  }
}

getEqps(){
  this.loginService.getEqp().subscribe((result) => {
    this.eqps = [];
    let eqps = result["equipments"]
    let enter = result["enter"]
    let other = result["other"]
    let security = result["security"]
    let bikeEqps =  result["bikes"]
    this.bikeEqps =  []

    for(var i=0; i<eqps.length; i++){
      this.eqps.push({name:eqps[i].name,checked:false})
    }
    for(var j=0; j<enter.length; j++){
      this.eqps.push({name:enter[j].name,checked:false})
    }
    for(var k=0; k<other.length; k++){
      this.eqps.push({name:other[k].name,checked:false})
    }
    for(var l=0; l<security.length; l++){
      this.eqps.push({name:security[l].name,checked:false})
    }
    for(var l=0; l<bikeEqps.length; l++){
      this.bikeEqps.push({name:bikeEqps[l].name,checked:false})
    }
    if(this.adType == 'car' || this.adType == 'truck' || this.adType == 'van'){
      this.equpments = this.eqps;
    }else{
      this.equpments = this.bikeEqps
    }

    this.ngxService.stop();
   }, (err) => {
    this.toastr.error('Network error occured.');
    this.ngxService.stop();
   });
}

saveSearch(){
  let searchData = this.loginService.getSearchData();
  let type = this.adType
  let id = this.userDetails.id
  this.loginService.saveSearch(searchData,id,type).subscribe((result) => {
    this.router.navigateByUrl("/saved-searches")
      this.toastr.success("Your search saved successfully.")
    this.ngxService.stop();
   }, (err) => {
    this.toastr.error('Network error occured.');
    this.ngxService.stop();
   });
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

getCountries(){
  this.ngxService.start();
  this.loginService.countries().subscribe((result:any) => {
    this.countries = result['message'];

    let searchTags = this.loginService.getSearchData();
    if(searchTags.countryName){
      this.searchForm.controls['countryName'].setValue(searchTags.countryName);
    }

    let code = this.getcountrycode().country_code
    console.log(code)
    this.options.componentRestrictions.country = code;
    this.getCountryCurrency( this.searchForm.value.countryName)

   
    this.placesRef.reset()
    this.ngxService.stop();
   
    },(err) => {

      this.ngxService.stop();
     })
}

changeCountry(){

  let value = this.searchForm.value.countryName;
  let unique = true;
  if(value){
    for(var i=0; i<this.searchTags.length; i++){
      if(this.searchTags[i] == value){
        unique = false;
      }
    }
    if(unique == true){
      this.searchTags.push(value)
    }
    
  }
    let code = this.getcountrycode().country_code
    console.log(code)
    this.options.componentRestrictions.country = code;
    this.getCountryCurrency( this.searchForm.value.countryName)

    let data = this.loginService.getSearchData();
    data.countryName = value;
    this.loginService.setSearchData(data);
    this.getAds();
    this.placesRef.reset()
  // let code = this.getcountrycode().country_code
  // this.options.componentRestrictions.country = code;
  // this.getCountryCurrency( this.searchForm.value.countryName)
  // this.placesRef.reset()
  // this.placesRef1.reset()
  // this.placesRef2.reset()
  // this.placesRef3.reset()
  // this.searchDetails();
}
getcountrycode(){
  for(var i=0; i<this.countries.length; i++){
    if(this.countries[i].country == this.searchForm.value.countryName){

      return this.countries[i]
    }
  }
}

}
