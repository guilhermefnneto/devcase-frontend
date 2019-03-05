import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PontuacaoComponent } from './pontuacao/pontuacao.component';
import { ClienteComponent } from './cliente/cliente.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [

    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'pontuacao',
        component: PontuacaoComponent
    },
    {
        path: 'cliente',
        component: ClienteComponent
    }

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ]
})
export class AppRoutingModule {

}