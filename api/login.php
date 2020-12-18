<?php

$con = mysqli_connect('localhost','root','123456','dw');

  $username = $_POST['username'];
  $password = $_POST['password'];

  // print_r($username);
  // print_r($password);
// $username ="张三";
// $password = 123456;

  $sql = "SELECT * FROM `login` WHERE `name`= '$username' AND `password`='$password'";

  $res = mysqli_query($con,$sql);

  if (!$res) {
    die('error for mysql: ' . mysqli_error());
  }

  $row = mysqli_fetch_assoc($res);

  if (!$row) {
    // 没有匹配的数据 登录失败
    echo json_encode(array(
      "code" => 0,
      "message" => "登录失败"
    ));
  } else {
    // 有匹配的数据 登录成功
    echo json_encode(array(
      "code" => 1,
      "message" => "登录成功"
    ));
  }

?>
