
import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from "./../services/login.service";
import { Router ,ActivatedRoute} from "@angular/router";
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  plans:any
  userID:any;
  cmsData:any
  conversion:any
  motor:any
  constructor(private activatedRoute:ActivatedRoute,private _cookieService:CookieService,private loginService: LoginService,private router : Router,private formBuilder: FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService) {}

  ngOnInit() {
    this.plans = []
    this.cmsData =  this.loginService.getCms();
   this.userID = this.activatedRoute.snapshot.paramMap.get('id'); 
    this.ngxService.start();
    this.loginService.plans().subscribe((result) => {
      this.motor = []
      let plans = result["message"];
      for(var i=0; i<plans.length; i++){
        if(plans[i].type == 'motor dealer'){
          this.motor.push(plans[i])
        }else{
          this.plans.push(plans[i])
        }
      }
     // this.plans = result["message"]
      this.ngxService.stop();
      let currncies = this.loginService.getCurrncies();

      if(this.loginService.getUserDetails()){
        let countryObj = JSON.parse(this.loginService.getUserDetails().countryObj)
        this.conversion =  this.loginService.checkUserCurrency(countryObj.code,currncies);
     
        for(var i=0;i<this.plans.length; i++){
        
        // this.plans[i].price =  (parseFloat(this.plans[i].price) * parseFloat(conversion)).toFixed(2)
          this.plans[i].symbol = countryObj.symbol
        }   
        
        for(var j=0;j<this.motor.length; j++){
        
          // this.plans[i].price =  (parseFloat(this.plans[i].price) * parseFloat(conversion)).toFixed(2)
            this.motor[j].symbol = countryObj.symbol
          }  
        
      }
      console.log( this.plans)
 
     //this.modal= this.modalService.show(template, Object.assign({}, ));
     //
    }, (err) => {
     this.toastr.error('Network error occured.', 'Error');
     this.ngxService.stop();
    });
  }

  selectPlan(details){
    this.loginService.setPlanDetails(details);
    this.router.navigateByUrl('/create-ad')
    // if(details.price == 0){

    //   this.ngxService.start()
    //   this.loginService.makePaymentZero({userID:this.userID,planID:details.id}).subscribe((result:any) => {
    //     this.loginService.setToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZWIxYmExMmI1M2FjNzMxNTBmNGQzYTIzZmI0YTQ1OGE3NWQwNWY2N2ZmMTBmZGYzMTdkMmJlMGVmYzU4Mjg0MTgzODc5YjhmZjM4NzA2MDkiLCJpYXQiOjE1ODAyMzIwODIsIm5iZiI6MTU4MDIzMjA4MiwiZXhwIjoxNjExODU0NDgyLCJzdWIiOiI3MiIsInNjb3BlcyI6W119.iwnwywV5MCh9-fGXnlJnQo_mNuDnMkZ8_drXFa1RwQKidvAcyADOVBRzaXAKtKLh1fDDRmaZ-V7GpttHJt9fbNCN80jhyn80ygmBI3-nlme_CpY1C1dIgP_u5vfVNgWB2ZVaO7Uh6jRz92Ja-1_O8_6uWMbdF6CsRREs5_z3cOAu16LgwBPhXU4QSpFPhmUl74-lK-lXKpsWSXYupVu9rWsjpNrqlUSGFg1kUPgM5ioiYKYRj6sgiaZDViy4WYM3tz6JdAgoLTCH41J-65szJnDkW33-qEDw9Qa06IJaf4hDBEUEeCIuK1Bf81GOlzbGjsYNLJrEvr72tF7jOcVZYEXkejNkygDSYJWfzGLbiRhLos7pnrw5IrZYdq_YyKxG7Y2d6IhvyqmrYrNuSOJiAMFxBYDI7Dw8AgLkJn9WRoF4CE4_PmyQIV4FBXJY0227cLQfZjCrYpueNFL3tbxkINttTdmKWCZx0vYDIZX9ADBnAuVVxSQId5Pg4AVs_N5kL2PJVaivh7-GB-0ZEewhEfwcA_uZkvpL1nvt18D_3OoRSxAh9eJcERPPWLXNr9SpWOSl9BSL1uD2_Z4QPSZbwlMhhjkFmv2o3WB97mxORa1TAqwrxh7zk_XOhluOhENZ9UbpzKvIpezq1i4krd_xzIOz02BdJDlm7eq0mcH0NBg");
    //     this.loginService.setUserDetails(this.loginService.getsetSellerDetails())
    //     this.router.navigateByUrl('/my-ads');
    //      this.ngxService.stop()
    //     },(err) => {
    //      try{
    //        let errMessage = err["error"]["message"];
    //        //this.toastr.error(errMessage);
    //       }catch(e){
   
    //       }
    //       this.ngxService.stop();
    //      })

     
   //}else{
      
    //}

  }

}
