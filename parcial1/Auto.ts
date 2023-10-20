namespace Galjot
{
    export class Auto 
    {
        protected patente : string;
        protected marca : string;
        protected color : string;
        protected precio : number;

        /*Un constructor (que inicialice los atributos), un método de instancia toJSON(), que retornará los datos de la
        instancia (en una cadena con formato JSON). */

        public constructor(_patente : string, _marca : string, _color : string, _precio : number)
        {
            this.patente = _patente;
            this.marca = _marca;
            this.color = _color;
            this.precio = _precio;
        }

        public ToJSON()
        {
            return '{"patente" : "' + this.patente + '", "marca" : "' + this.marca + '", "color" : "' + this.color + '", "precio" : ' + this.precio + '}';
        }

    }
}