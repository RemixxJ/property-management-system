/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50719
Source Host           : localhost:3306
Source Database       : exapp

Target Server Type    : MYSQL
Target Server Version : 50719
File Encoding         : 65001

Date: 2020-05-16 17:06:45
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `house`;
CREATE TABLE `house` (
  `id` int(11) NOT NULL,
  `dizhi` varchar(255) DEFAULT NULL,
  `xzStatus` varchar(255) DEFAULT NULL,
  `wxStatus` varchar(255) DEFAULT NULL,
  `qjStatus` varchar(255) DEFAULT NULL,
  `bxInfo` varchar(255) DEFAULT NULL,
  `wximg` varchar(255) DEFAULT NULL,
  `qjimg` varchar(255) DEFAULT NULL,
  `ggqy` varchar(255) DEFAULT NULL,
  `dqTime` varchar(255) DEFAULT NULL,
  `usePerson` varchar(255) DEFAULT NULL,
  `qjPerson` varchar(255) DEFAULT NULL,
  `wxPerson` varchar(255) DEFAULT NULL,

  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
