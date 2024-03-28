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

        echo json_encode($json);

        foreach($json["userData"]["links"] as &$item){
            if (!isset($item["last_tested"]) || (time() - $item["last_tested"]) > 86400){
                $item["last_tested"] = time();
                $item["favicon"] = getFaviconUrl($item["url"]);
            }

        }
        $conn->update("users", ["settings"], ["'" . addslashes(json_encode($json)) . " '"], "id = ".$id[0]['id']);
        
        
        
    }
    else {
        echo json_encode(['status' => 'fail']);
    }
}
else {
    echo json_encode(['status' => 'fail']);
}

function getFaviconUrl($url) {
    // Method 1: Look for the <link> tag with rel="icon" or rel="shortcut icon" in the HTML content
    $html = file_get_contents($url);
    if ($html === false) {
    }

    $faviconUrl = '';
    $maxResolution = 0;
    if ($html){
    if (preg_match_all('/<link.*?rel=("|\')icon("|\').*?href=("|\')(.*?)("|\')/i', $html, $matches)) {
        foreach ($matches[4] as $url) {
            $resolution = getFaviconResolution($url);
            if ($resolution > $maxResolution) {
                $maxResolution = $resolution;
                $faviconUrl = $url;
            }
        }
        if (!filter_var($faviconUrl, FILTER_VALIDATE_URL)) {
            $urlParts = parse_url($url);
            $faviconUrl = $urlParts['scheme'] . '://' . $urlParts['host'] . $faviconUrl;
        }
        return $faviconUrl;
    }
}

    // Method 2: Try fetching the favicon.ico directly
    $faviconUrl = rtrim($url, '/') . '/favicon.ico';
    $faviconResolution = getFaviconResolution($faviconUrl);
    if ($faviconResolution > $maxResolution) {
        $maxResolution = $faviconResolution;
    }

    // Method 3: Try Google's favicon API as a fallback
    $googleFaviconUrl = 'https://www.google.com/s2/favicons?domain=' . urlencode($url);
    $googleFaviconResolution = getFaviconResolution($googleFaviconUrl);
    if ($googleFaviconResolution > $maxResolution) {
        $maxResolution = $googleFaviconResolution;
        $faviconUrl = $googleFaviconUrl;
    }

    return $faviconUrl ?: 'Favicon not found.';
}

function getFaviconResolution($url) {
    $headers = @get_headers($url, 1);
    if ($headers && isset($headers['Content-Length'])) {
        return (int) $headers['Content-Length'];
    }
    return 0;
}