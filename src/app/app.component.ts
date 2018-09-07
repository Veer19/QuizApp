import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, Event, NavigationEnd} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showBackArrow: boolean;
  hideToolbar: boolean;
  constructor(private router: Router){
    this.router.events.subscribe((event:Event) => {

      if (event instanceof NavigationEnd) {
        //Sending these variables to the toolbar component
        this.showBackArrow = (router.url!="/dashboard");
        this.hideToolbar = (router.url=="/")
      }

    })
  }
}
