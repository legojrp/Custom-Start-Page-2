<?php
header('Access-Control-Allow-Origin: *'); // Replace * with your specific origin if needed
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// This is just going to get the username and password from the request and output the token


require_once 'DBConnect.php';
require_once "Credentials.php";
$username = $_POST['username'];
$password = $_POST['password'];

$conn = DBConnect::withCredential($CREDENTIALS);
$passwordhash = hash("sha256", $password . $username);


$results = $conn->select("users", ["id"], "username = '$username' AND password = '$passwordhash'");
$results = json_decode(json_encode($results), true);
if (!empty($results)) {
    $token = hash("sha256", $username . time());
    $conn->insert("tokens", ["id", "token"], [$results[0]['id'], "'$token'"]);
    echo json_encode(['token' => $token, 'status' => "success", 'id' => $results[0]['id']]);
}
else {
    echo json_encode(['status' => "fail"]);
}





