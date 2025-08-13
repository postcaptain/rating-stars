/*!
 * rating-stars-loader.js
 * Injects rating-stars.css and applies the style to chosen form fields
 */
(function (cfg) {
  // --- USER CONFIG ---
  // Slate admins set window.RATING_STARS_CONFIG before loading this script
  cfg = cfg || window.RATING_STARS_CONFIG || {};

  var exportsList = Array.isArray(cfg.exports) ? cfg.exports : [];
  var cssUrl = cfg.cssUrl || "https://cdn.jsdelivr.net/gh/<ORG>/rating-stars@v1.0.0/rating-stars.css";
  var globalVars = cfg.vars || {};
  var perFieldVars = cfg.perFieldVars || {};

  // --- Inject CSS dynamically ---
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = cssUrl;
  document.head.appendChild(link);

  // --- Apply classes and variables ---
  function applyStars() {
    if (!exportsList.length) return;
    var selector = exportsList
      .map(function (exp) {
        return '.form_question.form_radio[data-export="' + exp + '"]';
      })
      .join(",");

    document.querySelectorAll(selector).forEach(function (el) {
      el.classList.add("rating-stars");

      // Apply global CSS variables
      for (var k in globalVars) {
        if (Object.prototype.hasOwnProperty.call(globalVars, k)) {
          el.style.setProperty(k, globalVars[k]);
        }
      }

      // Apply per-field overrides
      var expVal = el.getAttribute("data-export");
      if (perFieldVars[expVal]) {
        var varsForField = perFieldVars[expVal];
        for (var v in varsForField) {
          if (Object.prototype.hasOwnProperty.call(varsForField, v)) {
            el.style.setProperty(v, varsForField[v]);
          }
        }
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyStars);
  } else {
    applyStars();
  }
})(window.RATING_STARS_CONFIG || {});
