<?php
header('Access-Control-Allow-Origin: *'); // Replace * with your specific origin if needed
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

//get the username and password from the request
$username = $_POST['email'];
$password = $_POST['password'];
// this is where is would check with databases!!!

// if the username and password are correct
$hash = hash("sha256", $password + $username +"1234");
// this would be database query to check if the user exists
file_put_contents("signincreds.json", json_encode(['username' => $username, 'password' => $password]));
// then this would return the token for the user to use in the future
if (true){
    echo json_encode(['token' => '']);
}
