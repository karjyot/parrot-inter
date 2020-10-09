import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteLayoutComponent } from './site-layout/site-layout.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { SearchDetailsComponent } from './search-details/search-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { MyAdsComponent } from './my-ads/my-ads.component';
import { MessagesComponent } from './messages/messages.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { MyPlansComponent } from './my-plans/my-plans.component';
import { ProfileComponent } from './profile/profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { PlansComponent } from './plans/plans.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ConfirmationLoginComponent } from './confirmation-login/confirmation-login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeUserPasswordComponent } from './change-user-password/change-user-password.component'
import { CreateAdComponent } from './create-ad/create-ad.component';
import { AuthGuard } from './auth/auth.guard';
import { ApiGuard } from './auth/api.guard';

import { ReferalComponent } from './referal/referal.component';
import { WalletComponent } from './wallet/wallet.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AuthGuardAdmin } from './auth/auth.guard.admin';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminAdsComponent } from './admin/admin-ads/admin-ads.component';
import { AdminAboutComponent } from './admin/admin-about/admin-about.component';
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
import { SavedSearchesComponent } from './saved-searches/saved-searches.component';
import { AdminCarrierComponent } from './admin/admin-carrier/admin-carrier.component';
import { CarriersComponent } from './carriers/carriers.component';
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
import { BlogsdataComponent } from './blogsdata/blogsdata.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { VehicleCheckComponent } from './vehicle-check/vehicle-check.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { VehicleValuationComponent } from './vehicle-valuation/vehicle-valuation.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MotorPackagesComponent } from './admin/motor-packages/motor-packages.component';
import { AdminPopComponent } from './admin/admin-pop/admin-pop.component';
import { AdminEditAdComponent } from './admin/admin-edit-ad/admin-edit-ad.component';
import { DealerDetailsComponent } from './dealer-details/dealer-details.component';
const routes: Routes = [{
  path: '',
  component: SiteLayoutComponent,
  children: [{
      
  path: '',
  component: HomeComponent,
  data: {
    title: 'Parrot Auto Trader - Used and New Cars for sale ',
    //descrption: 'Description of Home Component',
    //ogTitle: 'Description of Home Component for social media',
    keywords:'Buy Car, Buy Truck, Buy Vehicle, Buy Truck, Buy Bikes, Parrot Auto Trader, Auto Trader , User Cars for sale, New cars for sale',
   
  },
  canActivate:[ApiGuard],
 },{
      
  path: 'search/:id',
  component: SearchComponent,
  data: {
    title: 'Parrot Auto Trader - Used cars',
    //descrption: 'Description of Home Component',
    //ogTitle: 'Description of Home Component for social media',
    keywords:'Buy Car, Buy Truck, Buy Vehicle, Buy Truck, Buy Bikes, Parrot Auto Trader, Auto Trader , User Cars for sale, New cars for sale'
  },
  canActivate:[ApiGuard],
 },{
      
  path: 'dealer-details/:id/:userId',
  component: DealerDetailsComponent,
  data: {
    title: 'Parrot Auto Trader - Used cars',
    //descrption: 'Description of Home Component',
    //ogTitle: 'Description of Home Component for social media',
    keywords:'Buy Car, Buy Truck, Buy Vehicle, Buy Truck, Buy Bikes, Parrot Auto Trader, Auto Trader , User Cars for sale, New cars for sale'
  },
  canActivate:[ApiGuard],
 },{
      
  path: 'buy-car',
  component: BuyCarComponent,
  data: {
    title: 'Parrot Auto Trader - Buy new and used cars in UK ',
    //descrption: 'Description of Home Component',
    //ogTitle: 'Description of Home Component for social media',
    keywords:'Buy Cars, Buy New Cars, Buy Used Cars,  Car for Sale, Sell My car, Auto Trader, Parrot Auto Trader, selling cars UK,  selling vehicles uk, Auto Parrot Uk, Auto Trader Uk, Auto Trader  marketplace, selling cars uk online, Best Car deal UK'
  }
 },{
      
  path: 'buy-bike',
  component: BuyBikeComponent,
  data: {
    title: 'Parrot Auto Trader - Buy new and used Bikes in UK',
    //descrption: 'Description of Home Component',
    //ogTitle: 'Description of Home Component for social media',
    keywords:'Buy Bikes, Buy New Bikes, Buy Used Bikes, Bike for Sale, Sell My Bike, Auto Trader, Parrot Auto Trader'
  }
 },{
      
  path: 'buy-truck',
  component: BuyTruckComponent,
  data: {
    title: 'Parrot Auto Trader - Buy new and used trucks in UK',
    //descrption: 'Description of Home Component',
    //ogTitle: 'Description of Home Component for social media',
    keywords:'Buy trucks, Buy New trucks, Buy Used trucks, truck for Sale, Sell My truck, Auto Trader, Parrot Auto Trader'
  }
 },{
      
  path: 'buy-vehicle',
  component: BuyVehicleComponent,
  data: {
    title: 'Parrot Auto Trader - Buy new and used Vehicles in UK',
    //descrption: 'Description of Home Component',
    //ogTitle: 'Description of Home Component for social media',
    keywords:'Buy vehicles, Buy New vehicles, Buy Used vehicles, vehicles for Sale, Sell My vehicle, Auto Trader, Parrot Auto Trader'
  }
 },{
      
  path: 'faq',
  component: FaqComponent,
  data: {
    title: 'Parrot Auto Trader - FAQ',
    //descrption: 'Description of Home Component',
    //ogTitle: 'Description of Home Component for social media',
    //keywords:'Parrot Auto Trader  , Auto Trader, Auto Trader Uk, Buy Car and Bikes , Used cars, New Cars'
  }
 },{
      
  path: 'how-it-works',
  component: HowItComponent,
  data: {
    title: 'Parrot Auto Trader - How it works',
    //descrption: 'Description of Home Component',
    //ogTitle: 'Description of Home Component for social media',
    //keywords:'Parrot Auto Trader  , Auto Trader, Auto Trader Uk, Buy Car and Bikes , Used cars, New Cars'
  }
 },{
      
  path: 'vehicle-check',
  component: VehicleCheckComponent,
  data: {
    title: 'Parrot Auto Trader - Vehicle Check',
    //descrption: 'Description of Home Component',
    //ogTitle: 'Description of Home Component for social media',
    keywords:'Check vehicle history , History check , Check car history, Check bike history , Check truck history'
  }
 },{
      
  path: 'vehicle-details',
  component: VehicleDetailsComponent
 },{
      
  path: 'carriers',
  component: CarriersComponent,
  data: {
    title: 'Parrot Auto Trader - Career',
    //descrption: 'Description of Home Component',
    //ogTitle: 'Description of Home Component for social media',
    //keywords:'Parrot Auto Trader  , Auto Trader, Auto Trader Uk, Buy Car and Bikes , Used cars, New Cars'
  }
 },{
      
  path: 'search-details/:id/:userId',
  component: SearchDetailsComponent,
  data: {
    title: 'Parrot Auto Trader- New  and used cars',
    //descrption: 'Description of Home Component',
    //ogTitle: 'Description of Home Component for social media',
    keywords:'Buy Car, Buy Truck, Buy Vehicle, Buy Truck, Buy Bikes, Parrot Auto Trader, Auto Trader , User Cars for sale, New cars for sale'
  },
  canActivate:[ApiGuard],

 },{
      
  path: 'login',
  component: LoginComponent
 },{
      
  path: 'about-us',
  component: AboutUsComponent,
  data: {
    title: 'Parrot Auto Trader - About Parrot Auto Trader',
    //descrption: 'Description of Home Component',
    //ogTitle: 'Description of Home Component for social media',
    keywords:'Parrot Auto Trader  , Auto Trader, Auto Trader Uk, Buy Car and Bikes , Used cars, New Cars'
  }
  
  
 },{
      
  path: 'contact-us',
  component: ContactUsComponent,
  data: {
    title: 'Parrot Auto Trader - Contact us',
    //descrption: 'Description of Home Component',
    //ogTitle: 'Description of Home Component for social media',
    //keywords:'Parrot Auto Trader  , Auto Trader, Auto Trader Uk, Buy Car and Bikes , Used cars, New Cars'
  }
 },{
  
  path: 'reset-password/:id',
  component: ChangePasswordComponent
 },{
  
  path: 'vehicle-valuation',
  component: VehicleValuationComponent
 },{
      
  path: 'forgot-password',
  component: ForgotPasswordComponent
 },{
      
  path: 'plans',
  component: PlansComponent
 },{
      
  path: 'verify-account/:id',
  component: VerifyAccountComponent
 },{
      
  path: 'confirmation',
  component: ConfirmationLoginComponent
 },{
      
  path: 'blog',
  component: BlogsdataComponent,
  data: {
    title: 'Parrot Auto Trader - Blog',
   
  }
 },{
      
  path: 'blog-details/:id',
  component: BlogDetailsComponent
 },{
      
  path: 'data-protection',
  component: PrivacyComponent,
  data: {
    title: 'Parrot Auto Trader - Data protection ',
    //descrption: 'Description of Home Component',
    //ogTitle: 'Description of Home Component for social media',
    //keywords:'Parrot Auto Trader  , Auto Trader, Auto Trader Uk, Buy Car and Bikes , Used cars, New Cars'
  }
 },{
      
  path: 'terms',
  component: TermsComponent,
  data: {
    title: 'Parrot Auto Trader - Terms and conditions',
    //descrption: 'Description of Home Component',
    //ogTitle: 'Description of Home Component for social media',
    //keywords:'Parrot Auto Trader  , Auto Trader, Auto Trader Uk, Buy Car and Bikes , Used cars, New Cars'
  }
 },{
      
  path: 'register',
  component: RegisterComponent
 }]},{
  path: '',
  component: LoginLayoutComponent,
  children: [{
    path: 'my-ads',
    component: MyAdsComponent,
    canActivate:[AuthGuard,ApiGuard],
   },{
    path: 'messages/:id',
    component: MessagesComponent,
    canActivate:[AuthGuard],
   },{
    path: 'payments-requests',
    component: PaymentRequestsComponent,
    canActivate:[AuthGuard],
   },
   {
    path: 'saved-searches',
    component: SavedSearchesComponent,
    canActivate:[AuthGuard],
   },
   {
      
    path: 'bank-info',
    component: BankInfoComponent,
    canActivate:[AuthGuard],
   },
   
   {
      
    path: 'checkout/:id',
    component: CheckoutComponent,
    canActivate:[AuthGuard],
   },{
    path: 'create-ad',
    component: CreateAdComponent,
    canActivate:[AuthGuard],
   },{
      
    path: 'profile',
    component: ProfileComponent,
    canActivate:[AuthGuard],
   },{
    path: 'bookmarks',
    component: BookmarksComponent,
    canActivate:[AuthGuard,ApiGuard],
   },{
    path: 'referal',
    component: ReferalComponent,
    canActivate:[AuthGuard],
   },{
    path: 'wallet',
    component: WalletComponent,
    canActivate:[AuthGuard],
   },{
    path: 'change-user-password',
    component: ChangeUserPasswordComponent,
    canActivate:[AuthGuard],
   },
   {
    path: 'edit-ad/:id',
    component: EditAdComponent,
    canActivate:[AuthGuard],
   },
   
   {
    path: 'my-plan',
    component: MyPlansComponent,
    canActivate:[AuthGuard],
   }]},{
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: 'admin/dashboard',
      component: AdminHomeComponent,
      canActivate:[AuthGuardAdmin],
      pathMatch: 'full',
    },{
      path: 'admin/users',
      component: AdminUsersComponent,
      canActivate:[AuthGuardAdmin],
      pathMatch: 'full',
    },{
      path: 'admin/motor-packages',
      component: MotorPackagesComponent,
      canActivate:[AuthGuardAdmin],
      pathMatch: 'full',
    },{
      path: 'admin/carriers',
      component: AdminCarrierComponent,
      canActivate:[AuthGuardAdmin],
      pathMatch: 'full',
    },{
      path: 'admin/homepage-pop',
      component: AdminPopComponent,
      canActivate:[AuthGuardAdmin],
      pathMatch: 'full',
    },{
      path: 'admin/edit-admin-ad',
      component: AdminEditAdComponent,
      canActivate:[AuthGuardAdmin],
      pathMatch: 'full',
    },{
      path: 'admin/ads',
      component: AdminAdsComponent,
      canActivate:[AuthGuardAdmin],
      pathMatch: 'full',
    },{
      path: 'admin/reports/:id',
      component: ReportsComponent,
      canActivate:[AuthGuardAdmin],
      pathMatch: 'full',
    },{
      path: 'admin/about-us',
      component: AdminAboutComponent,
      canActivate:[AuthGuardAdmin],
      pathMatch: 'full',
    },{
      path: 'admin/referal-requests',
      component: ReferalRequestComponent,
      canActivate:[AuthGuardAdmin],
     },
     {
      path: 'admin/cms',
      component: CmsComponent,
      canActivate:[AuthGuardAdmin],
     },
     {
      path: 'admin/payments',
      component: PaymentsComponent,
      canActivate:[AuthGuardAdmin],
      pathMatch: 'full',
    },{
      path: 'admin/make',
      component: MakeComponent,
      canActivate:[AuthGuardAdmin],
      pathMatch: 'full',
    },{
      path: 'admin/data-protection',
      component: AdminPrivacyComponent,
      canActivate:[AuthGuardAdmin],
      pathMatch: 'full',
    },{
      path: 'admin/models',
      component: ModelComponent,
      canActivate:[AuthGuardAdmin],
      pathMatch: 'full',
    },{
      path: 'admin/terms',
      component: AdminTermsComponent,
      canActivate:[AuthGuardAdmin],
      pathMatch: 'full',
    },
    {
      path: 'admin/plans',
      component: AdminPlansComponent,
      canActivate:[AuthGuardAdmin],
      pathMatch: 'full',
    },{
      path: 'admin/percentage',
      component: ReferalPercentageComponent,
      canActivate:[AuthGuardAdmin],
      pathMatch: 'full',
    },{
      path: 'admin/buy-car',
      component: AdminBuyCarComponent,
      canActivate:[AuthGuardAdmin],
      pathMatch: 'full',
    },{
      path: 'admin/how-it-works',
      component: AdminHowItComponent,
      canActivate:[AuthGuardAdmin],
      pathMatch: 'full',
    },{
      path: 'admin/faq',
      component: AdminFaqComponent,
      canActivate:[AuthGuardAdmin],
      pathMatch: 'full',
    },{
      path: 'admin/buy-vehicle',
      component: AdminBuyVehicleComponent,
      canActivate:[AuthGuardAdmin],
      pathMatch: 'full',
    },{
      path: 'admin/buy-truck',
      component: AdminBuyTruckComponent,
      canActivate:[AuthGuardAdmin],
      pathMatch: 'full',
    },{
      path: 'admin/blogs',
      component: BlogComponent,
      canActivate:[AuthGuardAdmin],
      pathMatch: 'full',
    },{
      path: 'admin/categories',
      component: CategoriesComponent,
      canActivate:[AuthGuardAdmin],
      pathMatch: 'full',
    },{
      path: 'admin/comments',
      component: CommentsComponent,
      canActivate:[AuthGuardAdmin],
      pathMatch: 'full',
    },{
      path: 'admin/buy-bike',
      component: AdminBuyBikeComponent,
      canActivate:[AuthGuardAdmin],
      pathMatch: 'full',
    }
  ]},
  
  
   {
    
    path: 'admin/login',
    component: AdminLoginComponent
   }, 
   {  path: '**',  component: NotFoundComponent}
   
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
