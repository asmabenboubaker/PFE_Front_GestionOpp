import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {PagesComponent} from './pages/pages.component';
import {NotFoundComponent} from './pages/Global/errors/not-found/not-found.component';
import {QuicklinkModule, QuicklinkStrategy} from 'ngx-quicklink';


export const routes: Routes = [
  {
    path: '', 
    component: PagesComponent, 
    children:[
      {path: 'Accueil', loadChildren: () => import('./pages/Global/accueil/accueil.module').then(m => m.AccueilModule)},
      {path: 'Example', loadChildren: () => import('./pages/Global/example/example.module').then(m => m.ExampleModule)},

      {
        path: 'Profile',
        loadChildren: () => import('./pages/Global/profile/profile.module').then(m => m.ProfileModule),
      },
    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    QuicklinkModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,

      //preloadingStrategy: QuicklinkStrategy ,// <- comment this line for activate lazy load
      relativeLinkResolution: 'legacy',
      useHash: true
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
