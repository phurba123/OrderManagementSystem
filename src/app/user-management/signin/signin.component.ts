import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public email:string;
  public password:string;

  constructor(private userService:UserService,
    private router:Router) { }

  ngOnInit() {
  }

  public signIn()
  {
    if(this.email && this.password)
    {
      this.userService.signIn(this.email,this.password).subscribe((apiresponse)=>
      {
        console.log(apiresponse)
        if(apiresponse['status']===200)
        {
          // on login successfull,save token and userid locally
          localStorage.setItem('at',apiresponse['data']['authToken']);
          localStorage.setItem('id',apiresponse['data']['userDetails']['userId']);

          // navigate to home component
          setTimeout(()=>
          {
            this.router.navigate(['/home'])
          },1000)
        }
      },
      (err)=>
      {
        console.log('err : ',err)
      })
    }
  }

}
