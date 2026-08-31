/**
 * Masonic Orders — Paths of Initiation
 * Renders the emblem icon set and draws the SVG prerequisite connectors.
 * Kept dependency-free so the logic maps 1:1 onto a future SvelteKit
 * onMount()/action — see README for the porting notes.
 */

const ICONS = {
  "square-compass": '<path d="M12 3l7 15H5z"/><path d="M8.2 13.5h7.6" stroke-dasharray="1 2.4"/><circle cx="12" cy="9" r="1" fill="currentColor" stroke="none"/>',
  "arch": '<path d="M5 20V12a7 7 0 0 1 14 0v8"/><path d="M5 20h14"/><path d="M9 20v-6a3 3 0 0 1 6 0v6"/>',
  "key": '<circle cx="8" cy="9" r="3.5"/><path d="M10.5 11.5 19 20"/><path d="M16 17l2-2"/><path d="M18.5 19.5l2-2"/>',
  "lantern": '<path d="M9 4h6l-1 3H10z"/><rect x="7" y="7" width="10" height="10" rx="3"/><path d="M12 17v3"/><path d="M9 21h6"/>',
  "rose-cross": '<path d="M12 3v18M4 12h16"/><circle cx="12" cy="12" r="3"/>',
  "triangle": '<path d="M12 4l8 15H4z"/><circle cx="12" cy="13" r="1.4" fill="currentColor" stroke="none"/>',
  "eagle": '<path d="M12 5v13"/><path d="M12 8c-3-3-6-3-9-1 2 3 5 4 9 3"/><path d="M12 8c3-3 6-3 9-1-2 3-5 4-9 3"/><path d="M9 18l3 2 3-2"/>',
  "celtic-cross": '<circle cx="12" cy="11" r="5.2"/><path d="M12 4v16M6 11h12"/>',
  "crown": '<path d="M4 9l3.5 3L12 6l4.5 6L20 9l-1.5 9h-13z"/><path d="M6.5 18h11"/>',
  "templar-cross": '<path d="M12 3l2 3-2 3-2-3z"/><path d="M12 21l2-3-2-3-2 3z"/><path d="M3 12l3-2 3 2-3 2z"/><path d="M21 12l-3-2-3 2 3 2z"/><circle cx="12" cy="12" r="2.4"/>',
  "red-cross": '<path d="M12 4v16M4 12h16" stroke-width="3"/>',
  "cluster": '<circle cx="12" cy="6.5" r="2"/><circle cx="6.5" cy="16" r="2"/><circle cx="17.5" cy="16" r="2"/><path d="M12 8.3 7.6 14M12 8.3l4.4 5.7M8.6 16h6.8"/>',
  "key-crown": '<path d="M5 15l3-8 3 8m-5-2.5h4"/><path d="M13 8h6l-1 7h-4z"/><path d="M15 8V6"/>',
  "star": '<path d="M12 3l2.4 5.7 6.1.5-4.6 4 1.4 6-5.3-3.3L6.7 19l1.4-6-4.6-4 6.1-.5z"/>',
  "ark": '<path d="M4 14h16l-2 5H6z"/><path d="M6 14V9h12v5"/><path d="M9 9V6h6v3"/><path d="M4 19q4 2 8 0t8 0" />',
  "cord": '<path d="M6 6c-3 3-3 7 0 10M18 6c3 3 3 7 0 10"/><path d="M6 6c3 3 9 3 12 0M6 16c3-3 9-3 12 0"/>',
  "wisdom": '<path d="M12 5c-2.5-1.5-5.5-1.5-8-.5v13c2.5-1 5.5-1 8 .5m0-13c2.5-1.5 5.5-1.5 8-.5v13c-2.5-1-5.5-1-8 .5m0-13v13"/>',
  "templar-priest": '<path d="M12 3l1.6 2.8L12 8.6l-1.6-2.8z"/><path d="M12 8.6v10.4"/><path d="M7 14h10"/><circle cx="12" cy="12.3" r="1.1" fill="currentColor" stroke="none"/>',
  "cross-shield": '<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M12 8v8M8.3 12h7.4"/>',
  "lamp": '<path d="M9 3h6l-.6 4.2a4 4 0 0 1-2.4 3.2v2.1"/><path d="M9 3a3 3 0 0 0 6 0"/><path d="M8 20h8"/><path d="M9.5 20a2.5 2.5 0 0 1 5 0"/>',
  "trowel": '<path d="M6 6l9 9-2.2 2.2a2.6 2.6 0 0 1-3.7 0l-3.3-3.3a2.6 2.6 0 0 1 0-3.7z"/><path d="M14.3 13.7 19 18"/>',
};

