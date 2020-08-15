import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable,of } from 'rxjs';
import { LoginService } from "./../services/login.service";
import { Router,UrlTree } from "@angular/router";
import {map} from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { forkJoin } from 'rxjs';
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
    let q1 = this.commonService.getUserCurrentLocation();
    let q2 = this.commonService.currency();
  
    return forkJoin([q1, q2]).pipe(map(result => {
      result[0]['country'] = result[0]["country_name"]
    result[0]['countryCode'] = result[0]["country_code"]
    this.commonService.setUserLocation(result[0])
    this.commonService.setCurrncies(result[1])
        return true;
      }));

  //  return this.commonService.getUserCurrentLocation().pipe(map(result => {
  //   result['country'] = result["country_name"]
  //   result['countryCode'] = result["country_code"]
   
  //     this.commonService.setUserLocation(result)
  //     if(!this.commonService.getCurrncies()){
  //       this.getCurrencyconversion();
  //      }else{
  //       return true;
  //      }
    
      
  //    }));
 
  }
//   getCurrencyconversion(){
     
//     this.commonService.currency().subscribe((result) => {
//       this.commonService.setCurrncies(result)
//         return true;
//     })
  
// }
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
