import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppRoutingModule } from './app.routing.module';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { PontuacaoModule } from './pontuacao/pontuacao.module';
import { ClienteModule } from './cliente/cliente.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    PontuacaoModule,
    ClienteModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
