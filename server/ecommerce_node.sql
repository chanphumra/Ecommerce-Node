-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 20, 2023 at 12:58 PM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce_node`
--

-- --------------------------------------------------------

--
-- Table structure for table `about_us`
--

DROP TABLE IF EXISTS `about_us`;
CREATE TABLE IF NOT EXISTS `about_us` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `email`, `password`, `created_at`, `modified_at`) VALUES
(1, 'admin', 'bazaar.shop.cambodia@gmail.com', 'admin123', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `banner`
--

DROP TABLE IF EXISTS `banner`;
CREATE TABLE IF NOT EXISTS `banner` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL DEFAULT '#',
  `image` varchar(255) NOT NULL,
  `enable` bigint DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
CREATE TABLE IF NOT EXISTS `cart` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `cus_id` bigint UNSIGNED NOT NULL,
  PRIMARY KEY (`id`,`cus_id`),
  KEY `cus_id` (`cus_id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cart_details`
--

DROP TABLE IF EXISTS `cart_details`;
CREATE TABLE IF NOT EXISTS `cart_details` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `cart_id` bigint UNSIGNED NOT NULL,
  `p_id` bigint UNSIGNED NOT NULL,
  `size` varchar(255) DEFAULT 'none',
  `color` varchar(255) DEFAULT 'none',
  `qty` bigint NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `created_at` date DEFAULT NULL,
  `modified_at` date DEFAULT NULL,
  PRIMARY KEY (`id`,`cart_id`,`p_id`),
  KEY `cart_id` (`cart_id`),
  KEY `p_id` (`p_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
CREATE TABLE IF NOT EXISTS `chat` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `senderId` bigint NOT NULL,
  `receiverId` bigint NOT NULL,
  `message` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `chat_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `sender` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
CREATE TABLE IF NOT EXISTS `customer` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `verify` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `last_chat` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `name`, `email`, `password`, `image`, `verify`, `created_at`, `modified_at`, `last_chat`) VALUES
(1, 'Tith Raksa', 'chanphumra2021@gmail.com', '123', 'http://localhost:8000/uploads/customer/image_1679311946202.jpg', '1', '2023-03-20 18:32:26', '2023-03-20 18:33:01', '2023-03-20 18:32:26');

-- --------------------------------------------------------

--
-- Table structure for table `footer`
--

DROP TABLE IF EXISTS `footer`;
CREATE TABLE IF NOT EXISTS `footer` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `text1` varchar(255) DEFAULT NULL,
  `text2` varchar(255) DEFAULT NULL,
  `text3` varchar(255) DEFAULT NULL,
  `text4` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `footer`
--

INSERT INTO `footer` (`id`, `title`, `description`, `text1`, `text2`, `text3`, `text4`, `created_at`, `modified_at`) VALUES
(1, '', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et alias suscipit tenetur voluptate quos mollitia obcaecati numquam soluta iste aliquam!', '', '', '', '', '2023-03-02 20:04:30', '2023-03-03 08:22:12'),
(2, 'PRODUCTS', '', 'Men Fashion', 'Women Fashion', 'Kid & Toy', 'Accessories', '2023-03-02 20:04:40', '2023-03-03 08:22:12'),
(3, 'USEFULL LINKS', '', 'Your account', 'Become our support', 'Shipping Rates', 'Help', '2023-03-02 20:04:47', '2023-03-03 08:22:12'),
(4, 'CONTACT', '', 'Sensok, Phnom Penh', 'bazaar.shop.cambodia@gmail.com', '+855 9650 900 29', '', '2023-03-02 20:04:55', '2023-03-03 08:22:34');

-- --------------------------------------------------------

--
-- Table structure for table `main_category`
--

DROP TABLE IF EXISTS `main_category`;
CREATE TABLE IF NOT EXISTS `main_category` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `main_category`
--

INSERT INTO `main_category` (`id`, `name`, `description`, `image`, `created_at`, `modified_at`) VALUES
(1, 'Men ', 'Men collection', 'http://localhost:8000/uploads/category/image_1677049900342.png', '2023-03-24 18:31:29', '2023-03-24 18:31:34');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `cus_id` bigint UNSIGNED NOT NULL,
  `payment_method` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`cus_id`),
  KEY `cus_id` (`cus_id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
