<?php

use Galjot\Maitena\NeumaticoBD;

require_once "./clases/neumaticoBD.php";

$tabla = isset($_GET["tabla"]) ? $_GET["tabla"] : NULL;

$arrayNeumaticos = NeumaticoBD::traer();

if($tabla == "mostrar")
{
    $tabla = "<table><tr><td>ID</td><td>MARCA</td><td>MEDIDAS</td><td>PRECIO</td><td>PATH_FOTO</td></tr>";

    foreach($arrayNeumaticos as $neumatico)
    {
        $tabla .= "<tr><td>{$neumatico->getId()}</td><td>{$neumatico->getMarca()}</td><td>{$neumatico->getMedidas()}
                    </td><td>{$neumatico->getPrecio()}</td><td>{$neumatico->getPathFoto()}</td></tr>";    
    }

    $tabla .= "</table>";
                
    echo $tabla;
}
else
{
    $arrayR = array();

    foreach($arrayNeumaticos as $neumatico)
    {
        $objeto = new stdClass();
        $objeto->id = $neumatico->getId();
        $objeto->marca = $neumatico->getMarca();
        $objeto->medidas = $neumatico->getMedidas();
        $objeto->precio = $neumatico->getPrecio();
        $objeto->pathFoto = $neumatico->getPathFoto();

        array_push($arrayR, $objeto);
    }

    echo json_encode($arrayR);
}
