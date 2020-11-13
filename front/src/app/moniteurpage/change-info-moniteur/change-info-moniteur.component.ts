import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { FormControl, FormGroup, FormBuilder, Validator, Validators,ReactiveFormsModule } from "@angular/forms";
import {Router} from "@angular/router"
import { MoniteurService } from '../moniteur.service';

@Component({
  selector: 'app-change-info-moniteur',
  templateUrl: './change-info-moniteur.component.html',
  styleUrls: ['./change-info-moniteur.component.css']
})
export class ChangeInfoMoniteurComponent implements OnInit {

  changeInfoUserForm: FormGroup;
  constructor(private _formBuilder: FormBuilder, private moniteurService : MoniteurService, private router: Router) { }

  userInfo: User = {email: '', id_user: 0, licence: '', mdp: '', role: 0, telephone: '', nom: '', prenom: ''};

  ngOnInit(): void {
    this.changeInfoUserForm = this._formBuilder.group({
      tel : ['', Validators.required],
      licence : [''],
      emailform : ['', [Validators.required, Validators.email]]
    });
    // Get data from service
    this.moniteurService.getUserById(25) // changer l'id ICI
              .subscribe((data: User) => this.initForm(data));
  }

  initForm(data){
    this.userInfo = data;
    //Form control !

    this.changeInfoUserForm = this._formBuilder.group({
      tel : [this.userInfo.telephone, Validators.required],
      licence : [this.userInfo.licence],
      emailform : [this.userInfo.email, [Validators.required, Validators.email]],
    });
  }
  onSubmit() {

     this.moniteurService.changeInfo({ id: 25, // changer l'id ICI
       nom:  '',
       prenom:  '',
       email:  this.changeInfoUserForm.get('emailform').value,
       telephone:  this.changeInfoUserForm.get('tel').value,
       mdp:  '',
       licence:  this.changeInfoUserForm.get('licence').value,
       role:  2})
       .subscribe(user => {
         console.log('MAJ de L\'admin fait dans la BDD');
         this.router.navigate(['/moniteur']);
       });


   }

   retourPageUser() {

    this.router.navigate(['/moniteur']);

   }



}
