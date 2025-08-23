<?php
session_start();
include 'cors.php';
include 'db.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Credentials: true");

// Disable PHP HTML errors breaking JSON
ini_set('display_errors', 0);
error_reporting(E_ALL);

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "error", "message" => "Not authorized"]);
    exit;
}

$user_id = $_SESSION['user_id'];

// Total amount (for now, just set a fixed number or sum of expenses)
$totalAmount = 5200; // Example fixed total
$totalExpenses = 0;
// Fetch total amount from DB
$stmtTotal = $conn->prepare("SELECT total_amount FROM totals WHERE user_id = ?");
$stmtTotal->bind_param("i", $user_id);
$stmtTotal->execute();
$resultTotal = $stmtTotal->get_result();
$totalAmount = $resultTotal->fetch_assoc()['total_amount'] ?? 0;

// $stmtuser= $conn->prepare("SELECT fullname FROM users WHERE user_id = ?");
// $stmtuser->bind_param("i", $user_id);
// $stmtuser->execute();
// $resultUser= $stmtuser->get_result();

// Get total expenses for this user
$stmtExpense = $conn->prepare("SELECT SUM(amount) AS total FROM expenses WHERE user_id = ?");
$stmtExpense->bind_param("i", $user_id);
$stmtExpense->execute();
$resultExpense = $stmtExpense->get_result();
$totalExpenses = $resultExpense->fetch_assoc()['total'] ?? 0;

// Calculate savings (total amount - expenses)
$savings = $totalAmount - $totalExpenses;

// Return JSON
echo json_encode([
    "status" => "success",
    "fullname"=> $fullname,
    "total_amount" => (float)$totalAmount,
    "expenses" => (float)$totalExpenses,
    "savings" => (float)$savings
]);
