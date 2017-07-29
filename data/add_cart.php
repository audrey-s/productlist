<?php
	header("Content-type:application/json;charset=utf-8");
	@$uid=$_REQUEST['uid']or die('{"code":-1,"msg":"用户编号是必须的"}');
	@$pid=$_REQUEST['pid']or die('{"code":-2,"msg":"商品编号是必须的"}');
	require('init.php');
	$sql="SELECT * FROM jd_cart WHERE uid=$uid AND pid=$pid";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_assoc($result);
	//var_dump($row);
	$pcount=1;
	//没有购买过此商品
	if($row==null){
		$sql="INSERT INTO jd_cart VALUES(null,$pid,$uid,1)";
		mysqli_query($conn,$sql);
	//购买过此商品
	}else{
		$sql="UPDATE jd_cart SET pcount=pcount+1 WHERE uid=$uid AND pid=$pid";
		mysqli_query($conn,$sql);
		$pcount=$row['pcount']+1;
		//echo $pcount;
	}
	$output=["code"=>1,"msg"=>"添加成功","pcount"=>$pcount];

	echo json_encode($output);
?>