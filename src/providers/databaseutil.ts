import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';


@Injectable()
export class DataBaseUtil
{
  constructor(public http:Http)
  {

  }
  acceptRequest(from,to)
  {
    var url = "http://starboard.uphero.com/friendAccept.php?from="+from+"&to="+to;
    var response = this.http.get(url).map(res=>res.json());
    return response;
  }
  sendRequest(from,to)
  {
      var url = "http://starboard.uphero.com/friendRequest.php?from="+from+"&to="+to;
      var response = this.http.get(url).map(res => res.json());
      return response;
  }

  GetPassword(mail)
  {
    var url = "http://starboard.uphero.com/forgotpassword.php?mail="+mail;
    var response = this.http.get(url).map(res =>res.json());
    return response;
  }

  //method to insert data into php - mongo package
  InsertMember(name,pass,email,phone)
  {
      var url = 'http://starboard.uphero.com/reg.php?name='+name+'&pass='+pass+'&mail='+email+'&phone='+phone;
      var response = this.http.get(url).map(res => res.json());
      return response;
  }

  LoginMember(phone,pass)
  {
    var url = "http://starboard.uphero.com/login.php?phone="+phone+"&pass="+pass;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  updateLocation(phone,msg,lat,lng)
  {
    var url = "http://starboard.uphero.com/map.php?phone="+phone+"&msg="+msg+"&lat="+lat+"&lng="+lng;
    var response = this.http.get(url).map(res=>res.json());
    return response;
  }

  getmarker(phone)
  {
    var url = "http://starboard.uphero.com/markers.php?phone="+phone;
    var response = this.http.get(url).map(res=>res.json());
    return response;
  }
}
