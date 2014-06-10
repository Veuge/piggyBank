<?php 
    require "./database/conexion.php"; 
    require "./database/models.php";
    require "./moduloGastos/database/usuarioGastoService.php";

    header('Content-Type: application/json');

    if ($_SERVER["REQUEST_METHOD"] === 'GET') {
        $ug = UsuarioGastoService::totalPorDia(); //llamada a metodo obtenerDatos de clase UsuarioIngresoService guarda resultado en array (usuarioIngresoService.php) 
        // $total = UsuarioIngresoService::totalIngreso();
        // echo json_encode("Monto total: " + $total);
        echo json_encode($ug); //convierte array a objeto JSON y lo imprime
    }
?>