import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth) { }
  username;
  ngOnInit() {
    this.afAuth.user.subscribe(user => {
      this.username = user.email;
    });
    
  }
  logout() {
    this.afAuth.auth.signOut();
    this.afAuth.user.subscribe(user => {
      console.log(user);
    });
  }

}
