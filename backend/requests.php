<?php 
header('Access-Control-Allow-Origin: *'); // Replace * with your specific origin if needed
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');


$file = file_get_contents("test.json");
echo $file;



// function cors() {
//     // Allow from any origin
//     if (isset($_SERVER['HTTP_ORIGIN'])) {
//         // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
//         // you want to allow, and if so:
//         header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
//         header('Access-Control-Allow-Credentials: true');
//         header('Access-Control-Max-Age:  86400');    // Cache for  1 day
//     }
    
//     // Access-Control headers are received during OPTIONS requests
//     if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        
//         if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
//             // May also be using PUT, PATCH, HEAD etc
//             header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        
//         if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
//             header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    
//         exit(0);
//     }
    
//     echo "You have CORS!";
// }

// // Call the function at the beginning of your script
// cors();