
import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from "./../services/login.service";
import { Router,ActivatedRoute} from "@angular/router";
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {

  constructor(private _cookieService:CookieService,private activatedRoute: ActivatedRoute,private loginService: LoginService,private router : Router,private formBuilder: FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService) {}

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id'); 
    this.ngxService.start();
    this.loginService.verifyAccount(id).subscribe((result) => {
      let resp = result['message']
      this.loginService.setUserDetails(resp[0]);
      if(resp[0]['user_type'] == 'buyer'){
       
        this.loginService.setToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZWIxYmExMmI1M2FjNzMxNTBmNGQzYTIzZmI0YTQ1OGE3NWQwNWY2N2ZmMTBmZGYzMTdkMmJlMGVmYzU4Mjg0MTgzODc5YjhmZjM4NzA2MDkiLCJpYXQiOjE1ODAyMzIwODIsIm5iZiI6MTU4MDIzMjA4MiwiZXhwIjoxNjExODU0NDgyLCJzdWIiOiI3MiIsInNjb3BlcyI6W119.iwnwywV5MCh9-fGXnlJnQo_mNuDnMkZ8_drXFa1RwQKidvAcyADOVBRzaXAKtKLh1fDDRmaZ-V7GpttHJt9fbNCN80jhyn80ygmBI3-nlme_CpY1C1dIgP_u5vfVNgWB2ZVaO7Uh6jRz92Ja-1_O8_6uWMbdF6CsRREs5_z3cOAu16LgwBPhXU4QSpFPhmUl74-lK-lXKpsWSXYupVu9rWsjpNrqlUSGFg1kUPgM5ioiYKYRj6sgiaZDViy4WYM3tz6JdAgoLTCH41J-65szJnDkW33-qEDw9Qa06IJaf4hDBEUEeCIuK1Bf81GOlzbGjsYNLJrEvr72tF7jOcVZYEXkejNkygDSYJWfzGLbiRhLos7pnrw5IrZYdq_YyKxG7Y2d6IhvyqmrYrNuSOJiAMFxBYDI7Dw8AgLkJn9WRoF4CE4_PmyQIV4FBXJY0227cLQfZjCrYpueNFL3tbxkINttTdmKWCZx0vYDIZX9ADBnAuVVxSQId5Pg4AVs_N5kL2PJVaivh7-GB-0ZEewhEfwcA_uZkvpL1nvt18D_3OoRSxAh9eJcERPPWLXNr9SpWOSl9BSL1uD2_Z4QPSZbwlMhhjkFmv2o3WB97mxORa1TAqwrxh7zk_XOhluOhENZ9UbpzKvIpezq1i4krd_xzIOz02BdJDlm7eq0mcH0NBg");
        this.toastr.success("Your email is verified succesfully.")
        this.router.navigateByUrl('/bookmarks');
      }else{
        this.loginService.setToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZWIxYmExMmI1M2FjNzMxNTBmNGQzYTIzZmI0YTQ1OGE3NWQwNWY2N2ZmMTBmZGYzMTdkMmJlMGVmYzU4Mjg0MTgzODc5YjhmZjM4NzA2MDkiLCJpYXQiOjE1ODAyMzIwODIsIm5iZiI6MTU4MDIzMjA4MiwiZXhwIjoxNjExODU0NDgyLCJzdWIiOiI3MiIsInNjb3BlcyI6W119.iwnwywV5MCh9-fGXnlJnQo_mNuDnMkZ8_drXFa1RwQKidvAcyADOVBRzaXAKtKLh1fDDRmaZ-V7GpttHJt9fbNCN80jhyn80ygmBI3-nlme_CpY1C1dIgP_u5vfVNgWB2ZVaO7Uh6jRz92Ja-1_O8_6uWMbdF6CsRREs5_z3cOAu16LgwBPhXU4QSpFPhmUl74-lK-lXKpsWSXYupVu9rWsjpNrqlUSGFg1kUPgM5ioiYKYRj6sgiaZDViy4WYM3tz6JdAgoLTCH41J-65szJnDkW33-qEDw9Qa06IJaf4hDBEUEeCIuK1Bf81GOlzbGjsYNLJrEvr72tF7jOcVZYEXkejNkygDSYJWfzGLbiRhLos7pnrw5IrZYdq_YyKxG7Y2d6IhvyqmrYrNuSOJiAMFxBYDI7Dw8AgLkJn9WRoF4CE4_PmyQIV4FBXJY0227cLQfZjCrYpueNFL3tbxkINttTdmKWCZx0vYDIZX9ADBnAuVVxSQId5Pg4AVs_N5kL2PJVaivh7-GB-0ZEewhEfwcA_uZkvpL1nvt18D_3OoRSxAh9eJcERPPWLXNr9SpWOSl9BSL1uD2_Z4QPSZbwlMhhjkFmv2o3WB97mxORa1TAqwrxh7zk_XOhluOhENZ9UbpzKvIpezq1i4krd_xzIOz02BdJDlm7eq0mcH0NBg");
        this.toastr.success("Your email is verified succesfully.")
        //this.loginService.setSellerDetails(resp[0]);
        this.router.navigateByUrl('/my-ads');
      }
       
      this.ngxService.stop();
     }, (err) => {
      this.toastr.error('Link has been expired.');
      this.ngxService.stop();
     });
   
  } 

}
