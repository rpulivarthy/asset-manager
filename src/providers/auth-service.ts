import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from '../shared/dataModel';
import { DataService } from '../providers/data-service';



@Injectable()
export class AuthService {
  currentUser: User;
  isUserAuthenticated: boolean;
  constructor(private dataService: DataService) {
    this.isUserAuthenticated = false;
  }
  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        this.authenticateUserCredetials(credentials.email, credentials.password);
        observer.next(this.isUserAuthenticated);
        observer.complete();
      });
    }
  }
  private authenticateUserCredetials(username: string, pwd: string) {
    this.dataService.authenticateUser(username, pwd).subscribe((user: User) => {
      this.currentUser = user;
      this.isUserAuthenticated = true;
    })
  }
  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  // public getUserInfo(email:string) : User {
  //   this.allusers.forEach(element => {
  //     if(element.email==email){
  //       this.currentUser=element;
  //     }
  //   });
  //   return this.currentUser;
  // }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      this.isUserAuthenticated = false;
      observer.next(true);
      observer.complete();
    });
  }
}