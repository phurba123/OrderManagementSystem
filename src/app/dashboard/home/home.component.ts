import { Component, OnInit } from '@angular/core';
import  {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit() {

    // check if user is logged in or not
    this.checkUser();
  }

  // function to check  if user is logged in or not
  private checkUser()
  {
    // if no auth token is present or user is not logged in then redired to sign in page
    if(!localStorage.getItem('at'))
    {
      this.router.navigate(['/signin'])
    }
  } //end of check function

}
