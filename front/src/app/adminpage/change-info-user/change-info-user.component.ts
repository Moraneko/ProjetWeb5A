import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { FormControl, FormGroup, FormBuilder, Validator, Validators,ReactiveFormsModule } from "@angular/forms";
import {Router, ActivatedRoute } from "@angular/router"
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-change-info-user',
  templateUrl: './change-info-user.component.html',
  styleUrls: ['./change-info-user.component.css']
})
export class AdminChangeInfoUserComponent implements OnInit {

  changeInfoUserForm: FormGroup;
  constructor(private _formBuilder: FormBuilder, private adminService : AdminService, private router: Router, private actRoute: ActivatedRoute) {
    this.userId = this.actRoute.snapshot.params.id;
  }

  userInfo : User;
  userId: number;


  ngOnInit(): void {

  // Get data from service
  this.adminService.getUserById(this.userId) // changer l'id ICI
            .subscribe((data: User) => this.userInfo = data);


  //Form control !

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

     this.adminService.changeUserInfo({ id_user: this.userInfo.id_user,
                                 nom:  this.changeInfoUserForm.get('nom').value,
                                 prenom:  this.changeInfoUserForm.get('prenom').value,
                                 email:  this.changeInfoUserForm.get('emailform').value,
                                 telephone:  this.changeInfoUserForm.get('tel').value,
                                 mdp:  this.changeInfoUserForm.get('mdp').value,
                                 licence:  this.changeInfoUserForm.get('licence').value,
                                 role: this.userInfo.role  } as User)
         .subscribe(user => {
           console.log('MAJ de L\'User fait dans la BDD');
           this.router.navigate(['/admin']);
         });


   }

   retourPageUser() {

    this.router.navigate(['/admin']);

   }
}
