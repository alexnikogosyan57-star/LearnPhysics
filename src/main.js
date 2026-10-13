import "@fontsource/noto-sans-armenian/400.css";
import "@fontsource/noto-sans-armenian/500.css";
import "@fontsource/noto-sans-armenian/600.css";
import "./style.css";
import {
  createIcons,
  Orbit,
  House,
  Route,
  FlaskConical,
  NotebookPen,
  ChartNoAxesCombined,
  VolumeX,
  HardDrive,
  X,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Clock3,
  CircleCheck,
  CircleDot,
  CircleDashed,
  Play,
  Pause,
  RotateCcw,
  GitCompareArrows,
  ChevronDown,
  Check,
  Lightbulb,
  LockKeyhole,
  Pencil,
  Trash2,
  Plus,
  Menu,
} from "lucide";
const icons = {
  Orbit,
  House,
  Route,
  FlaskConical,
  NotebookPen,
  ChartNoAxesCombined,
  VolumeX,
  HardDrive,
  X,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Clock3,
  CircleCheck,
  CircleDot,
  CircleDashed,
  Play,
  Pause,
  RotateCcw,
  GitCompareArrows,
  ChevronDown,
  Check,
  Lightbulb,
  LockKeyhole,
  Pencil,
  Trash2,
  Plus,
  Menu,
};
import { distance, advance, point } from "./physics";
import {
  navigation,
  stages,
  prediction,
  questions,
  assessment,
  roadmap,
} from "./content";
import { read, write } from "./storage";
import { scene } from "./scene";
import { renderMascot, mountMascots } from "./mascot";
let cleanupMascots = () => {};
let data = read();
data.unlockedStage = Math.max(data.unlockedStage || 0, data.stage);
let page = "home",
  speed = 2,
  duration = 5,
  time = 0,
  running = false,
  last = 0,
  raf,
  selected = null,
  hint = 0,
  feedback = "",
  quizIndex = 0,
  quizAnswers = [],
  editing = null,
  observationIndex = 0,
  graphOpen = false,
  runsOpen = false,
  compareId = null;
const $ = (s) => document.querySelector(s),
  num = (n) => Number(n.toFixed(1)).toLocaleString("hy-AM"),
  icon = (n) => `<i data-lucide="${n}"></i>`;
