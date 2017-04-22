import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController,NavParams } from 'ionic-angular';
import {LocationTracker} from '../../providers/location-tracker';
import {DataBaseUtil} from '../../providers/databaseutil';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;
/**
 * Generated class for the Map page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class Map {

  @ViewChild('map') mapElement: ElementRef;
  map:any;
  mark:Array<any>;
  phone:any;
  constructor(public navCtrl: NavController,private locationTracker:LocationTracker,private db:DataBaseUtil, public navParams: NavParams,public geolocation:Geolocation) {
    this.phone = this.navParams.get('phone');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Map');
    this.locationTracker.startTracking();
    this.loadMap();
  }

  loadMap(){

    let latLng = new google.maps.LatLng(this.locationTracker.lat,this.locationTracker.lng);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  }

  public addfriendMarkers()
  {
    this.db.getmarker(this.phone).subscribe(db=>{
      this.mark = db;
      let i = 0;
        let s = this.mark[i].split(";");
        console.log(s);
        this.addMarker(s[0],s[1],s[2]);

    });
  }

  addMarker(lat:string,lng:string,phone:string){
  let latitude = +lat||0;
  let longitude = +lng||0;
  var latlng = new google.maps.LatLng(latitude,longitude);
  //console.log(latitude);
  var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
  var marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: latlng,
    icon:image
  });
/*
  let content = "<h4>"+phone+"</h4>";

  this.addInfoWindow(marker, content);

}

addInfoWindow(marker, content){

  let infoWindow = new google.maps.InfoWindow({
    content: content
  });

  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
  });

}
*/
}}
