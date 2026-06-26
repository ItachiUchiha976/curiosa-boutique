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
          <p style="margin-bottom:2rem">Découvrez notre cabinet de curiosités et trouvez l'objet qui traversera les siècles.</p>
          <a href="index.html" class="btn-primary">Voir le catalogue</a>
        </div>`;
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
          <h3>Finaliser ma commande</h3>
          <p style="font-size:.88rem;color:var(--text2);margin-bottom:1rem">Laissez vos coordonnées — nous vous contactons dès que le paiement en ligne est activé (bientôt). <strong>0€ prélevé maintenant.</strong></p>
          <form id="checkout-form" novalidate>
            <div class="form-group">
              <label for="cf-name">Prénom *</label>
              <input type="text" id="cf-name" placeholder="Votre prénom" required>
            </div>
            <div class="form-group">
              <label for="cf-email">Email *</label>
              <input type="email" id="cf-email" placeholder="votre@email.fr" required>
            </div>
            <div class="form-group">
              <label for="cf-phone">Téléphone (optionnel)</label>
              <input type="tel" id="cf-phone" placeholder="06 XX XX XX XX">
            </div>
            <button type="submit" class="btn-checkout">Réserver ma commande</button>
            <p class="checkout-note">Vos données sont utilisées uniquement pour vous contacter lors de l'ouverture des paiements. Aucune donnée n'est partagée avec des tiers.</p>
          </form>
          <div id="checkout-success" style="display:none;text-align:center;padding:1.5rem 0">
            <div style="font-size:2rem;margin-bottom:.5rem">✓</div>
            <h4 style="font-family:var(--font-serif);font-size:1.2rem;margin-bottom:.5rem">Réservation enregistrée !</h4>
            <p style="font-size:.88rem;color:var(--text2)">On vous contacte dès que le paiement est activé. En attendant, explorez Échos du Passé pour plonger dans l'Histoire.</p>
            <a href="https://www.youtube.com/@echosdupassefr" target="_blank" rel="noopener" class="btn-primary" style="margin-top:1rem;display:inline-block">Voir la chaîne YouTube</a>
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

    // Checkout form
    const form = document.getElementById('checkout-form');
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const name  = document.getElementById('cf-name').value.trim();
        const email = document.getElementById('cf-email').value.trim();
        if (!name || !email) { showToast('Merci de remplir votre prénom et email.'); return; }
        // Save to localStorage
        const orders = JSON.parse(localStorage.getItem('curiosa_orders') || '[]');
        orders.push({ name, email, cart: loadCart(), date: new Date().toISOString() });
        localStorage.setItem('curiosa_orders', JSON.stringify(orders));
        form.style.display = 'none';
        document.getElementById('checkout-success').style.display = 'block';
        // Clear cart
        saveCart([]);
        refreshBadge();
      });
    }
  }
  renderCart();
}

/* ── Email capture ── */
function initCapture() {
  const form = document.getElementById('capture-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = form.querySelector('input[type=email]').value.trim();
    if (!email) return;
    const subs = JSON.parse(localStorage.getItem('curiosa_subs') || '[]');
    subs.push({ email, date: new Date().toISOString() });
    localStorage.setItem('curiosa_subs', JSON.stringify(subs));
    const msg = document.getElementById('capture-msg');
    if (msg) { msg.style.display = 'block'; }
    form.reset();
    showToast('Bienvenue dans le Cabinet ! Vérifiez votre email.');
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
