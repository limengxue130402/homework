//导航位置处定位
window.onload=function(){
	var header =document.getElementsByClassName("header")[0];
	window.onscroll=function(){
		var st=document.documentElement.scrollTop||document.body.scrollTop;
		if(st>140){
			header.style.position='fixed';
		}
		else{
			header.style.position='static';
		}

	}
}

function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}
	else{
		return getComputedStyle(obj,null)[attr];
	}
}

function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}
			else{
				now = parseInt(getStyle(obj,attr));
			}
			 
			var speed = (json[attr] - now)/8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var current = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = current/100;//opacity不带单位
			}
			else{
				obj.style[attr] = current + "px";
			}
			if(json[attr] != current){
				isStop = false;
			}
			if(isStop){
				clearInterval(obj.timer);
				if(callback){
					callback();
				}
			}
		}
	},30)
}