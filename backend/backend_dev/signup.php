<?php 
header('Access-Control-Allow-Origin: *'); // Replace * with your specific origin if needed
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

require_once 'DBConnect.php';
require_once "Credentials.php";
$username = $_POST['username'];
$password = $_POST['password'];

$passwordhash = hash("sha256", $password . $username);

$conn = DBConnect::withCredential($CREDENTIALS);

$conn->insert("users", ["username", "password"], ["'$username'", "'$passwordhash'"]);

$results = $conn->select("users", ["id"], "username = '$username' AND password = '$passwordhash'");

if (!empty($results)) {
    $token = hash("sha256", $username . time());
    $conn->insert("tokens", ["id", "token"], ["" . $results[0]->id . "" , "'$token'"]);
    echo json_encode(['token' => $token, 'status' => "success"]);
}
else {
    echo json_encode(['status' => "fail"]);
}