import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from "./../services/login.service";
import { Router } from "@angular/router";
import {CookieService} from 'angular2-cookie/core';
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.css']
})
export class CreateAdComponent implements OnInit {
  doors:any = 2;
  seller = 'dealer';
  owners:any = 1;
  emmison:any = 1;
  searchAddr:any;
  condition:any;
  vehicleCond = 'New';
  lat:any
  long:any
  makes:any
  models:any;
  equpments :any
  equpmentsSafety :any
  equpmentsExtra :any
  equpmentsEnter :any
  maximumImages:any;
  adType = "car";
  vanMakes:any;
  bikeMakes:any;
  resultMakes:any;
  bikes:any
  emison :any = 1
  truckMakes:any
  makesCpy:any;
  color = [{name:"beige",checked:true},{name:"blue",checked:false},{name:"brown",checked:false},{name:"yellow",checked:false},{name:"grey",checked:false},{name:"green",checked:false},{name:"red",checked:false},{name:"black",checked:false},{name:"white",checked:false}]

  upholsetry = [{name:"alcantara",checked:true},{name:"Cloth",checked:false},{name:"Full leather",checked:false},{name:"Part leather",checked:false},{name:"Velour",checked:false},{name:"Other",checked:false}]

  vehicalCondions = [{name:"New",checked:true},{name:"Used",checked:false},{name:"Employee's Car",checked:false},{name:"Antique Classic",checked:false},{name:"Demonstration",checked:false},{name:"Pre-Registered",checked:false}]

  vehicalCondionsBike = [{name:"New",checked:true},{name:"Used",checked:false},{name:"Antique Classic",checked:false},{name:"Demonstration",checked:false},{name:"Pre-Registered",checked:false}]
  gurrantee = [{name:"Gurantee",checked:true},{name:"With Full Service History",checked:false},{name:"no smoking vehicle",checked:false}]
  gurantee = "Gurantee"
  postData:any;
  options:any;
  eqps:any
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
  years:any
  constructor(private _cookieService:CookieService,private loginService: LoginService,private router : Router,private formBuilder: FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService,private translate: TranslateService) {}
  
  AdForm : FormGroup
  submitted = false
  intCol = 'beige';
  extCol = 'beige';
  upholeData:'alcantara';
  conversion:any
  countryObj:any
  ngOnInit() {
    let  countryCode = JSON.parse(this.loginService.getUserDetails().countryObj).country_code
    let currncies = this.loginService.getCurrncies();
    this.countryObj = JSON.parse(this.loginService.getUserDetails().countryObj)
    this.conversion =  this.loginService.checkUserCurrency(this.countryObj.code,currncies);

    this.maximumImages = this.loginService.getPlanDetails().photos;
    this.getMakes();
  this.getEqps();
    this.options = {
      types: ['(cities)'],
      componentRestrictions: { country: [countryCode] }
      }

    this.AdForm = this.formBuilder.group({ 
      make:['',[Validators.required]],
      model:['',[Validators.required]],
      variant:['',[Validators.required]],
      bodyType:['',[Validators.required]],
      price:['',[Validators.required]],
      city:['',[Validators.required]],
      mileage:['',[Validators.required]],
      power:[''],
      gear:['',[Validators.required]],
      seats:['',[Validators.required]],
      metalic:[false],
      hadAccident:[''],
      emmison:['Euro 1',[Validators.required]],
      filter:[false],
      vat:[false],
      fuelType:['',[Validators.required]],
      description:['',[Validators.required]],
      totalGears:['',[Validators.required]],
      displacement:[''],
      weight:[''],
      cylinder:['',[Validators.required]],
      registration:['',[Validators.required]],
      type:['car'],
      powerUnit:[],
      engineSize:[''],
      accleration:[''],
      annualTax:[''],
      fuelConsumpation:[''],
      co2:[''],
      category:['']
     
    });
    this.AdForm.controls.type.setValue('car');
    const now = new Date().getUTCFullYear();    
    const years = Array(now - (now - 30)).fill('').map((v, idx) => now - idx);
    this.years = years;
  }
  getDoors(val){
    this.doors = val
  }
  getSeller(val){
    this.seller = val
  }
  getOwner(val){
    this.owners = val
  }
  getEmmisonLabel(val){
    this.emmison = val
  }
  
