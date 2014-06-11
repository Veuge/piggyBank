<?php 
    //aqui solo queries validaciones reglas DE TABLA USUARIO_INGRESO

    class UsuarioGastoService{
        public static function insertar($objeto){
            $db = new Database (DATABASE, HOST, USERNAME, PASSWORD);
            $db->executeQuery("insert into usuario_gasto (cod_usuario, cod_g, monto_g, fecha_g) 
                            values ($objeto->codUsuario, $objeto->codGasto, $objeto->montoGasto, '$objeto->fechaGasto')");

        }
        public static function obtenerDatos(){
            //devuelve array de objetos usuario-ingreso
            $db = new Database (DATABASE, HOST, USERNAME, PASSWORD);
            $result = $db->executeQuery("select ug.*, g.nombre_g from gasto g inner join usuario_gasto ug on g.cod_g = ug.cod_g order by ug.fecha_g");
            $total = $db->executeQuery("select ifnull(truncate(sum(monto_g),1),'0') total from usuario_gasto");
            $arrayUsuarioGasto = array();

            foreach ($result as $row) {
                $usrgas = new UsuarioGasto ();
                $usrgas->nombreGasto = $row["nombre_g"];
                $usrgas->codUsuario = $row['cod_usuario'];
                $usrgas->codGasto = $row['cod_g'];
                $usrgas->montoGasto = $row['monto_g'];
                $usrgas->fechaGasto = $row['fecha_g'];
                $arrayUsuarioGasto[] = $usrgas;
            }
            foreach ($total as $row) {
                $usrT = new UsuarioGasto ();
                $usrT->totalGasto = $row['total'];
                $arrayUsuarioGasto[] = $usrT;
            }

            return $arrayUsuarioGasto;
        }

        public static function totalPorDia(){
            
            $db = new Database (DATABASE, HOST, USERNAME, PASSWORD);
            $result = $db->executeQuery("select fecha_g, date_format(fecha_g, '%w') indice, dayname(fecha_g) dia, sum(monto_g) totalFecha from usuario_gasto WHERE fecha_g > DATE_SUB(NOW(), INTERVAL 1 WEEK) group by fecha_g");
            $arrayFechaTotalGasto = array();

            foreach ($result as $row) {
                $fechaTotal = new FechaTotalGasto ();
                $fechaTotal->indiceDia = $row['indice'];
                $fechaTotal->diaGasto = $row['dia'];
                $fechaTotal->totalGasto = $row['totalFecha'];
                $fechaTotal->fechaGasto = $row['fecha_g'];
                $arrayFechaTotalGasto[] = $fechaTotal;
            }
            return $arrayFechaTotalGasto;
        }
    }
?>