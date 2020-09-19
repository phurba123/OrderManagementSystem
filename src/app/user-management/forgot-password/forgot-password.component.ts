import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  public email:any;
  public isReset:boolean=false;
  public newPassword:any;

  public subs:any[]=[];

  constructor(
    private userService:UserService,
    private toastrService:ToastrService
  ) { }

  ngOnInit() {
  }

  // reset
  public resetPassword()
  {
    console.log('inside')
    if(this.email)
    {
      let sub = this.userService.resetPassword(this.email).subscribe((response)=>
      {
        if(response['status']===200)
        {
          console.log('successfull')
          console.log(response);
          this.isReset=true;
          this.newPassword = response['data'];
          this.email=null;

          this.toastrService.success('Password resetted')
        }
        else
        {
          console.log(response)
        }
      },
      (err)=>
      {
        console.log(err)
      });

      this.subs.push(sub)
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
