import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavbarService } from '../services/nav.service';
import firebaseConfig from '../../../firebaseConfig'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isAdmin: boolean;
  
  constructor(private authService: AuthService, public nav: NavbarService) { }

  ngOnInit() {
    console.log('HELLO')
    this.authService.getID()
      .then((uid) => {
        if (uid == firebaseConfig.adminUIDs[0]) {
          this.isAdmin = true;
          console.log('is admin', this.isAdmin)
        }
      })
  }

  onSignout() {
    this.authService.signout();
    window.location.reload();
  }

}
