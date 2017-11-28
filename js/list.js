$(function() {

	

	$(window).scroll(function() {
		var top = $(window).scrollTop();
		if(top >= $(".xia").offset().top) {
			$(".bsear").css({
				"display": "block"
			});
		} else {
			$(".bsear").css({
				"display": "none"
			});
		}
	});

	$.ajax({
		type: "get",
		url: "json/list.json",
		dataType: "json"
	}).done(function(obj) {
		show_car();
		list(obj.baijiu[0]);

		function list(obj) {

			var name = obj[0].tiaojian;
			$(".lei").html('"' + name + '"&nbsp;&nbsp;');

			var l = obj.length;

			var dl = $("<dl></dl>");
			$(".choose").append(dl);
			dl.addClass("tiao");
			var dt = $("<dt></dt>");
			dl.append(dt);
			dt.html(obj[0].title);
			var dd = $("<dd></dd>");
			dl.append(dd);
			var p = $("<p></p>");
			dd.append(p);
			var b = $("<b></b>");
			p.append(b);
			b.html(obj[0].tiaojian);
			var span = $("<span></span>");
			p.append(span);
			span.html("×");

			var dl0 = $("<dl></dl>");
			$(".choose").append(dl0);
			dl0.addClass("renqi");
			var dt0 = $("<dt></dt>");
			dl0.append(dt0);
			dt0.html(obj[1].title);
			var dd0 = $("<dd></dd>");
			dl0.append(dd0);
			var ul = $("<ul></ul>");
			dd0.append(ul);
			var arr = obj[1].pingpai;
			var len = arr.length;
			for(var i = 0; i < len; i++) {
				var li = $("<li></li>");
				ul.append(li);
				li.html(arr[i]);
			}
			var span1 = $("<span></span>");
			dd0.append(span1);
			span1.html(obj[1].open);
			span1.addClass("click");
			var span2 = $("<span></span>");
			dd0.append(span2);
			span2.html(obj[1].close);
			for(var j = 2; j < l; j++) {
				if(j == l - 1) {
					if((typeof(obj[l - 1].content[0])) == "object") {
						var col = obj[j];
						var dl1 = $("<dl></dl>");
						$(".choose").append(dl1);
						var dt1 = $("<dt></dt>");
						dl1.append(dt1);
						dt1.html(col.title);
						var dd1 = $("<dd></dd>");
						dl1.append(dd1);
						var ul1 = $("<ul></ul>");
						dd1.append(ul1);
						ul1.addClass("more");
						var brr = col.content;
						var ll = brr.length;
						for(var i in brr) {
							var crr = brr[i];
							var li = $("<li></li>");
							ul1.append(li);
							li.html(crr.ne);

							var ol = $("<ol></ol>");
							li.append(ol);
							var drr = crr.content1;
							var dlen = drr.length;
							for(var i = 0; i < dlen; i++) {
								var li1 = $("<li></li>");
								ol.append(li1);
								li1.html(drr[i]);
							}
						}
					} else {
						var col = obj[j];
						var dl1 = $("<dl></dl>");
						$(".choose").append(dl1);
						var dt1 = $("<dt></dt>");
						dl1.append(dt1);
						dt1.html(col.title);
						var dd1 = $("<dd></dd>");
						dl1.append(dd1);
						var ul1 = $("<ul></ul>");
						dd1.append(ul1);
						var brr = col.content;
						var ll = brr.length;
						for(var i in brr) {
							var li = $("<li></li>");
							ul1.append(li);
							li.html(brr[i]);
						}
					}
				} else {
					var col = obj[j];
					var dl1 = $("<dl></dl>");
					$(".choose").append(dl1);
					var dt1 = $("<dt></dt>");
					dl1.append(dt1);
					dt1.html(col.title);
					var dd1 = $("<dd></dd>");
					dl1.append(dd1);
					var ul1 = $("<ul></ul>");
					dd1.append(ul1);
					var brr = col.content;
					var ll = brr.length;
					for(var i in brr) {
						var li = $("<li></li>");
						ul1.append(li);
						li.html(brr[i]);
					}

				}
			}

		}
		
//		El(obj, $(".daren"));
//
//		function El(obj, elem) {
//			elem.children("li").remove();
//			var sui = [];
//			var rt = obj.baijiu[1];
//			var zon = rt.length;
//			for(var i = 0; i < 4; i++) {
//				var n = 0;
//				var flag;
//				do {
//					flag = true;
//					n = Math.round(Math.random() *  (zon-1));
//					for(var j in sui) {
//						if(n == sui[j]) {
//							flag = false;
//							break;
//						}
//					}
//				} while (flag == false)
//
//				sui.push(n);
//			}
//			console.log(sui, zon, rt);
//			for(var k in sui) {
//				var p = sui[k];
//				var li = $("<li></li>");
//				elem.append(li);
//				var img = $("<img></img>");
//				li.append(img);
//				img[0].src = rt[p].img;
//				var span = $("<span></span>");
//				li.append(span);
//				span.html("￥"+rt[p].price);
//				span.addClass("mask_1");
//			}
//		}

		
		var count = 0;
		$(".renqi dd span").click(function() {
			console.log(count);
			count++;
			if(count == 1) {
				$(".renqi dd span").removeClass("click");
				$(".renqi dd span").eq(1).addClass("click");
				$(".renqi dd ul").css({
					"height": "auto",
					"overflow": "hidden"
				});
			} else {
				$(".renqi dd span").removeClass("click");
				$(".renqi dd span").eq(0).addClass("click");
				$(".renqi dd ul").css({
					"height": 124,
					"overflow": "hidden"
				});
				count = 0;
			}

		});
		$(".more>li").children("ol").css({
			"left": 0
		})
		$(".more>li").mouseenter(function() {
			$(this).children("ol").stop().slideDown();
		}).mouseleave(function() {
			$(this).children("ol").stop().slideUp();
		})



		show(obj.baijiu[1], $("#sli"));
		show(obj.baijiu[2], $("#fli"));

		var tot = obj.baijiu[1].length;
		$(".sum").html(tot);

		function show(obj, elem) {
			var total = obj.length;

			obj.forEach(function(goods, index) {
				var li = $("<li></li>");
				elem.append(li);

				var div = $("<div></div>");
				li.append(div);
				div.addClass("drag");
				
				var h1 = $("<h1></h1>");
				div.append(h1);

				var img = $("<img></img>");
				h1.append(img);
				img[0].src = goods.img;

				var img1 = $("<img></img>");
				h1.append(img1);
				img1[0].src = goods.pic;

				var p = $("<p></p>");
				div.append(p);
				p.html(goods.intro);
				p.addClass("intro")

				var span = $("<span></span>");
				div.append(span);
				span.addClass("spa")
				var em = $("<em></em>");
				span.append(em);
				em.html(goods.you);

				var span1 = $("<span></span>");
				span.append(span1);
				span1.html(goods.hui);

				var p1 = $("<p></p>");
				li.append(p1);
				p1.addClass("pri");

				var em = $("<em></em>");
				p1.append(em);
				em.html(goods.rmb)

				var b = $("<b></b>");
				p1.append(b);
				b.html(goods.price);

				var span2 = $("<span></span>");
				p1.append(span2);
				span2.html("加入购物车");

				span2.click(function() {
					var img = $("<img></img>");
					var sption = $(this);
					var spleft = sption.offset().left;
					var sptop = sption.offset().top;
					var spth=$(this).parent().parent();
					img.addClass("fly");
					img[0].src=goods.img;
					document.body.appendChild(img[0]);

					img[0].style.left = spleft + "px";
					img[0].style.top = sptop + "px";				
					var x0 = $(".asg").offset().left;
					var y0 = $(".asg").offset().top+10;

					img.animate({
						"left": x0,
						"top": y0,
						"width": 32,
						"height": 32
						
					},1000,function(){						
						img.remove();
						var ss=getCookie("add"+goods.id);
						//console.log(ss);
						if(ss==""){
							var addc=new Object();
							addc.id=goods.id;
							addc.img=goods.img;
							addc.intro=goods.intro;
							addc.price=goods.price;
							addc.hui=goods.hui;
							addc.num=1;
							addc.sum=Number(addc.price)*addc.num;
							ss=addc;
						}else{
							ss.num=Number(ss.num)+1;
							ss.sum=Number(ss.price)*ss.num;
						}						
						setCookie("add"+goods.id,ss,100);
						show_car();
						show_car1();
					});
					});

				var p2 = $("<p></p>");
				li.append(p2);
				p2.html("评价：" + goods.count + "条");
				p2.addClass("cou");
			});
			
			

		}
		
		function show_car(){
				var count1=0;
				getCookieGoods(function(goods){					
					count1+=goods.num;										
				});			
				$("#gcount").html(count1);
				$(".shopcar>em").html(count1);
			}
		function show_car1(){
			$(".asg>div").show();
			
		}
		$(".shan>b").click(function(){
			$(".asg>div").hide();
		});
//					var offsetX = x0-spleft;	
//					var offsetY = y0-sptop;
//					var a = 0.001;
//					var c = 0;
//					var b = ( offsetY - a*offsetX*offsetX - c ) / offsetX;
//					var x=0, y=0;
//					var timer = setInterval(function(){					
//						x += 1;	//物体向右抛						
//						y = a*x*x + b*x + c;
//						
//						img[0].style.left = (spleft+x)+"px";	// 真实坐标  = 起点+偏移
//						img[0].style.top = (sptop+y)+"px";
//
//						if( x >= offsetX ){	// 如果物体向右抛时，用这个判断
//							clearInterval(timer);
//						}
//					
//					}, 0.5);
					//console.log(sption,spleft,sptop,x,y);
			
				
		var ti = obj.baijiu[1];
		$(".drag").click(function(e) {
			e.stopPropagation();
			var x = $(this).parent().index();
			location.href = "detail.html?id=" + ti[x].id + "";
		});

		function move(elem) {
			elem.mouseenter(function() {
				$(this).siblings("img").stop().animate({
					"left": 0
				});
			}).mouseleave(function() {
				$(this).siblings("img").stop().animate({
					"left": 230
				});
			});
		}
		move($("#sli>li>div>h1>img:first-child"));
		move($("#fli>li>div>h1>img:first-child"))

	});

});