  selectOnlyThis(id) {
   
    var myCheckbox = document.getElementsByName("myCheckbox");
    Array.prototype.forEach.call(myCheckbox,function(el){
      el.checked = false;
    });
    id.srcElement.checked = true;
    var target = id.target || id.srcElement || id.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
   this.vehicleCond = value
}

getEqpValues()
{
  this.equpments
        .filter(opt => opt['checked'])
        .map(opt => opt.name);
        console.log(this.equpments)
}

getEqpValuesSaftey(){
  this.equpmentsSafety
        .filter(opt => opt['checked'])
        .map(opt => opt.name);
}
getEqpValuesExtra(){
  this.equpmentsExtra
        .filter(opt => opt['checked'])
        .map(opt => opt.name);
}
getEqpValuesEnter(){
  this.equpmentsEnter
        .filter(opt => opt['checked'])
        .map(opt => opt.name);
}

selectOnlyThisColor(id){
  var myCheckbox = document.getElementsByName("colorCheckbox");
  Array.prototype.forEach.call(myCheckbox,function(el){
    el.checked = false;
  });
  id.srcElement.checked = true;
  var target = id.target || id.srcElement || id.currentTarget;
  var idAttr = target.attributes.id;
  var value = idAttr.nodeValue;
  this.intCol = value
}
exteriorColor(id){
  var myCheckbox = document.getElementsByName("colorCheckboxExt");
  Array.prototype.forEach.call(myCheckbox,function(el){
    el.checked = false;
  });
  id.srcElement.checked = true;
  var target = id.target || id.srcElement || id.currentTarget;
  var idAttr = target.attributes.id;
  var value = idAttr.nodeValue;
  this.extCol = value
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

createAd(){

  this.submitted = true;
  if(this.fileData.length == this.loginService.getPlanDetails().photos){
    let message = this.translate.get('reached')['value'];
    this.toastr.error(message);
    return;
  }
  let eqpArr:any = [];
  let eqpArrExtra:any = [];
  let eqpArrSaftey:any = [];
  let eqpArrEnter:any = [];
 for(var i=0; i<this.equpments.length; i++){
   if(this.equpments[i].checked){
    eqpArr.push(this.equpments[i])
   }
 }
 for(var i=0; i<this.equpmentsExtra.length; i++){
  if(this.equpmentsExtra[i].checked){
    eqpArrExtra.push(this.equpmentsExtra[i])
  }
}
for(var i=0; i<this.equpmentsSafety.length; i++){
  if(this.equpmentsSafety[i].checked){
    eqpArrSaftey.push(this.equpmentsSafety[i])
  }
}
for(var i=0; i<this.equpmentsEnter.length; i++){
  if(this.equpmentsEnter[i].checked){
    eqpArrEnter.push(this.equpmentsEnter[i])
  }
}
  let postData = {
      make:this.AdForm.value.make,
      model:this.AdForm.value.model,
      variant:this.AdForm.value.variant,
      bodyType:this.AdForm.value.bodyType,
      price:this.AdForm.value.price,
      city:this.searchAddr,
      mileage:this.AdForm.value.mileage,
      power:this.AdForm.value.power,
      gear:this.AdForm.value.gear,
      seats:this.AdForm.value.seats,
      metalic:this.AdForm.value.metalic,
      hadAccident:this.AdForm.value.hadAccident,
      emmison:this.AdForm.value.emmison,
      filter:this.AdForm.value.filter,
      vat:this.AdForm.value.vat,
      gurantee:this.gurantee,
      uphole:this.upholeData,
      exteriorColor:this.extCol,
      interiorColor:this.intCol,
      eqpArr:eqpArr ,
      vehicleCond:this.vehicleCond,
      owners:this.owners,
      sellers:this.seller,
      doors:this.doors,
      emison:this.emmison,
      fuelType:this.AdForm.value.fuelType,
      description:this.AdForm.value.description,
      eqpArrExtra:eqpArrExtra,
      eqpArrSaftey:eqpArrSaftey,
      eqpArrEnter:eqpArrEnter,
      totalGears:this.AdForm.value.totalGears,
      displacement:this.AdForm.value.displacement,
      weight:this.AdForm.value.weight,
      cylinder:this.AdForm.value.cylinder,
      registration:this.AdForm.value.registration,
      userID:this.loginService.getUserDetails().id,
      fileData:this.fileData,
      lat:this.lat,
      long:this.long,
      type:this.AdForm.value.type,
      limit_images:this.loginService.getPlanDetails().photos,
      powerUnit:this.AdForm.value.powerUnit,
      country:"United Kingdom",
      engineSize:this.AdForm.value.engineSize,
      accleration:this.AdForm.value.accleration,
      annualTax:this.AdForm.value.registration,
      fuelConsumpation:this.AdForm.value.fuelConsumpation,
      co2:this.AdForm.value.co2,
      category:this.AdForm.value.category,
  }
  this.loginService.setData(this.fileData);

  console.log(postData)
  if(this.fileData.length == 0){
    let message = this.translate.get('selectImage')['value'];
    this.toastr.error(message);
    return;
  }



  if(this.AdForm.invalid){
    let message = this.translate.get('req')['value'];
    this.toastr.error(message);
    return
  }
  if(this.loginService.getPlanDetails().price == 0){
    const formData = new FormData();
    if( this.fileData &&  this.fileData.length){
      for (var i = 0; i < this.fileData.length; i++) { 
        formData.append("fileUpload"+i, this.fileData[i]);
      }
    }
    formData.append('make',this.AdForm.value.make)
    formData.append('model',this.AdForm.value.model)
    formData.append('variant',this.AdForm.value.variant)
    formData.append('bodyType',this.AdForm.value.bodyType)
    formData.append('price',this.AdForm.value.price)
    formData.append('city',this.searchAddr)
    formData.append('mileage',this.AdForm.value.mileage)
    formData.append('power',this.AdForm.value.power)
    formData.append('gear',this.AdForm.value.gear)
    formData.append('seats',this.AdForm.value.seats)
    formData.append('metalic',this.AdForm.value.metalic)
    formData.append('hadAccident',this.AdForm.value.hadAccident)
    formData.append('emmison',this.AdForm.value.emmison)
    formData.append('filter',this.AdForm.value.filter)
    formData.append('vat',this.AdForm.value.vat)
    formData.append('gurantee',this.gurantee)
    formData.append('uphole',this.upholeData)
    formData.append('exteriorColor',this.extCol)
    formData.append('interiorColor',this.intCol)
    formData.append('eqpArr',JSON.stringify(eqpArr))
    formData.append('vehicleCond',this.vehicleCond)
    formData.append('owners',this.owners)
    formData.append('sellers',this.seller)
    formData.append('doors',this.doors)
    formData.append('emison',this.emison)
    formData.append('fuelType',this.AdForm.value.fuelType)
    formData.append('description',this.AdForm.value.description)
    formData.append('eqpArrExtra',JSON.stringify(eqpArrExtra))
    formData.append('eqpArrSaftey',JSON.stringify(eqpArrSaftey))
    formData.append('eqpArrEnter',JSON.stringify(eqpArrEnter))
    formData.append('totalGears',this.AdForm.value.totalGears)
    formData.append('displacement',this.AdForm.value.displacement)
    formData.append('weight',this.AdForm.value.weight)
    formData.append('cylinder',this.AdForm.value.cylinder)
    formData.append('registration',this.AdForm.value.registration)
    
    formData.append('userID',this.loginService.getUserDetails().id)
    formData.append('lat',this.lat)
    formData.append('long',this.long)
    formData.append('type',this.AdForm.value.type)
    formData.append('limit_images',this.loginService.getPlanDetails().photos)
    formData.append('powerUnits',this.AdForm.value.powerUnits)
    formData.append('country',"United Kingdom")
    formData.append('engineSize',this.AdForm.value.engineSize)
    formData.append('accleration',this.AdForm.value.accleration)
    formData.append('annualTax',this.AdForm.value.annualTax)
    formData.append('fuelConsumpation',this.AdForm.value.fuelConsumpation)

    formData.append('co2',this.AdForm.value.co2)
    formData.append('category',this.AdForm.value.category)
  
    
  
    this.ngxService.start();
 
    this.loginService.createAd(formData).subscribe((result) => {
      this.router.navigateByUrl('/my-ads');
       this.ngxService.stop();
      }, (err) => {
        let message = this.translate.get('networkerr')['value'];
    this.toastr.error(message);
      
      });
       
     
   }else{
      this.loginService.setadDetails(postData);
     this.router.navigateByUrl("/checkout")
   }
  
  

}
urls = [];
  fileData= [];
  onSelectFile(event) {
    var allowedExtensions = ["jpg","jpeg","png","JPG","JPEG","PNG"]; // allowed extensions
    let fileExtesion = event.target.files[0].type.split("/")[1]; // image selection extension
    if(allowedExtensions.indexOf(fileExtesion) == -1){
      let message = this.translate.get('uploadError')['value'];
      this.toastr.error(message);
      return;
    }
    if(event.target.files[0]){
    if(event.target.files[0].size/1024/1024 > 2){
      let message = this.translate.get('fileSize')['value'];
      this.toastr.error(message);
      return;
     }
    }
     if(this.fileData.length == this.loginService.getPlanDetails().photos){
      let message = this.translate.get('reached')['value'];
      this.toastr.error(message);
      return;
    }
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event:any) => {
                
                   this.urls.push(event.target.result); 
                 
                }
                this.fileData.push(event.target.files[i]); 
                reader.readAsDataURL(event.target.files[i]);
        }
        
    }
  }

  removeImg(data:any){
    for( var i =0;i<this.urls.length; i++){
      if ( this.urls[i] == data){
        this.urls.splice(i, 1);
        this.fileData.splice(i,1)
        } 
    }
  }
  handleAddressChange(event){
   this.lat = event.geometry.location.lng()
   this.long = event.geometry.location.lat()
  this.searchAddr = event.formatted_address;
    
  }
  get f() { return this.AdForm.controls; }

  getMakes(){
    this.ngxService.start();
     this.loginService.getMakes().subscribe((result) => {
       let finalArr = [];
       let bikeArr = [];
       let truckArr = [];
       let vanArr = [];
       let makes = result['success'];
       this.resultMakes = makes
       for(var i=0; i<makes.length; i++){
         if(makes[i].type == 'car'){
          finalArr.push(makes[i])
         }else if(makes[i].type=="bike"){
           bikeArr.push(makes[i])
         }
         else if(makes[i].type=="truck"){
          truckArr.push(makes[i])
        }
        else if(makes[i].type == 'van'){
          vanArr.push(makes[i])
        }
       }
      this.makes = finalArr;
      this.bikeMakes = bikeArr;
      this.truckMakes = truckArr;
      this.makesCpy = this.makes;
      this.vanMakes = vanArr
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
      let message = this.translate.get('networkerr')['value'];
      this.toastr.error(message);
        
      this.ngxService.stop();
     });
   
    
   }
   filterMakeID(){
    for(var i=0; i<this.makes.length; i++){
      if(this.makes[i].make == this.AdForm.value.make){
        return this.makes[i].id
      }
    }
  }

  getEqps(){
    this.loginService.getEqp().subscribe((result) => {
      this.equpments = [];
      this.equpmentsEnter = [];
      this.equpmentsExtra = [];
      this.equpmentsSafety = [];
      this.bikes = [];
      let eqps = result["equipments"]
      let enter = result["enter"]
      let other = result["other"]
      let security = result["security"]

      let bikes = result["bikes"]
      for(var i=0; i<bikes.length; i++){
        this.bikes.push({name:bikes[i].name,checked:false})
      }
      for(var i=0; i<eqps.length; i++){
        this.equpments.push({name:eqps[i].name,checked:false})
      }
      for(var j=0; j<enter.length; j++){
        this.equpmentsEnter.push({name:enter[j].name,checked:false})
      }
      for(var k=0; k<other.length; k++){
        this.equpmentsExtra.push({name:other[k].name,checked:false})
      }
      for(var l=0; l<security.length; l++){
        this.equpmentsSafety.push({name:security[l].name,checked:false})
      }

      this.ngxService.stop();
     }, (err) => {
      let message = this.translate.get('networkerr')['value'];
      this.toastr.error(message);
        
      this.ngxService.stop();
     });
  }

  setTypeVeh(type){
    this.adType = type;
  if(type == 'bike'){
    this.makes = this.bikeMakes
  }else if(type == 'truck'){
    this.makes = this.truckMakes
  }
  else if(type == 'van'){
    this.makes = this.vanMakes
  }
    else{
    this.makes = this.makesCpy
  }
}
getMakesTrucks() {
  let finalArr = [];
 for(var i=0; i<this.resultMakes.length; i++){
   if(this.resultMakes[i].category == this.AdForm.value.category){
     finalArr.push(this.resultMakes[i])
   }
 }
 this.makes = finalArr
 
  
}   

}
