import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}
  title = 'benison-assignment';
  currentRoute: string;

  ngOnInit() {
    // this.currentRoute = this.route.snapshot.url[0];
    this.router.events.subscribe((s) => {
      if (s instanceof NavigationEnd) {
        this.currentRoute = s.urlAfterRedirects;
        console.log(this.currentRoute);
      }
    });
  }

  logout() {
    localStorage.removeItem('login');
    this.router.navigate(['login']);
  }
}
