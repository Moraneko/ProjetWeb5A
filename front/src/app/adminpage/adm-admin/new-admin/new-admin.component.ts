import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AdminService } from '../../admin.service';
import { FormControl, FormGroup, FormBuilder, Validator, Validators,ReactiveFormsModule } from "@angular/forms";
import { User } from '../../../model/user';
@Component({
  selector: 'app-new-admin',
  templateUrl: './new-admin.component.html',
  styleUrls: ['./new-admin.component.css']
})
export class NewAdminComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Entrez une adresse';
    }

    return this.email.hasError('email') ? 'Adresse invalide' : '';
  }

  inscriptionForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<NewAdminComponent>,@Inject(MAT_DIALOG_DATA) public data: any, private adminService: AdminService, private _formBuilder: FormBuilder) { }

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

  onSubmit() {
    this.adminService.newAdmin({ id_user: -1,
        nom:  this.inscriptionForm.get('nom').value,
        prenom:  this.inscriptionForm.get('prenom').value,
        email:  this.inscriptionForm.get('emailform').value,
        telephone:  this.inscriptionForm.get('tel').value,
        mdp:  this.inscriptionForm.get('mdp').value,
        licence:  this.inscriptionForm.get('licence').value,
        role:  2} as User)
    .subscribe(user => {
        console.log('AJOUT DE L\'ADMIN DANS LA BDD');
  });
  this.dialogRef.close();;

}


}
