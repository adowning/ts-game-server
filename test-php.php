<?php
// Simple test PHP file to verify execution
header('Content-Type: application/json');

// Read POST data from stdin
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Simulate a simple game response
$response = [
    'action' => 'TestResponse',
    'result' => 'true',
    'sesId' => '10000569942',
    'data' => [
        'message' => 'PHP execution successful!',
        'timestamp' => date('Y-m-d H:i:s'),
        'receivedData' => $data,
        'environment' => [
            'REQUEST_METHOD' => $_SERVER['REQUEST_METHOD'] ?? 'unknown',
            'CONTENT_TYPE' => $_SERVER['CONTENT_TYPE'] ?? 'unknown',
            'QUERY_STRING' => $_SERVER['QUERY_STRING'] ?? '',
        ]
    ]
];

echo json_encode($response);
?>
