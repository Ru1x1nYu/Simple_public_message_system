/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50725
 Source Host           : localhost:3306
 Source Schema         : test

 Target Server Type    : MySQL
 Target Server Version : 50725
 File Encoding         : 65001

 Date: 04/05/2019 20:32:34
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments`  (
  `id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `toName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `comment` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `time` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES (1, '小余', '小明', '你老婆可真棒！', '2019-05-01 13:08:25');
INSERT INTO `comments` VALUES (2, '老余', '小明', '你女儿也很棒！', '2019-05-01 13:08:33');
INSERT INTO `comments` VALUES (3, '老王', '小明', '大家都很棒', '2019-05-01 13:08:33');
INSERT INTO `comments` VALUES (4, '小明', '小明', '你们为什么针对我', '2019-05-01 13:08:34');

SET FOREIGN_KEY_CHECKS = 1;
