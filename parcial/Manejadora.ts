/// <reference path="./ajax.ts" />
/// <reference path="./Neumatico.ts" />
/// <reference path="./NeumaticoBD.ts" />

namespace PrimerParcial
{
    export class Manejadora
    {
        static ajax : Ajax = new Ajax();

        /*AgregarNeumaticoJSON. Obtiene la marca, las medidas y el precio desde la página neumatico.html y se
        enviará (por AJAX) hacia “./BACKEND/altaNeumaticoJSON.php” que invoca al método guardarJSON y se pasa
        './archivos/neumaticos.json' cómo parámetro. Retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo
        acontecido.
        Informar por consola y alert el mensaje recibido. */

        public static AgregarNeumaticoJSON()
        {
            let marca : string = (<HTMLInputElement>document.getElementById("marca")).value; 
            let medidas : string = (<HTMLInputElement>document.getElementById("medidas")).value; 
            let precio : string = (<HTMLInputElement>document.getElementById("precio")).value; 

            let form : FormData = new FormData();

            form.append('marca', marca);
            form.append('medidas', medidas);
            form.append('precio', precio);

            Manejadora.ajax.Post("./BACKEND/altaNeumaticoJSON.php", Manejadora.SuccesAgregar, form, Manejadora.Fail);
        }

        public static Fail(retorno : string) : void 
        {
            console.log(retorno);
            alert(retorno);
        }

        public static SuccesAgregar(retornoBackend : string) : void 
        {
            console.log(retornoBackend); 
            alert(retornoBackend);
        }

        /*MostrarNeumaticosJSON. Recuperará (por AJAX) todos los neumáticos del archivo neumaticos.json y
        generará un listado dinámico, crear una tabla HTML con cabecera (en el FRONTEND) que mostrará toda la
        información de cada uno de los neumáticos. Invocar a “./BACKEND/listadoNeumaticosJSON.php”, recibe la
        petición (por GET) y retornará el listado de todos los neumáticos en formato JSON.
        Informar por consola el mensaje recibido y mostrar el listado en la página (div id='divTabla'). */

        public static MostrarNeumaticosJSON()
        {
            Manejadora.ajax.Get("./BACKEND/listadoNeumaticosJSON.php", Manejadora.SuccesMostrarNeumaticosJSON, "", Manejadora.Fail);
        }

        public static SuccesMostrarNeumaticosJSON(retornoBackend : string) : void 
        {
            console.log(retornoBackend);
            let arrayNeumaticos : any[]= JSON.parse(retornoBackend);
            console.log("Mostrar: ", arrayNeumaticos);

            let div = <HTMLDivElement>document.getElementById("divTabla");
            let tabla = "<table><tr><td>MARCA</td><td>MEDIDAS</td><td>PRECIO</td><td></td></tr>";

            for(let i = 0; i < arrayNeumaticos.length; i++)
            {
                tabla += `<tr><td>${arrayNeumaticos[i].marca}</td><td>${arrayNeumaticos[i].medidas}</td><td>${arrayNeumaticos[i].precio}</td></tr>`;    
            }

            tabla += "</table>";
            div.innerHTML = tabla;
        }

        /*VerificarNeumaticoJSON. Se invocará (por AJAX) a “./BACKEND/verificarNeumaticoJSON.php”. Se recibe por
        POST la marca y las medidas y retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido (agregar, aquí
        también, el mensaje obtenido del método VerificarNeumaticoJSON).
        Se mostrará (por consola y alert) lo acontecido. */

        public static VerificarNeumaticoJSON()
        {
            let marca : string = (<HTMLInputElement>document.getElementById("marca")).value; 
            let medidas : string = (<HTMLInputElement>document.getElementById("medidas")).value; 

            let form : FormData = new FormData();

            form.append('marca', marca);
            form.append('medidas', medidas);

            Manejadora.ajax.Post("./BACKEND/verificarNeumaticoJSON.php", Manejadora.SuccesVerificar, form, Manejadora.Fail);
        }

        public static SuccesVerificar(retornoBackend : string) : void 
        {
            console.log(retornoBackend); 
            alert(retornoBackend);
        }

