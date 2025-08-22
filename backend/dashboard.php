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

// Use safe defaults
$total = 0;
$expenses = 0;

// Example queries
$result = $conn->query("SELECT SUM(amount) as total FROM incomes WHERE user_id = $user_id");
$total = $result->fetch_assoc()['total'] ?? 0;

$result = $conn->query("SELECT SUM(amount) as total FROM expenses WHERE user_id = $user_id");
$expenses = $result->fetch_assoc()['total'] ?? 0;

$savings = $total - $expenses;

echo json_encode([
    "status" => "success",
    "total_amount" => $total,
    "expenses" => $expenses,
    "savings" => $savings
]);
