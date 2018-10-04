import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup ,FormBuilder,Validators} from '@angular/forms';
/**
 * Generated class for the ClientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebase;

@IonicPage()
@Component({
  selector: 'page-client',
  templateUrl: 'client.html',
})
export class ClientPage {
  client:FormGroup;
  display = 0;
  useId;
  logins:boolean=false;
  loginError: string;
  fname;
  lname;
  email;
  user;

  // gender;
  // age;
  password;
  contactNo;
  human={
    fname:"",
    lname:"",
    contactNo:"",
    // age:"",
    // gender:"",
    password:""
  }

  constructor(private f:FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
    this.client=this.f.group({
      email:['',[Validators.required,Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'),Validators.maxLength(25)]],
      password:['',[Validators.required,Validators.minLength(6)]],
      fname:['',[Validators.required,Validators.pattern('[a-zA-Z]*'),Validators.maxLength(20)]],
      lname:['',[Validators.required,Validators.pattern('[a-zA-Z]*'),Validators.maxLength(20)]],
      contactNo:['',[Validators.required,Validators.maxLength(10)]],
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientPage');
    
    
  }
  login(){
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(User =>{
      this.user= User.uid;
      console.log("userrrr",this.user)
      this.navCtrl.push("ViewPage");

    })
  }
  submit(){
    this.display = 1;
  }
  signupClient(){
     firebase.auth().createUserWithEmailAndPassword(this.email,this.password).then(user => {
     //this.display = 1;
     
          
          
          firebase.database().ref('/user?/'+this.useId).set(
            {
              role: "Tenant"
            }
     ).key;
    });
   }
   loginWithGoogle(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(User =>{
      //this.navCtrl.push("WelcomePage");
      this.useId=  User.user.uid;
      console.log("userrrr",this.useId)
      
     firebase.database().ref('/user?/'+this.useId).set(
       {
         userID:this.useId,
         role: "Tenant"
       }
     ).key;
      this.navCtrl.setRoot("WelcomePage",{userId:this.useId,openMenu:0});
    });
  }

}
