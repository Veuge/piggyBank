<?php
    require "../config.php";
    require "../database/conexion.php"; 
    require "../database/models.php";
    require "./database/ahorroService.php";

    header('Content-Type: application/json');

    if($_SERVER['REQUEST_METHOD'] === 'GET') {
        $ahorro = AhorroService::calcularAhorro();
        echo(json_encode($ahorro));
    }
    else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $ahorro = new Ahorro;
        $ahorro->codUsuario = 1; //codigo de usuario 1
        $ahorro->montoAhorro = $_POST['montoAhorro']; //codigo de ingreso 1
        AhorroService::insertarAhorro($ahorro);
        echo (json_encode($ahorro));
    }
?>