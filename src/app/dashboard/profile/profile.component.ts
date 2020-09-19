import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public username:any;
  private token;
  public transactions:any;

  constructor(
    private cartService:CartService
  ) { }

  ngOnInit() {
    this.username = localStorage.getItem('user');
    this.token = localStorage.getItem('at');
    this.getAllTransactions()
  }

  // get all transactions
  private getAllTransactions()
  {
    if(this.token)
    {
      this.cartService.getAllTransactions(this.token).subscribe((apiresponse)=>
      {
        if(apiresponse['status']===200)
        {
          this.transactions=apiresponse['data'];
          console.log(this.transactions)
        }
        else
        {
          this.transactions = apiresponse['data']
        }
      },
      (err)=>
      {
        console.log(err)
      })
    }
  }

}
