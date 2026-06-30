/* ============================================================
   CURIOSA — Cabinet de Curiosités | app.js
   Cart localStorage · Mobile menu · FAQ · Capture email
   ============================================================ */

'use strict';

/* ── Storage key ── */
const CART_KEY = 'curiosa_cart';

/* ── Load cart ── */
function loadCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}

/* ── Save cart ── */
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/* ── Cart count badge ── */
function refreshBadge() {
  const cart = loadCart();
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? 'flex' : 'none';
  });
}

/* ── Add to cart ── */
function addToCart(id, name, price, qty = 1) {
  const cart = loadCart();
  const idx = cart.findIndex(i => i.id === id);
  if (idx >= 0) {
    cart[idx].qty += qty;
  } else {
    cart.push({ id, name, price, qty });
  }
  saveCart(cart);
  refreshBadge();
  showToast(`${name} ajouté au panier`);
}

/* ── Toast ── */
function showToast(msg) {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 3000);
}

/* ── Mobile menu ── */
function initMobileMenu() {
  const btn  = document.querySelector('.hamburger');
  const menu = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.mobile-menu__close');
  if (!btn || !menu) return;

  // Overlay
  let overlay = document.getElementById('menu-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'menu-overlay';
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
  }

  function openMenu() {
    menu.classList.add('open');
    overlay.classList.add('show');
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    menu.classList.remove('open');
    overlay.classList.remove('show');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);
}

/* ── FAQ accordion ── */
function initFaq() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* ── Add-to-cart buttons ── */
function initCartButtons() {
  document.querySelectorAll('[data-add-cart]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id    = btn.dataset.id;
      const name  = btn.dataset.name;
      const price = parseFloat(btn.dataset.price);
      if (id && name && price) addToCart(id, name, price);
    });
  });
}

