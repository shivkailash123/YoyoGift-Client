import { sendfeedback } from '../../feature/user/feedback/feedback';
import { feedBackDisplay } from '../models/feedBackDisplay';
import { observable } from 'rxjs/internal-compatibility';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDetails } from 'src/app/feature/login/signup/UserDetails';
import { GiftCardData } from 'src/app/feature/user/GiftCardData';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { UserData } from 'src/app/feature/login/login/profile';
import { User1 } from 'src/app/feature/login/login/loginuser';
import { Socialusers } from 'src/app/feature/login/login/socialuser';
import { ProductDetails } from 'src/app/feature/admin/addproduct/ProductDetail';
import { ProductDetail } from 'src/app/feature/admin/updateproduct/ProductDet';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataBaseUrl: string;
  ud: User1;
  socialFlag = true;
  profileData: UserData;
  data: UserData;
  data1: any;
  userCredentials: User1;
  isAdminloggedIn = false;
  isUserLoggedIn = false;
  isSocialLoggedIn = false;
  public myData = new BehaviorSubject<any>(null);
  newData = this.myData.asObservable();

  constructor(private httpClient: HttpClient) {
    this.dataBaseUrl = 'https://agnitra-yoyogift-jan-2020-qa-api.azurewebsites.net/yoyogift';
   //  this.dataBaseUrl = 'https://agnitra-yoyogift-jan-2020-dev-api.azurewebsites.net/yoyogift';
    // this.dataBaseUrl = 'http://localhost:8080/yoyogift';
    //this.dataBaseUrl = 'https://agnitra-yoyogift-jan-2020-qa-api.azurewebsites.net/yoyogift';
  }

  getProductData(arg0: number) {
    throw new Error('Method not implemented.');
  }

  addProduct(product: ProductDetails) {
    console.log(product);
    return this.httpClient.post(this.dataBaseUrl + '/add', product);
  }

  getOrders(email: string) {
    return this.httpClient.get(this.dataBaseUrl + '/getOrders/' + email);
  }
  updateProduct(product: ProductDetail) {
    console.log(product);
    return this.httpClient.put(this.dataBaseUrl + '/updateProduct', product);
  }

  display() {
    return this.httpClient.get(this.dataBaseUrl, {
      responseType: 'text' as 'json',
    });
  }
  addGiftCard(giftCardData: GiftCardData): Observable<any> {
    console.log(giftCardData);
    return this.httpClient.post<any>(
      this.dataBaseUrl + '/couponRedeem/',
      giftCardData
    );
  }
  setLoginData(userDetail: any) {
    this.myData.next(userDetail);
  }
  getLoginData() {
    return JSON.parse(localStorage.getItem('currentUserData'));
  }
  addAmount(id: number, amount: number): Observable<any> {
    console.log(id);
    console.log(amount);
    return this.httpClient.post<any>(
      this.dataBaseUrl + '/addMoney/' + id + '/' + amount,
      null
    );
  }

  getUserData(userEmail: string): Observable<any> {
    console.log(userEmail);
    return this.httpClient.get<any>(
      this.dataBaseUrl + '/userdetail/' + userEmail
    );
  }
  getProducts() {
    return this.httpClient.get(this.dataBaseUrl);
  }

  getProductDetail(productId): Observable<any> {
    console.log(productId);
    return this.httpClient.get(
      this.dataBaseUrl + '/getProductDetails/' + productId
    );
  }
  getReviewsRating(productId): Observable<any> {
    return this.httpClient.get(
      this.dataBaseUrl + '/getReviewsRating/' + productId
    );
  }
  addFeedbackDetail(
    productId: any,
    userId: any,
    orderId: any,
    feed: sendfeedback
  ): Observable<any> {
    return this.httpClient.post<any>(
      this.dataBaseUrl +
        '/feedback/' +
        productId +
        '/' +
        userId +
        '/' +
        orderId,
      feed
    );
  }
  addUser(user: UserDetails) {
    return this.httpClient.post(this.dataBaseUrl + '/addUser', user);
  }

  getProduct(productId): Observable<any> {
    return this.httpClient.get<any>(
      this.dataBaseUrl + '/getProductDetails/' + productId
    );
  }

  productOrder(
    productId: number,
    orderId: number,
    quantity: number
  ): Observable<any> {
    console.log('HI');
    console.log(productId);
    console.log(orderId);
    console.log(quantity);

    return this.httpClient.post<any>(
      this.dataBaseUrl +
        '/productorder/' +
        productId +
        '/' +
        orderId +
        '/' +
        quantity,
      null
    );
  }
  check(formdata) {
    this.ud = {
      email: formdata.value.emailId,
      password: formdata.value.password,
      socialFlag: this.socialFlag,
    };
    this.userCredentials = this.ud;
    return this.httpClient.post(this.dataBaseUrl + '/login', this.ud);
  }
  compareSocialMediaData(user: Socialusers) {
    const emails = user.email.split('@');
    this.ud = {
      email: emails[0],
      password: '',
      socialFlag: this.socialFlag,
    };
    this.isSocialLoggedIn = true;
    return this.httpClient.post(this.dataBaseUrl + '/login', this.ud);
  }
  typeOfUser(userData: UserData) {
    this.profileData = userData;
    const val = userData.email.split('@');
    if (val[0] === 'admin') {
      localStorage.setItem('admin', JSON.stringify(true));
      this.isAdminloggedIn = true;
    } else {
      localStorage.setItem('user', JSON.stringify(true));
      this.isUserLoggedIn = true;
    }
    localStorage.setItem('email', JSON.stringify(this.profileData.email));
  }
  getLoginStatus() {
    if (localStorage.getItem('user') === 'true') {
      // return true;
      console.log(localStorage.getItem('check'));
      localStorage.setItem('check', 'true');
    }
    localStorage.setItem('check', 'false');
    console.log(localStorage.getItem('check'));
    // return false;
  }

  getprofile() {
    console.log(this.profileData);
    return of(this.profileData);
  }

  // DELETE PRODUCT API -- TUSHAR
  deleteProduct(id: number) {
    return this.httpClient.delete(`${this.dataBaseUrl}/deleteProduct/${id}`);
  }

  // RETRIEVE GIFT CARDS BY USER API -- TUSHAR
  getGiftCards(id: number) {
    return this.httpClient.get(`${this.dataBaseUrl}/getGiftCardsByUser/${id}`);
  }

  // REDEEM GIFT CARD BY USER ID AND GIFT CARD API -- TUSHAR
  redeemGiftCard(userId: number, giftCardId: number) {
    return this.httpClient.get(
      `${this.dataBaseUrl}/redeemGiftCard/${userId}/${giftCardId}`
    );
  }

  // RETRIEVE ALL USERS -- TUSHAR
  getAllUsers() {
    return this.httpClient.get(`${this.dataBaseUrl}/getAllUsers`);
  }

  // RETRIEVE ALL ORDERS -- TUSHAR
  getAllOrders() {
    return this.httpClient.get(`${this.dataBaseUrl}/getAllOrders`);
  }

  updateUserData(userData: any) {
    const d = JSON.parse(localStorage.getItem('currentUserData'));
    const id = d.userId;
    console.log(userData.value);
    this.data = {
      userId: 0,
      name: userData.value.name,
      phoneNo: userData.value.phoneNo,
      email: userData.value.userName,
      password: userData.value.password,
      wallet: 0,
    };
    return this.httpClient.put(this.dataBaseUrl + '/update/' + id, this.data);
  }

  getStatisticsData() {
    return this.httpClient.get(`${this.dataBaseUrl}/getStatisticsData`);
  }
  sendEmail(data: any) {
    const d = JSON.parse(localStorage.getItem('currentUserData'));
    const id = d.userId;
    const email = data.value.code;
    return this.httpClient.post(this.dataBaseUrl + '/emailservice/'+ email+'/'+ id,null)
  }

}
