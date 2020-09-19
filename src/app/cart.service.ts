import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUri = 'http://localhost:3000/api/v1/cart';
  private transactionUri = 'http://localhost:3000/api/v1/transaction'

  constructor(
    private http:HttpClient
  ) { }

  // adding product to cart
  public addProductToCart(data):Observable<any>
  {
    let params = new HttpParams()
    .set('authToken',data.authToken)
    .set('userId',data.userId)
    .set('Id',data.Id)
    .set('Name',data.Name)
    .set('Price',data.Price)
    .set('Image',data.Image);

    return this.http.post(`${this.baseUri}/add`,params);
  }

  // getting cart details of user
  public getCartDetails(authToken):Observable<any>
  {
    return this.http.get(`${this.baseUri}/view?authToken=${authToken}`);
  }

  // clear carts
  public clearCarts(authToken):Observable<any>
  {
    return this.http.post(`${this.baseUri}/clear?authToken=${authToken}`,{})
  }

  // make new order
  public makeNewOrder(data,authToken,totalPrice):Observable<any>
  {
    let params = new HttpParams()
    .set('data',data)
    .set('authToken',authToken)
    .set('totalPrice',totalPrice)
    return this.http.post(`${this.transactionUri}/new`,params);
  }
}
