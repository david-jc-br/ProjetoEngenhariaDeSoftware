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
-- -----------------------------------------------------
-- Schema teamdevop
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema teamdevop
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `teamdevop` DEFAULT CHARACTER SET utf8mb4 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Pessoa`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Pessoa` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Pessoa` (
  `idPessoa` INT NOT NULL AUTO_INCREMENT,
  `Nome Completo` VARCHAR(45) NOT NULL,
  `CPF` INT(11) NOT NULL,
  `Endereço` VARCHAR(45) NOT NULL,
  `Telefone` INT(13) NOT NULL,
  `E-mail` VARCHAR(45) NOT NULL,
  `Sexo` VARCHAR(45) NOT NULL,
  `Data de Nascimento` DATETIME NOT NULL,
  PRIMARY KEY (`idPessoa`))
ENGINE = InnoDB;

USE `teamdevop` ;

-- -----------------------------------------------------
-- Table `teamdevop`.`Veiculo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `teamdevop`.`Veiculo` ;

CREATE TABLE IF NOT EXISTS `teamdevop`.`Veiculo` (
  `idVeiculo` INT(11) NOT NULL,
  `Placa` VARCHAR(7) NOT NULL,
  `Renavam` INT(11) NOT NULL,
  `Modelo` VARCHAR(45) NOT NULL,
  `Cor` VARCHAR(45) NOT NULL,
  `Chassi` INT(11) NOT NULL,
  `Motor` VARCHAR(45) NOT NULL,
  `Combustivel` VARCHAR(45) NOT NULL,
  `Valor Diaria` DOUBLE NOT NULL,
  `Alugado ou Não` TINYINT NOT NULL,
  PRIMARY KEY (`idVeiculo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `teamdevop`.`Cliente`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `teamdevop`.`Cliente` ;

CREATE TABLE IF NOT EXISTS `teamdevop`.`Cliente` (
  `idCliente` INT(11) NOT NULL,
  `CNH` INT(11) NOT NULL,
  `Pessoa_idPessoa` INT NOT NULL,
  PRIMARY KEY (`idCliente`, `Pessoa_idPessoa`),
  CONSTRAINT `fk_Cliente_Pessoa1`
    FOREIGN KEY (`Pessoa_idPessoa`)
    REFERENCES `mydb`.`Pessoa` (`idPessoa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE INDEX `fk_Cliente_Pessoa1_idx` ON `teamdevop`.`Cliente` (`Pessoa_idPessoa` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `teamdevop`.`Funcionario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `teamdevop`.`Funcionario` ;

CREATE TABLE IF NOT EXISTS `teamdevop`.`Funcionario` (
  `idFuncionario` INT(11) NOT NULL AUTO_INCREMENT,
  `Função` VARCHAR(45) NOT NULL,
  `Pessoa_idPessoa` INT NOT NULL,
  PRIMARY KEY (`idFuncionario`, `Pessoa_idPessoa`),
  CONSTRAINT `fk_Funcionario_Pessoa1`
    FOREIGN KEY (`Pessoa_idPessoa`)
    REFERENCES `mydb`.`Pessoa` (`idPessoa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE INDEX `fk_Funcionario_Pessoa1_idx` ON `teamdevop`.`Funcionario` (`Pessoa_idPessoa` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `teamdevop`.`Aluguel`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `teamdevop`.`Aluguel` ;

CREATE TABLE IF NOT EXISTS `teamdevop`.`Aluguel` (
  `codLocação` INT(11) NOT NULL,
  `dataDeInicio` DATETIME NOT NULL,
  `dataDeFim` DATETIME NOT NULL,
  `Veiculo_idVeiculo` INT(11) NOT NULL,
  `Cliente_idCliente` INT(11) NOT NULL,
  `Funcionario_idFuncionario` INT(11) NOT NULL,
  `Funcionario_Pessoa_idPessoa` INT NULL,
  PRIMARY KEY (`codLocação`, `Veiculo_idVeiculo`, `Cliente_idCliente`),
  CONSTRAINT `fk_Aluguel_Veiculo1`
    FOREIGN KEY (`Veiculo_idVeiculo`)
    REFERENCES `teamdevop`.`Veiculo` (`idVeiculo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Aluguel_Cliente1`
    FOREIGN KEY (`Cliente_idCliente`)
    REFERENCES `teamdevop`.`Cliente` (`idCliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Aluguel_Funcionario1`
    FOREIGN KEY (`Funcionario_idFuncionario` , `Funcionario_Pessoa_idPessoa`)
    REFERENCES `teamdevop`.`Funcionario` (`idFuncionario` , `Pessoa_idPessoa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE INDEX `fk_Aluguel_Veiculo1_idx` ON `teamdevop`.`Aluguel` (`Veiculo_idVeiculo` ASC) VISIBLE;

CREATE INDEX `fk_Aluguel_Cliente1_idx` ON `teamdevop`.`Aluguel` (`Cliente_idCliente` ASC) VISIBLE;

CREATE INDEX `fk_Aluguel_Funcionario1_idx` ON `teamdevop`.`Aluguel` (`Funcionario_idFuncionario` ASC, `Funcionario_Pessoa_idPessoa` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `teamdevop`.`Login`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `teamdevop`.`Login` ;

CREATE TABLE IF NOT EXISTS `teamdevop`.`Login` (
  `E-mail` VARCHAR(45) NOT NULL,
  `Senha` VARCHAR(45) NOT NULL,
  `Tipo de Usuario` TINYINT NOT NULL,
  `Funcionario_idFuncionario` INT(11) NOT NULL,
  `Funcionario_Pessoa_idPessoa` INT NOT NULL,
  `Cliente_idCliente` INT(11) NOT NULL,
  `Cliente_Pessoa_idPessoa` INT NOT NULL,
  PRIMARY KEY (`E-mail`, `Funcionario_idFuncionario`, `Funcionario_Pessoa_idPessoa`, `Cliente_idCliente`, `Cliente_Pessoa_idPessoa`),
  CONSTRAINT `fk_Login_Funcionario1`
    FOREIGN KEY (`Funcionario_idFuncionario` , `Funcionario_Pessoa_idPessoa`)
    REFERENCES `teamdevop`.`Funcionario` (`idFuncionario` , `Pessoa_idPessoa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Login_Cliente1`
    FOREIGN KEY (`Cliente_idCliente` , `Cliente_Pessoa_idPessoa`)
    REFERENCES `teamdevop`.`Cliente` (`idCliente` , `Pessoa_idPessoa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE INDEX `fk_Login_Funcionario1_idx` ON `teamdevop`.`Login` (`Funcionario_idFuncionario` ASC, `Funcionario_Pessoa_idPessoa` ASC) VISIBLE;

CREATE INDEX `fk_Login_Cliente1_idx` ON `teamdevop`.`Login` (`Cliente_idCliente` ASC, `Cliente_Pessoa_idPessoa` ASC) VISIBLE;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;