/* ── Panier page ── */
function initCartPage() {
  const wrapper = document.getElementById('cart-wrapper');
  if (!wrapper) return;

  function renderCart() {
    const cart = loadCart();
    if (cart.length === 0) {
      wrapper.innerHTML = `
        <div class="cart-empty">
          <h2>Votre panier est vide</h2>
          <p style="margin-bottom:1.5rem">Découvrez notre cabinet de curiosités et trouvez l'objet qui traversera les siècles.</p>
          <div class="cart-empty__ctas">
            <a href="index.html" class="btn-primary">Voir le catalogue</a>
            <a href="https://www.youtube.com/@echosdupassefr" target="_blank" rel="noopener" class="btn-secondary-full" style="width:auto;display:inline-block">Échos du Passé ↗</a>
          </div>
          <div class="cart-empty__vip">
            <p style="margin-bottom:1rem"><strong>Le paiement ouvre bientôt.</strong> Rejoins la liste VIP : -10 % à l'ouverture + accès prioritaire.</p>
            <form class="capture-form w3-form" action="https://api.web3forms.com/submit" method="POST">
              <input type="hidden" name="access_key" value="d97a8c73-b827-48bb-b437-e053a73fdb7e">
              <input type="hidden" name="subject" value="Curiosa nouveau lead VIP">
              <input type="hidden" name="from_name" value="Curiosa">
              <input type="checkbox" name="botcheck" style="display:none !important" tabindex="-1" autocomplete="off">
              <input type="email" name="email" required placeholder="votre@email.fr" aria-label="Votre email">
              <button type="submit" class="btn-primary" style="white-space:nowrap">Rejoindre la liste VIP</button>
              <label class="capture-consent"><input type="checkbox" name="consent" required> J'accepte de recevoir les emails du Cabinet Curiosa (désinscription en 1 clic — <a href="cgv.html#rgpd">RGPD</a>).</label>
            </form>
            <p class="w3-msg capture-msg" style="color:var(--gold)">Merci ! Tu es sur la liste VIP.</p>
          </div>
        </div>`;
      initCapture();
      return;
    }

    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

    const rows = cart.map(item => `
      <tr>
        <td class="cart-item-name">${item.name}</td>
        <td>
          <div class="cart-qty">
            <button data-id="${item.id}" data-action="dec">-</button>
            <span>${item.qty}</span>
            <button data-id="${item.id}" data-action="inc">+</button>
          </div>
        </td>
        <td class="cart-item-price">${(item.price * item.qty).toFixed(2)} €</td>
        <td><button class="cart-remove" data-id="${item.id}" aria-label="Retirer">&#x2715;</button></td>
      </tr>`).join('');

    wrapper.innerHTML = `
      <div style="overflow-x:auto">
        <table class="cart-table">
          <thead><tr><th>Produit</th><th>Quantité</th><th>Prix</th><th></th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <div class="cart-total">
        <h3>Total : ${total.toFixed(2)} €</h3>
        <div class="checkout-stub">
          <h3>Accès prioritaire à l'ouverture</h3>
          <p style="font-size:.88rem;color:var(--text2);margin-bottom:1rem">Le paiement en ligne ouvre très bientôt. Laisse ton email pour rejoindre la <strong>liste VIP</strong> : tu seras prévenu(e) en priorité et tu recevras <strong>-10 %</strong> sur cette commande. <strong>0 € prélevé maintenant.</strong></p>
          <form id="checkout-form" action="https://api.web3forms.com/submit" method="POST">
            <input type="hidden" name="access_key" value="d97a8c73-b827-48bb-b437-e053a73fdb7e">
            <input type="hidden" name="subject" value="Curiosa réservation VIP panier">
            <input type="hidden" name="from_name" value="Curiosa">
            <input type="hidden" name="panier" id="cf-cart" value="">
            <input type="checkbox" name="botcheck" style="display:none !important" tabindex="-1" autocomplete="off">
            <div class="form-group">
              <label for="cf-name">Prénom *</label>
              <input type="text" name="prenom" id="cf-name" placeholder="Votre prénom" required>
            </div>
            <div class="form-group">
              <label for="cf-email">Email *</label>
              <input type="email" name="email" id="cf-email" placeholder="votre@email.fr" required>
            </div>
            <div class="form-group">
              <label for="cf-phone">Téléphone (optionnel)</label>
              <input type="tel" name="telephone" id="cf-phone" placeholder="06 XX XX XX XX">
            </div>
            <label class="capture-consent"><input type="checkbox" name="consent" required> J'accepte d'être contacté(e) par Curiosa à propos de l'ouverture des paiements (<a href="cgv.html#rgpd">RGPD</a>).</label>
            <button type="submit" class="btn-checkout">Rejoindre la liste VIP</button>
            <p class="checkout-note">Tes données servent uniquement à te contacter lors de l'ouverture des paiements. Aucune donnée n'est partagée avec des tiers. Désinscription en 1 clic.</p>
          </form>
          <div id="checkout-success" style="display:none;text-align:center;padding:1.5rem 0">
            <div style="font-size:2rem;margin-bottom:.5rem">✓</div>
            <h4 style="font-family:var(--font-serif);font-size:1.2rem;margin-bottom:.5rem">Tu es sur la liste VIP !</h4>
            <p style="font-size:.88rem;color:var(--text2);margin-bottom:1rem">On te contacte en priorité dès l'ouverture des paiements. En attendant, plonge dans l'Histoire avec Échos du Passé.</p>
            <a href="https://www.youtube.com/@echosdupassefr" target="_blank" rel="noopener" class="btn-primary" style="display:inline-block">S'abonner à Échos du Passé ↗</a>
          </div>
        </div>
      </div>`;

    // Qty controls
    wrapper.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const cart = loadCart();
        const idx = cart.findIndex(i => i.id === btn.dataset.id);
        if (idx < 0) return;
        if (btn.dataset.action === 'inc') cart[idx].qty++;
        if (btn.dataset.action === 'dec') {
          cart[idx].qty--;
          if (cart[idx].qty <= 0) cart.splice(idx, 1);
        }
        saveCart(cart);
        refreshBadge();
        renderCart();
      });
    });
    wrapper.querySelectorAll('.cart-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const cart = loadCart().filter(i => i.id !== btn.dataset.id);
        saveCart(cart);
        refreshBadge();
        renderCart();
      });
    });

    // Checkout form (réservation VIP via Web3Forms)
    const form = document.getElementById('checkout-form');
    if (form) {
      form.addEventListener('submit', async e => {
        e.preventDefault();
        if (typeof form.reportValidity === 'function' && !form.reportValidity()) return;
        // Récapitulatif panier envoyé avec le lead
        const cartNow = loadCart();
        const summary = cartNow.map(i => `${i.qty}x ${i.name} (${(i.price * i.qty).toFixed(2)} €)`).join(' | ');
        const cartField = document.getElementById('cf-cart');
        if (cartField) cartField.value = `${summary} — Total ${cartNow.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2)} €`;
        const btn = form.querySelector('button[type=submit]');
        const orig = btn ? btn.textContent : '';
        if (btn) { btn.disabled = true; btn.textContent = 'Envoi…'; }
        try {
          const res = await fetch(form.action, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: new FormData(form)
          });
          if (res.ok) {
            form.style.display = 'none';
            document.getElementById('checkout-success').style.display = 'block';
            saveCart([]);
            refreshBadge();
          } else {
            if (btn) { btn.disabled = false; btn.textContent = orig; }
            showToast('Une erreur est survenue, réessaie dans un instant.');
          }
        } catch {
          if (btn) { btn.disabled = false; btn.textContent = orig; }
          showToast('Erreur réseau — vérifie ta connexion et réessaie.');
        }
      });
    }
  }
  renderCart();
}

/* ── Email capture (Web3Forms AJAX) ── */
function initCapture() {
  document.querySelectorAll('form.w3-form').forEach(form => {
    if (form.dataset.bound) return;
    form.dataset.bound = '1';
    form.addEventListener('submit', async e => {
      e.preventDefault();
      // Validation native (email requis + consentement RGPD si présent)
      if (typeof form.reportValidity === 'function' && !form.reportValidity()) return;
      const btn = form.querySelector('button[type=submit]');
      const orig = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Envoi…'; }
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form)
        });
        if (res.ok) {
          const parent = form.parentElement;
          const msg = parent ? parent.querySelector('.w3-msg') : null;
          form.style.display = 'none';
          const consent = parent ? parent.querySelector('.capture-consent') : null;
          if (consent) consent.style.display = 'none';
          if (msg) { msg.style.display = 'block'; }
          else showToast('Merci ! Tu es sur la liste VIP.');
        } else {
          if (btn) { btn.disabled = false; btn.textContent = orig; }
          showToast('Une erreur est survenue, réessaie dans un instant.');
        }
      } catch {
        if (btn) { btn.disabled = false; btn.textContent = orig; }
        showToast('Erreur réseau — vérifie ta connexion et réessaie.');
      }
    });
  });
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  refreshBadge();
  initMobileMenu();
  initFaq();
  initCartButtons();
  initCartPage();
  initCapture();
});
