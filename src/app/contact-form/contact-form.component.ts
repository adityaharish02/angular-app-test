import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  log(firstName){
    console.log(firstName);
  }

  submit(f) {
    console.log(f);
  }

  contactMethods = [
    { id: 1, name: 'Email'},
    { id: 2, name: 'Phone'},
    { id: 3, name: 'SMS'}
  ]
}
