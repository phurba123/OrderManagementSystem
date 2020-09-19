import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public email:string;
  public username:string;
  public password:string;
  public mobile:any;

  private subs:any[]=[];

  constructor(private userService:UserService,private router:Router) { }

  ngOnInit() {
  }

  public signUp()
  {
    if(this.email && this.password && this.mobile && this.username)
    {

      let data = {
        email:this.email,
        password:this.password,
        mobile:this.mobile,
        username:this.username
      }
      let sub = this.userService.signup(data).subscribe((apiresponse)=>
      {
        if(apiresponse['status']===200)
        {
          // on successfull signup navigate to sign in 
          setTimeout(()=>
          {
            this.router.navigate(['/signin'])
          },1500)
        
        }
      },
      (err)=>
      {
        console.log('err : ',err)
      });

      this.subs.push(sub)
    }
    else
    {
      console.log('not sufficient data')
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
