import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';
import { ToastrService } from 'ngx-toastr';

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

  private subscriptions:any[]=[];

  constructor(
    private cartService:CartService,
    private toastr:ToastrService
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
      let sub = this.cartService.getCartDetails(this.token).subscribe((response)=>
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
      });

      this.subscriptions.push(sub);
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
      let sub = this.cartService.clearCarts(this.token).subscribe((apiresponse)=>
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
      });

      this.subscriptions.push(sub);
    }
  }

  // make new order
  public orderNow()
  {
    console.log(JSON.stringify(this.carts));
    let data = JSON.stringify(this.carts)
    let sub = this.cartService.makeNewOrder(data,this.token,this.totalPrice).subscribe((apiresponse)=>
    {
      console.log(apiresponse);

      if(apiresponse['status']===200)
      {
        setTimeout(()=>
        {
          this.toastr.success('Order Successfull');
          this.clearCarts();

          // showing dummy transaction detail
          this.transactionDetail=apiresponse['data'];
        },1500)
      }
      else
      {
        this.toastr.warning(apiresponse['message'])
      }
    },
    (err)=>
    {
      console.log(err)
    });

    this.subscriptions.push(sub);
  }


  // 
  ngOnDestroy()
  {
    // unsubscribe from all subscriptions
    this.subscriptions.forEach((sub)=>
    {
      sub.unsubscribe();
    })
  }

}
