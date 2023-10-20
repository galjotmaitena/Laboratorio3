/// <reference path="ajax.ts" />

namespace RecPrimerParcial
{
    const URL_API : string = "http://localhost:2023/"; 
    const AJAX : Ajax = new Ajax();

    export class Manejadora 
    {
        /*AgregarAutoBD. Obtiene la patente, la marca, el color y el precio desde la página auto_bd.html y enviará por
        POST (utilizando AJAX) hacia el servidor ubicado en: “http://localhost:2023/agregarAutoBD”.
        Informar por consola y alert el mensaje recibido. */

        public static AgregarAutoBD() : void 
        {
            let patente : string = (<HTMLInputElement>document.getElementById("patente")).value;
            let marca : string = (<HTMLInputElement>document.getElementById("marca")).value;
            let color : string = (<HTMLInputElement>document.getElementById("color")).value;
            let precio : number = parseFloat((<HTMLInputElement>document.getElementById("precio")).value);

            let header = [{"key": "content-type", "value": "application/json"}];
            let auto = {
                        "patente" : patente,
                        "marca" : marca,
                        "color" : color,
                        "precio" : precio
                        };
        
            let form : FormData = new FormData();
            form.append('obj', JSON.stringify(auto));
        
            AJAX.Post(URL_API + "agregarAutoBD", Manejadora.SuccesAgregarAutoBD, form, Manejadora.Fail);
        }

        public static Fail(retorno : string) : void 
        {
            console.log(retorno);
            alert(retorno);
        }

        public static SuccesAgregarAutoBD(retornoBackend : string) : void 
        {
            console.log(retornoBackend); 
            alert(retornoBackend);
        }

        /*ListarAutosBD. Recuperará (por AJAX) todos los autos de la base de datos, invocando por GET al servidor
        ubicado en: “http://localhost:2023/listarAutosBD”.
        Con el array recibido, crear una tabla HTML con cabecera (en el FRONTEND) que mostrará toda la información
        de cada uno de los autos.
        Informar por consola el mensaje recibido y mostrar el listado en la página (div id='divTabla'). */

        public static ListarAutosBD()
        {
            AJAX.Get(URL_API + "listarAutosBD", Manejadora.SuccesListarAutosBD, "", Manejadora.Fail);
        }

        public static SuccesListarAutosBD(retornoBackend : string) : void 
        {
            console.log(retornoBackend);
            let arrayAutos : any[]= JSON.parse(retornoBackend);
            console.log("Mostrar: ", arrayAutos);

            let div = <HTMLDivElement>document.getElementById("divTabla");
            let tabla = `<table class="table table-hover">
                            <tr>
                                <th>PATENTE</th><th>MARCA</th><th>COLOR</th><th>PRECIO</th><th>ACCIONES</th>
                            </tr>`;

            if(arrayAutos.length < 1)
            {
                tabla += `<tr><td>---</td><td>---</td><td>---</td><td>---</td><td>---</td></tr>`;
            }
            else 
            {
                for(let i = 0; i < arrayAutos.length; i++)
                {
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

            document.getElementsByName("btnModificar").forEach((boton)=>{

                boton.addEventListener("click", ()=>{ 
    
                    let objeto : any = boton.getAttribute("data-obj");
                    let btn = (<HTMLInputElement>document.getElementById("modif"));
                    
                   Manejadora.ModificarAutoDatos(objeto);
                });
            });

            document.getElementsByName("btnEliminar").forEach((boton)=>{

                boton.addEventListener("click", ()=>{ 
    
                    let objeto : any = boton.getAttribute("data-obj");
                    let objetoJSON = JSON.parse(objeto);

                    if(confirm(`¿Seguro de eliminar el auto con patente ${objetoJSON.patente}?`))
                    {
                        let auto : string = '{"id" : ' + objetoJSON.patente +', "marca" : "' + objetoJSON.marca + '", "medidas" : "' + objetoJSON.medidas + '", "precio" : ' + objetoJSON.precio + '}';

                        let form : FormData = new FormData();

                        form.append('neumatico_json', auto);
                    
                        AJAX.Post(URL_API + "eliminarAutoBD", Manejadora.SucccesEliminar, form, Manejadora.Fail);
                    }                
                });
            });
        }

        /*ModificarAuto. Mostrará todos los datos del auto que recibe por parámetro (objeto JSON), en el formulario de
        la página auto_bd.html. Permitirá modificar cualquier campo, a excepción de la patente, dejarlo como de sólo
        lectura.
        Al pulsar el botón “Modificar”, se invocará por POST (utilizando AJAX) al servidor ubicado en:
        “http://localhost:2023/modificarAutoBD”. Realizar una función para tal fin.
        Refrescar el listado sólo si se pudo modificar, caso contrario, informar (por alert y consola) de lo acontecido.*/

        public static ModificarAutoDatos(auto : any)
        {
            let objetoJSON = JSON.parse(auto);
    
            (<HTMLInputElement>document.getElementById("patente")).value = objetoJSON.patente;
            (<HTMLInputElement>document.getElementById("marca")).value = objetoJSON.marca; 
            (<HTMLInputElement>document.getElementById("color")).value = objetoJSON.medidas; 
            (<HTMLInputElement>document.getElementById("precio")).value = objetoJSON.precio; 

            (<HTMLInputElement>document.getElementById("patente")).readOnly = true;
        }

        public static ModificarAuto()
        {
            let patente : string = (<HTMLInputElement>document.getElementById("patente")).value;
            let marca : string = (<HTMLInputElement>document.getElementById("marca")).value;
            let color : string = (<HTMLInputElement>document.getElementById("color")).value;
            let precio : number = parseFloat((<HTMLInputElement>document.getElementById("precio")).value);

            let auto = {
                        "patente" : patente,
                        "marca" : marca,
                        "color" : color,
                        "precio" : precio
                        };

            let form : FormData = new FormData();
            form.append('obj', JSON.stringify(auto));

            AJAX.Post(URL_API + "modificarAutoBD", Manejadora.SuccesModificarDB, form, Manejadora.Fail);
        }

        public static SuccesModificarDB(retornoBackend : string) : void 
        {
            console.log(retornoBackend);
            alert(retornoBackend);
        }

        /*EliminarAutoBD. Recibe como parámetro al objeto JSON que se ha de eliminar. Pedir confirmación, mostrando
        la patente y marca, antes de eliminar.
        Si se confirma se invocará por POST (utilizando AJAX) al servidor ubicado en:
        “http://localhost:2023/eliminarAutoBD”.
        Informar por consola y alert lo acontecido. Refrescar el listado para visualizar los cambios. */

        public static SucccesEliminar(retorno:string)
        {             
            let respuesta = JSON.parse(retorno);
            console.log("Eliminar: ", respuesta.mensaje);        
            Manejadora.ListarAutosBD();
            alert("Eliminar:"+respuesta.mensaje);
        }
    }

    
}