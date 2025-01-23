// ==UserScript==
// @name        X Parody Label Hider
// @namespace   https://github.com/shapoco/xpro-auto-top/
// @updateURL   http://localhost:9997/x-parody-label-hider.user.js
// @downloadURL http://localhost:9997/x-parody-label-hider.user.js
// @match       https://tweetdeck.twitter.com/*
// @match       https://pro.twitter.com/*
// @match       https://pro.x.com/*
// @match       https://x.com/*
// @version     1.0.22
// @author      Shapoco
// @description 「パロディアカウント」のラベルを非表示にする
// @run-at      document-start
// ==/UserScript==

(function() {
  'use strict';

  class XParodyLabelHider {
    constructor() {
      this.intervalId = -1;
      this.knownLinks = [];
    }

    // 起動処理
    start() {
      this.intervalId = window.setInterval(() => {
        this.scanLabels();
      }, 1000);
    }

    // ラベルの検索
    scanLabels() {
      document.querySelectorAll('a[href="https://help.x.com/rules-and-policies/authenticity"]').forEach(a => {
        this.processA(a);
      });
    }

    // ラベル毎の処理
    processA(a) {
      // 同じ要素に対しては3回まで処理する
      if (this.knownLinks.includes(a)) return;
      this.knownLinks.push(a);

      // アイコンを含むか確認
      const img = a.querySelector('img');
      // https://abs.twimg.com/responsive-web/client-web/parody-mask.\w+.svg
      // https://abs.twimg.com/gryphon-client/client-web/parody-mask.\w+.svg
      if (!img.src || !img.src.includes('parody-mask')) return;

      // 「パロディアカウント」を含むか確認
      const labelSpans = Array.from(a.querySelectorAll('span')).filter(span => span.textContent == 'パロディアカウント');
      if (labelSpans.length !== 1) return;

      // このリンクだけを含む要素を追う
      let div = a.parentNode;
      if (div) {
        while (div.parentNode && div.parentNode.children && div.parentNode.children.length == 1) {
          div = div.parentNode;
        }
        div.style.display = 'none';
      }
      else {
        a.style.display = 'none';
      }
    }
  }

  window.xplh = new XParodyLabelHider();
  window.xplh.start();

})();
