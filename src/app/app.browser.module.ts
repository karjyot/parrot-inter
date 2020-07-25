import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { AuthGuard } from './auth/auth.guard';
import { LoginService } from "./services/login.service";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiteLayoutComponent } from './site-layout/site-layout.component';
import { HeaderComponent } from './site-layout/header/header.component';
import { SidebarComponent } from './site-layout/sidebar/sidebar.component';
import { FooterComponent } from './site-layout/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { SearchDetailsComponent } from './search-details/search-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { LoginHeaderComponent } from './login-layout/login-header/login-header.component';
import { LoginSidebarComponent } from './login-layout/login-sidebar/login-sidebar.component';
import { MyAdsComponent } from './my-ads/my-ads.component';
import { MessagesComponent } from './messages/messages.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { MyPlansComponent } from './my-plans/my-plans.component';
import { ProfileComponent } from './profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxGalleryModule } from 'ngx-gallery';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CookieService, CookieOptions } from 'angular2-cookie/core';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NgxUiLoaderModule, NgxUiLoaderConfig,NgxUiLoaderService,SPINNER, POSITION, PB_DIRECTION } from 'ngx-ui-loader';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { PlansComponent } from './plans/plans.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NgxStripeModule } from 'ngx-stripe';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeUserPasswordComponent } from './change-user-password/change-user-password.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ShareButtonModule } from '@ngx-share/button';
import {FilterPipe} from './pipes/pipes';
import { TimeagoModule } from 'ngx-timeago';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TruncateModule } from 'ng2-truncate';
import { AgmCoreModule } from '@agm/core';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angular-6-social-login-v2';
import { ConfirmationLoginComponent } from './confirmation-login/confirmation-login.component';
import { CreateAdComponent } from './create-ad/create-ad.component';
import { ReferalComponent } from './referal/referal.component';
import { WalletComponent } from './wallet/wallet.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin/admin-sidebar/admin-sidebar.component'
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminAdsComponent } from './admin/admin-ads/admin-ads.component';
import { AdminAboutComponent } from './admin/admin-about/admin-about.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MakeComponent } from './admin/make/make.component';
import { ModelComponent } from './admin/model/model.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AdminPrivacyComponent } from './admin/admin-privacy/admin-privacy.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { AdminTermsComponent } from './admin/admin-terms/admin-terms.component';
import { TermsComponent } from './terms/terms.component';
import { PaymentsComponent } from './admin/payments/payments.component';
import { PaymentRequestsComponent } from './payment-requests/payment-requests.component';
import { ReferalRequestComponent } from './admin/referal-request/referal-request.component';
import { BankInfoComponent } from './bank-info/bank-info.component';
import { AdminPlansComponent } from './admin/admin-plans/admin-plans.component';
import { ReferalPercentageComponent } from './admin/referal-percentage/referal-percentage.component';
import { ReportsComponent } from './admin/reports/reports.component';
import { EditAdComponent } from './edit-ad/edit-ad.component';
import { CmsComponent } from './admin/cms/cms.component';
import {NgcCookieConsentModule, NgcCookieConsentConfig} from 'ngx-cookieconsent';
import { SavedSearchesComponent } from './saved-searches/saved-searches.component';
import { AdminCarrierComponent } from './admin/admin-carrier/admin-carrier.component';
import { CarriersComponent } from './carriers/carriers.component';
import { NumberDirective } from './directives/numbers-only.directive';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
import { sanitizeHtmlPipe } from './pipes/sanitize-html.pipe';
import { BuyCarComponent } from './buy-car/buy-car.component';
import { BuyBikeComponent } from './buy-bike/buy-bike.component';
import { BuyTruckComponent } from './buy-truck/buy-truck.component';
import { BuyVehicleComponent } from './buy-vehicle/buy-vehicle.component';
import { FaqComponent } from './faq/faq.component';
import { HowItComponent } from './how-it/how-it.component';
import { AdminBuyCarComponent } from './admin/admin-buy-car/admin-buy-car.component';
import { AdminHowItComponent } from './admin/admin-how-it/admin-how-it.component';
import { AdminFaqComponent } from './admin/admin-faq/admin-faq.component';
import { AdminBuyVehicleComponent } from './admin/admin-buy-vehicle/admin-buy-vehicle.component';
import { AdminBuyTruckComponent } from './admin/admin-buy-truck/admin-buy-truck.component';
import { AdminBuyBikeComponent } from './admin/admin-buy-bike/admin-buy-bike.component';
import { BlogComponent } from './admin/blog/blog.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { CommentsComponent } from './admin/comments/comments.component';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogsdataComponent } from './blogsdata/blogsdata.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { VehicleCheckComponent } from './vehicle-check/vehicle-check.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { VehicleValuationComponent } from './vehicle-valuation/vehicle-valuation.component';
import { ClipboardModule } from 'ngx-clipboard';
import { AppModule } from './app.module';
const cookieConfig:NgcCookieConsentConfig = {
  cookie: {
    domain: 'parrotautotrader.co.uk' // or 'your.domain.com' // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
  },
  palette: {
    popup: {
      background: '#000'
    },
    button: {
      background: '#f1d600'
    }
  },
  position: "bottom",
  theme: 'edgeless',
  type: 'opt-out'
};
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'red',
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 40,
  fgsType: SPINNER.ballScaleMultiple,
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 2, // progress bar thickness
};
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("2562082414009301")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("560452081811-rbklstubm5mik159etmm2feda8jpjtcu.apps.googleusercontent.com")
        }
         
      ]
  );
  return config;
}
@NgModule({
  imports: [
    
    BrowserAnimationsModule,
    GooglePlaceModule,
    HttpClientModule,
    AppRoutingModule,
    NgxGalleryModule,
    ToastrModule.forRoot({progressBar:true,preventDuplicates: true,timeOut:5000}), 
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    FormsModule, 
    ReactiveFormsModule,
    ModalModule.forRoot(),
    NgxStripeModule.forRoot('pk_live_2l3t5U5QFg9vNd5yqu7mqOVC00SyG7DyoX'),
    SocialLoginModule,
    NgxPaginationModule,
    ShareButtonModule,
    TimeagoModule.forRoot(),
    Ng2SearchPipeModule,
    TruncateModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAougHgjZKHXMlCm8ixUDgtuxIGrluB-Y4'
    }),
    AngularEditorModule,
    NgcCookieConsentModule.forRoot(cookieConfig),
    RichTextEditorModule,
    ClipboardModule,
    AppModule,
    BrowserTransferStateModule

    
  ],
  exports: [ sanitizeHtmlPipe ],
  providers: [{provide: CookieOptions, useValue: {}}, {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  },CookieService,LoginService,AuthGuard,Platform,NgxUiLoaderService,ToolbarService, LinkService, ImageService, HtmlEditorService],
  bootstrap: [AppComponent]
})
export class AppBrowserModule { }
