$(function() {
	//show_car();

//	function show_car() {
//		var count=0;
//		getCookieGoods(function(goods) {
//			count+=goods.num;
//			
//		});
//		$("#cnum").html(count);
//
//	}
	Sum();
	function Sum() {
			var sum = 0;
			var count=0;
			getCookieGoods(function(goods) {
				sum += goods.sum;
				count+=goods.num;
			});
			$(".js").html("￥" + sum);
			$("#cnum").html(count);
		}
	$(".ttop_right>ul>li").mouseenter(function() {
		$(this).children("ol").show();

		$(this).has("ol").css({
			"background": "#fff",
			"border-top": "1px solid #ccc",
			"border-left": "1px solid #ccc",
			"border-right": "1px solid #ccc"
		})

	}).mouseleave(function() {
		$(this).children("ol").hide();
		$(this).css({
			"background": "#f1f1f1",
			"border": "none"
		})
	});
	showcat($(".mid_body"));

	function showcat(elem) {
		var sum = 0;

		elem.children("table").remove();
		getCookieGoods(function(goods) {
			sum = sum + goods.sum;

			var table = $("<table cellspacing='0'></table>");
			elem.append(table);
			table.addClass("tbody");

			var tr = $("<tr></tr>");
			table.append(tr);

			var td0 = $("<td></td>");
			tr.append(td0);
			td0.addClass("td0");

			var sp = $("<span></span>");
			td0.append(sp);

			var cho = $("<input type='checkbox' value='" + goods.id + "'></input>");
			sp.append(cho);

			var img = $("<img></img>");
			td0.append(img);
			img[0].src = goods.img;

			var td2 = $("<td></td>");
			tr.append(td2);
			td2.addClass("td2");

			var span = $("<span></span>");
			td2.append(span);
			span.html(goods.intro);

			var td3 = $("<td></td>");
			tr.append(td3);
			td3.addClass("td3");

			var span1 = $("<span></span>");
			td3.append(span1);
			span1.html("￥" + goods.price);

			var td4 = $("<td></td>");
			tr.append(td4);
			td4.addClass("td4");

			var span2 = $("<span></span>");
			td4.append(span2);
			span2.html(goods.hui);
			if(goods.hui == "") {
				span2.html("-");
			} else {

			}

			var td5 = $("<td></td>");
			tr.append(td5);
			td5.addClass("td5");

			var dec = $("<input type='button' value='-'>");
			td5.append(dec);
			dec.css({
				"width": 17,
				"height": 20,
				"border": "1px solid #ccc",
				"background": "white"
			});

			var inp = $("<input type='text'>");
			td5.append(inp);
			inp.val(goods.num);
			inp.css({
				"width": 37,
				"height": 20,
				"border": "1px solid #ccc",
				"text-align": "center",
				"margin": "0 5px",

			});

			var add = $("<input type='button' value='+'>");
			td5.append(add);
			add.css({
				"width": 17,
				"height": 20,
				"border": "1px solid #ccc",
				"background": "white"
			});

			inp.blur(function(){
				var num=Number(inp.val());
				goods.num=num;
				goods.sum = Number(goods.price) * goods.num;
				td6.html("￥" + goods.sum);
				setCookie("add" + goods.id, goods, 100);
				Sum();
				
			});
			dec.click(function() {
				var num = Number(inp.val()) - 1;
				//console.log(num);
				inp.val(num);
				goods.num = num;
				if(num <= 0) {
					//tr.parent().parent().remove();
					alert("购买的上商品数不能为-1！");
					num = 1;
					inp.val(num);
					goods.num = num;
				} else {
					goods.sum = Number(goods.price) * goods.num;
					setCookie("add" + goods.id, goods, 100);
					td6.html("￥" + goods.sum);
					Sum();
					//show_car();
				}
			});

			add.click(function() {
				var num = Number(inp.val()) + 1;
				//console.log(num);
				inp.val(num);
				goods.num = num;
				if(num <= 0) {
					//tr.parent().parent().remove();
					alert("购买的上商品数不能为-1！");
					num = 1;
					inp.val(num);
					goods.num = num;
				} else {
					goods.sum = Number(goods.price) * goods.num;
					setCookie("add" + goods.id, goods, 100);
					td6.html("￥" + goods.sum);
					Sum();
					//show_car();
				}
			});

			var td6 = $("<td></td>");
			tr.append(td6);
			td6.addClass("td6");
			td6.html("￥" + goods.sum);

			var td7 = $("<td></td>");
			tr.append(td7);
			td7.addClass("td7");

			var span00 = $("<span></span>");
			td7.append(span00);
			span00.html("收藏");
			span00.addClass("dian");

			var span01 = $("<span></span>");
			td7.append(span01);
			span01.html("删除");
			span00.addClass("dian");

			span00.click(function() {
				alert("收藏成功！")
			});
			span01.click(function() {
				removeCookie("add" + goods.id);
				$(this).parent().parent().parent().parent().remove();
				Sum();
//				show_car();
			});

		});
		Sum();

		

		$("#allchoose,#fall").click(function() {
			var v = this.checked;
			$(".td0 input,#fall,#allchoose").each(function(index, c) {
				c.checked = v;
			});
		});

		$("#del").click(function() {
			if(confirm("你确定要删除该商品？")) {
				//console.log(11);
				$(".td0>span>input").each(function(index, c) {
					//console.log(c);
					if(c.checked) {
						var str = $(c).parent().parent().parent().parent().parent();
						console.log(str, c, c.value);
						str.remove();
						removeCookie("add" + c.value);
						Sum();
						//show_car();
					}
				});
			}
		});

		$("#remove").click(function() {	
			if(confirm("你确定要清空购物车？")) {
			$(".td0>span>input").each(function(index, c) {
				var str = $(c).parent().parent().parent().parent().parent();
				console.log(str, c, c.value);
				str.remove();
				removeCookie("add" + c.value);
				Sum();
//				show_car();
			});
			}
		});
	};

	$.ajax({
		type: "get",
		url: "json/list.json",
		dataType: "json"
	}).done(function(obj) {

		Fav($(".need_main"), obj.baijiu[1]);

		function Fav(elem, arr) {
			elem.children("ul").remove();
			var sui = [];
			var zon = arr.length;
			for(var i = 0; i < 12; i++) {
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
			//console.log(sui);
			//for(var j in sui) {
			var sui_c=[];
			for(var j in sui){
				var k = sui[j];
				sui_c.push(arr[k]);
			}
			console.log(sui_c);
			sui_c.forEach(function(goods,index){
				
				var ul = $("<ul></ul>");
				elem.append(ul);

				var li1 = $("<li></li>");
				ul.append(li1);

				var img = $("<img></img>");
				li1.append(img);
				img[0].src = goods.img;

				var li2 = $("<li></li>");
				ul.append(li2);
				li2.addClass("_name");

				var a1 = $("<a></a>");
				li2.append(a1);
				a1.html(goods.intro);

				var span = $("<span></span>");
				li2.append(span);
				span.html(goods.hui);

				var li3 = $("<li></li>");
				ul.append(li3);
				li3.addClass("li3");

				li3.html("￥" + goods.price);

				var li4 = $("<li></li>");
				ul.append(li4);
				li4.addClass("addcar")
				var a2 = $("<a></a>");
				li4.append(a2);
				a2.click(function(){
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
							ss.num=ss.num+1;
							ss.sum=Number(ss.price)*ss.num;
						}						
						setCookie("add"+goods.id,ss,100);
						Sum();
//						show_car();
						//location.reload();
						showcat($(".mid_body"));

				});
				
							
			});
			

		}

	});

});