<?php
session_start();
include 'cors.php';
include 'db.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Credentials: true");

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "error", "message" => "Not authorized"]);
    exit;
}

$user_id = $_SESSION['user_id'];

// Get posted JSON
$data = json_decode(file_get_contents("php://input"), true);
if (!isset($data['amount'])) {
    echo json_encode(["status" => "error", "message" => "Amount is required"]);
    exit;
}

$amount = (float)$data['amount'];

// Check if record exists for this user
$stmt = $conn->prepare("SELECT * FROM totals WHERE user_id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Update
    $stmt = $conn->prepare("UPDATE totals SET total_amount = ? WHERE user_id = ?");
    $stmt->bind_param("di", $amount, $user_id);
    $stmt->execute();
} else {
    // Insert
    $stmt = $conn->prepare("INSERT INTO totals (user_id, total_amount) VALUES (?, ?)");
    $stmt->bind_param("id", $user_id, $amount);
    $stmt->execute();
}

echo json_encode(["status" => "success", "message" => "Amount updated", "total_amount" => $amount]);
