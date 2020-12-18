<?php
    # 用户名 商品id
    $username = $_GET['username'];
    $id = $_GET['pro_id'];
    // $username = '张三';
    // $id = 5;
 
    $con = mysqli_connect('localhost','root','123456','dw');


    $sql = "SELECT * FROM `car` WHERE `username`='$username' AND `pro_id`='$id'";
    $res = mysqli_query($con,$sql);

    if(!$res){
        die('error for mysql' . mysqli_error());
    }
    $row = mysqli_fetch_assoc($res);
     # 如果购物车表中存在该条数据，让这个条数据中的num 值加 1
    if($row){
        $goodsNum = $row['num']+1;
       $res2= mysqli_query($con,"UPDATE `car` SET `num` = '$goodsNum'  WHERE `username`='$username' AND `pro_id`='$id'");
    }else{
        # 如果不存在，就往car表中 添加数据
        $res2= mysqli_query($con,"INSERT INTO `car` (`username`,`pro_id`, `num`) VALUES ('$username',$id, '1')");
    }
    if($res2){
        echo json_encode(array("code"=>true,"msg"=>"添加数据成功"));
    }

?>