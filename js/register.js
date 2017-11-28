phone.onblur=shouji;
psd1.onblur=pass;
psd2.onblur=pass;


ema.onblur=youxiang;
psd10.onblur=pass1;
psd20.onblur=pass1;


$("#btn").click(function(){
	var str1=phone.value;
	var str2=psd1.value;
	var str3=psd2.value;
	var str4=inpy.value;
	if(str1==""){
		alert("请输入手机号或邮箱");
	}else{
		shouji();
		if(sphone.innerHTML!=""){
			alert(sphone.innerHTML);
		}else{
			pass();
			if(spsd1.innerHTML!=""){
				alert(spsd1.innerHTML);
			}else{
					pass();
					if(spsd2.innerHTML!=""){
						alert(spsd2.innerHTML);
					}else{
						if( yan.value.toLowerCase() != syan.innerHTML.toLowerCase() ){
							alert("验证码错误");
						}else{
							 if(str4){
							setCookie(str1,str2,10);
							window.location.href="login.html";
						}else{
							alert("请获取验证码并输入");
						}	
						}					
					}
				}
		}			
	}	
});

$("#infor1>ol>li>input").focus(function(){
	$(this).parent().children("span").removeClass("error").removeClass("success").html("");
	$(this).parent().css({
		"border":"1px solid skyblue",
		"box-shadow":"0 0 5px skyblue"
	});
}).blur(function(){
	if($(this).siblings("span")[0].className=="error"){
		$(this).parent().css({
		"border":"1px solid red",
		"box-shadow":"0 0 5px red"
	});
	}else if($(this).siblings("span")[0].className=="success"){
		$(this).parent().css({
		"border":"1px solid green",
		"box-shadow":"0 0 5px green"
	});
	}else{
		$(this).parent().css({
		"border":"1px solid #ccc",
		"box-shadow":"none"
	});
	}
});
$("#infor2>ol>li>input").focus(function(){
	$(this).parent().children("span").removeClass("error").removeClass("success").html("");
	$(this).parent().css({
		"border":"1px solid skyblue",
		"box-shadow":"0 0 5px skyblue"
	});
}).blur(function(){
	if($(this).siblings("span")[0].className=="error"){
		$(this).parent().css({
		"border":"1px solid red",
		"box-shadow":"0 0 5px red"
	});
	}else if($(this).siblings("span")[0].className=="success"){
		$(this).parent().css({
		"border":"1px solid green",
		"box-shadow":"0 0 5px green"
	});
	}else{
		$(this).parent().css({
		"border":"1px solid #ccc",
		"box-shadow":"none"
	});
	}
});

function shouji(){
	var str=phone.value;
	if(str!=""){
	var cook=getCookie(str);
	if(cook==""){
	var rel=phon(str);
	if(rel&&str!=""){
		sphone.innerHTML="";
		sphone.className="success";
	}else{
		sphone.innerHTML="请输入手机号";
		sphone.className="error";
	}
	}else{
		sphone.innerHTML="该用户已注册";
		sphone.className="error";
	}
	}else{
		sphone.innerHTML="请输入手机号";
		sphone.className="error";
	}

}
function pass(){
	var str=psd1.value;
	var str1=psd2.value;
	var rel=passw(str);
	spsd1.innerHTML=spsd2.innerHTML="";
	spsd1.className=spsd2.className="";
	if(rel&&str!=""){
		spsd1.innerHTML="";
		spsd1.className="success";
		if(str==str1){
			spsd2.innerHTML="";
			spsd2.className="success";
		}else if(str1!=""){
			spsd2.innerHTML="请输入相同的密码";
			spsd2.className="error";
		}				
	}else{
		spsd1.innerHTML="请输入密码";
		spsd1.className="error";
	}
}

function yangzhen(elem,elem0,elem1){
	function rndCode(){
	var str = "0123456789";
	var len = str.length;	// 取长度
	// 取5个随机下标
	var ind1 = parseInt(Math.random()*len);	// 取随机下标
	var ind2 = parseInt(Math.random()*len);
	var ind3 = parseInt(Math.random()*len);
	var ind4 = parseInt(Math.random()*len);
	var ind5 = parseInt(Math.random()*len);
	// 通过字符串拼接的方式，把随机验证码取出来
	return str[ind1]+str[ind2]+str[ind3]+str[ind4]+str[ind5];
}

// 把随机验证码显示在页面上
elem0.innerHTML = rndCode();	// 先执行函数，该函数的返回值，赋给innerHTML属性上
// 刷新验证码
elem1.onclick = function(){
	elem0.innerHTML = rndCode();
}

// 验证码是否一致
function chkCode(){
	
	if( elem.value.toLowerCase() == elem0.innerHTML.toLowerCase() ){
		
	}else{
		 alert("验证码错误");	
	}

}
	
}
function yang(){
	yangzhen(yan,syan,huan);
    yangzhen(yan0,syan0,huan0);
}
yang();




/*****************************************选项卡******************************/

$(".ka>li").click(function(){
	$(".ka>li").children("span").removeClass("backg");
	$(this).children("span").addClass("backg");
	$("#infor1,#infor2").removeClass("infor1");
	$("#infor1,#infor2").eq($(this).index()).addClass("infor1");
});

/*****************************************邮箱***************************/

$("#btn0").click(function(){
	var str1=ema.value;
	var str2=psd10.value;
	var str3=psd20.value;
	if(str1==""){
		alert("请输入邮箱号");
	}else{
		youxiang();
		if(sema.innerHTML!=""){
			alert(sema.innerHTML);
		}else{
			pass1();
			if(spsd10.innerHTML!=""){
				alert(spsd10.innerHTML);
			}else{
					pass1();
					if(spsd20.innerHTML!=""){
						alert(spsd20.innerHTML);
					}else{
						if( yan0.value.toLowerCase() != syan0.innerHTML.toLowerCase() ){
							alert("验证码错误");
						}else{
							setCookie(str1,str2,10);
							window.location.href="login.html";
						}					
					}
				}
		}			
	}	
	
	
});


function youxiang(){
	var str=ema.value;
	if(str!=""){
	var cook=getCookie(str);
	if(cook==""){
	var rel=em(str);
	if(rel&&str!=""){
		sema.innerHTML="";
		sema.className="success";
	}else{
		sema.innerHTML="请输入邮箱号";
		sema.className="error";
	}
	}else{
		sema.innerHTML="该用户已注册";
		sema.className="error";
	}
	}else{
		sema.innerHTML="请输入邮箱号";
		sema.className="error";
	}

}
function pass1(){
	var str=psd10.value;
	var str1=psd20.value;
	var rel=passw(str);
	spsd10.innerHTML=spsd20.innerHTML="";
	spsd10.className=spsd20.className="";
	if(rel&&str!=""){
		spsd10.innerHTML="";
		spsd10.className="success";
		if(str==str1){
			spsd20.innerHTML="";
			spsd20.className="success";
		}else if(str1!=""){
			spsd20.innerHTML="请输入相同的密码";
			spsd20.className="error";
		}				
	}else{
		spsd10.innerHTML="请输入密码";
		spsd10.className="error";
	}
}



/*************************************背景图************************/

//$(".main").css("background")
