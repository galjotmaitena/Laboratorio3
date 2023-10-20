namespace RecPrimerParcial
{
    window.addEventListener("load", ()=>{

        let btnAgregar = <HTMLButtonElement>document.getElementById("btn-agregar");
        let btnMostrar = <HTMLInputElement>document.getElementById("btn-mostrar");
        let btnModificar = <HTMLInputElement>document.getElementById("btn-modificar");
    
        btnAgregar.addEventListener("click", Manejadora.AgregarAutoBD);
        btnMostrar.addEventListener("click", Manejadora.ListarAutosBD);
        btnModificar.addEventListener("click", Manejadora.ModificarAuto);
    });

    
    
    
}


