import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { UserComponent } from './user/user.component';
import { CallDetailsComponent } from './call-details/call-details.component';
import { EditCallComponent } from './edit-call/edit-call.component';
import { LoginPageComponent } from './login-page/login-page.component';


const appRoutes: Routes = [
  {
    path:'index/:id',
    component: IndexComponent
  },
  {
    path:'user/:id',
    component: UserComponent
  },
  {
    path: 'calls/:id',
    component: CallDetailsComponent
  },
   { path: 'login',
   component: LoginPageComponent }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