function save() {
  if (!write(data))
    $("#storage-warning").textContent =
      "Պահպանման համար բրաուզերի հիշողությունն անհասանելի է։";
}
function go(p) {
  stop();
  observationIndex = 0;
  page = p;
  selected = null;
  hint = 0;
  feedback = "";
  render();
  window.scrollTo(0, 0);
}
function companion(state = "greeting", text = "Եկ միասին պարզենք։") {
  return renderMascot(state, text);
}
function questionLayout(content, eventKey, caption) {
  return `<div class="question-layout">${content}${renderMascot("thinking", caption, eventKey)}</div>`;
}
function shell(body) {
  const active = page === "lesson" ? "path" : page;
  return `<a class="skip-link" href="#main-content">Անցնել բովանդակությանը</a><header class="site-header"><div class="header-inner"><a class="brand" href="#home" aria-label="Ֆիզիկան շուրջդ է՝ գլխավոր էջ"><span class="brand-symbol">${icon("orbit")}</span><span>Ֆիզիկան <span class="brand-second">շուրջդ է</span></span></a><button id="nav-toggle" class="icon-button nav-toggle" aria-label="Բացել բաժինները" aria-expanded="false" aria-controls="main-nav">${icon("menu")}</button><nav id="main-nav" aria-label="Հիմնական բաժիններ">${navigation.map(([id, label, i]) => `<button data-page="${id}" class="nav-item ${active === id ? "active" : ""}" ${active === id ? 'aria-current="page"' : ""}>${icon(i)}<span>${label}</span></button>`).join("")}</nav><button id="sound" class="icon-button sound-button" aria-label="Ձայնի կարգավորումներ">${icon("volume-x")}</button></div></header><div class="main-shell"><main id="main-content" tabindex="-1">${body}</main><footer><span>Ֆիզիկան շուրջդ է <span class="footer-dot">·</span> 9-րդ դասարան</span><span>${icon("hard-drive")} Քո գրառումները պահվում են այս սարքում</span></footer><p id="storage-warning" role="status"></p></div><dialog id="audio-dialog" aria-labelledby="audio-title"><button class="dialog-close icon-button" id="close-audio" aria-label="Փակել">${icon("x")}</button><span class="eyebrow">Ձայնի կարգավորումներ</span><h2 id="audio-title">Սովորելու հանգիստ միջավայր</h2><p>Բնական ձայնագրություններ այս տարբերակում դեռ չկան։ Բոլոր փորձերը լիարժեք աշխատում են առանց ձայնի։</p><label class="volume-label">Ձայնի մակարդակ <input id="volume" type="range" min="0" max="100" value="${localStorage.getItem("physics-volume") ?? 40}" aria-label="Ձայնի մակարդակ"></label><button class="button secondary" id="mute">${icon("volume-x")} Անջատել ձայնը</button><p class="audio-note">Այս կարգավորումը պահվում է ապագա ձայնային տարբերակի համար։</p></dialog>`;
}
function home() {
  const done = !!data.assessment;
  return `<section class="hero"><div class="hero-copy"><span class="eyebrow">Փոքր հարցերից՝ մեծ բացահայտումներ</span><h1>Բարև՛, հետազոտող։<br><span>Սկսենք մի «ինչո՞ւ»-ից։</span></h1><p>Այսօր պարզելու ենք՝ ինչպես են արագությունն ու ժամանակը փոխում ռոբոտի անցած ճանապարհը։</p><button class="button" data-page="lesson">${done ? "Վերադառնալ հետազոտությանը" : data.stage ? "Շարունակել հետազոտությունը" : "Սկսել հետազոտությունը"} ${icon("arrow-right")}</button><span class="hero-meta">${icon("clock-3")} 15–20 րոպե · քո տեմպով</span></div>${companion("greeting", data.mascotSeen ? "Պատրա՞ստ ես նոր փորձի։" : "Բարև՛։ Եկ միասին փորձենք։")}</section><section class="current-lesson"><div class="lesson-kicker"><span class="lesson-number">01</span><span>Քո ընթացիկ հետազոտությունը</span><span class="lesson-duration">${done ? "Ավարտված" : `Քայլ ${data.stage + 1} / 6`}</span></div><div class="lesson-focus"><div><h2>Փոքր ռոբոտի մեծ ճանապարհը</h2><p>Կանխատեսիր, փորձիր և բացահայտիր շարժման կապը։</p></div><span class="current-stage">${icon(done ? "circle-check" : "circle-dot")}${done ? "Հետազոտությունն ավարտված է" : stages[data.stage]}</span></div><div class="stage-progress" role="img" aria-label="Դասի ${data.stage + 1}-րդ քայլ՝ 6 քայլից">${stages.map((s, i) => `<span class="${i <= data.stage ? "filled" : ""}"></span>`).join("")}</div></section><div class="home-support"><section class="journal-preview"><span class="support-icon">${icon("notebook-pen")}</span><h3>Հետազոտողի տետր</h3>${data.notes.length ? `<p class="notebook-excerpt">«${escape(data.notes.at(-1).conclusion || data.notes.at(-1).observation || "Իմ առաջին դիտարկումը")}»</p>` : "<p>Լավ հարցը մի կորցրու։ Քո կանխատեսումներն ու բացահայտումները կմնան այստեղ։</p>"}<button class="text-button" data-page="notebook">${data.notes.length ? "Կարդալ վերջին գրառումը" : "Բացել տետրը"} ${icon("arrow-up-right")}</button></section><section class="experiment-preview"><span class="support-icon">${icon("flask-conical")}</span><h3>Իսկ եթե երկու անգամ արա՞գ</h3><p>Փոխիր միայն արագությունը։ Նույն ժամանակում ռոբոտն ավելի հեռու կհասնի՞։</p><button class="text-button" data-page="lab">Փորձել լաբորատորիայում ${icon("arrow-up-right")}</button></section></div>`;
}
function sim() {
  const latest = data.runs.at(-1);
  const comparison =
    data.runs.find((r) => r.id === compareId) || data.runs.at(-2) || latest;
  return `<section class="sim-panel" aria-label="Շարժման փորձ"><div class="scene-wrap"><div class="scene-heading"><span>${icon("flask-conical")} Հավասարաչափ շարժում</span><span class="status" id="sim-status" role="status">${time === duration ? "Փորձն ավարտված է" : running ? "Շարժվում է" : time ? "Դադարեցված" : "Պատրաստ է փորձին"}</span></div>${scene("lab", distance(speed, time) / 60)}<div class="readouts" aria-label="Փորձի կենդանի չափումներ"><div><span>Անցած ժամանակ</span><strong id="read-time">${num(time)} <small>վ</small></strong></div><div><span>Անցած ճանապարհ</span><strong id="read-distance">${num(distance(speed, time))} <small>մ</small></strong></div><div><span>Արագություն</span><strong id="read-speed">${num(speed)} <small>մ/վ</small></strong></div></div></div><div class="sim-controls"><div class="slider-field"><label for="speed">Արագություն <strong id="speed-label">${num(speed)} մ/վ</strong></label><input id="speed" type="range" min="1" max="6" step=".5" value="${speed}"><div class="range-extents"><span>1 մ/վ</span><span>6 մ/վ</span></div></div><div class="slider-field"><label for="duration">Տևողություն <strong id="duration-label">${duration} վ</strong></label><input id="duration" type="range" min="2" max="10" step="1" value="${duration}"><div class="range-extents"><span>2 վ</span><span>10 վ</span></div></div><div class="sim-actions"><button class="button" id="run">${icon(running ? "pause" : "play")} ${running ? "Դադարեցնել" : time && time < duration ? "Շարունակել" : "Սկսել փորձը"}</button><button class="icon-button reset-button" id="reset" aria-label="Փորձը սկսել սկզբից" title="Փորձը սկսել սկզբից">${icon("rotate-ccw")}</button></div></div><p class="control-note">Կարգավորումը փոխելիս ընթացիկ փորձը սկսվում է սկզբից։ Ավարտված փորձերը պահպանվում են։</p></section><div class="experiment-analysis"><details id="graph-details" ${graphOpen ? "open" : ""}><summary>${icon("chart-no-axes-combined")} Դիտել շարժման գրաֆիկը ${icon("chevron-down")}</summary><div class="graph-wrap"><div class="graph-header"><div><h3>Ճանապարհը՝ ժամանակից կախված</h3><p>Ավելի կտրուկ գիծ՝ ավելի մեծ արագություն։</p></div>${
    data.runs.length
      ? `<label class="compare-select">Համեմատել փորձի հետ<select id="compare-run"><option value="none" ${compareId === "none" ? "selected" : ""}>Միայն ընթացիկը</option>${data.runs
          .slice(-6)
          .map(
            (r, i) =>
              `<option value="${r.id}" ${compareId !== "none" && r.id === comparison?.id ? "selected" : ""}>${num(r.speed)} մ/վ · ${r.duration} վ → ${num(r.distance)} մ</option>`,
          )
          .join("")}</select></label>`
      : ""
  }</div><svg id="graph" viewBox="0 0 480 230" role="img" aria-label="Ճանապարհի և ժամանակի գրաֆիկ">${graph()}</svg><div class="graph-legend"><span><b class="legend-current"></b> Ընթացիկ փորձ</span>${data.runs.length && compareId !== "none" ? '<span><b class="legend-previous"></b> Ընտրված փորձ</span>' : ""}</div></div></details><details id="runs-details" ${runsOpen ? "open" : ""}><summary>${icon("git-compare-arrows")} Համեմատել արդյունքները <span class="run-count">${data.runs.length} փորձ</span>${icon("chevron-down")}</summary><section class="runs">${
    data.runs.length
      ? `<p class="comparison-intro">Փոխիր մեկ մեծություն, ապա համեմատիր անցած ճանապարհները։</p><div class="table-scroll"><table><thead><tr><th>Փորձ</th><th>Արագություն</th><th>Ժամանակ</th><th>Ճանապարհ</th></tr></thead><tbody>${data.runs
          .slice(-6)
          .map(
            (r, i) =>
              `<tr><td>${Math.max(0, data.runs.length - 6) + i + 1}</td><td>${num(r.speed)} մ/վ</td><td>${r.duration} վ</td><td>${num(r.distance)} մ</td></tr>`,
          )
          .join("")}</tbody></table></div>`
      : "<p>Այստեղ կտեսնես ավարտված փորձերը։ Սկսիր առաջինից։</p>"
  }</section></details></div>`;
}
function graph() {
  const comparison =
    compareId === "none"
      ? null
      : data.runs.find((r) => r.id === compareId) ||
        data.runs.at(-2) ||
        data.runs.at(-1);
  const max = Math.max(
      10,
      Math.ceil(Math.max(speed * duration, comparison?.distance || 0) / 10) *
        10,
    ),
    td = Math.max(duration, comparison?.duration || 0),
    p = point(speed, time, td, max);
  return `<text x="17" y="20" font-size="16">s (մ)</text>${[0, max / 3, (max * 2) / 3, max].map((v) => `<path d="M52 ${170 - (v / max) * 140}h400" stroke="#dddfd4"/><text x="42" y="${175 - (v / max) * 140}" text-anchor="end" font-size="14">${num(v)}</text>`).join("")}${Array.from(
    { length: 6 },
    (_, i) => (td * i) / 5,
  )
    .map(
      (v) =>
        `<text x="${52 + (v / td) * 400}" y="197" text-anchor="middle" font-size="14">${num(v)}</text>`,
    )
    .join(
      "",
    )}<path d="M52 30v140h400" stroke="#87917a" fill="none"/><text x="428" y="223" font-size="15">t (վ)</text>${
    comparison
      ? (() => {
          const prev = point(comparison.speed, comparison.duration, td, max);
          return `<path d="M52 170 L${prev.x} ${prev.y}" stroke="#b56b50" stroke-width="2" stroke-dasharray="6 5" fill="none"/>`;
        })()
      : ""
  }<path d="M52 170 L${p.x} ${p.y}" stroke="#58634d" stroke-width="3" fill="none"/><circle cx="${p.x}" cy="${p.y}" r="4" fill="#58634d"/>`;
}
function observation() {
  if (observationIndex >= questions.length)
    return `<div class="story"><span class="eyebrow">Քո հաջորդ գիտական քայլը</span><h2>Իսկ ինչպե՞ս կստուգես սա։</h2><p>Մի նոր փորձ առաջարկիր։ Նշիր՝ ինչ ես փոխելու, և ինչն է մնալու նույնը։</p><label class="field-label" for="verify">Իմ փորձի ծրագիրը</label><textarea id="verify" placeholder="Փոխելու եմ միայն…">${escape(data.verification || "")}</textarea><button id="next-stage" class="button">Բացահայտել կապը ${icon("arrow-right")}</button></div>`;
  const i = observationIndex,
    q = questions[i],
    answer = data.answers[i],
    correct = answer === q.correct;
  return questionLayout(
    `<div class="story observation-story"><span class="eyebrow">Դիտարկում ${i + 1} / ${questions.length}</span><h2>${q.q}</h2><p>Մտածիր քո կատարած փորձերի մասին։</p>${q.options.map((o, j) => `<button class="answer ${answer === j ? "selected" : ""}" data-observe="${i}:${j}" ${correct ? "disabled" : ""}>${o}${answer === j ? icon(correct ? "check" : "circle-dot") : ""}</button>`).join("")}${answer !== undefined ? `<p class="feedback ${correct ? "correct" : ""}" role="status">${correct ? "Ճիշտ է։ " + q.why : "Վերադառնանք փորձին։ " + q.hints[Math.min(hint, 2)]}</p>${!correct && hint < 2 ? `<button class="text-button" data-hint="${i}">${icon("lightbulb")} Հաջորդ հուշումը</button>` : ""}` : ""}${correct ? '<button id="next-observation" class="button">Շարունակել ' + icon("arrow-right") + "</button>" : ""}<button class="text-button revisit" id="revisit-experiment">${icon("flask-conical")} Նորից դիտել փորձը</button></div>`,
    `motion:observation:${i}:hint:${hint}`,
    "Մտածիր քո փորձերի մասին։",
  );
}
function lesson() {
  let s = data.stage;
  return `<div class="lesson-top"><button class="text-button" data-page="path">${icon("arrow-left")} Ուսումնական ուղի</button><div class="lesson-stage">Քայլ ${s + 1} / 6 <span>·</span> ${stages[s]}</div><label class="stage-picker">Վերադառնալ քայլին<select id="stage-select" aria-label="Վերադառնալ դասի քայլին">${stages
    .slice(0, data.unlockedStage + 1)
    .map(
      (name, i) =>
        `<option value="${i}" ${i === s ? "selected" : ""}>${name}</option>`,
    )
    .join(
      "",
    )}</select></label></div>${heading("Հետազոտություն 01", "Փոքր ռոբոտի մեծ ճանապարհը", s === 2 ? "Փոխիր արագությունը։ Նույն ժամանակում որքա՞ն հեռու կհասնի ռոբոտը։" : "Կանխատեսիր։ Փորձիր։ Գտիր քո բացատրությունը։")}<section class="lesson-content">${s === 0 ? `<div class="intro-layout"><div class="story"><span class="eyebrow">Սկսենք մի իրավիճակից</span><h2>Առաքումը սպասում է միջանցքի վերջում։</h2><p>Ռոբոտը փաթեթ է տանում։ Նա կարող է շարժվել տարբեր արագություններով։ Իսկ եթե նրան ավելի արագ շարժվելու հրահանգ տա՞ս։</p><button id="next-stage" class="button">Անել կանխատեսում ${icon("arrow-right")}</button></div>${companion("thinking", "Ի՞նչ ես կարծում՝ ավելի արագ նշանակում է ավելի հեռո՞ւ։")}</div>${scene("intro")}` : s === 1 ? questionLayout(`<div class="story"><span class="eyebrow">Նախ մտածիր, հետո փորձիր</span><h2>Իսկ եթե ռոբոտը երկու անգամ արագ շարժվի՞։</h2><p>Շարժման ժամանակը նույնն է մնում։ Ի՞նչ կլինի անցած ճանապարհի հետ։</p>${prediction.map((o, i) => `<button class="answer ${data.prediction === i ? "selected" : ""}" data-predict="${i}"><span>${String.fromCharCode(1329 + i)}</span>${o}${data.prediction === i ? icon("check") : ""}</button>`).join("")}${data.prediction !== null ? '<p class="feedback" role="status">Կանխատեսումը գրանցված է։ Հիմա ստուգենք այն փորձով։</p><button id="next-stage" class="button">Ստուգել լաբորատորիայում ' + icon("arrow-right") + "</button>" : ""}</div>`, "motion:prediction", "Նախ մտածիր, հետո ընտրիր։") : s === 2 ? `${sim()}<div class="stage-bottom"><div><span class="eyebrow">Քո հաջորդ քայլը</span><p>Համեմատիր 2 մ/վ և 4 մ/վ արագությունները նույն՝ 5 վ տևողությամբ։</p></div><button id="next-stage" class="button secondary" ${!data.runs.length ? "disabled" : ""}>Գրանցել դիտարկումը ${icon("arrow-right")}</button></div>` : s === 3 ? observation() : s === 4 ? explanation() : application()}</section>`;
}
function bindRedesign() {
  $("#nav-toggle").onclick = () => {
    const expanded = $("#nav-toggle").getAttribute("aria-expanded") === "true";
    $("#nav-toggle").setAttribute("aria-expanded", String(!expanded));
    $("#nav-toggle").setAttribute(
      "aria-label",
      expanded ? "Բացել բաժինները" : "Փակել բաժինները",
    );
    $("#main-nav").classList.toggle("mobile-open", !expanded);
  };
  $("#graph-details")?.addEventListener("toggle", (e) => {
    graphOpen = e.target.open;
  });
  $("#runs-details")?.addEventListener("toggle", (e) => {
    runsOpen = e.target.open;
  });
  $("#compare-run")?.addEventListener("change", (e) => {
    compareId = e.target.value;
    $("#graph").innerHTML = graph();
    $("#graph").setAttribute(
      "aria-label",
      `Ճանապարհը՝ ${num(distance(speed, time))} մ, ժամանակը՝ ${num(time)} վ։`,
    );
    const previous = $(".legend-previous")?.parentElement;
    if (previous) previous.hidden = compareId === "none";
    else if (compareId !== "none")
      $(".graph-legend").insertAdjacentHTML(
        "beforeend",
        '<span><b class="legend-previous"></b> Ընտրված փորձ</span>',
      );
  });
  $("#stage-select")?.addEventListener("change", (e) => {
    stop();
    data.stage = Number(e.target.value);
    observationIndex = 0;
    hint = 0;
    save();
    render();
  });
  $("#next-observation")?.addEventListener("click", () => {
    observationIndex++;
    hint = 0;
    render();
  });
  $("#revisit-experiment")?.addEventListener("click", () => {
    data.stage = 2;
    save();
    render();
  });
  $("#verify")?.addEventListener("input", (e) => {
    data.verification = e.target.value;
    save();
  });
  $("#conclusion")?.addEventListener("input", (e) => {
    data.conclusion = e.target.value;
    save();
  });
  if (page === "home" && !data.mascotSeen) {
    data.mascotSeen = true;
    save();
  }
}

