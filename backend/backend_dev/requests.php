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
        $json = json_decode($data[0]["settings"],true);

        foreach($json["userData"]["links"] as &$item){
            $item["favicon"] = getFaviconUrl($item["url"]);
        }
        
        echo json_encode($json);
        
    }
    else {
        echo json_encode(['status' => 'fail']);
    }
}
else {
    echo json_encode(['status' => 'fail']);
}

function getFaviconUrl($url) {
    // Fetch the HTML content of the specified URL
    $html = file_get_contents($url);
    if ($html === false) {
        return 'Error fetching HTML content.';
    }

    // Find the favicon URL in the HTML content
    if (preg_match('/<link.*?rel=("|\')icon("|\').*?href=("|\')(.*?)("|\')/i', $html, $matches)) {
        $faviconUrl = $matches[4];
        
        // Check if the favicon URL is a relative URL and construct the absolute URL if necessary
        if (!filter_var($faviconUrl, FILTER_VALIDATE_URL)) {
            $urlParts = parse_url($url);
            $faviconUrl = $urlParts['scheme'] . '://' . $urlParts['host'] . $faviconUrl;
        }

        return $faviconUrl;
    } else {
        return 'Favicon not found.';
    }
}