

/*数组去重*/
function superSort(arr){
	return Array.from(new Set(arr));
}

function superSort1(arr){
	var col=[];
	arr.forEach(function(elem,index){
		if(col.indexOf(elem)==-1){
			col.push(elem);
		};
	});
	return col;
}



/*删除字符串*/

	function deletechar(str1,str2){
	var arr=str1.split("");
	var brr=str2.split("");
	for(var i=0,l=arr.length;i<l;i++){
		for(var j=0,le=brr.length;j<le;j++){			
			if(arr[i]==brr[j]){
				arr[i]="";
			}
		}		
	}
	//console.log(arr);
	str1="";
	for(var n in arr){
	str1+=arr[n];
	}
	return str1;
	}
	

/*
 str.replace(/(bag|beg|big|bog)/g,'bug')
 */
 //用户名检测6-15
function username(str){
				var reg=/^[A-Za-z]\w{5,14}$/;
				str = str.replace(/^\s+/,'');   //去掉左侧的空格
				str = str.replace(/\s+$/,'');
				var result=reg.test(str);
				return result;
			}
//密码检测
function passw(str){
				var reg=/(\d|[A-Za-z]){6,20}/;
				var result=reg.test(str);
				return result;
}
//省份证检测
function card(str){
					var reg=/^\d{17}(\d|X)$/;
					var result=reg.test(str);
					return result;
				}
//电话检测
function phon(str){
				var reg=/^1\d{10}$/;
				var result=reg.test(str);
				return result;
				}
//日期检测
function dat1(str){
				var reg=/^(\d{2}|\d{4})[-\/\.]\d{2}[-\/\.]\d{2}$/;
				var result=reg.test(str);
				return result;
				}

//非中文检测
function zhongwen(str){
					var reg=/[^\u4e00-\u9fa5]/g;
					var result=reg.test(str);
					return result;
				}

//邮件编码
function youbian(str){
					var reg=/^\d{6}$/;
					var result=reg.test(str);
					return result;
				}


//邮件格式
function em(str){
					var reg=/^\w+@\w+(\.\w+)+$/;
					var result=reg.test(str);
					return result;
				}
//文件格式

function flie(str){
					var reg=/^\w+\.(zip|gz|rar)$/;
					var result=reg.test(str);
					return result;
				}


function setCookie(_name,_value,_date){
	var json={
	"value":_value
	}
	if(_date){					
		var d=new Date();
		d.setDate(d.getDate()+_date);
		document.cookie=_name+"="+encodeURIComponent(JSON.stringify(json))+";expires="+d.toGMTString()+";path=/";
	}else{				
		document.cookie=_name+"="+encodeURIComponent(JSON.stringify(json))+";path=/";				
	}
}

function getCookie(_name){
	var str=document.cookie;
	var arr=str.split("; ");
	for(var i in arr){
		var str1=arr[i];
		var brr=str1.split("=");
		if(brr[0]==_name){
			var obj=JSON.parse(decodeURIComponent(brr[1]));
			return obj.value;
			
		}
	}
		return "";	
}
function getCookie0(){
	return str=document.cookie;
			
}

function getCookie1(){
	var str=document.cookie;
	var arr=str.split("; ");
	for(var i in arr){
	var brr=arr[i].split("=");
	return(brr[0]);		
}
}

function addCookie(_name, _value, _date){
	setCookie(_name, _value, _date);
}

// 根据cookie名称，删除该cookie
function removeCookie(_name){
	setCookie(_name, "", -1);
}

//鼠标事件

function drag(elem){
		elem.onmousedown=function(e){
			var evt= e||window.e;
			var x=evt.clientX-elem.offsetLeft;
			var y=evt.clientY-elem.offsetTop;
			document.onmousemove=function(e){
				var evt= e||window.e;
				elem.style.left=evt.clientX-x+"px";
				elem.style.top=evt.clientY-y+"px";
				
			}
			document.onmouseup=function(){
				document.onmousemove=null;
				document.onmouseup=null;
			//	setCookie(elem.name,[elem.style.left,elem.style.top],7)
			}
			return false;
		}
		
		
	}


function getCookieGoods(callback){
		var str=document.cookie;
		var arr=str.split(";");
		var num=0;
		for(var i in arr){
			var tmp=arr[i];
			var col=tmp.split("=");
			if(/add\d+/.test(col[0])){
				var decode=decodeURIComponent(col[1]);
				var obj=JSON.parse(decode);
				callback(obj.value);
				num+=obj.value.num;
			}
		}
		return num;
	}

function startMove(elem, json, fn){	// 定义函数
	var attr, target;
	clearInterval(elem.timer);	// 清除elem元素下的定时器
	elem.timer = setInterval(function(){	// 在elem元素下创建定时器
		// 先假设所有的属性，都已经执行到了目标值
		var flag = true;	// true表示所有属性都过渡到了目标值；false表示至少有1个属性没有达到目标值
		for( attr in json ){
			target = json[attr];	// 目标值
			// 获取当前属性的目标值
			var v = getStyle(elem, attr);
			/*
			if(window.getComputedStyle){
				v = getComputedStyle(elem, null)[attr];	// W3C
			}else{
				v = elem.currentStyle[attr]; // IE
			}
			*/
			/*兼容问题：如果没有设置该属性，有些浏览器取出的是空，有些浏览器取出的是0*/
			
			//console.log("v:"+v);
			if( attr=="opacity" ){
				// 0.14 * 100 = 14.0000000000002
				v = Math.round(v*100);	// 因所有数字都是二进制计算，所以会是约等于的值
			}else{
				v = parseInt(v);
			}
			// 设置步长（速度）
			var speed = (target-v)/7;	// 除的数越小，步长越大，速度越快
			/*
			if(speed>0){
				speed = Math.ceil(speed);
			}else{
				speed = Math.floor(speed);
			}
			*/
			speed = (speed>0) ? Math.ceil(speed) : Math.floor(speed);	// 取整数1是最小单位值，正反两方向运动
			// 判断是否已到达目标值
			if( v == target ){
				//clearInterval(elem.timer);	// 多属性同时运动时，不能只有1个属性走到目标值就停止该元素上的定时器
			}else{
				flag = false;	// 当属性没有走到目标值时，flag标记更改为假，表示运动未执行完
				// 无论是什么浏览器，都应该执行该代码
				// IE9+或谷歌火狐支持opacity属性；但是IE8-是不支持的
				// 如果是IE6-8，elem.style.opacity就变成自定义属性了，
				// 所以elem.currentStyle["opacity"]能够取出值     （表示在style下面获取opacity）
				// elem.style.filter="alpha(opacity=100)" 	elem.style.opacity
				if( attr=="opacity" ){
					elem.style[attr] = (v+speed)/100;
					if ( /MSIE/i.test(navigator.userAgent) ){//如果当前浏览器是IE
						elem.style.filter="alpha(opacity="+(v+speed)+")";//设置透明度
					}
				}else{
					elem.style[attr] = (v+speed)+"px";			
				}
			}
			//console.log(speed);
		
		}
		// 如果所有属性都已经到达目标值
		if( flag ){
			clearInterval(elem.timer);// 清除该元素上的定时器
			// 链式运动，上一个函数执行完，如果fn函数存在，去执行fn函数
			if( fn ){
				fn();
			}
		}
	}, 30);
}


function getStyle(elem, attr){
	if(window.getComputedStyle){
		return getComputedStyle(elem, null)[attr];	// 0-1
	}else{
		return elem.currentStyle[attr];
	}	
}
