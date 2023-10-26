import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from 'src/environments/environment.dev';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlCro } from './utils/utilities/mat-paginator-intl-cro/mat-paginator-intl-cro.component';

export const httpTranslateLoader = (http: HttpClient): TranslateHttpLoader =>
  new TranslateHttpLoader(http, environment.refTranslate, '.json');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MatTableModule,
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    BlockUIModule.forRoot({
      message: 'Procesando',
      delayStart: 150,
      delayStop: 150
    }),
    BlockUIHttpModule.forRoot()
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useFactory: (translate: any) => {
        return new MatPaginatorIntlCro(translate);
      },
      deps: [TranslateService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