function renderIcons() {
  document.querySelectorAll(".node__icon[data-icon]").forEach((el) => {
    const name = el.getAttribute("data-icon");
    const body = ICONS[name];
    if (!body) return;
    el.innerHTML =
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ` +
      `stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
  });
}

/* ---------------------------------------------------------
   Connectors: read data-requires off each .node, draw a
   curved SVG path from each prerequisite's icon to this
   node's icon, positioned relative to the #diagram box.
--------------------------------------------------------- */

function buildEdges() {
  const edges = [];
  document.querySelectorAll(".node[data-requires]").forEach((node) => {
    const from = node.getAttribute("data-requires");
    from.trim().split(/\s+/).forEach((fromId) => {
      const source = document.getElementById(fromId);
      if (source) edges.push({ from: source, to: node });
    });
  });
  return edges;
}

function centerOf(el, container) {
  const r = el.querySelector(".node__icon")?.getBoundingClientRect() || el.getBoundingClientRect();
  const c = container.getBoundingClientRect();
  return { x: r.left + r.width / 2 - c.left, y: r.top + r.height / 2 - c.top };
}

function drawConnectors(edges) {
  const diagram = document.getElementById("diagram");
  const svg = document.getElementById("connectors");
  const rect = diagram.getBoundingClientRect();

  svg.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`);
  const style = getComputedStyle(document.documentElement);
  const orangeColor = style.getPropertyValue("--orange").trim() || "#e08a3c";
  const greenColor = style.getPropertyValue("--green").trim() || "#4caf7d";
  svg.innerHTML =
    '<defs>' +
    '<marker id="arrow-orange" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">' +
    `<path d="M0 0L10 5L0 10z" fill="${orangeColor}"/></marker>` +
    '<marker id="arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">' +
    `<path d="M0 0L10 5L0 10z" fill="${greenColor}"/></marker>` +
    '</defs>';

  edges.forEach(({ from, to }) => {
    const a = centerOf(from, diagram);
    const b = centerOf(to, diagram);
    const iconR = (to.querySelector(".node__icon")?.getBoundingClientRect().height || 62) / 2;
    const fromR = (from.querySelector(".node__icon")?.getBoundingClientRect().height || 62) / 2;

    const dx = b.x - a.x, dy = b.y - a.y;
    const dist = Math.hypot(dx, dy) || 1;
    const ux = dx / dist, uy = dy / dist;

    const start = { x: a.x + ux * fromR, y: a.y + uy * fromR };
    const end = { x: b.x - ux * iconR - 5, y: b.y - uy * iconR - 5 };

    // Control points pulled in toward the endpoints (35/65 split rather
    // than a symmetric 50/50) so the curve hugs a more direct line
    // instead of a wide, looping S — reads as a shorter connector.
    const cp1y = start.y + (end.y - start.y) * 0.35;
    const cp2y = start.y + (end.y - start.y) * 0.65;
    const faith = to.dataset.faith === "trinitarian" ? "green" : "orange";
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      `M ${start.x} ${start.y} C ${start.x} ${cp1y}, ${end.x} ${cp2y}, ${end.x} ${end.y}`
    );
    path.setAttribute("marker-end", `url(#arrow-${faith})`);
    path.classList.add(`line-${faith}`);
    path.dataset.from = from.id;
    path.dataset.to = to.id;
    svg.appendChild(path);
  });
}

function wireHover() {
  document.querySelectorAll(".node").forEach((node) => {
    if (!node.hasAttribute("tabindex")) node.tabIndex = 0;
    node.addEventListener("mouseenter", () => {
      node.classList.add("is-active");
      document
        .querySelectorAll(`.connectors path[data-from="${node.id}"], .connectors path[data-to="${node.id}"]`)
        .forEach((p) => p.classList.add("is-active"));
    });
    node.addEventListener("mouseleave", () => {
      node.classList.remove("is-active");
      document.querySelectorAll(".connectors path.is-active").forEach((p) => p.classList.remove("is-active"));
    });
  });
}

