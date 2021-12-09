import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfound',
  template: `
    <p >
      Cette page n'existe pas !!!!
    </p>
  `,
  styles: [

  ]
})
export class NotfoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
