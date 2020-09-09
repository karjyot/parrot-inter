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
      if(this.commonService.getUserLocation() &&  this.commonService.getCurrncies()){
        return true
      } else{
        return this.getUserInfo(perm)
      }
     
      
      
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
    this.ngxService.stop();
        return true;
      }));

     
  }

}


