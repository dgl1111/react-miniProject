-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        8.0.39 - MySQL Community Server - GPL
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- sns 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `sns` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sns`;

-- 테이블 sns.tbl_feed 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_feed` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `favorite` int DEFAULT '0',
  `cdatetime` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 sns.tbl_feed:~9 rows (대략적) 내보내기
INSERT INTO `tbl_feed` (`id`, `email`, `content`, `favorite`, `cdatetime`) VALUES
	(33, 'shin@gmail.com', '날씨 좋다', NULL, '2024-10-30 08:44:49'),
	(34, 'shin@gmail.com', '날씨 좋다', NULL, '2024-10-30 08:45:07'),
	(35, 'shin@gmail.com', '날씨 좋다', NULL, '2024-10-30 08:45:17'),
	(36, 'shin@gmail.com', '시원해', NULL, '2024-10-30 08:45:29'),
	(37, 'shin@gmail.com', '시원해', NULL, '2024-10-30 08:45:38'),
	(38, 'shin@gmail.com', '시원해', NULL, '2024-10-30 08:45:47'),
	(39, 'shin@gmail.com', '가을', NULL, '2024-10-30 08:49:41');

-- 테이블 sns.tbl_feed_img 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_feed_img` (
  `img_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `feed_id` varchar(50) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `cdatetime` datetime DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 sns.tbl_feed_img:~7 rows (대략적) 내보내기
INSERT INTO `tbl_feed_img` (`img_path`, `feed_id`, `id`, `cdatetime`) VALUES
	('img\\1730277889719.jfif', '33', 24, '2024-10-30 17:44:50'),
	('img\\1730277907941.jfif', '34', 25, '2024-10-30 17:45:08'),
	('img\\1730277917496.jfif', '35', 26, '2024-10-30 17:45:18'),
	('img\\1730277929934.jfif', '36', 27, '2024-10-30 17:45:30'),
	('img\\1730277938295.jfif', '37', 28, '2024-10-30 17:45:38'),
	('img\\1730277947812.jfif', '38', 29, '2024-10-30 17:45:48'),
	('img\\1730278181830.jfif', '39', 30, '2024-10-30 17:49:42');

-- 테이블 sns.tbl_user 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_user` (
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `birth` varchar(50) NOT NULL,
  `userId` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 sns.tbl_user:~1 rows (대략적) 내보내기
INSERT INTO `tbl_user` (`name`, `email`, `password`, `birth`, `userId`) VALUES
	('신짱구', 'shin@gmail.com', '$2b$10$CJjds1WchZGuWqP8Sd2f/eKzg1D8CEh9RG0kWkfVydr.wbAQoDDTa', '19990101', 'shin');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
