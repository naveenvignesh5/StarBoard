import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import {Register} from '../register/register';
import {Login} from '../login/login';
import {DataBaseUtil} from '../../providers/databaseutil';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public alertCtrl:AlertController,public db:DataBaseUtil) {

  }

  //method to open register
  openReg()
  {
    this.navCtrl.push(Register);
  }

  //open login method
  openLogin()
  {
    this.navCtrl.push(Login);
  }

  showPrompt() {
   let prompt = this.alertCtrl.create({
     title: 'Password Recovery',
     message: "Enter your mail",
     inputs: [
       {
         name: 'email',
         placeholder: 'Your E-Mail'
       },
     ],
     buttons: [
       {
         text: 'Cancel',
         handler: data => {
           prompt.dismiss();

         }
       },
       {
         text: 'Send',
         handler: data => {
           console.log(data);
           this.db.GetPassword(data).subscribe(
             db=>{
                console.log(db);
             }
           );
         }
       }
     ]
   });
   prompt.present();
 }
}
