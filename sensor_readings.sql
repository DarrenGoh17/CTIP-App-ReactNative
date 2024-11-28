-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 06, 2024 at 01:44 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `semenggoh`
--

-- --------------------------------------------------------

--
-- Table structure for table `sensor_readings`
--

CREATE TABLE `sensor_readings` (
  `id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `motion_status` varchar(50) DEFAULT NULL,
  `sound_value` int(11) DEFAULT NULL,
  `button_status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sensor_readings`
--

INSERT INTO `sensor_readings` (`id`, `timestamp`, `motion_status`, `sound_value`, `button_status`) VALUES
(1, '2024-11-03 15:01:38', 'Motion Detected', 2826, 'Not Pressed'),
(2, '2024-11-03 15:01:41', 'No Motion', 2823, 'Not Pressed'),
(3, '2024-11-03 15:01:48', 'Motion Detected', 2823, 'Not Pressed'),
(4, '2024-11-03 15:01:51', 'No Motion', 2672, 'Not Pressed'),
(5, '2024-11-03 15:02:02', 'Motion Detected', 2706, 'Not Pressed'),
(6, '2024-11-03 15:02:05', 'No Motion', 2807, 'Not Pressed'),
(7, '2024-11-03 15:02:10', 'Motion Detected', 2803, 'Not Pressed'),
(8, '2024-11-03 15:02:13', 'No Motion', 2832, 'Not Pressed'),
(9, '2024-11-03 15:02:26', 'Motion Detected', 2794, 'Not Pressed'),
(10, '2024-11-03 15:02:29', 'No Motion', 2811, 'Not Pressed'),
(11, '2024-11-03 15:03:01', 'Motion Detected', 2818, 'Not Pressed'),
(12, '2024-11-03 15:03:04', 'No Motion', 2795, 'Not Pressed'),
(13, '2024-11-03 15:03:11', 'Motion Detected', 2830, 'Not Pressed'),
(14, '2024-11-03 15:03:13', 'No Motion', 2800, 'Not Pressed'),
(15, '2024-11-03 15:03:19', 'Motion Detected', 2806, 'Not Pressed'),
(16, '2024-11-03 15:03:22', 'No Motion', 2798, 'Not Pressed'),
(17, '2024-11-03 15:03:40', 'Motion Detected', 2698, 'Not Pressed'),
(18, '2024-11-03 15:03:44', 'No Motion', 2825, 'Not Pressed'),
(19, '2024-11-03 15:03:54', 'Motion Detected', 2806, 'Not Pressed'),
(20, '2024-11-03 15:03:57', 'No Motion', 2804, 'Not Pressed'),
(21, '2024-11-03 15:04:02', 'Motion Detected', 2789, 'Not Pressed'),
(22, '2024-11-03 15:04:05', 'No Motion', 2801, 'Not Pressed'),
(23, '2024-11-03 15:04:12', 'Motion Detected', 2821, 'Not Pressed'),
(24, '2024-11-03 15:04:15', 'No Motion', 2832, 'Not Pressed'),
(25, '2024-11-03 15:04:25', 'Motion Detected', 2813, 'Not Pressed');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sensor_readings`
--
ALTER TABLE `sensor_readings`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sensor_readings`
--
ALTER TABLE `sensor_readings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=243;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
