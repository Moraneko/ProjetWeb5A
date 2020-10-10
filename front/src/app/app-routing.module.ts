import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnectionComponent } from './connection/connection.component';
import { UserpageComponent } from './userpage/userpage.component';
import { ToolComponent } from './connection/tool/tool.component';
import { RecupMdpComponent } from './connection/tool/recupMdp/recup-mdp.component';

const routes: Routes = [{ path: '', redirectTo: '/user', pathMatch: 'full' },
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
                               { path: 'user', component: UserpageComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
