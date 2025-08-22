<?php
$host = "localhost";
$user = "root"; // change if needed
$pass = "";     // change if needed
$dbname = "expensetracker";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "DB Connection failed: " . $conn->connect_error]));
}
?>
