import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PontuacaoModule } from './pontuacao/pontuacao.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PontuacaoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
