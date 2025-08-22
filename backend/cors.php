<?php
// Allow React app origin
// Allow CORS for your frontend origin
header("Access-Control-Allow-Origin: http://localhost:5173"); // React dev server
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
