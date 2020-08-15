import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject} from 'rxjs';
import {AppSettings } from './../constants';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
  userData: any; 
  catData:any

  private logoutType: Subject<any> = new Subject<any>();
  private messageType: Subject<any> = new Subject<any>();
  public updateMessage$  = this.messageType.asObservable();
  public logoutType$ = this.logoutType.asObservable();

  public sendLogout(data: any){

    this.logoutType.next(data);
}
updateMessageStatus(jsonPayload):Observable<any>{
  return this.http.post(AppSettings.API_ENDPOINT + 'updateMessageStatus',jsonPayload);
}
public messageData(data: any){
  
  this.messageType.next(data);
}
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private http: HttpClient) { }

  login(authCredentials) {
    return this.http.post(AppSettings.API_ENDPOINT + 'login', authCredentials,this.noAuthHeader);
  }
  payAdmin(authCredentials){
    return this.http.post(AppSettings.API_ENDPOINT + 'payAdmin', authCredentials,this.noAuthHeader);
  }
  saveBankInfo(authCredentials,id){
    return this.http.post(AppSettings.API_ENDPOINT + 'saveBankInfo/'+id, authCredentials,this.noAuthHeader);
  }
  getRecivedMessage(id) {
    return this.http.get(AppSettings.API_ENDPOINT + 'getRecivedMessage/'+id);
  }
  carriersData() {
    return this.http.get(AppSettings.API_ENDPOINT + 'admin/carriers');
  }

  bikeData() {
    return this.http.get(AppSettings.API_ENDPOINT + 'admin/bikeData');
  }
  carData() {
    return this.http.get(AppSettings.API_ENDPOINT + 'admin/carData');
  }
  truckData() {
    return this.http.get(AppSettings.API_ENDPOINT + 'admin/truckData');
  }
  vehicleData() {
    return this.http.get(AppSettings.API_ENDPOINT + 'admin/vehicleData');
  }
  faqData() {
    return this.http.get(AppSettings.API_ENDPOINT + 'admin/faqData');
  }
  worksData() {
    return this.http.get(AppSettings.API_ENDPOINT + 'admin/worksData');
  }



  
  getPaymentRequests(id) {
    return this.http.get(AppSettings.API_ENDPOINT + 'getPaymentRequests/'+id);
  }
  getReferalPayments() {
    return this.http.get(AppSettings.API_ENDPOINT + 'getReferalPayments');
  }
  getUnreadMessage(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'getUnreadMessage/'+id);
  }
  setUnreadMessages(data:any){
    this.localStorage.setItem('unreadInternational',  JSON.stringify(data));
  }
  getUnreadMessages(){
    let details = this.localStorage.getItem('unreadInternational');
    return JSON.parse(details);
  }
  getThreads(id,fromId) {
    return this.http.get(AppSettings.API_ENDPOINT + 'getThreads/'+id + '/'+fromId);
  }
  sentMessage(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'sentMessage/'+id);
  }
  sendMessage(jsonPayload):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'sendMessageUser',jsonPayload);
  }
  sellerContact(data) {
    return this.http.post(AppSettings.API_ENDPOINT + 'sellerContact', data,this.noAuthHeader);
  }
  messageUser(data){
    return this.http.post(AppSettings.API_ENDPOINT + 'sendMessage', data,this.noAuthHeader);
  }
  reportAD(data){
    return this.http.post(AppSettings.API_ENDPOINT + 'reportAD', data,this.noAuthHeader);
  }
  listAds(searchData){
    return this.http.post(AppSettings.API_ENDPOINT + 'listAds',searchData,this.noAuthHeader);
  }
  confirmNewPassword(newPassword) {
    return this.http.post(AppSettings.API_ENDPOINT + 'confirmPassword', newPassword,this.noAuthHeader);
  }
  forgotPassword(email) {
    return this.http.post(AppSettings.API_ENDPOINT + 'checkEmailExists', email,this.noAuthHeader);
  }

  referal(email) {
    return this.http.post(AppSettings.API_ENDPOINT + 'referal', email,this.noAuthHeader);
  }
  listUserReferencese(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'listUserReferencese/'+id);
  }
  validateFogetToken(token) {
    return this.http.post(AppSettings.API_ENDPOINT + 'validateFogetToken', token,this.noAuthHeader);
  }
  //Helper Methods

  setToken(token: string) {
    console.log(token)
    this.localStorage.setItem('tokenInternational', token);
  }
  setUserDetails(data:any){
    this.localStorage.setItem('userDetailsPATInternational',  JSON.stringify(data));
  }
  
  getUserDetails(){
    let details = this.localStorage.getItem('userDetailsPATInternational');
    return JSON.parse(details || "null");
  }

  setCms(data:any){
    this.localStorage.setItem('cmsInternational',  JSON.stringify(data));
  }
  
  getCms(){
    let details = this.localStorage.getItem('cmsInternational');
    return JSON.parse(details);
  }

  private data;
  setData(data){
    this.data = data;
  }

  getData(){
    let temp = this.data;
    this.clearData();
    return temp;
  }

  clearData(){
    this.data = undefined;
  }
  setSearchData(data:any){
    this.localStorage.setItem('searchDataInternational',  JSON.stringify(data));
  }
  
  getSearchData(){
    let details = this.localStorage.getItem('searchDataInternational');
    return JSON.parse(details);
  }

  deleteSearchData() {
    this.localStorage.removeItem('searchDataInternational');
  }

  setSellerDetails(data:any){
    this.localStorage.setItem('sellerDetailsInternational',  JSON.stringify(data));
  }
  
  getsetSellerDetails(){
    let details = this.localStorage.getItem('sellerDetailsInternational');
    return JSON.parse(details);
  }
  setSocialDetails(data:any){
    this.localStorage.setItem('socialDetailsInternational',  JSON.stringify(data));
  }

  setSearchRecords(data){
    this.localStorage.setItem('setSearchRecordsInternational',  JSON.stringify(data));
  }

  setCurrncies(data){
    this.localStorage.setItem('setCurrnciesInternational',  JSON.stringify(data));
  }

  deleteCurr() {
    this.localStorage.removeItem('setCurrnciesInternational');
  }

  setUserLocation(data){
    this.localStorage.setItem('setUserLocationInternational',  JSON.stringify(data));
  }
 
  getUserLocation(){
    let details = this.localStorage.getItem('setUserLocationInternational');
    return JSON.parse(details);
  }

 
  getCurrncies(){
    let details = this.localStorage.getItem('setCurrnciesInternational');
    return JSON.parse(details);
  }

  getUserCurrentLocation(){
    return this.http.get('https://api.ipdata.co/?api-key=eedc57a596ba115351edf02ddf6bc35093f83bad8e203748db2580fe');
    //return this.http.get('https://ip-api.com/json');
   
  }


  getSearchRecords(data){
    let details = this.localStorage.getItem('setSearchRecordsInternational');
    return JSON.parse(details);
  }

  deleteSearchRecords() {
    this.localStorage.removeItem('setSearchRecordsInternational');
  }
  
  
  getSocialDetails(){
    let details = this.localStorage.getItem('socialDetailsInternational');
    return JSON.parse(details);
  }
  
  
  getToken() {
    return this.localStorage.getItem('tokenInternational');
  }
  deleteUserDetails() {
    this.localStorage.removeItem('userDetailsPATInternational');
  }
  deleteToken() {
    this.localStorage.removeItem('tokenInternational');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      try{
        var userPayload = atob(token.split('.')[1]);
        return JSON.parse(userPayload);
      }catch(e){
        return token;
      }
     
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }

  registerUser(jsonPayload):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'register',jsonPayload,this.noAuthHeader);
  }

  getWalletSummary(id){
    return this.http.get(AppSettings.API_ENDPOINT + 'getWalletSummary/'+id,this.noAuthHeader);
  }

  withdrawRequest(id,postData){
    return this.http.post(AppSettings.API_ENDPOINT + 'withdrawRequest/'+id,postData,this.noAuthHeader);
  }

  currency() {
    return this.http.get('https://openexchangerates.org/api/latest.json?app_id=da7633d8716f4620bf62b54c4fa1c2a1');
  }
  
  privacy() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'admin/privacy');
  }

  terms() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'admin/terms');
  }

  about() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'admin/about');
  }

  contact(data) {
    return this.http.post(AppSettings.API_ENDPOINT  + 'contact',data);
  }

  validateUser(email) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'validateUser/'+email);
  }
  getPostDetails(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'getPostDetails/'+id);
  }
  getNewsDetails(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'newsDetails/'+id);
  }


  //Dont delete
  listRecords() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'domains');
  }

  listRecordsAdmin() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'getDomainsAdmin');
  }

  listOrders(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'backorders/'+id);
  }
  deleteAd(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'deleteAd/'+id);
  }
  deleteSearch(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'deleteSearch/'+id);
  }

  deleteBookmark(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'deleteBookmark/'+id);
  }

  listHandpicks(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'myDomains/'+id);
  }

  addOrder(data,id) {
    return this.http.post(AppSettings.API_ENDPOINT  + 'order/'+id,data);
  }
  addBackorder(data,id) {
    return this.http.post(AppSettings.API_ENDPOINT  + 'addBackorder/'+id,data);
  }
  private imageUrl: Subject<any> = new Subject<any>();
  public imageUrl$ = this.imageUrl.asObservable();
  public sendImageUpdate(data: any){
    this.imageUrl.next(data);
}
private userType: Subject<any> = new Subject<any>();
public userType$ = this.userType.asObservable();
public sendUserTypeUpdate(data: any){
  this.userType.next(data);
}

