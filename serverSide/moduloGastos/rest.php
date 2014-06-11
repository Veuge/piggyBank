<?php
    require "../config.php";
    require "../database/conexion.php"; 
    require "../database/models.php";
    require "./database/usuarioGastoService.php";
    require "./database/gastoService.php";

    //tipo de contenido JSON
    header('Content-Type: application/json');
          
    //si el tipo de request es POST
    if ($_SERVER["REQUEST_METHOD"] === 'POST') {
        
        $usuarioGasto = new UsuarioGasto(); //crea objeto UsuarioIngreso (models.php)
        $usuarioGasto->codUsuario = 1; //codigo de usuario 1
        $usuarioGasto->codGasto = $_POST['tipoGasto']; //codigo de ingreso 1
        $usuarioGasto->montoGasto = $_POST['montoGasto']; //monto de ingreso del input
        $usuarioGasto->fechaGasto = $_POST['fechaGasto']; //fecha de ingreso

        UsuarioGastoService::insertar($usuarioGasto); //llamada a metodo insertar de clase UsuarioIngresoService parametro objeto (usuarioIngresoService.php) 

        $a = array('status'=> 'ok'); //array a
        echo json_encode($usuarioGasto); //convierte array 'a' a objeto JSON 
        
    }
    //si el tipo de request es GET
    else if ($_SERVER['REQUEST_METHOD'] === 'GET'){
        $gasto = GastoService::obtenerDatos();
        echo json_encode($gasto);
    }
?>