        /*AgregarNeumaticoSinFoto. Obtiene la marca, las medidas y el precio desde la página neumatico.html, y se
        enviará (por AJAX) hacia “./BACKEND/agregarNeumaticoSinFoto.php” que recibe por POST el parámetro
        neumático_json (marca, medidas y precio), en formato de cadena JSON. Se invocará al método agregar.
        Se retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido.
        Informar por consola y alert el mensaje recibido. */

        public static AgregarNeumaticoSinFoto() 
        {
            let marca : string = (<HTMLInputElement>document.getElementById("marca")).value; 
            let medidas : string = (<HTMLInputElement>document.getElementById("medidas")).value; 
            let precio : string = (<HTMLInputElement>document.getElementById("precio")).value; 

            let neumatico : string = '{"marca" : "' + marca + '", "medidas" : "' + medidas + '", "precio" : ' + precio + '}';

            let form : FormData = new FormData();

            form.append('neumatico_json', neumatico);

            Manejadora.ajax.Post("./BACKEND/agregarNeumaticoSinFoto.php", Manejadora.SuccesAgregarDB, form, Manejadora.Fail);
        }

        public static SuccesAgregarDB(retornoBackend : string) : void 
        {
            console.log(retornoBackend); 
            alert(retornoBackend);
        }

        /*MostrarNeumaticosBD. Recuperará (por AJAX) todas los neumáticos de la base de datos, invocando a
        “./BACKEND/listadoNeumaticosBD.php”, que recibirá el parámetro tabla con valor distinto a 'mostrar', para que retorne un
        array de objetos con formato JSON.
        Crear una tabla HTML con cabecera (en el FRONTEND) para mostrar la información de cada uno de los
        neumáticos. Preparar la tabla para que muestre la imagen, si es que la tiene. Todas las imágenes deben tener
        50px por 50px de dimensiones.
        Informar por consola el mensaje recibido y mostrar el listado en la página (div id='divTabla'). */

        public static MostrarNeumaticosBD()
        {
            Manejadora.ajax.Get("./BACKEND/listadoNeumaticosBD.php", Manejadora.SuccesMostrarNeumaticosDB, "", Manejadora.Fail);
        }

        public static SuccesMostrarNeumaticosDB(retornoBackend : string) : void 
        {
            console.log(retornoBackend);
            let arrayNeumaticos : any[]= JSON.parse(retornoBackend);
                
            console.log("Mostrar: ", arrayNeumaticos);

            let div = <HTMLDivElement>document.getElementById("divTabla");

            let tabla = `<table class="table table-hover">
                            <tr>
                                <th>MARCA</th><th>MEDIDAS</th><th>PRECIO</th><th>FOTO</th><th>ACCION</th><th></th>
                            </tr>`;

            if(arrayNeumaticos.length < 1)
            {
                tabla += `<tr><td>---</td><td>---</td><td>---</td><td>---</td><td>---</td></tr>`;
            }
            else 
            {
                for (let i = 0; i < arrayNeumaticos.length; i++) 
                {
                    const dato = arrayNeumaticos[i];
                    //alert(dato.codigo);

                    tabla += `<tr><td>${dato.marca}</td><td>${dato.medidas}</td><td>${dato.precio}</td>
                                <td><img src="./BACKEND/neumaticos/imagenes/${dato.path}" width="50px" hight="50px"></td>

                                <td><button type="button" class="btn btn-info" id="modif" 
                                        data-obj='${JSON.stringify(dato)}' name="btnModificar">
                                        <span class="bi bi-pencil">Modificar</span>
                                    </button>

                                    <button type="button" class="btn btn-danger" id="" 
                                        data-obj='${JSON.stringify(dato)}' name="btnEliminar">
                                        <span class="bi bi-x-circle">Borrar</span>
                                    </button>

                                    </td></tr>`;
                }  
            }

            tabla += `</table>`;
            div.innerHTML = tabla;

            document.getElementsByName("btnModificar").forEach((boton)=>{

                boton.addEventListener("click", ()=>{ 
    
                    let objeto : any = boton.getAttribute("data-obj");
                    let objetoJSON = JSON.parse(objeto);
    
                    (<HTMLInputElement>document.getElementById("idNeumatico")).value = objetoJSON.id;
                    (<HTMLInputElement>document.getElementById("marca")).value = objetoJSON.marca; 
                    (<HTMLInputElement>document.getElementById("medidas")).value = objetoJSON.medidas; 
                    (<HTMLInputElement>document.getElementById("precio")).value = objetoJSON.precio; 

                    (<HTMLInputElement>document.getElementById("idNeumatico")).readOnly = true;
    
                    let btn = (<HTMLInputElement>document.getElementById("modif"));
                    //btn.value = "Modificar";
    
                    /*btn.removeEventListener("click", ():void=>{
                        AgregarProducto();
                    });*/
    
                    btn.addEventListener("click", ():void=>{
                        this.ModificarNeumatico();
                    });
                });
            });

            document.getElementsByName("btnEliminar").forEach((boton)=>{

                boton.addEventListener("click", ()=>{ 
    
                    let objeto : any = boton.getAttribute("data-obj");
                    let objetoJSON = JSON.parse(objeto);

                    if(confirm(`¿Seguro de eliminar el neumatico con código ${objetoJSON.id}?`))
                    {
                        let neumatico : string = '{"id" : ' + objetoJSON.id +', "marca" : "' + objetoJSON.marca + '", "medidas" : "' + objetoJSON.medidas + '", "precio" : ' + objetoJSON.precio + '}';

                        let form : FormData = new FormData();

                        form.append('neumatico_json', neumatico);
                    
                        Manejadora.ajax.Post("./BACKEND/eliminarNeumaticoBD.php", Manejadora.SucccesEliminar, form, Manejadora.Fail);
                    }                
                });
            });
        }

