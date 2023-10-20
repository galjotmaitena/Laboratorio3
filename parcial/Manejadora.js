"use strict";
/// <reference path="./ajax.ts" />
/// <reference path="./Neumatico.ts" />
/// <reference path="./NeumaticoBD.ts" />
var PrimerParcial;
(function (PrimerParcial) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        /*AgregarNeumaticoJSON. Obtiene la marca, las medidas y el precio desde la página neumatico.html y se
        enviará (por AJAX) hacia “./BACKEND/altaNeumaticoJSON.php” que invoca al método guardarJSON y se pasa
        './archivos/neumaticos.json' cómo parámetro. Retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo
        acontecido.
        Informar por consola y alert el mensaje recibido. */
        Manejadora.AgregarNeumaticoJSON = function () {
            var marca = document.getElementById("marca").value;
            var medidas = document.getElementById("medidas").value;
            var precio = document.getElementById("precio").value;
            var form = new FormData();
            form.append('marca', marca);
            form.append('medidas', medidas);
            form.append('precio', precio);
            Manejadora.ajax.Post("./BACKEND/altaNeumaticoJSON.php", Manejadora.SuccesAgregar, form, Manejadora.Fail);
        };
        Manejadora.Fail = function (retorno) {
            console.log(retorno);
            alert(retorno);
        };
        Manejadora.SuccesAgregar = function (retornoBackend) {
            console.log(retornoBackend);
            alert(retornoBackend);
        };
        /*MostrarNeumaticosJSON. Recuperará (por AJAX) todos los neumáticos del archivo neumaticos.json y
        generará un listado dinámico, crear una tabla HTML con cabecera (en el FRONTEND) que mostrará toda la
        información de cada uno de los neumáticos. Invocar a “./BACKEND/listadoNeumaticosJSON.php”, recibe la
        petición (por GET) y retornará el listado de todos los neumáticos en formato JSON.
        Informar por consola el mensaje recibido y mostrar el listado en la página (div id='divTabla'). */
        Manejadora.MostrarNeumaticosJSON = function () {
            Manejadora.ajax.Get("./BACKEND/listadoNeumaticosJSON.php", Manejadora.SuccesMostrarNeumaticosJSON, "", Manejadora.Fail);
        };
        Manejadora.SuccesMostrarNeumaticosJSON = function (retornoBackend) {
            console.log(retornoBackend);
            var arrayNeumaticos = JSON.parse(retornoBackend);
            console.log("Mostrar: ", arrayNeumaticos);
            var div = document.getElementById("divTabla");
            var tabla = "<table><tr><td>MARCA</td><td>MEDIDAS</td><td>PRECIO</td><td></td></tr>";
            for (var i = 0; i < arrayNeumaticos.length; i++) {
                tabla += "<tr><td>".concat(arrayNeumaticos[i].marca, "</td><td>").concat(arrayNeumaticos[i].medidas, "</td><td>").concat(arrayNeumaticos[i].precio, "</td></tr>");
            }
            tabla += "</table>";
            div.innerHTML = tabla;
        };
        /*VerificarNeumaticoJSON. Se invocará (por AJAX) a “./BACKEND/verificarNeumaticoJSON.php”. Se recibe por
        POST la marca y las medidas y retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido (agregar, aquí
        también, el mensaje obtenido del método VerificarNeumaticoJSON).
        Se mostrará (por consola y alert) lo acontecido. */
        Manejadora.VerificarNeumaticoJSON = function () {
            var marca = document.getElementById("marca").value;
            var medidas = document.getElementById("medidas").value;
            var form = new FormData();
            form.append('marca', marca);
            form.append('medidas', medidas);
            Manejadora.ajax.Post("./BACKEND/verificarNeumaticoJSON.php", Manejadora.SuccesVerificar, form, Manejadora.Fail);
        };
        Manejadora.SuccesVerificar = function (retornoBackend) {
            console.log(retornoBackend);
            alert(retornoBackend);
        };
        /*AgregarNeumaticoSinFoto. Obtiene la marca, las medidas y el precio desde la página neumatico.html, y se
        enviará (por AJAX) hacia “./BACKEND/agregarNeumaticoSinFoto.php” que recibe por POST el parámetro
        neumático_json (marca, medidas y precio), en formato de cadena JSON. Se invocará al método agregar.
        Se retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido.
        Informar por consola y alert el mensaje recibido. */
        Manejadora.AgregarNeumaticoSinFoto = function () {
            var marca = document.getElementById("marca").value;
            var medidas = document.getElementById("medidas").value;
            var precio = document.getElementById("precio").value;
            var neumatico = '{"marca" : "' + marca + '", "medidas" : "' + medidas + '", "precio" : ' + precio + '}';
            var form = new FormData();
            form.append('neumatico_json', neumatico);
            Manejadora.ajax.Post("./BACKEND/agregarNeumaticoSinFoto.php", Manejadora.SuccesAgregarDB, form, Manejadora.Fail);
        };
        Manejadora.SuccesAgregarDB = function (retornoBackend) {
            console.log(retornoBackend);
            alert(retornoBackend);
        };
        /*MostrarNeumaticosBD. Recuperará (por AJAX) todas los neumáticos de la base de datos, invocando a
        “./BACKEND/listadoNeumaticosBD.php”, que recibirá el parámetro tabla con valor distinto a 'mostrar', para que retorne un
        array de objetos con formato JSON.
        Crear una tabla HTML con cabecera (en el FRONTEND) para mostrar la información de cada uno de los
        neumáticos. Preparar la tabla para que muestre la imagen, si es que la tiene. Todas las imágenes deben tener
        50px por 50px de dimensiones.
        Informar por consola el mensaje recibido y mostrar el listado en la página (div id='divTabla'). */
        Manejadora.MostrarNeumaticosBD = function () {
            Manejadora.ajax.Get("./BACKEND/listadoNeumaticosBD.php", Manejadora.SuccesMostrarNeumaticosDB, "", Manejadora.Fail);
        };
        Manejadora.SuccesMostrarNeumaticosDB = function (retornoBackend) {
            var _this = this;
            console.log(retornoBackend);
            var arrayNeumaticos = JSON.parse(retornoBackend);
            console.log("Mostrar: ", arrayNeumaticos);
            var div = document.getElementById("divTabla");
            var tabla = "<table class=\"table table-hover\">\n                            <tr>\n                                <th>MARCA</th><th>MEDIDAS</th><th>PRECIO</th><th>FOTO</th><th>ACCION</th><th></th>\n                            </tr>";
            if (arrayNeumaticos.length < 1) {
                tabla += "<tr><td>---</td><td>---</td><td>---</td><td>---</td><td>---</td></tr>";
            }
            else {
                for (var i = 0; i < arrayNeumaticos.length; i++) {
                    var dato = arrayNeumaticos[i];
                    //alert(dato.codigo);
                    tabla += "<tr><td>".concat(dato.marca, "</td><td>").concat(dato.medidas, "</td><td>").concat(dato.precio, "</td>\n                                <td><img src=\"./BACKEND/neumaticos/imagenes/").concat(dato.path, "\" width=\"50px\" hight=\"50px\"></td>\n\n                                <td><button type=\"button\" class=\"btn btn-info\" id=\"modif\" \n                                        data-obj='").concat(JSON.stringify(dato), "' name=\"btnModificar\">\n                                        <span class=\"bi bi-pencil\">Modificar</span>\n                                    </button>\n\n                                    <button type=\"button\" class=\"btn btn-danger\" id=\"\" \n                                        data-obj='").concat(JSON.stringify(dato), "' name=\"btnEliminar\">\n                                        <span class=\"bi bi-x-circle\">Borrar</span>\n                                    </button>\n\n                                    </td></tr>");
                }
            }
            tabla += "</table>";
            div.innerHTML = tabla;
            document.getElementsByName("btnModificar").forEach(function (boton) {
                boton.addEventListener("click", function () {
                    var objeto = boton.getAttribute("data-obj");
                    var objetoJSON = JSON.parse(objeto);
                    document.getElementById("idNeumatico").value = objetoJSON.id;
                    document.getElementById("marca").value = objetoJSON.marca;
                    document.getElementById("medidas").value = objetoJSON.medidas;
                    document.getElementById("precio").value = objetoJSON.precio;
                    document.getElementById("idNeumatico").readOnly = true;
                    var btn = document.getElementById("modif");
                    //btn.value = "Modificar";
                    /*btn.removeEventListener("click", ():void=>{
                        AgregarProducto();
                    });*/
                    btn.addEventListener("click", function () {
                        _this.ModificarNeumatico();
                    });
                });
            });
            document.getElementsByName("btnEliminar").forEach(function (boton) {
                boton.addEventListener("click", function () {
                    var objeto = boton.getAttribute("data-obj");
                    var objetoJSON = JSON.parse(objeto);
                    if (confirm("\u00BFSeguro de eliminar el neumatico con c\u00F3digo ".concat(objetoJSON.id, "?"))) {
                        var neumatico = '{"id" : ' + objetoJSON.id + ', "marca" : "' + objetoJSON.marca + '", "medidas" : "' + objetoJSON.medidas + '", "precio" : ' + objetoJSON.precio + '}';
                        var form = new FormData();
                        form.append('neumatico_json', neumatico);
                        Manejadora.ajax.Post("./BACKEND/eliminarNeumaticoBD.php", Manejadora.SucccesEliminar, form, Manejadora.Fail);
                    }
                });
            });
        };
        /*EliminarNeumatico. Recibe como parámetro al objeto JSON que se ha de eliminar. Pedir confirmación,
        mostrando la marca y las medidas, antes de eliminar.
        Si se confirma se invocará (por AJAX) a “./BACKEND/eliminarNeumaticoBD.php” pasándole cómo parámetro
        neumatico_json (id, marca, medidas y precio, en formato de cadena JSON) por POST y se deberá borrar el neumático de la base de
        datos (invocando al método eliminar).
        Si se pudo borrar en la base de datos, invocar al método guardarJSON y pasarle './BACKEND/archivos/neumaticos_eliminados.json'
        cómo parámetro.
        Retornar un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido.
        Informar por consola y alert lo acontecido. Refrescar el listado para visualizar los cambios. */
        Manejadora.SucccesEliminar = function (retorno) {
            var respuesta = JSON.parse(retorno);
            console.log("Eliminar: ", respuesta.mensaje);
            Manejadora.MostrarNeumaticosBD();
            alert("Eliminar:" + respuesta.mensaje);
        };
        /*ModificarNeumatico. Mostrará todos los datos del neumáticoBD que recibe por parámetro (objeto JSON), en
        el formulario, de tener foto, incluirla en “imgFoto”. Permitirá modificar cualquier campo, a excepción del id.
        Al pulsar el botón Modificar sin foto (de la página) se invocará (por AJAX) a
        “./BACKEND/modificarNeumaticoBD.php” Se recibirán por POST los siguientes valores: neumatico_json (id, marca,
        medidas, y precio, en formato de cadena JSON) para modificar un neumático en la base de datos. Invocar al método modificar.
        Nota: El valor del id, será el id del neumático 'original', mientras que el resto de los valores serán los del neumático a ser modificado.
        Se retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido.
        Refrescar el listado solo si se pudo modificar, caso contrario, informar (por alert y consola) de lo acontecido. */
        Manejadora.ModificarNeumatico = function () {
            var id = document.getElementById("idNeumatico").value;
            var marca = document.getElementById("marca").value;
            var medidas = document.getElementById("medidas").value;
            var precio = document.getElementById("precio").value;
            var neumatico = '{"marca" : "' + marca + '", "medidas" : "' + medidas + '", "precio" : ' + precio + ', "id" : ' + id + '}';
            var form = new FormData();
            form.append('neumatico_json', neumatico);
            form.append('usuario_json', neumatico);
            Manejadora.ajax.Post("./backend/modificarNeumaticoBD.php", Manejadora.SuccesModificarDB, form, Manejadora.Fail);
        };
        Manejadora.SuccesModificarDB = function (retornoBackend) {
            console.log(retornoBackend);
            alert(retornoBackend);
        };
        Manejadora.ajax = new PrimerParcial.Ajax();
        return Manejadora;
    }());
    PrimerParcial.Manejadora = Manejadora;
})(PrimerParcial || (PrimerParcial = {}));
//# sourceMappingURL=Manejadora.js.map