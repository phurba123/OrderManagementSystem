import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  private token;
  public carts;
  public totalPrice:any;

  public transactionDetail:any;

  constructor(
    private cartService:CartService
  ) {}

  ngOnInit() {
    this.token = localStorage.getItem('at');

    this.getCartDetails()
  }

  // get cart details
  public getCartDetails()
  {
    if(this.token)
    {
      this.cartService.getCartDetails(this.token).subscribe((response)=>
      {
        if(response['status']===200)
        {
          // console.log(response);
          this.carts = response['data']['cartProducts'];
          console.log(this.carts);

          // find total price
          this.findTotalPrice(this.carts);
          
        }
        else
        {
          console.log(response);
        }
      },
      (err)=>
      {
        console.log(err);
      })
    }
  }

  // finding total price
  private findTotalPrice(carts)
  {
    let price=0;
    if(carts)
    {
      carts.forEach((cart)=>
      {
        // remove dollar sign and convert to number
        let productPrice = parseInt(cart.productPrice.slice(1,cart.productPrice.length));
        console.log(typeof productPrice)
        price+=productPrice;
      })
    }

    // assign total price
    this.totalPrice = price;
  }

  // clear carts
  public clearCarts()
  {
    if(this.token)
    {
      this.cartService.clearCarts(this.token).subscribe((apiresponse)=>
      {
        console.log(apiresponse)
        if(apiresponse['status']===200)
        {
          console.log('cart cleared');
          this.carts=null;
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

  // make new order
  public orderNow()
  {
    console.log(JSON.stringify(this.carts));
    let data = JSON.stringify(this.carts)
    this.cartService.makeNewOrder(data,this.token,this.totalPrice).subscribe((apiresponse)=>
    {
      console.log(apiresponse);

      if(apiresponse['status']===200)
      {
        setTimeout(()=>
        {
          this.clearCarts();
          this.transactionDetail=apiresponse['data'];
        },1500)
      }
      else
      {
        console.log(apiresponse)
      }
    },
    (err)=>
    {
      console.log(err)
    })
  }

}
