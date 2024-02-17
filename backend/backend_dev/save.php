<?php 
header('Access-Control-Allow-Origin: *'); // Replace * with your specific origin if needed
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

require_once('DBConnect.php');
$input = file_get_contents('php://input');
$data = json_decode($input);

$token = $data->token;

$id = $conn->select("tokens", ["id"], "token = '$token'");

if (count($id) == 0) {
    $conn->update("data", ["settings"], ["'$input'"], "id = $id[0]");
}


$conn = DBConnect::withCredential($CREDENTIALS);

