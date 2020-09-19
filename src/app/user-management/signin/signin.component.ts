import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public email:string;
  public password:string;

  private subs:any[]=[];

  constructor(private userService:UserService,
    private router:Router) { }

  ngOnInit() {
  }

  public signIn()
  {
    if(this.email && this.password)
    {
      let sub = this.userService.signIn(this.email,this.password).subscribe((apiresponse)=>
      {
        console.log(apiresponse)
        if(apiresponse['status']===200)
        {
          // on login successfull,save token and userid locally
          localStorage.setItem('at',apiresponse['data']['authToken']);
          localStorage.setItem('id',apiresponse['data']['userDetails']['userId']);
          localStorage.setItem('user',apiresponse['data']['userDetails']['username'])

          // if user is admin then navigate to admin dashboard
          if(this.isAdmin(apiresponse['data']['userDetails']['username']))
          {
            this.router.navigate(['/admin/home']);
          }
          else
          {
            // navigate to home component
            this.router.navigate(['/home'])
          }
        }
      },
      (err)=>
      {
        console.log('err : ',err)
      });

      this.subs.push(sub);
    }
  }

  //check if user is admin or not
  public isAdmin(userName): boolean {
    let name = userName;
    //to check if userName ends with admin or not
    let indexToSlice = (name.length - 5);//for getting substring with last 5 character
    let slicedUserName = name.slice(indexToSlice);
    //console.log(slicedUserName)

    if (slicedUserName === 'admin' || slicedUserName === 'Admin') {
      return true;
    }
    else {
      return false;
    }
  }

  ngOnDestroy()
  {
    this.subs.forEach((sub)=>
    {
      sub.unsubscribe();
    })
  }

}
