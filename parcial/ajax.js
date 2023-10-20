"use strict";
var PrimerParcial;
(function (PrimerParcial) {
    var Ajax = /** @class */ (function () {
        function Ajax() {
            var _this = this;
            this.Get = function (ruta, success, params, error) {
                if (params === void 0) { params = ""; }
                var parametros = params.length > 0 ? params : "";
                ruta = params.length > 0 ? ruta + "?" + parametros : ruta;
                _this._xhr.open('GET', ruta);
                _this._xhr.send();
                _this._xhr.onreadystatechange = function () {
                    if (_this._xhr.readyState === Ajax.DONE) {
                        if (_this._xhr.status === Ajax.OK) {
                            success(_this._xhr.responseText);
                        }
                        else {
                            if (error !== undefined) {
                                error(_this._xhr.status);
                            }
                        }
                    }
                };
            };
            this.Post = function (ruta, success, params, error, headers) {
                if (params === void 0) { params = null; }
                //let parametros:string = params.length > 0 ? params : "";
                console.log(params);
                _this._xhr.open('POST', ruta, true);
                if (headers !== undefined) {
                    headers.forEach(function (header) {
                        _this._xhr.setRequestHeader(header.key, header.value);
                    });
                }
                _this._xhr.send(params);
                _this._xhr.onreadystatechange = function () {
                    if (_this._xhr.readyState === Ajax.DONE) {
                        if (_this._xhr.status === Ajax.OK) {
                            success(_this._xhr.responseText);
                        }
                        else {
                            if (error !== undefined) {
                                error(_this._xhr.status);
                            }
                        }
                    }
                };
            };
            this._xhr = new XMLHttpRequest();
            Ajax.DONE = 4;
            Ajax.OK = 200;
        }
        return Ajax;
    }());
    PrimerParcial.Ajax = Ajax;
})(PrimerParcial || (PrimerParcial = {}));
//# sourceMappingURL=ajax.js.map