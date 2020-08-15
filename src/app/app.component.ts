import { Component } from '@angular/core';
import { LoginService } from "./services/login.service";

import { NgcCookieConsentService } from 'ngx-cookieconsent';
import { Subscription }   from 'rxjs';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import defaultLanguage from "./../assets/i18n/en.json";
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'pat';
  public insertImageSettings = {
    saveUrl : 'http://parrotautotrader.com/public/uploads'
};
  private popupOpenSubscription: Subscription;
  private popupCloseSubscription: Subscription;
  private initializeSubscription: Subscription;
  private statusChangeSubscription: Subscription;
  private revokeChoiceSubscription: Subscription;
  private noCookieLawSubscription: Subscription;
  constructor(private ccService: NgcCookieConsentService, private activatedRoute: ActivatedRoute,private loginService: LoginService,private router: Router,private titleService: Title,
    private metaService: Meta,private translate: TranslateService){
      // window.addEventListener("beforeunload", (event) => {
       
      //  // this.loginService.deleteCurr();
      //  //alert("close")
      // });
      translate.setTranslation('en', defaultLanguage);
      translate.setDefaultLang('en');
      
    //  if(!this.loginService.getCurrncies()){
    //  // this.getCurrencyconversion();
    //  }
     //  
    // this.getUserLocation()
     


    this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });
 
    this.popupCloseSubscription = this.ccService.popupClose$.subscribe(
      () => {
        this.ccService.getConfig().autoOpen=false
      });
 
    this.initializeSubscription = this.ccService.initialize$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });
 
    this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });
 
    this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });
 
      this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });
    this.validateUser();
    this.getCms();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    )
      .subscribe(() => {
 
        var rt = this.getChild(this.activatedRoute)
 
        rt.data.subscribe(data => {
          console.log(data);
          this.titleService.setTitle(data.title)
 
          if (data.descrption) {
            this.metaService.updateTag({ name: 'description', content: data.descrption })
          } else {
            this.metaService.removeTag("name='description'")
          }

          if (data.keywords) {
            this.metaService.updateTag({ name: 'keywords', content: data.keywords })
          } else {
            this.metaService.removeTag("name='keywords'")
          }
 
          if (data.robots) {
            this.metaService.updateTag({ name: 'robots', content: data.robots })
          } else {
            this.metaService.updateTag({ name: 'robots', content: "follow,index" })
          }
 
          if (data.ogUrl) {
            this.metaService.updateTag({ property: 'og:url', content: data.ogUrl })
          } else {
            this.metaService.updateTag({ property: 'og:url', content: this.router.url })
          }
 
          if (data.ogTitle) {
            this.metaService.updateTag({ property: 'og:title', content: data.ogTitle })
          } else {
            this.metaService.removeTag("property='og:title'")
          }
 
          if (data.ogDescription) {
            this.metaService.updateTag({ property: 'og:description', content: data.ogDescription })
          } else {
            this.metaService.removeTag("property='og:description'")
          }
 
          if (data.ogImage) {
            this.metaService.updateTag({ property: 'og:image', content: data.ogImage })
          } else {
            this.metaService.removeTag("property='og:image'")
          }
 
 
        })
 
      })
  }
  getChild(activatedRoute: ActivatedRoute) {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
 
  }
  ngOnDestroy() {
    // unsubscribe to cookieconsent observables to prevent memory leaks
    this.popupOpenSubscription.unsubscribe();
    this.popupCloseSubscription.unsubscribe();
    this.initializeSubscription.unsubscribe();
    this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription.unsubscribe();
    this.noCookieLawSubscription.unsubscribe();
  }

  getCms()
  {
    this.loginService.getHomeContent().subscribe((data) => {
      let result = data["success"][0];
      this.loginService.setCms(result);
     }, (err) => {
     });
  
  }
  
    validateUser(){
      let details = this.loginService.getUserDetails();
      if(details){
          this.loginService.validateUser(details.email).subscribe((result) => {
    
          }, (err) => {
              this.loginService.deleteToken();
              this.loginService.deleteUserDetails();
           
              this.loginService.sendLogout(false); 
              this.router.navigateByUrl('/contact-us', {skipLocationChange: true}).then(()=>
              this.router.navigate(["/"])); 
      });
      }
    }


    }

    // getUserLocation(){
    //   this.loginService.getUserCurrentLocation().subscribe((result) => {
    //     this.loginService.setUserLocation(result)
    //   })
    // }
  //}
  
  
  