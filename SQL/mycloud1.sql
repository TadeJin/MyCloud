-- phpMyAdmin SQL Dump
-- version 5.2.1deb1
-- https://www.phpmyadmin.net/
--
-- Počítač: localhost:3306
-- Vytvořeno: Sob 12. dub 2025, 18:47
-- Verze serveru: 10.11.6-MariaDB-0+deb12u1
-- Verze PHP: 8.2.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáze: `mycloud1`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `accountrequests`
--

CREATE TABLE `accountrequests` (
  `idaccountRequests` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_czech_ci;

--
-- Vypisuji data pro tabulku `accountrequests`
--

INSERT INTO `accountrequests` (`idaccountRequests`, `username`, `password`, `date`) VALUES
(79, 'testRequest', '$2y$10$bqmoaT5eV6yeFnQSt1uURezlS9izIQFJwRyN82T5HWU9IazY.IoZG', '2025-04-11');

-- --------------------------------------------------------

--
-- Struktura tabulky `logs`
--

CREATE TABLE `logs` (
  `idlogs` int(11) NOT NULL,
  `logMessage` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_czech_ci;

--
-- Struktura tabulky `storagedata`
--

CREATE TABLE `storagedata` (
  `idstorageData` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `isDir` binary(1) NOT NULL,
  `parentDir` varchar(255) DEFAULT NULL,
  `user_iduser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_czech_ci;

--
-- Struktura tabulky `users`
--

CREATE TABLE `users` (
  `iduser` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_czech_ci;

--
-- Indexy pro exportované tabulky
--

--
-- Indexy pro tabulku `accountrequests`
--
ALTER TABLE `accountrequests`
  ADD PRIMARY KEY (`idaccountRequests`),
  ADD UNIQUE KEY `username_UNIQUE` (`username`);

--
-- Indexy pro tabulku `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`idlogs`);

--
-- Indexy pro tabulku `storagedata`
--
ALTER TABLE `storagedata`
  ADD PRIMARY KEY (`idstorageData`),
  ADD KEY `fk_storageData_user_idx` (`user_iduser`);

--
-- Indexy pro tabulku `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`iduser`),
  ADD UNIQUE KEY `username_UNIQUE` (`username`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `accountrequests`
--
ALTER TABLE `accountrequests`
  MODIFY `idaccountRequests` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT pro tabulku `logs`
--
ALTER TABLE `logs`
  MODIFY `idlogs` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=832;

--
-- AUTO_INCREMENT pro tabulku `storagedata`
--
ALTER TABLE `storagedata`
  MODIFY `idstorageData` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1527;

--
-- AUTO_INCREMENT pro tabulku `users`
--
ALTER TABLE `users`
  MODIFY `iduser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- Omezení pro exportované tabulky
--

--
-- Omezení pro tabulku `storagedata`
--
ALTER TABLE `storagedata`
  ADD CONSTRAINT `fk_storageData_user` FOREIGN KEY (`user_iduser`) REFERENCES `users` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
