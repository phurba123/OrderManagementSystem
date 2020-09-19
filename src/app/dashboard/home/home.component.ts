import { Component, OnInit } from '@angular/core';
import  {Router} from '@angular/router';
import { ProductsService } from 'src/app/products.service';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner'
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public allProducts:any;
  private token;
  private userId;

  constructor(
    private router:Router,
    private productService:ProductsService,
    private spinner:Ng4LoadingSpinnerService,
    private cartService:CartService
  ) {}

  ngOnInit() {
    this.spinner.show();

    this.userId = localStorage.getItem('id')

    // check if user is logged in or not
    this.checkUser();
  }

  // function to check  if user is logged in or not
  private checkUser()
  {
    // if no auth token is present or user is not logged in then redired to sign in page
    this.token = localStorage.getItem('at');
    if(!this.token)
    {
      this.router.navigate(['/signin'])
    }
    else
    {
      this.getAllProducts(this.token);
    }
  } //end of check function

  // getting all products
  private getAllProducts(token)
  {

    if(token)
    {
      this.productService.getAllProducts(token).subscribe((response)=>
      {
        console.log(response)
        if(response['status']===200)
        {
          setTimeout(()=>
          {
            this.allProducts = response['data'];
          // once the allProducts is initialized ,hide spinner

            this.spinner.hide()
          },3000)
        }
        else
        {
          console.log(response)
        }
      },
      (err)=>
      {
        console.log('err : ',err)
      })
    }
  }

  // add product to cart
  public addToCart(product)
  {
    if(this.userId&&this.token&&product)
    {
      let data = 
      {
        userId:this.userId,
        authToken:this.token,
        Id:product.Id,
        Name:product.Name,
        Image:product.Image,
        Price:product.Price
      }
      this.cartService.addProductToCart(data).subscribe((apiresponse)=>
      {
        if(apiresponse['status']===200)
        {
          console.log('product added : ',apiresponse)
        }
        else
        {
          console.log(apiresponse)
        }
      },
      (err)=>
      {
        console.log('err : ',err)
      })
    }
  }

  ngOnDestroy()
  {
  }

}
