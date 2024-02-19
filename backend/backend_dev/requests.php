<?php 
header('Access-Control-Allow-Origin: *'); // Replace * with your specific origin if needed
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header ('Content-Type: application/json');

require_once 'DBConnect.php';
require_once "Credentials.php";

$request = json_decode(file_get_contents('php://input'));
if ($request->token){
    $token = $request->token;
    
    $conn = DBConnect::withCredential($CREDENTIALS);
    $id = $conn->select("tokens", ["id"], "token = '$token'");
    if (!empty($id)) {
        $data = $conn->select("users", ["settings"], "id = '" . $id[0]["id"] . "'");
        echo json_decode($data[0]["settings"]);
        
    }
    else {
        echo json_encode(['status' => 'fail']);
    }
}
else {
    echo json_encode(['status' => 'fail']);
}