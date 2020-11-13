import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { FormControl, FormGroup, FormBuilder, Validator, Validators, ReactiveFormsModule } from '@angular/forms';
import {Router} from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-change-admin-info',
  templateUrl: './change-admin-info.component.html',
  styleUrls: ['./change-admin-info.component.css']
})
export class ChangeAdminInfoComponent implements OnInit {

  changeInfoUserForm: FormGroup;
  constructor(private _formBuilder: FormBuilder, private adminService: AdminService, private router: Router) { }

  userInfo: User = {email: '', id_user: 0, licence: '', mdp: '', role: 0, telephone: '', nom: '', prenom: ''};

  ngOnInit(): void {
    let userData = JSON.parse(localStorage.getItem('user'));
    let userID = userData.details.id;

    this.changeInfoUserForm = this._formBuilder.group({
      tel : ['', Validators.required],
      licence : [''],
      emailform : ['', [Validators.required, Validators.email]]
    });
    this.adminService.getUserById(userID) // changer l'id ICI
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
    let userData = JSON.parse(localStorage.getItem('user'));
    let userID = userData.details.id;
    this.adminService.changeInfo({ id: userID, // changer l'id ICI
      nom:  '',
      prenom:  '',
      email:  this.changeInfoUserForm.get('emailform').value,
      telephone:  this.changeInfoUserForm.get('tel').value,
      mdp:  '',
      licence:  this.changeInfoUserForm.get('licence').value,
      role:  2})
      .subscribe(user => {
        console.log('MAJ de L\'admin fait dans la BDD');
        this.router.navigate(['/admin']);
      });


  }

  retourPageUser() {

    this.router.navigate(['/admin']);

  }

}
