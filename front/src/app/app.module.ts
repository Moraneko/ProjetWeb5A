import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConnectionComponent } from './connection/connection.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ToolComponent } from './connection/tool/tool.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule, MatTable} from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { LoginComponent } from './connection/tool/login/login.component';
import { SignupComponent } from './connection/tool/signup/signup.component';
import {MatMenuModule} from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { RecupMdpComponent } from './connection/tool/recupMdp/recup-mdp.component';
import { UserpageComponent } from './userpage/userpage.component';
import { UsertoolbarComponent } from './userpage/usertoolbar/usertoolbar.component';
import { CoursComponent } from './userpage/cours/cours.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { UsercalendarComponent } from './userpage/usercalendar/usercalendar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SearchCoursComponent } from './userpage/search-cours/search-cours.component';
import {MatDialogModule} from '@angular/material/dialog';
import { SearchDialogComponent } from './userpage/search-cours/search-dialog/search-dialog.component';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CoursInfoUserComponent } from './userpage/usercalendar/cours-info-user/cours-info-user.component';
import { ChangeInfoUserComponent } from './userpage/change-info-user/change-info-user.component';
import { MoniteurpageComponent } from './moniteurpage/moniteurpage.component';
import { MoniteurtoolbarComponent } from './moniteurpage/moniteurtoolbar/moniteurtoolbar.component';
import { CoursmoniteurComponent } from './moniteurpage/coursmoniteur/coursmoniteur.component';
import { MoniteurcalendarComponent } from './moniteurpage/moniteurcalendar/moniteurcalendar.component';
import { MoniteurCoursModalComponent } from './moniteurpage/moniteur-cours-modal/moniteur-cours-modal.component';
import { MoniteurAddCoursModalComponent } from './moniteurpage/moniteur-add-cours-modal/moniteur-add-cours-modal.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ChangeInfoMoniteurComponent } from './moniteurpage/change-info-moniteur/change-info-moniteur.component';
import { ChevauxComponent } from './chevaux/chevaux.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { AdmintoolbarComponent } from './adminpage/admintoolbar/admintoolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnectionComponent,
    ToolComponent,
    LoginComponent,
    SignupComponent,
    RecupMdpComponent,
    UserpageComponent,
    UsertoolbarComponent,
    CoursComponent,
    UsercalendarComponent,
    SearchCoursComponent,
    SearchDialogComponent,
    CoursInfoUserComponent,
    ChangeInfoUserComponent,
    MoniteurpageComponent,
    MoniteurtoolbarComponent,
    CoursmoniteurComponent,
    MoniteurcalendarComponent,
    MoniteurCoursModalComponent,
    MoniteurAddCoursModalComponent,
    ChangeInfoMoniteurComponent,
    ChevauxComponent,
    AdminpageComponent,
    AdmintoolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDividerModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    MatMenuModule,
    MatTableModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    FlexLayoutModule,
    MatDialogModule,
    MatSelectModule,
    MatPaginatorModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
