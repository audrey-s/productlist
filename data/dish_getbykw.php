<?php
    header('Content-type:application/json');
    @$kw=$_REQUEST['kw'];
    if(empty($kw)){
        echo '[]';
        return;
    }
    require('init.php');
    $sql="SELECT * FROM jd_cart WHERE pname LIKE '%$kw%'";
    $result=mysqli_query($conn,$sql);
        //var_dump($result);
        $output=[];
        while(true){
          $row=mysqli_fetch_assoc($result);
          if(!$row){
            break;
          }
          $output[]=$row;
        }
        echo json_encode($output);
?>