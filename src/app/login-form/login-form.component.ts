import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {MatSnackBar} from '@angular/material';
import { auth } from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router,private snackBar:MatSnackBar) { }
  showLoader:boolean = false;
  forgotPasswordWindowIsOpen:boolean = false;
  emailForForgotPass;
  ngOnInit() {
    
  }
  login(email, password){
    //Firebase Login
    this.showLoader = true;
    this.afAuth.auth.signInWithEmailAndPassword(email,password)
    .then(user =>{
      console.log(email);
      this.showLoader = false;
      // When we have the user object, redirect to the dashboard
      this.router.navigate(['/dashboard']);
    })
    .catch(error=>{
      //Display Error Message
      //Put this message into a snackbar later
      this.showLoader = false;
      
      this.snackBar.open(error.message,"", {
        duration: 3000,
      });
      console.log(error.message);
    });
    
  }
  sendPasswordResetLink(email){
    this.afAuth.auth.sendPasswordResetEmail(email);
    this.snackBar.open("Password Reset Link Sent","", {
      duration: 3000,
    });
  }
}
