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
import {MatTableModule} from '@angular/material/table';
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
    SearchDialogComponent
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
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