        /*EliminarNeumatico. Recibe como parámetro al objeto JSON que se ha de eliminar. Pedir confirmación,
        mostrando la marca y las medidas, antes de eliminar.
        Si se confirma se invocará (por AJAX) a “./BACKEND/eliminarNeumaticoBD.php” pasándole cómo parámetro
        neumatico_json (id, marca, medidas y precio, en formato de cadena JSON) por POST y se deberá borrar el neumático de la base de
        datos (invocando al método eliminar).
        Si se pudo borrar en la base de datos, invocar al método guardarJSON y pasarle './BACKEND/archivos/neumaticos_eliminados.json'
        cómo parámetro.
        Retornar un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido.
        Informar por consola y alert lo acontecido. Refrescar el listado para visualizar los cambios. */

        public static SucccesEliminar(retorno:string)
        {             
            let respuesta = JSON.parse(retorno);
            console.log("Eliminar: ", respuesta.mensaje);        
            Manejadora.MostrarNeumaticosBD();
            alert("Eliminar:"+respuesta.mensaje);
        }

        /*ModificarNeumatico. Mostrará todos los datos del neumáticoBD que recibe por parámetro (objeto JSON), en
        el formulario, de tener foto, incluirla en “imgFoto”. Permitirá modificar cualquier campo, a excepción del id.
        Al pulsar el botón Modificar sin foto (de la página) se invocará (por AJAX) a
        “./BACKEND/modificarNeumaticoBD.php” Se recibirán por POST los siguientes valores: neumatico_json (id, marca,
        medidas, y precio, en formato de cadena JSON) para modificar un neumático en la base de datos. Invocar al método modificar.
        Nota: El valor del id, será el id del neumático 'original', mientras que el resto de los valores serán los del neumático a ser modificado.
        Se retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido.
        Refrescar el listado solo si se pudo modificar, caso contrario, informar (por alert y consola) de lo acontecido. */

        public static ModificarNeumatico()
        {
            let id : string = (<HTMLInputElement>document.getElementById("idNeumatico")).value; 
            let marca : string = (<HTMLInputElement>document.getElementById("marca")).value; 
            let medidas : string = (<HTMLInputElement>document.getElementById("medidas")).value; 
            let precio : string = (<HTMLInputElement>document.getElementById("precio")).value; 

            let neumatico : string = '{"marca" : "' + marca + '", "medidas" : "' + medidas + '", "precio" : ' + precio + ', "id" : ' + id + '}';

            let form : FormData = new FormData();

            form.append('neumatico_json', neumatico);

            form.append('usuario_json', neumatico);

            Manejadora.ajax.Post("./backend/modificarNeumaticoBD.php", Manejadora.SuccesModificarDB, form, Manejadora.Fail);
        }

        public static SuccesModificarDB(retornoBackend : string) : void 
        {
            console.log(retornoBackend);
            alert(retornoBackend);
        }
    }
}