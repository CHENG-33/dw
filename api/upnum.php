<?php
    $username = $_GET['username'];
    $id = $_GET['pro_id'];
    $num = $_GET['num'];

    // $username = "张三";
    // $id = 2;
    // $num = 5;
    $con = mysqli_connect('localhost','root','123456','dw');

    $sql = "UPDATE `car` SET `num` = ' $num' WHERE `pro_id` = '$id' AND `username` = '$username'";

    $res = mysqli_query($con,$sql);

    if(!$res){
        // die('error for mysqli' . mysqli_error());
        echo json_encode(array("code"=>0,"msg"=>"修改数据失败"));
    }else{
        echo json_encode(array("code"=>$res,"msg"=>"修改数据成功"));
    }
?>