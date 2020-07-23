!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("axios"),require("fingerprintjs2sync")):"function"==typeof define&&define.amd?define(["exports","axios","fingerprintjs2sync"],e):(t=t||self,e(t["upload-toolkit"]={},t.axios,t.Fingerprint2))}(this,(function(t,e,n){"use strict";e=e&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e,n=n&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n;
/*!
   * user-agent
   * Copyright(c) 2010-2011 TJ Holowaychuk.
   * Authored by TJ Holowaychuk
   * MIT Licensed
   */
var r=function(t){var e={full:t,name:i(t)};return e.version=function(t,e){"safari"===e&&(e="version");if(e)return new RegExp(e+"[\\/ ]([\\d\\w\\.-]+)","i").exec(t)&&RegExp.$1||"";var n=t.match(/version[\/ ]([\d\w\.]+)/i);return n&&n.length>1?n[1]:""}(t,e.name),e.fullName=e.name+" "+e.version,e.os=function(t){for(var e,n=0,r=a.length;n<r;++n)if(e=o[a[n]].exec(t))return~a[n].indexOf("$1")?a[n].replace(/\$(\d+)/g,(function(t,n){return e[n]})):a[n];return""}(t),e};var o={iPad:/ipad/i,iPhone:/iphone/i,"Windows Vista":/windows nt 6\.0/i,"Windows 7":/windows nt 6\.\d+/i,"Windows 2003":/windows nt 5\.2+/i,"Windows XP":/windows nt 5\.1+/i,"Windows 2000":/windows nt 5\.0+/i,"OS X $1.$2":/os x (\d+)[._](\d+)/i,Linux:/linux/i,Googlebot:/googlebot/i},a=Object.keys(o);var s=["opera","konqueror","firefox","chrome","epiphany","safari","msie","curl"];function i(t){t=t.toLowerCase();for(var e=0,n=s.length;e<n;++e)if(-1!==t.indexOf(s[e]))return s[e];return""}const c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";function u(t){var e,n,r,o,a,s,i,u="",f=0;for(t=function(t){t=t.replace(/\r\n/g,"\n");for(var e="",n=0;n<t.length;n++){var r=t.charCodeAt(n);r<128?e+=String.fromCharCode(r):r>127&&r<2048?(e+=String.fromCharCode(r>>6|192),e+=String.fromCharCode(63&r|128)):(e+=String.fromCharCode(r>>12|224),e+=String.fromCharCode(r>>6&63|128),e+=String.fromCharCode(63&r|128))}return e}(t);f<t.length;)e=t.charCodeAt(f++),n=t.charCodeAt(f++),r=t.charCodeAt(f++),o=e>>2,a=(3&e)<<4|n>>4,s=(15&n)<<2|r>>6,i=63&r,isNaN(n)?s=i=64:isNaN(r)&&(i=64),u=u+c.charAt(o)+c.charAt(a)+c.charAt(s)+c.charAt(i);return u}async function f(){return new Promise(async(t,e)=>{navigator&&navigator.userAgent?(console.log("29"),r(navigator.userAgent)?(console.log("31:",r(navigator.userAgent)),t(r(navigator.userAgent))):(console.log("34"),t({}))):wx.getSystemInfo({success:function(e){t(e)},fail:()=>t({})})})}async function l(){const{version:t,platform:e,name:r,system:o,os:a,model:s}=await f()||{};let i="";if(navigator&&navigator.userAgent)i=(new n).getSync().fprint;else{const e=`${Date.now()}-${Math.floor(1e3*Math.random())}-${Math.floor(100*Math.random())}`;i=u(`${s}-${o}-${t}-${e}`.replace(/\s/g,""))}return i}function h(t={}){if(!navigator||!navigator.userAgent)return t;{const e=new FormData;Object.keys(t).forEach(n=>{e.append(n,t[n])})}}async function d({api:t="",data:n={},path:r="/gw/api/",headers:o={},method:a="post"}){const{name:s,version:i,os:c}=f(),u={appKey:process.env.APP_KEY,bizCode:process.env.BIZ_CODE,clientSysName:s,clientSysVersion:i,clientVersion:c||"windows",deviceUUID:l()},d={"Content-Type":"multipart/form-data",appKey:process.env.APP_KEY};return e({method:a,withCredentials:!0,responseType:"json",timeout:3e4,headers:{...d,...o},url:`${process.env.GATEWAY}${r}${t}`,transformRequest:[t=>h(t)],data:{...u,...n}})}const p={};var g,y;g="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",y=p.util={rotl:function(t,e){return t<<e|t>>>32-e},rotr:function(t,e){return t<<32-e|t>>>e},endian:function(t){if(t.constructor==Number)return 16711935&y.rotl(t,8)|4278255360&y.rotl(t,24);for(var e=0;e<t.length;e++)t[e]=y.endian(t[e]);return t},randomBytes:function(t){for(var e=[];t>0;t--)e.push(Math.floor(256*Math.random()));return e},stringToBytes:function(t){for(var e=[],n=0;n<t.length;n++)e.push(t.charCodeAt(n));return e},bytesToString:function(t){for(var e=[],n=0;n<t.length;n++)e.push(String.fromCharCode(t[n]));return e.join("")},stringToWords:function(t){for(var e=[],n=0,r=0;n<t.length;n++,r+=8)e[r>>>5]|=t.charCodeAt(n)<<24-r%32;return e},bytesToWords:function(t){for(var e=[],n=0,r=0;n<t.length;n++,r+=8)e[r>>>5]|=t[n]<<24-r%32;return e},wordsToBytes:function(t){for(var e=[],n=0;n<32*t.length;n+=8)e.push(t[n>>>5]>>>24-n%32&255);return e},bytesToHex:function(t){for(var e=[],n=0;n<t.length;n++)e.push((t[n]>>>4).toString(16)),e.push((15&t[n]).toString(16));return e.join("")},hexToBytes:function(t){for(var e=[],n=0;n<t.length;n+=2)e.push(parseInt(t.substr(n,2),16));return e},bytesToBase64:function(t){if("function"==typeof btoa)return btoa(y.bytesToString(t));for(var e,n=[],r=0;r<t.length;r++)switch(r%3){case 0:n.push(g.charAt(t[r]>>>2)),e=(3&t[r])<<4;break;case 1:n.push(g.charAt(e|t[r]>>>4)),e=(15&t[r])<<2;break;case 2:n.push(g.charAt(e|t[r]>>>6)),n.push(g.charAt(63&t[r])),e=-1}for(null!=e&&-1!=e&&n.push(g.charAt(e));n.length%4!=0;)n.push("=");return n.join("")},base64ToBytes:function(t){if("function"==typeof atob)return y.stringToBytes(atob(t));t=t.replace(/[^A-Z0-9+\/]/gi,"");for(var e=[],n=0;n<t.length;n++)switch(n%4){case 1:e.push(g.indexOf(t.charAt(n-1))<<2|g.indexOf(t.charAt(n))>>>4);break;case 2:e.push((15&g.indexOf(t.charAt(n-1)))<<4|g.indexOf(t.charAt(n))>>>2);break;case 3:e.push((3&g.indexOf(t.charAt(n-1)))<<6|g.indexOf(t.charAt(n)))}return e}},p.mode={},function(t){var e=t.util;t.HMAC=function(t,n,r,o){r=r.length>4*t._blocksize?t(r,{asBytes:!0}):e.stringToBytes(r);for(var a=r,s=r.slice(0),i=0;i<4*t._blocksize;i++)a[i]^=92,s[i]^=54;var c=t(e.bytesToString(a)+t(e.bytesToString(s)+n,{asString:!0}),{asBytes:!0});return o&&o.asBytes?c:o&&o.asString?e.bytesToString(c):e.bytesToHex(c)}}(p),function(t){var e=t.util,n=t.SHA1=function(t,r){var o=e.wordsToBytes(n._sha1(t));return r&&r.asBytes?o:r&&r.asString?e.bytesToString(o):e.bytesToHex(o)};n._sha1=function(t){var n=e.stringToWords(t),r=8*t.length,o=[],a=1732584193,s=-271733879,i=-1732584194,c=271733878,u=-1009589776;n[r>>5]|=128<<24-r%32,n[15+(r+64>>>9<<4)]=r;for(var f=0;f<n.length;f+=16){for(var l=a,h=s,d=i,p=c,g=u,y=0;y<80;y++){if(y<16)o[y]=n[f+y];else{var m=o[y-3]^o[y-8]^o[y-14]^o[y-16];o[y]=m<<1|m>>>31}var w=(a<<5|a>>>27)+u+(o[y]>>>0)+(y<20?1518500249+(s&i|~s&c):y<40?1859775393+(s^i^c):y<60?(s&i|s&c|i&c)-1894007588:(s^i^c)-899497514);u=c,c=i,i=s<<30|s>>>2,s=a,a=w}a+=l,s+=h,i+=d,c+=p,u+=g}return[a,s,i,c,u]},n._blocksize=16}(p);const m="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";function w(t){var e,n,r,o,a,s,i,c="",u=0;for(t=function(t){t=t.replace(/\r\n/g,"\n");for(var e="",n=0;n<t.length;n++){var r=t.charCodeAt(n);r<128?e+=String.fromCharCode(r):r>127&&r<2048?(e+=String.fromCharCode(r>>6|192),e+=String.fromCharCode(63&r|128)):(e+=String.fromCharCode(r>>12|224),e+=String.fromCharCode(r>>6&63|128),e+=String.fromCharCode(63&r|128))}return e}(t);u<t.length;)e=t.charCodeAt(u++),n=t.charCodeAt(u++),r=t.charCodeAt(u++),o=e>>2,a=(3&e)<<4|n>>4,s=(15&n)<<2|r>>6,i=63&r,isNaN(n)?s=i=64:isNaN(r)&&(i=64),c=c+m.charAt(o)+m.charAt(a)+m.charAt(s)+m.charAt(i);return c}async function v(){try{const{data:t}=await d({api:"songxiaocai.user.acp.getOssToken"});return t.response}catch(t){console.log("get oss cfg err:",t)}}const A=t=>{const e=t||process.env.APP_KEY,n=Date.now()+"",r=(e+"").split("").reverse().join("");return function(t,e){let n="";for(let r=0;r<t.length;r++){let o=t.charAt(r);if(r-1<e.length&&r>0){const n=parseInt(e[r-1])%2;n>0&&(o=1^t.charAt(r))}n+=o}return n}(n,r)};function S(t,e){const n=e.lastIndexOf(".");let r="";return-1!==n&&(r=e.substring(n)),t+function(t){t=t||32;const e="ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",n=e.length;let r="";for(let o=0;o<t;o++)r+=e.charAt(Math.floor(Math.random()*n));return r}(10)+Date.now()+r}function C(t,e,n){return`${o=t,o||GATEWAY_HOST||"https://gateway.songxiaocai.com"}${r=e,r||GATEWAY_PATH||"/gw/api/"}${n}`;var r,o}let b=null;async function x({host:t,path:e}={},n={}){const r=await async function({host:t="",path:e="",api:n=""}={},r={}){const{method:o,header:a={}}=r||{};return new Promise((s,i)=>{const c=Object.assign({},r||{});for(const t in c)if(c.hasOwnProperty(t)){const e=c[t];"object"==typeof e&&(c[t]=JSON.stringify(e))}wx.request({url:C(t,e,n),method:o||"POST",header:{"Content-Type":"application/x-www-form-urlencoded",...a},data:c,success({data:t}={}){const{success:e}=t||{};e?s(t):i(t)},fail(t){console.log("err:",t),i(t)}})})}({host:t,path:e,api:"songxiaocai.user.acp.getOssToken"},n);return b={...r},r}t.GWUpload=async({headers:t={},data:n={},filename:r="image",file:o,withCredentials:a=!0})=>{const{name:s,version:i,os:c}=await f(),u={token:A(),appKey:process.env.APP_KEY,bizCode:process.env.BIZ_CODE,clientSysName:s,clientSysVersion:i,clientVersion:c||"windows",deviceUUID:l(),...n};return e({method:"POST",url:process.env.GATEWAY+"/upload/image",data:h(u),headers:{...t,"Content-Type":"multipart/form-data;"},withCredentials:a,timeout:4e4}).then(t=>{if(!t.data.success||!t.data.result)throw t.data;return t.data.result}).catch(t=>{throw t})},t.MiniProgramUpload=async function({file:t,name:e="file"},{host:n,path:r,api:o}={},a={}){let s={};return new Promise(async(o,i)=>{if(wx&&wx.uploadFile){if(b)s={...b};else{const{response:t={}}=await x({host:n,path:r},a);s={...t}}const c=s.objectName+"/item/",f=S(c,t),l=function(t){const e=new Date(+t).toISOString(),n={expiration:e,conditions:[["content-length-range",1,1048576e3]]},r=u(JSON.stringify(n));return r}(s.expireTimestamp),h=function(t,e){const n=p.HMAC(p.SHA1,t,e,{asBytes:!0}),r=p.util.bytesToBase64(n);return r}(l,s.accessKeySecret),d=`https://${s.bucketName}.${s.endPoint.split("//").slice(-1)[0]}`,g={key:f,policy:l,OSSAccessKeyId:s.accessKeyId,success_action_status:"200",signature:h,"x-oss-security-token":s.securityToken};wx.uploadFile({url:d,filePath:t,name:e,formData:{...a,...g},success:t=>{200===t.statusCode?o(`${d}/${f}`):i(new Error("上传失败"))},fail:t=>{i(t)}})}else i(new Error("Web 应用请使用 STSUpload or GWUpload!"))})},t.STSUpload=async function({file:t,ossConfig:n,opts:r={}}){n||(n=await v());const o=n.objectName+"/item/",a=function(t,e="aa.bb"){const n=e.lastIndexOf(".");let r="",o="";return-1!==n&&(r=e.substring(n),o=e.substring(0,n)),`${t}${o}_${Date.now()}${r}`}(o,t.name||"img.png"),s=function(t){const e=new Date(+t).toISOString(),n={expiration:e,conditions:[["content-length-range",1,1048576e3]]},r=w(JSON.stringify(n));return r}(n.expireTimestamp),i=function(t,e){const n=p.HMAC(p.SHA1,t,e,{asBytes:!0}),r=p.util.bytesToBase64(n);return r}(s,n.accessKeySecret),c=`https://${n.bucketName}.${n.endPoint.split("//").slice(-1)[0]}`,u={method:"post",url:c,data:h({key:a,policy:s,OSSAccessKeyId:n.accessKeyId,success_action_status:"200",Signature:i,"x-oss-security-token":n.securityToken,file:t}),headers:{"Content-Type":"multipart/form-data"},onUploadProgress:t=>{const e=+(t.loaded/t.total*100).toFixed(2),{onUploadProgress:n}=r;"function"==typeof n&&n(e,t)}};return e(u).then(()=>`${c}/${a}`).catch(t=>{throw console.log("上传err:",t),t})},t.fetchOssConfig=v,t.request=d,Object.defineProperty(t,"__esModule",{value:!0})}));