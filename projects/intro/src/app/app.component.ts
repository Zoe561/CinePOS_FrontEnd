import { Component } from '@angular/core';
import * as AOS from 'aos';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'intro';
  isChange = false;
  frontURL = "https://www.cine-pos.com/staff/login";
  backendURL = "https://www.cine-pos.com/manager/login";

  ngOnInit(): void {
    AOS.init();
  }
}
