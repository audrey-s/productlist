<?php
	header("Content-type:application/json;charset=utf-8");
	require('init.php');
	//获取参数pno 1 2 3,转换数据库分页偏移量
	$pno=$_REQUEST['pno'];
	$pno=($pno-1)*8;
	$sql="SELECT * FROM jd_product LIMIT $pno,8";
	$result=mysqli_query($conn,$sql);
	$rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
	//var_dump($rows);
	$input=json_encode($rows);
	echo $input;
?>