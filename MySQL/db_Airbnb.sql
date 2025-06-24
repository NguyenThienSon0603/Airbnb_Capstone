/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `Bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `roomId` int NOT NULL,
  `userId` int NOT NULL,
  `guest_count` int DEFAULT '1',
  `check_in_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `check_out_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `content` varchar(255) DEFAULT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `roomId` (`roomId`),
  KEY `userId` (`userId`),
  CONSTRAINT `Bookings_ibfk_1` FOREIGN KEY (`roomId`) REFERENCES `Rooms` (`roomId`),
  CONSTRAINT `Bookings_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `roomId` int NOT NULL,
  `userId` int NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `roomId` (`roomId`),
  KEY `userId` (`userId`),
  CONSTRAINT `Comments_ibfk_1` FOREIGN KEY (`roomId`) REFERENCES `Rooms` (`roomId`),
  CONSTRAINT `Comments_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Property` (
  `id` int NOT NULL AUTO_INCREMENT,
  `property_name` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `images` varchar(255) DEFAULT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Roles` (
  `roleId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(256) DEFAULT NULL,
  `isAction` tinyint(1) DEFAULT '1',
  `deleteBy` int NOT NULL DEFAULT '0',
  `isDelete` tinyint(1) NOT NULL DEFAULT '0',
  `deleteAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`roleId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Rooms` (
  `roomId` int NOT NULL AUTO_INCREMENT,
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `max_guests` int DEFAULT '2',
  `bedrooms` int DEFAULT '1',
  `beds` int DEFAULT '1',
  `bathrooms` int DEFAULT '1',
  `description` varchar(255) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `wifi` tinyint(1) DEFAULT '1',
  `tivi` tinyint(1) DEFAULT '1',
  `air_conditioner` tinyint(1) DEFAULT '1',
  `kitchen` tinyint(1) DEFAULT '1',
  `images` varchar(255) DEFAULT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`roomId`),
  KEY `id` (`id`),
  CONSTRAINT `Rooms_ibfk_1` FOREIGN KEY (`id`) REFERENCES `Property` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `numberPhone` varchar(255) DEFAULT NULL,
  `birthday` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `roleId` int NOT NULL DEFAULT '2',
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email` (`email`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `Users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `Roles` (`roleId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Bookings` (`id`, `roomId`, `userId`, `guest_count`, `check_in_date`, `check_out_date`, `content`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(6, 1, 7, 2, '2025-06-15 00:00:00', '2025-06-17 00:00:00', 'Vacation trip', 0, 0, NULL, '2025-06-12 02:21:19', '2025-06-12 02:21:19');
INSERT INTO `Bookings` (`id`, `roomId`, `userId`, `guest_count`, `check_in_date`, `check_out_date`, `content`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(7, 2, 8, 4, '2025-07-01 00:00:00', '2025-07-05 00:00:00', 'Family retreat', 0, 0, NULL, '2025-06-12 02:21:19', '2025-06-12 02:21:19');
INSERT INTO `Bookings` (`id`, `roomId`, `userId`, `guest_count`, `check_in_date`, `check_out_date`, `content`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(8, 3, 7, 1, '2025-06-20 00:00:00', '2025-06-22 00:00:00', 'Business stay', 0, 0, NULL, '2025-06-12 02:21:19', '2025-06-12 02:21:19');
INSERT INTO `Bookings` (`id`, `roomId`, `userId`, `guest_count`, `check_in_date`, `check_out_date`, `content`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(9, 4, 9, 3, '2025-08-10 00:00:00', '2025-08-12 00:00:00', 'Relaxing weekend', 0, 0, NULL, '2025-06-12 02:21:19', '2025-06-12 02:21:19'),
(10, 5, 10, 2, '2025-06-18 00:00:00', '2025-06-21 00:00:00', 'City escape', 0, 0, NULL, '2025-06-12 02:21:19', '2025-06-12 02:21:19');

INSERT INTO `Comments` (`id`, `roomId`, `userId`, `content`, `rating`, `date`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(11, 1, 6, 'Amazing view and clean room!', 5, '2025-06-12 02:20:48', 0, 0, NULL, '2025-06-12 02:20:48', '2025-06-12 02:20:48');
INSERT INTO `Comments` (`id`, `roomId`, `userId`, `content`, `rating`, `date`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(12, 2, 7, 'Very relaxing and spacious.', 4, '2025-06-12 02:20:48', 0, 0, NULL, '2025-06-12 02:20:48', '2025-06-12 02:20:48');
INSERT INTO `Comments` (`id`, `roomId`, `userId`, `content`, `rating`, `date`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(13, 3, 8, 'Good value for the price.', 3, '2025-06-12 02:20:48', 0, 0, NULL, '2025-06-12 02:20:48', '2025-06-12 02:20:48');
INSERT INTO `Comments` (`id`, `roomId`, `userId`, `content`, `rating`, `date`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(14, 4, 9, 'Nice location, but room was small.', 3, '2025-06-12 02:20:48', 0, 0, NULL, '2025-06-12 02:20:48', '2025-06-12 02:20:48'),
(15, 5, 10, 'Fantastic service and location!', 5, '2025-06-12 02:20:48', 0, 0, NULL, '2025-06-12 02:20:48', '2025-06-12 02:20:48');

INSERT INTO `Property` (`id`, `property_name`, `address`, `city`, `country`, `images`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'Sunset Hotel', '123 Beach Rd', 'Los Angeles', 'USA', 'sunset.jpg', 0, 0, NULL, '2025-06-12 02:18:15', '2025-06-12 02:18:15');
INSERT INTO `Property` (`id`, `property_name`, `address`, `city`, `country`, `images`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(2, 'Mountain View Resort', '456 Hill St', 'Denver', 'USA', 'mountain.jpg', 0, 0, NULL, '2025-06-12 02:18:15', '2025-06-12 02:18:15');
INSERT INTO `Property` (`id`, `property_name`, `address`, `city`, `country`, `images`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(3, 'Ocean Breeze Motel', '789 Ocean Ave', 'Miami', 'USA', 'ocean.jpg', 0, 0, NULL, '2025-06-12 02:18:15', '2025-06-12 02:18:15');
INSERT INTO `Property` (`id`, `property_name`, `address`, `city`, `country`, `images`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(4, 'Lakeside Inn', '321 Lake Rd', 'Seattle', 'USA', 'lake.jpg', 0, 0, NULL, '2025-06-12 02:18:15', '2025-06-12 02:18:15'),
(5, 'Sky Tower Hotel', '654 Sky Blvd', 'New York', 'USA', 'sky.jpg', 0, 0, NULL, '2025-06-12 02:18:15', '2025-06-12 02:18:15'),
(6, 'Sunset Hotel', '123 Beach Rd', 'Los Angeles', 'USA', 'sunset.jpg', 0, 0, NULL, '2025-06-12 02:19:17', '2025-06-12 02:19:17'),
(7, 'Mountain View Resort', '456 Hill St', 'Denver', 'USA', 'mountain.jpg', 0, 0, NULL, '2025-06-12 02:19:17', '2025-06-12 02:19:17'),
(8, 'Ocean Breeze Motel', '789 Ocean Ave', 'Miami', 'USA', 'ocean.jpg', 0, 0, NULL, '2025-06-12 02:19:17', '2025-06-12 02:19:17'),
(9, 'Lakeside Inn', '321 Lake Rd', 'Seattle', 'USA', 'lake.jpg', 0, 0, NULL, '2025-06-12 02:19:17', '2025-06-12 02:19:17'),
(10, 'Sky Tower Hotel', '654 Sky Blvd', 'New York', 'USA', 'sky.jpg', 0, 0, NULL, '2025-06-12 02:19:17', '2025-06-12 02:19:17');

INSERT INTO `Roles` (`roleId`, `name`, `description`, `isAction`, `deleteBy`, `isDelete`, `deleteAt`, `createAt`, `updateAt`) VALUES
(1, 'ROLE_ADMIN', 'Quản Trị Hệ Thống', 1, 0, 0, '2025-06-12 01:32:56', '2025-06-12 01:32:56', '2025-06-12 01:32:56');
INSERT INTO `Roles` (`roleId`, `name`, `description`, `isAction`, `deleteBy`, `isDelete`, `deleteAt`, `createAt`, `updateAt`) VALUES
(2, 'ROLE_USER', 'Người Dùng Hệ Thống', 1, 0, 0, '2025-06-12 01:32:56', '2025-06-12 01:32:56', '2025-06-12 01:32:56');


INSERT INTO `Rooms` (`roomId`, `id`, `name`, `max_guests`, `bedrooms`, `beds`, `bathrooms`, `description`, `price`, `wifi`, `tivi`, `air_conditioner`, `kitchen`, `images`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Deluxe Ocean View', 2, 1, 1, 1, 'Nice view room with balcony', 150, 1, 1, 1, 1, 'room1.jpg', 0, 0, NULL, '2025-06-12 02:18:15', '2025-06-12 02:18:15');
INSERT INTO `Rooms` (`roomId`, `id`, `name`, `max_guests`, `bedrooms`, `beds`, `bathrooms`, `description`, `price`, `wifi`, `tivi`, `air_conditioner`, `kitchen`, `images`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(2, 2, 'Mountain Suite', 4, 2, 2, 2, 'Cozy suite with mountain view', 200, 1, 1, 1, 1, 'room2.jpg', 0, 0, NULL, '2025-06-12 02:18:15', '2025-06-12 02:18:15');
INSERT INTO `Rooms` (`roomId`, `id`, `name`, `max_guests`, `bedrooms`, `beds`, `bathrooms`, `description`, `price`, `wifi`, `tivi`, `air_conditioner`, `kitchen`, `images`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(3, 3, 'Economy Room', 2, 1, 1, 1, 'Affordable room for travelers', 80, 1, 0, 1, 0, 'room3.jpg', 0, 0, NULL, '2025-06-12 02:18:15', '2025-06-12 02:18:15');
INSERT INTO `Rooms` (`roomId`, `id`, `name`, `max_guests`, `bedrooms`, `beds`, `bathrooms`, `description`, `price`, `wifi`, `tivi`, `air_conditioner`, `kitchen`, `images`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(4, 4, 'Lakeside Room', 3, 1, 2, 1, 'Peaceful room near lake', 120, 1, 1, 1, 1, 'room4.jpg', 0, 0, NULL, '2025-06-12 02:18:15', '2025-06-12 02:18:15'),
(5, 5, 'Skyline Penthouse', 5, 3, 3, 2, 'Luxury penthouse with city view', 300, 1, 1, 1, 1, 'room5.jpg', 0, 0, NULL, '2025-06-12 02:18:15', '2025-06-12 02:18:15'),
(6, 1, 'Deluxe Ocean View', 2, 1, 1, 1, 'Nice view room with balcony', 150, 1, 1, 1, 1, 'room1.jpg', 0, 0, NULL, '2025-06-12 02:19:34', '2025-06-12 02:19:34'),
(7, 2, 'Mountain Suite', 4, 2, 2, 2, 'Cozy suite with mountain view', 200, 1, 1, 1, 1, 'room2.jpg', 0, 0, NULL, '2025-06-12 02:19:34', '2025-06-12 02:19:34'),
(8, 3, 'Economy Room', 2, 1, 1, 1, 'Affordable room for travelers', 80, 1, 0, 1, 0, 'room3.jpg', 0, 0, NULL, '2025-06-12 02:19:34', '2025-06-12 02:19:34'),
(9, 4, 'Lakeside Room', 3, 1, 2, 1, 'Peaceful room near lake', 120, 1, 1, 1, 1, 'room4.jpg', 0, 0, NULL, '2025-06-12 02:19:34', '2025-06-12 02:19:34'),
(10, 5, 'Skyline Penthouse', 5, 3, 3, 2, 'Luxury penthouse with city view', 300, 1, 1, 1, 1, 'room5.jpg', 0, 0, NULL, '2025-06-12 02:19:34', '2025-06-12 02:19:34');

INSERT INTO `Users` (`userId`, `fullName`, `email`, `password`, `numberPhone`, `birthday`, `gender`, `avatar`, `roleId`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(6, 'John Doe', 'john@example.com', 'hashed_password1', '1234567890', '1990-01-01', 'male', 'avatar1.jpg', 1, 0, 0, NULL, '2025-06-12 02:18:53', '2025-06-12 02:18:53');
INSERT INTO `Users` (`userId`, `fullName`, `email`, `password`, `numberPhone`, `birthday`, `gender`, `avatar`, `roleId`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(7, 'Jane Smith', 'jane@example.com', 'hashed_password2', '0987654321', '1992-05-10', 'female', 'avatar2.jpg', 2, 0, 0, NULL, '2025-06-12 02:18:53', '2025-06-12 02:18:53');
INSERT INTO `Users` (`userId`, `fullName`, `email`, `password`, `numberPhone`, `birthday`, `gender`, `avatar`, `roleId`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(8, 'Mike Lee', 'mike@example.com', 'hashed_password3', '1112223333', '1995-08-20', 'male', 'avatar3.jpg', 2, 0, 0, NULL, '2025-06-12 02:18:53', '2025-06-12 02:18:53');
INSERT INTO `Users` (`userId`, `fullName`, `email`, `password`, `numberPhone`, `birthday`, `gender`, `avatar`, `roleId`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(9, 'Anna Kim', 'anna@example.com', 'hashed_password4', '4445556666', '1998-12-12', 'female', 'avatar4.jpg', 2, 0, 0, NULL, '2025-06-12 02:18:53', '2025-06-12 02:18:53'),
(10, 'Tom Nguyen', 'tom@example.com', 'hashed_password5', '7778889999', '1987-03-03', 'male', 'avatar5.jpg', 2, 0, 0, NULL, '2025-06-12 02:18:53', '2025-06-12 02:18:53');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;