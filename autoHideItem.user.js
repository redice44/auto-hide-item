// ==UserScript==
// @name         Auto Hide Item
// @namespace    http://tampermonkey.net/
// @version      0.1a
// @description  Automatically Hides an Item in Blackboard
// @author       Matt Thomson <red.cataclysm@gmail.com>
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser-polyfill.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser.min.js
// @match        https://fiu.blackboard.com/webapps/blackboard/content/listContentEditable.jsp?*
// @match        https://fiu.blackboard.com/webapps/blackboard/execute/manageCourseItem?*&mytag=yes
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
/* jshint ignore:end */
/* jshint esnext: true */
  const CONTENT_PAGE_URL_BASE = 'https://fiu.blackboard.com/webapps/blackboard/content/listContentEditable.jsp?';
  const EDIT_PAGE_URL_BASE = 'https://fiu.blackboard.com/webapps/blackboard/execute/manageCourseItem?';
  let PAGE_URL = document.URL;

  init();



  function init() {
    if (PAGE_URL.includes(CONTENT_PAGE_URL_BASE)) {
      contentPage();
    } else if (PAGE_URL.includes(EDIT_PAGE_URL_BASE)) {
      editPage();
    } else {
      console.log(`A page was loaded that should not have been: ${PAGE_URL}`);
    }
  }

  function contentPage() {
    const courseId = document.querySelector('input[name=course_id').value;
    const items = document.querySelectorAll('#content_listContainer > li');

    for (let item of items) {
    const i = item.querySelector('div.item');
    const id = i.id;
    i.insertAdjacentHTML('afterbegin', `<a href="${EDIT_PAGE_URL_BASE}dispatch=edit&course_id=${courseId}&content_id=${id}&mytag=yes">Hide?</a>`);
    }
  }

  function editPage() {
    document.querySelector('#isAvailable_false').checked = true;
    document.querySelector('.submitStepTop input[name=top_Submit]').click();
  }



/* jshint ignore:start */
]]></>).toString();
var c = babel.transform(inline_src);
eval(c.code);
/* jshint ignore:end */
