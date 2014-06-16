<?php  
    class AhorroService{
        public static function calcularAhorro(){
            $db = new Database(DATABASE, HOST, USERNAME, PASSWORD);
            $ahorro = $db->executeQuery("select ifnull(tmpIngresos.totalIngresos - tmpGastos.totalGastos,'0') ahorro from (select sum(monto_i) totalIngresos from usuario_ingreso WHERE fecha_i = curdate() group by fecha_i) tmpIngresos,(select sum(monto_g) totalGastos from usuario_gasto WHERE fecha_g = curdate() group by fecha_g) tmpGastos");
            $total = $db->executeQuery("select ifnull(sum(monto_a), '0')totalAhorro from usuario_ahorro");
            $arrayAhorro = array();

            foreach ($ahorro as $row) {
                $aho = new Ahorro();
                $aho->montoAhorro = $row['ahorro'];

                $arrayAhorro[] = $aho;
            }

            foreach ($total as $row) {
                $usrT = new Ahorro ();
                $usrT->totalAhorro = $row['totalAhorro'];
                $arrayAhorro[] = $usrT;
            }
            return $arrayAhorro;
        }
        public static function insertarAhorro($objeto) {
            $db = new Database(DATABASE, HOST, USERNAME, PASSWORD);
            $ahorro = $db->executeQuery("insert into usuario_ahorro (cod_usuario, monto_a, fecha_a) values ($objeto->codUsuario, $objeto->montoAhorro, sysdate())");
        }
        public static function insertarMeta($object){
            $db = new Database(DATABASE, HOST, USERNAME, PASSWORD);
            $db->executeQuery("insert into usuario_meta(cod_usuario,descripcion_ma,monto_ma,fecha_ini) VALUES ($object->codUsuario,'$object->descripcionma',$object->montoma, sysdate())");
        }
        public static function obtenerMetas(){
            $db = new Database(DATABASE, HOST, USERNAME, PASSWORD);
            $metas = $db->executeQuery("select descripcion_ma, monto_ma, fecha_ini from usuario_meta");
            $arrayMetas = array();

            foreach ($metas as $row) {
                $ahorro = new MetaAhorro();

                $ahorro->descripcionma = $row['descripcion_ma'];
                $ahorro->montoma = $row['monto_ma'];
                $ahorro->fechaIni = $row['fecha_ini'];

                $arrayMetas[] = $ahorro;
            }
            return $arrayMetas;
        }
    }
?>