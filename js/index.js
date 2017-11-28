$(function(){
/********************************二维码********************/

var toph=$(".top h1");
var topimg=$(".top1 h1 img");
toph.mouseover(function(){
	topimg.css({
		"transform":"rotateZ(180deg)",
		"transition":"all 1s"
	});
	$("#ewm").css({"display":"block"});
}).mouseout(function(){
	topimg.css({
		"transform":"rotateZ(0deg)",
		"transition":"all 1s"
	});
	$("#ewm").css({"display":"none"});
});
/*********************************888********************************/
$(window).scroll(function(){
	var top=$(window).scrollTop();
	var h=$(window).height();
	if(top>=h){
		$(".sear").css({
			"display":"block"
		});	
	}else{
		$(".sear").css({
			"display":"none"
		});
	}	
});


///*********************************侧边栏*************************/




/**************************轮播*****************************/

var div = document.querySelector(".binner");
var ul = document.querySelector(".lunbo");
var ullis = Array.from(document.querySelectorAll(".lunbo>li"));
var lis = Array.from(document.querySelectorAll(".lunbo1>li"));
var now = 0;
var zIndex = 0;
// 给每一个ol中的li绑定点击事件

$(".zl").click(function(){
	now = --now;
	tab();
});
$(".yl").click(function(){
	now = ++now;
	tab();
});
lis.forEach(function(li, index){
	// li被点击的时候，ul的横轴坐标发生变化
	li.onmouseover = function(){		
		now = index;
		tab();
	}
});

function tab(){
	if(now==6){
		now=0;
	}

	lis.forEach(function(li, index){
		li.className = "";
		startMove(ullis[index], {"opacity": 0});
	});	

	lis[now].className = "selected";
	startMove(ullis[now], {"opacity": 100});
	ullis[now].style.zIndex = ++zIndex;
	if(now<0){
		now=0;
	}
}

function next(){
	now++;
	tab();
}

var timer = setInterval(next, 3000);

div.onmouseover = function(){
	clearInterval(timer);
}

div.onmouseout = function(){
	timer = setInterval(next, 3000);
}

/*********************************************************/
$(".binner").mouseenter(function(){
	$(".zl,.yl").css({
		"opacity":"1"
	});

}).mouseleave(function(){
	$(".zl,.yl").css({
		"opacity":"0"
	});
});

	

/************************************one*********************************/
 $.ajax({
       type:"get",
       url:"json/index.json",
       dataType:"json"
  }).done(function(obj){  
  	var aa=obj[7];
  	
  	var bb=aa[0].content;
  	console.log(bb[0]);
  	
  	
   	var arr=obj[0];
 
   	var len=arr.length;
   	var dong=$("#dong");
   for(var i=0;i<len;i++){
   		var col=arr[i];
   		var li=$("<li></li>");
   		dong.append(li);
   		var img=$("<img></img>");
   		li.append(img);
   		img[0].src=col.src;  		
   		
   		var div=$("<div></div>")
   		li.append(div);
   		
   		var p=$("<p></p>")
   		div.append(p);
   		p.html(col.content);
   		  		
   		var span=$("<span></span>")
   		div.append(span);
   		span.html(col.prace);
   }
   
   
   fn1($("#tleft"),$("#tright"),obj[1]);
   fn1($("#pleft"),$("#pright"),obj[2]);
   fn1($("#yleft"),$("#yright"),obj[3]);
   fn2($(".dian>ul"),obj[4]);
   fn3($(".jiu>ul"),obj[5]);
   fn4($(".shi>ul"),obj[6]);
   
function fn1(elem1,elem2,obj){
   
   var crr=obj;   
   var pleft=elem1;
   var pright=elem2;
   var crr_a=crr[0];
   var crr_b=crr[1];
   for(var i in crr_a){
   		var col=crr_a[i];
   		var li=$("<li></li>");
   		pleft.append(li);
   		
   		var img=$("<img></img>");
		li.append(img);
		img[0].src=col.src;
   }
   for(var j in crr_b){
   		var col=crr_b[j];
   		var li=$("<li></li>");
   		pright.append(li);
   			
   		var p1=$("<p></p>");
   		li.append(p1);
   		
   		var span0=$("<span></span>");
   		p1.append(span0);
   		span0.html(col.youhui);
   		
   		var h1=$("<h1></h1>");
   		li.append(h1);
   		
   		var img=$("<img></img>");
   		h1.append(img);
   		img[0].src=col.src;  		
   		
   		var p=$("<p></p>")
   		li.append(p);
   		p.html(col.content);
   		  		
   		var p2=$("<p></p>")
   		li.append(p2);
   		p2.html(col.prace);
   }
   
   }

	function fn2(elem,obj){
		var dian=elem;
		var brr=obj;
		var len=brr.length;  	
	   for(var i=0;i<len;i++){
	   		var col=brr[i];
	   		var li=$("<li></li>");
	   		dian.append(li);
	   		
	   		var h1=$("<h1></h1>");
   			li.append(h1);
   		
	   		var img=$("<img></img>");
	   		h1.append(img);
	   		img[0].src=col.src;	   		  		
	   		
	   		var p=$("<p></p>")
	   		li.append(p);
	   		p.html(col.content);
	   		 
	   		 var p1=$("<p></p>")
	   		li.append(p1);
	   		p1.html(col.prace);	
	   		  		
	   		var p2=$("<p></p>")
	   		li.append(p2);
	   		p2.html(col.haoping);
	   }
		
	}

	function fn3(elem,obj){
		var jiu=elem;
		var arr=obj;
		var l=arr.length;
		for(var i=0;i<l;i++){
			var col=arr[i];
			var li=$("<li></li>");
			jiu.append(li);
			
			var img=$("<img></img>");
	   		li.append(img);
	   		img[0].src=col.src;
			
			var div=$("<div></div>");
			li.append(div);
			div.addClass("jiuz");
			
			var p=$("<p></p>")
	   		div.append(p);
	   		p.html(col.content);
			p.addClass("content")
			
			var span=$("<span></span>");
			div.append(span);
			span.html(col.person);
			span.addClass("from");
			
			var div1=$("<div></div>");
			div.append(div1);
			div1.addClass("from1");
			
			var p=$("<p></p>")
	   		div1.append(p);
	   		p.html(col.jieshao);
			
			var span=$("<span></span>");
			div1.append(span);
			span.html(col.prace);
			
		}
		
	}
	
	function fn4(elem,obj){
		var ship=elem;
		var arr=obj;
		var l=arr.length;
		for(var i=0;i<l;i++){
			var col=arr[i];			
			var li=$("<li></li>");
			ship.append(li);						
			
			var img=$("<img></img>");
	   		li.append(img);
	   		img[0].src=col.pic;
	   		
	   		var span=$("<span></span>")
	   		li.append(span);
	   		span.html(col.bo);
	   		span.css({
	   			"padding":" 0 10px",
	   			"border-radius":"10px",
	   			"border":"3px solid #fff",
	   			"color":"#fff",
	   			"position":"absolute",
	   			"top":130,
	   			"left":20
	   		})
	   	    span.addClass("bofang");		
	   		var p=$("<p></p>")
	   		li.append(p);
	   		p.html(col.content);
	   		
		}
	}

   function animate(elem){
   		elem.mouseenter(function(){
			$(this).stop().animate({
				"top":-5,
				"box-shadow":"0 0 10px skyblue"
			},500);
	}).mouseleave(function(){
		$(this).stop().animate({
			"top":0
		},500);
	});  	
	}
   animate($("#dong>li"));
   animate($("#tright>li"));
   animate($("#tleft>li"));
   animate($("#pright>li"));
   animate($("#pleft>li"));
   animate($("#yright>li"));
   animate($("#yleft>li"));
   animate($("#jiu>li"));
   animate($("#shi>li"));

	$("#shi>li").mouseenter(function(){
		var n=$(this).index();
		$(".bofang").eq(n).css({
			"background":"#fdaa00",
			"border":"3px solid #fdaa00"
		});
		}).mouseleave(function(){
			var n=$(this).index();
			$(".bofang").eq(n).css({
			"background":"",
			"border":"3px solid #fff"
		});
		});
	

});

/************************************foot轮播*********************/

function wenzi(){
setInterval(next,2000);
var num=0;
function tab(){
	if(num==3){	
		$(".mid>ul").animate({
			"top":(-30)*num
		},500,function(){
			$(".mid>ul").css({"top":0});			
		});		
		num=0;
}else{			
		$(".mid>ul").animate({
			"top":(-30)*num
		});
	}		

}
function next(){
	num++;
	tab();
	
}
}
wenzi();

});