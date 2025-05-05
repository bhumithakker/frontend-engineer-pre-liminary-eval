import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { loadRemoteModule } from './core/utils/federation-utils';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'mfe1',
    loadChildren: () => 
      loadRemoteModule({
        remoteName: 'mfe1App',
        exposedModule: './MFE1Module'
      })
      .then(m => m.MFE1Module)
  },
  {
    path: 'mfe2',
    loadChildren: () => 
      loadRemoteModule({
        remoteName: 'mfe2App',
        exposedModule: './MFE2Module'
      })
      .then(m => m.MFE2Module)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];