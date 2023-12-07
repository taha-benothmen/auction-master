-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 07, 2023 at 07:45 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `auction-db`
--

-- --------------------------------------------------------

--
-- Table structure for table `addresses_1`
--

CREATE TABLE `addresses_1` (
  `postal_code` varchar(16) NOT NULL,
  `country` varchar(128) NOT NULL,
  `city` varchar(128) DEFAULT NULL,
  `province` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `addresses_1`
--

INSERT INTO `addresses_1` (`postal_code`, `country`, `city`, `province`) VALUES
('60404', 'USA', 'Champaign', 'Illinois'),
('V6T 0B4', 'Canada', 'Vancouver', 'British Columbia'),
('V6T 1X1', 'Canada', 'Vancouver', 'British Columbia'),
('V6T 1Z1', 'Canada', 'Vancouver', 'British Columbia'),
('V6T 1Z2', 'Canada', 'Vancouver', 'British Columbia'),
('V6T 1Z4', 'Canada', 'Vancouver', 'British Columbia');

-- --------------------------------------------------------

--
-- Table structure for table `addresses_main`
--

CREATE TABLE `addresses_main` (
  `street_address` varchar(128) NOT NULL,
  `postal_code` varchar(16) NOT NULL,
  `country` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `addresses_main`
--

INSERT INTO `addresses_main` (`street_address`, `postal_code`, `country`) VALUES
('1102 Hamilton St', '60404', 'USA'),
('1935 Lower Mall', 'V6T 1X1', 'Canada'),
('2075 West Mall', 'V6T 1Z2', 'Canada'),
('2205 East St', '60404', 'USA'),
('2205 Lower Mall', 'V6T 0B4', 'Canada'),
('2205 Lower Mall', 'V6T 1Z4', 'Canada'),
('2205 West St', '60404', 'USA'),
('5960 Student Union Blvd', 'V6T 1Z1', 'Canada'),
('6088 Walter Gage Rd', 'V6T 0B4', 'Canada'),
('6363 Agronomy Rd', 'V6T 1Z4', 'Canada');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `cid` int(11) NOT NULL,
  `username` varchar(32) NOT NULL,
  `lid` int(11) NOT NULL,
  `content` varchar(1024) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`cid`, `username`, `lid`, `content`) VALUES
(12, 'marwa.bouteraa@soprahr.com', 21, 'Salut');

-- --------------------------------------------------------

--
-- Table structure for table `contains`
--

CREATE TABLE `contains` (
  `res_name` varchar(128) NOT NULL,
  `school_name` varchar(128) NOT NULL,
  `type` varchar(128) NOT NULL,
  `price` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contains`
--

INSERT INTO `contains` (`res_name`, `school_name`, `type`, `price`) VALUES
('Brock Commons', 'Technologie', 'Four Bedroom', 1000),
('Brock Commons', 'Technologie', 'One Bedroom', 1000),
('Brock Commons', 'Technologie', 'Shared Room', 1000),
('Brock Commons', 'Technologie', 'Single Connected', 1000),
('Brock Commons', 'Technologie', 'Six Bedroom', 1000),
('Brock Commons', 'Technologie', 'Studio', 1200),
('Brock Commons', 'Technologie', 'Townhouse', 1000),
('Brock Commons', 'Technologie', 'Two Bedroom', 1000),
('Exchange Student Residence', 'Technologie', 'Four Bedroom', 1000),
('Hopkins Hall', 'Produit de luxe', 'One Bedroom', 200),
('Hopkins Hall', 'Produit de luxe', 'Single Connected', 196),
('Marine Drive Residence', 'Technologie', 'Four Bedroom', 1200),
('Marine Drive Residence', 'Technologie', 'One Bedroom', 1200),
('Marine Drive Residence', 'Technologie', 'Shared Room', 1200),
('Marine Drive Residence', 'Technologie', 'Single Connected', 1200),
('Marine Drive Residence', 'Technologie', 'Six Bedroom', 1200),
('Marine Drive Residence', 'Technologie', 'Studio', 1200),
('Marine Drive Residence', 'Technologie', 'Townhouse', 1200),
('Marine Drive Residence', 'Technologie', 'Two Bedroom', 1200),
('Nugent Hall', 'Produit de luxe', 'Shared Room', 1200),
('Orchard Commons', 'Technologie', 'Shared Room', 650),
('Place Vanier', 'Technologie', 'Studio', 1200),
('Ponderosa Commons', 'Technologie', 'Four Bedroom', 1200),
('Totem Park', 'Technologie', 'Studio', 900),
('Wassaja Hall', 'Produit de luxe', 'Shared Room', 1200);

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `lid` int(11) NOT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`lid`, `quantity`) VALUES
(19, 0),
(21, 0),
(22, 0),
(23, 0);

-- --------------------------------------------------------

--
-- Table structure for table `listings`
--

CREATE TABLE `listings` (
  `lid` int(11) NOT NULL,
  `username` varchar(32) NOT NULL,
  `description` varchar(1024) DEFAULT NULL,
  `name` varchar(128) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `image` varchar(64) DEFAULT 'default.jpg',
  `theme` varchar(255) DEFAULT NULL,
  `end_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `listings`
--

INSERT INTO `listings` (`lid`, `username`, `description`, `name`, `price`, `image`, `theme`, `end_date`) VALUES
(19, 'test@soprahr.com', 'test', 'TEL', 340, '60616b28c4cd2418c45f2153504d122d', 'Electronique', '2023-12-06 18:45:51'),
(21, 'chaima.benothmen@soprahr.com', 'neuf', 'Sport', 400, '0b282147d8ba0084ffe302ae05729bd1', 'Sport', '2023-12-08 18:45:51'),
(22, 'jamila@soprahr.com', 'NEUF', 'TEST', 301, 'ef8758700c7ce17f2783972bd828e52a', 'Sport', '2023-12-08 18:45:51'),
(23, 'chaima.benothmen@soprahr.com', 'hqkdsjfhskjqsfhs', 'Ashref', 1200, '4591ec29906643fb43162438920f6ce2', 'Voitures', '2023-12-10 19:44:00');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `sid` varchar(32) NOT NULL,
  `rid` varchar(32) NOT NULL,
  `mid` varchar(36) NOT NULL DEFAULT uuid(),
  `time_sent` timestamp NULL DEFAULT current_timestamp(),
  `content` varchar(512) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `nid` int(11) NOT NULL,
  `username` varchar(32) NOT NULL,
  `content` varchar(128) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT current_timestamp(),
  `title` varchar(64) DEFAULT 'Generic Notification'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`nid`, `username`, `content`, `created_date`, `title`) VALUES
(40, 'test@soprahr.com', 'Welcome back test@soprahr.com', '2023-12-07 04:53:14', 'Welcome to the app!'),
(44, 'marwa.bouteraa@soprahr.com', 'Welcome back marwa.bouteraa@soprahr.com', '2023-12-07 05:37:01', 'Welcome to the app!'),
(45, 'marwa.bouteraa@soprahr.com', 'Welcome back marwa.bouteraa@soprahr.com', '2023-12-07 05:41:06', 'Welcome to the app!'),
(46, 'chaima.benothmen@soprahr.com', 'Welcome back chaima.benothmen@soprahr.com', '2023-12-07 05:43:18', 'Welcome to the app!'),
(47, 'marwa.bouteraa@soprahr.com', 'Welcome back marwa.bouteraa@soprahr.com', '2023-12-07 05:49:02', 'Welcome to the app!'),
(48, 'chaima.benothmen@soprahr.com', 'The bid price for your post Sport has been updated to 400TND BY marwa.bouteraa@soprahr.com.', '2023-12-07 05:49:24', 'Bid price updated!'),
(49, 'chaima.benothmen@soprahr.com', 'Your post Sport has a new comment!', '2023-12-07 05:50:04', 'You have a new comment!'),
(50, 'chaima.benothmen@soprahr.com', 'Welcome back chaima.benothmen@soprahr.com', '2023-12-07 05:50:48', 'Welcome to the app!'),
(51, 'chaima.benothmen@soprahr.com', 'Welcome back chaima.benothmen@soprahr.com', '2023-12-07 07:38:30', 'Welcome to the app!'),
(52, 'chaima.benothmen@soprahr.com', 'Welcome back chaima.benothmen@soprahr.com', '2023-12-07 08:03:17', 'Welcome to the app!'),
(53, 'chaima.benothmen@soprahr.com', 'Welcome back chaima.benothmen@soprahr.com', '2023-12-07 08:05:08', 'Welcome to the app!'),
(54, 'chaima.benothmen@soprahr.com', 'Welcome back chaima.benothmen@soprahr.com', '2023-12-07 08:10:27', 'Welcome to the app!'),
(55, 'jamila@soprahr.com', 'Welcome back jamila@soprahr.com', '2023-12-07 08:10:58', 'Welcome to the app!'),
(56, 'jamila@soprahr.com', 'The bid price for your post TEST has been updated to 301TND BY jamila@soprahr.com.', '2023-12-07 08:14:52', 'Bid price updated!'),
(57, 'jamila@soprahr.com', 'Welcome back jamila@soprahr.com', '2023-12-07 08:30:03', 'Welcome to the app!'),
(58, 'chaima.benothmen@soprahr.com', 'Welcome back chaima.benothmen@soprahr.com', '2023-12-07 08:30:16', 'Welcome to the app!'),
(59, 'test@soprahr.com', 'The bid price for your post TEL has been updated to 340TND BY chaima.benothmen@soprahr.com.', '2023-12-07 17:10:42', 'Bid price updated!');

-- --------------------------------------------------------

--
-- Table structure for table `residences`
--

CREATE TABLE `residences` (
  `res_name` varchar(128) NOT NULL,
  `school_name` varchar(128) NOT NULL,
  `street_address` varchar(128) NOT NULL,
  `postal_code` varchar(16) NOT NULL,
  `country` varchar(128) DEFAULT NULL,
  `image` varchar(64) DEFAULT 'default.jpg'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `residences`
--

INSERT INTO `residences` (`res_name`, `school_name`, `street_address`, `postal_code`, `country`, `image`) VALUES
('Brock Commons', 'Technologie', '6088 Walter Gage Rd', 'V6T 0B4', 'Canada', '8201570ad68acc193e66bb228a76784a'),
('Exchange Student Residence', 'Technologie', '5960 Student Union Blvd', 'V6T 1Z1', 'Canada', 'a1a712e4b62114cac2d39e8ca1afbabe'),
('Hopkins Hall', 'Produit de luxe', '2205 East St', '60404', 'USA', '20418c567d3ff6da149b47d9ceb4ef04'),
('Marine Drive Residence', 'Technologie', '2205 Lower Mall', 'V6T 1Z4', 'Canada', 'd856ac5e9ebca90d7a76ba8c84eef6ac'),
('Nugent Hall', 'Produit de luxe', '2205 West St', '60404', 'USA', 'd6111efe09138d7e2403f985a83a12fe'),
('Orchard Commons', 'Technologie', '6363 Agronomy Rd', 'V6T 1Z4', 'Canada', '11f19ce6aadf49dd5febde447598a950'),
('Place Vanier', 'Technologie', '1935 Lower Mall', 'V6T 1X1', 'Canada', 'cb14c9eb4dc4734a6796d86b7dfa7a79'),
('Ponderosa Commons', 'Technologie', '2075 West Mall', 'V6T 1Z2', 'Canada', 'd48a6dca827c7aef1e2d96d33158b550'),
('Totem Park', 'Technologie', '2205 Lower Mall', 'V6T 0B4', 'Canada', '861dd3eec4ff7ea525d41f85915c0839'),
('Wassaja Hall', 'Produit de luxe', '1102 Hamilton St', '60404', 'USA', 'ef8596bb0ced03dc8942f2c2944ee682');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `rid` varchar(36) NOT NULL DEFAULT uuid(),
  `username` varchar(32) NOT NULL,
  `description` varchar(1024) DEFAULT NULL,
  `res_name` varchar(128) NOT NULL,
  `school_name` varchar(128) NOT NULL,
  `rating` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `schools`
--

CREATE TABLE `schools` (
  `school_name` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `schools`
--

INSERT INTO `schools` (`school_name`) VALUES
('Electronique'),
('Produit de luxe'),
('Technologie'),
('Voitures'),
('Voyage');

-- --------------------------------------------------------

--
-- Table structure for table `sublets`
--

CREATE TABLE `sublets` (
  `lid` int(11) NOT NULL,
  `type` varchar(128) NOT NULL,
  `res_name` varchar(128) NOT NULL,
  `school_name` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `unit_types`
--

CREATE TABLE `unit_types` (
  `type` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `unit_types`
--

INSERT INTO `unit_types` (`type`) VALUES
('Four Bedroom'),
('One Bedroom'),
('Shared Room'),
('Single Connected'),
('Six Bedroom'),
('Studio'),
('Townhouse'),
('Two Bedroom');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(32) NOT NULL,
  `password` binary(60) DEFAULT NULL,
  `name` varchar(32) NOT NULL,
  `school_name` varchar(128) NOT NULL DEFAULT 'Voitures',
  `description` varchar(1600) DEFAULT 'Write your description...',
  `IsAdmin` tinyint(1) DEFAULT 0,
  `IsRh` tinyint(1) DEFAULT 0,
  `verified` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`, `name`, `school_name`, `description`, `IsAdmin`, `IsRh`, `verified`) VALUES
('chaima.benothmen@soprahr.com', 0x24326224313024753843546c6d616734557335533071314f696d33524f57732e36474b6c506f6b6435703956716e79782f4b75463759675a714c432e, 'Chaima_Ben_Othmen', 'Voitures', 'Write your description...', 1, 1, 1),
('jamila@soprahr.com', 0x24326224313024754542536c76346763523474323841364977326c50755656575a2f32304354335679432e7279755777565466552f514e3942523232, 'Jamila', 'Voitures', 'Write your description...', 0, 0, 1),
('marwa.bouteraa@soprahr.com', 0x24326224313024485543394a737a30743839542e78664d4f2e78544b4f442e786c564f747672726579394b35647a48565162795175654f594b565643, 'Marwa_Bouteraa', 'Voitures', 'Write your description...', 0, 1, 1),
('safa.bouteraa@soprahr.com', 0x24326224313024415448442e6b615a687263306767426c2f59464c55655673786b5430676c62744a517350304f552f544243493133784c5276537979, 'Safa_Bouteraa', 'Voitures', 'Write your description...', 0, 0, 1),
('salma.selmi@soprahr.com', 0x243262243130246d6d6e366f6d3535674b6f7261316976574e6243392e7466624c756b76316c65442e73743753617041374f45727a32784730372e2e, 'Salma_Selmi', 'Voitures', 'Write your description...', 0, 0, 1),
('test@soprahr.com', 0x24326224313024687931456641654149634f656b614d6e64505757572e354a74586a656774652e7a566358376535322e6f357a62433754355065334f, 'TEST', 'Voitures', 'Write your description...', 1, 0, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addresses_1`
--
ALTER TABLE `addresses_1`
  ADD PRIMARY KEY (`postal_code`,`country`);

--
-- Indexes for table `addresses_main`
--
ALTER TABLE `addresses_main`
  ADD PRIMARY KEY (`street_address`,`postal_code`,`country`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`cid`),
  ADD KEY `username` (`username`),
  ADD KEY `lid` (`lid`);

--
-- Indexes for table `contains`
--
ALTER TABLE `contains`
  ADD PRIMARY KEY (`res_name`,`school_name`,`type`),
  ADD KEY `type` (`type`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`lid`);

--
-- Indexes for table `listings`
--
ALTER TABLE `listings`
  ADD PRIMARY KEY (`lid`),
  ADD KEY `username` (`username`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`sid`,`rid`,`mid`),
  ADD KEY `rid` (`rid`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`nid`),
  ADD KEY `fk_notifications_users` (`username`);

--
-- Indexes for table `residences`
--
ALTER TABLE `residences`
  ADD PRIMARY KEY (`res_name`,`school_name`),
  ADD UNIQUE KEY `address_constraint` (`street_address`,`postal_code`,`country`),
  ADD KEY `school_name` (`school_name`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`rid`),
  ADD KEY `username` (`username`),
  ADD KEY `res_name` (`res_name`,`school_name`);

--
-- Indexes for table `schools`
--
ALTER TABLE `schools`
  ADD PRIMARY KEY (`school_name`);

--
-- Indexes for table `sublets`
--
ALTER TABLE `sublets`
  ADD PRIMARY KEY (`lid`),
  ADD KEY `res_name` (`res_name`,`school_name`,`type`);

--
-- Indexes for table `unit_types`
--
ALTER TABLE `unit_types`
  ADD PRIMARY KEY (`type`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`),
  ADD KEY `school_name` (`school_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `cid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `listings`
--
ALTER TABLE `listings`
  MODIFY `lid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `nid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`lid`) REFERENCES `listings` (`lid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `contains`
--
ALTER TABLE `contains`
  ADD CONSTRAINT `contains_ibfk_1` FOREIGN KEY (`res_name`,`school_name`) REFERENCES `residences` (`res_name`, `school_name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `contains_ibfk_2` FOREIGN KEY (`type`) REFERENCES `unit_types` (`type`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `items_ibfk_1` FOREIGN KEY (`lid`) REFERENCES `listings` (`lid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `listings`
--
ALTER TABLE `listings`
  ADD CONSTRAINT `listings_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sid`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`rid`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `fk_notifications_users` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `residences`
--
ALTER TABLE `residences`
  ADD CONSTRAINT `fk_residences_addresses` FOREIGN KEY (`street_address`,`postal_code`,`country`) REFERENCES `addresses_main` (`street_address`, `postal_code`, `country`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `residences_ibfk_1` FOREIGN KEY (`school_name`) REFERENCES `schools` (`school_name`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`res_name`,`school_name`) REFERENCES `residences` (`res_name`, `school_name`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sublets`
--
ALTER TABLE `sublets`
  ADD CONSTRAINT `sublets_ibfk_1` FOREIGN KEY (`lid`) REFERENCES `listings` (`lid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sublets_ibfk_2` FOREIGN KEY (`res_name`,`school_name`,`type`) REFERENCES `contains` (`res_name`, `school_name`, `type`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`school_name`) REFERENCES `schools` (`school_name`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
