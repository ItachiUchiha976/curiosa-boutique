/* ============================================================
   CURIOSA — Cabinet de Curiosités | app.js
   Cart localStorage · Mobile menu · FAQ · Capture email
   ============================================================ */

'use strict';

/* ── Storage key ── */
const CART_KEY = 'curiosa_cart';

/* ── Order bump : Carnet Cuir en case à cocher opt-in dans le panier (T2, 03/07/2026) ──
   Prix plein du carnet seul = 34 € (produit-carnet.html, id carnet-001).
   Bump = même carnet, même vraie photo, à 29 € SI ajouté depuis le panier — jamais pré-coché. */
const BUMP_ID    = 'carnet-bump-29';
const BUMP_NAME  = "Carnet Cuir Noir — Journal d'Explorateur";
const BUMP_PRICE = 29;
const FULL_CARNET_ID = 'carnet-001';

/* ── Promo code ── */
function getPromoCode() {
  try { return localStorage.getItem('bos_promo_code') || null; }
  catch { return null; }
}
const PROMO_DISCOUNT = 0.10; // -10% automatique sur le produit le plus cher

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
  /* BOS — Umami funnel event. Defensif, jamais bloquant. Ajout 02/07/2026. */
  try { if (window.umami && typeof umami.track === 'function') umami.track('add_to_cart', { produit: name, prix: Number(price || 0), boutique: 'curiosa-boutique' }); } catch (e) {}
  /* BOS — Pinterest tag (pintrk), consentement CNIL requis (bos-consent.js). Ajout 02/07/2026. */
  try { if (window.pintrk) window.pintrk('track', 'addtocart', { value: Number(price || 0), currency: 'EUR', order_quantity: 1 }); } catch (e) {}
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
            <p style="margin-bottom:1rem">Inscris-toi à la newsletter du Cabinet Curiosa pour être averti(e) en avant-première des nouvelles pièces.</p>
            <form class="capture-form w3-form" action="https://api.web3forms.com/submit" method="POST">
              <input type="hidden" name="access_key" value="d97a8c73-b827-48bb-b437-e053a73fdb7e">
              <input type="hidden" name="subject" value="Curiosa inscription newsletter">
              <input type="hidden" name="from_name" value="Curiosa">
              <input type="hidden" name="source" value="panier-vide">
              <input type="checkbox" name="botcheck" style="display:none !important" tabindex="-1" autocomplete="off">
              <input type="email" name="email" required placeholder="votre@email.fr" aria-label="Votre email">
              <button type="submit" class="btn-primary" style="white-space:nowrap">S'inscrire à la newsletter</button>
              <label class="capture-consent"><input type="checkbox" name="consent" required> J'accepte de recevoir les emails du Cabinet Curiosa (désinscription en 1 clic — <a href="cgv.html#rgpd">RGPD</a>).</label>
            </form>
            <p class="w3-msg capture-msg" style="color:var(--gold)">Merci ! Tu es inscrit(e) à la newsletter.</p>
          </div>
        </div>`;
      initCapture();
      return;
    }

    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    // -10% automatique sur le produit le plus cher (toujours actif)
    const maxPrice = cart.length > 0 ? Math.max(...cart.map(i => i.price)) : 0;
    const discount = maxPrice * PROMO_DISCOUNT;
    const total = subtotal - discount;
    const hasFullCarnet = cart.some(i => i.id === FULL_CARNET_ID);
    const bumpChecked   = cart.some(i => i.id === BUMP_ID);

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
        <td class="cart-item-price">${(item.price * item.qty).toFixed(2).replace('.', ',')} €</td>
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
        ${discount > 0 ? `
          <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:12px 16px;margin-bottom:8px;text-align:center">
            <span style="font-size:14px;color:#166534">🎉 -${(PROMO_DISCOUNT*100).toFixed(0)}% automatique sur le produit le + cher</span>
          </div>
          <h3 style="margin-bottom:0">
            <span style="text-decoration:line-through;color:#9ca3af;font-size:16px;margin-right:8px">${subtotal.toFixed(2).replace('.', ',')} €</span>
            <span style="color:#10b981">${total.toFixed(2).replace('.', ',')} €</span>
          </h3>
        ` : `
          <h3>Total : ${total.toFixed(2).replace('.', ',')} €</h3>
        `}
        <div class="checkout-stub">
          ${hasFullCarnet ? '' : `
          <div class="order-bump">
            <label class="order-bump__label">
              <input type="checkbox" id="bump-carnet-check" ${bumpChecked ? 'checked' : ''}>
              <span class="order-bump__img"><img src="img/carnet-real.jpg" alt="Carnet Cuir Noir — Journal d'Explorateur" loading="lazy"></span>
              <span class="order-bump__text">
                <strong>Complétez votre cabinet</strong> — ajoutez le Carnet Cuir Noir, Journal d'Explorateur (même vraie photo que sur sa fiche).
                <span class="order-bump__price">29&nbsp;€ ajouté à la commande <span class="order-bump__save">(34&nbsp;€ à l'unité — vous économisez 5&nbsp;€)</span></span>
                <span class="order-bump__note">Livraison offerte. Selon les stocks, vos articles peuvent être expédiés dans des colis séparés, chacun avec son numéro de suivi.</span>
              </span>
            </label>
          </div>`}
          <h3>Finaliser ma commande</h3>
          <p style="font-size:.88rem;color:var(--text2);margin-bottom:1rem">Paiement 100&nbsp;% sécurisé par PayPal — carte bancaire acceptée (pas besoin de compte PayPal). Livraison offerte · Satisfait ou remboursé 30 jours.</p>
          <label class="capture-consent"><input type="checkbox" id="cgv-check"> J'ai lu et j'accepte les <a href="cgv.html" target="_blank" rel="noopener">Conditions Générales de Vente</a>.</label>
          <button type="button" class="btn-checkout" onclick="bosPayPalCheckout()">Payer ma commande (PayPal · CB) →</button>
          <p class="checkout-note">Tu seras redirigé(e) vers PayPal pour finaliser le paiement en toute sécurité. Aucune donnée bancaire n'est stockée sur ce site.</p>
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

    // Order bump : case à cocher opt-in "Complétez votre cabinet" (jamais pré-cochée par défaut)
    const bumpCheck = wrapper.querySelector('#bump-carnet-check');
    if (bumpCheck) {
      bumpCheck.addEventListener('change', () => {
        if (bumpCheck.checked) {
          // Réutilise addToCart() : même toast + mêmes events Umami/pintrk 'addtocart' que les fiches produit.
          addToCart(BUMP_ID, BUMP_NAME, BUMP_PRICE, 1);
        } else {
          const cart = loadCart().filter(i => i.id !== BUMP_ID);
          saveCart(cart);
          refreshBadge();
        }
        renderCart();
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
          else showToast('Merci ! Tu es inscrit(e) à la newsletter.');
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

/* BOS — expose panier pour checkout PayPal cross-page (fix isolation cart multi-boutique, 01/07/2026) */
try { window.getCart = loadCart; window.BOS_CART_KEY = CART_KEY; } catch (e) {}
