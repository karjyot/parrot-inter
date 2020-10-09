import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from "./../../services/login.service";
import { Router,ActivatedRoute } from "@angular/router";
import {CookieService} from 'angular2-cookie/core';
import {TranslateService} from '@ngx-translate/core';
import { AdminService } from "./../services/admin.service";

@Component({
  selector: 'app-admin-edit-ad',
  templateUrl: './admin-edit-ad.component.html',
  styleUrls: ['./admin-edit-ad.component.css']
})
export class AdminEditAdComponent implements OnInit {
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
  bikeMakes:any;
  bikes:any
  vanMakes:any;
  emison :any = 1
  makesCpy:any;
  limitImages:any;
  truckMakes:any;
  resultMakes:any;
  color = [{name:"beige",checked:false},{name:"blue",checked:false},{name:"brown",checked:false},{name:"yellow",checked:false},{name:"grey",checked:false},{name:"green",checked:false},{name:"red",checked:false},{name:"black",checked:false},{name:"white",checked:false}]
  colorExter = [{name:"beige",checked:false},{name:"blue",checked:false},{name:"brown",checked:false},{name:"yellow",checked:false},{name:"grey",checked:false},{name:"green",checked:false},{name:"red",checked:false},{name:"white",checked:false},{name:"black",checked:false}]

  upholsetry = [{name:"alcantara",checked:false},{name:"Clothe/Upholstery",checked:false},{name:"Full leather",checked:false},{name:"Part leather",checked:false},{name:"Velour",checked:false},{name:"Other",checked:false}]

  vehicalCondions = [{name:"New",checked:true},{name:"Used",checked:false},{name:"Employee's Car",checked:false},{name:"Antique Classic",checked:false},{name:"Demonstration",checked:false},{name:"Pre-Registered",checked:false}]
  vehicalCondionsBike = [{name:"New",checked:true},{name:"Used",checked:false},{name:"Antique Classic",checked:false},{name:"Demonstration",checked:false},{name:"Pre-Registered",checked:false}]
  gurrantee = [{name:"Gurantee",checked:true},{name:"With Full Service History",checked:false},{name:"no smoking vehicle",checked:false}]
  gurantee = "Gurantee"
  postData:any;
  options:any;
  adID:any;
  eqps:any;
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
  constructor(private adminService: AdminService,private _cookieService:CookieService,private route: ActivatedRoute,private loginService: LoginService,private router : Router,private formBuilder: FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService,private translate: TranslateService) {}
  AdForm : FormGroup
  submitted = false
  intCol = 'beige';
  extCol = 'beige';
  upholeData:'alcantara';
  countryObj:any;
  conversion:any;
  ngOnInit() {
    let id =  this.route.snapshot.params.id;
    this.adID = id
   
    let  countryCode = JSON.parse(this.adminService.getAdminAd().countryObj).country_code
    console.log(countryCode)
    let currncies = this.loginService.getCurrncies();
    this.countryObj = JSON.parse(this.adminService.getAdminAd().countryObj)
    this.conversion =  this.loginService.checkUserCurrency(this.countryObj.code,currncies);
    this.options = {
      types: ['(cities)'],
      componentRestrictions: { country: [countryCode] }
      }

    
    this.getAdDetails()
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
  
  if(this.urls.length == 0){
    let message = this.translate.get('selectImage')['value'];
    this.toastr.error(message);
    return;
  }


console.log(this.AdForm)
  if(this.AdForm.invalid){
    let message = this.translate.get('req')['value'];
    this.toastr.error(message);
    return
  }
  console.log(this.AdForm.value.city)
  if(this.searchAddr == undefined  || this.searchAddr == "undefined"){
    this.searchAddr = this.AdForm.value.city
  }
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
    formData.append('powerUnits',this.AdForm.value.powerUnits)
    formData.append('userID',this.adminService.getAdminAd().user_id)
    formData.append('lat',this.lat)
    formData.append('long',this.long)
    formData.append('type',this.AdForm.value.type)
    formData.append('limit_images',this.limitImages)
    formData.append('engineSize',this.AdForm.value.engineSize)
    formData.append('accleration',this.AdForm.value.accleration)
    formData.append('annualTax',this.AdForm.value.annualTax)
    formData.append('fuelConsumpation',this.AdForm.value.fuelConsumpation)
    formData.append('co2',this.AdForm.value.co2)
    formData.append('category',this.AdForm.value.category)
    //formData.append('country',this.countryObj.country)
    
    
  console.log(formData)
    this.ngxService.start();
 
    this.loginService.updateAd(formData,this.adminService.getAdminAd().AdID).subscribe((result) => {
      this.router.navigateByUrl('/admin/ads');
      this.toastr.success('Your ad updated successfully.')
       this.ngxService.stop();
      }, (err) => {
        let message = this.translate.get('networkerr')['value'];
        this.toastr.error(message);
      
      });


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
     if(this.urls.length == this.limitImages){
      let message = this.translate.get('reached')['value'];
        this.toastr.error(message);
      return;
    }
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event:any) => {
                
                   this.urls.push({image:event.target.result}); 
                 
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
    if(data.imageId){
      this.ngxService.start()
      this.loginService.deleteAdImage(data.imageId).subscribe((result) => {
         this.ngxService.stop()
         let message = this.translate.get('imageDel')['value'];
         this.toastr.error(message);
       }, (err) => {
        let message = this.translate.get('networkerr')['value'];
        this.toastr.error(message);
         this.ngxService.stop()
       });
    }
  }
  handleAddressChange(event){
   this.lat = event.geometry.location.lng()
   this.long = event.geometry.location.lat()
  this.searchAddr = event.formatted_address;
    
  }
  get f() { return this.AdForm.controls; }

