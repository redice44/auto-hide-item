// ==UserScript==
// @name         Auto Hide Item
// @namespace    http://tampermonkey.net/
// @version      0.1a
// @description  Automatically Hides an Item in Blackboard
// @author       Matt Thomson <red.cataclysm@gmail.com>
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser-polyfill.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser.min.js
// @match        https://fiu.blackboard.com/webapps/blackboard/content/listContentEditable.jsp?*
// @match        https://fiu.blackboard.com/webapps/blackboard/execute/manageCourseItem?*&hide=*
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
/* jshint ignore:end */
/* jshint esnext: true */
  const CONTENT_PAGE_URL_BASE = 'https://fiu.blackboard.com/webapps/blackboard/content/listContentEditable.jsp?';
  const EDIT_PAGE_URL_BASE = 'https://fiu.blackboard.com/webapps/blackboard/execute/manageCourseItem?';
  const PAGE_URL = document.URL;

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
      const hideParam = _isHidden(item) ? '0' : '1'; // 0: show, 1: hide

      i.insertAdjacentHTML('afterbegin', `<a href="${EDIT_PAGE_URL_BASE}dispatch=edit&course_id=${courseId}&content_id=${id}&hide=${hideParam}">${hideParam === '1' ? 'Hide' : 'Show'}</a>`);
    }
  }

  function _isHidden(item) {
    const hiddenPhrase = 'Item is not available.';
    let result = false;
    let details = item.querySelectorAll('.details .detailsValue');

    for (let d of details) {
      if (d.innerHTML === hiddenPhrase) {
        result = true;
      }
    }

    return result;
  }

  function editPage() {
    const hideParam = _getHideParam();

    if (hideParam === '1') {
      document.querySelector('#isAvailable_false').checked = true;
    } else {
      document.querySelector('#isAvailable_true').checked = true;
    }
    document.querySelector('.submitStepTop input[name=top_Submit]').click();
  }

  function _getHideParam() {
    let p = PAGE_URL.split('&');
    return p[p.length - 1].split('=')[1]; // Hide param is known to be last.
  }



/* jshint ignore:start */
]]></>).toString();
var c = babel.transform(inline_src);
eval(c.code);
/* jshint ignore:end */
