-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 05-02-2025 a las 01:42:26
-- Versión del servidor: 10.1.37-MariaDB
-- Versión de PHP: 7.3.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestion_espacios`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividad`
--

CREATE TABLE `actividad` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) COLLATE utf8_bin NOT NULL,
  `descripcion` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `id_ministerio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `actividad`
--

INSERT INTO `actividad` (`id`, `nombre`, `descripcion`, `id_ministerio`) VALUES
(2, 'ACT1', 'Actividad 1', 1),
(3, 'ACT2', 'Actividad 2', 1),
(4, 'ACT3', 'Actividad 3', 1),
(5, 'ACT4', 'Actividad 4', 2),
(6, 'ACT5', 'Actividad 5', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `espacio`
--

CREATE TABLE `espacio` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) COLLATE utf8_bin NOT NULL,
  `descripcion` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `capacidad` int(11) NOT NULL,
  `id_estado` int(11) DEFAULT NULL,
  `id_tipo_espacio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `espacio`
--

INSERT INTO `espacio` (`id`, `nombre`, `descripcion`, `capacidad`, `id_estado`, `id_tipo_espacio`) VALUES
(1, 'Aula 1', NULL, 0, 1, 2),
(2, 'Aula 2', NULL, 0, 1, 2),
(3, 'Aula 3', NULL, 0, 1, 2),
(4, 'Cocina', NULL, 0, 1, 1),
(5, 'Salon Principal', NULL, 0, 1, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_espacio`
--

CREATE TABLE `estado_espacio` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `estado_espacio`
--

INSERT INTO `estado_espacio` (`id`, `nombre`) VALUES
(1, 'Disponible'),
(2, 'No Disponible'),
(3, 'En Mantenimiento');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_solicitud`
--

CREATE TABLE `estado_solicitud` (
  `id` int(11) NOT NULL,
  `codigo` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `nombre` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `estado_solicitud`
--

INSERT INTO `estado_solicitud` (`id`, `codigo`, `nombre`) VALUES
(1, 'EP', 'En Proceso'),
(2, 'AP', 'Aprobada'),
(3, 'RE', 'Rechazada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ministerio`
--

CREATE TABLE `ministerio` (
  `id` int(11) NOT NULL,
  `codigo` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `descripcion` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `ministerio`
--

INSERT INTO `ministerio` (`id`, `codigo`, `descripcion`) VALUES
(1, 'MIN1', 'Ministerio 1'),
(2, 'MIN2', 'Ministerio 2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recurso`
--

CREATE TABLE `recurso` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `descripcion` varchar(255) COLLATE utf8_bin NOT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `id_espacio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reserva`
--

CREATE TABLE `reserva` (
  `id` int(11) NOT NULL,
  `espacioId` int(11) NOT NULL,
  `ministerioId` int(11) DEFAULT NULL,
  `fechaInicio` datetime NOT NULL,
  `fechaFin` datetime NOT NULL,
  `actividadId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `reserva`
--

INSERT INTO `reserva` (`id`, `espacioId`, `ministerioId`, `fechaInicio`, `fechaFin`, `actividadId`) VALUES
(2, 1, 1, '2024-11-30 10:00:00', '2024-11-30 12:00:00', 2),
(3, 1, 1, '2024-11-23 10:00:00', '2024-11-23 12:00:00', 2),
(4, 1, 1, '2024-11-28 10:00:00', '2024-11-28 12:00:00', 3),
(5, 5, 2, '2024-11-29 13:00:00', '2024-11-29 14:00:00', 5),
(6, 1, 1, '2024-12-05 16:00:00', '2024-12-05 17:00:00', 2),
(7, 3, 1, '2024-12-10 17:00:00', '2024-12-10 18:00:00', 3),
(8, 5, 2, '2024-12-11 19:00:00', '2024-12-11 20:00:00', 5),
(9, 1, 2, '2024-12-15 22:00:00', '2024-12-15 23:00:00', 5),
(10, 2, 1, '2024-12-15 03:00:00', '2024-12-16 02:00:00', 2),
(11, 4, 1, '2024-12-15 03:00:00', '2024-12-16 02:00:00', 2),
(12, 4, 1, '2024-12-13 03:00:00', '2024-12-14 02:00:00', 2),
(13, 3, 1, '2024-12-13 03:00:00', '2024-12-13 04:00:00', 3),
(14, 2, 1, '2024-12-16 03:00:00', '2024-12-16 04:00:00', 2),
(15, 2, 1, '2024-12-17 03:00:00', '2024-12-17 04:00:00', 2),
(16, 4, 1, '2024-12-18 18:00:00', '2024-12-18 19:00:00', 3),
(17, 2, 1, '2024-12-19 03:00:00', '2024-12-20 02:00:00', 2),
(18, 5, 1, '2024-12-20 19:00:00', '2024-12-20 20:00:00', 3),
(19, 1, 1, '2024-12-24 17:00:00', '2024-12-24 18:00:00', 3),
(20, 3, 1, '2024-12-27 06:00:00', '2024-12-27 07:00:00', 3),
(21, 1, 1, '2024-12-17 03:00:00', '2024-12-17 04:00:00', 2),
(22, 2, 1, '2024-12-25 17:00:00', '2024-12-25 18:00:00', 3),
(23, 2, 2, '2024-12-12 18:00:00', '2024-12-12 19:00:00', 5),
(24, 2, 1, '2024-12-03 15:00:00', '2024-12-03 16:00:00', 3),
(25, 3, 1, '2024-12-15 03:00:00', '2024-12-16 02:00:00', 2),
(26, 1, 1, '2024-12-09 15:00:00', '2024-12-09 16:00:00', 2),
(27, 1, 1, '2024-12-09 17:00:00', '2024-12-09 18:00:00', 2),
(28, 1, 1, '2024-12-09 19:00:00', '2024-12-09 20:00:00', 2),
(29, 1, 1, '2024-12-09 21:00:00', '2024-12-09 22:00:00', 2),
(30, 1, 2, '2024-12-16 00:00:00', '2024-12-16 01:00:00', 5),
(31, 2, 1, '2025-01-03 19:00:00', '2025-01-03 20:00:00', 3),
(32, 2, 1, '2025-01-03 21:00:00', '2025-01-03 22:00:00', 2),
(33, 2, 1, '2025-01-07 21:00:00', '2025-01-07 22:00:00', 3),
(34, 2, 2, '2025-01-09 16:00:00', '2025-01-09 18:00:00', 5),
(35, 2, 1, '2025-01-10 17:00:00', '2025-01-10 18:00:00', 2),
(36, 2, 1, '2025-01-15 03:00:00', '2025-01-15 04:00:00', 2),
(37, 2, 2, '2025-01-16 06:00:00', '2025-01-16 10:00:00', 5),
(39, 4, 2, '2025-01-21 13:00:00', '2025-01-21 14:00:00', 5),
(40, 2, 1, '2025-01-07 22:00:00', '2025-01-07 23:00:00', 3),
(41, 2, 1, '2025-01-07 20:00:00', '2025-01-07 21:00:00', 3),
(42, 5, 2, '2025-01-08 13:00:00', '2025-01-08 14:00:00', 5),
(43, 4, 1, '2025-01-08 13:00:00', '2025-01-08 14:00:00', 2),
(44, 2, 1, '2025-01-08 13:00:00', '2025-01-08 14:00:00', 2),
(45, 3, 1, '2025-01-08 01:05:00', '2025-01-08 02:05:00', 3),
(46, 2, 1, '2024-12-31 13:00:00', '2024-12-31 14:00:00', 2),
(47, 1, 1, '2025-01-01 13:00:00', '2025-01-01 14:00:00', 3),
(48, 1, 1, '2025-01-02 13:00:00', '2025-01-02 14:00:00', 2),
(49, 2, 2, '2025-01-06 13:00:00', '2025-01-06 14:00:00', 5),
(50, 5, 1, '2025-01-14 13:00:00', '2025-01-14 14:00:00', 2),
(51, 2, 2, '2025-02-10 13:00:00', '2025-02-10 14:00:00', 5),
(52, 5, 1, '2025-02-11 13:00:00', '2025-02-11 14:00:00', 2),
(53, 1, 1, '2025-02-10 13:00:00', '2025-02-10 14:00:00', 2),
(54, 2, 1, '2025-02-10 19:00:00', '2025-02-10 20:00:00', 2),
(55, 5, 1, '2025-02-13 13:00:00', '2025-02-13 14:00:00', 2),
(56, 4, 1, '2025-02-12 13:00:00', '2025-02-12 14:00:00', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_bin NOT NULL,
  `id_rol_auth0` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id`, `name`, `description`, `id_rol_auth0`) VALUES
(1, 'ADMIN', 'ADMIN', 'rol_FRCbQ9QoNj7JnROk'),
(2, 'RESPONSABLE', 'usuarios responsables de ministerio', 'rol_BlMao5OWMUk8RssY'),
(3, 'RESPONSABLE', 'usuarios responsables de ministerio', 'rol_BlMao5OWMUk8RssY');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitud`
--

CREATE TABLE `solicitud` (
  `id` int(11) NOT NULL,
  `id_ministerio` int(11) DEFAULT NULL,
  `id_espacio` int(11) DEFAULT NULL,
  `id_actividad` int(11) DEFAULT NULL,
  `id_estado_solicitud` int(11) DEFAULT NULL,
  `fechaInicio` datetime DEFAULT NULL,
  `fechaFin` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `solicitud`
--

INSERT INTO `solicitud` (`id`, `id_ministerio`, `id_espacio`, `id_actividad`, `id_estado_solicitud`, `fechaInicio`, `fechaFin`) VALUES
(1, 1, 5, 2, 2, '2025-01-14 13:00:00', '2025-01-14 14:00:00'),
(2, 1, 5, 3, 1, '2024-12-30 13:00:00', '2024-12-30 14:00:00'),
(3, 1, 5, 2, 2, '2025-02-13 13:00:00', '2025-02-13 14:00:00'),
(4, 1, 4, 3, 2, '2025-02-12 13:00:00', '2025-02-12 14:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudreserva`
--

CREATE TABLE `solicitudreserva` (
  `id` int(11) NOT NULL,
  `espacioId` int(11) NOT NULL,
  `ministerioId` int(11) NOT NULL,
  `fechaInicio` datetime NOT NULL,
  `fechaFin` datetime NOT NULL,
  `actividadId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_espacio`
--

CREATE TABLE `tipo_espacio` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `tipo_espacio`
--

INSERT INTO `tipo_espacio` (`id`, `nombre`) VALUES
(1, 'COCINA'),
(2, 'AULA'),
(3, 'SALON PRINCIPAL');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) COLLATE utf8_bin NOT NULL,
  `email` varchar(100) COLLATE utf8_bin NOT NULL,
  `password` varchar(100) COLLATE utf8_bin NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre_usuario` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_bin NOT NULL,
  `fecha_alta` datetime DEFAULT NULL,
  `id_rol` int(11) DEFAULT NULL,
  `id_usuario_auth0` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ministerioId` int(11) DEFAULT NULL,
  `nombre` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `apellido` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `telefono` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `dni` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre_usuario`, `email`, `fecha_alta`, `id_rol`, `id_usuario_auth0`, `ministerioId`, `nombre`, `apellido`, `telefono`, `dni`) VALUES
(1, 'Patricio Rodriguez', 'pato.gonnet@gmail.com', '2025-01-06 12:27:01', 1, 'google-oauth2|109528163035343327984', NULL, NULL, NULL, NULL, NULL),
(2, 'Rodrigo Ramirez', 'rodrigoramirezok@gmail.com', '2025-01-24 20:39:13', 1, 'google-oauth2|112941396567043777748', NULL, NULL, NULL, NULL, NULL),
(3, 'Agustin H', 'aguushiguera@gmail.com', '2025-01-25 14:27:51', NULL, 'google-oauth2|103232618171570566417', NULL, NULL, NULL, NULL, NULL),
(4, 'Emanuel Higuera', 'emanuel.higuera9@gmail.com', '2025-01-25 14:38:33', 1, 'google-oauth2|109828279464796221333', NULL, 'e', 't', NULL, NULL),
(5, 'marcelo', 'marcelopabtas@gmail.com', '2025-01-28 14:37:16', 1, 'google-oauth2|105310380018198878601', NULL, 'marcelo', NULL, NULL, ''),
(6, 'Lucas Martinez', 'lucas.olimpi@gmail.com', '2025-01-28 15:05:36', 1, 'google-oauth2|110344360784950892776', NULL, 'Lucas', 'Martinez', NULL, ''),
(7, 'ANDRAMOS', 'nightwingsg14@gmail.com', '2025-01-28 19:53:41', 2, 'google-oauth2|114797998748588620164', NULL, 'Nightwing', 'SG', NULL, '36896791'),
(8, 'Incidencias Y Despliegues', 'incidenciasydespliegues@gmail.com', '2025-01-29 18:34:51', 2, 'google-oauth2|107026172189934325880', 1, 'Incidencias', 'Y Despliegues', NULL, '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actividad`
--
ALTER TABLE `actividad`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_ministerio` (`id_ministerio`);

--
-- Indices de la tabla `espacio`
--
ALTER TABLE `espacio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_estado` (`id_estado`),
  ADD KEY `id_tipo_espacio` (`id_tipo_espacio`);

--
-- Indices de la tabla `estado_espacio`
--
ALTER TABLE `estado_espacio`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `estado_solicitud`
--
ALTER TABLE `estado_solicitud`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ministerio`
--
ALTER TABLE `ministerio`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `recurso`
--
ALTER TABLE `recurso`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_espacio` (`id_espacio`);

--
-- Indices de la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD PRIMARY KEY (`id`),
  ADD KEY `espacioId` (`espacioId`),
  ADD KEY `ministerioId` (`ministerioId`),
  ADD KEY `actividadId` (`actividadId`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `solicitud`
--
ALTER TABLE `solicitud`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_ministerio` (`id_ministerio`),
  ADD KEY `id_espacio` (`id_espacio`),
  ADD KEY `id_actividad` (`id_actividad`),
  ADD KEY `id_estado_solicitud` (`id_estado_solicitud`);

--
-- Indices de la tabla `solicitudreserva`
--
ALTER TABLE `solicitudreserva`
  ADD PRIMARY KEY (`id`),
  ADD KEY `espacioId` (`espacioId`),
  ADD KEY `ministerioId` (`ministerioId`),
  ADD KEY `actividadId` (`actividadId`);

--
-- Indices de la tabla `tipo_espacio`
--
ALTER TABLE `tipo_espacio`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `id_usuario_auth0` (`id_usuario_auth0`),
  ADD KEY `id_rol` (`id_rol`),
  ADD KEY `ministerioId` (`ministerioId`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actividad`
--
ALTER TABLE `actividad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `espacio`
--
ALTER TABLE `espacio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `estado_espacio`
--
ALTER TABLE `estado_espacio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `estado_solicitud`
--
ALTER TABLE `estado_solicitud`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `ministerio`
--
ALTER TABLE `ministerio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `recurso`
--
ALTER TABLE `recurso`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reserva`
--
ALTER TABLE `reserva`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `solicitud`
--
ALTER TABLE `solicitud`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `solicitudreserva`
--
ALTER TABLE `solicitudreserva`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipo_espacio`
--
ALTER TABLE `tipo_espacio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `actividad`
--
ALTER TABLE `actividad`
  ADD CONSTRAINT `actividad_ibfk_1` FOREIGN KEY (`id_ministerio`) REFERENCES `ministerio` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `espacio`
--
ALTER TABLE `espacio`
  ADD CONSTRAINT `espacio_ibfk_37` FOREIGN KEY (`id_estado`) REFERENCES `estado_espacio` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `espacio_ibfk_38` FOREIGN KEY (`id_tipo_espacio`) REFERENCES `tipo_espacio` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `recurso`
--
ALTER TABLE `recurso`
  ADD CONSTRAINT `recurso_ibfk_1` FOREIGN KEY (`id_espacio`) REFERENCES `espacio` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD CONSTRAINT `reserva_ibfk_139` FOREIGN KEY (`espacioId`) REFERENCES `espacio` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reserva_ibfk_140` FOREIGN KEY (`ministerioId`) REFERENCES `ministerio` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reserva_ibfk_141` FOREIGN KEY (`actividadId`) REFERENCES `actividad` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `solicitud`
--
ALTER TABLE `solicitud`
  ADD CONSTRAINT `solicitud_ibfk_77` FOREIGN KEY (`id_ministerio`) REFERENCES `ministerio` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `solicitud_ibfk_78` FOREIGN KEY (`id_espacio`) REFERENCES `espacio` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `solicitud_ibfk_79` FOREIGN KEY (`id_actividad`) REFERENCES `actividad` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `solicitud_ibfk_80` FOREIGN KEY (`id_estado_solicitud`) REFERENCES `estado_solicitud` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `solicitudreserva`
--
ALTER TABLE `solicitudreserva`
  ADD CONSTRAINT `solicitudreserva_ibfk_81` FOREIGN KEY (`espacioId`) REFERENCES `espacio` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `solicitudreserva_ibfk_82` FOREIGN KEY (`ministerioId`) REFERENCES `ministerio` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `solicitudreserva_ibfk_83` FOREIGN KEY (`actividadId`) REFERENCES `actividad` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_109` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `usuario_ibfk_110` FOREIGN KEY (`ministerioId`) REFERENCES `ministerio` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
