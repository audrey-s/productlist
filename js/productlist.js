if(sessionStorage.uid){
    $("div.modal").hide();
}else{
    $("p.alert").show();
}
//功能模块一，用户登录
var bt=document.getElementById("bt-login");
	bt.onclick=function(){
	var n=$("#uname").val();
	var p=$("#upwd").val();
	$.ajax({
		type:"POST",
		url:"data/login.php",
		data:{uname:n,upwd:p},
		success:function(data){
			if(data.code<0){
				$("p.alert").html(data.msg);
			}else{
				$("div.modal").hide();
				//保存用户名和用户uid
				uname=data.uname;
				uid=data.uid;
                sessionStorage.setItem('uname',data.uname);
                sessionStorage.setItem('uid',data.uid);
				//console.log(sessionStorage.uname,sessionStorage.uid);
			}
		}
	});
}
var uname='';
var uid='';

//页面加载成功事件
$(function(){
	show(1);

//等页面加载成功后 异步请求页头和页尾
	$("#header").load("data/header.php", function () {
        $("#welcome").html("欢迎回来 "+ sessionStorage.uname);
    });
	$("#footer").load("data/footer.php");

});


//分页显示   为页面添加点击功能
$("ol.pager").on('click','li a',function(e){
  e.preventDefault();
  var pno = $(this).html();
  show(pno);
});


//获取当前页内容ajax，并且更新页面ajax，保存函数
function show(pno){
	$.ajax({
		type:"GET",
		url:"data/productlist.php?pno="+pno,
		success:function(data){
			var html='';
			//console.log(data.length);
			for(var i=0;i<data.length;i++){
				var d=data[i];
			html+=`
				<li>
				<a href=""><img src="${d.pic}" alt=""/></a>
				<p>￥${d.price}</p>
				<h1><a href="">${d.pname}</a></h1>
				<div>
					<a href="" class="contrast"><i></i>对比</a>
					<a href="" class="p-operate"><i></i>关注</a>
					<a href="${d.pid}" class="addcart"><i></i>加入购物车</a>
				</div>
                 </li>`;
				//console.log(d.pid);
			}
			$("#plist>ul").html(html);
		}
	});
	
	//产品分页
	$.ajax({
		url:"data/productpage.php",
		success:function(data){
			var html='';
			for(var i=1;i<=data.page;i++){
				html+=`<li><a href="#">${i}</a></li>`;
			}
			$("ol.pager").html(html);
		}
	});

}


//添加到购物车功能
$("#plist").on("click","a.addcart",function(e){
	e.preventDefault();
	var p=$(e.target).attr("href");
	$.ajax({
		type:"POST",
		url:"data/add_cart.php",
		data:{pid:p,uid:sessionStorage.uid},
		success:function(data){
			//console.log(data.code);
			if(data.code>0){
				alert("添加成功，该商品已购买："+data.pcount);
			}else{
                alert("添加商品失败"+data.msg);
			}
		},
		error:function(data){
			console.log("添加商品失败请检查网络");
		}
	});
});


//去购物车结算，动态添加的元素,页面跳转到shoppingcart.html
	$("body").on("click","#settle_up",function(){
		location.href="shoppingcart.html";
	});


//模糊查询 txtSearch

$('#btnSearch').click(function (e) {
    var kw=$(e.target).prev();
    console.log(kw);
    //$.ajax({
    //    type:"GET",
    //    url:"data/dish_getbykw.php?kw="
})










