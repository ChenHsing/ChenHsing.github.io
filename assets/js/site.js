/* 站外链接在新标签打开（站内锚点保持当前标签，保证导航平滑滚动） */
(function () {
  var links = document.querySelectorAll("a[href^='http://'], a[href^='https://']");
  Array.prototype.forEach.call(links, function (a) {
    if (a.host && a.host !== window.location.host) {
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
    }
  });
})();

/* News「更多 / 收起」 */
(function () {
  var btns = document.querySelectorAll("[data-more]");
  Array.prototype.forEach.call(btns, function (btn) {
    btn.addEventListener("click", function () {
      // 按钮与 .timeline 是兄弟节点，用 id 定位更稳妥
      var tl = document.getElementById("news-timeline");
      if (!tl) return;
      var expanded = tl.classList.toggle("is-expanded");
      btn.setAttribute("aria-expanded", String(expanded));
      var label = btn.querySelector(".timeline__more-label");
      var icon = btn.querySelector(".timeline__more-icon");
      if (label) label.textContent = expanded ? "Less" : "More";
      if (icon) icon.textContent = expanded ? "▴" : "▾";
    });
  });
})();

/* Other Publications「More / Less」 */
(function () {
  var btn = document.querySelector("[data-more-pubs]");
  var more = document.getElementById("pub-list-more");
  if (!btn || !more) return;
  btn.addEventListener("click", function () {
    var expanded = more.classList.toggle("is-expanded");
    btn.setAttribute("aria-expanded", String(expanded));
    var label = btn.querySelector(".timeline__more-label");
    var icon = btn.querySelector(".timeline__more-icon");
    if (label) label.textContent = expanded ? "Less" : "More";
    if (icon) icon.textContent = expanded ? "▴" : "▾";
  });
})();

/* Avatar lightbox */
(function () {
  var trigger = document.querySelector("[data-avatar-trigger]");
  var dialog = document.getElementById("avatar-lightbox");
  if (!trigger || !dialog) return;

  trigger.addEventListener("click", function () {
    if (dialog.showModal) {
      dialog.showModal();
    }
  });

  dialog.addEventListener("click", function (e) {
    if (e.target === dialog && dialog.close) {
      dialog.close();
    }
  });
})();
