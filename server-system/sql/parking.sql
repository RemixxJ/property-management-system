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
DROP TABLE IF EXISTS `parking`;
CREATE TABLE `parking` (
  `id` int(11) NOT NULL,
  `isfull` varchar(255) DEFAULT NULL,
  `dz` varchar(255) DEFAULT NULL,
  `usePerson` varchar(255) DEFAULT NULL,
  `dqTime` varchar(255) DEFAULT NULL,
  `lxfs` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
