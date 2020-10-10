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
    headers = headers.set('Authorization', 'Bearer ' + token);
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    return headers;
   }

  login(data) {
    return this.http.post(this.baseurl + 'supplier_login', data, { headers: this.getHeaders() });
  }

  authenticateAdmin(data) {
    return this.http.post(`${this.baseurl}admin/login`, data, { headers: this.getHeaders() });
  }

  setSession(authResult) {
    console.log(authResult.token);
    const expiresAt = moment().add(authResult.data.expires_at, 'second');
    console.log('hi... ' + expiresAt);
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
    return this.http.post(this.baseurl + 'supplier_registration', data, { headers: this.getHeaders() });
  }

  getSupplierDetails() {
    return this.http.get(this.baseurl + 'get_profile_details',{ headers: this.getHeaders() });
  }

  updateSupplierDetails(data) {
    return this.http.post(this.baseurl + 'update_supplier_details', data, { headers: this.getHeaders() });
  }

  submitSuplierProduct(data) {
    return this.http.post(`${this.baseurl}supplier/products`, data, { headers: this.getHeaders() });
  }

  submitSuplierProductImages(data) {
    let headers = this.getHeaders();
    headers = headers.delete('Content-Type');
    headers = headers.delete('Accept');
    return this.http.post(`${this.baseurl}supplier/products/image`, data, { headers: headers});
  }

  updateSupplierProduct(id, data) {
    return this.http.put(`${this.baseurl}supplier/products/${id}`, data, { headers: this.getHeaders() });
  }

  getSuplierAllProducts() {
    return this.http.get(`${this.baseurl}supplier/products`, { headers: this.getHeaders() });
  }

  getSupplierProduct(id) {
    return this.http.get(`${this.baseurl}supplier/products/${id}`, { headers: this.getHeaders() });
  }

  getAdminAllProducts() {
    return this.http.get(`${this.baseurl}admin/products`, { headers: this.getHeaders() });
  }

  getAllSuppliers() {
    return this.http.get(`${this.baseurl}admin/suppliers`, { headers: this.getHeaders() });
  }

  changeSupplierStatus(data) {
    return this.http.put(`${this.baseurl}admin/suppliers`, data, { headers: this.getHeaders() });
  }

  changeProductStatus(data) {
    return this.http.put(`${this.baseurl}admin/products`, data, { headers: this.getHeaders() });
  }

  deleteProduct(id) {
    return this.http.delete(`${this.baseurl}supplier/products/${id}`, { headers: this.getHeaders() });
  }

  submitCategory(data) {
    return this.http.post(`${this.baseurl}categories`, data, { headers: this.getHeaders() });
  }

  deleteCategory(id) {
    return this.http.delete(`${this.baseurl}categories/${id}`, { headers: this.getHeaders() });
  }

  updateCategory(id, data) {
    return this.http.put(`${this.baseurl}categories/${id}`, data, { headers: this.getHeaders() });
  }

  getCategories() {
    return this.http.get(`${this.baseurl}categories`, { headers: this.getHeaders() });
  }

  getCategory(id) {
    return this.http.get(`${this.baseurl}categories/${id}`, { headers: this.getHeaders() });
  }

  submitSubCategory(data) {
    return this.http.post(`${this.baseurl}sub-categories`, data, { headers: this.getHeaders() });
  }

  deleteSubCategory(id) {
    return this.http.delete(`${this.baseurl}sub-categories/${id}`, { headers: this.getHeaders() });
  }

  updateSubCategory(id, data) {
    return this.http.put(`${this.baseurl}sub-categories/${id}`, data, { headers: this.getHeaders() });
  }

  getSubCategories() {
    return this.http.get(`${this.baseurl}sub-categories`, { headers: this.getHeaders() });
  }

  getSubCategory(id) {
    return this.http.get(`${this.baseurl}sub-categories/${id}`, { headers: this.getHeaders() });
  }
}
