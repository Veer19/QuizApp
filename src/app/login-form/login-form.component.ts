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

      // When we have the user object, redirect to the dashboard
      this.router.navigate(['/dashboard']);
    })
    .catch(error=>{
      // Display Error Message
      //Put this message into a snackbar later
      console.log(error.message);
    });
    
  }
}
