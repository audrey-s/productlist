<?php
	header("Content-type:application/json;charset=utf-8");
	//获得参数uname upwd
	@$uname=$_REQUEST['uname']or die('{"code":-2,"msg":"用户名不为空"}');
	@$upwd=$_REQUEST['upwd']or die('{"code":-3,"msg":"密码不为空"}');
	require('init.php');
	$sql="SELECT uid FROM jd_user WHERE uname='$uname' AND upwd='$upwd'";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_assoc($result);
	if($row==null){
		echo '{"code":-1,"msg":"用户名或者密码不正确"}';}else{
		$uid=$row['uid'];
		$output=["code"=>1,"msg"=>"登录成功","uname"=>$uname,"uid"=>$uid];
		echo json_encode($output);}

?>