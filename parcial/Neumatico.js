"use strict";
/*Neumatico: marca(cadena), medidas(cadena) y precio (numérico) como atributos. Un constructor
que reciba tres parámetros.
Un método, ToString(), que retorne la representación de la clase en formato cadena (preparar la
cadena para que, al juntarse con el método ToJSON, forme una cadena JSON válida).
Un método de instancia, ToJSON(), que retorne la representación de la instancia en formato de
cadena JSON válido. Reutilizar código. */
var Entidades;
(function (Entidades) {
    var Neumatico = /** @class */ (function () {
        function Neumatico(_marca, _medidas, _precio) {
            this.marca = _marca;
            this.medidas = _medidas;
            this.precio = _precio;
        }
        Neumatico.prototype.ToString = function () {
            return '"marca" : "' + this.marca + '", "medidas" : "' + this.medidas + '", "precio" : ' + this.precio;
        };
        Neumatico.prototype.ToJSON = function () {
            return "{" + this.ToString + "}";
        };
        return Neumatico;
    }());
    Entidades.Neumatico = Neumatico;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=Neumatico.js.map