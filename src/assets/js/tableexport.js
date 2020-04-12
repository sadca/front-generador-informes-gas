/*
 tableExport.jquery.plugin

 Version 1.10.9

 Copyright (c) 2015-2019 hhurz, https://github.com/hhurz

 Original Work Copyright (c) 2014 Giri Raj

 Licensed under the MIT License
*/
/* jshint ignore:start */

var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.findInternal=function(d,h,y){d instanceof String&&(d=String(d));for(var B=d.length,z=0;z<B;z++){var S=d[z];if(h.call(y,S,z,d))return{i:z,v:S}}return{i:-1,v:void 0}};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(d,h,y){d!=Array.prototype&&d!=Object.prototype&&(d[h]=y.value)};
$jscomp.getGlobal=function(d){return"undefined"!=typeof window&&window===d?d:"undefined"!=typeof global&&null!=global?global:d};$jscomp.global=$jscomp.getGlobal(this);$jscomp.polyfill=function(d,h,y,B){if(h){y=$jscomp.global;d=d.split(".");for(B=0;B<d.length-1;B++){var z=d[B];z in y||(y[z]={});y=y[z]}d=d[d.length-1];B=y[d];h=h(B);h!=B&&null!=h&&$jscomp.defineProperty(y,d,{configurable:!0,writable:!0,value:h})}};
$jscomp.polyfill("Array.prototype.find",function(d){return d?d:function(d,y){return $jscomp.findInternal(this,d,y).v}},"es6","es3");
(function(d){d.fn.tableExport=function(h){function y(b){var c=[];z(b,"thead").each(function(){c.push.apply(c,z(d(this),a.theadSelector).toArray())});return c}function B(b){var c=[];z(b,"tbody").each(function(){c.push.apply(c,z(d(this),a.tbodySelector).toArray())});a.tfootSelector.length&&z(b,"tfoot").each(function(){c.push.apply(c,z(d(this),a.tfootSelector).toArray())});return c}function z(b,c){var a=b[0].tagName,p=b.parents(a).length;return b.find(c).filter(function(){return p===d(this).closest(a).parents(a).length})}
function S(b){var c=[];d(b).find("thead").first().find("th").each(function(b,a){void 0!==d(a).attr("data-field")?c[b]=d(a).attr("data-field"):c[b]=b.toString()});return c}function I(b){var a="undefined"!==typeof b[0].rowIndex,e=!1===a&&"undefined"!==typeof b[0].cellIndex,p=e||a?Ka(b):b.is(":visible"),f=b.attr("data-tableexport-display");e&&"none"!==f&&"always"!==f&&(b=d(b[0].parentNode),a="undefined"!==typeof b[0].rowIndex,f=b.attr("data-tableexport-display"));a&&"none"!==f&&"always"!==f&&(f=b.closest("table").attr("data-tableexport-display"));
return"none"!==f&&(!0===p||"always"===f)}function Ka(b){var a=[];V&&(a=J.filter(function(){var a=!1;this.nodeType===b[0].nodeType&&("undefined"!==typeof this.rowIndex&&this.rowIndex===b[0].rowIndex?a=!0:"undefined"!==typeof this.cellIndex&&this.cellIndex===b[0].cellIndex&&"undefined"!==typeof this.parentNode.rowIndex&&"undefined"!==typeof b[0].parentNode.rowIndex&&this.parentNode.rowIndex===b[0].parentNode.rowIndex&&(a=!0));return a}));return!1===V||0===a.length}function ta(b,c,e){var p=!1;I(b)?0<
a.ignoreColumn.length&&(-1!==d.inArray(e,a.ignoreColumn)||-1!==d.inArray(e-c,a.ignoreColumn)||T.length>e&&"undefined"!==typeof T[e]&&-1!==d.inArray(T[e],a.ignoreColumn))&&(p=!0):p=!0;return p}function E(b,c,e,p,f){if("function"===typeof f){var m=!1;"function"===typeof a.onIgnoreRow&&(m=a.onIgnoreRow(d(b),e));if(!1===m&&(0===a.ignoreRow.length||-1===d.inArray(e,a.ignoreRow)&&-1===d.inArray(e-p,a.ignoreRow))&&I(d(b))){var u=z(d(b),c),k=0;u.each(function(b){var a=d(this),c,m=O(this),p=U(this);d.each(G,
function(){if(e>=this.s.r&&e<=this.e.r&&k>=this.s.c&&k<=this.e.c)for(c=0;c<=this.e.c-this.s.c;++c)f(null,e,k++)});if(!1===ta(a,u.length,b)){if(p||m)m=m||1,G.push({s:{r:e,c:k},e:{r:e+(p||1)-1,c:k+m-1}});f(this,e,k++)}if(m)for(c=0;c<m-1;++c)f(null,e,k++)});d.each(G,function(){if(e>=this.s.r&&e<=this.e.r&&k>=this.s.c&&k<=this.e.c)for(ca=0;ca<=this.e.c-this.s.c;++ca)f(null,e,k++)})}}}function ua(b,a,e,d){if("undefined"!==typeof d.images&&(e=d.images[e],"undefined"!==typeof e)){a=a.getBoundingClientRect();
var c=b.width/b.height,m=a.width/a.height,p=b.width,k=b.height,n=19.049976/25.4,g=0;m<=c?(k=Math.min(b.height,a.height),p=a.width*k/a.height):m>c&&(p=Math.min(b.width,a.width),k=a.height*p/a.width);p*=n;k*=n;k<b.height&&(g=(b.height-k)/2);try{d.doc.addImage(e.src,b.textPos.x,b.y+g,p,k)}catch(Pa){}b.textPos.x+=p}}function va(b,c){if("string"===a.outputMode)return b.output();if("base64"===a.outputMode)return K(b.output());if("window"===a.outputMode)window.URL=window.URL||window.webkitURL,window.open(window.URL.createObjectURL(b.output("blob")));
else try{var e=b.output("blob");saveAs(e,a.fileName+".pdf")}catch(p){ja(a.fileName+".pdf","data:application/pdf"+(c?"":";base64")+",",c?b.output("blob"):b.output())}}function wa(b,a,e){var c=0;"undefined"!==typeof e&&(c=e.colspan);if(0<=c){for(var f=b.width,d=b.textPos.x,u=a.table.columns.indexOf(a.column),k=1;k<c;k++)f+=a.table.columns[u+k].width;1<c&&("right"===b.styles.halign?d=b.textPos.x+f-b.width:"center"===b.styles.halign&&(d=b.textPos.x+(f-b.width)/2));b.width=f;b.textPos.x=d;"undefined"!==
typeof e&&1<e.rowspan&&(b.height*=e.rowspan);if("middle"===b.styles.valign||"bottom"===b.styles.valign)e=("string"===typeof b.text?b.text.split(/\r\n|\r|\n/g):b.text).length||1,2<e&&(b.textPos.y-=(2-1.15)/2*a.row.styles.fontSize*(e-2)/3);return!0}return!1}function xa(b,a,e){"undefined"!==typeof b&&null!==b&&(b.hasAttribute("data-tableexport-canvas")?(a=(new Date).getTime(),d(b).attr("data-tableexport-canvas",a),e.images[a]={url:'[data-tableexport-canvas="'+a+'"]',src:null}):"undefined"!==a&&null!=
a&&a.each(function(){if(d(this).is("img")){var a=ya(this.src);e.images[a]={url:this.src,src:this.src}}xa(b,d(this).children(),e)}))}function La(b,a){function c(b){if(b.url)if(b.src){var c=new Image;p=++f;c.crossOrigin="Anonymous";c.onerror=c.onload=function(){if(c.complete&&(0===c.src.indexOf("data:image/")&&(c.width=b.width||c.width||0,c.height=b.height||c.height||0),c.width+c.height)){var e=document.createElement("canvas"),d=e.getContext("2d");e.width=c.width;e.height=c.height;d.drawImage(c,0,0);
b.src=e.toDataURL("image/png")}--f||a(p)};c.src=b.url}else{var e=d(b.url);e.length&&(p=++f,html2canvas(e[0]).then(function(c){b.src=c.toDataURL("image/png");--f||a(p)}))}}var p=0,f=0;if("undefined"!==typeof b.images)for(var m in b.images)b.images.hasOwnProperty(m)&&c(b.images[m]);(b=f)||(a(p),b=void 0);return b}function za(b,c,e){c.each(function(){if(d(this).is("div")){var c=da(L(this,"background-color"),[255,255,255]),f=da(L(this,"border-top-color"),[0,0,0]),m=ea(this,"border-top-width",a.jspdf.unit),
u=this.getBoundingClientRect(),k=this.offsetLeft*e.wScaleFactor,n=this.offsetTop*e.hScaleFactor,g=u.width*e.wScaleFactor;u=u.height*e.hScaleFactor;e.doc.setDrawColor.apply(void 0,f);e.doc.setFillColor.apply(void 0,c);e.doc.setLineWidth(m);e.doc.rect(b.x+k,b.y+n,g,u,m?"FD":"F")}else d(this).is("img")&&(c=ya(this.src),ua(b,this,c,e));za(b,d(this).children(),e)})}function Aa(b,c,e){if("function"===typeof e.onAutotableText)e.onAutotableText(e.doc,b,c);else{var p=b.textPos.x,f=b.textPos.y,m={halign:b.styles.halign,
valign:b.styles.valign};if(c.length){for(c=c[0];c.previousSibling;)c=c.previousSibling;for(var u=!1,k=!1;c;){var n=c.innerText||c.textContent||"",g=n.length&&" "===n[0]?" ":"",h=1<n.length&&" "===n[n.length-1]?" ":"";!0!==a.preserve.leadingWS&&(n=g+ka(n));!0!==a.preserve.trailingWS&&(n=la(n)+h);d(c).is("br")&&(p=b.textPos.x,f+=e.doc.internal.getFontSize());d(c).is("b")?u=!0:d(c).is("i")&&(k=!0);(u||k)&&e.doc.setFontType(u&&k?"bolditalic":u?"bold":"italic");if(g=e.doc.getStringUnitWidth(n)*e.doc.internal.getFontSize()){"linebreak"===
b.styles.overflow&&p>b.textPos.x&&p+g>b.textPos.x+b.width&&(0<=".,!%*;:=-".indexOf(n.charAt(0))&&(h=n.charAt(0),g=e.doc.getStringUnitWidth(h)*e.doc.internal.getFontSize(),p+g<=b.textPos.x+b.width&&(e.doc.autoTableText(h,p,f,m),n=n.substring(1,n.length)),g=e.doc.getStringUnitWidth(n)*e.doc.internal.getFontSize()),p=b.textPos.x,f+=e.doc.internal.getFontSize());if("visible"!==b.styles.overflow)for(;n.length&&p+g>b.textPos.x+b.width;)n=n.substring(0,n.length-1),g=e.doc.getStringUnitWidth(n)*e.doc.internal.getFontSize();
e.doc.autoTableText(n,p,f,m);p+=g}if(u||k)d(c).is("b")?u=!1:d(c).is("i")&&(k=!1),e.doc.setFontType(u||k?u?"bold":"italic":"normal");c=c.nextSibling}b.textPos.x=p;b.textPos.y=f}else e.doc.autoTableText(b.text,b.textPos.x,b.textPos.y,m)}}function fa(b,a,e){return null==b?"":b.toString().replace(new RegExp(null==a?"":a.toString().replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1"),"g"),e)}function ka(b){return null==b?"":b.toString().replace(/^\s+/,"")}function la(b){return null==b?"":b.toString().replace(/\s+$/,
"")}function Ba(b){a.date.pattern.lastIndex=0;var c=a.date.pattern.exec(b);if(null==c)return!1;b=+c[a.date.match_y];if(0>b||8099<b)return!1;var e=1*c[a.date.match_m];c=1*c[a.date.match_d];if(isNaN(c))return!1;var d=new Date(b,e-1,c);return d.getFullYear()===b&&d.getMonth()===e-1&&d.getDate()===c?d:!1}function ma(b){b=fa(b||"0",a.numbers.html.thousandsSeparator,"");b=fa(b,a.numbers.html.decimalMark,".");return"number"===typeof b||!1!==jQuery.isNumeric(b)?b:!1}function Ma(b){-1<b.indexOf("%")?(b=ma(b.replace(/%/g,
"")),!1!==b&&(b/=100)):b=!1;return b}function D(b,c,e,p){var f="",m="text";if(null!==b){var u=d(b);if(u[0].hasAttribute("data-tableexport-canvas"))var k="";else if(u[0].hasAttribute("data-tableexport-value"))k=(k=u.attr("data-tableexport-value"))?k+"":"";else if(k=u.html(),"function"===typeof a.onCellHtmlData)k=a.onCellHtmlData(u,c,e,k);else if(""!==k){var n=d.parseHTML(k),g=0,h=0;k="";d.each(n,function(){if(d(this).is("input"))k+=u.find("input").eq(g++).val();else if(d(this).is("select"))k+=u.find("select option:selected").eq(h++).text();
else if(d(this).is("br"))k+="<br>";else if("undefined"===typeof d(this).html())k+=d(this).text();else if(void 0===jQuery().bootstrapTable||!1===d(this).hasClass("fht-cell")&&!1===d(this).hasClass("filterControl")&&0===u.parents(".detail-view").length)k+=d(this).html()})}if(!0===a.htmlContent)f=d.trim(k);else if(k&&""!==k)if(""!==d(b).attr("data-tableexport-cellformat")){var l=k.replace(/\n/g,"\u2028").replace(/(<\s*br([^>]*)>)/gi,"\u2060");n=d("<div/>").html(l).contents();b=!1;l="";d.each(n.text().split("\u2028"),
function(b,c){0<b&&(l+=" ");!0!==a.preserve.leadingWS&&(c=ka(c));l+=!0!==a.preserve.trailingWS?la(c):c});d.each(l.split("\u2060"),function(b,c){0<b&&(f+="\n");!0!==a.preserve.leadingWS&&(c=ka(c));!0!==a.preserve.trailingWS&&(c=la(c));f+=c.replace(/\u00AD/g,"")});f=f.replace(/\u00A0/g," ");if("json"===a.type||"excel"===a.type&&"xmlss"===a.mso.fileFormat||!1===a.numbers.output)b=ma(f),!1!==b&&(m="number",f=Number(b));else if(a.numbers.html.decimalMark!==a.numbers.output.decimalMark||a.numbers.html.thousandsSeparator!==
a.numbers.output.thousandsSeparator)if(b=ma(f),!1!==b){n=(""+b.substr(0>b?1:0)).split(".");1===n.length&&(n[1]="");var q=3<n[0].length?n[0].length%3:0;m="number";f=(0>b?"-":"")+(a.numbers.output.thousandsSeparator?(q?n[0].substr(0,q)+a.numbers.output.thousandsSeparator:"")+n[0].substr(q).replace(/(\d{3})(?=\d)/g,"$1"+a.numbers.output.thousandsSeparator):n[0])+(n[1].length?a.numbers.output.decimalMark+n[1]:"")}}else f=k;!0===a.escape&&(f=escape(f));"function"===typeof a.onCellData&&(f=a.onCellData(u,
c,e,f,m))}void 0!==p&&(p.type=m);return f}function Ca(b){return 0<b.length&&!0===a.preventInjection&&0<="=+-@".indexOf(b.charAt(0))?"'"+b:b}function Na(b,a,e){return a+"-"+e.toLowerCase()}function da(b,a){(b=/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/.exec(b))&&(a=[parseInt(b[1]),parseInt(b[2]),parseInt(b[3])]);return a}function Da(b){var a=L(b,"text-align"),e=L(b,"font-weight"),d=L(b,"font-style"),f="";"start"===a&&(a="rtl"===L(b,"direction")?"right":"left");700<=e&&(f="bold");"italic"===d&&(f+=
d);""===f&&(f="normal");a={style:{align:a,bcolor:da(L(b,"background-color"),[255,255,255]),color:da(L(b,"color"),[0,0,0]),fstyle:f},colspan:O(b),rowspan:U(b)};null!==b&&(b=b.getBoundingClientRect(),a.rect={width:b.width,height:b.height});return a}function O(b){var a=d(b).attr("data-tableexport-colspan");"undefined"===typeof a&&d(b).is("[colspan]")&&(a=d(b).attr("colspan"));return parseInt(a)||0}function U(b){var a=d(b).attr("data-tableexport-rowspan");"undefined"===typeof a&&d(b).is("[rowspan]")&&
(a=d(b).attr("rowspan"));return parseInt(a)||0}function L(b,a){try{return window.getComputedStyle?(a=a.replace(/([a-z])([A-Z])/,Na),window.getComputedStyle(b,null).getPropertyValue(a)):b.currentStyle?b.currentStyle[a]:b.style[a]}catch(e){}return""}function ea(a,c,e){c=L(a,c).match(/\d+/);if(null!==c){c=c[0];a=a.parentElement;var b=document.createElement("div");b.style.overflow="hidden";b.style.visibility="hidden";a.appendChild(b);b.style.width=100+e;e=100/b.offsetWidth;a.removeChild(b);return c*e}return 0}
function Oa(a){for(var b=new ArrayBuffer(a.length),e=new Uint8Array(b),d=0;d!==a.length;++d)e[d]=a.charCodeAt(d)&255;return b}function na(a){var b=a.c,e="";for(++b;b;b=Math.floor((b-1)/26))e=String.fromCharCode((b-1)%26+65)+e;return e+(""+(a.r+1))}function oa(a,c){if("undefined"===typeof c||"number"===typeof c)return oa(a.s,a.e);"string"!==typeof a&&(a=na(a));"string"!==typeof c&&(c=na(c));return a===c?a:a+":"+c}function Ea(a){var b=Number(a);if(!isNaN(b))return b;var e=1;a=a.replace(/([\d]),([\d])/g,
"$1$2").replace(/[$]/g,"").replace(/[%]/g,function(){e*=100;return""});if(!isNaN(b=Number(a)))return b/e;a=a.replace(/[(](.*)[)]/,function(a,b){e=-e;return b});return isNaN(b=Number(a))?b:b/e}function ya(a){var b=0,e;if(0===a.length)return b;var d=0;for(e=a.length;d<e;d++){var f=a.charCodeAt(d);b=(b<<5)-b+f;b|=0}return b}function M(b,c,d,p,f,m){var e=!0;"function"===typeof a.onBeforeSaveToFile&&(e=a.onBeforeSaveToFile(b,c,d,p,f),"boolean"!==typeof e&&(e=!0));if(e)try{if(Fa=new Blob([b],{type:d+";charset="+
p}),saveAs(Fa,c,!1===m),"function"===typeof a.onAfterSaveToFile)a.onAfterSaveToFile(b,c)}catch(k){ja(c,"data:"+d+(p.length?";charset="+p:"")+(f.length?";"+f:"")+","+(m?"\ufeff":""),b)}}function ja(b,c,d){var e=window.navigator.userAgent;if(!1!==b&&window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(new Blob([d]),b);else if(!1!==b&&(0<e.indexOf("MSIE ")||e.match(/Trident.*rv\:11\./))){if(c=document.createElement("iframe")){document.body.appendChild(c);c.setAttribute("style","display:none");
c.contentDocument.open("txt/plain","replace");c.contentDocument.write(d);c.contentDocument.close();c.contentWindow.focus();switch(b.substr(b.lastIndexOf(".")+1)){case "doc":case "json":case "png":case "pdf":case "xls":case "xlsx":b+=".txt"}c.contentDocument.execCommand("SaveAs",!0,b);document.body.removeChild(c)}}else{var f=document.createElement("a");if(f){var m=null;f.style.display="none";!1!==b?f.download=b:f.target="_blank";"object"===typeof d?(window.URL=window.URL||window.webkitURL,e=[],e.push(d),
m=window.URL.createObjectURL(new Blob(e,{type:c})),f.href=m):0<=c.toLowerCase().indexOf("base64,")?f.href=c+K(d):f.href=c+encodeURIComponent(d);document.body.appendChild(f);if(document.createEvent)null===ha&&(ha=document.createEvent("MouseEvents")),ha.initEvent("click",!0,!1),f.dispatchEvent(ha);else if(document.createEventObject)f.fireEvent("onclick");else if("function"===typeof f.onclick)f.onclick();setTimeout(function(){m&&window.URL.revokeObjectURL(m);document.body.removeChild(f);if("function"===
typeof a.onAfterSaveToFile)a.onAfterSaveToFile(d,b)},100)}}}function K(a){var b,d="",p=0;if("string"===typeof a){a=a.replace(/\x0d\x0a/g,"\n");var f="";for(b=0;b<a.length;b++){var m=a.charCodeAt(b);128>m?f+=String.fromCharCode(m):(127<m&&2048>m?f+=String.fromCharCode(m>>6|192):(f+=String.fromCharCode(m>>12|224),f+=String.fromCharCode(m>>6&63|128)),f+=String.fromCharCode(m&63|128))}a=f}for(;p<a.length;){var u=a.charCodeAt(p++);f=a.charCodeAt(p++);b=a.charCodeAt(p++);m=u>>2;u=(u&3)<<4|f>>4;var k=(f&
15)<<2|b>>6;var n=b&63;isNaN(f)?k=n=64:isNaN(b)&&(n=64);d=d+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(m)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(u)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(k)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(n)}return d}var a={csvEnclosure:'"',csvSeparator:",",csvUseBOM:!0,date:{html:"dd/mm/yyyy"},displayTableName:!1,escape:!1,exportHiddenCells:!1,
fileName:"tableExport",htmlContent:!1,ignoreColumn:[],ignoreRow:[],jsonScope:"all",jspdf:{orientation:"p",unit:"pt",format:"a4",margins:{left:20,right:10,top:10,bottom:10},onDocCreated:null,autotable:{styles:{cellPadding:2,rowHeight:12,fontSize:8,fillColor:255,textColor:50,fontStyle:"normal",overflow:"ellipsize",halign:"inherit",valign:"middle"},headerStyles:{fillColor:[52,73,94],textColor:255,fontStyle:"bold",halign:"inherit",valign:"middle"},alternateRowStyles:{fillColor:245},tableExport:{doc:null,
onAfterAutotable:null,onBeforeAutotable:null,onAutotableText:null,onTable:null,outputImages:!0}}},mso:{fileFormat:"xlshtml",onMsoNumberFormat:null,pageFormat:"a4",pageOrientation:"portrait",rtl:!1,styles:[],worksheetName:"",xslx:{formatId:{date:14,numbers:2}}},numbers:{html:{decimalMark:".",thousandsSeparator:","},output:{decimalMark:".",thousandsSeparator:","}},onAfterSaveToFile:null,onBeforeSaveToFile:null,onCellData:null,onCellHtmlData:null,onIgnoreRow:null,outputMode:"file",pdfmake:{enabled:!1,
docDefinition:{pageOrientation:"portrait",defaultStyle:{font:"Roboto"}},fonts:{}},preserve:{leadingWS:!1,trailingWS:!1},preventInjection:!0,sql:{tableEnclosure:"`",columnEnclosure:"`"},tbodySelector:"tr",tfootSelector:"tr",theadSelector:"tr",tableName:"Table",type:"csv"},N={a0:[2383.94,3370.39],a1:[1683.78,2383.94],a2:[1190.55,1683.78],a3:[841.89,1190.55],a4:[595.28,841.89],a5:[419.53,595.28],a6:[297.64,419.53],a7:[209.76,297.64],a8:[147.4,209.76],a9:[104.88,147.4],a10:[73.7,104.88],b0:[2834.65,4008.19],
b1:[2004.09,2834.65],b2:[1417.32,2004.09],b3:[1000.63,1417.32],b4:[708.66,1000.63],b5:[498.9,708.66],b6:[354.33,498.9],b7:[249.45,354.33],b8:[175.75,249.45],b9:[124.72,175.75],b10:[87.87,124.72],c0:[2599.37,3676.54],c1:[1836.85,2599.37],c2:[1298.27,1836.85],c3:[918.43,1298.27],c4:[649.13,918.43],c5:[459.21,649.13],c6:[323.15,459.21],c7:[229.61,323.15],c8:[161.57,229.61],c9:[113.39,161.57],c10:[79.37,113.39],dl:[311.81,623.62],letter:[612,792],"government-letter":[576,756],legal:[612,1008],"junior-legal":[576,
360],ledger:[1224,792],tabloid:[792,1224],"credit-card":[153,243]},v=this,ha=null,t=[],w=[],q=0,r="",T=[],G=[],Fa,J=[],V=!1;d.extend(!0,a,h);"xlsx"===a.type&&(a.mso.fileFormat=a.type,a.type="excel");"undefined"!==typeof a.excelFileFormat&&"undefined"===a.mso.fileFormat&&(a.mso.fileFormat=a.excelFileFormat);"undefined"!==typeof a.excelPageFormat&&"undefined"===a.mso.pageFormat&&(a.mso.pageFormat=a.excelPageFormat);"undefined"!==typeof a.excelPageOrientation&&"undefined"===a.mso.pageOrientation&&(a.mso.pageOrientation=
a.excelPageOrientation);"undefined"!==typeof a.excelRTL&&"undefined"===a.mso.rtl&&(a.mso.rtl=a.excelRTL);"undefined"!==typeof a.excelstyles&&"undefined"===a.mso.styles&&(a.mso.styles=a.excelstyles);"undefined"!==typeof a.onMsoNumberFormat&&"undefined"===a.mso.onMsoNumberFormat&&(a.mso.onMsoNumberFormat=a.onMsoNumberFormat);"undefined"!==typeof a.worksheetName&&"undefined"===a.mso.worksheetName&&(a.mso.worksheetName=a.worksheetName);a.mso.pageOrientation="l"===a.mso.pageOrientation.substr(0,1)?"landscape":
"portrait";a.date.html=a.date.html||"";if(a.date.html.length){h=[];h.dd="(3[01]|[12][0-9]|0?[1-9])";h.mm="(1[012]|0?[1-9])";h.yyyy="((?:1[6-9]|2[0-2])\\d{2})";h.yy="(\\d{2})";var A=a.date.html.match(/[^a-zA-Z0-9]/)[0];A=a.date.html.toLowerCase().split(A);a.date.regex="^\\s*";a.date.regex+=h[A[0]];a.date.regex+="(.)";a.date.regex+=h[A[1]];a.date.regex+="\\2";a.date.regex+=h[A[2]];a.date.regex+="\\s*$";a.date.pattern=new RegExp(a.date.regex,"g");h=A.indexOf("dd")+1;a.date.match_d=h+(1<h?1:0);h=A.indexOf("mm")+
1;a.date.match_m=h+(1<h?1:0);h=(A.indexOf("yyyy")||A.indexOf("yy"))+1;a.date.match_y=h+(1<h?1:0)}T=S(v);if("csv"===a.type||"tsv"===a.type||"txt"===a.type){var P="",Y=0;G=[];q=0;var pa=function(b,c,e){b.each(function(){r="";E(this,c,q,e+b.length,function(b,c,d){var e=r,f="";if(null!==b)if(b=D(b,c,d),c=null===b||""===b?"":b.toString(),"tsv"===a.type)b instanceof Date&&b.toLocaleString(),f=fa(c,"\t"," ");else if(b instanceof Date)f=a.csvEnclosure+b.toLocaleString()+a.csvEnclosure;else if(f=Ca(c),f=fa(f,
a.csvEnclosure,a.csvEnclosure+a.csvEnclosure),0<=f.indexOf(a.csvSeparator)||/[\r\n ]/g.test(f))f=a.csvEnclosure+f+a.csvEnclosure;r=e+(f+("tsv"===a.type?"\t":a.csvSeparator))});r=d.trim(r).substring(0,r.length-1);0<r.length&&(0<P.length&&(P+="\n"),P+=r);q++});return b.length};Y+=pa(d(v).find("thead").first().find(a.theadSelector),"th,td",Y);z(d(v),"tbody").each(function(){Y+=pa(z(d(this),a.tbodySelector),"td,th",Y)});a.tfootSelector.length&&pa(d(v).find("tfoot").first().find(a.tfootSelector),"td,th",
Y);P+="\n";if("string"===a.outputMode)return P;if("base64"===a.outputMode)return K(P);if("window"===a.outputMode){ja(!1,"data:text/"+("csv"===a.type?"csv":"plain")+";charset=utf-8,",P);return}M(P,a.fileName+"."+a.type,"text/"+("csv"===a.type?"csv":"plain"),"utf-8","","csv"===a.type&&a.csvUseBOM)}else if("sql"===a.type){q=0;G=[];var C="INSERT INTO "+a.sql.tableEnclosure+a.tableName+a.sql.tableEnclosure+" (";t=y(d(v));d(t).each(function(){E(this,"th,td",q,t.length,function(b,c,d){C+=a.sql.columnEnclosure+
D(b,c,d)+a.sql.columnEnclosure+","});q++;C=d.trim(C).substring(0,C.length-1)});C+=") VALUES ";w=B(d(v));d(w).each(function(){r="";E(this,"td,th",q,t.length+w.length,function(a,c,d){r+="'"+D(a,c,d)+"',"});3<r.length&&(C+="("+r,C=d.trim(C).substring(0,C.length-1),C+="),");q++});C=d.trim(C).substring(0,C.length-1);C+=";";if("string"===a.outputMode)return C;if("base64"===a.outputMode)return K(C);M(C,a.fileName+".sql","application/sql","utf-8","",!1)}else if("json"===a.type){var W=[];G=[];t=y(d(v));d(t).each(function(){var a=
[];E(this,"th,td",q,t.length,function(b,d,g){a.push(D(b,d,g))});W.push(a)});var qa=[];w=B(d(v));d(w).each(function(){var a={},c=0;E(this,"td,th",q,t.length+w.length,function(b,d,f){W.length?a[W[W.length-1][c]]=D(b,d,f):a[c]=D(b,d,f);c++});!1===d.isEmptyObject(a)&&qa.push(a);q++});h="";h="head"===a.jsonScope?JSON.stringify(W):"data"===a.jsonScope?JSON.stringify(qa):JSON.stringify({header:W,data:qa});if("string"===a.outputMode)return h;if("base64"===a.outputMode)return K(h);M(h,a.fileName+".json","application/json",
"utf-8","base64",!1)}else if("xml"===a.type){q=0;G=[];var Q='<?xml version="1.0" encoding="utf-8"?>';Q+="<tabledata><fields>";t=y(d(v));d(t).each(function(){E(this,"th,td",q,t.length,function(a,d,e){Q+="<field>"+D(a,d,e)+"</field>"});q++});Q+="</fields><data>";var ra=1;w=B(d(v));d(w).each(function(){var a=1;r="";E(this,"td,th",q,t.length+w.length,function(b,d,g){r+="<column-"+a+">"+D(b,d,g)+"</column-"+a+">";a++});0<r.length&&"<column-1></column-1>"!==r&&(Q+='<row id="'+ra+'">'+r+"</row>",ra++);q++});
Q+="</data></tabledata>";if("string"===a.outputMode)return Q;if("base64"===a.outputMode)return K(Q);M(Q,a.fileName+".xml","application/xml","utf-8","base64",!1)}else if("excel"===a.type&&"xmlss"===a.mso.fileFormat){var sa=[],F=[];d(v).filter(function(){return I(d(this))}).each(function(){function b(a,b,c){var e=[];d(a).each(function(){var b=0,f=0;r="";E(this,"td,th",q,c+a.length,function(a,c,m){if(null!==a){var k="";c=D(a,c,m);m="String";if(!1!==jQuery.isNumeric(c))m="Number";else{var g=Ma(c);!1!==
g&&(c=g,m="Number",k+=' ss:StyleID="pct1"')}"Number"!==m&&(c=c.replace(/\n/g,"<br>"));g=O(a);a=U(a);d.each(e,function(){if(q>=this.s.r&&q<=this.e.r&&f>=this.s.c&&f<=this.e.c)for(var a=0;a<=this.e.c-this.s.c;++a)f++,b++});if(a||g)a=a||1,g=g||1,e.push({s:{r:q,c:f},e:{r:q+a-1,c:f+g-1}});1<g&&(k+=' ss:MergeAcross="'+(g-1)+'"',f+=g-1);1<a&&(k+=' ss:MergeDown="'+(a-1)+'" ss:StyleID="rsp1"');0<b&&(k+=' ss:Index="'+(f+1)+'"',b=0);r+="<Cell"+k+'><Data ss:Type="'+m+'">'+d("<div />").text(c).html()+"</Data></Cell>\r";
f++}});0<r.length&&(H+='<Row ss:AutoFitHeight="0">\r'+r+"</Row>\r");q++});return a.length}var c=d(this),e="";"string"===typeof a.mso.worksheetName&&a.mso.worksheetName.length?e=a.mso.worksheetName+" "+(F.length+1):"undefined"!==typeof a.mso.worksheetName[F.length]&&(e=a.mso.worksheetName[F.length]);e.length||(e=c.find("caption").text()||"");e.length||(e="Table "+(F.length+1));e=d.trim(e.replace(/[\\\/[\]*:?'"]/g,"").substring(0,31));F.push(d("<div />").text(e).html());!1===a.exportHiddenCells&&(J=
c.find("tr, th, td").filter(":hidden"),V=0<J.length);q=0;T=S(this);H="<Table>\r";e=b(y(c),"th,td",0);b(B(c),"td,th",e);H+="</Table>\r";sa.push(H)});h={};A={};for(var l,R,X=0,ca=F.length;X<ca;X++)l=F[X],R=h[l],R=h[l]=null==R?1:R+1,2===R&&(F[A[l]]=F[A[l]].substring(0,29)+"-1"),1<h[l]?F[X]=F[X].substring(0,29)+"-"+h[l]:A[l]=X;h='<?xml version="1.0" encoding="UTF-8"?>\r<?mso-application progid="Excel.Sheet"?>\r<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"\r xmlns:o="urn:schemas-microsoft-com:office:office"\r xmlns:x="urn:schemas-microsoft-com:office:excel"\r xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"\r xmlns:html="http://www.w3.org/TR/REC-html40">\r<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">\r  <Created>'+
(new Date).toISOString()+'</Created>\r</DocumentProperties>\r<OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office">\r  <AllowPNG/>\r</OfficeDocumentSettings>\r<ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">\r  <WindowHeight>9000</WindowHeight>\r  <WindowWidth>13860</WindowWidth>\r  <WindowTopX>0</WindowTopX>\r  <WindowTopY>0</WindowTopY>\r  <ProtectStructure>False</ProtectStructure>\r  <ProtectWindows>False</ProtectWindows>\r</ExcelWorkbook>\r<Styles>\r  <Style ss:ID="Default" ss:Name="Normal">\r    <Alignment ss:Vertical="Bottom"/>\r    <Borders/>\r    <Font/>\r    <Interior/>\r    <NumberFormat/>\r    <Protection/>\r  </Style>\r  <Style ss:ID="rsp1">\r    <Alignment ss:Vertical="Center"/>\r  </Style>\r  <Style ss:ID="pct1">\r    <NumberFormat ss:Format="Percent"/>\r  </Style>\r</Styles>\r';
for(A=0;A<sa.length;A++)h+='<Worksheet ss:Name="'+F[A]+'" ss:RightToLeft="'+(a.mso.rtl?"1":"0")+'">\r'+sa[A],h=a.mso.rtl?h+'<WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">\r<DisplayRightToLeft/>\r</WorksheetOptions>\r':h+'<WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel"/>\r',h+="</Worksheet>\r";h+="</Workbook>\r";if("string"===a.outputMode)return h;if("base64"===a.outputMode)return K(h);M(h,a.fileName+".xml","application/xml","utf-8","base64",!1)}else if("excel"===
a.type&&"xlsx"===a.mso.fileFormat){var Z=[],Ga=XLSX.utils.book_new();d(v).filter(function(){return I(d(this))}).each(function(){for(var b=d(this),c={},e=this.getElementsByTagName("tr"),g={s:{r:0,c:0},e:{r:0,c:0}},f=[],m,u=[],k=0,n=0,h,l,r,t,x;k<e.length&&1E7>n;++k)if(h=e[k],l=!1,"function"===typeof a.onIgnoreRow&&(l=a.onIgnoreRow(d(h),k)),!1===l&&-1===d.inArray(q,a.ignoreRow)&&-1===d.inArray(q-ra,a.ignoreRow)&&I(d(h))){var w=h.children,A=0;for(h=0;h<w.length;++h)x=w[h],t=+O(x)||1,A+=t;var y=0;for(h=
l=0;h<w.length;++h)if(x=w[h],t=+O(x)||1,m=h+y,!ta(d(x),A,m+(m<l?l-m:0))){y+=t-1;for(m=0;m<f.length;++m){var v=f[m];v.s.c==l&&v.s.r<=n&&n<=v.e.r&&(l=v.e.c+1,m=-1)}(0<(r=+U(x))||1<t)&&f.push({s:{r:n,c:l},e:{r:n+(r||1)-1,c:l+t-1}});var z={type:""};m=D(x,k,h+y,z);v={t:"s",v:m};x=d(x).attr("data-tableexport-xlsxformatid")||0;var B="s";if("number"===z.type||0<x&&14>x||36<x&&41>x||48===x)B="n";else if("date"===z.type||13<x&&37>x||44<x&&48>x||56===x)B="d";z=XLSX.SSF.get_table();if(null!=m)if(0===m.length)v.t=
B||"z";else if(0!==m.trim().length&&"s"!==B)if("TRUE"===m)v={t:"b",v:!0};else if("FALSE"===m)v={t:"b",v:!1};else if("n"===B||!isNaN(Ea(m)))x=x||a.mso.xslx.formatId.numbers,v={t:"n",v:Ea(m)},v.z=0<x?z[x]:"0.00";else if("d"===B||!1!==Ba(m))x=x||a.mso.xslx.formatId.date,v={t:"d",v:Ba(m)},v.z=0<x?z[x]:"m/d/yy";c[na({c:l,r:n})]=v;g.e.c<l&&(g.e.c=l);l+=t}++n}f.length&&(c["!merges"]=f);u.length&&(c["!rows"]=u);g.e.r=n-1;c["!ref"]=oa(g);1E7<=n&&(c["!fullref"]=oa((g.e.r=e.length-k+n-1,g)));e="";"string"===
typeof a.mso.worksheetName&&a.mso.worksheetName.length?e=a.mso.worksheetName+" "+(Z.length+1):"undefined"!==typeof a.mso.worksheetName[Z.length]&&(e=a.mso.worksheetName[Z.length]);e.length||(e=b.find("caption").text()||"");e.length||(e="Table "+(Z.length+1));e=d.trim(e.replace(/[\\\/[\]*:?'"]/g,"").substring(0,31));Z.push(e);XLSX.utils.book_append_sheet(Ga,c,e)});h=XLSX.write(Ga,{type:"binary",bookType:a.mso.fileFormat,bookSST:!1});M(Oa(h),a.fileName+"."+a.mso.fileFormat,"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
"UTF-8","",!1)}else if("excel"===a.type||"xls"===a.type||"word"===a.type||"doc"===a.type){h="excel"===a.type||"xls"===a.type?"excel":"word";A="excel"===h?"xls":"doc";l='xmlns:x="urn:schemas-microsoft-com:office:'+h+'"';var H="",aa="";d(v).filter(function(){return I(d(this))}).each(function(){var b=d(this);""===aa&&(aa=a.mso.worksheetName||b.find("caption").text()||"Table",aa=d.trim(aa.replace(/[\\\/[\]*:?'"]/g,"").substring(0,31)));!1===a.exportHiddenCells&&(J=b.find("tr, th, td").filter(":hidden"),
V=0<J.length);q=0;G=[];T=S(this);H+="<table><thead>";t=y(b);d(t).each(function(){var b=d(this);r="";E(this,"th,td",q,t.length,function(d,c,f){if(null!==d){var e="";r+="<th";if(a.mso.styles.length){var g=document.defaultView.getComputedStyle(d,null),k=document.defaultView.getComputedStyle(b[0],null),h;for(h in a.mso.styles){var l=g[a.mso.styles[h]];""===l&&(l=k[a.mso.styles[h]]);""!==l&&"0px none rgb(0, 0, 0)"!==l&&"rgba(0, 0, 0, 0)"!==l&&(e+=""===e?'style="':";",e+=a.mso.styles[h]+":"+l)}}""!==e&&
(r+=" "+e+'"');e=O(d);0<e&&(r+=' colspan="'+e+'"');e=U(d);0<e&&(r+=' rowspan="'+e+'"');r+=">"+D(d,c,f)+"</th>"}});0<r.length&&(H+="<tr>"+r+"</tr>");q++});H+="</thead><tbody>";w=B(b);d(w).each(function(){var b=d(this);r="";E(this,"td,th",q,t.length+w.length,function(c,g,f){if(null!==c){var e=D(c,g,f),h="",k=d(c).attr("data-tableexport-msonumberformat");"undefined"===typeof k&&"function"===typeof a.mso.onMsoNumberFormat&&(k=a.mso.onMsoNumberFormat(c,g,f));"undefined"!==typeof k&&""!==k&&(h="style=\"mso-number-format:'"+
k+"'");if(a.mso.styles.length){g=document.defaultView.getComputedStyle(c,null);f=document.defaultView.getComputedStyle(b[0],null);for(var l in a.mso.styles)k=g[a.mso.styles[l]],""===k&&(k=f[a.mso.styles[l]]),""!==k&&"0px none rgb(0, 0, 0)"!==k&&"rgba(0, 0, 0, 0)"!==k&&(h+=""===h?'style="':";",h+=a.mso.styles[l]+":"+k)}r+="<td";""!==h&&(r+=" "+h+'"');h=O(c);0<h&&(r+=' colspan="'+h+'"');c=U(c);0<c&&(r+=' rowspan="'+c+'"');"string"===typeof e&&""!==e&&(e=Ca(e),e=e.replace(/\n/g,"<br>"));r+=">"+e+"</td>"}});
0<r.length&&(H+="<tr>"+r+"</tr>");q++});a.displayTableName&&(H+="<tr><td></td></tr><tr><td></td></tr><tr><td>"+D(d("<p>"+a.tableName+"</p>"))+"</td></tr>");H+="</tbody></table>"});l='<html xmlns:o="urn:schemas-microsoft-com:office:office" '+l+' xmlns="http://www.w3.org/TR/REC-html40">'+('<meta http-equiv="content-type" content="application/vnd.ms-'+h+'; charset=UTF-8">');l+="<head>";"excel"===h&&(l+="\x3c!--[if gte mso 9]>",l+="<xml>",l+="<x:ExcelWorkbook>",l+="<x:ExcelWorksheets>",l+="<x:ExcelWorksheet>",
l+="<x:Name>",l+=aa,l+="</x:Name>",l+="<x:WorksheetOptions>",l+="<x:DisplayGridlines/>",a.mso.rtl&&(l+="<x:DisplayRightToLeft/>"),l+="</x:WorksheetOptions>",l+="</x:ExcelWorksheet>",l+="</x:ExcelWorksheets>",l+="</x:ExcelWorkbook>",l+="</xml>",l+="<![endif]--\x3e");l+="<style>";l+="@page { size:"+a.mso.pageOrientation+"; mso-page-orientation:"+a.mso.pageOrientation+"; }";l+="@page Section1 {size:"+N[a.mso.pageFormat][0]+"pt "+N[a.mso.pageFormat][1]+"pt";l+="; margin:1.0in 1.25in 1.0in 1.25in;mso-header-margin:.5in;mso-footer-margin:.5in;mso-paper-source:0;}";
l+="div.Section1 {page:Section1;}";l+="@page Section2 {size:"+N[a.mso.pageFormat][1]+"pt "+N[a.mso.pageFormat][0]+"pt";l+=";mso-page-orientation:"+a.mso.pageOrientation+";margin:1.25in 1.0in 1.25in 1.0in;mso-header-margin:.5in;mso-footer-margin:.5in;mso-paper-source:0;}";l+="div.Section2 {page:Section2;}";l+="br {mso-data-placement:same-cell;}";l+="</style>";l+="</head>";l+="<body>";l+='<div class="Section'+("landscape"===a.mso.pageOrientation?"2":"1")+'">';l+=H;l+="</div>";l+="</body>";l+="</html>";
if("string"===a.outputMode)return l;if("base64"===a.outputMode)return K(l);M(l,a.fileName+"."+A,"application/vnd.ms-"+h,"","base64",!1)}else if("png"===a.type)html2canvas(d(v)[0]).then(function(b){b=b.toDataURL();for(var d=atob(b.substring(22)),e=new ArrayBuffer(d.length),g=new Uint8Array(e),f=0;f<d.length;f++)g[f]=d.charCodeAt(f);if("string"===a.outputMode)return d;if("base64"===a.outputMode)return K(b);"window"===a.outputMode?window.open(b):M(e,a.fileName+".png","image/png","","",!1)});else if("pdf"===
a.type)if(!0===a.pdfmake.enabled){h=[];var Ha=[];q=0;G=[];A=function(a,c,e){var b=0;d(a).each(function(){var a=[];E(this,c,q,e,function(b,d,c){if("undefined"!==typeof b&&null!==b){var e=O(b),f=U(b);b=D(b,d,c)||" ";1<e||1<f?a.push({colSpan:e||1,rowSpan:f||1,text:b}):a.push(b)}else a.push(" ")});a.length&&Ha.push(a);b<a.length&&(b=a.length);q++});return b};t=y(d(this));l=A(t,"th,td",t.length);for(R=h.length;R<l;R++)h.push("*");w=B(d(this));A(w,"th,td",t.length+w.length);h={content:[{table:{headerRows:t.length,
widths:h,body:Ha}}]};d.extend(!0,h,a.pdfmake.docDefinition);pdfMake.fonts={Roboto:{normal:"Roboto-Regular.ttf",bold:"Roboto-Medium.ttf",italics:"Roboto-Italic.ttf",bolditalics:"Roboto-MediumItalic.ttf"}};d.extend(!0,pdfMake.fonts,a.pdfmake.fonts);pdfMake.createPdf(h).getBuffer(function(b){M(b,a.fileName+".pdf","application/pdf","","",!1)})}else if(!1===a.jspdf.autotable){h={dim:{w:ea(d(v).first().get(0),"width","mm"),h:ea(d(v).first().get(0),"height","mm")},pagesplit:!1};var Ia=new jsPDF(a.jspdf.orientation,
a.jspdf.unit,a.jspdf.format);Ia.addHTML(d(v).first(),a.jspdf.margins.left,a.jspdf.margins.top,h,function(){va(Ia,!1)})}else{var g=a.jspdf.autotable.tableExport;if("string"===typeof a.jspdf.format&&"bestfit"===a.jspdf.format.toLowerCase()){var ia="",ba="",Ja=0;d(v).each(function(){if(I(d(this))){var a=ea(d(this).get(0),"width","pt");if(a>Ja){a>N.a0[0]&&(ia="a0",ba="l");for(var c in N)N.hasOwnProperty(c)&&N[c][1]>a&&(ia=c,ba="l",N[c][0]>a&&(ba="p"));Ja=a}}});a.jspdf.format=""===ia?"a4":ia;a.jspdf.orientation=
""===ba?"w":ba}if(null==g.doc&&(g.doc=new jsPDF(a.jspdf.orientation,a.jspdf.unit,a.jspdf.format),g.wScaleFactor=1,g.hScaleFactor=1,"function"===typeof a.jspdf.onDocCreated))a.jspdf.onDocCreated(g.doc);!0===g.outputImages&&(g.images={});"undefined"!==typeof g.images&&(d(v).filter(function(){return I(d(this))}).each(function(){var b=0;G=[];!1===a.exportHiddenCells&&(J=d(this).find("tr, th, td").filter(":hidden"),V=0<J.length);t=y(d(this));w=B(d(this));d(w).each(function(){E(this,"td,th",t.length+b,
t.length+w.length,function(a){xa(a,d(a).children(),g)});b++})}),t=[],w=[]);La(g,function(){d(v).filter(function(){return I(d(this))}).each(function(){var b;q=0;G=[];!1===a.exportHiddenCells&&(J=d(this).find("tr, th, td").filter(":hidden"),V=0<J.length);T=S(this);g.columns=[];g.rows=[];g.teCells={};if("function"===typeof g.onTable&&!1===g.onTable(d(this),a))return!0;a.jspdf.autotable.tableExport=null;var c=d.extend(!0,{},a.jspdf.autotable);a.jspdf.autotable.tableExport=g;c.margin={};d.extend(!0,c.margin,
a.jspdf.margins);c.tableExport=g;"function"!==typeof c.beforePageContent&&(c.beforePageContent=function(a){if(1===a.pageCount){var b=a.table.rows.concat(a.table.headerRow);d.each(b,function(){0<this.height&&(this.height+=(2-1.15)/2*this.styles.fontSize,a.table.height+=(2-1.15)/2*this.styles.fontSize)})}});"function"!==typeof c.createdHeaderCell&&(c.createdHeaderCell=function(a,b){a.styles=d.extend({},b.row.styles);if("undefined"!==typeof g.columns[b.column.dataKey]){var e=g.columns[b.column.dataKey];
if("undefined"!==typeof e.rect){a.contentWidth=e.rect.width;if("undefined"===typeof g.heightRatio||0===g.heightRatio){var f=b.row.raw[b.column.dataKey].rowspan?b.row.raw[b.column.dataKey].rect.height/b.row.raw[b.column.dataKey].rowspan:b.row.raw[b.column.dataKey].rect.height;g.heightRatio=a.styles.rowHeight/f}f=b.row.raw[b.column.dataKey].rect.height*g.heightRatio;f>a.styles.rowHeight&&(a.styles.rowHeight=f)}a.styles.halign="inherit"===c.headerStyles.halign?"center":c.headerStyles.halign;a.styles.valign=
c.headerStyles.valign;"undefined"!==typeof e.style&&!0!==e.style.hidden&&("inherit"===c.headerStyles.halign&&(a.styles.halign=e.style.align),"inherit"===c.styles.fillColor&&(a.styles.fillColor=e.style.bcolor),"inherit"===c.styles.textColor&&(a.styles.textColor=e.style.color),"inherit"===c.styles.fontStyle&&(a.styles.fontStyle=e.style.fstyle))}});"function"!==typeof c.createdCell&&(c.createdCell=function(a,b){b=g.teCells[b.row.index+":"+b.column.dataKey];a.styles.halign="inherit"===c.styles.halign?
"center":c.styles.halign;a.styles.valign=c.styles.valign;"undefined"!==typeof b&&"undefined"!==typeof b.style&&!0!==b.style.hidden&&("inherit"===c.styles.halign&&(a.styles.halign=b.style.align),"inherit"===c.styles.fillColor&&(a.styles.fillColor=b.style.bcolor),"inherit"===c.styles.textColor&&(a.styles.textColor=b.style.color),"inherit"===c.styles.fontStyle&&(a.styles.fontStyle=b.style.fstyle))});"function"!==typeof c.drawHeaderCell&&(c.drawHeaderCell=function(a,b){var d=g.columns[b.column.dataKey];
return(!0!==d.style.hasOwnProperty("hidden")||!0!==d.style.hidden)&&0<=d.rowIndex?wa(a,b,d):!1});"function"!==typeof c.drawCell&&(c.drawCell=function(a,b){var c=g.teCells[b.row.index+":"+b.column.dataKey];if(!0!==("undefined"!==typeof c&&c.isCanvas))wa(a,b,c)&&(g.doc.rect(a.x,a.y,a.width,a.height,a.styles.fillStyle),"undefined"!==typeof c&&"undefined"!==typeof c.elements&&c.elements.length?(b=a.height/c.rect.height,b>g.hScaleFactor&&(g.hScaleFactor=b),g.wScaleFactor=a.width/c.rect.width,b=a.textPos.y,
za(a,c.elements,g),a.textPos.y=b,Aa(a,c.elements,g)):Aa(a,{},g));else{c=c.elements[0];var e=d(c).attr("data-tableexport-canvas"),f=c.getBoundingClientRect();a.width=f.width*g.wScaleFactor;a.height=f.height*g.hScaleFactor;b.row.height=a.height;ua(a,c,e,g)}return!1});g.headerrows=[];t=y(d(this));d(t).each(function(){b=0;g.headerrows[q]=[];E(this,"th,td",q,t.length,function(a,d,c){var e=Da(a);e.title=D(a,d,c);e.key=b++;e.rowIndex=q;g.headerrows[q].push(e)});q++});if(0<q)for(var e=q-1;0<=e;)d.each(g.headerrows[e],
function(){var a=this;0<e&&null===this.rect&&(a=g.headerrows[e-1][this.key]);null!==a&&0<=a.rowIndex&&(!0!==a.style.hasOwnProperty("hidden")||!0!==a.style.hidden)&&g.columns.push(a)}),e=0<g.columns.length?-1:e-1;var h=0;w=[];w=B(d(this));d(w).each(function(){var a=[];b=0;E(this,"td,th",q,t.length+w.length,function(c,e,f){if("undefined"===typeof g.columns[b]){var k={title:"",key:b,style:{hidden:!0}};g.columns.push(k)}"undefined"!==typeof c&&null!==c?(k=Da(c),k.isCanvas=c.hasAttribute("data-tableexport-canvas"),
k.elements=k.isCanvas?d(c):d(c).children()):(k=d.extend(!0,{},g.teCells[h+":"+(b-1)]),k.colspan=-1);g.teCells[h+":"+b++]=k;a.push(D(c,e,f))});a.length&&(g.rows.push(a),h++);q++});if("function"===typeof g.onBeforeAutotable)g.onBeforeAutotable(d(this),g.columns,g.rows,c);g.doc.autoTable(g.columns,g.rows,c);if("function"===typeof g.onAfterAutotable)g.onAfterAutotable(d(this),c);a.jspdf.autotable.startY=g.doc.autoTableEndPosY()+c.margin.top});va(g.doc,"undefined"!==typeof g.images&&!1===jQuery.isEmptyObject(g.images));
"undefined"!==typeof g.headerrows&&(g.headerrows.length=0);"undefined"!==typeof g.columns&&(g.columns.length=0);"undefined"!==typeof g.rows&&(g.rows.length=0);delete g.doc;g.doc=null})}return this}})(jQuery);

/* jshint ignore:end */