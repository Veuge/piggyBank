<?php 
    $local = "./config-local.php";
    $server = "./config-server.php";

    // if (file_exists("./config-local.php")) {
    //    echo "encontrado!";
    //    require "config-local.php";
    // } 
    // else {
    //     require "config-server.php";
    //     echo "missing!";
    // }
    require "config-server.php";
    require "database/conexion.php"; 
    require "database/models.php";
    require "moduloAhorro/database/ahorroService.php";
    require "moduloGastos/database/usuarioGastoService.php";
    require "moduloGastos/database/gastoService.php";
    require "moduloIngreso/database/usuarioIngresoService.php";
    require "moduloIngreso/database/ingresoService.php";
?>