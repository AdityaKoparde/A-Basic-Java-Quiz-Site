(function () {
  var LIMIT = 20; // seconds per question
  // Add or edit questions here. a = index of the correct option in o.
  var JS = [
    {t:"Intro",q:"Which keyword declares a variable you can reassign later?",o:["const","let","fixed","static"],a:1,e:"let allows reassignment; const does not."},
    {t:"Intro",q:"What does typeof null return?",o:['"null"','"undefined"','"object"','"number"'],a:2,e:"It's a famous historical quirk of JavaScript."},
    {t:"Intro",q:'What is the result of 2 + "2"?',o:["4",'"22"',"NaN","Error"],a:1,e:"With a string involved, + joins text instead of adding numbers."},
    {t:"Intro",q:"Which operator compares both value AND type?",o:["=","==","===","=>"],a:2,e:"=== is strict equality, with no type conversion."},
    {t:"DOM & Events",q:"Which method finds an element by its id?",o:["document.getElementById()","document.findId()","document.selectById()","document.id()"],a:0,e:"document.getElementById('box') returns the element, or null."},
    {t:"DOM & Events",q:"Which is safest for inserting text a user typed?",o:["innerHTML","textContent","outerHTML","document.write"],a:1,e:"textContent treats the value as plain text, so it can't inject HTML."},
    {t:"DOM & Events",q:"How do you run a function when a button is clicked?",o:["button.onClickRun(fn)","button.when('click', fn)","button.addEventListener('click', fn)","button.listen(fn)"],a:2,e:"addEventListener attaches a handler without replacing existing ones."},
    {t:"DOM & Events",q:"What does event.preventDefault() do?",o:["Stops the page from loading","Cancels the browser's default action","Deletes the event","Stops all JavaScript"],a:1,e:"For example, it stops a form submit from reloading the page."},
    {t:"Animations",q:"Which API is best for smooth, frame-synced animation?",o:["setTimeout","alert","requestAnimationFrame","document.write"],a:2,e:"requestAnimationFrame runs right before each screen repaint."},
    {t:"Animations",q:"What does setInterval(fn, 1000) do?",o:["Runs fn once after 1 second","Runs fn every 1000 ms until cleared","Runs fn 1000 times","Pauses for 1000 seconds"],a:1,e:"Stop it with clearInterval()."},
    {q:"Which array method adds an item to the end?",o:["push()","pop()","shift()","unshift()"],a:0,e:"pop() removes from the end; push() adds to it."},
    {q:"What does JSON.stringify() do?",o:["Parses JSON text","Turns a value into a JSON string","Sorts an object","Deletes keys"],a:1,e:"JSON.parse() is the opposite: string back to value."}
  ];

  var ROUND = 8; // questions per round, drawn at random from the category's pool
  var CATS = {
    js: {name:"JavaScript",em:"⚡",c:"#f5b81c",d:"Variables, DOM, events & timers",qs:JS},
    html: {name:"HTML",em:"🧱",c:"#e8683a",d:"Tags, forms & semantics",qs:[
      {q:"Which tag creates the largest heading?",o:["<h6>","<h1>","<head>","<title>"],a:1,e:"h1 is the top-level heading; h6 is the smallest."},
      {q:"Which attribute gives an image text for screen readers?",o:["title","alt","src","name"],a:1,e:"alt describes the image and shows if it fails to load."},
      {q:"Which element holds the main navigation links?",o:["<nav>","<menu-bar>","<links>","<header-links>"],a:0,e:"<nav> is a semantic element made for navigation."},
      {q:"Which tag makes a hyperlink?",o:["<link>","<a>","<href>","<url>"],a:1,e:"<a href=\"...\"> creates a clickable link."},
      {q:"Which input type shows a date picker?",o:['type="date"','type="calendar"','type="day"','type="picker"'],a:0,e:"Browsers show a native date picker for type=date."},
      {q:"What does <!DOCTYPE html> do?",o:["Adds a title","Tells the browser it's an HTML5 page","Imports CSS","Creates a comment"],a:1,e:"It switches the browser into standards mode."},
      {q:"Which tag defines a bullet list?",o:["<ol>","<ul>","<li>","<dl>"],a:1,e:"<ul> holds the bullets; each item is an <li>."},
      {q:"Which attribute makes a form field mandatory?",o:["mandatory","needed","required","must"],a:2,e:"The browser blocks submit until a required field is filled."},
      {q:"Which tag adds a line break?",o:["<br>","<lb>","<break>","<nl>"],a:0,e:"<br> is a self-closing tag."},
      {q:"Which element marks the page's main, unique content?",o:["<section>","<main>","<div>","<body>"],a:1,e:"Use <main> once per page."}
    ]},
    css: {name:"CSS",em:"🎨",c:"#8a6bff",d:"Layout, selectors & style",qs:[
      {q:"Which property changes text color?",o:["font-color","text-color","color","foreground"],a:2,e:"color sets the text color; background-color sets the fill."},
      {q:"Which display value creates a flexible row or column layout?",o:["flex","block","inline","table-cell"],a:0,e:"display:flex lines items up along one axis."},
      {q:"Which selector targets class \"card\"?",o:[".card","#card","card.","*card"],a:0,e:"A dot means class; # means id."},
      {q:"Which property rounds corners?",o:["corner-style","border-radius","round","border-curve"],a:1,e:"border-radius: 50% makes a circle."},
      {q:"What does box-sizing: border-box do?",o:["Adds a border","Includes padding and border in the width","Hides overflow","Centers the box"],a:1,e:"Sizes stay predictable when you add padding."},
      {q:"Which unit is relative to the viewport width?",o:["px","em","vw","pt"],a:2,e:"1vw is 1% of the viewport width."},
      {q:"Which property controls stacking order?",o:["layer","z-index","stack","order-z"],a:1,e:"Higher z-index sits on top (on positioned elements)."},
      {q:"Which pseudo-class styles an element under the mouse?",o:[":hover",":active",":focus",":over"],a:0,e:":hover applies while the pointer is over the element."},
      {q:"Which property adds space INSIDE an element's border?",o:["margin","padding","gap","spacing"],a:1,e:"margin is the space outside the border."},
      {q:"Which rule changes styles on small screens?",o:["@media","@screen-size","@responsive","@mobile"],a:0,e:"@media (max-width: 600px) { ... } applies only on narrow screens."}
    ]},
    web: {name:"Git & Web",em:"🌐",c:"#14a76c",d:"Git, browsers & the internet",qs:[
      {q:"Which Git command saves staged changes to history?",o:["git save","git commit","git push","git stage"],a:1,e:"A commit is a snapshot of your staged changes."},
      {q:"Which command copies a repository to your computer?",o:["git clone","git copy","git get","git download"],a:0,e:"git clone <url> downloads the whole project and history."},
      {q:"What does git push do?",o:["Uploads your commits to the remote","Downloads changes","Deletes a branch","Creates a repository"],a:0,e:"git pull is the one that brings changes down."},
      {q:"What does HTTP status 404 mean?",o:["Server crashed","Page not found","Success","Access forbidden"],a:1,e:"200 means OK; 404 means the resource wasn't found."},
      {q:"Which file lists files Git should ignore?",o:[".gitskip",".ignore",".gitignore","git.ignore"],a:2,e:"Great for secrets, databases and node_modules."},
      {q:"What does the S in HTTPS stand for?",o:["Speed","Secure","Server","Static"],a:1,e:"HTTPS encrypts traffic between browser and site."},
      {q:"What does URL stand for?",o:["Uniform Resource Locator","Universal Reference Link","User Request Layer","Unified Routing Language"],a:0,e:"It's the address of a resource on the web."},
      {q:"Which service can host a static site from a GitHub repo?",o:["GitHub Pages","GitHub Wiki","GitHub Sponsors","GitHub Discussions"],a:0,e:"Enable it under Settings > Pages."},
      {q:"Which browser tool inspects HTML, CSS and console errors?",o:["Task Manager","DevTools","Notepad","Terminal"],a:1,e:"Press F12 or right-click > Inspect."},
      {q:"What does a Git branch let you do?",o:["Speed up your PC","Work on changes separately from main","Delete history","Compress files"],a:1,e:"Branches let you experiment safely, then merge."}
    ]}
  };
  var ALL = [];
  Object.keys(CATS).forEach(function (k) { CATS[k].qs.forEach(function (q, n) { q.id = k + n; q.cat = k; ALL.push(q); }); });
  CATS.mix = {name:"Mixed Challenge",em:"🎲",c:"#4a7bff",d:"Random questions from every category",qs:ALL};
  var PRAISE = ["Correct!","Boom!","Nailed it!","Big brain!","Yes!"], OOPS = ["Not quite.","So close!","Shake it off!","Oops!"];
  function any(a) { return a[Math.floor(Math.random() * a.length)]; }
  var RANKS = [
    [90, "JavaScript Wizard 🧙", "Flawless instincts. Time to build something awesome."],
    [70, "Rising Developer 🚀", "Solid basics. A little more practice and you're there."],
    [40, "Getting There 💪", "Good start. Read the explanations below and try again."],
    [0, "Keep Practising 📚", "Everyone starts somewhere. Check the review and go again!"]
  ];
  var $ = function (id) { return document.getElementById(id); };
  var order, i, score, streak, bestStreak, log, left, timer, locked, t0, cat;

  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  function shuffle(a) {
    a = a.slice();
    for (var k = a.length - 1; k > 0; k--) { var j = Math.floor(Math.random() * (k + 1)); var t = a[k]; a[k] = a[j]; a[j] = t; }
    return a;
  }
  function show(id) {
    ["start", "quiz", "result"].forEach(function (s) { $(s).hidden = s !== id; });
    window.scrollTo(0, 0);
  }
  /** Build the category cards, each showing your best score. */
  function showBest() {
    var box = $("cats"); box.replaceChildren();
    Object.keys(CATS).forEach(function (k) {
      var C = CATS[k], b = +store.get("jsquiz.best." + k) || 0;
      var btn = document.createElement("button");
      btn.type = "button"; btn.className = "cat"; btn.style.setProperty("--c", C.c);
      var em = document.createElement("span"); em.className = "em"; em.textContent = C.em;
      var nm = document.createElement("strong"); nm.textContent = C.name;
      var ds = document.createElement("span"); ds.textContent = C.d;
      var bs = document.createElement("em"); bs.textContent = b ? "🏆 Best: " + b + "/" + ROUND : "▶ " + C.qs.length + " questions in the pool";
      btn.append(em, nm, ds, bs); btn.onclick = function () { start(k); }; box.append(btn);
    });
  }

  /** Draw n random questions, preferring ones not seen recently (remembered in this browser). */
  function pick(pool, n) {
    var seen = [];
    try { seen = JSON.parse(store.get("jsquiz.seen") || "[]"); } catch (e) {}
    var isSeen = function (q) { return seen.indexOf(q.id) >= 0 ? 1 : 0; };
    var chosen = shuffle(pool).sort(function (a, b) { return isSeen(a) - isSeen(b); }).slice(0, n);
    chosen.forEach(function (q) { if (!isSeen(q)) seen.push(q.id); });
    if (pool.every(isSeen)) seen = seen.filter(function (id) { return !pool.some(function (q) { return q.id === id; }); });
    store.set("jsquiz.seen", JSON.stringify(seen));
    return chosen;
  }

  function start(k) {
    cat = k || cat; order = pick(CATS[cat].qs, ROUND); i = 0; score = 0; streak = 0; bestStreak = 0; log = []; t0 = Date.now();
    show("quiz"); render();
  }

  /** Draw the current question and start its countdown. */
  function render() {
    var q = order[i]; locked = false;
    $("qCount").textContent = "Question " + (i + 1) + " of " + order.length;
    $("topic").textContent = CATS[q.cat].em + " " + CATS[q.cat].name;
    $("streak").textContent = streak > 1 ? "🔥 " + streak + " streak" : "";
    $("progress").style.width = (i / order.length * 100) + "%";
    $("qText").textContent = q.q;
    $("fb").hidden = true;
    q.opts = shuffle(q.o.map(function (text, k) { return { text: text, ok: k === q.a }; }));
    var box = $("opts"); box.replaceChildren();
    q.opts.forEach(function (o, k) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "opt";
      var l = document.createElement("b"); l.textContent = "ABCD"[k];
      var s = document.createElement("span"); s.textContent = o.text;
      b.append(l, s); b.onclick = function () { answer(k); }; box.append(b);
    });
    var c = $("card"); c.style.animation = "none"; void c.offsetWidth; c.style.animation = "";
    left = LIMIT; clearInterval(timer); tick(); timer = setInterval(tick, 100);
  }

  function tick() {
    $("timerFill").style.width = (left / LIMIT * 100) + "%";
    $("timerBar").classList.toggle("low", left <= 5);
    if (left <= 0) { answer(-1); return; }
    left = Math.round((left - 0.1) * 10) / 10;
  }

  /** k = chosen option index, or -1 when time runs out. */
  function answer(k) {
    if (locked) return;
    locked = true; clearInterval(timer);
    var q = order[i], ok = k >= 0 && q.opts[k].ok;
    Array.prototype.forEach.call($("opts").children, function (b, n) {
      b.disabled = true;
      if (q.opts[n].ok) b.classList.add("good"); else if (n === k) b.classList.add("bad");
    });
    if (ok) { score++; streak++; bestStreak = Math.max(bestStreak, streak); } else streak = 0;
    log.push({ q: q.q, ok: ok, ans: q.opts.filter(function (o) { return o.ok; })[0].text });
    $("streak").textContent = streak > 1 ? "🔥 " + streak + " streak" : "";
    $("fbText").textContent = (k < 0 ? "⏰ Time's up! " : ok ? "✅ " + any(PRAISE) + " " : "❌ " + any(OOPS) + " ") + q.e;
    $("nextBtn").textContent = i === order.length - 1 ? "See results →" : "Next →";
    $("fb").hidden = false; $("nextBtn").focus();
  }

  function next() { i++; if (i < order.length) render(); else finish(); }

  function finish() {
    var n = order.length, pct = Math.round(score / n * 100);
    var r = RANKS.filter(function (x) { return pct >= x[0]; })[0];
    show("result");
    $("ringText").textContent = pct + "%";
    $("ringFg").style.strokeDashoffset = 327;
    requestAnimationFrame(function () { requestAnimationFrame(function () { $("ringFg").style.strokeDashoffset = 327 * (1 - pct / 100); }); });
    $("rank").textContent = r[1]; $("rankMsg").textContent = CATS[cat].em + " " + CATS[cat].name + " · " + r[2];
    $("sCorrect").textContent = score + "/" + n;
    $("sStreak").textContent = bestStreak;
    $("sTime").textContent = Math.round((Date.now() - t0) / 1000) + "s";
    var list = $("review"); list.replaceChildren();
    log.forEach(function (x) {
      var li = document.createElement("li"); li.className = x.ok ? "ok" : "no"; li.textContent = x.q;
      var s = document.createElement("small"); s.textContent = (x.ok ? "✔ " : "✘ ") + "Answer: " + x.ans;
      li.append(s); list.append(li);
    });
    var bk = "jsquiz.best." + cat;
    if (score > (+store.get(bk) || 0)) store.set(bk, score);
    showBest();
    if (pct >= 70) confetti();
  }

  function confetti() {
    var colors = ["#f5b81c", "#2347b5", "#6a55e0", "#14a76c", "#e04860"];
    for (var k = 0; k < 45; k++) {
      var d = document.createElement("div"); d.className = "c";
      d.style.left = Math.random() * 100 + "vw"; d.style.background = colors[k % 5];
      d.style.animationDelay = Math.random() * .8 + "s";
      document.body.append(d); setTimeout(d.remove.bind(d), 4000);
    }
  }

  // Theme: remembers the choice if storage is available
  function setTheme(t) { document.documentElement.dataset.theme = t; $("themeBtn").textContent = t === "dark" ? "☀" : "☾"; store.set("jsquiz.theme", t); }
  var saved = store.get("jsquiz.theme");
  if (saved === "dark" || saved === "light") setTheme(saved);
  else $("themeBtn").textContent = matchMedia("(prefers-color-scheme: dark)").matches ? "☀" : "☾";
  $("themeBtn").onclick = function () {
    var cur = document.documentElement.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(cur === "dark" ? "light" : "dark");
  };

  $("again").onclick = function () { start(); };
  $("nextBtn").onclick = next;
  $("home").onclick = function () { showBest(); show("start"); };
  document.addEventListener("keydown", function (e) { // keys 1-4 pick an answer
    if (!$("quiz").hidden && !locked && /^[1-4]$/.test(e.key)) answer(+e.key - 1);
  });
  showBest();
})();
