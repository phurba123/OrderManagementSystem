import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient,HttpParams} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private adminBaseUri = 'http://localhost:3000/api/v1/admin/product';
  private baseUri = 'http://localhost:3000/api/v1/product'

  constructor(
    private http:HttpClient
  ) { }


  // create new product by admin only
  public createNewProduct(data):Observable<any>
  {
    let params = new HttpParams()
    .set('Id',data.Id)
    .set('Name',data.Name)
    .set('Image',data.Image)
    .set('Price',data.Price)

    return this.http.post(`${this.adminBaseUri}/post`,params);
  }

  // getting all products details
  public getAllProducts(authToken):Observable<any>
  {
    return this.http.get(`${this.baseUri}/view/all?authToken=${authToken}`);
  }
}
