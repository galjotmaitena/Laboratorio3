"use strict";
var RecPrimerParcial;
(function (RecPrimerParcial) {
    class Ajax {
        constructor() {
            this.Get = (ruta, success, params = "", error) => {
                let parametros = params.length > 0 ? params : "";
                ruta = params.length > 0 ? ruta + "?" + parametros : ruta;
                this._xhr.open('GET', ruta);
                this._xhr.send();
                this._xhr.onreadystatechange = () => {
                    if (this._xhr.readyState === Ajax.DONE) {
                        if (this._xhr.status === Ajax.OK) {
                            success(this._xhr.responseText);
                        }
                        else {
                            if (error !== undefined) {
                                error(this._xhr.status);
                            }
                        }
                    }
                };
            };
            this.Post = (ruta, success, params = null, error, headers) => {
                this._xhr.setRequestHeader("content-type", "aplication/json");
                console.log(params);
                this._xhr.open('POST', ruta, true);
                if (headers !== undefined) {
                    headers.forEach((header) => {
                        this._xhr.setRequestHeader(header.key, header.value);
                    });
                }
                this._xhr.send(params);
                this._xhr.onreadystatechange = () => {
                    if (this._xhr.readyState === Ajax.DONE) {
                        if (this._xhr.status === Ajax.OK) {
                            success(this._xhr.responseText);
                        }
                        else {
                            if (error !== undefined) {
                                error(this._xhr.status);
                            }
                        }
                    }
                };
            };
            this._xhr = new XMLHttpRequest();
            Ajax.DONE = 4;
            Ajax.OK = 200;
        }
    }
    RecPrimerParcial.Ajax = Ajax;
})(RecPrimerParcial || (RecPrimerParcial = {}));
//# sourceMappingURL=ajax.js.map