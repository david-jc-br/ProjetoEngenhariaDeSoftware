-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema temdevoop
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `temdevoop` ;

-- -----------------------------------------------------
-- Schema temdevoop
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `temdevoop` ;
SHOW WARNINGS;
USE `temdevoop` ;

-- -----------------------------------------------------
-- Table `Funcionario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Funcionario` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Funcionario` (
  `logFun` VARCHAR(45) NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`logFun`))
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE UNIQUE INDEX `logFun_UNIQUE` ON `Funcionario` (`logFun` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Veiculo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Veiculo` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Veiculo` (
  `idVeiculo` INT NOT NULL AUTO_INCREMENT,
  `nomeVeiculo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idVeiculo`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Cadastra`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Cadastra` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Cadastra` (
  `logFun` VARCHAR(45) NOT NULL,
  `idVeiculo` INT NOT NULL,
  PRIMARY KEY (`idVeiculo`, `logFun`))
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE UNIQUE INDEX `idVeiculo_UNIQUE` ON `Cadastra` (`idVeiculo` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Cliente`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Cliente` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Cliente` (
  `logCli` VARCHAR(45) NOT NULL,
  `nomeCliente` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`logCli`))
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE UNIQUE INDEX `logFun_UNIQUE` ON `Cliente` (`logCli` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Aluga`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Aluga` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Aluga` (
  `logCli` VARCHAR(45) NOT NULL,
  `idVeiculo` INT NOT NULL,
  `valorHoras` INT NOT NULL,
  PRIMARY KEY (`logCli`, `idVeiculo`))
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE UNIQUE INDEX `idVeiculo_UNIQUE` ON `Aluga` (`idVeiculo` ASC) VISIBLE;

SHOW WARNINGS;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
