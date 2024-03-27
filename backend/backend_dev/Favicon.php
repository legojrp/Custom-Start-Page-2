<?php
// Check if the 'url' query parameter is provided
if (!isset($_GET['url'])) {
    http_response_code(400);
    die('URL parameter is required.');
}

// Get the URL parameter value
$url = $_GET['url'];

// Fetch the HTML content of the specified URL
$html = file_get_contents($url);
if ($html === false) {
    http_response_code(500);
    die('Error fetching HTML content.');
}

// Find the favicon URL in the HTML content
if (preg_match('/<link.*?rel=("|\')icon("|\').*?href=("|\')(.*?)("|\')/i', $html, $matches)) {
    $faviconUrl = $matches[4];
    
    // Check if the favicon URL is a relative URL and construct the absolute URL if necessary
    if (!filter_var($faviconUrl, FILTER_VALIDATE_URL)) {
        $urlParts = parse_url($url);
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
