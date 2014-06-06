<?php
    require "../database/conexion.php"; 
    require "../database/models.php";
    require "../database/ahorroService.php";

    header('Content-Type: application/json');

    if($_SERVER['REQUEST_METHOD'] === 'GET') {
        $ahorro = AhorroService::calcularAhorro();
        echo(json_encode($ahorro));
    }
    elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $ahorro = UsuarioAhorro::
    }
?>