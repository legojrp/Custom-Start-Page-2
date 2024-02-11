<?php
header('Access-Control-Allow-Origin: *'); // Replace * with your specific origin if needed
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$json = file_get_contents('php://input');
$data = json_decode($json);
// You can now use $data as an associative array
// For example, to get a setting value you can use $data['setting_key']
// Make sure to add error handling and validation as needed
// Save the JSON to a file
$file_to_save = 'test2.json'; // The file where the JSON will be saved
// Delete the file
$backup_file = 'test3.json';

// Copy the original file to the backup location

file_put_contents("test.json", $json);

// file_put_contents("test.json", file_get_contents("test2.json"));
