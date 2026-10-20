/* OWC-DESAL cross-section engine + studio-grade motion physics + sliding-card word subtitle.
   Every dynamic value is a pure function of scene-local time (100% seek-safe). */
(function () {
  if (window.OWC) return;
  const NS = "http://www.w3.org/2000/svg";
  const C = {
    bg: "#0A0E14", line: "#E8EEF4", sea: "#2B78B8", seaTop: "#4E9BDB", energy: "#FF9F1C",
    hot: "#FFD23F", air: "#9BEAFF", fresh: "#5CC8FF", brine: "#8FA89A",
    concrete: "#18212D", earth: "#0F151D", panel: "#121A26",
  };
  const MWL = 600, LIP = 700, FLOOR = 790, TX = 690, TY = 210, LAND = 500;
  const K = (2 * Math.PI) / 700;
  const WN = (2 * Math.PI) / 6;
  const WMAX = 380, V0 = 25, H = 1 / 120;
  const seabedY = (x) => 980 - (x / 560) * 190;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const smooth = (e) => (e <= 0 ? 0 : e >= 1 ? 1 : e * e * (3 - 2 * e));
  const eis = (e) => (e <= 0 ? 0 : e >= 1 ? 1 : -(Math.cos(Math.PI * e) - 1) / 2);
  const ramp = (t, a, b) => smooth((t - a) / (b - a));
  const frac = (x) => x - Math.floor(x);

  // ---- Studio-Grade Measured Eases & Deterministic Spring Solver (motionmaxxing + Emil Kowalski) ----
  const ease = {
    softLand: (u) => { const x = clamp(u, 0, 1); return 1 - Math.pow(1 - x, 3.4); },
    snapSettle: (u) => {
      const x = clamp(u, 0, 1);
      if (x === 0 || x === 1) return x;
      return 1 - Math.exp(-6.5 * x) * Math.cos(4.2 * x);
    },
    accelExit: (u) => { const x = clamp(u, 0, 1); return Math.pow(x, 2.4); },
    silkInOut: (u) => { const x = clamp(u, 0, 1); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; },
  };

  function spring(u, omega = 14, zeta = 0.82) {
    const t = clamp(u, 0, 1);
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    const wd = omega * Math.sqrt(Math.max(0.001, 1 - zeta * zeta));
    const env = Math.exp(-zeta * omega * t);
    const raw = 1 - env * (Math.cos(wd * t) + (zeta * omega / wd) * Math.sin(wd * t));
    const endEnv = Math.exp(-zeta * omega);
    const endRaw = 1 - endEnv * (Math.cos(wd) + (zeta * omega / wd) * Math.sin(wd));
    return raw / (endRaw || 1);
  }

  function rng(seed) {
    let s = seed >>> 0;
    return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  }

  // ---- wave plans per scene (phase φ, amplitude A); level L = MWL - A·sin φ ----
  const plans = {
    2: { dur: 25, phi: (t) => (2 * Math.PI * t) / 5 - 1.5 * Math.PI, A: (t) => 4 + 14 * ramp(t, 19, 25) },
    3: {
      dur: 18,
      phi: (t) => (t < 3 ? -Math.PI / 2 - Math.PI * (1 - t / 3) ** 2 : -Math.PI / 2 + Math.PI * eis((t - 3) / 14.5)),
      A: (t) => (t < 3 ? 18 + 42 * smooth(t / 3) : 60),
    },
    4: {
      dur: 22,
      phi: (t) =>
        t < 1.5 ? Math.PI / 2
        : t < 12 ? Math.PI / 2 + Math.PI * eis((t - 1.5) / 9)
        : 1.5 * Math.PI + WN * (t - 12) - WN * 1.2 * (1 - Math.exp(-(t - 12) / 1.2)),
      A: () => 60,
    },
  };
  const P4END = plans[4].phi(plans[4].dur);
  plans[5] = { dur: 30, phi: (t) => P4END + WN * t, A: () => 60 };
  plans[7] = { dur: 26, phi: (t) => plans[5].phi(30) + WN * t, A: () => 60 };
  plans[8] = { dur: 24, phi: (t) => plans[7].phi(26) + WN * t, A: (t) => 60 * (1 - 0.85 * ramp(t, 2, 10)) };
  plans[6] = { dur: 15, phi: (t) => plans[8].phi(24) + WN * t, A: () => 9 };
  const previous = { 3: 2, 4: 3, 5: 4, 7: 5, 8: 7, 6: 8 };
  const offsets = { 2: 0, 3: 25, 4: 43, 5: 65, 7: 95, 8: 121, 6: 145 };
  const level = (p, t) => MWL - p.A(t) * Math.sin(p.phi(t));

  const simCache = {};
  function sim(n) {
    if (simCache[n]) return simCache[n];
    const p = plans[n];
    const N = Math.ceil(p.dur / H) + 2;
    const L = new Float32Array(N), V = new Float32Array(N), W = new Float32Array(N);
    const TH = new Float32Array(N), D = new Float32Array(N), E = new Float32Array(N);
    const prev = previous[n] ? sim(previous[n]) : null;
    let w = prev ? look(prev.W, prev.p.dur) : 0;
    let th = prev ? look(prev.TH, prev.p.dur) % 45 : 0;
    let d = prev ? look(prev.D, prev.p.dur) : 0, e = prev ? look(prev.E, prev.p.dur) : 0;
    for (let i = 0; i < N; i++) {
      const t = i * H;
      const v = -(level(p, t + H / 2) - level(p, t - H / 2)) / H;
      const target = WMAX * Math.tanh(Math.abs(v) / V0);
      if (i > 0 || !prev) {
        w += ((target - w) * H) / (target > w ? 1.0 : 3.2);
        th += w * H; d += v * H; e += w * H;
      }
      L[i] = level(p, t); V[i] = v; W[i] = w; TH[i] = th; D[i] = d; E[i] = e;
    }
    return (simCache[n] = { N, L, V, W, TH, D, E, p });
  }
  function look(arr, t) {
    const x = clamp(t / H, 0, arr.length - 1.001);
    const i = Math.floor(x), f = x - i;
    return arr[i] + (arr[i + 1] - arr[i]) * f;
  }

  function mk(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  const pts = (a) => a.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");

  function pipe(parent, d, flowColor) {
    const g = mk("g", { class: "pipe" }, parent);
    const outer = mk("path", { d, fill: "none", stroke: C.line, "stroke-opacity": 0.8, "stroke-width": 13, "stroke-linejoin": "round" }, g);
    const inner = mk("path", { d, fill: "none", stroke: "#0D131B", "stroke-width": 8, "stroke-linejoin": "round" }, g);
    const flow = mk("path", { d, fill: "none", stroke: flowColor, "stroke-width": 4.5, "stroke-dasharray": "9 11", "stroke-linecap": "round", opacity: 0 }, g);
    return { g, outer, inner, flow };
  }
  function arrowHead(parent, x, y, ang, size, fill) {
    const a = (ang * Math.PI) / 180;
    const p = [[size, 0], [-size * 0.7, size * 0.62], [-size * 0.35, 0], [-size * 0.7, -size * 0.62]].map(([px, py]) => [
      x + px * Math.cos(a) - py * Math.sin(a), y + px * Math.sin(a) + py * Math.cos(a)]);
    return mk("path", { d: pts(p) + "Z", fill }, parent);
  }

  // ---- Studio-Grade Sliding-Card Word Subtitle Engine (Critically Damped Spring + Posture) ----
  function mountSubtitle(root, subData) {
    if (!subData || !Array.isArray(subData.words) || !subData.words.length) return null;
    const rawTokens = (subData.text || "").trim().split(/\s+/).filter(Boolean);
    const words = subData.words.map((w, i) => {
      const tok = rawTokens[i] || w.w;
      return { t: w.t, d: w.d, w: tok };
    });

    const chunks = [];
    let cur = [];
    let charCount = 0;
    for (let i = 0; i < words.length; i++) {
      const item = words[i];
      cur.push(item);
      charCount += item.w.length + 1;
      const endsPunct = /[.,;:!?]$/.test(item.w);
      const nextStartsCap = i + 1 < words.length && /^[A-Z]/.test(words[i + 1].w);
      if (
        cur.length >= 7 ||
        charCount >= 44 ||
        (endsPunct && cur.length >= 3) ||
        (nextStartsCap && cur.length >= 4)
      ) {
        chunks.push({
          words: cur,
          start: cur[0].t,
          end: cur[cur.length - 1].t + cur[cur.length - 1].d,
        });
        cur = [];
        charCount = 0;
      }
    }
    if (cur.length) {
      chunks.push({
        words: cur,
        start: cur[0].t,
        end: cur[cur.length - 1].t + cur[cur.length - 1].d,
      });
    }

    const layer = document.createElement("div");
    layer.className = "vo-sub-layer";
    const chunkEls = chunks.map((ch) => {
      const cEl = document.createElement("div");
      cEl.className = "vo-chunk";
      const card = document.createElement("span");
      card.className = "vo-sliding-card";
      cEl.appendChild(card);
      const spans = ch.words.map((wObj) => {
        const sp = document.createElement("span");
        sp.className = "vo-w";
        sp.textContent = wObj.w;
        cEl.appendChild(sp);
        return sp;
      });
      layer.appendChild(cEl);
      return { ch, cEl, card, spans, boxes: null };
    });
    root.appendChild(layer);

    const voOffset = subData.voOffset || 0;
    return {
      update(sceneTime) {
        const voT = sceneTime - voOffset;
        let activeIdx = -1;
        for (let i = 0; i < chunkEls.length; i++) {
          const c = chunkEls[i].ch;
          const nextStart = i + 1 < chunkEls.length ? chunkEls[i + 1].ch.start : c.end + 0.9;
          const holdEnd = Math.min(c.end + 0.85, nextStart - 0.04);
          if (voT >= c.start - 0.16 && voT <= holdEnd) {
            activeIdx = i;
            break;
          }
        }

        for (let i = 0; i < chunkEls.length; i++) {
          const item = chunkEls[i];
          if (i !== activeIdx) {
            item.cEl.style.opacity = "0";
            item.cEl.style.transform = "translate3d(0, 6px, 0)";
            item.cEl.style.pointerEvents = "none";
            continue;
          }
          const c = item.ch;
          const nextStart = i + 1 < chunkEls.length ? chunkEls[i + 1].ch.start : c.end + 0.9;
          const holdEnd = Math.min(c.end + 0.85, nextStart - 0.04);
          const enterU = clamp((voT - (c.start - 0.16)) / 0.16, 0, 1);
          const exitU = clamp((voT - (holdEnd - 0.16)) / 0.16, 0, 1);
          const fadeIn = ease.softLand(enterU);
          const fadeOut = 1 - ease.accelExit(exitU);
          const yOffset = (1 - fadeIn) * 6 - ease.accelExit(exitU) * 4;
          item.cEl.style.opacity = (fadeIn * fadeOut).toFixed(3);
          item.cEl.style.transform = `translate3d(0, ${yOffset.toFixed(2)}px, 0)`;

          item.boxes = item.spans.map((sp) => ({
            left: sp.offsetLeft,
            width: sp.offsetWidth,
          }));

          let wIdx = 0;
          for (let k = 0; k < c.words.length; k++) {
            if (voT >= c.words[k].t - 0.035) wIdx = k;
          }

          const curBox = item.boxes[wIdx] || { left: 0, width: 60 };
          const curWord = c.words[wIdx];
          let x = curBox.left;
          let w = curBox.width;
          let stretchX = 1;

          // Critically-damped spring interpolation with subtle velocity stretch (Emil Kowalski / motionmaxxing)
          if (wIdx > 0) {
            const prevBox = item.boxes[wIdx - 1];
            const rawU = clamp((voT - curWord.t) / 0.085, 0, 1);
            const springU = spring(rawU, 15, 0.84);
            x = prevBox.left + (curBox.left - prevBox.left) * springU;
            w = prevBox.width + (curBox.width - prevBox.width) * springU;
            stretchX = 1 + 0.055 * Math.sin(Math.PI * rawU);
          }

          item.card.style.transform = `translate3d(${(x - 8).toFixed(1)}px, -50%, 0) scaleX(${stretchX.toFixed(3)})`;
          item.card.style.width = `${Math.max(24, w + 16).toFixed(1)}px`;

          for (let k = 0; k < item.spans.length; k++) {
            const sp = item.spans[k];
            if (k === wIdx) {
              sp.className = "vo-w is-active";
            } else if (k < wIdx) {
              sp.className = "vo-w is-past";
            } else {
              sp.className = "vo-w is-future";
            }
          }
        }
      },
    };
  }

  function build(world, opt) {
    const P = opt.prefix;
    const n = opt.scene;
    const S = sim(n);
    const svg = mk("svg", { class: "dg", viewBox: "0 0 1920 1080", width: 1920, height: 1080, overflow: "visible" });
    world.insertBefore(svg, world.firstChild);
    const defs = mk("defs", {}, svg);
    const hatch = mk("pattern", { id: P + "-hatch", width: 12, height: 12, patternUnits: "userSpaceOnUse", patternTransform: "rotate(45)" }, defs);
    mk("line", { x1: 0, y1: 0, x2: 0, y2: 12, stroke: C.line, "stroke-opacity": 0.16, "stroke-width": 2 }, hatch);
    const hatch2 = mk("pattern", { id: P + "-hatch2", width: 16, height: 16, patternUnits: "userSpaceOnUse", patternTransform: "rotate(-35)" }, defs);
    mk("line", { x1: 0, y1: 0, x2: 0, y2: 16, stroke: C.line, "stroke-opacity": 0.07, "stroke-width": 2 }, hatch2);
    const L = {};

    // ---- sea (with subsurface coastal harmonic depth contour) ----
    const gSea = (L.sea = mk("g", { class: "g-sea" }, svg));
    const seaFill = mk("path", { fill: C.sea, "fill-opacity": 0.5 }, gSea);
    const seaSub = mk("path", { fill: "none", stroke: C.seaTop, "stroke-width": 1.8, "stroke-opacity": 0.32, "stroke-dasharray": "18 10" }, gSea);
    const innerFill = mk("path", { fill: C.sea, "fill-opacity": 0.5 }, gSea);
    const seaTop = mk("path", { fill: "none", stroke: C.seaTop, "stroke-width": 3.8, "stroke-linejoin": "round" }, gSea);
    const innerTop = mk("path", { fill: "none", stroke: C.seaTop, "stroke-width": 3.8 }, gSea);
    const innerSub = mk("path", { fill: "none", stroke: C.seaTop, "stroke-width": 1.6, "stroke-opacity": 0.3, "stroke-dasharray": "12 8" }, gSea);
    L.innerWater = mk("g", {}, gSea);
    L.innerWater.appendChild(innerFill); L.innerWater.appendChild(innerSub); L.innerWater.appendChild(innerTop);

    // ---- earth ----
    const gEarth = (L.earth = mk("g", { class: "g-earth" }, svg));
    const sb = [];
    for (let x = -420; x <= 560; x += 20) sb.push([x, seabedY(x)]);
    const earthD = pts(sb) + " L820 790 L820 500 L1960 500 L1960 1100 L-420 1100Z";
    const seaBottom = " L560 700 L788 700 L788 790 " + pts(sb.slice().reverse()).replace("M", "L") + "Z";
    const seaBottomOpen = " " + pts(sb.slice().reverse()).replace("M", "L") + "Z";
    L.earthFill = mk("g", {}, gEarth);
    mk("path", { d: earthD, fill: C.earth }, L.earthFill);
    mk("path", { d: earthD, fill: `url(#${P}-hatch2)` }, L.earthFill);
    L.seabed = mk("path", { d: pts([...sb, [788, 790]]), fill: "none", stroke: C.line, "stroke-opacity": 0.75, "stroke-width": 2.5 }, gEarth);
    L.land = mk("path", { d: "M820 500 L1960 500", fill: "none", stroke: C.line, "stroke-width": 3 }, gEarth);

    // ---- pipes (underground first so structures sit on top) ----
    const gPipes = (L.pipes = mk("g", { class: "g-pipes" }, svg));
    L.pIntake = pipe(gPipes, "M400 836 L400 880 L1080 880 L1080 490", C.seaTop);
    L.pBrine = pipe(gPipes, "M1500 415 L1525 415 L1525 940 L250 940 L250 896", C.brine);
    L.pFeed1 = pipe(gPipes, "M1120 450 L1182 450", C.seaTop);
    L.pFeed2 = pipe(gPipes, "M1258 450 L1280 450 L1280 417 L1300 417", C.seaTop);
    L.pPerm = pipe(gPipes, "M1500 455 L1560 455", C.fresh);
    L.pTap = pipe(gPipes, "M1680 482 L1790 482 L1790 412 L1834 412", C.fresh);
    L.screen = mk("g", {}, gPipes);
    mk("rect", { x: 386, y: 818, width: 28, height: 18, rx: 3, fill: C.panel, stroke: C.line, "stroke-width": 2 }, L.screen);
    for (let i = 0; i < 4; i++) mk("line", { x1: 391 + i * 6, y1: 820, x2: 391 + i * 6, y2: 834, stroke: C.line, "stroke-width": 1.5 }, L.screen);
    L.diffuser = mk("path", { d: "M240 900 L260 900 L256 884 L244 884Z", fill: C.panel, stroke: C.line, "stroke-width": 2 }, gPipes);
    L.plume = mk("g", { opacity: 0 }, gPipes);
    const plumeDots = [];
    for (let i = 0; i < 12; i++) plumeDots.push(mk("circle", { r: 3.2, fill: C.brine }, L.plume));

    // ---- chamber (concrete) + duct ----
    const gCh = (L.chamber = mk("g", { class: "g-chamber" }, svg));
    const shellA = "M560 700 L560 300 L640 300 L640 330 L592 330 L592 700Z";
    const shellB = "M740 300 L820 300 L820 800 L788 800 L788 330 L740 330Z";
    L.shell = [shellA, shellB].map((d) => {
      const g = mk("g", {}, gCh);
      const f1 = mk("path", { d, fill: C.concrete }, g);
      const f2 = mk("path", { d, fill: `url(#${P}-hatch)` }, g);
      const s = mk("path", { d, fill: "none", stroke: C.line, "stroke-width": 2.5, "stroke-linejoin": "round" }, g);
      return { g, fills: [f1, f2], stroke: s };
    });
    L.duct = ["M632 112 L640 112 L640 300 L632 300Z", "M740 112 L748 112 L748 300 L740 300Z"].map((d) =>
      mk("path", { d, fill: C.line, "fill-opacity": 0.85, stroke: C.line, "stroke-width": 1.5 }, gCh));

    // ---- air particles ----
    const gAir = (L.air = mk("g", { class: "g-air" }, svg));
    const R = rng(77);
    const chamberP = [];
    for (let i = 0; i < 38; i++) chamberP.push({ u: R(), w: R(), ph: R() * 6.28, el: mk("circle", { r: 3.6, fill: C.air }, gAir) });
    const ductP = [];
    for (let i = 0; i < 18; i++) ductP.push({ b: i / 18 + R() * 0.03, xo: (R() - 0.5) * 70, el: mk("circle", { r: 3.6, fill: C.air }, gAir) });

    // ---- flow arrows ----
    const gAr = (L.arrows = mk("g", { class: "g-arrows" }, svg));
    const chevUp = [], chevDn = [];
    const chev = (y, up, arr) => {
      const d = up ? `M672 ${y + 9} L690 ${y - 7} L708 ${y + 9}` : `M672 ${y - 9} L690 ${y + 7} L708 ${y - 9}`;
      arr.push(mk("path", { d, fill: "none", stroke: C.air, "stroke-width": 5, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0 }, gAr));
    };
    [292, 276, 146, 130].forEach((y) => { chev(y, true, chevUp); chev(y, false, chevDn); });
    const exitUp = mk("g", { opacity: 0 }, gAr);
    mk("path", { d: "M690 100 L690 50", stroke: C.air, "stroke-width": 7, "stroke-linecap": "round" }, exitUp);
    arrowHead(exitUp, 690, 38, -90, 20, C.air);
    const exitDn = mk("g", { opacity: 0 }, gAr);
    mk("path", { d: "M690 30 L690 78", stroke: C.air, "stroke-width": 7, "stroke-linecap": "round" }, exitDn);
    arrowHead(exitDn, 690, 92, 90, 20, C.air);
    const wUp = mk("g", { opacity: 0 }, gAr);
    mk("path", { d: "M0 70 L0 14", stroke: "#BFE3FF", "stroke-width": 8, "stroke-linecap": "round" }, wUp);
    arrowHead(wUp, 0, 0, -90, 22, "#BFE3FF");
    const wDn = mk("g", { opacity: 0 }, gAr);
    mk("path", { d: "M0 0 L0 56", stroke: "#BFE3FF", "stroke-width": 8, "stroke-linecap": "round" }, wDn);
    arrowHead(wDn, 0, 70, 90, 22, "#BFE3FF");

    // ---- turbine (face view, symmetric radial blades) ----
    const gT = (L.turbine = mk("g", { class: "g-turbine" }, svg));
    L.casing = mk("circle", { cx: TX, cy: TY, r: 50, fill: "#0E1520", "fill-opacity": 0.92, stroke: C.line, "stroke-width": 3 }, gT);
    const bladeSet = (parent, fill, stroke, op) => {
      const g = mk("g", { opacity: op }, parent);
      for (let i = 0; i < 8; i++)
        mk("rect", { x: TX - 7, y: TY - 45, width: 14, height: 32, rx: 6, fill, stroke, "stroke-width": 1.5, transform: `rotate(${i * 45} ${TX} ${TY})` }, g);
      return g;
    };
    const trail2 = bladeSet(gT, C.hot, "none", 0);
    const trail1 = bladeSet(gT, C.hot, "none", 0);
    const blades = (L.blades = bladeSet(gT, C.line, "#0A0E14", 1));
    L.hub = mk("circle", { cx: TX, cy: TY, r: 11, fill: C.bg, stroke: C.line, "stroke-width": 3 }, gT);
    L.glowRing = mk("circle", { cx: TX, cy: TY, r: 56, fill: "none", stroke: C.hot, "stroke-width": 4, opacity: 0 }, gT);
    L.cw = mk("g", { opacity: 0 }, gT);
    const r = 70, a0 = (-150 * Math.PI) / 180, a1 = (95 * Math.PI) / 180;
    mk("path", { d: `M${TX + r * Math.cos(a0)} ${TY + r * Math.sin(a0)} A${r} ${r} 0 1 1 ${TX + r * Math.cos(a1)} ${TY + r * Math.sin(a1)}`, fill: "none", stroke: C.hot, "stroke-width": 5, "stroke-linecap": "round" }, L.cw);
    arrowHead(L.cw, TX + r * Math.cos(a1) - 6, TY + r * Math.sin(a1) + 1, 185, 17, C.hot);

    // ---- generator + power ----
    const gG = (L.gen = mk("g", { class: "g-gen" }, svg));
    L.shaft = mk("path", { d: "M740 210 L792 210", stroke: C.line, "stroke-width": 5 }, gG);
    const genGlow = mk("rect", { x: 784, y: 172, width: 120, height: 76, rx: 14, fill: "none", stroke: C.energy, "stroke-width": 7, opacity: 0 }, gG);
    L.genBox = mk("rect", { x: 792, y: 180, width: 104, height: 60, rx: 8, fill: C.panel, stroke: C.line, "stroke-width": 2.5 }, gG);
    L.coil = mk("path", { d: "M806 210 L816 196 L828 224 L840 196 L852 224 L864 196 L876 224 L884 210", fill: "none", stroke: C.energy, "stroke-width": 3, "stroke-linejoin": "round" }, gG);
    const gPw = (L.power = mk("g", { class: "g-power" }, svg));
    const line = (d, parent) => ({
      base: mk("path", { d, fill: "none", stroke: C.energy, "stroke-opacity": 0.35, "stroke-width": 5, "stroke-linejoin": "round" }, parent),
      flow: mk("path", { d, fill: "none", stroke: C.energy, "stroke-width": 5, "stroke-dasharray": "12 14", "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0 }, parent),
    });
    L.pwStub = line("M896 210 L980 210", gPw);
    L.conditioner = mk("g", { class: "g-conditioner" }, gPw);
    mk("rect", { x: 921, y: 191, width: 44, height: 38, rx: 3, fill: C.panel, stroke: C.line, "stroke-width": 2 }, L.conditioner);
    mk("path", { d: "M928 202 Q932 195 936 202 T944 202 M947 215 H958 M947 220 H958", fill: "none", stroke: C.energy, "stroke-width": 2 }, L.conditioner);
    L.junction = mk("circle", { cx: 980, cy: 210, r: 8, fill: C.energy }, gPw);
    L.brA = mk("g", { opacity: 0 }, gPw);
    L.pwA = line("M980 210 L980 110 L1250 110", L.brA);
    L.brB = mk("g", { opacity: 0 }, gPw);
    L.pwB = line("M980 210 L1220 210 L1220 412", L.brB);

    // ---- RO building ----
    const gB = (L.building = mk("g", { class: "g-building" }, svg));
    L.bOutline = mk("path", { d: "M1000 500 L1000 250 L1720 250 L1720 500", fill: "rgba(18,26,38,0.55)", stroke: C.line, "stroke-width": 3 }, gB);
    L.bRoof = mk("path", { d: "M988 250 L1732 250", stroke: C.line, "stroke-width": 6 }, gB);
    L.filter = mk("g", {}, gB);
    mk("rect", { x: 1040, y: 400, width: 80, height: 90, rx: 6, fill: C.panel, stroke: C.line, "stroke-width": 2.5 }, L.filter);
    for (let i = 0; i < 5; i++) mk("path", { d: `M1046 ${414 + i * 16} L1114 ${406 + i * 16}`, stroke: C.seaTop, "stroke-width": 2, "stroke-dasharray": "4 4" }, L.filter);
    L.pump = mk("g", {}, gB);
    mk("circle", { cx: 1220, cy: 450, r: 38, fill: C.panel, stroke: C.line, "stroke-width": 2.5 }, L.pump);
    L.impeller = mk("g", {}, L.pump);
    for (let i = 0; i < 5; i++)
      mk("path", { d: "M1220 450 Q1236 440 1244 424", fill: "none", stroke: C.line, "stroke-width": 3, "stroke-linecap": "round", transform: `rotate(${i * 72} 1220 450)` }, L.impeller);
    mk("circle", { cx: 1220, cy: 450, r: 6, fill: C.line }, L.pump);
    L.module = mk("g", {}, gB);
    mk("rect", { x: 1300, y: 398, width: 200, height: 74, rx: 16, fill: C.panel, stroke: C.line, "stroke-width": 2.5 }, L.module);
    L.membraneLine = mk("path", { d: "M1308 435 L1492 435", stroke: C.line, "stroke-width": 3, "stroke-dasharray": "4 5" }, L.module);
    L.molecules = mk("g", { opacity: 0 }, gB);
    const mols = [];
    const RM = rng(311);
    for (let i = 0; i < 22; i++) {
      const salt = i % 3 === 0;
      mols.push({ salt, ph: RM(), xc: 0.25 + RM() * 0.55, el: mk("circle", { r: salt ? 5.5 : 4.5, fill: salt ? C.brine : C.fresh }, L.molecules) });
    }
    L.tank = mk("g", {}, gB);
    L.post = mk("g", { class: "g-post" }, gB);
    mk("rect", { x: 1519, y: 440, width: 24, height: 30, fill: C.panel, stroke: C.line, "stroke-width": 2 }, L.post);
    [0, 1, 2].forEach((i) => mk("path", { d: `M1524 ${447 + i * 7} H1538`, stroke: C.fresh, "stroke-width": 2 }, L.post));
    mk("rect", { x: 1560, y: 300, width: 120, height: 195, rx: 10, fill: "#0F1621", stroke: C.line, "stroke-width": 2.5 }, L.tank);
    const tankWater = mk("rect", { x: 1563, y: 492, width: 114, height: 0, rx: 6, fill: C.fresh, "fill-opacity": 0.55 }, L.tank);
    const tankTop = mk("path", { d: "", stroke: C.fresh, "stroke-width": 3 }, L.tank);
    for (let i = 1; i < 5; i++) mk("path", { d: `M1680 ${300 + i * 39} L1668 ${300 + i * 39}`, stroke: C.line, "stroke-width": 2 }, L.tank);
    L.tap = mk("g", {}, gB);
    mk("path", { d: "M1834 404 L1846 404 Q1854 404 1854 414 L1854 424 L1842 424 L1842 418 L1834 418Z", fill: C.panel, stroke: C.line, "stroke-width": 2.2 }, L.tap);
    mk("path", { d: "M1810 494 L1810 478 L1878 478 L1878 494", fill: "none", stroke: C.line, "stroke-width": 2.5 }, L.tap);
    const stream = mk("path", { d: "M1848 428 L1848 476", stroke: C.fresh, "stroke-width": 5, "stroke-dasharray": "8 6", "stroke-linecap": "round", opacity: 0 }, L.tap);

    // ---- Tourist facility card (sanitation buildings, pathway lamps, coastal kiosk) ----
    const gM = (L.grid = mk("g", { class: "g-grid", opacity: 0 }, svg));
    mk("rect", { x: 1250, y: 26, width: 610, height: 200, rx: 14, fill: "rgba(14,20,30,0.92)", stroke: C.energy, "stroke-opacity": 0.65, "stroke-width": 2.5 }, gM);
    const ic = { stroke: C.line, "stroke-width": 3, fill: "none", "stroke-linejoin": "round", "stroke-linecap": "round" };
    mk("path", { d: "M1300 198 L1300 96 M1278 110 L1322 110 M1284 122 L1316 122", ...ic }, gM);
    const wires = mk("path", { d: "M1300 110 Q1350 136 1404 150 M1300 110 Q1400 128 1510 150 M1300 110 Q1460 112 1640 100 M1300 110 Q1530 108 1716 140", fill: "none", stroke: C.energy, "stroke-width": 2.5, "stroke-dasharray": "7 8", opacity: 0.3 }, gM);
    const houses = [1390, 1500].map((x) => {
      mk("path", { d: `M${x} 198 L${x} 146 L${x + 40} 116 L${x + 80} 146 L${x + 80} 198Z`, ...ic }, gM);
      return mk("rect", { x: x + 26, y: 156, width: 28, height: 24, rx: 3, fill: C.hot, opacity: 0.12 }, gM);
    });
    mk("path", { d: "M1640 198 L1640 98 L1672 98", ...ic }, gM);
    mk("path", { d: "M1662 98 L1684 98 L1680 108 L1666 108Z", fill: C.line }, gM);
    const cone = mk("path", { d: "M1666 110 L1680 110 L1700 190 L1646 190Z", fill: C.hot, opacity: 0 }, gM);
    mk("path", { d: "M1716 198 L1716 140 L1836 140 L1836 198Z", ...ic }, gM);
    mk("path", { d: "M1710 140 L1730 118 L1822 118 L1842 140Z", fill: C.panel, stroke: C.line, "stroke-width": 2.5, "stroke-linejoin": "round" }, gM);
    const snow = mk("g", { opacity: 0.35 }, gM);
    mk("rect", { x: 1732, y: 150, width: 52, height: 24, rx: 2, fill: C.hot, "fill-opacity": 0.75, stroke: C.line, "stroke-width": 2 }, snow);
    mk("path", { d: "M1724 174 H1828", stroke: C.line, "stroke-width": 2.5 }, snow);
    mk("path", { d: "M1804 152 C1804 152 1796 162 1796 167 A8 8 0 0 0 1812 167 C1812 162 1804 152 1804 152Z", fill: C.fresh }, snow);
    L.facilityLights = houses; L.lampCone = cone; L.kioskPanel = snow; L.facilityWires = wires;

    // ---- leader lines for HTML labels ----
    const gLead = mk("g", { class: "g-leaders" }, svg);
    const leaders = new Map();
    world.querySelectorAll(".lbl[data-leader]").forEach((lb) => {
      const [x1, y1, x2, y2] = lb.dataset.leader.split(",").map(Number);
      const g = mk("g", { opacity: lb.classList.contains("hide") ? 0 : 1 }, gLead);
      mk("path", { d: `M${x1} ${y1} L${x2} ${y2}`, stroke: C.line, "stroke-opacity": 0.75, "stroke-width": 2 }, g);
      mk("circle", { cx: x2, cy: y2, r: 5.5, fill: C.bg, stroke: C.line, "stroke-width": 2.5 }, g);
      leaders.set(lb, g);
    });

    const f = Object.assign({ lipOn: () => 1, glow: () => 1, power: () => 1, branch: () => 1, innerFill: () => 1, tank: () => 0.25, ro: () => 0, pump: () => 0, tapOn: () => 0, gridOn: () => 0 }, opt.fn || {});

    function update(t) {
      const motionT = offsets[n] + t;
      const p = S.p;
      const A = p.A(t), ph = p.phi(t);
      const Lv = look(S.L, t), v = look(S.V, t), w = look(S.W, t), th = look(S.TH, t), D = look(S.D, t), E = look(S.E, t);
      const rip = (x) => 3.2 * Math.sin(0.045 * x - 2.4 * motionT) + 1.8 * Math.sin(0.11 * x + 1.6 * motionT + 1.3);
      const top = [], subTop = [];
      for (let x = -420; x <= 560; x += 14) {
        const ySurf = MWL - A * Math.sin(ph + K * (560 - x)) + rip(x) * clamp((560 - x) / 30, 0, 1);
        top.push([x, ySurf]);
        subTop.push([x, ySurf + 22 + 3.5 * Math.sin(0.035 * x - 1.8 * motionT + 0.9)]);
      }
      top.push([560, Lv]);
      subTop.push([560, Lv + 20]);
      seaTop.setAttribute("d", pts(top));
      seaSub.setAttribute("d", pts(subTop));
      seaFill.setAttribute("d", pts(top) + (f.lipOn(t) > 0.5 ? seaBottom : seaBottomOpen));
      const Li = LIP + (Lv - LIP) * f.innerFill(t);
      const inn = [], innSub = [];
      for (let x = 592; x <= 788; x += 14) {
        const yIn = Li + 2.2 * Math.sin(0.06 * x + 1.9 * motionT);
        inn.push([x, yIn]);
        innSub.push([x, Math.min(694, yIn + 18 + 1.6 * Math.cos(0.05 * x - 1.5 * motionT))]);
      }
      innerTop.setAttribute("d", pts(inn));
      innerSub.setAttribute("d", pts(innSub));
      innerFill.setAttribute("d", pts(inn) + " L788 700 L592 700Z");
      const sOut = clamp(v / V0, 0, 1), sIn = clamp(-v / V0, 0, 1), sAbs = Math.max(sOut, sIn);
      for (const q of chamberP) {
        let x = 604 + q.u * 172 + 3.4 * Math.sin(motionT * 1.35 + q.ph);
        const y = 344 + q.w * (Li - 358) + 3.2 * Math.sin(motionT * 1.75 + q.ph * 2);
        const venturiPull = sAbs * Math.pow(1 - q.w, 1.35) * 0.85;
        x = x + (690 + (x - 690) * 0.42 - x) * venturiPull;
        q.el.setAttribute("cx", x.toFixed(1));
        q.el.setAttribute("cy", y.toFixed(1));
        q.el.setAttribute("r", (3.3 + 0.9 * sAbs * (1 - q.w * 0.5)).toFixed(2));
      }
      for (const q of ductP) {
        const s = frac(q.b + (D * 2.2) / 300);
        const y = 320 - s * 300;
        const spread = Math.max(0, 112 - y) / 50;
        const x = 690 + q.xo * (0.42 + spread * 0.6);
        q.el.setAttribute("cx", x.toFixed(1)); q.el.setAttribute("cy", y.toFixed(1));
        const edge = clamp(s / 0.08, 0, 1) * clamp((1 - s) / 0.15, 0, 1);
        q.el.setAttribute("opacity", ((0.14 + 0.86 * sAbs) * edge).toFixed(3));
      }
      const cyc = frac(motionT * 1.4);
      chevUp.forEach((c, i) => c.setAttribute("opacity", (sOut * (0.35 + 0.65 * frac(cyc + (i % 2) * 0.5))).toFixed(3)));
      chevDn.forEach((c, i) => c.setAttribute("opacity", (sIn * (0.35 + 0.65 * frac(cyc + (i % 2) * 0.5))).toFixed(3)));
      exitUp.setAttribute("opacity", sOut.toFixed(3));
      exitDn.setAttribute("opacity", sIn.toFixed(3));
      const dL = -v;
      wUp.setAttribute("opacity", clamp(-dL / 12, 0, 1).toFixed(3));
      wDn.setAttribute("opacity", clamp(dL / 12, 0, 1).toFixed(3));
      wUp.setAttribute("transform", `translate(735 ${(Li + 22).toFixed(1)})`);
      wDn.setAttribute("transform", `translate(735 ${(Li + 18).toFixed(1)})`);
      const k = w / WMAX;
      const gk = k * f.glow(t);
      blades.setAttribute("transform", `rotate(${th.toFixed(2)} ${TX} ${TY})`);
      trail1.setAttribute("transform", `rotate(${(th - 9).toFixed(2)} ${TX} ${TY})`);
      trail2.setAttribute("transform", `rotate(${(th - 18).toFixed(2)} ${TX} ${TY})`);
      trail1.setAttribute("opacity", (0.55 * gk).toFixed(3));
      trail2.setAttribute("opacity", (0.28 * gk).toFixed(3));
      L.glowRing.setAttribute("opacity", "0");
      genGlow.setAttribute("opacity", "0");
      L.coil.setAttribute("stroke-opacity", (0.38 + 0.62 * k).toFixed(3));
      L.coil.setAttribute("stroke-width", (2.8 + 0.9 * k).toFixed(2));
      const off = (-E * 0.26).toFixed(1);
      const pwOp = ((0.25 + 0.75 * k) * f.power(t)).toFixed(3);
      const brOp = (pwOp * f.branch(t)).toFixed(3);
      [L.pwStub, L.pwA, L.pwB].forEach((l, i) => { l.flow.setAttribute("stroke-dashoffset", off); l.flow.setAttribute("opacity", i ? brOp : pwOp); });
      const ro = f.ro(t), pumpOn = f.pump(t);
      L.impeller.setAttribute("transform", `rotate(${(f.pumpAngle ? f.pumpAngle(t) : pumpOn * motionT * 300).toFixed(1)} 1220 450)`);
      const fo = (-motionT * 40).toFixed(1);
      [L.pIntake, L.pFeed1, L.pFeed2].forEach((pp) => { pp.flow.setAttribute("stroke-dashoffset", fo); pp.flow.setAttribute("opacity", ro.toFixed(3)); });
      [L.pPerm, L.pBrine].forEach((pp) => { pp.flow.setAttribute("stroke-dashoffset", fo); pp.flow.setAttribute("opacity", ro.toFixed(3)); });
      L.pTap.flow.setAttribute("stroke-dashoffset", fo);
      L.pTap.flow.setAttribute("opacity", f.tapOn(t).toFixed(3));
      stream.setAttribute("stroke-dashoffset", (-motionT * 60).toFixed(1));
      stream.setAttribute("opacity", f.tapOn(t).toFixed(3));
      L.plume.setAttribute("opacity", ro.toFixed(3));
      plumeDots.forEach((dd, i) => {
        const s = frac(motionT * 0.35 + i / plumeDots.length);
        dd.setAttribute("cx", (250 - s * 70 + 10 * Math.sin(i * 2.1)).toFixed(1));
        dd.setAttribute("cy", (882 - s * 60).toFixed(1));
        dd.setAttribute("opacity", (1 - s).toFixed(3));
      });
      mols.forEach((m, i) => {
        const s = frac(motionT * 0.28 + m.ph);
        let x, y;
        if (m.salt) { x = 1308 + s * 186; y = 418 + 9 * Math.sin(i + s * 7); }
        else if (s < m.xc) { x = 1308 + s * 186; y = 418 + 8 * Math.sin(i * 1.7 + s * 6); }
        else { const c = clamp((s - m.xc) / 0.12, 0, 1); x = 1308 + s * 186; y = 418 + c * 36 + (1 - c) * 8 * Math.sin(i * 1.7 + s * 6); }
        m.el.setAttribute("cx", x.toFixed(1)); m.el.setAttribute("cy", y.toFixed(1));
      });
      const lvl = clamp(f.tank(t), 0, 1) * 185;
      tankWater.setAttribute("y", (492 - lvl).toFixed(1));
      tankWater.setAttribute("height", lvl.toFixed(1));
      tankTop.setAttribute("d", lvl > 1 ? `M1564 ${(492 - lvl).toFixed(1)} L1676 ${(492 - lvl).toFixed(1)}` : "");
      const g = f.gridOn(t);
      wires.setAttribute("stroke-dashoffset", (-motionT * 30).toFixed(1));
      wires.setAttribute("opacity", (0.3 + 0.7 * g).toFixed(3));
      houses.forEach((h, i) => h.setAttribute("opacity", (0.12 + 0.88 * clamp(g * 3 - i * 0.6, 0, 1)).toFixed(3)));
      cone.setAttribute("opacity", (0.4 * clamp(g * 3 - 1.2, 0, 1)).toFixed(3));
      snow.setAttribute("opacity", (0.35 + 0.65 * clamp(g * 3 - 1.8, 0, 1)).toFixed(3));
      return { L: Lv, v, w, k };
    }

    const cam = { s: 1, x: 0, y: 0 };
    const applyCam = () => { world.style.transform = `translate(${cam.x.toFixed(2)}px, ${cam.y.toFixed(2)}px) scale(${cam.s.toFixed(4)})`; };
    const frame = (s, wx, wy, sx, sy) => ({ s, x: sx - s * wx, y: sy - s * wy });

    function prepDraw(list) {
      list.forEach((e) => {
        e.setAttribute("pathLength", "1000");
        const len = 1020;
        e.style.strokeDasharray = `${len} ${len}`;
        e.style.strokeDashoffset = `${len}`;
        e.__len = len;
      });
    }
    return { svg, L, update, cam, applyCam, frame, prepDraw, leaders, sim: S, C };
  }

  window.OWC = { build, mountSubtitle, plans, sim, clamp, smooth, ramp, eis, ease, spring, frac, rng, C, WMAX };
})();
