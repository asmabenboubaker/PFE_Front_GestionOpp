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
      {
        path: 'Demande',
        loadChildren: () => import('./pages/Oportunite/demande/demande.module').then(m => m.DemandeModule),
      },
      {
        path: 'client',
        loadChildren: () => import('./pages/Oportunite/client/client.module').then(m => m.ClientModule),
      },
      {
        path: 'Facture',
        loadChildren: () => import('./pages/Oportunite/facture/facture.module').then(m => m.FactureModule),
      },
      {
        path: 'opportunite',
        loadChildren: () => import('./pages/Oportunite/opportunite/opportunite.module').then(m => m.OpportuniteModule),
      },
      {
        path: 'offre',
        loadChildren: () => import('./pages/Oportunite/offre/offre.module').then(m => m.OffreModule),
      },
      {
        path: 'bondecommande',
        loadChildren: () => import('./pages/Oportunite/bon-de-commande/bon-de-commande.module').then(m => m.BonDeCommandeModule),
      },
      {
        path: 'projet',
        loadChildren: () => import('./pages/Oportunite/projet/projet.module').then(m => m.ProjetModule),
      },

      {
        path: 'pv',
        loadChildren: () => import('./pages/Oportunite/pv/pv.module').then(m => m.PvModule),
      }
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
