<?php
session_start();
include 'cors.php';
include 'db.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Credentials: true");

if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Not authorized"
    ]);
    exit;
}

$user_id = $_SESSION['user_id'];

$sql = "SELECT id, title, amount, date FROM expenses WHERE user_id = ? ORDER BY date DESC";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$expenses = [];
while ($row = $result->fetch_assoc()) {
    $expenses[] = $row;
}

echo json_encode([
    "status" => "success",
    "data" => $expenses
]);
