import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from "@angular/forms"
import { passwordMatch, passwordValidator } from 'src/app/utils/password.validator';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnChanges {
  user: FormGroup = new FormGroup({
    nome: new FormControl("", [Validators.required]),
    cognome: new FormControl("", [Validators.required]),
    password: new FormControl("", [passwordMatch()]),
    passwordConf: new FormControl("", [passwordMatch()]),
    propic: new FormControl("", [Validators.required]),
    pronouns: new FormControl("", [Validators.required]),
    username: new FormControl("", [Validators.required]),
    bio: new FormControl("", [Validators.minLength(100)]),
  }, {
    validators: passwordValidator
  })
  constructor() {
    this.user.valueChanges.subscribe(res => console.log(res, this.user.controls['propic'].value))
  }

  ngOnChanges(): void {
    console.log(this.user.errors, this.user.value);

  }

}
