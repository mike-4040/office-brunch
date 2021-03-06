-- MySQL Workbench Synchronization
-- Generated: 2020-02-13 10:34
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: Mikhail Kravtsov

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

ALTER TABLE `Users` 
DROP FOREIGN KEY `fk_Users_Companies`;

ALTER TABLE `Companies` 
CHANGE COLUMN `id` `org_id` INT(11) NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `companyName` `org_name` VARCHAR(255) NULL DEFAULT NULL ,
 RENAME TO  `org` ;

ALTER TABLE `Users` 
CHANGE COLUMN `id` `user_id` INT(11) NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `firstName` `first_name` VARCHAR(255) NULL DEFAULT NULL ,
CHANGE COLUMN `lastName` `last_name` VARCHAR(255) NULL DEFAULT NULL ,
CHANGE COLUMN `CompanyId` `org_id` INT(11) NULL DEFAULT NULL ,
DROP INDEX `fk_Users_Companies`,
RENAME TO `user` ;

ALTER TABLE `user` 
ADD CONSTRAINT `fk_user_org`
  FOREIGN KEY (`org_id`)
  REFERENCES `org` (`org_id`)
  ON DELETE RESTRICT
  ON UPDATE CASCADE;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
