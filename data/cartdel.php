<?php
	header("Content-type:application/json;charset=utf-8");
	require('init.php');
	@$cid=$_REQUEST['cid']or die('{"code":-1,"msg":"购物车编号是必须的"}');
	$sql="DELETE FROM jd_cart WHERE cid=$cid";
	$result=mysqli_query($conn,$sql);
	echo '{"code":1,"msg":"删除成功"}';
?>