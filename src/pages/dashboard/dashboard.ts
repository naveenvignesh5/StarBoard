import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { LocationTracker } from '../../providers/location-tracker';
import {DataBaseUtil} from '../../providers/databaseutil';
import {Map} from '../map/map';

/**
 * Generated class for the Dashboard page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class Dashboard {

  param:string;
  isToggle:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl:AlertController,private locationTracker:LocationTracker,private db:DataBaseUtil) {
    this.param = this.navParams.get('phone');
    this.locationTracker.startTracking();
  }

  public notifyBroadcast()
  {
    if(!this.isToggle) {this.isToggle = true;
    let lat = this.locationTracker.lat;
    let lng = this.locationTracker.lng;
    this.db.updateLocation(this.param,"update",lat,lng).subscribe(
      db=>{
        console.log(db);
      },
      err=>{
        console.log(err);
      }
    );
  }else
  {
    this.db.updateLocation(this.param,"no",null,null).subscribe(
      db=>{
        console.log(db);
      },
      err=>{
        console.log(err);
      }
    );
  }
  }

  showAlert(tit:string,msg:string)
  {
    let alert = this.alertCtrl.create({
        title:tit,
        message:msg,
        buttons:['OK']
    });

    alert.present();
  }

  gotoMap()
  {
    this.navCtrl.push(Map,{phone:this.param});
    this.locationTracker.stopTracking();
  }

  public acceptFriendRequest(fromWhom:string)
  {
    this.db.acceptRequest(fromWhom,this.param).subscribe(
      db=>{
        if(db=="updated")
           this.showAlert("Friend Request Accepted","Your are now friend with "+fromWhom);
      }
    );
  }
  public sendFriendRequest(toWhom:string)
  {
    this.db.sendRequest(this.param,toWhom).subscribe(
      db=>{
        if(db == "inserted")
        {

            this.showAlert("Request Sent","Wait for response");
        }
      },err=>
      {
        console.log(err);
      }
    );
  }
}
