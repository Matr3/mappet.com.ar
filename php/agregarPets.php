<?php

require 'conexion.php';

echo $_SERVER['SERVER_NAME'];

$json = file_get_contents('php://input');

$datos = json_decode($json, true);

$valor = [];

print_r($datos);

$items = $datos['prueva'][1]['jornadas'];


?>