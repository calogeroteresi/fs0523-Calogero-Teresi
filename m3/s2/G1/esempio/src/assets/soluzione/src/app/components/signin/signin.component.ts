import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
    username!:string
    password!: string
  constructor() { }


  ngOnInit(): void {
  }
  submitLogin(target: NgForm) {
    alert("Submitted")
  }
}
