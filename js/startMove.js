/*
 * 功能：运动函数
 * 参数：
 * 		elem	指元素，被操作的元素节点
 * 		json	指操作元素节点上的哪一个属性及目标值
 * 			attr	指操作元素节点上的哪一个属性
 * 			target	指操作元素节点上的那一个属性的目标值
 * 		fn		指运动执行完，执行的函数
 */

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
