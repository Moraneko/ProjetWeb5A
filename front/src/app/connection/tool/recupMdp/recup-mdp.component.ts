import { Component, OnInit } from '@angular/core';
import { RecupMdp } from '../../../model/recupMdp';

import {RecupMdpService} from './recup-mdp.service';

import { FormControl, FormGroup, FormBuilder, Validator, Validators,ReactiveFormsModule } from "@angular/forms";
@Component({
  selector: 'app-recup-mdp',
  templateUrl: './recup-mdp.component.html',
  styleUrls: ['./recup-mdp.component.css']
})
export class RecupMdpComponent implements OnInit {

  hide = true;
  recupForm: FormGroup;
  constructor(private _formBuilder: FormBuilder, private recupMdpService : RecupMdpService) { }

  onSubmit() {
       this.recupMdpService.recup({
            identifiant:  this.recupForm.get('identifiantRecup').value
            } as RecupMdp)
        .subscribe(user => {
          console.log('requete de récuperation Ok');
        });

     }
  ngOnInit(): void {
    //Form control !

    this.recupForm = this._formBuilder.group({
      identifiantRecup : ['', [Validators.required ]]
    });

  }

}
