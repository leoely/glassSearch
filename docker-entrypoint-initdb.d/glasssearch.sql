-- Adminer 4.8.1 MySQL 8.0.32 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `path_count`;
CREATE TABLE `path_count` (
  `count` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `path_count` (`count`) VALUES
(1);

DROP TABLE IF EXISTS `paths`;
CREATE TABLE `paths` (
  `id` bigint NOT NULL,
  `path` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `paths` (`id`, `path`) VALUES
(0,	'/introduce');

DROP TABLE IF EXISTS `word_count`;
CREATE TABLE `word_count` (
  `count` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `word_count` (`count`) VALUES
(2);

DROP TABLE IF EXISTS `words`;
CREATE TABLE `words` (
  `id` bigint NOT NULL,
  `word` varchar(10) DEFAULT NULL,
  `time` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `words` (`id`, `word`, `time`) VALUES
(0,	'hello',	'1'),
(1,	'world',	'1');

-- 2024-05-08 08:57:56
