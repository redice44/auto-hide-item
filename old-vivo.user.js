// ==UserScript==
// @name         Old ViVo Notification
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  Alerts on old vivo links
// @author       Matt Thomson <red.cataclysm@gmail.com>
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser-polyfill.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser.min.js
// @match        https://fiu.blackboard.com/webapps/blackboard/content/listContentEditable.jsp?*
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
/* jshint ignore:end */
/* jshint esnext: true */

// Your code here...
let links = document.querySelectorAll('#content_listContainer a');
let vivo = [];
for (let l of links) {
  if (l.href.includes('vivoId=')) {
    console.log(l);
    vivo.push(l.innerText);
  }
}
if (vivo.length > 0) {
  let items = '';

  for (let i of vivo) {
    items += `${i}\n`;
  }

  alert (`There are ${vivo.length} old vivo links on this page.\nLinks:\n\n${items}`);
}

/* jshint ignore:start */
]]></>).toString();
var c = babel.transform(inline_src);
eval(c.code);
/* jshint ignore:end */
