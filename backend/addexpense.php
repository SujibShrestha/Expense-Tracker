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

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $title = $data['title'];
    $amount = $data['amount'];
    $user_id = $_SESSION['user_id'];

    $sql = "INSERT INTO expenses (user_id, title, amount, date) VALUES (?, ?, ?, NOW())";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("isd", $user_id, $title, $amount);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Expense added"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to add expense"]);
    }
}
