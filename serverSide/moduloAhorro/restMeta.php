<?php
    require "../config.php";
    require "../database/conexion.php"; 
    require "../database/models.php";
    require "./database/ahorroService.php";

    header('Content-Type: application/json');

    if($_SERVER['REQUEST_METHOD'] === 'GET') {
        $metaAhorro = AhorroService::obtenerMetas();
        echo(json_encode($metaAhorro));
    }
    else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $meta = new MetaAhorro;
        $meta->codUsuario = $_POST['usuario'];
        $meta->descripcionma = $_POST['paraque'];
        $meta->montoma = $_POST['monto'];
        AhorroService::insertarMeta($meta);
        echo (json_encode($meta));
    }
?>