updateProfileImage(jsonPayload){
  return this.http.post(AppSettings.API_ENDPOINT + 'updateProfileImage',jsonPayload);
}
updateUser(jsonPayload,id):Observable<any>{  
  return this.http.post(AppSettings.API_ENDPOINT + 'updateUser/'+id,jsonPayload);
}
subscribeEmail(jsonPayload):Observable<any>{  
  return this.http.post(AppSettings.API_ENDPOINT + 'subscribe',jsonPayload);
}
activate(jsonPayload):Observable<any>{  
  return this.http.post(AppSettings.API_ENDPOINT + 'activateSubscribe',jsonPayload);
}
listCountries() {
  return this.http.get(AppSettings.API_ENDPOINT  + 'countries');
}

addRecord(jsonPayload){
  return this.http.post(AppSettings.API_ENDPOINT + 'addDomain',jsonPayload);
}
editRecord(id,jsonPayload){
  return this.http.post(AppSettings.API_ENDPOINT + 'editDomain/'+id,jsonPayload);
}
deleteRecord(id){
  return this.http.get(AppSettings.API_ENDPOINT + 'deleteDomain/'+id);
}
getAdsAdmin(){
  return this.http.get(AppSettings.API_ENDPOINT + 'getAdminAds');
}

getAdminHandpicked(){
  return this.http.get(AppSettings.API_ENDPOINT + 'adminHandpicked');
}
getHomeContent(){
  return this.http.get(AppSettings.API_ENDPOINT + 'getContent');
}
updateHomeContent(data){
  return this.http.post(AppSettings.API_ENDPOINT + 'updateHomeContent',data);
}
changeUserPassword(data){
  return this.http.post(AppSettings.API_ENDPOINT + 'changeUserPassword',data);
}

