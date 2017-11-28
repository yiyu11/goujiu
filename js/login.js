$("#dbtn").click(function(){
	var stt=lphone.value;
	if(stt!=""){
	var str=getCookie(stt);
	if(str){		
		if(lpsd1.value==str){
			if($("#che")[0].checked){
				console.log(11);
				setCookie("user",stt,100);	
				window.location.href="index.html";	
			}else{
				setCookie("user",stt);
				window.location.href="index.html";	
			}
				
		}else{
			alert("账号或密码错误");
		}		
	}else{
		alert("该用户未注册");
	}
	}
	else{
		alert("用户名不能为空")
	}
});

