<?php
	header("Content-type:application/json;charset=utf-8");
	require('init.php');
	@$cid=$_REQUEST['cid']or die('{"code":-1,"msg":"购物车编号是必须的"}');
	$sql="UPDATE jd_cart SET pcount=pcount-1 WHERE cid=$cid AND pcount>0";
	$result=mysqli_query($conn,$sql);
	//$row=mysqli_fetch_assoc($result);
	if($result==true){
		$sql="SELECT * FROM jd_cart WHERE cid=$cid";
		$sql="SELECT c.pcount,p.price,c.cid FROM jd_cart c,jd_product p WHERE c.pid=p.pid AND cid=$cid";
		$result=mysqli_query($conn,$sql);
		$row=mysqli_fetch_assoc($result);
		//var_dump($row);
		$output=["code"=>1,"msg"=>"更新成功","pcount"=>$row['pcount'],"price"=>$row['price']];
		echo json_encode($output);
	}
?>