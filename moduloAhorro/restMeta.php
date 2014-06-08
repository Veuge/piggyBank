<?php
    require "../database/conexion.php"; 
    require "../database/models.php";
    require "./database/ahorroService.php";

    header('Content-Type: application/json');

    if($_SERVER['REQUEST_METHOD'] === 'GET') {
        $ahorro = AhorroService::calcularAhorro();
        echo(json_encode($ahorro));
    }
    else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $meta = new MetaAhorro;
        $meta->descripcionMA = $_POST['paraQue'];
        $meta->montoMA = $_POST['monto'];
        AhorroService::insertarMeta($meta);
        echo (json_encode($meta));
    }
?>