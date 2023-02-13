import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  sideBarOpen:boolean=true ;
  constructor() { }

  ngOnInit(): void {
  }
  toggleSidebar(){
    this.sideBarOpen= !this.sideBarOpen
  }
}
