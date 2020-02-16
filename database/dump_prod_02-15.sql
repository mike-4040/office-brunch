-- MySQL dump 10.13  Distrib 8.0.16, for osx10.14 (x86_64)
--
-- Host: phtfaw4p6a970uc0.cbetxkdyhwsb.us-east-1.rds.amazonaws.com    Database: tebmbk6q1fe8lug8
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `Companies`
--

DROP TABLE IF EXISTS `Companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Companies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `companyName` varchar(255) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Companies`
--

LOCK TABLES `Companies` WRITE;
/*!40000 ALTER TABLE `Companies` DISABLE KEYS */;
INSERT INTO `Companies` VALUES (1,'Company 1',1,0),(2,'Company 2',1,0),(3,'Office Brunch',1,1),(4,'Company 3',1,0),(5,'Company 4',1,0);
/*!40000 ALTER TABLE `Companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `lastName` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `CompanyId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_Users_Companies` (`CompanyId`),
  CONSTRAINT `fk_Users_Companies` FOREIGN KEY (`CompanyId`) REFERENCES `Companies` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (3,'Mike','Kravtsov','mike4041@me.com','$2a$10$NeLv1ATPJT7az0cpkcHpieqJT377vl4MpTxQyr0jInuTQqzl5Z/ue',1),(4,'Mike','Kravtsov ','mike4040@m.com','$2a$10$JSSzB0ISwfJFSeBhxcsjl.WJ7rCsSsiWheV23mszhDyHswUxnmibi',2),(8,'test','test','test@1.com','$2a$10$vy9Px19hmmVa2dXyfq06AuGL9LclAP02cnckjq9vqt9LmyvfLdmcG',1),(9,'1','1','1@1.com','$2a$10$5f49V8QRa4MrPCHGYlXhMO1/bm0xugtLeS.DQgiVS3OyQL3bx7A1G',5),(10,'Mike','kravtsov','mike4040@me.com','$2a$10$/AWTPuGBvQ7rG2lz8F/89ebghJGivamx6UucuVj5Uv6W2A6ZE.LhW',1),(11,'Test','Name','test@gmail.com','$2a$10$MUGlIiR9NHvFdE5aNlOsIuvOmDIf8U8rATf5iIpycG61uOMnB/KUS',4),(13,'Drew','Toropov','andrew.toropov@gmail.com','$2a$10$vOrVnSOtLg5XwX4tcDjVmu4ADezW4ry1Y..7vzVyHykobkQBt29CC',1);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-15 18:12:49
