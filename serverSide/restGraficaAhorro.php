<?php  
    require './loader.php';

    header('Content-Type: application/json');

    if($_SERVER['REQUEST_METHOD'] === 'GET') {
        $arrayIngresoTotal = FechaTotalIngreso();
    }
?>