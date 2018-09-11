import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private storage: AngularFireStorage) { }
  uid;
  userPicture;
  ngOnInit() {
    this.afAuth.user.subscribe(user=>{
      this.uid =  user.uid;
      const ref = this.storage.ref('userPics/'+user.uid);
      this.userPicture = ref.getDownloadURL();
      });
    
  }

}
