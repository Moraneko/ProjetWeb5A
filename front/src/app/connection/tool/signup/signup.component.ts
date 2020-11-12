import { Component, OnInit } from '@angular/core';
import {SignupService} from './signup.service';

import { User } from '../../../model/user';

import { FormControl, FormGroup, FormBuilder, Validator, Validators, ReactiveFormsModule } from "@angular/forms";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

   email = new FormControl('', [Validators.required, Validators.email]);
   password = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,20}$')]);
   hide = true;

   showErrorEmailExiste = false;

    getErrorMessage() {
      if (this.email.hasError('required')) {
        return 'Entrez une adresse';
      }

      return this.email.hasError('email') ? 'Adresse invalide' : '';
    }

  getErrorMessagePassword() {
    if (this.email.hasError('required')) {
      return 'Le mot de passe doit contenir entre 4 et 20 caractères avec au moins 1 majuscule, 1 minuscule et 1 nombre';
    }

    return this.email.hasError('email') ? 'Mot de passe invalide' : '';
  }

  inscriptionForm: FormGroup;
  constructor(private _formBuilder: FormBuilder, private signupService : SignupService) { }

  onSubmit() {
     this.signupService.signUp({ id_user: -1,
                                 nom:  this.inscriptionForm.get('nom').value,
                                 prenom:  this.inscriptionForm.get('prenom').value,
                                 email:  this.inscriptionForm.get('emailform').value,
                                 telephone:  this.inscriptionForm.get('tel').value,
                                 mdp:  this.inscriptionForm.get('mdp').value,
                                 licence:  this.inscriptionForm.get('licence').value,
                                 role:  0} as User)
         .subscribe(user => {
           this.signupService.getErrorMsg().subscribe(bol => this.showErrorEmailExiste = bol);
           alert('Votre compte est bien créé');
           window.location.reload();
         });

   }


  ngOnInit(): void {

    this.signupService.getErrorMsg().subscribe(bol => this.showErrorEmailExiste = bol);
  //Form control !

    this.inscriptionForm = this._formBuilder.group({
      nom : ['', Validators.required],
      prenom : ['', Validators.required],
      tel : ['', Validators.required],
      licence : [''],
      emailform : ['', [Validators.required, Validators.email]],
      mdp : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,20}$')]]
    });


  }

}
