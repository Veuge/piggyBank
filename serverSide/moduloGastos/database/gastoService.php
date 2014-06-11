<?php 
    class GastoService{
        public static function obtenerDatos(){
            $db = new Database (DATABASE, HOST, USERNAME, PASSWORD);
            $result = $db->executeQuery("select * from gasto");

            $arrayGasto = array();

            foreach ($result as $row) {
                $gas = new Gasto ();
                $gas->codGasto = $row['cod_g'];
                $gas->nombreGasto = $row['nombre_g'];
                $gas->descripcionGasto = $row['descripcion_g'];
                
                $arrayGasto[] = $gas;
            }
            return $arrayGasto;
        }
        public static function obtenerCodigo($cadenaNombre){
            $db = new Database (DATABASE, HOST, USERNAME, PASSWORD);
            $result = $db->executeQuery("select cod_g from gasto where nombre_g like '$cadenaNombre'");

            $arrayGasto = array();

            foreach ($result as $row) {
                $gas = new Gasto ();
                $gas->codGasto = $row['cod_g'];
                $gas->nombreGasto = $row['nombre_g'];
                $gas->descripcionGasto = $row['descripcion_g'];
                
                $arrayGasto[] = $gas;
            }
            return $arrayGasto;
        }
        public static function obtenerNombre($codigoGasto){
            $db = new Database (DATABASE, HOST, USERNAME, PASSWORD);
            $result = $db->executeQuery("select nombre_g from gasto where cod_g = $codigoGasto");

            $arrayGasto = array();

            foreach ($result as $row) {
                $gas = new Ingreso ();
                $gas->nombreGasto = $row['nombre_g'];
                                
                $arrayGasto[] = $gas;
            }
            return $arrayGasto;
        }
        public static function insertar($objeto){
            $db = new Database (DATABASE, HOST, USERNAME, PASSWORD);
            $db->executeQuery("insert into gasto (nombre_g) values ('$objeto->nombreGasto')");
        }
    }

?>