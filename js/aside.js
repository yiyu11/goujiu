$(function() {
	/*********************************侧边栏*************************/
	function Sum() {
		var sum = 0;
		var count = 0;
		getCookieGoods(function(goods) {
			sum += goods.sum;
			count += goods.num;
		});
		$(".js").html("￥" + sum);
		$("#cnum").html(count);
		$(".shopcar>em").html(count);
		$(".xcar>b").html(count);
	}
	Sum();

	var toph = $(".top h1");
	var topimg = $(".top1 h1 img");
	toph.mouseover(function() {
		topimg.css({
			"transform": "rotateZ(180deg)",
			"transition": "all 1s"
		});
		$("#ewm").css({
			"display": "block"
		});
	}).mouseout(function() {
		topimg.css({
			"transform": "rotateZ(0deg)",
			"transition": "all 1s"
		});
		$("#ewm").css({
			"display": "none"
		});
	});

	function aside(elem, right, left) {
		elem.mouseenter(function() {
			$(this).siblings("div").css({"display": "block"});
			$(this).siblings("div").stop().animate({	
				"opacity": 1,
				"right": right,
			}, 500);

		}).mouseleave(function() {
			var that=$(this);
			$(this).siblings("div").stop().animate({
				"opacity": 0,
				"right": left
			}, 500,function(){
				that.siblings("div").css({"display": "none"});
			});
			
		});
	}
	aside($(".as>span"), 32, 150);
	aside($(".asm>span"), 215, 230);
	aside($(".asm1>span"), 145, 230);

	$(".aside ol>li").eq(1).click(function() {
		$("html,body").animate({
			"scrollTop": 0
		});
	})

	$(".shopcar").click(function() {
		window.location.href = "car.html";
	});
	$(".asg").children("span").click(function() {
		window.location.href = "car.html";
	});

	/*********************************菜单*******************************/

	$(".menu_1 h3").mouseenter(function() {
		$(this).children("ul").stop().slideDown();
	}).mouseleave(function() {
		$(this).children("ul").stop().slideUp();
	});

	var leftli = $(".menu>li");
	var divs = $(".gou1");

	leftli.mouseenter(function() {
		divs.eq($(this).index()).show();
	}).mouseleave(function() {
		divs.eq($(this).index()).hide();
	});

	$.ajax({
		type: "get",
		url: "json/list.json",
		dataType: "json"
	}).done(function(obj) {

		El(obj, $(".daren"));

		function El(obj, elem) {
			elem.children("li").remove();
			var sui = [];
			var rt = obj.baijiu[1];
			var zon = rt.length;
			for(var i = 0; i < 4; i++) {
				var n = 0;
				var flag;
				do {
					flag = true;
					n = Math.round(Math.random() * (zon - 1));
					for(var j in sui) {
						if(n == sui[j]) {
							flag = false;
							break;
						}
					}
				} while (flag == false)

				sui.push(n);
			}
			//console.log(sui, zon, rt);
			for(var k in sui) {
				var p = sui[k];
				var li = $("<li></li>");
				elem.append(li);
				var img = $("<img></img>");
				li.append(img);
				img[0].src = rt[p].img;
				var span = $("<span></span>");
				li.append(span);
				span.html("￥" + rt[p].price);
				span.addClass("mask_1");
			}
		}

	});

	succe();

	function succe() {
		var str = getCookie("user");
		if(str != "") {
			$(".top1>p").removeClass("nicheng");
			$(".top1>p").eq(1).addClass("nicheng");
			$("#nana").html(str);
			$("#user").html(str);
		} else {
			$(".top1>p").removeClass("nicheng");
			$(".top1>p").eq(0).addClass("nicheng");
			$("#user").html("");
		}
	}
	Exit($(".nicheng>span").eq(1));
	Exit($(".ttop_left>span").eq(2));

	function Exit(elem) {
		elem.click(function() {
			removeCookie("user");
			$(".top1>p").removeClass("nicheng");
			$(".top1>p").eq(0).addClass("nicheng");
			$("#user").html("");
		});

	}
	$.ajax({
		type: "get",
		url: "json/index.json",
		dataType: "json"
	}).done(function(str) {

		var arr = str[8];

		Menu3($("#gou1>.left1>ul"), $("#gou1>.right1>ol"), "first", arr[1], 1, 3, 0);
		Menu3($("#gou3>.left1>ul"), $("#gou3>.right1>ol"), "second", arr[2], 2, 2, 1);
		Menu3($("#gou2>.left1>ul"), $("#gou2>.right1>ol"), "second", arr[1], 2, 2, 0);
		Menu3($("#gou4>.left1>ul"), $("#gou4>.right1>ol"), "second", arr[3], 3, 0, 0);
		Menu3($("#gou5>.left1>ul"), $("#gou5>.right1>ol"), "second", arr[4], 2, 0, 0);
		Menu3($("#gou6>.left1>ul"), $("#gou6>.right1>ol"), "second", arr[5], 2, 0, 0);
		Menu3($("#gou7>.left1>ul"), $("#gou7>.right1>ol"), "second", arr[6], 2, 0, 0);
		Menu3($("#gou8>.left1>ul"), $("#gou8>.right1>ol"), "second", arr[7], 2, 0, 0);

		function Menu3(elem1, elem2, name2, brr, m, n, l) {
			var col = brr.gou;
			var n = m + n;
			var l = n + l;
			for(var i = 0; i < m; i++) {
				var st = col[i].name_j;
				var len = st.length;

				var li = $("<li class='" + name2 + "'><h6>" + col[i].name + "</h6></li>");
				elem1.append(li);
				var p = $("<p></p>");
				li.append(p);
				for(var z = 0; z < len; z++) {
					var a = $("<a href='#'>" + st[z] + "</a>");
					p.append(a);
				}

			}
			for(var j = m; j < n; j++) {
				var st = col[j].name_j;
				var len = st.length;
				//console.log(st, m, n);
				var li = $("<li><h6>" + col[j].name + "</h6></li>");
				var p = $("<p></p>");

				for(var x = 0; x < len; x++) {
					var a = $("<a href='#'>" + st[x] + "</a>");
					p.append(a);
				}
				li.append(p);
				elem1.append(li);

			}
			for(var g = n; g < l; g++) {
				var st = col[g].name_j;
				var len = st.length;

				var li = $("<li class='" + name2 + "'><h6>" + col[g].name + "</h6></li>");
				elem1.append(li);
				var p = $("<p></p>");
				li.append(p);
				for(var z = 0; z < len; z++) {
					var a = $("<a href='#'>" + st[z] + "</a>");
					p.append(a);
				}

			}
			Right(elem2, brr.adpic);

			function Right(elem2, str) {
				var leng = str.length;
				for(var i = 0; i < leng; i++) {
					var li1 = $("<li><a href='#'><img src=" + str[i] + "></a></li>");
					elem2.append(li1);
				}
			}
		}

	});

});