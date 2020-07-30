import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable,of } from 'rxjs';
import { LoginService } from "./../services/login.service";
import { Router,UrlTree } from "@angular/router";
import {map} from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Injectable({
  providedIn: 'root'
})
export class ApiGuard implements CanActivate {

  constructor(private ngxService: NgxUiLoaderService,private commonService : LoginService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
     let perm = next.data.permisson || null;

      return this.getUserInfo(perm)
      
  }
  getUserInfo(perm) : Observable<boolean>{
    
    this.ngxService.start();
   return this.commonService.getUserCurrentLocation().pipe(map(result => {
    
      this.commonService.setUserLocation(result)
      return true;
      
     }));
 
  }
  
}


// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { Observable,of } from 'rxjs';
// import { Router,UrlTree } from "@angular/router";
// import { LoginService } from "./../services/login.service";


// @Injectable({
//   providedIn: 'root'
// })
// export class ApiGuard implements CanActivate {

//   constructor(private loginService : LoginService,private router : Router){}

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
//     this.getUserLocation();       
      
//       return true;
//   }
//   getUserLocation(){
//     console.log("guard")
//     this.loginService.getUserCurrentLocation().subscribe((result) => {
//       this.loginService.setUserLocation(result)
//     })
//   }
// }