/* ---------------------------------------------------------
   Click-to-trace: clicking a node highlights its FULL chain —
   every prerequisite back down to Craft, and every order that
   in turn requires it — not just its immediate connector.
   Click the same node again (or press Escape) to clear.
--------------------------------------------------------- */

function wireTrace(edges) {
  const parentsOf = {};
  const childrenOf = {};
  edges.forEach(({ from, to }) => {
    (parentsOf[to.id] ||= []).push(from.id);
    (childrenOf[from.id] ||= []).push(to.id);
  });

  function collect(startId, map) {
    const seen = new Set([startId]);
    const stack = [startId];
    while (stack.length) {
      const id = stack.pop();
      (map[id] || []).forEach((next) => {
        if (!seen.has(next)) {
          seen.add(next);
          stack.push(next);
        }
      });
    }
    return seen;
  }

  function clearTrace() {
    document.querySelectorAll(".node.is-traced").forEach((n) => n.classList.remove("is-traced"));
    document.querySelectorAll(".connectors path.is-traced").forEach((p) => p.classList.remove("is-traced"));
    tracedRoot = null;
  }

  let tracedRoot = null;

  function traceNode(node) {
    if (tracedRoot === node.id) {
      clearTrace();
      return;
    }
    clearTrace();
    tracedRoot = node.id;

    const ancestors = collect(node.id, parentsOf);
    const descendants = collect(node.id, childrenOf);
    const chain = new Set([...ancestors, ...descendants]);

    chain.forEach((id) => document.getElementById(id)?.classList.add("is-traced"));
    document.querySelectorAll(".connectors path").forEach((p) => {
      if (chain.has(p.dataset.from) && chain.has(p.dataset.to)) p.classList.add("is-traced");
    });
  }

  document.querySelectorAll(".node").forEach((node) => {
    node.addEventListener("click", () => traceNode(node));
    node.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        traceNode(node);
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") clearTrace();
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".node")) clearTrace();
  });
}

/* ---------------------------------------------------------
   Real emblems: for each node, try to load a real logo image
   named after the node's own id (assets/logos/<id>.<ext>).
   If none exists, the inline line-icon rendered above stays
   as the fallback — nothing breaks if an order has no image yet.
--------------------------------------------------------- */

const LOGO_EXTENSIONS = ["png", "webp", "jpg", "jpeg", "svg"];

// Probing fallback for a node with no data-logo-ext (e.g. a newly added
// order whose image file hasn't been wired up in the HTML yet).
function tryLoadLogo(slug) {
  return new Promise((resolve) => {
    let i = 0;
    const attempt = () => {
      if (i >= LOGO_EXTENSIONS.length) return resolve(null);
      const ext = LOGO_EXTENSIONS[i++];
      const img = new Image();
      img.onload = () => resolve(`assets/logos/${slug}.${ext}`);
      img.onerror = attempt;
      img.src = `assets/logos/${slug}.${ext}`;
    };
    attempt();
  });
}

// Known extension (from data-logo-ext) loads in a single request, no probing.
function loadLogo(slug, ext) {
  return new Promise((resolve) => {
    const src = `assets/logos/${slug}.${ext}`;
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

async function upgradeLogos() {
  const nodes = Array.from(document.querySelectorAll(".node[id]"));
  await Promise.all(
    nodes.map(async (node) => {
      const iconEl = node.querySelector(".node__icon");
      if (!iconEl) return;
      const knownExt = node.getAttribute("data-logo-ext");
      const src = knownExt ? await loadLogo(node.id, knownExt) : await tryLoadLogo(node.id);
      if (!src) return;
      const img = document.createElement("img");
      img.src = src;
      img.alt = node.querySelector(".node__label")?.textContent.trim() || "";
      img.loading = "lazy";
      img.decoding = "async";
      img.className = "node__logo";
      iconEl.appendChild(img);
      iconEl.classList.add("has-logo");
    })
  );
}

/* ---------------------------------------------------------
   i18n: language switcher + text application. Translated
   labels have different lengths than English, which reflows
   node heights — every language switch re-runs fitDiagram()
   and drawConnectors() so the SVG lines stay pinned to the
   (now different) icon positions instead of going stale.
--------------------------------------------------------- */

const LANG_STORAGE_KEY = "lero-lang";

function getInitialLang() {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved && UI_STRINGS[saved]) return saved;
  } catch (e) {
    /* localStorage unavailable (private mode, etc.) — fall through */
  }
  return DEFAULT_LANG;
}

function buildLangSwitcher(onSelect) {
  const container = document.getElementById("lang-options");
  if (!container) return;
  container.innerHTML = "";
  LANGUAGES.forEach(({ code, label, flag }) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "lang-switch__btn";
    btn.dataset.lang = code;
    btn.title = label;
    btn.setAttribute("aria-label", label);
    btn.innerHTML = `<span aria-hidden="true">${flag}</span>`;
    btn.addEventListener("click", () => onSelect(code));
    container.appendChild(btn);
  });
}