CREATE TABLE IF NOT EXISTS `order_details` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `o_id` bigint UNSIGNED NOT NULL,
  `p_id` bigint UNSIGNED NOT NULL,
  `qty` bigint NOT NULL,
  PRIMARY KEY (`id`,`o_id`,`p_id`),
  KEY `o_id` (`o_id`),
  KEY `p_id` (`p_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `sub_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `sale_price` decimal(10,2) NOT NULL,
  `qty` bigint NOT NULL,
  `discount` decimal(10,2) DEFAULT '0.00',
  `image1` varchar(255) NOT NULL,
  `image2` varchar(255) NOT NULL,
  `image3` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`sub_id`),
  KEY `sub_id` (`sub_id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `sub_id`, `name`, `description`, `price`, `sale_price`, `qty`, `discount`, `image1`, `image2`, `image3`, `created_at`, `modified_at`) VALUES
(1, 1, 'Flame Trippin Men T-Shirt', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem adipisci facilis velit atque et dolores! Similique culpa natus dicta sint', '15.00', '20.00', 100, '5.00', 'http://localhost:8000/uploads/product/images_1677050183382672174632416.png', 'http://localhost:8000/uploads/product/images_1677050183385640089739238.png', 'http://localhost:8000/uploads/product/images_16770501833911161788613848.png', '2023-03-08 20:39:56', '2023-04-03 14:44:49'),
(2, 1, 'Year Of The Tiger Men T-Shirt', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem adipisci facilis velit atque et dolores! Similique culpa natus dicta sint', '20.00', '25.00', 100, '5.00', 'http://localhost:8000/uploads/product/images_1677051962645154137361728.png', 'http://localhost:8000/uploads/product/images_1677051962651694088822133.png', 'http://localhost:8000/uploads/product/images_1677051962656174293284536.png', '2023-03-08 20:40:01', '2023-04-03 14:44:47'),
(3, 1, 'Embroidery Logo Men Plain T-Shirt', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, nisi minima. Accusamus harum laborum quasi facilis temporibus aliquam vel deserunt?', '10.00', '15.00', 100, '10.00', 'http://localhost:8000/uploads/product/images_1677113674579997307615423.png', 'http://localhost:8000/uploads/product/images_1677113674587206872369366.png', 'http://localhost:8000/uploads/product/images_1677113674591420920379644.png', '2023-03-08 20:40:04', '2023-03-20 22:03:01'),
(4, 1, 'Cute Tiger Boba Tea Printed Men T-Shirt ', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, nisi minima. Accusamus harum laborum quasi facilis temporibus aliquam vel deserunt?', '15.00', '17.00', 100, '4.00', 'http://localhost:8000/uploads/product/images_16771145122861177547132123.png', 'http://localhost:8000/uploads/product/images_16771145122921004557650076.png', 'http://localhost:8000/uploads/product/images_1677114512297883851994583.png', '2023-03-08 20:40:08', '2023-03-20 22:03:01'),
(9, 1, 'Embroidery Logo Men Plain T-Shirt', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem adipisci facilis velit atque et dolores! Similique culpa natus dicta sint', '10.00', '15.00', 100, '0.00', 'http://localhost:8000/uploads/product/images_16782830754281675608040406.png', 'http://localhost:8000/uploads/product/images_16782830754341041015534942.png', 'http://localhost:8000/uploads/product/images_16782830754441624458986054.png', '2023-03-08 20:44:35', '2023-03-08 20:44:35'),
(10, 1, 'Essentails Logo Printed Men T-Shirt', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem adipisci facilis velit atque et dolores! Similique culpa natus dicta sint', '12.00', '16.00', 100, '10.00', 'http://localhost:8000/uploads/product/images_16782831808881281118216163.png', 'http://localhost:8000/uploads/product/images_1678283180892168529627976.png', 'http://localhost:8000/uploads/product/images_16782831808951407395147073.png', '2023-03-08 20:46:20', '2023-03-08 20:46:20'),
(11, 1, 'Embroidery Logo Men Plain T-Shirt', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem adipisci facilis velit atque et dolores! Similique culpa natus dicta sint', '12.00', '16.00', 100, '10.00', 'http://localhost:8000/uploads/product/images_16782833577631625487930458.png', 'http://localhost:8000/uploads/product/images_1678283357770233517565535.png', 'http://localhost:8000/uploads/product/images_16782833577761190503563846.png', '2023-03-08 20:49:17', '2023-03-08 20:49:17'),
(12, 1, 'Essentails Logo Printed Men T-Shirt', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem adipisci facilis velit atque et dolores! Similique culpa natus dicta sint', '15.00', '18.00', 100, '0.00', 'http://localhost:8000/uploads/product/images_16782834557331657681842211.png', 'http://localhost:8000/uploads/product/images_1678283455738912118510899.png', 'http://localhost:8000/uploads/product/images_16782834557451299218891447.png', '2023-03-08 20:50:55', '2023-03-08 20:50:55'),
(13, 1, 'Embroidery Logo Men Plain T-Shirt', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem adipisci facilis velit atque et dolores! Similique culpa natus dicta sint', '12.00', '16.00', 100, '10.00', 'http://localhost:8000/uploads/product/images_16782835462091660967686040.png', 'http://localhost:8000/uploads/product/images_1678283546213509645939541.png', 'http://localhost:8000/uploads/product/images_16782835462181268970983140.png', '2023-03-08 20:52:26', '2023-03-08 20:52:26'),
(14, 1, 'Eye Mask Printed Men T-Shirt ', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem adipisci facilis velit atque et dolores! Similique culpa natus dicta sint', '14.00', '17.00', 100, '5.00', 'http://localhost:8000/uploads/product/images_16782836011581445719786321.png', 'http://localhost:8000/uploads/product/images_1678283601161170040144656.png', 'http://localhost:8000/uploads/product/images_1678283601166403590343391.png', '2023-03-08 20:53:21', '2023-03-08 20:53:21'),
(15, 1, 'Eye Mask Printed Men T-Shirt', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem adipisci facilis velit atque et dolores! Similique culpa natus dicta sint', '14.00', '17.00', 100, '5.00', 'http://localhost:8000/uploads/product/images_16782838177871444141174893.png', 'http://localhost:8000/uploads/product/images_1678283817789199877958034.png', 'http://localhost:8000/uploads/product/images_1678283817794570482425690.png', '2023-03-08 20:56:57', '2023-03-20 22:03:01'),
(16, 1, 'Logo Embroidered Raglan Men T-Shirt', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem adipisci facilis velit atque et dolores! Similique culpa natus dicta sint', '20.00', '25.00', 100, '0.00', 'http://localhost:8000/uploads/product/images_1678285315632504066884686.png', 'http://localhost:8000/uploads/product/images_1678285315638138746098892.png', 'http://localhost:8000/uploads/product/images_1678285315643109968594184.png', '2023-03-08 21:21:55', '2023-03-20 22:03:01'),
(22, 2, 'Casual Slim Fit Men Jeans', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem adipisci facilis velit atque et dolores! Similique culpa natus dicta sint', '20.00', '25.00', 100, '0.00', 'http://localhost:8000/uploads/product/images_167828691835395779970990.png', 'http://localhost:8000/uploads/product/images_167828691835643800874102.png', 'http://localhost:8000/uploads/product/images_16782869183581009434934487.png', '2023-03-08 21:48:38', '2023-03-31 21:25:57');

-- --------------------------------------------------------

--
-- Table structure for table `product_color`
--

DROP TABLE IF EXISTS `product_color`;
CREATE TABLE IF NOT EXISTS `product_color` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` date DEFAULT NULL,
  `modified_at` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_details`
--

DROP TABLE IF EXISTS `product_details`;
CREATE TABLE IF NOT EXISTS `product_details` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `p_id` bigint UNSIGNED NOT NULL,
  `color` varchar(255) DEFAULT 'none',
  `size` varchar(255) DEFAULT 'none',
  PRIMARY KEY (`id`,`p_id`) USING BTREE,
  KEY `pid` (`p_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `product_details`
--

INSERT INTO `product_details` (`id`, `p_id`, `color`, `size`) VALUES
(1, 1, 'black', 'none'),
(2, 2, 'red', 'none'),
(3, 3, 'black', 'none'),
(4, 4, 'black', 'none'),
(7, 10, 'red', 'none'),
(8, 11, 'yellow', 'none'),
(9, 12, 'white', 'none'),
(10, 15, 'white', 'none'),
(11, 13, 'blue', 'none'),
(12, 14, 'black', 'none'),
(13, 16, 'none', 'none'),
(15, 22, 'none', 'none'),
(16, 9, 'none', 'none');

-- --------------------------------------------------------

--
-- Table structure for table `product_review`
--

DROP TABLE IF EXISTS `product_review`;
CREATE TABLE IF NOT EXISTS `product_review` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `cus_id` bigint UNSIGNED NOT NULL,
  `p_id` bigint UNSIGNED NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`cus_id`,`p_id`),
  KEY `cus_id` (`cus_id`),
  KEY `p_id` (`p_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_size`
--

DROP TABLE IF EXISTS `product_size`;
CREATE TABLE IF NOT EXISTS `product_size` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `size` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `profile_setting`
--

DROP TABLE IF EXISTS `profile_setting`;
CREATE TABLE IF NOT EXISTS `profile_setting` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `profile_setting`
--

INSERT INTO `profile_setting` (`id`, `name`, `city`, `country`, `phone`, `email`, `image`, `created_at`, `modified_at`) VALUES
(1, 'Bazaar', 'Phnom Penh', 'Cambodia', '+855 9650 900 29', 'bazaar.shop.cambodia@gmail.com', 'http://localhost:8000/uploads/profile/image_1677746231367.png', '2023-03-04 15:06:34', '2023-03-04 15:06:34');

-- --------------------------------------------------------

--
-- Table structure for table `slideshow`
--

DROP TABLE IF EXISTS `slideshow`;
CREATE TABLE IF NOT EXISTS `slideshow` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `text` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL DEFAULT '#',
  `image` varchar(255) NOT NULL,
  `enable` bigint DEFAULT NULL,
  `orders` bigint DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `slideshow`
--

INSERT INTO `slideshow` (`id`, `title`, `text`, `link`, `image`, `enable`, `orders`, `created_at`, `modified_at`) VALUES
(1, 'Happy new year 50% OFF', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem, perferendi', '#', 'http://localhost:8000/uploads/slideshow/image_1677156070455.png', 1, 0, NULL, NULL),
(4, 'Water Festival 35% OFF', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, numquam', '#', 'http://localhost:8000/uploads/slideshow/image_1678265804371.png', 1, 0, NULL, '2023-03-20 18:36:17');

-- --------------------------------------------------------

--
-- Table structure for table `sub_category`
--

DROP TABLE IF EXISTS `sub_category`;
CREATE TABLE IF NOT EXISTS `sub_category` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `main_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`main_id`),
  KEY `main_id` (`main_id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=REDUNDANT;

--
-- Dumping data for table `sub_category`
--

INSERT INTO `sub_category` (`id`, `main_id`, `name`, `description`, `image`, `created_at`, `modified_at`) VALUES
(1, 1, 'T-Shirt', 'T-Shirt for men', 'http://localhost:8000/uploads/category/image_1677049956284.png', '2023-03-24 18:31:53', '2023-03-24 18:31:57'),
(2, 1, 'Jeans', 'Jeans for men', 'http://localhost:8000/uploads/category/image_1678286781440.png', '2023-03-08 21:46:21', '2023-03-08 21:46:21');

-- --------------------------------------------------------

--
-- Table structure for table `verify_account`
--

DROP TABLE IF EXISTS `verify_account`;
CREATE TABLE IF NOT EXISTS `verify_account` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `cus_id` bigint UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `otp` varchar(255) NOT NULL,
  PRIMARY KEY (`id`,`cus_id`) USING BTREE,
  KEY `cus_id` (`cus_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
CREATE TABLE IF NOT EXISTS `wishlist` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `cus_id` bigint UNSIGNED NOT NULL,
  PRIMARY KEY (`id`,`cus_id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wishlist_details`
--

DROP TABLE IF EXISTS `wishlist_details`;
CREATE TABLE IF NOT EXISTS `wishlist_details` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `w_id` bigint UNSIGNED NOT NULL,
  `p_id` bigint UNSIGNED NOT NULL,
  `created_at` date DEFAULT NULL,
  `modified_at` date DEFAULT NULL,
  PRIMARY KEY (`id`,`w_id`,`p_id`),
  KEY `w_id` (`w_id`),
  KEY `p_id` (`p_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`cus_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cart_details`
--
ALTER TABLE `cart_details`
  ADD CONSTRAINT `cart_details_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_details_ibfk_2` FOREIGN KEY (`p_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`cus_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`o_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`p_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`sub_id`) REFERENCES `sub_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_details`
--
ALTER TABLE `product_details`
  ADD CONSTRAINT `product_details_ibfk_1` FOREIGN KEY (`p_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_review`
--
ALTER TABLE `product_review`
  ADD CONSTRAINT `product_review_ibfk_1` FOREIGN KEY (`cus_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_review_ibfk_2` FOREIGN KEY (`p_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sub_category`
--
ALTER TABLE `sub_category`
  ADD CONSTRAINT `sub_category_ibfk_1` FOREIGN KEY (`main_id`) REFERENCES `main_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `verify_account`
--
ALTER TABLE `verify_account`
  ADD CONSTRAINT `verify_account_ibfk_1` FOREIGN KEY (`cus_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `wishlist_details`
--
ALTER TABLE `wishlist_details`
  ADD CONSTRAINT `wishlist_details_ibfk_1` FOREIGN KEY (`w_id`) REFERENCES `wishlist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wishlist_details_ibfk_2` FOREIGN KEY (`p_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
