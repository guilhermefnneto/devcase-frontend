import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';


/*const headersValues = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // Só para o desenvolvimento. Na produção, isso deve ser removido, visto que o front deve acessar a mesma porta do back
    'Access-Control-Allow-Method': 'POST,GET,PUT,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type'
}

const requestHeaders = {                                                                                                                                                                                 
    headers: new HttpHeaders(headersValues)
};*/



/**
 * Serviço que contém as configurações referentes à API (servidor).
 */
@Injectable({
    providedIn: 'root'
})
export class ApiSettings {

    public static host: String = 'http://localhost:9000';

}