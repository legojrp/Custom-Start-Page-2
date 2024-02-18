<?php 
header('Access-Control-Allow-Origin: *'); // Replace * with your specific origin if needed
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

require_once 'DBConnect.php';
require_once "Credentials.php";

$input = file_get_contents('php://input');
$data = json_decode($input);

$passwordhash = hash("sha256", $data->password . $data->username);

$conn = DBConnect::withCredential($CREDENTIALS);

$conn->insert("users", ["username", "password"], ["'$data->username'", "'$passwordhash'"]);

$results = $conn->select("users", ["id"], "username = '$data->username' AND password = '$passwordhash'");

if (!empty($results)) {
    $token = hash("sha256", $data->username . time());
    $conn->insert("tokens", ["id", "token"], ["'results[0][id]'", "'$token'"]);
    echo json_encode(['token' => $token, 'status' => "success"]);
}
else {
    echo json_encode(['status' => "fail"]);
}