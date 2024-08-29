-- MySQL Script generated by MySQL Workbench
-- Wed Aug 28 22:12:27 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema MyCloud1
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema MyCloud1
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `MyCloud1` DEFAULT CHARACTER SET utf8 ;
USE `MyCloud1` ;

-- -----------------------------------------------------
-- Table `MyCloud1`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MyCloud1`.`user` (
  `iduser` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`iduser`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MyCloud1`.`storageData`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MyCloud1`.`storageData` (
  `idstorageData` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `isDir` INT NOT NULL,
  `parentDir` VARCHAR(45) NULL,
  `user_iduser` INT NOT NULL,
  PRIMARY KEY (`idstorageData`),
  INDEX `fk_storageData_user_idx` (`user_iduser` ASC),
  CONSTRAINT `fk_storageData_user`
    FOREIGN KEY (`user_iduser`)
    REFERENCES `MyCloud1`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
