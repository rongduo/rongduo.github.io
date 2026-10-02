// Card switcher for the methodology section.
// Progressive enhancement: without JS every panel stays visible and the page
// simply reads as a sequence of subsections.
(function () {
  function init(root) {
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
    var panels = tabs.map(function (t) {
      return document.getElementById(t.getAttribute('aria-controls'));
    });

    function select(i, focus) {
      tabs.forEach(function (t, k) {
        var on = k === i;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        t.classList.toggle('is-active', on);
        if (panels[k]) panels[k].hidden = !on;
      });
      if (focus) tabs[i].focus();
    }

    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(i); });
      t.addEventListener('keydown', function (e) {
        var d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (d) {
          e.preventDefault();
          select((i + d + tabs.length) % tabs.length, true);
        } else if (e.key === 'Home') {
          e.preventDefault(); select(0, true);
        } else if (e.key === 'End') {
          e.preventDefault(); select(tabs.length - 1, true);
        }
      });
    });

    select(0);
  }

  document.addEventListener('DOMContentLoaded', function () {
    Array.prototype.forEach.call(document.querySelectorAll('[data-cards]'), init);
  });
})();
