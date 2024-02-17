<?php
header('Access-Control-Allow-Origin: *'); // Replace * with your specific origin if needed
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

//get the username and password from the request
$username = $_POST['username'];
$password = $_POST['password'];
// this is where is would check with databases!!!

// if the username and password are correct
// this would be database query to check if the user exists
$hash = hash("sha256", $password . $username . "1234");
// file_put_contents("signincreds.json", json_encode(['username' => $username, 'password' => $password, 'token' => $hash]));
// then this would return the token for the user to use in the future
$data = json_decode(file_get_contents("signincreds.json"));
if ($data->username == $username && $data->password == $password) {
    echo json_encode(['token' => $hash, 'status' => 'success']);
}
else {
    echo json_encode(['status' => 'fail']);
}

