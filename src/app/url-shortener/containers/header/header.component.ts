import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showMenu = false;

  constructor() { }

  ngOnInit(): void {
    // setInterval(() =>  console.log(this.showMenu), 1000);
  }

  navigateToSection(section: string): void {
    window.location.hash = '';
    window.location.hash = section;
  }
}
