import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
    
  }
  login(email, password){
    //Firebase Login
    this.afAuth.auth.signInWithEmailAndPassword(email,password)
    .then(user =>{
      this.router.navigate(['/dashboard']);
    })
    .catch(error=>{
      console.log(error.message);
    });
    
  }
  logout() {
    this.afAuth.auth.signOut();
    this.afAuth.user.subscribe(user => {
      console.log(user);
    });
  }

}
