<?php 
header('Access-Control-Allow-Origin: *'); // Replace * with your specific origin if needed
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

require_once 'DBConnect.php';
require_once "Credentials.php";
$username = $_POST['username'];
$password = $_POST['password'];

$passwordhash = hash("sha256", $password . $username);
$json = json_encode(file_get_contents("settings.json"));

$conn = DBConnect::withCredential($CREDENTIALS);

$conn->insert("users", ["username", "password", "settings"], ["'$username'", "'$passwordhash'", "$json"]);

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