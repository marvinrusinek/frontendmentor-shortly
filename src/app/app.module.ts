import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { AppComponent } from './app.component';
import { HeaderComponent } from './url-shortener/containers/header/header.component';
import { MainComponent } from './url-shortener/containers/main/main.component';
import { FooterComponent } from './url-shortener/containers/footer/footer.component';
import { TruncateTextPipe } from './url-shortener/shared/pipes/truncate-text.pipe';
import { ShortenAPIService } from './url-shortener/shared/services/shorten-api.service';
import { LoadingSpinnerComponent } from './url-shortener/containers/loading-spinner/loading-spinner.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'url-shortener',
    pathMatch: 'full'
  },
  {
    path: 'url-shortener',
    loadChildren: () =>
      import('./url-shortener/routing/url-shortener-routing.module').then(m => m.UrlShortenerRoutingModule)
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    TruncateTextPipe,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    ClipboardModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' })
  ],
  providers: [ShortenAPIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
