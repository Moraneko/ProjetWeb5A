import { Component, OnInit } from '@angular/core';
import {SignupService} from './signup.service';

import { User } from '../../../user';

import { FormControl, FormGroup, FormBuilder, Validator, Validators, ReactiveFormsModule } from "@angular/forms";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

   email = new FormControl('', [Validators.required, Validators.email]);
   hide = true;



    getErrorMessage() {
      if (this.email.hasError('required')) {
        return 'Entrez une adresse';
      }

      return this.email.hasError('email') ? 'Adresse invalide' : '';
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
           console.log('AJOUT DE USER FAIT DANS LA BDD');
         });

   }


  ngOnInit(): void {

  //Form control !

    this.inscriptionForm = this._formBuilder.group({
      nom : ['', Validators.required],
      prenom : ['', Validators.required],
      tel : ['', Validators.required],
      licence : [''],
      emailform : ['', [Validators.required, Validators.email]],
      mdp : ['', Validators.required]
    });


  }

}
