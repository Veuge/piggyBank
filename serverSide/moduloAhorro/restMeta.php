<?php
    require '../loader.php';

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