function applyLanguage(lang, edges) {
  const strings = UI_STRINGS[lang] || UI_STRINGS[DEFAULT_LANG];
  const titles = NODE_TITLES[lang] || NODE_TITLES[DEFAULT_LANG];

  document.documentElement.lang = lang;
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch (e) {
    /* ignore write failures */
  }

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (strings[key] != null) el.textContent = strings[key];
  });

  // Visually-hidden a11y labels (e.g. the language switcher's group
  // name) — translated but never shown as text.
  document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    const key = el.getAttribute("data-i18n-attr");
    if (strings[key] != null) el.setAttribute("aria-label", strings[key]);
  });

  document.querySelectorAll(".node[id]").forEach((node) => {
    const label = node.querySelector(".node__label");
    const title = titles[node.id];
    if (!title) return;
    if (label) label.textContent = title;
    // Keep the logo's alt text in sync too, in case it already loaded
    // under a previous language.
    const logoImg = node.querySelector(".node__logo");
    if (logoImg) logoImg.alt = title;
  });

  document.querySelectorAll(".lang-switch__btn").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.lang === lang);
  });

  // Translated text reflows node sizes — re-fit and redraw so the
  // connectors stay aligned with the (possibly moved) icon centers.
  fitDiagram();
  drawConnectors(edges);
}

/* ---------------------------------------------------------
   Fit-to-viewport: the diagram is authored at one natural
   size, then uniformly scaled down (like a single image) so
   the whole hierarchy — nodes, curved connectors and all —
   is visible without scrolling, on desktop and mobile alike.
--------------------------------------------------------- */

function fitDiagram() {
  const wrap = document.getElementById("diagram-fit");
  const diagram = document.getElementById("diagram");

  diagram.style.transform = "none";
  const naturalWidth = diagram.scrollWidth;
  const naturalHeight = diagram.scrollHeight;

  const availableWidth = wrap.clientWidth;
  const heightBudget = window.innerHeight * 0.92;
  const MIN_SCALE = 0.55; // below this, labels get too small to read comfortably
  let scale = Math.min(1, availableWidth / naturalWidth, heightBudget / naturalHeight);

  if (scale < MIN_SCALE) {
    // Stop shrinking text further; let the diagram scroll horizontally
    // at a still-legible size instead of becoming illegible. Scale from
    // the left edge here, not the center, so flex-start alignment and
    // the transform agree on where the content actually starts.
    scale = MIN_SCALE;
    wrap.style.overflowX = "auto";
    wrap.style.justifyContent = "flex-start";
    diagram.style.transformOrigin = "top left";
  } else {
    wrap.style.overflowX = "hidden";
    wrap.style.justifyContent = "center";
    diagram.style.transformOrigin = "top center";
  }

  diagram.style.transform = `scale(${scale})`;
  wrap.style.height = `${naturalHeight * scale}px`;
}

function init() {
  renderIcons();
  const edges = buildEdges();
  drawConnectors(edges);
  wireHover();
  wireTrace(edges);
  upgradeLogos().then(() => {
    fitDiagram();
    drawConnectors(edges);
  });

  buildLangSwitcher((lang) => applyLanguage(lang, edges));
  applyLanguage(getInitialLang(), edges);

  fitDiagram();
  drawConnectors(edges);

  let raf;
  window.addEventListener("resize", () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      fitDiagram();
      drawConnectors(edges);
    });
  });

  document.fonts?.ready?.then(() => {
    fitDiagram();
    drawConnectors(edges);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
