"use strict";
var RecPrimerParcial;
(function (RecPrimerParcial) {
    window.addEventListener("load", () => {
        let btnAgregar = document.getElementById("btn-agregar");
        let btnMostrar = document.getElementById("btn-mostrar");
        let btnModificar = document.getElementById("btn-modificar");
        btnAgregar.addEventListener("click", RecPrimerParcial.Manejadora.AgregarAutoBD);
        btnMostrar.addEventListener("click", RecPrimerParcial.Manejadora.ListarAutosBD);
        btnModificar.addEventListener("click", RecPrimerParcial.Manejadora.ModificarAuto);
    });
})(RecPrimerParcial || (RecPrimerParcial = {}));
//# sourceMappingURL=script.js.map