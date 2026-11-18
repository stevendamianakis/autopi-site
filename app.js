/* AutoPI project page */
(function () {
  'use strict';

  /* ------------------------------------------------------------------ links
   * The two addresses that exist only once the paper and the code are public.
   * Fill them in here and nowhere else. While one is empty, its buttons read "soon". */
  var LINKS = {
    arxivId: '',   // for example '2611.01234'
    code: ''       // for example 'https://github.com/<account>/autopi'
  };

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var el = function (tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };

  /* ------------------------------------------------------------------ day and night */
  function setTheme(theme, remember) {
    document.documentElement.setAttribute('data-theme', theme);
    $$('[data-theme-set]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-theme-set') === theme));
    });
    var scheme = $('meta[name="color-scheme"]');
    var color = $('meta[name="theme-color"]');
    if (scheme) scheme.setAttribute('content', theme);
    if (color) color.setAttribute('content', theme === 'dark' ? '#0A111E' : '#1F3A70');
    if (remember) {
      try {
        if (theme === 'dark') localStorage.setItem('autopi-theme', 'dark');
        else localStorage.removeItem('autopi-theme');
      } catch (err) { /* storage blocked: the choice lasts for this visit */ }
    }
  }
  setTheme(document.documentElement.getAttribute('data-theme') || 'light', false);
  $$('[data-theme-set]').forEach(function (b) {
    b.addEventListener('click', function () { setTheme(b.getAttribute('data-theme-set'), true); });
  });

  /* ------------------------------------------------------------------ current section in the top bar */
  var navLinks = $$('.topnav a');
  var marks = $$('section[id], [data-section]').map(function (s) {
    return { node: s, key: s.getAttribute('data-section') || s.id };
  });
  var ticking = false;
  function markCurrent() {
    ticking = false;
    var line = window.innerHeight * 0.32;
    var key = marks.length ? marks[0].key : '';
    marks.forEach(function (m) { if (m.node.getBoundingClientRect().top <= line) key = m.key; });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4 && marks.length) {
      key = marks[marks.length - 1].key;
    }
    navLinks.forEach(function (a) {
      if (a.getAttribute('data-nav') === key) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(markCurrent); }
  }, { passive: true });
  window.addEventListener('resize', markCurrent);
  markCurrent();

  /* ------------------------------------------------------------------ paper and code links */
  function wire(id, href) {
    var a = document.getElementById(id);
    if (!a) return;
    if (href) {
      a.href = href;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    } else {
      a.setAttribute('aria-disabled', 'true');
      a.setAttribute('aria-label', a.getAttribute('data-soon'));
      a.appendChild(el('span', 'soon', 'soon'));
    }
  }
  var paperUrl = LINKS.arxivId ? 'https://arxiv.org/abs/' + LINKS.arxivId : '';
  wire('link-paper', paperUrl);
  wire('link-code', LINKS.code);
  wire('link-code-2', LINKS.code);

  if (LINKS.code) {
    var foot = document.getElementById('foot-code');
    var a = el('a', null, LINKS.code.replace(/^https?:\/\//, ''));
    a.href = LINKS.code; a.target = '_blank'; a.rel = 'noopener noreferrer';
    foot.appendChild(document.createTextNode(' Code and data: '));
    foot.appendChild(a);
    foot.appendChild(document.createTextNode('.'));
  }

  /* ------------------------------------------------------------------ BibTeX */
  var bib = [
    '@misc{damianakis2026autopi,',
    '  title         = {{AutoPI}: Taxonomy-Guided Adaptive Red Teaming for',
    '                   Prompt Injection in {LLM} Agents},',
    '  author        = {Damianakis, Stavros and Psounis, Konstantinos},',
    '  year          = {2026}' + (LINKS.arxivId ? ',' : '')
  ];
  if (LINKS.arxivId) {
    bib.push(
      '  eprint        = {' + LINKS.arxivId + '},',
      '  archivePrefix = {arXiv},',
      '  primaryClass  = {cs.CR},',
      '  url           = {' + paperUrl + '}'
    );
    var line = document.getElementById('cite-line');
    line.textContent = 'The paper is on arXiv: ';
    var link = el('a', null, 'arXiv:' + LINKS.arxivId);
    link.href = paperUrl; link.target = '_blank'; link.rel = 'noopener noreferrer';
    line.appendChild(link);
    line.appendChild(document.createTextNode('.'));
  }
  bib.push('}');
  document.getElementById('bibtex').textContent = bib.join('\n');

  /* ------------------------------------------------------------------ copy buttons */
  $$('button.copy').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = document.getElementById(btn.getAttribute('data-copy')).textContent;
      var done = function () {
        btn.classList.add('copied');
        $('span', btn).textContent = 'Copied';
        document.getElementById('copy-status').textContent = 'Copied to the clipboard';
        setTimeout(function () {
          btn.classList.remove('copied');
          $('span', btn).textContent = 'Copy';
          document.getElementById('copy-status').textContent = '';
        }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, fallback);
      } else {
        fallback();
      }
      function fallback() {
        var ta = el('textarea');
        ta.value = text; ta.setAttribute('readonly', '');
        ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); done(); } catch (err) { /* nothing more to try */ }
        document.body.removeChild(ta);
      }
    });
  });

  /* ------------------------------------------------------------------ sideways scrollers: fade the edge that hides more */
  function watchFrames() {
    $$('.frame').forEach(function (frame) {
      var sc = frame.firstElementChild;
      var update = function () {
        frame.classList.toggle('can-left', sc.scrollLeft > 2);
        frame.classList.toggle('can-right', sc.scrollLeft + sc.clientWidth < sc.scrollWidth - 2);
      };
      sc.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update);
      if (window.ResizeObserver) new ResizeObserver(update).observe(sc);
      update();
    });
  }

  var DATA = window.AUTOPI_DATA;
  if (!DATA) { watchFrames(); return; }

  /* ------------------------------------------------------------------ the taxonomy strip under the buttons */
  var strip = document.getElementById('strip');
  DATA.classes.forEach(function (c) {
    var g = el('span');
    g.setAttribute('data-c', c.id);
    g.style.flex = c.techniques.length;
    c.techniques.forEach(function () { g.appendChild(el('i')); });
    strip.appendChild(g);
  });

  /* ------------------------------------------------------------------ coverage grid (Figure 4) */
  var techs = [];
  DATA.classes.forEach(function (c) {
    c.techniques.forEach(function (t, j) {
      techs.push({ id: t.id, name: t.name, cls: c, first: j === 0, last: j === c.techniques.length - 1, num: j + 1 });
    });
  });

  function pct(v) {
    if (v === 0) return 'none';
    if (v < 0.01) return 'under 1%';
    if (v >= 0.995 && v < 1) return (Math.floor(v * 1000) / 10).toFixed(1) + '%';
    return Math.round(v * 100) + '%';
  }
  /* disc diameter as a fraction of the column width: the paper's 1.5 + 3.4 * sqrt(share) pt on a 5.3 pt column */
  function discK(v) { return (1.5 + 3.4 * Math.sqrt(v)) / 5.3; }

  var table = document.getElementById('cov');
  (function build() {
    var cg = el('colgroup');
    cg.appendChild(el('col', 'c-name'));
    techs.forEach(function (t) { if (t.first && t.cls !== DATA.classes[0]) cg.appendChild(el('col', 'c-gap')); cg.appendChild(el('col', 'c-t')); });
    cg.appendChild(el('col', 'c-n'));
    table.appendChild(cg);

    var thead = el('thead'), hr = el('tr');
    hr.appendChild(el('td'));
    DATA.classes.forEach(function (c, i) {
      if (i) hr.appendChild(el('td', 'gap'));
      var th = el('th');
      th.colSpan = c.techniques.length;
      th.scope = 'colgroup';
      var box = el('div', 'cls');
      box.setAttribute('data-c', c.id);
      box.appendChild(el('span', 'badge', c.id));
      var nm = el('b', null, c.short);
      nm.title = c.name;
      box.appendChild(nm);
      var sr = el('span', 'sr-only', ', ' + c.name + ', ' + c.techniques.length + ' techniques');
      box.appendChild(sr);
      th.appendChild(box);
      hr.appendChild(th);
    });
    hr.appendChild(el('th', 'of34', 'of 34'));
    thead.appendChild(hr);
    table.appendChild(thead);

    var tbody = el('tbody');
    var prev = null;
    DATA.attackers.forEach(function (a, ai) {
      var tr = el('tr', a.group);
      if (prev && prev !== a.group) tr.classList.add('gap-above');
      if (a.key === 'autopiFull') tr.classList.add('best');
      prev = a.group;
      var th = el('th');
      th.scope = 'row';
      if (a.name.indexOf('AutoPI-') === 0) {
        th.appendChild(el('span', 'pre', 'AutoPI-'));
        th.appendChild(document.createTextNode(a.name.slice(7)));
      } else {
        th.textContent = a.name;
      }
      tr.appendChild(th);
      techs.forEach(function (t, i) {
        if (t.first && t.cls !== DATA.classes[0]) tr.appendChild(el('td', 'gap'));
        var td = el('td', 'cell' + (t.first ? ' first' : '') + (t.last ? ' last' : ''));
        td.setAttribute('data-i', i);
        td.setAttribute('data-a', ai);
        var v = a.share[i];
        if (v >= 0.01) {
          var d = el('span', 'disc');
          d.style.setProperty('--k', discK(v).toFixed(3));
          td.appendChild(d);
        } else if (v > 0) {
          td.appendChild(el('span', 'disc ring'));
        }
        td.appendChild(el('span', 'sr-only', t.name + ': ' + pct(v)));
        tr.appendChild(td);
      });
      tr.appendChild(el('td', 'n', String(a.reached)));
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    var tfoot = el('tfoot'), fr = el('tr');
    fr.setAttribute('aria-hidden', 'true');
    fr.appendChild(el('td'));
    techs.forEach(function (t) {
      if (t.first && t.cls !== DATA.classes[0]) fr.appendChild(el('td', 'gap'));
      fr.appendChild(el('td', null, String(t.num)));
    });
    fr.appendChild(el('td'));
    tfoot.appendChild(fr);
    table.appendChild(tfoot);
  })();

  /* the key's discs follow the same rule as the grid's */
  $$('.cov-key .disc[data-share]').forEach(function (d) {
    d.style.setProperty('--k', discK(parseFloat(d.getAttribute('data-share'))).toFixed(3));
  });
  /* discs are sized from the real column width, so grid and key always agree */
  var covFig = document.getElementById('fig-coverage');
  function measure() {
    var cell = $('td.cell', table);
    if (cell) covFig.style.setProperty('--col', Math.min(cell.getBoundingClientRect().width, 26).toFixed(2) + 'px');
  }
  measure();
  if (window.ResizeObserver) new ResizeObserver(measure).observe(table);
  else window.addEventListener('resize', measure);

  /* tooltip: the technique, and how often each attacker's successes carry it */
  var tip = document.getElementById('tooltip');
  var hotIndex = -1;
  function showTip(td) {
    var i = +td.getAttribute('data-i'), ai = +td.getAttribute('data-a'), t = techs[i];
    if (hotIndex !== i) {
      $$('td.cell.hot', table).forEach(function (c) { c.classList.remove('hot'); });
      $$('td.cell[data-i="' + i + '"]', table).forEach(function (c) { c.classList.add('hot'); });
      hotIndex = i;
    }
    tip.textContent = '';
    tip.appendChild(el('b', null, t.name));
    tip.appendChild(el('span', 'tt-id', t.id + ' · ' + t.cls.name));
    var list = el('div', 'tt-rows');
    DATA.attackers.forEach(function (a, k) {
      var row = el('div', 'tt-row' + (k === ai ? ' on' : ''));
      row.appendChild(el('span', null, a.name));
      row.appendChild(el('span', 'tt-v', pct(a.share[i])));
      list.appendChild(row);
    });
    tip.appendChild(list);
    tip.hidden = false;
    var r = td.getBoundingClientRect(), w = tip.offsetWidth, h = tip.offsetHeight;
    var x = Math.max(8, Math.min(window.innerWidth - w - 8, r.left + r.width / 2 - w / 2));
    var y = r.bottom + 10;
    if (y + h > window.innerHeight - 8) y = Math.max(8, r.top - h - 10);
    tip.style.left = x + 'px';
    tip.style.top = y + 'px';
  }
  function hideTip() {
    tip.hidden = true;
    hotIndex = -1;
    $$('td.cell.hot', table).forEach(function (c) { c.classList.remove('hot'); });
  }
  table.addEventListener('mouseover', function (e) {
    var td = e.target.closest ? e.target.closest('td.cell') : null;
    if (td) showTip(td); else hideTip();
  });
  table.addEventListener('mouseleave', hideTip);
  table.addEventListener('click', function (e) {
    var td = e.target.closest ? e.target.closest('td.cell') : null;
    if (td) { showTip(td); e.stopPropagation(); }
  });
  document.addEventListener('click', hideTip);
  window.addEventListener('scroll', function () { if (!tip.hidden) hideTip(); }, { passive: true });

  /* ------------------------------------------------------------------ strategy picker */
  var RUN = 'autopi run --benchmark agentdojo \\\n  --target vllm:8000:qwen36 \\\n  --refiner vllm:8000:qwen36 \\\n  ';
  var OUT = ' \\\n  --logdir ./runs';
  var STRATEGIES = {
    coverage: {
      name: 'AutoPI-Full', attempts: 529, tech: 31, asr: 42.9, cost: 1.0,
      blocks: { seed: 'the fixed seed', sweep: 'all 132 sub-techniques', sweepx: '3 variants of each failed line' },
      cmd: RUN + '-k 3 --max-attempts 529' + OUT
    },
    asr: {
      name: 'AutoPI-Seed-Exploit', attempts: 601, tech: 20, asr: 68.2, cost: 0.75,
      blocks: { seed: 'the fixed seed', seedx: '600 rewrites of the seed' },
      cmd: RUN + '--seed-only -k 601 --max-attempts 601' + OUT
    },
    cost: {
      name: 'AutoPI-L1', attempts: 133, tech: 26, asr: 24.4, cost: 0.3,
      blocks: { seed: 'the fixed seed', sweep: 'all 132 sub-techniques' },
      cmd: RUN + '--max-attempts 133' + OUT
    }
  };
  function pick(goal) {
    var s = STRATEGIES[goal];
    $$('.steer-pick button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-goal') === goal));
    });
    document.getElementById('st-name').textContent = s.name;
    document.getElementById('st-budget').textContent = 'at most ' + s.attempts + ' attempts per scenario';
    $$('#st-blocks li').forEach(function (li) {
      var text = s.blocks[li.getAttribute('data-block')];
      li.classList.toggle('on', !!text);
      $('span', li).textContent = text || 'not used';
    });
    document.getElementById('m-tech').textContent = s.tech;
    document.getElementById('m-asr').textContent = s.asr.toFixed(1);
    document.getElementById('m-cost').textContent = s.cost.toFixed(s.cost === 0.75 ? 2 : 1);
    document.getElementById('b-tech').style.width = (s.tech / 34 * 100).toFixed(1) + '%';
    document.getElementById('b-asr').style.width = s.asr.toFixed(1) + '%';
    document.getElementById('b-cost').style.width = (s.cost * 100).toFixed(0) + '%';
    document.getElementById('st-cmd').textContent = s.cmd;
  }
  $$('.steer-pick button').forEach(function (b) {
    b.addEventListener('click', function () { pick(b.getAttribute('data-goal')); });
  });
  pick('coverage');

  watchFrames();
})();
