<?php
header('Access-Control-Allow-Origin: *'); // Replace * with your specific origin if needed
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header ('Content-Type: application/json');
$json = file_get_contents('php://input');
$data = json_decode($json);
if (!isset($data->url)) {
    http_response_code(400);
    die(json_encode(['error' => 'URL parameter is required.']));
}

// Fetch the HTML content of the specified URL
$html = file_get_contents($data->url);
if ($html === false) {
    http_response_code(500);
    die(json_encode(['error' => 'Error fetching HTML content.']));
}

// Find the favicon URL in the HTML content
if (preg_match('/<link.*?rel=("|\')icon("|\').*?href=("|\')(.*?)("|\')/i', $html, $matches)) {
    $faviconUrl = $matches[4];
    
    // Check if the favicon URL is a relative URL and construct the absolute URL if necessary
    if (!filter_var($faviconUrl, FILTER_VALIDATE_URL)) {
        $urlParts = parse_url($data->url);
        $faviconUrl = $urlParts['scheme'] . '://' . $urlParts['host'] . $faviconUrl;
    }

    // Send the extracted favicon URL as a JSON response
    header('Content-Type: application/json');
    echo json_encode(['faviconUrl' => $faviconUrl]);
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Favicon not found.']);
}
?>

