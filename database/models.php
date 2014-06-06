<?php
    //aqui todas las clases relacionadas con tablas de bd
    class UsuarioGasto{
        public $codUsuario;
        public $codGasto;
        public $montoGasto;
        public $fechaGasto;
        public $nombreGasto;
        public $totalGasto;
    }
    class Gasto{
        public $codGasto;
        public $nombreGasto;
        public $descripcionGasto;
    }
    class FechaTotalGasto {
        public $indiceDia;
        public $diaGasto;
        public $totalGasto;
        public $fechaGasto;
    }

    class UsuarioIngreso{
        public $codUsuario;
        public $codIngreso;
        public $montoIngreso;
        public $fechaIngreso;
        public $nombreIngreso;
        public $totalIngreso;
    }
    class Ingreso{
        public $codIngreso;
        public $nombreIngreso;
        public $descripcionIngreso;
    }
    class FechaTotalIngreso {
        public $indiceDia;
        public $diaIngreso;
        public $totalIngreso;
        public $fechaIngreso;
    }
    class Ahorro {
        public $codUsuario;
        public $montoAhorro;
        public $fechaAhorro;
    }
?>