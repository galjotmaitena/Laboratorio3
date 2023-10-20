<?php

use Galjot\Maitena\Neumatico;

require_once "./clases/neumatico.php";

$arrayNeumaticos = array();

foreach(Neumatico::traerJSON("./archivos/neumaticos.json") as $neumatico)
{
    $objeto = new stdClass();
    $objeto->marca = $neumatico->getMarca();
    $objeto->medidas = $neumatico->getMedidas();
    $objeto->precio = $neumatico->getPrecio();

    array_push($arrayNeumaticos, $objeto);
}

echo json_encode($arrayNeumaticos);