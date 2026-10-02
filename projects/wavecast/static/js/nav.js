// Sticky nav: highlights the section currently in view.
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var nav = document.querySelector('.sidenav');
    if (!nav) return;

    var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
    var map = {};
    var sections = [];
    links.forEach(function (a) {
      var el = document.getElementById(a.getAttribute('href').slice(1));
      if (el) { map[el.id] = a; sections.push(el); }
    });
    if (!sections.length) return;

    function setCurrent(id) {
      links.forEach(function (a) {
        a.classList.toggle('is-current', a === map[id]);
      });
    }

    if (!('IntersectionObserver' in window)) return;

    // Treat a band near the top of the viewport as "the reading line":
    // whichever section covers it is the current one.
    var visible = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting; });
      var current = sections.filter(function (s) { return visible[s.id]; })[0];
      if (current) setCurrent(current.id);
    }, { rootMargin: '-15% 0px -70% 0px', threshold: 0 });

    sections.forEach(function (s) { io.observe(s); });
  });
})();
