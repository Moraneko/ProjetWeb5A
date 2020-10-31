import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnectionComponent } from './connection/connection.component';
import { UserpageComponent } from './userpage/userpage.component';
import { ToolComponent } from './connection/tool/tool.component';
import { RecupMdpComponent } from './connection/tool/recupMdp/recup-mdp.component';
import { ChangeInfoUserComponent } from './userpage/change-info-user/change-info-user.component';
import { MoniteurpageComponent } from './moniteurpage/moniteurpage.component';
import { ChangeInfoMoniteurComponent } from './moniteurpage/change-info-moniteur/change-info-moniteur.component';
import { ChevauxComponent } from './chevaux/chevaux.component';

const routes: Routes = [{ path: '', redirectTo: '/gestionChevaux', pathMatch: 'full' },
                          { path: 'connection', component: ConnectionComponent,
                           children: [
                                 {
                                   path: '', // child route path
                                   component: ToolComponent, // child route component that the router renders
                                 },
                                 {
                                   path: 'recuperationMotDePasse',
                                   component: RecupMdpComponent, // another child route component that the router renders
                                 },
                               ],},
                               { path: 'user', component: UserpageComponent,},
                               { path: 'userInfo', component: ChangeInfoUserComponent},
                               { path: 'moniteur', component: MoniteurpageComponent},
                               { path: 'changeMoniteurInfo', component: ChangeInfoMoniteurComponent},
                               { path : 'gestionChevaux', component: ChevauxComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
