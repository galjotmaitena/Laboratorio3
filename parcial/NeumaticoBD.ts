/*NeumaticoBD, hereda de Neumatico, posee como atributos id (numérico) y pathFoto(cadena). Un
constructor para inicializar los atributos (con todos sus parámetros opcionales). Un método
ToJSON(), que retornará la representación del objeto en formato JSON. Reutilizar código. */

namespace Entidades
{
    export class NeumaticoBD extends Neumatico
    {
        protected id : number;
        protected pathFoto : string;

        public constructor(_marca : string, _medidas : string, _precio : number, _id : number = 0, _pathFoto : string = "")
        {
            super(_marca, _medidas, _precio);

            this.id = _id;
            this.pathFoto = _pathFoto;
        }

        public ToJSON()
        {
            return "{" + super.ToString + ', "id" : ' + this.id + ', "pathFoto" : "' + this.pathFoto + '"}';
        }
    }
}