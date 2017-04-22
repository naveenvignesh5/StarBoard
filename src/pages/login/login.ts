import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController,LoadingController } from 'ionic-angular';
import {DataBaseUtil} from "../../providers/databaseutil";
import {Dashboard} from "../dashboard/dashboard";
/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  loader:any;

  constructor(public navCtrl: NavController,private alertCtrl:AlertController,private loadCtrl:LoadingController,public db:DataBaseUtil) {
  }

  public loginUser(phone:string,password:string)
  {
    if(phone == "" || password == "")
    {
      this.showAlert("Null Fields Seen","Enter all fields");
    }
    else
    {
      this.showLoading("Logging in...");
      this.db.LoginMember(phone,password).subscribe(
        db => {
          if(db == "valid")
          {
            this.loader.dismiss();
            this.navCtrl.push(Dashboard,{
              phone:phone
            });
            this.navCtrl.pop();
          }
        },
        err=>{
          console.log(err);
        }
      );
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
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