verifyAccount(data){
  return this.http.get(AppSettings.API_ENDPOINT + 'verifyAccount/'+data);
}

plans(){
  return this.http.get(AppSettings.API_ENDPOINT + 'plans');
}

setPlanDetails(data:any){
  this.localStorage.setItem('planDetailsInternational',  JSON.stringify(data));
}

getPlanDetails(){
  let details = this.localStorage.getItem('planDetailsInternational');
  return JSON.parse(details);
}
makePayment(data){
  return this.http.post(AppSettings.API_ENDPOINT + 'makePayment',data);
}
makePaymentZero(data){
  return this.http.post(AppSettings.API_ENDPOINT + 'makePaymentZero',data);
}

setPlan(data){
  return this.http.post(AppSettings.API_ENDPOINT + 'setPlan',data);
}
registerSocial(data){
  return this.http.post(AppSettings.API_ENDPOINT + 'registerSocial',data);
}
firstTimeSocial(data){
  return this.http.post(AppSettings.API_ENDPOINT + 'firstTimeSocial',data);
}

createAd(data){
  return this.http.post(AppSettings.API_ENDPOINT + 'createAd',data);
}
updateAd(data,id){
  return this.http.post(AppSettings.API_ENDPOINT + 'updateAd/'+id,data);
}
countries(){
  return this.http.get(AppSettings.API_ENDPOINT + 'countriesData');
}

deleteAdImage(id){
  return this.http.get(AppSettings.API_ENDPOINT + 'deleteAdImage/'+id);
}

payWalletUser(data){
  return this.http.post(AppSettings.API_ENDPOINT + 'payWallet',data);
}

bookmark(data){
  return this.http.post(AppSettings.API_ENDPOINT + 'bookmark',data);
}


userAdsGet(id){
  return this.http.get(AppSettings.API_ENDPOINT + 'userContent/'+id);
}


getUserPlans(id){
  return this.http.get(AppSettings.API_ENDPOINT + 'getPlanInfo/'+id);
}

