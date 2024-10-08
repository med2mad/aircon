import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  username:string = localStorage.getItem('username');
  photo:string = (localStorage.getItem('photo')?localStorage.getItem('photo'):'profile.jpg');

  constructor(location: Location,  private element: ElementRef, private router: Router) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }
  getTitle(){
    this.username = localStorage.getItem('username');
    this.photo = (localStorage.getItem('photo')?localStorage.getItem('photo'):'profile.jpg');

    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.setItem('photo', 'profile.jpg');
    this.username = '';
    this.photo = 'profile.jpg';
    window.location.href = 'http://localhost:4200/#/dashboard';
  }
}
