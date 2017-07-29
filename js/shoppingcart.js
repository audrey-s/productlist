//利用cookie保存用户名和密码
//	var cookieArray=document.cookie.split("; ");
//	var cookieObj={};
//	for(var i=0;i<cookieArray.length;i++){
//		var sub=cookieArray[i].split("=");
//		var key=sub[0];
//		var val=sub[1];
//		cookieObj[key]=val;
//	}
//	console.dir(cookieObj);
//	if(!cookieObj.uid){
//		location.href="productlist.html";}

if(!sessionStorage.uid){
    location.href="productlist.html";
}

//页面加载完成
$(function(){
//功能一 动态加载头和尾	
	$("#header").load("data/header.php");
	$("#footer").load("data/footer.php");


//功能二 购物车
	$.ajax({
		type:"GET",
		url:"data/cartlist.php",
		data:{uid:sessionStorage.uid},
		success:function(data){
			//console.log(data);
			var html='';
			for(var i=0;i<data.length;i++){
				var d=data[i];
				//console.log(d);
				html+=`
				<tr>
                    <td>
                        <input type="checkbox"/>
                        <input type="hidden" value="1" />
                        <div><img src="${d.pic}" alt=""/></div>
                    </td>
                    <td><a href="">${d.pname}</a></td>
                    <td>${d.price}</td>
                    <td class="btn">
                        <button class="${d.cid}">-</button><input type="text" value="${d.pcount}"/><button class="${d.cid}">+</button>
                    </td>
                    <td><span class="sum">¥ ${+d.price*d.pcount}</span></td>
                    <td><a href="${d.cid}" class="btn-del">删除</a></td>
                </tr>
				`;
			}
            $("#cart>tbody").html(html);

            //总价
            var span = document.querySelectorAll('span.sum');
            console.log(span);
            var total=0;
            for(var j=0;j<span.length;j++) {
                total += parseFloat(span[j].innerHTML.slice(1))
            }
            console.log(total);
            $("#cart_footer span").html('¥'+total.toFixed(2));
		}
	});
});



//功能三  删除事件
	$("#cart_list").on("click","a.btn-del",function(e){
		e.preventDefault();
		var id=$(this).attr("href");
		var self=this;
		$.ajax({
			url:"data/cartdel.php",
			data:{cid:id},
			success:function(data){
				if(data.code>0){
					alert("确定删除吗？");
					$(self).parent().parent().remove();
                    //location.href="shoppingcart.html";
					location.reload(true);
				}else{
					alert("删除失败"+data.msg);
				}
			}

		});

	});




//功能四   button + 添加点击事件
$("#cart_list").on("click","td.btn>button:last-child",function(e){
	e.preventDefault();
	var cid=$(e.target).attr("class");
	console.log(cid);
	var self=$(e.target);
	$.ajax({
		url:"data/addcountcart.php",
		data:{cid:cid},
		success:function(data){
			var pcount=data.pcount;
			var price=data.price;
			$(self).prev().val(pcount);	
			$(self).parent().next().children().html(price*pcount);
            //location.href="shoppingcart.html";
            location.reload(true);
		}
	
	});
});

//功能五   button - 添加点击事件
$("#cart_list").on("click","td.btn>button:first-child",function(e){
	e.preventDefault();
	var cid=$(e.target).attr("class");
	var self=$(e.target);
	$.ajax({
		url:"data/subcountcart.php",
		data:{cid:cid},
		success:function(data){
		//将pcount的值写入到页面
			var pcount=data.pcount;
			var price=data.price;
			$(self).next().val(pcount);	
			$(self).parent().next().children().html(price*pcount);
            //location.href="shoppingcart.html";
            location.reload(true);
		}
	
	});
});


