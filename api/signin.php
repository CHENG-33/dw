<?php

$con = mysqli_connect('localhost','root','123456','dw');

$username = $_POST['username'];
  $tel = $_POST['tel'];
  $password = $_POST['password'];

// $username = "san三";
// $tel = 13131313131;
// $password = 252555;
// print_r($username);
// print_r($tel);
// print_r(5);


$sql = "INSERT INTO `login` VALUES (NULL, '$username', '$tel', '$password');";
  
$sqls="SELECT * FROM `login` WHERE `name` = '$username'";

  

  $res2=mysqli_query($con,$sqls);

//   if (!$res2) {
//     die('error for mysql: ' . mysqli_error());
//   };
$row = mysqli_fetch_assoc($res2);
  if ($row) {

    echo json_encode(array(
      "code" => 0,
      "message" => "用户名已存在"
    ),JSON_UNESCAPED_UNICODE);
  } else {
    $res = mysqli_query($con,$sql);
  }if($res){
    $array=["code" => 1,"message" => "注册成功"];
    echo json_encode($array,JSON_UNESCAPED_UNICODE);
  }
  
?>
