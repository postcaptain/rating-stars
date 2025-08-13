/*
 * rating-stars.js
 * Hybrid approach: if window.RATING_STARS_EXPORTS has items, target those data-export fields.
 * Otherwise, apply to ALL .form_question.form_radio groups.
 * Loads CSS from the same CDN path as this JS (or cfg override) — no inline CSS here.
 */
(function () {
  var cfg = window.RATING_STARS_CONFIG || {};
  var list = Array.isArray(cfg.exports) ? cfg.exports : window.RATING_STARS_EXPORTS;
  var cssHref = cfg.cssHref || window.RATING_STARS_CSS;

  // Derive CSS URL from this script's src if not explicitly provided
  if (!cssHref) {
    var s = document.currentScript;
    if (!s) {
      var scripts = document.getElementsByTagName("script");
      s = scripts[scripts.length - 1];
    }
    var src = (s && s.src) || "";
    // Replace .../rating-stars(.min).js?x=y  ->  .../rating-stars.css?x=y
    cssHref = src.replace(/rating-stars(\.min)?\.js(\?.*)?$/i, "rating-stars.css$2");
    // Fallback hard URL (edit to your latest tag if needed)
    if (!/\.css/i.test(cssHref)) {
      cssHref = "https://cdn.jsdelivr.net/gh/postcaptain/rating-stars@v0.8.4/rating-stars.css";
    }
  }

  // Inject CSS <link> once
  if (!document.querySelector('link[rel="stylesheet"][href="'+cssHref+'"]')) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = cssHref;
    document.head.appendChild(link);
  }

  function apply() {
    var selector;
    if (Array.isArray(list) && list.length) {
      selector = list.map(function (exp) {
        return '.form_question.form_radio[data-export="' + exp + '"]';
      }).join(",");
    } else {
      selector = ".form_question.form_radio";
    }
    document.querySelectorAll(selector).forEach(function (el) {
      el.classList.add("rating-stars");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply);
  } else {
    apply();
  }

  // Optional: watch for dynamically-added forms
  if (cfg.observe !== false) {
    var mo = new MutationObserver(function (mut) {
      for (var i = 0; i < mut.length; i++) {
        if (mut[i].addedNodes && mut[i].addedNodes.length) { apply(); break; }
      }
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  }
})();
