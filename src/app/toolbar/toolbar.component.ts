import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireStorage } from 'angularfire2/storage';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private router: Router,
              private storage:AngularFireStorage ) { }

  //Class variables
  username;
  userPic;
  userExists:boolean = false;
  userProfile: AngularFireObject<any>;
  userPictureUrl;
  userPicture;

  //Variables from app-component
  @Input() showBackArrow: boolean;
  @Input() hideToolbar: boolean;


  ngOnInit() {
    //Runs on page initialization
    //Subscribing into the user object to get the UID
    this.afAuth.user.subscribe(user => {

      //Querying the database for userdata corresponding to the UID
      this.userProfile = this.db.object("allUsers/"+user.uid);
      this.userProfile.valueChanges().subscribe(user=>{
        this.username = user.Name;
      });

      //Querying the storage bucket for profile picture
      const ref = this.storage.ref('userPics/'+user.uid);
      this.userPicture = ref.getDownloadURL();
      this.userPicture.subscribe(pic=>{
        this.userPictureUrl = pic;
      })
      
    });
  }
  logout() {
    // Simple logout funtion
    this.afAuth.auth.signOut();
  }


}
