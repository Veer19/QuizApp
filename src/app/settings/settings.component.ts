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


  //Class variables
  newName;
  uid;
  picture:File;
  userPicture;
  newPass1;
  newPass2;
  showImageLoader:boolean = false;

  constructor(private afAuth: AngularFireAuth, 
              private db: AngularFireDatabase,
              private storage:AngularFireStorage ) { }



  ngOnInit() {

    //Getiing user's image through UID
    this.afAuth.user.subscribe(user=>{
      this.uid =  user.uid;
      const ref = this.storage.ref('userPics/'+user.uid);
      this.userPicture = ref.getDownloadURL();
      });
    
  }
  changeName(){
    //Updating the Name property in the database    
    this.db.object("allUsers/"+this.uid).update({Name:this.newName});
    
  }
  changePicture(){

    //Updating the image in the storage bucket

    //Showing a loader while this funtion runs
    this.showImageLoader = true;
    const task = this.storage.upload("userPics/"+this.uid, this.picture) //Uploading Image
    .then(snapshot=>{
      //Fetching the newly uploaded image from the storage bucket
      const ref = this.storage.ref('userPics/'+this.uid);
      this.userPicture = ref.getDownloadURL();
      //Hiding  the funtion loader
      this.showImageLoader = false;

    });
    
    
  }
  //Runs whenever the user selects a picture.
  onFileChange(event){
      // Setting the this.picture variable as the file uploaded. We use this variable in the changePicture() funtion
      this.picture = event.target.files[0];
  }

  changePass(){
    //Checking if the two passwords entered are identical
    if(this.newPass1!==this.newPass2){
      alert("The two inputs do not match");
      return;
    }

    //Changing password
    
    this.afAuth.auth.currentUser.updatePassword(this.newPass1)
    //Displaying messages
    //Put into a snackbar later.
    .then(a =>{
      console.log("Password Changed");
    })
    .catch(err=>{
      console.log(err.message);
    }) ;

   
    

  }

}
