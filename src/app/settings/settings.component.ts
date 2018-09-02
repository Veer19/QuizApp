import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  newName;
  uid;
  picture:File;
  userPicture;
  newPass1;
  newPass2;
  showImageLoader:boolean = false;
  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private storage:AngularFireStorage ) { }

  ngOnInit() {
    this.afAuth.user.subscribe(user=>{
      this.uid =  user.uid;
      const ref = this.storage.ref('userPics/'+user.uid);
      this.userPicture = ref.getDownloadURL();
      });
    
  }
  changeName(){
    
    this.db.object("allUsers/"+this.uid).update({Name:this.newName});
      
    console.log(this.newName);
  }
  changePicture(){
    this.showImageLoader = true;
    const task = this.storage.upload("userPics/"+this.uid, this.picture).then(snapshot=>{
      
      const ref = this.storage.ref('userPics/'+this.uid);
      this.userPicture = ref.getDownloadURL();
      this.showImageLoader = false;

    });
    
    
  }
  onFileChange(event){
      this.picture = event.target.files[0];
      console.log(this.picture);
  }

  changePass(){
    if(this.newPass1!==this.newPass2){
      alert("The two inputs do not match");
      return;
    }
    this.afAuth.auth.currentUser.updatePassword(this.newPass1);
    console.log("Password Changed");

  }

}
