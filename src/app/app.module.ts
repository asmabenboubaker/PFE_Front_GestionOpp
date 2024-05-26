import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app.routing';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AppSettings} from './app.settings';
import {AppComponent} from './app.component';
import {PagesComponent} from './pages/pages.component';
import {HeaderComponent} from './theme/components/header/header.component';
import {FooterComponent} from './theme/components/footer/footer.component';
import {SidebarComponent} from './theme/components/sidebar/sidebar.component';
import {VerticalMenuComponent} from './theme/components/menu/vertical-menu/vertical-menu.component';
import {HorizontalMenuComponent} from './theme/components/menu/horizontal-menu/horizontal-menu.component';
import {BreadcrumbComponent} from './theme/components/breadcrumb/breadcrumb.component';
import {BackTopComponent} from './theme/components/back-top/back-top.component';
import {UserMenuComponent} from './theme/components/user-menu/user-menu.component';
import {NotFoundComponent} from './pages/Global/errors/not-found/not-found.component';
import {FlagsMenuComponent} from './theme/components/flags-menu/flags-menu.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EnvServiceProvider} from '../env.service.provider';
import {CookieService} from 'ngx-cookie-service';
import {LoggerModule} from 'ngx-logger';
import {environment} from '../environments/environment';
import {ProfilesComponent} from './theme/components/profiles/profiles.component';
import {ToastrModule} from 'ngx-toastr';
import {headerComponentsModules} from './pages/Global/header-components/header-components.modules';
import {WsServiceProvider} from "../ws.service.provider";
import {ConfigPstkModule} from "./pages/Global/config-pstk/config-pstk.module";
import {AffectationRoutesModule} from "./pages/Global/affectation-routes/affectation-routes.module";
import {TokenInterceptor} from "./core/auth/token.interceptor";
import { GridProjetComponent } from './pages/Oportunite/projet/grid-projet/grid-projet.component';
import {DxButtonModule, DxDataGridModule, DxPopupModule, DxTemplateModule} from "devextreme-angular";
import {DxiColumnModule, DxoPagerModule, DxoPagingModule, DxoScrollingModule} from "devextreme-angular/ui/nested";
import {BonDeCommandeModule} from "./pages/Oportunite/bon-de-commande/bon-de-commande.module";


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}
@NgModule({
    imports: [
        BrowserModule,
        PerfectScrollbarModule,
        AppRoutingModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        LoggerModule
            .forRoot(
                {
                    level: environment.logLevel,
                    serverLogLevel: environment.serverLogLevel,
                    disableConsoleLogging: false
                }),
        BrowserAnimationsModule,
        headerComponentsModules,
        ConfigPstkModule,
        AffectationRoutesModule,
        DxButtonModule,
        DxDataGridModule,
        DxPopupModule,
        DxTemplateModule,
        DxiColumnModule,
        DxoPagerModule,
        DxoPagingModule,
        DxoScrollingModule,
        BonDeCommandeModule,

    ],
    declarations: [
        AppComponent,
        PagesComponent,
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        VerticalMenuComponent,
        HorizontalMenuComponent,
        BreadcrumbComponent,
        BackTopComponent,
        UserMenuComponent,
        NotFoundComponent,
        FlagsMenuComponent,
        ProfilesComponent,
        GridProjetComponent,
    ],
    providers: [CookieService,
        AppSettings, EnvServiceProvider,WsServiceProvider,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG}
    ],
    exports: [
        ToastrModule,


    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
