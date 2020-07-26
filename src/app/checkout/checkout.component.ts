import { Component, OnInit } from '@angular/core';
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from "ngx-stripe";
import { ToastrService } from 'ngx-toastr';
import { NavigationEnd,Router } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoginService } from "./../services/login.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  fileData = this.loginService.getData();       
  elements: Elements;
  card: StripeElement;
  AdForm:any;
  userDetails:any;
  cards:any;
  walletAmount:any
 selectedPlanID:any
  elementsOptions: ElementsOptions = {
    locale: 'en'
  };
  planSelect:any;
  planName:any;
  amount:any;
  promo:any;
  discount:any;
  isPromoApplied = false;
 
  stripeTest: FormGroup;
  submitted = false;
  plans:any
  constructor(private fb: FormBuilder,private stripeService: StripeService,private ngxService: NgxUiLoaderService,private loginService: LoginService,private toastr: ToastrService,private router : Router) { }
  planDetails:any;
  wallet : any
  totalAmount:any;
  usedAmount : any;
  remaining:any;
  isDiablePay = true;
  checkboxWallet:false;
  deductedWallet:any;
  currency:any
  currencyRates:any
  userCurrency:any
  ngOnInit() {
  
    this.ngxService.start();
    
   this.currency = JSON.parse(this.loginService.getUserDetails().countryObj)
   this.currencyRates = this.loginService.getCurrncies();
    this.userCurrency = this.loginService.checkUserCurrency(this.currency.code,this.currencyRates)
    console.log(this.userCurrency)
    this.loginService.getWalletSummary(this.loginService.getUserDetails().id).subscribe((result:any) => {
      this.wallet = result['success'];
      let used = result['used'];
      let total = 0;
      let totalUsed = 0;
      for(var i=0; i<this.wallet.length; i++){
        total = Number(total) + parseFloat(this.wallet[i].amount);
      }

      for(var i=0; i<used.length; i++){
        totalUsed = Number(totalUsed) + parseFloat(used[i].amount);
      }
      this.totalAmount = total;
      this.usedAmount = totalUsed;

      let remaining = total-totalUsed;
      this.remaining = remaining.toFixed(2)
      if(this.remaining > this.loginService.getPlanDetails().amount){
        this.isDiablePay = false
      }

      this.ngxService.stop();
      },(err) => {
       try{
         let errMessage = err["error"]["message"];
         this.toastr.error(errMessage);
        }catch(e){
 
        }
        this.ngxService.stop();
       })



   this.planDetails =  this.loginService.getPlanDetails();
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]],
    });
    this.stripeService.elements(this.elementsOptions)
      .subscribe(elements => {
        this.elements = elements;
        // Only mount the element the first time
        if (!this.card) {
          this.card = this.elements.create('card', {
            hidePostalCode: true,
            style: {
              base: {
                iconColor: '#666EE8',
                color: '#31325F',
                lineHeight: '60px',
                fontWeight: 300,
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSize: '18px',
                '::placeholder': {
                  color: '#CFD7E0'
                }
              }
            }
          });
          this.card.mount('#card-element');
        }
      });
  }
  buy(price){

    let adDetail = this.loginService.getAdDetails();
    const formData = new FormData();
  if( this.fileData &&  this.fileData.length){
    for (var i = 0; i < this.fileData.length; i++) { 
      formData.append("fileUpload"+i, this.fileData[i]);
    }
  }
  this.AdForm = adDetail
  formData.append('type',this.AdForm.type)
  formData.append('make',this.AdForm.make)
  formData.append('model',this.AdForm.model)
  formData.append('variant',this.AdForm.variant)
  formData.append('bodyType',this.AdForm.bodyType)
  formData.append('price',this.AdForm.price)
  formData.append('city',this.AdForm.city)
  formData.append('mileage',this.AdForm.mileage)
  formData.append('power',"")
  formData.append('gear',this.AdForm.gear)
  formData.append('seats',this.AdForm.seats)
  formData.append('metalic',this.AdForm.metalic)
  formData.append('hadAccident',this.AdForm.hadAccident)
  formData.append('emmison',this.AdForm.emmison)
  formData.append('filter',this.AdForm.filter)
  formData.append('vat',this.AdForm.vat)
  formData.append('gurantee',this.AdForm.gurantee)
  formData.append('uphole',this.AdForm.uphole)
  formData.append('exteriorColor',this.AdForm.exteriorColor)
  formData.append('interiorColor',this.AdForm.interiorColor)
  formData.append('eqpArr',JSON.stringify(this.AdForm.eqpArr))
  formData.append('vehicleCond',this.AdForm.vehicleCond)
  formData.append('owners',this.AdForm.owners)
  formData.append('sellers',this.AdForm.sellers)
  formData.append('doors',this.AdForm.doors)
  formData.append('emison',this.AdForm.emmison)
  formData.append('fuelType',this.AdForm.fuelType)
  formData.append('description',this.AdForm.description)
  formData.append('eqpArrExtra',JSON.stringify(this.AdForm.eqpArrExtra))
  formData.append('eqpArrSaftey',JSON.stringify(this.AdForm.eqpArrSaftey))
  formData.append('eqpArrEnter',JSON.stringify(this.AdForm.eqpArrEnter))
  formData.append('totalGears',this.AdForm.totalGears)
  formData.append('displacement',"")
  formData.append('weight',"")
  formData.append('cylinder',this.AdForm.cylinder)
  formData.append('registration',this.AdForm.registration)
  formData.append('limit_images',this.loginService.getPlanDetails().photos)
  formData.append('powerUnits',"")
  formData.append('userID',this.loginService.getUserDetails().id)
  formData.append('country',this.currency.country)
  formData.append('engineSize',this.AdForm.engineSize)
  formData.append('accleration',this.AdForm.accleration)
  formData.append('annualTax',this.AdForm.annualTax)
  formData.append('fuelConsumpation',this.AdForm.fuelConsumpation)
  formData.append('co2',this.AdForm.co2)
  formData.append('currency',this.currency.symbol)
  formData.append('category',this.AdForm.category)
  

    this.submitted = true;
    
    if (this.stripeTest.invalid) {
      this.toastr.error('Please fill valid fields', 'Error');
         return;
   }
this.ngxService.start()
   this.stripeService
   .createToken(this.card, { name },)
   .subscribe(result => {
     if (result.token) {
      let data = {
        token:result.token.id,
        userID : this.loginService.getUserDetails().id,
        planID  :this.loginService.getPlanDetails().id,
        amount  :price,
        walletAmount:this.walletAmount,
        email:this.loginService.getUserDetails().email,
        name:this.loginService.getUserDetails().name
      }
    this.loginService.makePayment(data).subscribe((res) => {

      
     
    this.loginService.createAd(formData).subscribe((result) => {
     this.router.navigateByUrl('/my-ads');
      this.ngxService.stop();
     }, (err) => {
      this.toastr.error('Network error occured.');
     
     });
      
    }, (err) => {
                  
      try{
        let errMessage = err["error"]["message"];
        this.toastr.error(errMessage);
       }catch(e){
        this.toastr.error('Your card having some problems.');
       }
       this.ngxService.stop();         
    });
  }else if (result.error) {

    this.toastr.error(result.error.message, 'Error');
    this.ngxService.stop();
  }

  })
  }

  walletSelection(){
  
    if(this.checkboxWallet){
      if(this.remaining < this.planDetails.price){
        this.isDiablePay = true
        this.planDetails.price =  (parseFloat(this.planDetails.price) - parseFloat(this.remaining)).toFixed(2);
        this.walletAmount = this.remaining
      }else{
        this.isDiablePay = false
        this.walletAmount = this.planDetails.price
       
      }
    }else{
      if(this.remaining < this.planDetails.price){
      let pricee =  parseFloat(this.planDetails.price)+ parseFloat(this.remaining);
      this.planDetails.price = pricee.toFixed(2)
      }
      this.isDiablePay = true
    }

    
    // if(this.checkboxWallet && this.isDiablePay){
    //  // this.planDetails.price =  this.planDetails.price - this.remaining;
    //   //this.deductedWallet = this.remaining
    // }else{
    //   //this.planDetails.price =  this.planDetails.price + this.remaining;
    // }
  
   
  }
  payWallet(){
    this.ngxService.start();
    this.loginService.payWalletUser({userId:this.loginService.getUserDetails().id,amount:this.walletAmount}).subscribe((result) => {
      this.router.navigateByUrl('/my-ads');
       this.ngxService.stop();
      }, (err) => {
        this.ngxService.stop();
       this.toastr.error('Network error occured.');
      
      });  
  }
}
