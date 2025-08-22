<?php
include 'cors.php';
include 'db.php';

if ($_SERVER["REQUEST_METHOD"]=="POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $username = $data['name'];
    $email = $data['email'];
  $password = password_hash($data['password'], PASSWORD_BCRYPT);

    $sql = "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $username, $email, $password);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Submitted"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Something went wrong"]);
    }
}
?>
