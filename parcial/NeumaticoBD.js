"use strict";
/*NeumaticoBD, hereda de Neumatico, posee como atributos id (numérico) y pathFoto(cadena). Un
constructor para inicializar los atributos (con todos sus parámetros opcionales). Un método
ToJSON(), que retornará la representación del objeto en formato JSON. Reutilizar código. */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Entidades;
(function (Entidades) {
    var NeumaticoBD = /** @class */ (function (_super) {
        __extends(NeumaticoBD, _super);
        function NeumaticoBD(_marca, _medidas, _precio, _id, _pathFoto) {
            if (_id === void 0) { _id = 0; }
            if (_pathFoto === void 0) { _pathFoto = ""; }
            var _this = _super.call(this, _marca, _medidas, _precio) || this;
            _this.id = _id;
            _this.pathFoto = _pathFoto;
            return _this;
        }
        NeumaticoBD.prototype.ToJSON = function () {
            return "{" + _super.prototype.ToString + ', "id" : ' + this.id + ', "pathFoto" : "' + this.pathFoto + '"}';
        };
        return NeumaticoBD;
    }(Entidades.Neumatico));
    Entidades.NeumaticoBD = NeumaticoBD;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=NeumaticoBD.js.map