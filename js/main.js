/* ==========================================================
   NUDEBLOCK shop — shared script
   ========================================================== */

/* ---------- product data (single item for now) ---------- */
const PRODUCTS = [
  {
    id: "cover-me-tee-black",
    name: "Cover Me Tee_Black",
    sub: "나한테 올려 / 커버해",
    price: 39000,
    cate: ["new", "26fw", "top"],
    soldOut: true,
    sizes: ["S", "M", "L", "XL"],
    images: [
      "assets/product/front.jpg",
      "assets/product/back.jpg",
      "assets/product/d-front.jpg",
      "assets/product/d-back.jpg",
      "assets/product/d-neck.jpg",
      "assets/product/d-sleeve.jpg",
    ],
    hoverImage: "assets/product/back.jpg",
    detailImages: [
      { src: "assets/product/tee-front-back.webp", alt: "Cover Me Tee_Black 앞면과 뒷면 전체", width: 1536, height: 1024 },
      { src: "assets/product/tee-detail.webp", alt: "Cover Me Tee_Black 앞뒤 프린트, 넥밴드와 소매 마감 상세", width: 1086, height: 1448 },
    ],
  },
];

const CATEGORIES = [
  ["new", "NEW"],
  ["26fw", "26FW"],
  ["outer", "Outer"],
  ["top", "Top"],
  ["bottom", "Bottom"],
  ["acc", "Acc"],
  ["sale", "Sale"],
];

const won = (n) => n.toLocaleString("ko-KR") + "원";
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const params = new URLSearchParams(location.search);

/* ---------- cart storage (browser only) ---------- */
const CART_KEY = "nudeblock_cart";
const Cart = {
  get() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; }
  },
  set(items) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch {}
    updateCartCount();
  },
  add(lines) {
    const items = Cart.get();
    lines.forEach((l) => {
      const hit = items.find((i) => i.id === l.id && i.size === l.size);
      if (hit) hit.qty += l.qty; else items.push({ ...l });
    });
    Cart.set(items);
  },
  count() { return Cart.get().reduce((a, b) => a + b.qty, 0); },
};

/* ---------- header / footer ---------- */
const ICON_SEARCH = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="7" cy="7" r="5.3"/><path d="M11 11l4 4"/></svg>';
const ICON_IG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"/></svg>';

