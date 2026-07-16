/* ============================================================
   BOS reveal au scroll — 16/07/2026
   Auto-applique un fade-up discret aux blocs cles, sans flash :
   les elements deja visibles au chargement sont reveles
   immediatement (aucune frame masquee). Respecte reduced-motion.
   Reutilisable tel quel sur les 5 boutiques (selecteurs communs).
   ============================================================ */
(function () {
  try {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    var selectors = [
      '.product-card', '.bundle-card', '.trust-item',
      '.section-title', '.section-label', '.section-sub',
      '#reassurance .container > div > div',
      '.story-text > *', '.story-img',
      '.capture > .container > *', '.vip-strip__inner'
    ];

    var seen = [];
    selectors.forEach(function (sel) {
      var nodes = document.querySelectorAll(sel);
      for (var i = 0; i < nodes.length; i++) {
        var el = nodes[i];
        if (!el.hasAttribute('data-reveal')) {
          el.setAttribute('data-reveal', '');
          seen.push(el);
        }
      }
    });

    /* Decalage en cascade a l'interieur des grilles */
    ['.product-grid', '.bundle-cards', '.trust-bar__inner'].forEach(function (gSel) {
      var grids = document.querySelectorAll(gSel);
      for (var g = 0; g < grids.length; g++) {
        var kids = grids[g].children;
        for (var k = 0; k < kids.length; k++) {
          if (kids[k].hasAttribute('data-reveal')) {
            kids[k].setAttribute('data-reveal-delay', String((k % 3) + 1));
          }
        }
      }
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    /* Meme pass synchrone : les elements au-dessus de la ligne de flottaison
       recoivent 'is-in' avant tout repaint => aucun flash masque->visible. */
    var vh = window.innerHeight || document.documentElement.clientHeight;
    seen.forEach(function (el) {
      var top = el.getBoundingClientRect().top;
      if (top < vh * 0.88) { el.classList.add('is-in'); }
      io.observe(el);
    });
  } catch (err) { /* en cas d'erreur, on laisse le contenu visible (CSS reduced-motion non atteint : fail-safe) */
    document.querySelectorAll('[data-reveal]').forEach(function (el) { el.classList.add('is-in'); });
  }
})();
