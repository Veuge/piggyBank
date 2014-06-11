<?php 
    require "../config.php";
    require "../database/conexion.php"; 
    require "../database/models.php";
    require "./database/usuarioGastoService.php";
    require "./database/gastoService.php";

    header('Content-Type: application/json');

    if ($_SERVER["REQUEST_METHOD"] === 'GET') {
        $ug = UsuarioGastoService::obtenerDatos(); //llamada a metodo obtenerDatos de clase UsuarioIngresoService guarda resultado en array (usuarioIngresoService.php) 
        // $total = UsuarioIngresoService::totalIngreso();
        // echo json_encode("Monto total: " + $total);
        echo json_encode($ug); //convierte array a objeto JSON y lo imprime
    }
    else if ($_SERVER["REQUEST_METHOD"] === 'POST'){
        $gasto = new Gasto();
        $gasto->nombreGasto = $_POST['nombreGasto'];

        GastoService::insertar($gasto);
        echo (json_encode($gasto));
    }
 ?>