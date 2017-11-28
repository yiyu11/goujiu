$(function() {

	$(window).scroll(function() {
		var top = $(window).scrollTop();
		var h = $(".middle>ul>li").offset().top;
		if(top >= h) {
			$(".tuwen").css({
				"display": "block"
			});
		} else {
			$(".tuwen").css({
				"display": "none"
			});
		}
	});

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


	$.ajax({
		type: "get",
		url: "json/list.json",
		dataType: "json"
	}).done(function(obj) {
		function query(st) {
			var str = location.search.replace("?", "");
			var arr = str.split("&");
			for(var i in arr) {
				var col = arr[i].split("=");
				if(col[0] == st) {
					return col[1];
				}
			}
			return "";
		}

		var id = query("id");

		var obj1 = obj.baijiu[1].filter(function(obj) {
			return obj.id == id;
		})[0];
		//console.log(obj);
		$("#det").html(obj1.name + "&nbsp;&nbsp;>");
		$("#about").html(obj1.intro);
		$("#title").html(obj1.intro);
		$("#price").html(obj1.price);
		$(".att").html(obj1.att);
		$(".ping").html(obj1.count);
		$(".fen").html(obj1.fen);
		$("#money").html("￥" + obj1.price);

		ping($(".right_1"), obj1.pp, obj1.zy)

		function ping(elem, str1, str2) {
			var span = $("<span></span>");
			elem.append(span);
			span.html(str1);

			var span1 = $("<span></span>");
			elem.append(span1);
			span1.html(str2);

		}

		function imgs(small, arr, brr, big) {
			var l = arr.length;
			//console.log(arr);
			for(var i = 0; i < l; i++) {
				//console.log(l);
				var li = $("<li></li>");
				small.append(li);
				var img = $("<img></img>");
				li.append(img);
				img[0].src = arr[i];
				//console.log(arr[i]);
			}
			var img1 = $("<img></img>");
			big.append(img1);
			img1[0].src = brr[0];
		}

		imgs($(".main_2>.left>ul"), obj1.photo, obj1.photos, $(".left_1"));

		function place(elem, arr) {
			var ar = arr.huabei;
			var al = ar.length;
			var br = arr.huazhong;
			var bl = br.length;
			var cr = arr.huanan;
			var cl = cr.length;
			//console.log(ar,br,cr);

			Ff(elem, ar, al);
			Ff(elem, br, bl);
			Ff(elem, cr, cl);

			function Ff(elem, col, l) {
				var li = $("<li></li>");
				elem.append(li);
				var span = $("<span></span>");
				li.append(span);
				span.html(col[0].diq);
				for(var i = 1; i < l; i++) {
					var a = $("<a></a>")
					li.append(a);
					a.html(col[i].dim);
				}
			}

		}

		place($(".choose_1>ul"), obj1.place);
		El(obj, $(".dajia>ul"));

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
				span.html(rt[p].intro);
				var em = $("<em></em>");
				li.append(em);
				em.html("￥" + rt[p].price);
			}
		}

		Xq($(".xq>ul"), obj1.xq);

		function Xq(elem, arr) {
			//console.log(arr);
			var len = arr.length;
			for(var i in arr) {
				var li = $("<li></li>");
				elem.append(li);
				var em = $("<em></em>");
				li.append(em);

				var span = $("<span></span>")
				li.append(span);
				span.html(arr[i]);
			}
		}
		Bigpic($(".intrduce"), obj1.intrduce);

		function Bigpic(elem, arr) {
			var len = arr.length;
			for(var i = 0; i < len; i++) {
				if(i == len - 1) {
					var div = $("<div></div>");
					elem.append(div);
					var h1 = $("<h1></h1>");
					div.append(h1);

					var img = $("<img></img>");
					h1.append(img);
					img[0].src = arr[i];
				} else {
					var div = $("<div></div>");
					elem.append(div);

					var img = $("<img></img>");
					div.append(img);
					img[0].src = arr[i];
				}
			}

		}
		$(".middle>ul>li").click(function() {
			var h = $(".middle>ul>li").offset().top;
			var h1 = $(".cart").offset().top;
			var i = $(this).index();
			if(i == 0) {
				$("html,body").animate({
					"scrollTop": h
				});
			} else {
				$("html,body").animate({
					"scrollTop": h1
				});
			}

		});

		$("#dec").click(function() {
			var num = Number($("#total").val()) - 1;
			//console.log(num);
			if(num <= 0) {
				//tr.parent().parent().remove();
				num = 1;
				alert("商品数不能小于1");
				$("#total").val(num);
			}
			$("#total").val(num);

		});
		$("#add").click(function() {
			var num = Number($("#total").val()) + 1;
			$("#total").val(num);

		});
		$("#mai").click(function(){
			var ss = getCookie("add" + obj1.id);
				//console.log(ss);
				var nu=Number($("#total").val());
				if(ss == "") {
					var addc = new Object();
					addc.id = obj1.id;
					addc.img = obj1.img;
					addc.intro = obj1.intro;
					addc.price = obj1.price;
					addc.hui = obj1.hui;
					addc.num=nu;	
					addc.sum = Number(addc.price) * addc.num;
					ss = addc;
				} else {
					ss.num = Number(ss.num)+ nu;
					ss.sum = Number(ss.price) * ss.num;
				}
				setCookie("add" + obj1.id, ss, 100);
				window.location.href="car.html";
		});
		$("#jia").click(function() {
			var img = $("<img></img>");
			var sption = $(this);
			var spleft = sption.offset().left;
			var sptop = sption.offset().top;
			var spth = $(this).parent().parent();
			img.addClass("fly");
			img[0].src = obj1.img;
			document.body.appendChild(img[0]);

			img[0].style.left = spleft + "px";
			img[0].style.top = sptop + "px";

			var x0 = $(".asg").offset().left;
			var y0 = $(".asg").offset().top + 10;
			console.log(spleft,sptop,x0,y0);
			img.animate({
				"left": x0,
				"top": y0,
				"width": 32,
				"height": 32
			}, 1000, function() {
				img.remove();
				var ss = getCookie("add" + obj1.id);
				//console.log(ss);
				var nu=Number($("#total").val());
				if(ss == "") {
					var addc = new Object();
					addc.id = obj1.id;
					addc.img = obj1.img;
					addc.intro = obj1.intro;
					addc.price = obj1.price;
					addc.hui = obj1.hui;
					addc.num=nu;	
					addc.sum = Number(addc.price) * addc.num;
					ss = addc;
				} else {
					ss.num = Number(ss.num)+ nu;
					ss.sum = Number(ss.price) * ss.num;
				}
				setCookie("add" + obj1.id, ss, 100);
				show_car1();
				$("#total").val("1");
				Sum();
			});
		});
		
		$(".jcar").click(function(){
			var ss = getCookie("add" + obj1.id);
				//console.log(ss);
				var nu=Number($("#total").val());
				if(ss == "") {
					var addc = new Object();
					addc.id = obj1.id;
					addc.img = obj1.img;
					addc.intro = obj1.intro;
					addc.price = obj1.price;
					addc.hui = obj1.hui;
					addc.num=nu;	
					addc.sum = Number(addc.price) * addc.num;
					ss = addc;
				} else {
					ss.num = Number(ss.num)+ nu;
					ss.sum = Number(ss.price) * ss.num;
				}
				setCookie("add" + obj1.id, ss, 100);
				show_car1();
				$("#total").val("1");
				Sum();
		});


		function show_car1() {
			$(".asg>div").show();
		}
		$(".shan>b").click(function() {
			$(".asg>div").hide();
		});

		$(".tuwen>a").click(function() {

			var h = $(".middle>ul>li").offset().top - 50;
			var h1 = $(".cart").offset().top;
			var i = $(this).index();
			$(".tuwen>a").removeClass("selected_1");
			$(this).addClass("selected_1");
			if(i == 0) {

				$("html,body").animate({
					"scrollTop": h
				});
			} else {
				$("html,body").animate({
					"scrollTop": h1
				});
			}
		});

		$(".cart>li").click(function() {
			var i = $(this).index();
			$(".cart>li").removeClass("selected2");
			$(this).addClass("selected2");
			if(i == 0) {
				$(".allp_2").css({
					"display": "none"
				});
				$(".allp_1").css({
					"display": "block"
				});
			} else {
				$(".allp_1").css({
					"display": "none"
				});
				$(".allp_2").css({
					"display": "block"
				});

			}
		});

		$(".gz").mouseenter(function() {
			$(".gz_1").show();
			console.log(1);
		}).mouseleave(function() {
			$(".gz_1").hide();
		});

		$("#saoma").mouseover(function() {
			$("#saoma_1").show();
			$("#saoma_1").css({
				"box-shadow": "0 0 5px gray"
			});
		}).mouseout(function() {
			$("#saoma_1").hide();

		});

		$(".choose").mouseenter(function() {
			$(".choose_1").show();
		}).mouseleave(function() {
			$(".choose_1").hide();
		});
		$(".choose_1>ul>li>a").click(function() {
			var str = $(this).html();
			//		var obj=obj.place.filter(function(obj){
			//		return obj.dim==str;
			//		})[0];
			//		console.log(obj);
			$("#show").html(str + "∨");
		});

		$(".left>ul>li").mouseenter(function() {
			var n = $(this).index();
			$(".left_1>img")[0].src = "imgd/" + ++n + ".jpg";
		});

		function Enter(elem) {
			this.mouse = elem;

			this.img = this.mouse.children("img");
			var that = this;
			this.mouse.mouseenter(function(e) {

				that.img.css({
					"width": 650,
					"height": 650,
					"left": -115,
					"top": -115
				})

			}).mousemove(function(e) {
				var x = e.pageX - that.mouse.offset().left;
				var y = e.pageY - that.mouse.offset().top;
				if(x > 230) {
					x = 230
				}
				if(y > 230) {
					y = 230
				}
				that.img.css({
					"left": -x,
					"top": -y
				});
			}).mouseleave(function() {
				that.img.css({
					"width": 420,
					"height": 420,
					"left": 0,
					"top": 0
				});

			});
		}

		new Enter($(".left_1"));

	});

});