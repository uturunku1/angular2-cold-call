import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { UserComponent } from './user/user.component';
import { CallDetailsComponent } from './call-details/call-details.component';



const appRoutes: Routes = [
  {
    path:'',
    component: IndexComponent
  },
  {
    path:'user',
    component: UserComponent
  },
  {
    path: 'calls/:id',
    component: CallDetailsComponent
  }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
