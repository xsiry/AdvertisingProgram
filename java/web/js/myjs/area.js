var p = [];
var pl = [];



var plc = [];
var pla = [];
var c = 0;
var a = 0;
var presL = allcity.Data.model; // 直接声明Array
////debugger
	var int1;
	var int2;
	var int3;
	for (int1 = 0; int1 < presL.length; int1++) {
		var plValue = {name:'',value:''};
		plValue.name = presL[int1].province;
		plValue.value = presL[int1].provinceID;
//		alert(plValue.name);
		pl.push(plValue);
		var plc1 = [];
		var pla2 = [];
		for (int2 = 0; int2 < presL[int1].city.length; int2++) {
			var plc1Value = {name:'',value:''};
			plc1Value.name = presL[int1].city[int2].city;
			plc1Value.value = presL[int1].city[int2].cityID;
//			alert(plc1Value);
			plc1.push(plc1Value);
			var pla1 = [];
			for (int3 = 0; int3 < presL[int1].city[int2].area.length; int3++) {
				var pla1Value = {name:'',value:''};
				pla1Value.name = presL[int1].city[int2].area[int3].area;
				pla1Value.value = presL[int1].city[int2].area[int3].areaID;
				pla1.push(pla1Value);
			}
			if(pla1!=null){
				pla2.push(pla1);
			}
	
		}
		if(plc1!=null){
			plc.push(plc1);
		}
		if(pla2!=null){
			pla.push(pla2);
		}
}
var pres = pl; // 直接声明Array
// 声明市
var cities = plc;
var areas = pla;
// 设置一个省的公共下标
var pIndex = -1;
var preEle = document.getElementById("provinceID");
var cityEle = document.getElementById("cityID");
var areaEle = document.getElementById("areaID");
// 先设置省的值
for (var i = 0; i < pres.length; i++) {
	// 声明option.<option value="pres[i]">Pres[i]</option>
	var op = new Option(pres[i].name, pres[i].value);
	// 添加
	preEle.options.add(op);
}
function chg(obj,id) {
	////debugger
//	alert(id);
//	alert(obj.value);
	c =c+1;
	if(id=='null'||id==''){
	if (obj.value == -1) {
		cityEle.options.length = 0;
		areaEle.options.length = 0;
	}
	// 获取值
	var val = obj.value;
//	pIndex = obj.value;
	var cs ;
	// 获取ctiry
	for (var int = 0; int < pres.length; int++) {
			if(pres[int].value == val){
				cs = cities[int];
				pIndex=int;
		}
	}
	// 获取默认区
	var as;
	for (var int = 0; int < pres.length; int++) {
			if(pres[int].value == val){
				as = areas[int][0];
			}
	}
//	var as = areas[val][0];
	// 先清空市
	cityEle.options.length = 0;
	areaEle.options.length = 0;
	for (var i = 0; i < cs.length; i++) {
		var op = new Option(cs[i].name, cs[i].value);
		cityEle.options.add(op);
	}
	for (var i = 0; i < as.length; i++) {
		var op = new Option(as[i].name, as[i].value);
		areaEle.options.add(op);
	}
	}else if(c>1){
		if (obj.value == -1) {
			cityEle.options.length = 0;
			areaEle.options.length = 0;
		}
		// 获取值
		var val = obj.value;
//		pIndex = obj.value;
		var cs ;
		// 获取ctiry
		for (var int = 0; int < pres.length; int++) {
				if(pres[int].value == val){
					cs = cities[int];
					pIndex=int;
			}
		}
		// 获取默认区
		var as;
		for (var int = 0; int < pres.length; int++) {
				if(pres[int].value == val){
					as = areas[int][0];
				}
		}
//		var as = areas[val][0];
		// 先清空市
		cityEle.options.length = 0;
		areaEle.options.length = 0;
		for (var i = 0; i < cs.length; i++) {
			var op = new Option(cs[i].name, cs[i].value);
			cityEle.options.add(op);
		}
		for (var i = 0; i < as.length; i++) {
			var op = new Option(as[i].name, as[i].value);
			areaEle.options.add(op);
		}
		}
	else{
		// 获取值
		var val = obj.value;
//		pIndex = obj.value;
		// 获取ctiry
		var cs ;
		// 获取ctiry
		// 获取ctiry
		for (var int = 0; int < pres.length; int++) {
				if(pres[int].value == val){
					cs = cities[int];
					pIndex=int;
			}
		}
		// 获取默认区
		var as;
		for (var int = 0; int < pres.length; int++) {
				if(pres[int].value == val){
					as = areas[int][0];
				}
		}
		// 先清空市
		cityEle.options.length = 0;
		areaEle.options.length = 0;
		for (var i = 0; i < cs.length; i++) {
			if(cs[i].value==id){
			var op = new Option(cs[i].name, cs[i].value);
			cityEle.options.add(op);
			}
		}
		for (var i = 0; i < cs.length; i++) {
			if(cs[i].value!=id){
				var op = new Option(cs[i].name, cs[i].value);
				cityEle.options.add(op);
			}
		}
		for (var i = 0; i < as.length; i++) {
			var op = new Option(as[i].name, as[i].value);
			areaEle.options.add(op);
		}
	}
}
function chg2(obj,id) {
	a = a + 1 ;
	if(id=='null'||id==''){
		////debugger
		var val = obj.value;
		var as;
		for (var int = 0; int < plc.length; int++) {
			for (var int2 = 0; int2 < plc[int].length; int2++) {
				if(plc[int][int2].value == val){
					as = areas[pIndex][int2];
				}
			}
		}
//		var as = areas[pIndex][val];
		areaEle.options.length = 0;
		for (var i = 0; i < as.length; i++) {
			var op = new Option(as[i].name, as[i].value);
			if(as[i].value=='520111'){
				areaEle.options.add(op);
			}
		}
		for (var i = 0; i < as.length; i++) {
			var op = new Option(as[i].name, as[i].value);
//			if(as[i].value=='520111'){
				areaEle.options.add(op);
//			}
		}
	}else if(a>1){
		var val = obj.value;
		var as;
		for (var int = 0; int < plc.length; int++) {
			for (var int2 = 0; int2 < plc[int].length; int2++) {
				if(plc[int][int2].value == val){
					as = areas[pIndex][int2];
				}
			}
		}
//		var as = areas[pIndex][val];
		areaEle.options.length = 0;
		for (var i = 0; i < as.length; i++) {
			var op = new Option(as[i].name, as[i].value);
			areaEle.options.add(op);
		}
	}
	else{
//	var val = obj.selectedIndex;
	var val = obj.value;
	for (var int = 0; int < plc.length; int++) {
		for (var int2 = 0; int2 < plc[int].length; int2++) {
			if(plc[int][int2].value == val){
				as = areas[pIndex][int2];
			}
		}
	}
//	var as = areas[pIndex][val];
	areaEle.options.length = 0;
	for (var i = 0; i < as.length; i++) {
		if(as[i].value==id){
		var op = new Option(as[i].name, as[i].value);
		areaEle.options.add(op);
		}
	}
	for (var i = 0; i < as.length; i++) {
		if(as[i].value!=id){
		var op = new Option(as[i].name, as[i].value);
		areaEle.options.add(op);
		}
	}
	}
}