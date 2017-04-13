import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { masterFirebaseConfig } from './api-keys';
import { AngularFireModule } from 'angularfire2';
import { routing } from './app.routing';
import { UserComponent } from './user/user.component';
import { CallFilterPipe } from './call-filter.pipe';
import { CallDetailsComponent } from './call-details/call-details.component';
import { EditCallComponent } from './edit-call/edit-call.component';
import { DatePipe } from './date.pipe';
import {AF} from "./providers/af";
import { LoginPageComponent } from './login-page/login-page.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EventPipe } from './event.pipe';
import { AddCallComponent } from './add-call/add-call.component';

export const firebaseConfig = {
  apiKey: masterFirebaseConfig.apiKey,
  authDomain: masterFirebaseConfig.authDomain,
  databaseURL: masterFirebaseConfig.databaseURL,
  storageBucket: masterFirebaseConfig.storageBucket,
  messagingSenderId: masterFirebaseConfig.messagingSenderId
};

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    UserComponent,
    CallFilterPipe,
    EditCallComponent,
    DatePipe,
    CallDetailsComponent,
    EditCallComponent,
    LoginPageComponent,
    CalendarComponent,
    EventPipe,
    AddCallComponent,

    //providers: [AFLoginPageComponent],
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig),
    //RouterModule.forRoot(routes)

  ],
  providers: [AF],
  bootstrap: [AppComponent]
})
export class AppModule { }
