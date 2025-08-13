/*
 * rating-stars.js
 * Hybrid mode: Apply to all radios OR specific `data-export` list
 * No external CSS file needed — styles are injected directly
 */

(function() {
  // Default CSS variables
  var css = `
:root {
  --rs-star-size: 32px;
  --rs-star-gap: 0px;
  --rs-star-grey: #bdbdbd;
  --rs-star-gold: #fbc02d;
}

.rating-stars .form_responses {
  display: flex;
  flex-direction: row-reverse;
  gap: var(--rs-star-gap);
}
.rating-stars input[type="radio"] {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}
.rating-stars label {
  display: inline-block;
  width: var(--rs-star-size);
  height: var(--rs-star-size);
  font-size: 0;
  cursor: pointer;
  background-color: var(--rs-star-grey);
  -webkit-mask: var(--star-mask) center / 100% 100% no-repeat;
  mask: var(--star-mask) center / 100% 100% no-repeat;
}

/* Star mask variable (must be separate for Safari compatibility) */
:root {
  --star-mask: url("data:image/svg+xml;utf8, \
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'> \
<path fill='black' d='M12 17.27L18.18 21l-1.64-7.03 \
L22 9.24l-7.19-.62L12 2 9.19 8.62 \
2 9.24l5.46 4.73L5.82 21z'/> \
</svg>");
}

/* Checked state — only when not hovering */
.rating-stars .form_responses:not(:hover) input[type="radio"]:checked + label,
.rating-stars .form_responses:not(:hover) .form_response:has(input[type="radio"]:checked) ~ .form_response > label {
  background-color: var(--rs-star-gold);
}

/* Hover preview overrides */
.rating-stars .form_response:hover > label,
.rating-stars .form_response:hover ~ .form_response > label {
  background-color: var(--rs-star-gold);
}

/* Keyboard focus preview */
.rating-stars .form_response:focus-within > label,
.rating-stars .form_response:focus-within ~ .form_response > label {
  background-color: var(--rs-star-gold);
}

.rating-stars .form_response {
  display: inline-flex;
  align-items: center;
}
`;

  // Inject CSS into <head>
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // Determine which fields to target
  var exportsList = window.RATING_STARS_EXPORTS;
  var selector;
  if (Array.isArray(exportsList) && exportsList.length) {
    selector = exportsList.map(function(exp) {
      return '.form_question.form_radio[data-export="' + exp + '"]';
    }).join(',');
  } else {
    selector = '.form_question.form_radio';
  }

  // Apply .rating-stars to matching fields
  document.querySelectorAll(selector).forEach(function(el) {
    el.classList.add('rating-stars');
  });

})();
