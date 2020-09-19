import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  private token;

  @Input() public active:string;

  constructor(private userService:UserService,
    private router:Router) { }

  ngOnInit() {
    this.token = localStorage.getItem('at')
  }

  public signOut()
  {
    this.userService.signOut(this.token).subscribe((response)=>
    {
      if(response['status']===200)
      {
        this.router.navigate(['/signin'])
      }
    },
    (err)=>
    {
      console.log(err)
    })
  }

}
