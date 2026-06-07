(function () {
  var root = document.documentElement;
  var params = new URLSearchParams(location.search);
  var forced = params.get('mode');
  var embedded = params.get('embed') === '1';
  var initial = forced || (embedded ? 'paper' : (localStorage.getItem('pli-mode') || 'paper'));

  function apply(m) {
    root.setAttribute('data-mode', m);
    if (!embedded && !forced) localStorage.setItem('pli-mode', m);
    document.querySelectorAll('[data-mode-toggle]').forEach(function (b) {
      b.setAttribute('data-current', m);
    });
  }
  apply(initial);

  window.__setMode = apply;
  window.__toggleMode = function () {
    apply(root.getAttribute('data-mode') === 'dark' ? 'paper' : 'dark');
  };

  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-mode-toggle]')) window.__toggleMode();
  });

  window.addEventListener('message', function (e) {
    if (e.data && e.data.type === 'pli-set-mode') apply(e.data.mode);
  });

  if (embedded) {
    root.setAttribute('data-embed', '1');
  }
})();
