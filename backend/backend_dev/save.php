<?php 
header('Access-Control-Allow-Origin: *'); // Replace * with your specific origin if needed
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header ('Content-Type: application/json');

require_once('DBConnect.php');
require_once("Credentials.php");  
$input = file_get_contents('php://input');
$data = json_decode($input);
$conn = DBConnect::withCredential($CREDENTIALS);

$token = $data->token;
echo json_encode($data->token);


// $id = $conn->select("tokens", ["id"], "token = '$token'");

// if (!empty($id)) {
//     $conn->update("users", ["settings"], ["'" . json_encode($data->settings) . " '"], "id = $id[0]");
// }
// else {
//     echo json_encode(['status' => 'fail']);
// }