  getMakes(make,model,type){
    this.ngxService.start();
    let truckArr = [];
     this.loginService.getMakes().subscribe((result) => {
       let finalArr = [];
       let bikeArr = [];
       let vanArr = [];
       let makes = result['success'];
       this.resultMakes = makes
       for(var i=0; i<makes.length; i++){
         if(makes[i].type == 'car'){
          finalArr.push(makes[i])
         }else if(makes[i].type == 'bike'){
           bikeArr.push(makes[i])
         }else if(makes[i].type=="truck"){
          truckArr.push(makes[i])
        }else if(makes[i].type == 'van'){
          vanArr.push(makes[i])
        }
       }
      this.makes = finalArr;
      this.bikeMakes = bikeArr;
      this.makesCpy = this.makes;
      this.truckMakes = truckArr;
      this.vanMakes = vanArr
      if(type == 'bike'){
        this.makes = this.bikeMakes
      }else if(type=='car'){
        this.makes = this.makesCpy
      }else if(type == 'truck'){
        this.makes = this.truckMakes
      }else {
        this.makes = this.vanMakes
      }

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
  this.AdForm.controls['make'].setValue(make);
  this.getModels(model)
     }, (err) => {
      let message = this.translate.get('networkerr')['value'];
      this.toastr.error(message);
      this.ngxService.stop();
     });
   }
   
  
   getModels(model){
  
    this.ngxService.start();
     let id = this.filterMakeID();
     this.loginService.getModels(id).subscribe((result) => {
      this.models = result["success"];
      if(model !='test'){
        this.AdForm.controls['model'].setValue(model);
      }
     
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

  getEqps(eqpArr,eqpArrEnter,eqpArrExtra,eqpArrSaftey){
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
        let checked = false;
        for(var iq=0; iq<eqpArr.length; iq++){
          if(eqpArr[iq].name == eqps[i].name){
            checked = true
          }
          
        }
        this.equpments.push({name:eqps[i].name,checked:checked})
      }
      for(var j=0; j<enter.length; j++){
        let checked = false;
        for(var ie=0; ie<eqpArrEnter.length; ie++){
          if(eqpArrEnter[ie].name == enter[j].name){
            checked = true
          }
        }
        this.equpmentsEnter.push({name:enter[j].name,checked:checked})
      }
      for(var k=0; k<other.length; k++){
        let checked = false;
        for(var io=0; io<eqpArrExtra.length; io++){
          if(eqpArrExtra[io].name == other[k].name){
            checked = true
          }
        }
        this.equpmentsExtra.push({name:other[k].name,checked:checked})
      }
      for(var l=0; l<security.length; l++){
        let checked = false;
        for(var is=0; is<eqpArrSaftey.length; is++){
          if(eqpArrSaftey[is].name == security[l].name){
            checked = true
          }
        }
        this.equpmentsSafety.push({name:security[l].name,checked:checked})
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
  }else{
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

  getAdDetails(){
    this.ngxService.start();
    
    
    this.AdForm = this.formBuilder.group({ 
      make:['',[Validators.required]],
      model:['',[Validators.required]],
      variant:[''],
      bodyType:['',[Validators.required]],
      price:['',[Validators.required]],
      city:['',[Validators.required]],
      mileage:['',[Validators.required]],
      power:[''],
      gear:[''],
      seats:['',[Validators.required]],
      metalic:[false],
      hadAccident:[''],
      emmison:['Euro 1'],
      filter:[false],
      vat:[false],
      fuelType:['',[Validators.required]],
      description:[''],
      totalGears:[''],
      displacement:[''],
      weight:[''],
      cylinder:[''],
      registration:[''],
      type:[],
      powerUnits:[],
      engineSize:[''],
      accleration:[''],
      annualTax:[''],
      fuelConsumpation:[''],
      co2:[''],
      category:[''],
      
     
    });
    const now = new Date().getUTCFullYear();    
    const years = Array(now - (now - 30)).fill('').map((v, idx) => now - idx);
    this.years = years;
    this.loginService.adDetails(this.adminService.getAdminAd().AdID).subscribe((result) => {
      let response = result['success'][0];
      this.adType = response.type
      let eqpArr =  JSON.parse(JSON.parse(response.eqpArr));
      let eqpArrEnter =  JSON.parse(JSON.parse(response.eqpArrEnter));
      let eqpArrExtra =  JSON.parse(JSON.parse(response.eqpArrExtra));
      let eqpArrSaftey =  JSON.parse(JSON.parse(response.eqpArrSaftey));
      this.getEqps(eqpArr,eqpArrEnter,eqpArrExtra,eqpArrSaftey)
      this.getMakes(response.make,response.model,response.type);

      this.AdForm.controls['bodyType'].setValue(response.bodyType);
      this.AdForm.controls['city'].setValue(response.city);
      this.AdForm.controls['cylinder'].setValue(response.cylinder);
      this.AdForm.controls['description'].setValue(response.description);
      this.AdForm.controls['displacement'].setValue(response.displacement);
      this.AdForm.controls['emmison'].setValue(response.emmison);
      this.AdForm.controls['filter'].setValue(response.filter);
      this.AdForm.controls['fuelType'].setValue(response.fuelType);
      this.AdForm.controls['gear'].setValue(response.gear);
      this.AdForm.controls['hadAccident'].setValue(response.hadAccident);
      this.AdForm.controls['metalic'].setValue(response.metalic);
      this.AdForm.controls['mileage'].setValue(response.mileage);
      this.AdForm.controls['power'].setValue(response.power);
      this.AdForm.controls['price'].setValue(response.price);
      this.AdForm.controls['registration'].setValue(response.registration);
      this.AdForm.controls['seats'].setValue(response.seats);
      this.AdForm.controls['totalGears'].setValue(response.totalGears);
      this.AdForm.controls['type'].setValue(response.type);
      this.AdForm.controls['variant'].setValue(response.variant);
      this.AdForm.controls['vat'].setValue(response.vat);
      this.AdForm.controls['weight'].setValue(response.weight);
      this.AdForm.controls['powerUnits'].setValue(response.powerUnits);
      this.AdForm.controls['engineSize'].setValue(response.engineSize);
      
      this.AdForm.controls['accleration'].setValue(response.accleration);
      this.AdForm.controls['annualTax'].setValue(response.annualTax);
      this.AdForm.controls['fuelConsumpation'].setValue(response.fuelConsumpation);
      this.AdForm.controls['co2'].setValue(response.co2);
      this.AdForm.controls['category'].setValue(response.category);
            
      if(response.category && response.category !='null'){
        this.getMakesTrucks()
      }
      this.doors = response.doors
      this.seller = response.sellers
      this.owners = response.owners
      this.emison = response.emison
      this.urls = response.files;
      this.lat = response.lat;
      this.long = response.longi;
      this.upholeData = response.uphole
      this.limitImages = response.limit_images
      this.searchAddr = response.city
      

      

      for(var i=0; this.color.length; i++){
        if(this.color[i].name == response.interiorColor){
          this.color[i].checked = true;
          break;
        }
      }
      response.exteriorColor = response.exteriorColor.split("-")[0]
      for(var k=0; this.colorExter.length; k++){
        if(this.colorExter[k].name == response.exteriorColor){
          this.colorExter[k].checked = true;
          break;
        }
      }
      if(response.uphole != "undefined"){
        for(var i=0; this.upholsetry.length; i++){
          if(this.upholsetry[i].name == response.uphole){
            this.upholsetry[i].checked = true;
            break;
          }
        }
      }
      
      for(var i=0; this.gurrantee.length; i++){
        if(this.gurrantee[i].name == response.gurantee){
          this.gurrantee[i].checked = true;
          break;
        }
      }
      

       this.ngxService.stop();
      }, (err) => {
        let message = this.translate.get('networkerr')['value'];
        this.toastr.error(message);
      
      });
  }
  

}
