<?php
	header("Content-type:text/html;charset=utf-8");
	//获得参数uname upwd
	@$uname=$_REQUEST['uname']or die('用户名是必须的');
	@$upwd=$_REQUEST['upwd']or die('密码是必须的');
	require('init.php');
	$sql="INSERT INTO jd_user VALUES(null,'$uname','upwd')";
	$result=mysqli_query($conn,$sql);
	if($result==true){
		echo "注册成功";
	}else{
		echo "注册失败";
	}
?>