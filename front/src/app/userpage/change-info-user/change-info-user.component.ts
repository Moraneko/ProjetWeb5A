import { Component, OnInit } from '@angular/core';
import { ChangeUserService } from './change-user.service';
import { User } from '../../model/user';
import { FormControl, FormGroup, FormBuilder, Validator, Validators, ReactiveFormsModule } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-change-info-user',
  templateUrl: './change-info-user.component.html',
  styleUrls: ['./change-info-user.component.css']
})
export class ChangeInfoUserComponent implements OnInit {

  changeInfoUserForm: FormGroup;
  constructor(private _formBuilder: FormBuilder, private changeUserService: ChangeUserService, private router: Router) { }

  userInfo: User = {email: '', id_user: 0, licence: '', mdp: '', role: 0, telephone: '', nom: '', prenom: ''};

  ngOnInit(): void {
    this.changeInfoUserForm = this._formBuilder.group({
      tel : ['', Validators.required],
      licence : [''],
      emailform : ['', [Validators.required, Validators.email]]
    });
    this.changeUserService.getUserById(25) // changer l'id ICI
              .subscribe((data: User) => this.initForm(data));
  }
  initForm(data){
    this.userInfo = data;
    // Form control !

    this.changeInfoUserForm = this._formBuilder.group({
      nom : [this.userInfo.nom, Validators.required],
      prenom : [this.userInfo.prenom, Validators.required],
      tel : [this.userInfo.telephone, Validators.required],
      licence : [this.userInfo.licence],
      emailform : [this.userInfo.email, [Validators.required, Validators.email]],
      mdp : [this.userInfo.mdp, Validators.required]
    });
  }
  onSubmit() {

     this.changeUserService.changeInfo({ id: 25, // changer l'id ICI
       nom:  '',
       prenom:  '',
       email:  this.changeInfoUserForm.get('emailform').value,
       telephone:  this.changeInfoUserForm.get('tel').value,
       mdp:  '',
       licence:  this.changeInfoUserForm.get('licence').value,
       role:  2})
       .subscribe(user => {
         console.log('MAJ de L\'admin fait dans la BDD');
         this.router.navigate(['/user']);
       });



  }

   retourPageUser() {

    this.router.navigate(['/user']);

   }



}