getBookmarks(id){
  return this.http.get(AppSettings.API_ENDPOINT + 'getbookmark/'+id);
}
adDetails(id){
  return this.http.get(AppSettings.API_ENDPOINT + 'adDetails/'+id);
}
getAdDetails(){
  let details = this.localStorage.getItem('adDetailsInternational');
  return JSON.parse(details);
}
setadDetails(data){
  this.localStorage.setItem('adDetailsInternational',  JSON.stringify(data));
}
bookmarkDetails(id,userId){
  return this.http.get(AppSettings.API_ENDPOINT + 'listBookMarks/'+id + '/'+userId);
}
listBookMarksAll(id){
  return this.http.get(AppSettings.API_ENDPOINT + 'listBookMarksAll/'+id);
}
filterSearch(data,type){
  return this.http.post(AppSettings.API_ENDPOINT + 'filterSearch/'+type,data);
}

getMakes() {
  return this.http.get(AppSettings.API_ENDPOINT + 'getMake');
}

getModels(id) {
  return this.http.get(AppSettings.API_ENDPOINT + 'getModel/'+id);
}
getEqp() {
  return this.http.get(AppSettings.API_ENDPOINT + 'getEqp');
}

saveSearch(data,id,type) {
  return this.http.post(AppSettings.API_ENDPOINT + 'saveSearch/'+id+'/'+type,data);
}

getSavedSearches(id) {
  return this.http.get(AppSettings.API_ENDPOINT + 'getSavedSearches/'+id);
}



addCategory(data) {
  return this.http.post(AppSettings.API_ENDPOINT + 'addCategory',data);
}

deleteCategory(id) {
  return this.http.get(AppSettings.API_ENDPOINT + 'deleteCategory/'+id);
}

listCategories() {
  return this.http.get(AppSettings.API_ENDPOINT + 'listCategories');
}

addBlog(data) {
  return this.http.post(AppSettings.API_ENDPOINT + 'addBlog',data);
}

deleteBlog(id) {
  return this.http.get(AppSettings.API_ENDPOINT + 'deleteBlog/'+id);
}

listBlogs() {
  return this.http.get(AppSettings.API_ENDPOINT + 'listBlogs');
}
listComments(id) {
  return this.http.get(AppSettings.API_ENDPOINT + 'listComments/'+id);
}

blogDetails(id) {
  return this.http.get(AppSettings.API_ENDPOINT + 'blogDetails/'+id);
}

updateBlog(jsonPayload,id):Observable<any>{  
  return this.http.post(AppSettings.API_ENDPOINT + 'updateBlog/'+id,jsonPayload);
}

addCommentBlog(data) {
  return this.http.post(AppSettings.API_ENDPOINT + 'addComment',data);
}
filterBlogsData(id) {
  return this.http.get(AppSettings.API_ENDPOINT + 'filterBlogsData/'+id);
}

listCommentsAdmin() {
  return this.http.get(AppSettings.API_ENDPOINT + 'listCommentsAdmin');
}


deleteComment(id) {
  return this.http.get(AppSettings.API_ENDPOINT + 'deleteComment/'+id);
}

vehicleCheck(data) {
  
  return this.http.post(AppSettings.API_ENDPOINT + 'getVehicleInfo',data);
}
mileageCheck(data) {
  console.log(data)

  var params = 'RegistrationNumber='+data.registrationNumber+'&mileage='+data.mileage+'&username=karansofat27';
  let headers = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) };
  return this.http.post('https://www.regcheck.org.uk/api/bespokeapi.asmx/CheckPrice',params,headers);
}
setVehicleCheck(data:any){
  this.localStorage.setItem('setVehicleCheck',  JSON.stringify(data));
}

getVehicleCheck(){
  let details = this.localStorage.getItem('setVehicleCheckInternational');
  return JSON.parse(details);
}


setCountries(data:any){
  this.localStorage.setItem('setCountriesInternational',  JSON.stringify(data));
}

getCountries(){
  let details = this.localStorage.getItem('setCountriesInternational');
  return JSON.parse(details);
}




checkUserCurrency(country,countryObj){
console.log(country)
console.log(countryObj)
  for(var key in countryObj.rates){
  if(key == country){
    return countryObj.rates[key]
  }
}

}
makeSponsar(id){
  return this.http.get(AppSettings.API_ENDPOINT + 'makeSponsar/'+id);
}
updateCount(id){
  return this.http.get(AppSettings.API_ENDPOINT + 'updateCount/'+id);
}
setUserDealerPlan(data){
  this.localStorage.setItem('setUserDealerPlanInternational',  JSON.stringify(data));
}

getUserDealerPlan(){
  let details = this.localStorage.getItem('setUserDealerPlanInternational');
  return JSON.parse(details);
  
}
userAdPlan(id){
  return this.http.get(AppSettings.API_ENDPOINT + 'userAdPlan/'+id);
}
deletePlanStorage() {
  this.localStorage.removeItem('planDetailsInternational');
}

}