function renderHeader() {
  const cur = params.get("cate");
  const cateHtml = CATEGORIES.map(([k, v]) =>
    `<a href="shop.html?cate=${k}"${cur === k ? ' class="on"' : ""}>${v}</a>`).join("");

  const header = document.createElement("div");
  header.id = "header";
  header.innerHTML = `
    <div class="inner">
      <button class="menu-open" aria-label="메뉴 열기"><span></span><span></span><span></span></button>
      <nav class="gnb-left">
        <a href="about.html">ABOUT</a>
        <a href="shop.html">COLLECTION</a>
        <a href="about.html#stockist">STOCKIST</a>
        <a href="about.html#community">COMMUNITY</a>
      </nav>
      <h1 class="logo"><a href="index.html">nudeblock</a></h1>
      <nav class="gnb-right">
        <a href="#" data-soon>LOGIN</a>
        <a href="#" data-soon>MY PAGE</a>
        <a href="cart.html">CART<span class="cart-count"></span></a>
        <button class="search-btn" aria-label="검색">${ICON_SEARCH}</button>
      </nav>
      <a href="cart.html" class="m-cart">CART<span class="cart-count"></span></a>
      <nav class="cate">${cateHtml}</nav>
    </div>`;
  document.body.prepend(header);

  // mobile slide menu
  const side = document.createElement("div");
  side.innerHTML = `
    <div class="side-dim"></div>
    <aside class="side-menu" aria-label="메뉴">
      <button class="close" aria-label="닫기">&times;</button>
      <div class="member"><a href="#" data-soon>LOGIN</a><a href="#" data-soon>MY PAGE</a><a href="cart.html">CART<span class="cart-count"></span></a></div>
      <div class="group">${CATEGORIES.map(([k, v]) => `<a href="shop.html?cate=${k}">${v}</a>`).join("")}</div>
      <div class="group">
        <a href="about.html">ABOUT</a><a href="shop.html">COLLECTION</a>
        <a href="about.html#stockist">STOCKIST</a><a href="about.html#community">COMMUNITY</a>
      </div>
    </aside>`;
  document.body.append(...side.children);

  const html = document.documentElement;
  $(".menu-open").addEventListener("click", () => html.classList.add("side-open"));
  $(".side-dim").addEventListener("click", () => html.classList.remove("side-open"));
  $(".side-menu .close").addEventListener("click", () => html.classList.remove("side-open"));

  // search layer
  const layer = document.createElement("div");
  layer.className = "search-layer";
  layer.innerHTML = `<button class="close" aria-label="닫기">&times;</button>
    <form action="shop.html"><input name="q" placeholder="Search" autocomplete="off"><button aria-label="검색">${ICON_SEARCH}</button></form>`;
  document.body.append(layer);
  $(".search-btn").addEventListener("click", () => { layer.classList.add("open"); setTimeout(() => $("input", layer).focus(), 50); });
  $(".close", layer).addEventListener("click", () => layer.classList.remove("open"));

  // header bg on scroll
  const onScroll = () => {
    header.classList.toggle("scrolled", scrollY > 40);
    $(".to-top")?.classList.toggle("show", scrollY > 500);
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function renderFooter() {
  const f = document.createElement("footer");
  f.id = "footer";
  f.innerHTML = `
    <a href="#" class="sns" aria-label="instagram">${ICON_IG}</a>
    <div class="f-links">
      <a href="index.html">home</a><a href="#" data-soon>shop guide</a><a href="#" data-soon>terms of use</a>
      <a href="#" data-soon>privacy policy</a><a href="#" data-soon>instagram</a>
    </div>
    <div class="cs">
      <h4>ONLINE CUSTOMER SERVICE</h4>
      <div class="tel">010-0000-0000</div>
      <p>고객센터 운영시간 MON-FRI AM 11:00 ~ PM 18:00<br>
      입금계좌 은행명 000000-00-000000 (예금주)<br>
      contact@nudeblock.kr</p>
    </div>
    <p class="addr">(00000) Address line, Seoul<br>CEO &amp; CPO : 대표자명 · TEL : 010-0000-0000</p>
    <div class="biz">
      company <span>상호명</span> owner <span>대표자</span> business no <span>000-00-00000</span>
      mail-order no <span>제0000-서울-0000호</span><br>
      copyright © nudeblock. all rights reserved.
    </div>`;
  document.body.append(f);

  const top = document.createElement("button");
  top.className = "to-top";
  top.setAttribute("aria-label", "맨 위로");
  top.textContent = "N";
  top.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
  document.body.append(top);
}

function updateCartCount() {
  const n = Cart.count();
  $$(".cart-count").forEach((el) => (el.textContent = n ? `(${n})` : ""));
}

/* ---------- toast ---------- */
let toastTimer;
function toast(html) {
  let t = $(".toast");
  if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.append(t); }
  t.innerHTML = html;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}
document.addEventListener("click", (e) => {
  const a = e.target.closest("[data-soon]");
  if (a) { e.preventDefault(); toast("준비 중인 페이지입니다."); }
});

/* ==========================================================
   PAGES
   ========================================================== */
function initHero() {
  const slides = $$(".hero .slide");
  const dots = $(".hero-dots");
  const credit = $(".hero-credit");
  if (!slides.length) return;
  let i = 0, timer;
  dots.innerHTML = slides.map((_, k) => `<button aria-label="slide ${k + 1}"></button>`).join("");
  const go = (n) => {
    slides[i].classList.remove("on"); dots.children[i].classList.remove("on");
    i = (n + slides.length) % slides.length;
    slides[i].classList.add("on"); dots.children[i].classList.add("on");
    if (credit) credit.textContent = slides[i].dataset.credit || "";
    clearInterval(timer); timer = setInterval(() => go(i + 1), 6000);
  };
  [...dots.children].forEach((d, k) => d.addEventListener("click", () => go(k)));
  slides[0].classList.add("on");
  go(0);
}

function initList() {
  const list = $(".prd-list");
  if (!list) return;
  const cate = params.get("cate");
  const q = (params.get("q") || "").trim().toLowerCase();
  const title = $(".page-title");
  const label = CATEGORIES.find(([k]) => k === cate)?.[1];
  if (title) title.textContent = q ? `SEARCH : ${params.get("q")}` : label || "ALL";
  if (q) $("input", $(".search-layer")).value = params.get("q");

  const items = PRODUCTS.filter((p) =>
    (!cate || p.cate.includes(cate)) &&
    (!q || (p.name + " " + p.sub).toLowerCase().includes(q)));

  list.innerHTML = items.length
    ? items.map((p) => `
      <li class="prd-item">
        <a href="product.html?id=${p.id}">
          <div class="thumb">
            <img src="${p.images[0]}" alt="${p.name}">
            <img class="hover" src="${p.hoverImage}" alt="" loading="lazy">
          </div>
          <p class="name">${p.name}</p>
          <p class="price">${won(p.price)}</p>
          ${p.soldOut ? `<span class="badge">SOLD OUT</span>` : p.badge ? `<span class="badge">${p.badge}</span>` : ""}
        </a>
      </li>`).join("")
    : `<li class="empty">등록된 상품이 없습니다.</li>`;
}

function initDetail() {
  const root = $(".detail");
  if (!root) return;
  const p = PRODUCTS.find((x) => x.id === params.get("id")) || PRODUCTS[0];
  document.title = `${p.name} - nudeblock`;

  const story = $(".product-story");
  if (story) {
    story.innerHTML = (p.detailImages || []).map((photo) =>
      `<img src="${photo.src}" alt="${photo.alt}" width="${photo.width}" height="${photo.height}" loading="lazy" decoding="async">`
    ).join("");
    story.hidden = !p.detailImages?.length;
  }

  // gallery
  const view = $(".view", root);
  view.innerHTML = p.images.map((src, k) => `<img src="${src}" alt="${p.name} ${k + 1}"${k === 0 ? ' class="on"' : ""}>`).join("");
  const thumbs = $(".thumbs", root);
  thumbs.innerHTML = p.images.map((src, k) => `<button${k === 0 ? ' class="on"' : ""} aria-label="이미지 ${k + 1}"><img src="${src}" alt="" loading="lazy"></button>`).join("");
  const imgs = $$("img", view), tbs = $$("button", thumbs), count = $(".gal-count", root);
  let cur = 0;
  const show = (n) => {
    imgs[cur].classList.remove("on"); tbs[cur].classList.remove("on");
    cur = (n + imgs.length) % imgs.length;
    imgs[cur].classList.add("on"); tbs[cur].classList.add("on");
    count.textContent = `${cur + 1} / ${imgs.length}`;
  };
  tbs.forEach((b, k) => b.addEventListener("click", () => show(k)));
  $(".gal-arrow.prev", root).addEventListener("click", () => show(cur - 1));
  $(".gal-arrow.next", root).addEventListener("click", () => show(cur + 1));
  // swipe
  let sx = null;
  view.addEventListener("touchstart", (e) => (sx = e.touches[0].clientX), { passive: true });
  view.addEventListener("touchend", (e) => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 40) show(cur + (dx < 0 ? 1 : -1));
    sx = null;
  });
  show(0);

  // info
  $(".js-name", root).textContent = p.name;
  $(".js-sub", root).textContent = p.sub;
  $(".js-price", root).textContent = won(p.price);

  // options
  const sel = $(".opt-select select", root);
  sel.innerHTML = `<option value="">- [필수] 옵션을 선택해 주세요 -</option><option disabled>-------------------</option>` +
    p.sizes.map((s) => p.soldOut
      ? `<option value="${s}" disabled>${s} [품절]</option>`
      : `<option value="${s}">${s}</option>`).join("");
  if (p.soldOut) {
    root.classList.add("is-soldout");
    $(".buy-btns", root).innerHTML = `<p class="soldout-label">SOLD OUT</p>`;
    $(".price-row", root).insertAdjacentHTML("beforeend",
      `<button class="restock" type="button">재입고 알림 신청</button>`);
    $(".restock", root).addEventListener("click", () => toast("재입고 알림 기능은 준비 중입니다."));
  }
  const picked = [];
  const listEl = $(".selected-list", root);
  const totalEl = $(".total", root);
  const render = () => {
    listEl.innerHTML = picked.map((l, k) => `
      <li data-k="${k}">
        <span>${p.name}<br><span style="color:var(--muted)">- ${l.size}</span></span>
        <span class="qty"><button data-d="-1" aria-label="수량 감소">−</button><input value="${l.qty}" inputmode="numeric" aria-label="수량"><button data-d="1" aria-label="수량 증가">+</button></span>
        <span>${won(p.price * l.qty)}</span>
        <button class="del" aria-label="삭제">×</button>
      </li>`).join("");
    const qty = picked.reduce((a, b) => a + b.qty, 0);
    totalEl.innerHTML = `Total - ${won(p.price * qty)} <span>(${qty}개)</span>`;
  };
  sel.addEventListener("change", () => {
    const s = sel.value;
    if (!s) return;
    const hit = picked.find((l) => l.size === s);
    if (hit) toast("이미 선택된 옵션입니다."); else picked.push({ size: s, qty: 1 });
    sel.value = "";
    render();
  });
  listEl.addEventListener("click", (e) => {
    const li = e.target.closest("li"); if (!li) return;
    const l = picked[li.dataset.k];
    if (e.target.closest(".del")) picked.splice(li.dataset.k, 1);
    else if (e.target.dataset.d) l.qty = Math.max(1, l.qty + Number(e.target.dataset.d));
    else return;
    render();
  });
  listEl.addEventListener("change", (e) => {
    const li = e.target.closest("li"); if (!li) return;
    picked[li.dataset.k].qty = Math.max(1, parseInt(e.target.value, 10) || 1);
    render();
  });
  render();

  const toCart = () => {
    if (!picked.length) { toast("필수 옵션을 선택해 주세요."); return false; }
    Cart.add(picked.map((l) => ({ id: p.id, size: l.size, qty: l.qty })));
    picked.length = 0; render();
    return true;
  };
  $(".js-cart", root)?.addEventListener("click", () => {
    if (toCart()) toast('장바구니에 담았습니다.<a href="cart.html">CART</a>');
  });
  $(".js-buy", root)?.addEventListener("click", () => { if (toCart()) location.href = "cart.html"; });

  // accordions
  $$(".acc-item > button", root).forEach((b) => b.addEventListener("click", () => b.parentElement.classList.toggle("open")));
}

