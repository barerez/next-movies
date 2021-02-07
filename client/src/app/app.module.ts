import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MovieBoxComponent} from './movie-box/movie-box.component';
import {AppRoutingModule} from './app-routing.module';
import {MovieListComponent} from './movie-list/movie-list.component';
import {MovieDetailsComponent} from './movie-details/movie-details.component';
import {HttpClientModule} from '@angular/common/http';
import {NgbDropdownModule, NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieBoxComponent,
    MovieListComponent,
    MovieDetailsComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbDropdownModule,
    NgbRatingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
