/*Neumatico: marca(cadena), medidas(cadena) y precio (numérico) como atributos. Un constructor
que reciba tres parámetros.
Un método, ToString(), que retorne la representación de la clase en formato cadena (preparar la
cadena para que, al juntarse con el método ToJSON, forme una cadena JSON válida).
Un método de instancia, ToJSON(), que retorne la representación de la instancia en formato de
cadena JSON válido. Reutilizar código. */

namespace Entidades
{
    export class Neumatico
    {
        protected marca : string;
        protected medidas : string;
        protected precio : number;

        public constructor(_marca : string, _medidas : string, _precio : number)
        {
            this.marca = _marca;
            this.medidas = _medidas;
            this.precio = _precio;
        }

        public ToString() : string
        {
            return '"marca" : "' + this.marca + '", "medidas" : "' + this.medidas + '", "precio" : ' + this.precio;
        }

        public ToJSON()
        {
            return "{" + this.ToString + "}";
        }
    }
}