function initCart() {
  const wrap = $(".cart-wrap");
  if (!wrap) return;
  const render = () => {
    const items = Cart.get();
    if (!items.length) {
      wrap.innerHTML = `<div class="cart-empty">장바구니가 비어 있습니다.</div>
        <div class="cart-btns"><a class="btn line" href="shop.html">CONTINUE SHOPPING</a></div>`;
      return;
    }
    let sum = 0;
    const rows = items.map((it, k) => {
      const p = PRODUCTS.find((x) => x.id === it.id);
      if (!p) return "";
      sum += p.price * it.qty;
      return `<tr data-k="${k}">
        <td class="prd"><a class="prd-cell" href="product.html?id=${p.id}"><img src="${p.images[0]}" alt=""><span>${p.name}<div class="opt">[옵션: ${it.size}]</div></span></a></td>
        <td class="hide-m">${won(p.price)}</td>
        <td><span class="qty"><button data-d="-1" aria-label="수량 감소">−</button><input value="${it.qty}" readonly aria-label="수량"><button data-d="1" aria-label="수량 증가">+</button></span></td>
        <td>${won(p.price * it.qty)}</td>
        <td><button class="del" aria-label="삭제" style="color:var(--muted);font-size:16px">×</button></td>
      </tr>`;
    }).join("");
    const ship = sum >= 50000 ? 0 : 3000;
    wrap.innerHTML = `
      <table class="cart-table">
        <thead><tr><th>상품정보</th><th class="hide-m">판매가</th><th>수량</th><th>합계</th><th></th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="cart-sum">
        <span>상품금액 ${won(sum)}</span>
        <span>배송비 ${ship ? won(ship) : "무료"}</span>
        <strong>결제예정금액 ${won(sum + ship)}</strong>
      </div>
      <div class="cart-btns">
        <a class="btn line" href="shop.html">CONTINUE SHOPPING</a>
        <button class="btn fill js-order">ORDER</button>
      </div>`;
    $(".js-order", wrap).addEventListener("click", () => toast("결제 기능은 준비 중입니다."));
  };
  wrap.addEventListener("click", (e) => {
    const tr = e.target.closest("tr[data-k]"); if (!tr) return;
    const items = Cart.get(); const it = items[tr.dataset.k];
    if (e.target.closest(".del")) items.splice(tr.dataset.k, 1);
    else if (e.target.dataset.d) it.qty = Math.max(1, it.qty + Number(e.target.dataset.d));
    else return;
    Cart.set(items); render();
  });
  render();
}

/* ---------- boot ---------- */
renderHeader();
renderFooter();
updateCartCount();
initHero();
initList();
initDetail();
initCart();
