<?php
    // 获取传递过来的用名 和 商品id
    $username = $_GET['username'];
    $pro_id = $_GET['pro_id'];

    // $username = '三五';
    // $goods_id = 4;

    $con = mysqli_connect('localhost','root','123456','dw');

    $sql = "DELETE FROM `car` WHERE `car`.`pro_id` = '$pro_id' AND `username` = '$username'";

    $res = mysqli_query($con,$sql);

    if(!$res){
        // die('error for mysqli' . mysqli_error());
        echo json_encode(array("code"=>false,"msg"=>"删除数据失败"));
    }else{
        echo json_encode(array("code"=>$res,"msg"=>"删除数据成功"));
    }
?>