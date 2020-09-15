import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  constructor(private breakpoint: BreakpointObserver, private router: Router) { }

  ngOnInit(): void {
  }
  
  isHandset$: Observable<boolean> = this.breakpoint.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay()
  );

  logout() {
    localStorage.removeItem('auth_token');
    this.router.navigate(['login']);
  }
}
