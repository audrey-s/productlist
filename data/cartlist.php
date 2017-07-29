<?php
	//获取参数uid
	//查询该用户购物车所有信息
	//输出json
	header("Content-type:application/json;charset=utf-8");
	require('init.php');
	@$uid=$_REQUEST['uid']or die('{"code":-1,"msg":"用户编码是必须的"}');
	//$sql="SELECT * FROM jd_cart WHERE uid=$uid";
	$sql="SELECT p.pic,c.pcount,p.pname,p.price,c.cid FROM jd_cart c,jd_product p WHERE c.pid=p.pid AND $uid=c.uid";
	$result=mysqli_query($conn,$sql);
	$rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
	echo json_encode($rows);
?>