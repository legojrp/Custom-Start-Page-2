<?php 
header('Access-Control-Allow-Origin: *'); // Replace * with your specific origin if needed
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

require_once 'DBConnect.php';
require_once "Credentials.php";

$request = json_decode(file_get_contents('php://input'));
if ($request->token){
    $token = $request->token;
    
    $conn::withCredential($CREDENTIALS);
    $id = $conn->select("tokens", ["id"], "token = '$token'");
    if ($id[0]) {
        $data = $conn->select("data", ["settings"], "id = '$id[0]'");
        echo json_encode($data[0]);
    }
    else {
        echo json_encode(['status' => 'fail']);
    }
}
else {
    echo json_encode(['status' => 'fail']);
}