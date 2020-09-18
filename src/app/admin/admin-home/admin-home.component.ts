import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/products.service';
import {Router} from '@angular/router'
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  public Name;
  public Id;
  public Image;
  public Price;

  public allProducts:any;

  private token;

  constructor(
    private productService: ProductsService,
    private router : Router,
    private userService:UserService
  ) { }

  ngOnInit() {

    this.checkUser();
  }

  private checkUser()
  {
     this.token =localStorage.getItem('at');
    if(!this.token)
    {
      this.router.navigate(['/signin'])
    }
    else
    {
      this.getAllProducts()
    }
  }

  // getting all products
  private getAllProducts()
  {
    this.productService.getAllProducts(this.token).subscribe((apiresponse)=>
    {
      if(apiresponse['status']===200)
      {
        this.allProducts = apiresponse['data'];
        console.log(this.allProducts)
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

  // submitting new product
  public submitProduct() {
    if (this.Name && this.Id && this.Image && this.Price) {
      //post new product
      let data = {
        Id: this.Id,
        Name: this.Name,
        Image: this.Image,
        Price: '$' + this.Price
      }
      this.productService.createNewProduct(data).subscribe((apiresponse) => {
        if (apiresponse['status'] === 200) {
          console.log('success');

          // clear all inputs after successfull post
          this.clearAllInputs()

        }

        else {
          console.log(apiresponse);
          this.clearAllInputs()
        }
      },
        (err) => {
          console.log('err : ', err);
          this.clearAllInputs()
        })
    }
  }

  // clear all inputs
  private clearAllInputs() {
    this.Id = null;
    this.Name = null;
    this.Image = null;
    this.Price = null;
  }

  // signout admin
  public signOut()
  {
    this.userService.signOut(this.token).subscribe((response)=>
    {
      if(response['status']===200)
      {
        console.log('signed out');
        this.router.navigate(['/signin'])
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
