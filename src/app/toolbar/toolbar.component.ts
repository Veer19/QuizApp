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
  username;
  userPic;
  userExists:boolean = false;
  userProfile: AngularFireObject<any>;
  userPictureUrl;
  userPicture;
  @Input() showBackArrow: boolean;
  @Input() hideToolbar: boolean;
  ngOnInit() {
    console.log(this.showBackArrow);
    
    this.afAuth.user.subscribe(user => {
      this.userProfile = this.db.object("allUsers/"+user.uid);
      this.userProfile.valueChanges().subscribe(user=>{
        this.username = user.Name;
      });
      const ref = this.storage.ref('userPics/'+user.uid);
      this.userPicture = ref.getDownloadURL();
      this.userPicture.subscribe(pic=>{
        this.userPictureUrl = pic;
      })
      
    });
  }
  logout() {
    this.afAuth.auth.signOut();
  }


}
