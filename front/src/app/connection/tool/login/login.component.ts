import { Component, OnInit } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {LoginService} from './login.service';
import {Router} from '@angular/router';

import { User } from '../../../model/user';
import { ConnectionInfo } from '../../../model/connectionInfo';
import { FormControl, FormGroup, FormBuilder, Validator, Validators,ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
      hide = true;
  showError = false;
  loginForm: FormGroup;
  compteur = 0;
  constructor(private _formBuilder: FormBuilder, private loginService : LoginService, private router: Router) { }

  onSubmit() {
       this.loginService.logIn({
                    identifiant:  this.loginForm.get('identifiantLogin').value,
                    mdp:  this.loginForm.get('mdp').value,
                    } as ConnectionInfo)
                .subscribe(user => {
                  this.loginService.getErrorMsg().subscribe(bol => this.showError = bol);
                  if(user !== undefined && user !== null){
                    switch (user.details.role){
                      case 0: {
                        this.router.navigate(['/user']);
                        break;
                      }
                      case 1: {
                        this.router.navigate(['/moniteur']);
                        break;
                      }
                      case 2: {
                        this.router.navigate(['/admin']);
                        break;
                      }
                      case 3: {
                        this.router.navigate(['/admin']);
                        break;
                      }
                    }
                  } else {
                    this.compteur ++ ;
                    if (this.compteur > 2) {
                      this.router.navigate(['/connection/recuperationMotDePasse']);
                    }
                  }
                });

     }

  ngOnInit(): void {
    this.loginService.getErrorMsg().subscribe(bol => this.showError = bol);

   //Form control !

      this.loginForm = this._formBuilder.group({
        identifiantLogin : ['', [Validators.required ]],
        mdp : ['', Validators.required]
      });

  }

}
