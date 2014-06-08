<?php  
    class AhorroService{
        public static function calcularAhorro(){
            $db = new Database('pigbudget', 'localhost', 'root', 'cinguifields');
            $ahorro = $db->executeQuery("select ifnull(tmpIngresos.totalIngresos - tmpGastos.totalGastos, '0') ahorro from (select sum(monto_i) totalIngresos from usuario_ingreso WHERE fecha_i = curdate() group by fecha_i) tmpIngresos, (select sum(monto_g) totalGastos from usuario_gasto WHERE fecha_g = curdate() group by fecha_g)tmpGastos");
            $arrayAhorro = array();

            foreach ($ahorro as $row) {
                $aho = new Ahorro();
                $aho->montoAhorro = $row['ahorro'];

                $arrayAhorro[] = $aho;
            }
            return $arrayAhorro;
        }
        public static function insertarAhorro($objeto) {
            $db = new Database('pigbudget', 'localhost', 'root', 'cinguifields');
            $ahorro = $db->executeQuery("insert into usuario_ahorro (cod_usuario, monto_a, fecha_a) values ($objeto->codUsuario, $objeto->montoAhorro, sysdate())");
        }
        public static function insertarMeta($object){
            $db = new Database('pigbudget', 'localhost', 'root', 'cinguifields');
            $db->executeQuery("insert into usuario_meta(cod_usuario,descripcion_ma,monto_ma,fecha_ini) VALUES ($object->codUsuario,'$object->descripcionma',$object->montoma, sysdate())");
        }
    }
?>