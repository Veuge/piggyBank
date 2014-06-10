
create database pigbudget;
--ENTIDADES
CREATE TABLE IF NOT EXISTS `pigbudget`.`usuario` (
  `cod_usuario` INT NOT NULL AUTO_INCREMENT,
  `nombre_usuario` VARCHAR(100) NOT NULL ,
  `email_usuario` VARCHAR(100) NOT NULL ,
  PRIMARY KEY (`cod_usuario`)
)
ENGINE = InnoDB

CREATE TABLE IF NOT EXISTS `pigbudget`.`ingreso` (
  `cod_i` INT NOT NULL AUTO_INCREMENT,
  `nombre_i` VARCHAR(100) NOT NULL ,
  `descripcion_i` VARCHAR(100) NOT NULL ,
  PRIMARY KEY (`cod_i`)
)
ENGINE = InnoDB

CREATE TABLE IF NOT EXISTS `pigbudget`.`gasto` (
  `cod_g` INT NOT NULL AUTO_INCREMENT,
  `nombre_g` VARCHAR(100) NOT NULL ,
  `descripcion_g` VARCHAR(100) NOT NULL ,
  PRIMARY KEY (`cod_g`)
)
ENGINE = InnoDB

--RELACIONES
CREATE TABLE IF NOT EXISTS `pigbudget`.`usuario_gasto` (
  `cod_ug` INT NOT NULL AUTO_INCREMENT, 
  `cod_usuario` INT NOT NULL,
  `cod_g` INT NOT NULL,
  `monto_g` FLOAT NOT NULL,
  `fecha_g` date NOT NULL,
  PRIMARY KEY (`cod_ug`)
  FOREIGN KEY (`cod_usuario`) REFERENCES usuario (`cod_usuario`),
  FOREIGN KEY (`cod_g`) REFERENCES gasto (`cod_g`)
)
ENGINE = InnoDB

CREATE TABLE IF NOT EXISTS `pigbudget`.`usuario_ingreso` (
  `cod_ui`INT NOT NULL AUTO_INCREMENT,
  `cod_usuario` INT NOT NULL,
  `cod_i` INT NOT NULL,
  `monto_i` FLOAT NOT NULL,
  `fecha_i` date NOT NULL,
  FOREIGN KEY (`cod_usuario`) REFERENCES usuario (`cod_usuario`),
  FOREIGN KEY (`cod_i`) REFERENCES ingreso (`cod_i`)
)
ENGINE = InnoDB

CREATE TABLE IF NOT EXISTS `pigbudget`.`usuario_meta` (
  `cod_um` INT NOT NULL,
  `cod_usuario` INT NOT NULL,
  `descripcion_ma` VARCHAR(45) NOT NULL,
  `monto_ma` FLOAT NOT NULL,
  `fecha_ini` DATE NOT NULL,
  `fecha_fin` DATE,
  PRIMARY KEY (`cod_um`),
  FOREIGN KEY (`cod_usuario`) REFERENCES usuario (`cod_usuario`),
  FOREIGN KEY (`cod_ma`) REFERENCES meta_ahorro (`cod_ma`)
)
ENGINE = InnoDB

CREATE TABLE IF NOT EXISTS `pigbudget`.`usuario_ahorro` (
  `cod_ua` INT NOT NULL,
  `cod_usuario` INT NOT NULL,
  `monto_a` FLOAT NOT NULL,
  `fecha_a` DATE NOT NULL,
  PRIMARY KEY (`cod_ua`),
  FOREIGN KEY (`cod_usuario`) REFERENCES usuario (`cod_usuario`)
)
ENGINE = InnoDB