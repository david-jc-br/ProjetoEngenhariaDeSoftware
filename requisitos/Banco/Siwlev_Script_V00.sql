-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
SHOW WARNINGS;
USE `temdevoop` ;

-- -----------------------------------------------------
-- Table `Usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Usuario` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Usuario` (
  `login` VARCHAR(45) NOT NULL,
  `Nome` VARCHAR(45) NOT NULL,
  `Endereco` VARCHAR(45) NOT NULL,
  `cpf` VARCHAR(45) NOT NULL,
  `telefone` VARCHAR(45) NOT NULL,
  `funcao` VARCHAR(45) NOT NULL,
  `e-mail` VARCHAR(45) NOT NULL,
  `nascimento` VARCHAR(45) NOT NULL,
  `sexo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`login`))
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE UNIQUE INDEX `login_UNIQUE` ON `Usuario` (`login` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Comercial`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Comercial` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Comercial` (
  `Usuario_login` VARCHAR(45) NOT NULL,
  `tipoUsuario` VARCHAR(45) NOT NULL,
  `CNH` VARCHAR(45) NOT NULL,
  `desComercial` VARCHAR(45) NOT NULL,
  `Usuario_idUsuario` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`Usuario_login`))
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE UNIQUE INDEX `CNH_UNIQUE` ON `Comercial` (`CNH` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Veiculo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Veiculo` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Veiculo` (
  `idVeiculo` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `cor` VARCHAR(45) NOT NULL,
  `IPVA` VARCHAR(45) NOT NULL,
  `chass` VARCHAR(45) NOT NULL,
  `motor` VARCHAR(45) NOT NULL,
  `combustivel` VARCHAR(45) NOT NULL,
  `tração` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idVeiculo`))
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE UNIQUE INDEX `idVeiculo_UNIQUE` ON `Veiculo` (`idVeiculo` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Alugado`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Alugado` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Alugado` (
  `Comercial_Usuario_login` VARCHAR(45) NOT NULL,
  `Veiculo_idVeiculo` INT NOT NULL,
  `custoDiaria` INT NOT NULL,
  `dataInicial` VARCHAR(45) NOT NULL,
  `Comercial_Usuario_login` VARCHAR(45) NOT NULL)
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE UNIQUE INDEX `Veiculo_idVeiculo_UNIQUE` ON `Alugado` (`Veiculo_idVeiculo` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Gestao`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Gestao` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Gestao` (
  `Usuario_login` VARCHAR(45) NOT NULL,
  `desCargo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Usuario_login`))
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE UNIQUE INDEX `desCargo_UNIQUE` ON `Gestao` (`desCargo` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Baixado`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Baixado` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Baixado` (
  `login_Gest` VARCHAR(45) NOT NULL,
  `Veiculo_idVeiculo` INT NOT NULL,
  `descricao` VARCHAR(45) NOT NULL,
  `custoManutecao` DECIMAL UNSIGNED NOT NULL,
  `dataInicial` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Veiculo_idVeiculo`))
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE UNIQUE INDEX `descricao_UNIQUE` ON `Baixado` (`descricao` ASC) VISIBLE;

SHOW WARNINGS;
CREATE UNIQUE INDEX `Veiculo_idVeiculo_UNIQUE` ON `Baixado` (`Veiculo_idVeiculo` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Administador`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Administador` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Administador` (
  `Usuario_login` VARCHAR(45) NOT NULL,
  `desFuncao` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Usuario_login`))
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE UNIQUE INDEX `desFuncao_UNIQUE` ON `Administador` (`desFuncao` ASC) VISIBLE;

SHOW WARNINGS;
CREATE UNIQUE INDEX `Usuario_login_UNIQUE` ON `Administador` (`Usuario_login` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Patrimonial`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Patrimonial` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Patrimonial` (
  `login_Adm` VARCHAR(45) NOT NULL,
  `Veiculo_idVeiculo` INT NOT NULL,
  `Valor` VARCHAR(45) NOT NULL,
  `Data` VARCHAR(45) NOT NULL)
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE UNIQUE INDEX `Veiculo_idVeiculo_UNIQUE` ON `Patrimonial` (`Veiculo_idVeiculo` ASC) VISIBLE;

SHOW WARNINGS;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
