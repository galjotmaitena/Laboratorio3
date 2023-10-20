"use strict";
var Galjot;
(function (Galjot) {
    class Auto {
        constructor(_patente, _marca, _color, _precio) {
            this.patente = _patente;
            this.marca = _marca;
            this.color = _color;
            this.precio = _precio;
        }
        ToJSON() {
            return '{"patente" : "' + this.patente + '", "marca" : "' + this.marca + '", "color" : "' + this.color + '", "precio" : ' + this.precio + '}';
        }
    }
    Galjot.Auto = Auto;
})(Galjot || (Galjot = {}));
//# sourceMappingURL=Auto.js.map