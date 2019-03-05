/**
 * Representação de negócio para o cliente.
 */
export interface Cliente {

    id: Number;
    nome: String;
    dataNascimento: Date;
    sexo: String;
    estadoCivil: String;
    telefoneResidencial: number;
    telefoneCelular: number;
    email: String;
    pontos: Number;

}