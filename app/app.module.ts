import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard.component';
import { HeroesComponent }      from './heroes.component';
import { HeroDetailComponent }  from './hero-detail.component';
import { HeroService }          from './hero.service';
import { HeroSearchComponent }  from './hero-search.component';


@NgModule({
  // modules
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    //The forRoot configuration method takes an InMemoryDataService class that primes the in-memory database as follows
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  // components
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    HeroSearchComponent
  ],
  // services
  // this makes it a singleton for the whole application
  providers: [
    HeroService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }