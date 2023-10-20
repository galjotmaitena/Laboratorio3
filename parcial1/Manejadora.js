"use strict";
var RecPrimerParcial;
(function (RecPrimerParcial) {
    const URL_API = "http://localhost:2023/";
    const AJAX = new RecPrimerParcial.Ajax();
    class Manejadora {
        static AgregarAutoBD() {
            let patente = document.getElementById("patente").value;
            let marca = document.getElementById("marca").value;
            let color = document.getElementById("color").value;
            let precio = parseFloat(document.getElementById("precio").value);
            let auto = {
                "patente": patente,
                "marca": marca,
                "color": color,
                "precio": precio
            };
            let form = new FormData();
            form.append('obj', JSON.stringify(auto));
            AJAX.Post(URL_API + "agregarAutoBD", Manejadora.SuccesAgregarAutoBD, form, Manejadora.Fail);
        }
        static Fail(retorno) {
            console.log(retorno);
            alert(retorno);
        }
        static SuccesAgregarAutoBD(retornoBackend) {
            console.log(retornoBackend);
            alert(retornoBackend);
        }
        static ListarAutosBD() {
            AJAX.Get(URL_API + "listarAutosBD", Manejadora.SuccesListarAutosBD, "", Manejadora.Fail);
        }
        static SuccesListarAutosBD(retornoBackend) {
            console.log(retornoBackend);
            let arrayAutos = JSON.parse(retornoBackend);
            console.log("Mostrar: ", arrayAutos);
            let div = document.getElementById("divTabla");
            let tabla = `<table class="table table-hover">
                            <tr>
                                <th>PATENTE</th><th>MARCA</th><th>COLOR</th><th>PRECIO</th><th>ACCIONES</th>
                            </tr>`;
            if (arrayAutos.length < 1) {
                tabla += `<tr><td>---</td><td>---</td><td>---</td><td>---</td><td>---</td></tr>`;
            }
            else {
                for (let i = 0; i < arrayAutos.length; i++) {
                    const auto = arrayAutos[i];
                    tabla += `<tr>
                                <td>${auto.patente}</td>
                                <td>${auto.marca}</td>
                                <td><input = type="color" value=${auto.color}></input></td>
                                <td>${auto.precio}</td>
                                
                                <td><button type="button" class="btn btn-info" id="modif" 
                                    data-obj='${JSON.stringify(auto)}' name="btnModificar">
                                    <span class="bi bi-pencil">Modificar</span>
                                </button>

                                <button type="button" class="btn btn-danger" id="" 
                                    data-obj='${JSON.stringify(auto)}' name="btnEliminar">
                                    <span class="bi bi-x-circle">Borrar</span>
                                </button>

                                </td></tr>`;
                }
            }
            tabla += "</table>";
            div.innerHTML = tabla;
            document.getElementsByName("btnModificar").forEach((boton) => {
                boton.addEventListener("click", () => {
                    let objeto = boton.getAttribute("data-obj");
                    let btn = document.getElementById("modif");
                    Manejadora.ModificarAutoDatos(objeto);
                });
            });
            document.getElementsByName("btnEliminar").forEach((boton) => {
                boton.addEventListener("click", () => {
                    let objeto = boton.getAttribute("data-obj");
                    let objetoJSON = JSON.parse(objeto);
                    if (confirm(`¿Seguro de eliminar el auto con patente ${objetoJSON.patente}?`)) {
                        let auto = '{"id" : ' + objetoJSON.patente + ', "marca" : "' + objetoJSON.marca + '", "medidas" : "' + objetoJSON.medidas + '", "precio" : ' + objetoJSON.precio + '}';
                        let form = new FormData();
                        form.append('neumatico_json', auto);
                        AJAX.Post(URL_API + "eliminarAutoBD", Manejadora.SucccesEliminar, form, Manejadora.Fail);
                    }
                });
            });
        }
        static ModificarAutoDatos(auto) {
            let objetoJSON = JSON.parse(auto);
            document.getElementById("patente").value = objetoJSON.patente;
            document.getElementById("marca").value = objetoJSON.marca;
            document.getElementById("color").value = objetoJSON.medidas;
            document.getElementById("precio").value = objetoJSON.precio;
            document.getElementById("patente").readOnly = true;
        }
        static ModificarAuto() {
            let patente = document.getElementById("patente").value;
            let marca = document.getElementById("marca").value;
            let color = document.getElementById("color").value;
            let precio = parseFloat(document.getElementById("precio").value);
            let auto = {
                "patente": patente,
                "marca": marca,
                "color": color,
                "precio": precio
            };
            let form = new FormData();
            form.append('obj', JSON.stringify(auto));
            AJAX.Post(URL_API + "modificarAutoBD", Manejadora.SuccesModificarDB, form, Manejadora.Fail);
        }
        static SuccesModificarDB(retornoBackend) {
            console.log(retornoBackend);
            alert(retornoBackend);
        }
        static SucccesEliminar(retorno) {
            let respuesta = JSON.parse(retorno);
            console.log("Eliminar: ", respuesta.mensaje);
            Manejadora.ListarAutosBD();
            alert("Eliminar:" + respuesta.mensaje);
        }
    }
    RecPrimerParcial.Manejadora = Manejadora;
})(RecPrimerParcial || (RecPrimerParcial = {}));
//# sourceMappingURL=Manejadora.js.map