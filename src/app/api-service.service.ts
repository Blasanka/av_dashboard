import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})

export class ApiServiceService {

  baseurl = environment.apiEndPoint;

  constructor(private http: HttpClient) { }

  private getHeaders() {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('access_token');
    headers = headers.set('Authorization', 'Bearer '+token);
    return headers;
   }

  login(data) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    return this.http.post(this.baseurl+'supplier_login', data, { headers: headers });
  }

  authenticateAdmin(data) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    return this.http.post(`${this.baseurl}admin/login`, data, { headers: headers });
  }

  setSession(authResult) {
    console.log(authResult.token);
    const expiresAt = moment().add(authResult.data.expires_at, 'second');
    console.log('hi... '+expiresAt);
    localStorage.setItem('access_token',authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('username', authResult.data.username);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  supplier_registration(data) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    return this.http.post(this.baseurl+'supplier_registration', data, { headers: headers });
  }

  getSupplierDetails() {
    let headers = new HttpHeaders();
    headers = this.getHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    return this.http.get(this.baseurl+'get_profile_details',{ headers: headers });
  }

  updateSupplierDetails(data) {
    let headers = new HttpHeaders();
    headers = this.getHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    return this.http.post(this.baseurl+'update_supplier_details', data, { headers: headers });
  }

  submitSuplierProduct(data) {
    let headers = new HttpHeaders();
    headers = this.getHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    return this.http.post(`${this.baseurl}supplier/products`, data, { headers: headers });
  }

  submitSuplierProductImages(data) {
    let headers = new HttpHeaders();
    headers = this.getHeaders();
    // headers = headers.set('Content-Type', undefined);
    // headers = headers.set('Accept', 'multipart/form-data');
    return this.http.post(`${this.baseurl}supplier/products/image`, data, { headers: headers });
  }

  getSuplierAllProducts() {
    let headers = new HttpHeaders();
    headers = this.getHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    return this.http.get(`${this.baseurl}supplier/products`, { headers: headers });
  }

  getAdminAllProducts() {
    let headers = new HttpHeaders();
    headers = this.getHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    return this.http.get(`${this.baseurl}admin/products`, { headers: headers });
  }

  changeProductStatus(data) {
    let headers = new HttpHeaders();
    headers = this.getHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    return this.http.put(`${this.baseurl}admin/products`, data, { headers: headers });
  }

}
