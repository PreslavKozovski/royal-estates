import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-estates',
  templateUrl: './my-estates.page.html',
  styleUrls: ['./my-estates.page.scss'],
})
export class MyEstatesPage implements OnInit {
  public savedEstates: any = [];
  constructor() { }

  ngOnInit() {
  }

}
