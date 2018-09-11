import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  
  constructor(private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router,
    private storage:AngularFireStorage) { }
  uid;
  ngOnInit() {

    this.uid = this.afAuth.user.subscribe(user=>{
      this.db.object("allUsers/"+user.uid).valueChanges().subscribe(userData=>{
        //Get Question Number and then query the question node
      })
    })
    


  }

}
