<?php 
header('Access-Control-Allow-Origin: *'); // Replace * with your specific origin if needed
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

require_once 'DBConnect.php';
require_once "Credentials.php";

$input = file_get_contents('php://input');
$data = json_decode($input);

$passwordhash = hash("sha256", $data->password . $data->username);

$conn = DBConnect::withCredential($CREDENTIALS);

$conn->insert("users", ["username", "password"], ["'$data->username'", "'$passwordhash'"]);
