import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController,LoadingController } from 'ionic-angular';
import {DataBaseUtil} from "../../providers/databaseutil";


/**
 * Generated class for the Register page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class Register {

  //array to hold php result
    loader: any;

  constructor(public navCtrl: NavController, public db:DataBaseUtil,private alertCtrl:AlertController,private loadCtrl:LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Register');
  }

  public RegisterUser(name:string,pass:string,temp_pass:string,mail:string,phone:string)
  {
    if(name == "" || pass == "" || temp_pass == "" || mail == "" || phone == "")
    {
      console.log("null-err");
      this.showAlert("Null Fields Seen","Enter all fields");
    }
    else
    {
      if(pass == temp_pass)
      {
        this.showLoading("Registering");
        this.db.InsertMember(name,pass,mail,phone).subscribe(
          db => {
            console.log(db);
            if(db == "inserted")
            {
              this.navCtrl.popToRoot();
            }
            this.loader.dismiss();
          },
          err => {
            console.log(err);
          }
        );
      }
      else this.showAlert("Password Mismatch","Enter Similar passwords");
    }
  }

  showAlert(title:string,msg:string)
  {
      let alert = this.alertCtrl.create({
        title:title,message:msg,
        buttons:['Dismiss']
      });
      alert.present();
  }

  showLoading(msg:string)
  {
    this.loader = this.loadCtrl.create({
      content:msg
    });
    this.loader.present();
  }
}
