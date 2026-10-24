// 喫茶けけけ script.js
// 役割: SPハンバーガーメニュー / Journalカテゴリ絞り込み / 画像の欠け対策 / 年表示
(function () {
  'use strict';

  // SPメニュー開閉
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('sp-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Journalカテゴリ絞り込み
  var filterBtns = document.querySelectorAll('.filter-btn');
  var cards = document.querySelectorAll('.card[data-category]');
  if (filterBtns.length && cards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
        btn.setAttribute('aria-pressed', 'true');
        var cat = btn.getAttribute('data-filter');
        cards.forEach(function (card) {
          var show = cat === 'all' || card.getAttribute('data-category') === cat;
          card.classList.toggle('is-hidden', !show);
        });
      });
    });
  }

  // 画像が未用意の場合、割れたアイコンを出さず黄paleのプレースホルダを見せる
  document.querySelectorAll('img').forEach(function (img) {
    var hide = function () { img.classList.add('is-missing'); };
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) hide();
    img.addEventListener('error', hide);
  });

  // © の年
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