function heading(k, title, sub, action = "") {
  return `<div class="page-heading"><div><span class="eyebrow">${k}</span><h1>${title}</h1><p>${sub}</p></div>${action}</div>`;
}
function path() {
  return (
    heading(
      "ՔԱՅԼ ԱՌ ՔԱՅԼ",
      "Քո ուսուցման ուղին",
      "Սկզբում՝ փորձը։ Հետո՝ բացատրությունը։",
    ) +
    `<section class="path-first"><span class="lesson-number">01</span><div><span class="eyebrow">ՀԱՍԱՆԵԼԻ ՀԵՏԱԶՈՏՈՒԹՅՈՒՆ</span><h2>Շարժում, ճանապարհ, ժամանակ</h2><p>Առաքման ռոբոտի օգնությամբ բացահայտիր հավասարաչափ շարժումը։</p><button class="button" data-page="lesson">${data.assessment ? "Վերադառնալ դասին" : "Շարունակել"} ${icon("arrow-right")}</button></div></section><h3 class="roadmap-title">Հետագա ուսումնասիրությունների քարտեզ</h3><p class="muted">Նախնական թեմատիկ ծրագիր է, ոչ պաշտոնական ուսումնական պլանի հաստատում։ Այս դասերը դեռ մշակման փուլում են։</p><div class="roadmap">${roadmap.map((s, i) => `<div><span>0${i + 2}</span><h3>${s}</h3><small>${icon("lock-keyhole")} Նախապատրաստվում է</small></div>`).join("")}</div>`
  );
}
function explanation() {
  const r = data.runs.at(-1) || { speed: 2, duration: 5, distance: 10 };
  return `<div class="story"><span class="eyebrow">ՔՈ ՓՈՐՁԻ ԱՊԱՑՈՒՅՑԸ</span><h2>Երեք մեծություն։ Մի պարզ կապ։</h2><p>Հաստատուն արագությամբ շարժվելիս անցած ճանապարհը գտնում ենք արագությունը բազմապատկելով ժամանակով։</p><div class="formula"><div><strong>s</strong><span>ճանապարհ, մ</span></div><b>=</b><div><strong>v</strong><span>արագություն, մ/վ</span></div><b>×</b><div><strong>t</strong><span>ժամանակ, վ</span></div></div><div class="evidence"><span>ՔՈ ՎԵՐՋԻՆ ՓՈՐՁԸ</span><h3>${num(r.speed)} մ/վ × ${r.duration} վ = ${num(r.distance)} մ</h3><p>Ամեն վայրկյան՝ ${num(r.speed)} մետր։ ${r.duration} վայրկյանում՝ ${num(r.distance)} մետր։</p></div><details><summary>Ավելի մանրամասն՝ միջին արագության մասին</summary><p>Միջին արագությունը ամբողջ անցած ճանապարհի և ամբողջ ժամանակի հարաբերությունն է՝ v<sub>միջ</sub> = s / t։ Հավասարաչափ շարժման դեպքում այն հավասար է հաստատուն արագությանը։ Եթե ճանապարհին կանգնես, կանգառի ժամանակն էլ պետք է հաշվել։</p></details><button id="next-stage" class="button">Փորձել նոր իրավիճակում ${icon("arrow-right")}</button></div>`;
}
function application() {
  if (data.assessment)
    return `<div class="story"><span class="eyebrow">ՀԵՏԱԶՈՏՈՒԹՅՈՒՆԸ ԱՎԱՐՏՎԱԾ Է</span><h2>Դու արդեն մտածում ես որպես հետազոտող։</h2><p>Առաջին փորձից ճիշտ պատասխաններ՝ ${data.assessment.score} / 3։ Դու կանխատեսեցիր, փորձ կատարեցիր և բացատրեցիր կապը։ ${data.assessment.score < 3 ? "Վերանայիր ժամանակի և ճանապարհի կապը՝ նոր փորձով։" : "Այժմ կարող ես կապը կիրառել նոր իրավիճակներում։"}</p><div class="evidence"><h3>Ի՞նչ ցույց տվեցիր</h3><p>Հաստատուն արագությամբ՝ s = v × t։ Միջին արագությունը գտնելու համար հաշվում ենք ամբողջ ժամանակը։</p></div><label class="field-label" for="conclusion">Քո վերջնական եզրակացությունը</label><textarea id="conclusion" placeholder="Այս փորձից հասկացա, որ…">${escape(data.conclusion || "")}</textarea><button class="button" id="save-lesson">Պահպանել տետրում ${icon("notebook-pen")}</button><button class="text-button" id="retry-quiz">Կրկին ստուգել գիտելիքը</button><p id="note-status" role="status"></p></div>`;
  const q = assessment[quizIndex];
  return questionLayout(
    `<div class="story"><span class="eyebrow">ԿԻՐԱՌԻՐ ԻՆՔՆՈՒՐՈՒՅՆ · ${quizIndex + 1} / 3</span><h2>${quizIndex === 0 ? "Ռոբոտից՝ հեծանիվ։ Նույն կապը։" : "Մտածիր ամբողջ իրավիճակի մասին։"}</h2><p>${q.q}</p>${q.options.map((o, i) => `<button class="answer ${selected === i ? "selected" : ""}" data-quiz="${i}">${o}</button>`).join("")}<p class="feedback" role="status">${feedback}</p>${feedback && !feedback.startsWith("Ճիշտ") && hint < 2 ? '<button class="text-button" id="quiz-hint">' + icon("lightbulb") + " Հաջորդ հուշումը</button>" : ""}<button class="button" id="submit-quiz" ${selected === null ? "disabled" : ""}>${feedback.startsWith("Ճիշտ") ? "Հաջորդը" : "Ստուգել պատասխանը"} ${icon("arrow-right")}</button></div>`,
    `motion:assessment:${quizIndex}:hint:${hint}`,
    "Մի շտապիր։ Ի՞նչ է ասում իրավիճակը։",
  );
}
function notebook() {
  return (
    heading(
      "ՔՈ ԳԻՏԱԿԱՆ ՀԵՏՔԸ",
      "Հետազոտական տետր",
      "Պահպանիր հարցերդ, ապացույցներդ և այն, ինչ հասկացար։",
      '<button class="button" id="new-note">' +
        icon("plus") +
        " Նոր գրառում</button>",
    ) +
    `<div class="notebook-layout"><div class="journal-margin"><span>01</span><p>Շարժում և<br>արագություն</p><small>${data.notes.length} գրառում</small></div><div>${editing !== null ? noteForm() : ""}${
      data.notes.length
        ? data.notes
            .map(
              (n) =>
                `<article class="note"><div class="section-title"><span class="eyebrow">${new Date(n.created).toLocaleDateString("hy-AM")} · ՀԵՏԱԶՈՏՈՒԹՅՈՒՆ 01</span><div><button class="icon-button" data-edit="${n.id}" aria-label="Խմբագրել գրառումը">${icon("pencil")}</button><button class="icon-button" data-delete="${n.id}" aria-label="Ջնջել գրառումը">${icon("trash-2")}</button></div></div><h3>Շարժում, ճանապարհ, ժամանակ</h3>${[
                  ["Կանխատեսում", n.prediction],
                  ["Փորձի կարգավորումներ", n.settings],
                  ["Դիտարկում", n.observation],
                  ["Բացատրություն", n.explanation],
                  ["Եզրակացություն", n.conclusion],
                ]
                  .map(
                    ([l, v]) =>
                      `<div class="note-field"><span>${l}</span><p>${escape(v) || "Դեռ չի լրացվել"}</p></div>`,
                  )
                  .join("")}</article>`,
            )
            .join("")
        : '<div class="notebook-empty">' +
          icon("notebook-pen") +
          '<h2>Այստեղ կմնան քո բացահայտումները։</h2><p>Սկսիր փորձից կամ ստեղծիր առաջին գրառումդ։</p><button class="text-button" data-page="lesson">Սկսել հետազոտությունը →</button></div>'
    }</div></div>`
  );
}
function noteForm() {
  const n = data.notes.find((n) => n.id === editing) || {};
  return `<form id="note-form" class="note"><h3>${n.id ? "Խմբագրել գրառումը" : "Նոր հետազոտական գրառում"}</h3>${[
    ["prediction", "Կանխատեսում"],
    ["settings", "Փորձի կարգավորումներ"],
    ["observation", "Դիտարկում"],
    ["explanation", "Բացատրություն"],
    ["conclusion", "Եզրակացություն"],
  ]
    .map(
      ([k, l]) =>
        `<label class="field-label" for="note-${k}">${l}</label><textarea id="note-${k}" name="${k}">${escape(n[k] || "")}</textarea>`,
    )
    .join(
      "",
    )}<button class="button" type="submit">Պահպանել</button><button class="text-button" id="cancel-note" type="button">Չեղարկել</button></form>`;
}
function progress() {
  const correct = questions.filter(
    (q, i) => data.answers[i] === q.correct,
  ).length;
  return (
    heading(
      "ԱՊԱՑՈՒՅՑԻ ՎՐԱ ՀԻՄՆՎԱԾ",
      "Իմ առաջընթացը",
      "Կարևոր է ոչ թե արագ ավարտել, այլ հասկանալ։",
    ) +
    `<div class="progress-stats"><div><strong>${data.assessment ? 1 : 0}</strong><span>Ավարտված հետազոտություն</span></div><div><strong>${data.runs.length}</strong><span>Կատարված փորձ</span></div><div><strong>${data.notes.length}</strong><span>Գրառում տետրում</span></div></div><section class="note"><h2>Շարժում և արագություն</h2>${questions.map((q, i) => `<div class="concept">${icon(data.answers[i] === q.correct ? "circle-check" : "circle-dashed")}<span>${["Արագության և ճանապարհի կապը", "Ժամանակի և ճանապարհի կապը", "Հաստատուն արագություն"][i]}</span><small>${data.answers[i] === q.correct ? "Ցույց ես տվել" : "Դեռ ուսումնասիրելու ենք"}</small></div>`).join("")}<p>${data.assessment ? `Գիտելիքի ստուգում՝ ${data.assessment.score} / 3 ճիշտ պատասխան առաջին փորձից։` : "Գիտելիքի ստուգումը դեռ չի կատարվել։"}</p>${data.assessment?.score < 3 ? '<p class="feedback">Լրացուցիչ փորձիր կանգառով շարժման միջին արագության հարցը։</p>' : ""}<button class="button" data-page="lesson">Վերադառնալ հետազոտությանը ${icon("arrow-right")}</button></section><section class="runs"><h3>Վերջին փորձերը</h3>${
      data.runs
        .slice(-4)
        .reverse()
        .map(
          (r) =>
            `<div class="recent-run">${icon("flask-conical")}<span>${num(r.speed)} մ/վ · ${r.duration} վ</span><strong>${num(r.distance)} մ</strong></div>`,
        )
        .join("") || '<p class="muted">Առաջին փորձը դեռ առջևում է։</p>'
    }</section>`
  );
}
function escape(v) {
  return String(v ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}
function render() {
  cleanupMascots();
  $("#app").innerHTML = shell(
    {
      home,
      path,
      lab: () =>
        heading(
          "ՓՈՐՁԻՐ ԵՎ ՀԱՄԵՄԱՏԻՐ",
          "Ինտերակտիվ լաբորատորիա",
          "Մի անգամ փոխիր մեկ մեծություն։ Դիտիր, թե ինչ է տեղի ունենում։",
        ) + sim(),
      lesson,
      notebook,
      progress,
    }[page](),
  );
  createIcons({ icons });
  bind();
  bindRedesign();
  cleanupMascots = mountMascots($("#app"));
}
function stop() {
  running = false;
  cancelAnimationFrame(raf);
}
function reset() {
  stop();
  time = 0;
  updateSim();
}
function updateSim() {
  if (!$("#read-time")) return;
  $("#read-time").innerHTML = `${num(time)} <small>վ</small>`;
  $("#read-distance").innerHTML =
    `${num(distance(speed, time))} <small>մ</small>`;
  $("#read-speed").innerHTML = `${num(speed)} <small>մ/վ</small>`;
  $("#robot-lab").setAttribute(
    "transform",
    `translate(${110 + (distance(speed, time) / 60) * 680} 270)`,
  );
  $("#graph").innerHTML = graph();
  $("#graph").setAttribute(
    "aria-label",
    `Ճանապարհը՝ ${num(distance(speed, time))} մ, ժամանակը՝ ${num(time)} վ։`,
  );
  const status =
    time === duration
      ? "Փորձն ավարտված է"
      : running
        ? "Շարժվում է"
        : time
          ? "Դադարեցված"
          : "Պատրաստ է փորձին";
  if ($("#sim-status").textContent !== status)
    $("#sim-status").textContent = status;
  $("#run").innerHTML =
    icon(running ? "pause" : "play") +
    " " +
    (running
      ? "Դադարեցնել"
      : time && time < duration
        ? "Շարունակել"
        : "Սկսել փորձը");
  createIcons({ icons, root: $("#run") });
}
function tick(now) {
  if (!running) return;
  time = advance(time, (now - last) / 1000, duration);
  last = now;
  if (time >= duration) {
    stop();
    data.runs.push({
      id: crypto.randomUUID(),
      speed,
      duration,
      distance: distance(speed, duration),
      created: Date.now(),
    });
    save();
    render();
    return;
  }
  updateSim();
  raf = requestAnimationFrame(tick);
}
function bind() {
  document
    .querySelectorAll("[data-page]")
    .forEach((b) => (b.onclick = () => go(b.dataset.page)));
  $(".brand").onclick = (e) => {
    e.preventDefault();
    go("home");
  };
  $("#sound").onclick = () => $("#audio-dialog").showModal();
  $("#close-audio").onclick = () => $("#audio-dialog").close();
  $("#volume").oninput = (e) =>
    localStorage.setItem("physics-volume", e.target.value);
  $("#mute").onclick = () => {
    $("#volume").value = 0;
    localStorage.setItem("physics-volume", "0");
  };
  $("#run")?.addEventListener("click", () => {
    if (running) {
      stop();
      updateSim();
    } else {
      if (time >= duration) time = 0;
      running = true;
      last = performance.now();
      updateSim();
      raf = requestAnimationFrame(tick);
    }
  });
  $("#reset")?.addEventListener("click", reset);
  for (const key of ["speed", "duration"])
    $("#" + key)?.addEventListener("input", (e) => {
      if (key === "speed") speed = Number(e.target.value);
      else duration = Number(e.target.value);
      reset();
      $("#" + key + "-label").textContent =
        num(key === "speed" ? speed : duration) +
        (key === "speed" ? " մ/վ" : " վ");
    });
  $("#next-stage")?.addEventListener("click", () => {
    if ($("#verify")) data.verification = $("#verify").value;
    data.stage = Math.min(5, data.stage + 1);
    observationIndex = 0;
    data.unlockedStage = Math.max(data.unlockedStage, data.stage);
    save();
    hint = 0;
    render();
    window.scrollTo(0, 0);
  });
  document.querySelectorAll("[data-stage]").forEach(
    (b) =>
      (b.onclick = () => {
        stop();
        data.stage = Number(b.dataset.stage);
        observationIndex = 0;
        save();
        render();
      }),
  );
  document.querySelectorAll("[data-predict]").forEach(
    (b) =>
      (b.onclick = () => {
        data.prediction = Number(b.dataset.predict);
        save();
        render();
      }),
  );
  document.querySelectorAll("[data-observe]").forEach(
    (b) =>
      (b.onclick = () => {
        if ($("#verify")) data.verification = $("#verify").value;
        let [i, j] = b.dataset.observe.split(":").map(Number);
        data.answers[i] = j;
        hint = 0;
        save();
        render();
      }),
  );
  document.querySelectorAll("[data-hint]").forEach(
    (b) =>
      (b.onclick = () => {
        hint++;
        render();
      }),
  );
  document.querySelectorAll("[data-quiz]").forEach(
    (b) =>
      (b.onclick = () => {
        selected = Number(b.dataset.quiz);
        feedback = "";
        render();
      }),
  );
  $("#quiz-hint")?.addEventListener("click", () => {
    hint = Math.min(2, hint + 1);
    feedback = [
      "Հուշում. նախ առանձնացրու ճանապարհն ու ամբողջ ժամանակը։",
      "Հուշում. ճանապարհը = արագություն × ժամանակ։ Միջին արագությունը = ամբողջ ճանապարհ / ամբողջ ժամանակ։",
      "Լուծում. " +
        [
          "4 × 5 = 20 մ։",
          "2 × 10 = 20 մ, իսկ 2 × 5 = 10 մ։",
          "10 մ / (5 վ + 5 վ) = 1 մ/վ։",
        ][quizIndex],
    ][Math.min(hint, 2)];
    render();
  });
  $("#submit-quiz")?.addEventListener("click", () => {
    let q = assessment[quizIndex];
    if (feedback.startsWith("Ճիշտ")) {
      quizIndex++;
      selected = null;
      feedback = "";
      hint = 0;
      if (quizIndex === 3) {
        data.assessment = {
          score: quizAnswers.filter(Boolean).length,
          created: Date.now(),
        };
        quizIndex = 0;
        save();
      }
      render();
      return;
    }
    if (quizAnswers[quizIndex] === undefined)
      quizAnswers[quizIndex] = selected === q.correct;
    if (selected === q.correct)
      feedback =
        "Ճիշտ է։ " +
        [
          "4 մ/վ × 5 վ = 20 մ։",
          "Արագությունը նույնն է, ժամանակը՝ երկու անգամ ավելի երկար։",
          "Կանգառը նույնպես ներառվում է ամբողջ ժամանակի մեջ։",
        ][quizIndex];
    else
      feedback =
        "Մտածենք նորից։ " +
        [
          "Ամեն վայրկյան անցնում է 4 մետր։",
          "Համեմատիր քայլելու տևողությունները։",
          "Հաշվի առ նաև կանգառի 5 վայրկյանը։",
        ][quizIndex];
    render();
  });
  $("#retry-quiz")?.addEventListener("click", () => {
    data.assessment = null;
    quizIndex = 0;
    quizAnswers = [];
    save();
    render();
  });
  $("#save-lesson")?.addEventListener("click", () => {
    data.conclusion = $("#conclusion").value;
    const r = data.runs.at(-1);
    data.notes.push({
      id: crypto.randomUUID(),
      created: Date.now(),
      prediction: prediction[data.prediction] || "",
      settings: r ? `${r.speed} մ/վ, ${r.duration} վ, ${r.distance} մ` : "",
      observation:
        data.verification ||
        "Արագությունն ու տևողությունն ազդում են անցած ճանապարհի վրա։",
      explanation: "Հաստատուն արագությամբ՝ s = v × t։",
      conclusion: data.conclusion,
    });
    save();
    $("#note-status").textContent = "Գրառումը պահպանվել է հետազոտական տետրում։";
    $("#note-status").classList.add("saved");
    $("#save-lesson").disabled = true;
  });
  $("#new-note")?.addEventListener("click", () => {
    editing = "new";
    render();
  });
  $("#cancel-note")?.addEventListener("click", () => {
    editing = null;
    render();
  });
  document.querySelectorAll("[data-edit]").forEach(
    (b) =>
      (b.onclick = () => {
        editing = b.dataset.edit;
        render();
      }),
  );
  document.querySelectorAll("[data-delete]").forEach(
    (b) =>
      (b.onclick = () => {
        if (confirm("Ջնջե՞լ այս գրառումը։")) {
          data.notes = data.notes.filter((n) => n.id !== b.dataset.delete);
          save();
          render();
        }
      }),
  );
  $("#note-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    let fields = Object.fromEntries(new FormData(e.target)),
      old = data.notes.find((n) => n.id === editing);
    if (old) Object.assign(old, fields);
    else
      data.notes.push({
        ...fields,
        id: crypto.randomUUID(),
        created: Date.now(),
      });
    editing = null;
    save();
    render();
  });
}
render();
