import {resetLessonAttempt,lessonCompleted,requestExitDialog} from "./learning/session.js";
import {captureFocus,restoreFocus} from "./ui/focus.js";
import {investigations} from './science/content';
import "@fontsource/noto-sans-armenian/400.css";
import "@fontsource/noto-sans-armenian/500.css";
import "@fontsource/noto-sans-armenian/600.css";
import "./style.css";
import "./ui/academy.css";
import "@fontsource/noto-sans-armenian/700.css";
import {
  createIcons,
  Orbit,
  House,
  Route,
  FlaskConical,
  NotebookPen,
  ChartNoAxesCombined,
  VolumeX,
  Volume2,
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
  Volume2,
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
import { distance, advance, point, wheelAngle } from "./physics";
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
import {
  animate,
  animateRender,
  animateDisclosure,
  animateSaved,
} from "./motion";
import { electricLessons, physicsTopics } from "./electricity/content";
import { createJourney } from "./electricity/journey";
import { dialogue, guidedContent } from "./dialogue";
import { renderMascot, mountMascots, updateMascotLayout, greetingHasStarted } from "./mascot";
import { audioState, enableSound, muteSound, setVolume, playSound } from "./audio";
import {topics} from './learning/topics';
import {initializeProgress,canOpen,recordResult,nextLesson,starsMarkup,starsFor} from './learning/progression';
import {topicView,pathView,masteryProgress,pathContextView} from './learning/views';
import {foundations} from './learning/foundations-content';
let assessmentAttempt = Date.now();
let cleanupMascots = () => {};
let cleanupExperiments = () => {};
let data = read();
const navigationType=performance.getEntriesByType('navigation')[0]?.type;
if(data.lessonSession && navigationType!=='reload')resetLessonAttempt(data,data.lessonSession.id);
initializeProgress(data, topics);
data.learning.selectedTopic ||= topics.find(t=>t.lessons.some(l=>l.id===data.currentLesson))?.id || 'electricity';
write(data);
const journey = createJourney(() => data, save, render);
data.unlockedStage = Math.max(data.unlockedStage || 0, data.stage);
let page = "path",
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
  observationSelection = null,
  graphOpen = false,
  runsOpen = false,
  compareId = null;
const $ = (s) => document.querySelector(s),
  num = (n) => Number(n.toFixed(1)).toLocaleString("hy-AM"),
  icon = (n) => `<i data-lucide="${n}"></i>`;
function save() {
  if (!write(data) && $("#storage-warning"))
    $("#storage-warning").textContent =
      "Պահպանման համար բրաուզերի հիշողությունն անհասանելի է։";
}
function activeLesson(){return page==='lesson'?'motion':page==='electric'?data.currentLesson:null;}
function finishLessonSession(){
 const id=activeLesson();if(!id)return;
 stop();cleanupExperiments();cleanupExperiments=()=>{};
 resetLessonAttempt(data,id);
 speed=2;duration=5;time=0;quizIndex=0;quizAnswers=[];assessmentAttempt=Date.now();save();
}
function requestLessonExit(action){
 const id=activeLesson();if(!id){action();return;}
 if($('#lesson-exit-dialog'))return;
 const leave=()=>{finishLessonSession();action();};
 if(lessonCompleted(data,id))leave();else requestExitDialog(leave);
}
function openModule(id,approved=false) {
 if(activeLesson()&&!approved){
  if(activeLesson()===id)return true;
  requestLessonExit(()=>openModule(id,true));return false;
 }
 const topic=topics.find(t=>t.lessons.some(l=>l.id===id));
 if(!canOpen(data,id,topics)){if(topic)data.learning.selectedTopic=topic.id;save();go('path',true);return false;}
 data.learning.selectedTopic=topic.id;save();
 if(id==='motion')go('lesson',true);else if(journey.open(id))go('electric',true);
 data.lessonSession={id,started:Date.now()};save();
 history.replaceState(null,'',`#lesson/${id}`);return true;
}
function go(p,approved=false) {
  const target=p==='lab'?'lesson':p;
  if(activeLesson()&&!approved && target!==page){requestLessonExit(()=>go(p,true));return;}
  stop();
  observationIndex = 0;
  observationSelection = null;
  page = p === "lab" ? "lesson" : p;
  if (p === "lesson") { data.currentLesson = "motion"; data.lessonSession={id:"motion",started:Date.now()}; save(); }
  selected = null;
  hint = 0;
  feedback = "";
  render();
  window.scrollTo(0, 0);
  if(!["lesson","electric"].includes(page))history.replaceState(null,"",`#${page}`);
}
function companion(state = "greeting", text = "Եկ միասին պարզենք։") {
  return renderMascot(state, text);
}
function questionLayout(content, eventKey, caption, state = "thinking") {
  return guidedContent(content,eventKey,caption,state);
}
function shell(body) {
  const active = ["lesson", "electric"].includes(page) ? "path" : page;
  return `<a class="skip-link" href="#main-content">Անցնել բովանդակությանը</a><header class="site-header" data-screen="${page}"><div class="header-inner"><a class="brand" href="#home" aria-label="Ֆիզիկան շուրջդ է՝ գլխավոր էջ"><span class="brand-symbol">${icon("orbit")}</span><span>Ֆիզիկան <span class="brand-second">շուրջդ է</span></span></a><button id="nav-toggle" class="icon-button nav-toggle" aria-label="Բացել բաժինները" aria-expanded="false" aria-controls="main-nav">${icon("menu")}</button><nav id="main-nav" aria-label="Հիմնական բաժիններ">${navigation.map(([id, label, i]) => `<button data-page="${id}" class="nav-item ${active === id ? "active" : ""}" ${active === id ? 'aria-current="page"' : ""}>${icon(i)}<span>${id==='home'?'Ուսում':label}</span></button>`).join("")}</nav><button id="sound" class="icon-button sound-button" aria-label="Ձայնի կարգավորումներ">${icon(audioState().enabled ? "volume-2" : "volume-x")}</button></div></header><div class="main-shell" data-screen="${page}"><div class="page-layout ${page==='path'&&data.learning.selectedTopic?'with-context':''}"><main id="main-content" tabindex="-1">${body}</main>${page==='path'&&data.learning.selectedTopic?pathContextView(data):''}</div><footer><span>Ֆիզիկան շուրջդ է <span class="footer-dot">·</span> 9-րդ դասարան</span><span>${icon("hard-drive")} Քո գրառումները պահվում են այս սարքում</span></footer><p id="storage-warning" role="status"></p></div><dialog id="audio-dialog" aria-labelledby="audio-title"><button class="dialog-close icon-button" id="close-audio" aria-label="Փակել">${icon("x")}</button><span class="eyebrow">Ձայնի կարգավորումներ</span><h2 id="audio-title">Սովորելու հանգիստ միջավայր</h2><p>Կարճ, մեղմ ձայնային էֆեկտներ՝ փորձը սկսելիս, ճիշտ պատասխանի ու պահպանված գրառման համար։ Երաժշտություն չկա։</p><label class="volume-label">Ձայնի մակարդակ <input id="volume" type="range" min="0" max="100" value="${audioState().volume}" aria-label="Ձայնի մակարդակ"></label><button class="button" id="enable-sound" type="button">Միացնել ձայնը</button><button class="button secondary" id="mute">${icon("volume-x")} Անջատել ձայնը</button><p class="audio-note"><span id="audio-status" role="status">${audioState().enabled ? "Ձայնը միացված է։" : "Ձայնն անջատված է։ Միացրու այն, երբ ցանկանաս։"}</span><br>Տեղային ձայնային էֆեկտներ՝ Kenney · CC0։</p></dialog>`;
}
function home() {
  const current = [...investigations,...foundations,...electricLessons].find(l => l.id === data.currentLesson);
  const record = current ? data.investigations?.[current.id] || data.electricLessons?.[current.id] : null;
  const done = current ? !!record?.completed : !!data.assessment;
  return `<section class="hero guided-home"><div class="home-welcome">${renderMascot(greetingHasStarted() ? "idle" : "greeting", "", "home:greeting")}<div class="welcome-dialogue"><span class="eyebrow">Ֆիզիկան շուրջդ է</span><h1>Բարև՛, հետազոտող։</h1><p>${current ? current.context : "Փոքր լույս, շարժվող ռոբոտ, անտեսանելի ուժեր։ Ընտրենք մի հարց և պատասխանը գտնենք փորձով։"}</p></div></div><div class="home-next"><span>${current ? "Քո ընթացիկ բացահայտումը" : data.currentLesson==='motion'?"Շարժում և արագություն":"Քո առաջին բացահայտումը"} · ${done ? "Ավարտված" : `Քայլ ${Math.min(investigations.some(l=>l.id===current?.id)?11:foundations.some(l=>l.id===current?.id)?10:6,(current ? record?.stage || 0 : data.stage) + 1)} / ${investigations.some(l=>l.id===current?.id)?11:foundations.some(l=>l.id===current?.id)?10:6}`}</span><h2>${current ? current.title : data.currentLesson==='motion'?"Փոքր ռոբոտի մեծ ճանապարհը":"Սկսենք քեզ հետաքրքրող թեմայից"}</h2><button class="button" ${current ? `data-module="${current.id}"` : data.currentLesson==='motion'?'data-module="motion"':'data-page="path"'}>${done ? "Վերադառնալ դասին" : (current ? record?.stage : data.stage) ? "Շարունակել դասը" : "Սկսել դասը"} ${icon("arrow-right")}</button></div></section><div class="home-quiet-links"><button class="text-button" data-page="path">Բոլոր թեմաները ${icon("arrow-right")}</button></div>`;
}
function sim(guided = false) {
  const latest = data.runs.at(-1);
  const comparison =
    data.runs.find((r) => r.id === compareId) || data.runs.at(-2) || latest;
  return `<section class="sim-panel" aria-label="Շարժման փորձ"><div class="scene-wrap"><div class="scene-heading"><span>${icon("flask-conical")} Հավասարաչափ շարժում</span><span class="status" id="sim-status" role="status">${time === duration ? "Փորձն ավարտված է" : running ? "Շարժվում է" : time ? "Դադարեցված" : "Պատրաստ է փորձին"}</span></div>${scene("lab", distance(speed, time) / 60)}<div class="readouts" aria-label="Փորձի կենդանի չափումներ"><div><span>Անցած ժամանակ</span><strong id="read-time">${num(time)} <small>վ</small></strong></div><div><span>Անցած ճանապարհ</span><strong id="read-distance">${num(distance(speed, time))} <small>մ</small></strong></div><div><span>Արագություն</span><strong id="read-speed">${num(speed)} <small>մ/վ</small></strong></div></div></div><div class="sim-controls"><div class="slider-field"><label for="speed">Արագություն <strong id="speed-label">${num(speed)} մ/վ</strong></label><input id="speed" type="range" min="1" max="6" step=".5" value="${speed}"><div class="range-extents"><span>1 մ/վ</span><span>6 մ/վ</span></div></div><div class="slider-field"><label for="duration">Տևողություն <strong id="duration-label">${duration} վ</strong></label><input id="duration" type="range" min="2" max="10" step="1" value="${duration}"><div class="range-extents"><span>2 վ</span><span>10 վ</span></div></div><div class="pointing-actions">${guided ? "" : renderMascot("point-right", "Պատրա՞ստ ես փորձել։", "motion:run")}<div class="sim-actions"><button class="button" id="run">${icon(running ? "pause" : "play")} ${running ? "Դադարեցնել" : time && time < duration ? "Շարունակել" : "Սկսել փորձը"}</button><button class="icon-button reset-button" id="reset" aria-label="Փորձը սկսել սկզբից" title="Փորձը սկսել սկզբից">${icon("rotate-ccw")}</button></div></div></div><p class="control-note">Կարգավորումը փոխելիս ընթացիկ փորձը սկսվում է սկզբից։ Ավարտված փորձերը պահպանվում են։</p></section><div class="experiment-analysis"><details id="graph-details" ${graphOpen ? "open" : ""}><summary>${icon("chart-no-axes-combined")} Դիտել շարժման գրաֆիկը ${icon("chevron-down")}</summary><div class="graph-wrap"><div class="graph-header"><div><h3>Ճանապարհը՝ ժամանակից կախված</h3><p>Ավելի կտրուկ գիծ՝ ավելի մեծ արագություն։</p></div>${
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
    return guidedContent(`<div class="story"><span class="eyebrow">Քո հաջորդ գիտական քայլը</span><h2>Իսկ ինչպե՞ս կստուգես սա։</h2><p>Մի նոր փորձ առաջարկիր։ Նշիր՝ ինչ ես փոխելու, և ինչն է մնալու նույնը։</p><label class="field-label" for="verify">Իմ փորձի ծրագիրը</label><textarea id="verify" placeholder="Փոխելու եմ միայն…">${escape(data.verification || "")}</textarea><button id="next-stage" class="button">Բացահայտել կապը ${icon("arrow-right")}</button></div>`, "motion:verification", "", "thinking");
  const i = observationIndex,
    q = questions[i],
    answer = data.answers[i],
    chosen = observationSelection ?? answer,
    submitted = answer !== undefined && chosen === answer,
    correct = answer === q.correct;
  return questionLayout(
    `<div class="story observation-story"><span class="eyebrow">Դիտարկում ${i + 1} / ${questions.length}</span><h2>${q.q}</h2><p>Մտածիր քո կատարած փորձերի մասին։</p>${q.options.map((o, j) => `<button class="answer ${chosen === j ? "selected" : ""}" data-observe="${i}:${j}" aria-pressed="${chosen === j}" ${correct ? "disabled" : ""}>${o}${chosen === j ? icon(correct ? "check" : "circle-dot") : ""}</button>`).join("")}${submitted ? `<p class="feedback ${correct ? "correct" : ""}" role="status">${correct ? "Ճիշտ է։ " + q.why : "Վերադառնանք փորձին։ " + q.hints[Math.min(hint, 2)]}</p>${!correct && hint < 2 ? `<button class="text-button" data-hint="${i}">${icon("lightbulb")} Հաջորդ հուշումը</button>` : ""}` : ""}${correct ? '<button id="next-observation" class="button">Շարունակել ' + icon("arrow-right") + "</button>" : ""}${!correct ? `<button id="submit-observation" class="button" ${chosen === undefined ? "disabled" : ""}>Ստուգել դիտարկումը</button>` : ""}<button class="text-button revisit" id="revisit-experiment">${icon("flask-conical")} Նորից դիտել փորձը</button></div>`,
    `motion:observation:${i}:answer:${answer}:hint:${hint}`,
    hint > 0 && !correct ? "Նոր հուշում․ փորձիր այս մտքով։" : "Մտածիր քո փորձերի մասին։",
    !correct && submitted ? (hint > 0 ? "eureka" : "confused") : "thinking",
  );
}
function lesson() {
  let s = data.stage;
  return `<div class="lesson-top"><button class="text-button" data-page="path">${icon("arrow-left")} Ուսումնական ուղի</button><div class="lesson-stage">${s + 1} / 6</div><label class="stage-picker"><select id="stage-select" aria-label="Վերադառնալ դասի քայլին">${stages
    .slice(0, data.unlockedStage + 1)
    .map(
      (name, i) =>
        `<option value="${i}" ${i === s ? "selected" : ""}>${name}</option>`,
    )
    .join(
      "",
    )}</select></label></div><div class="lesson-context"><h1>Փոքր ռոբոտի մեծ ճանապարհը</h1></div><div class="lesson-track" role="progressbar" aria-label="Հետազոտության ավարտված քայլերը" aria-valuemin="0" aria-valuemax="6" aria-valuenow="${data.assessment ? 6 : s}"><span style="width:${(data.assessment ? 6 : s) / 6 * 100}%"></span></div><section class="lesson-content">${s === 0 ? `${guidedContent(`<div class="story"><h2>Ինձ օգնի՛ր առաքումը հասցնել։</h2><p>Միջանցքով փաթեթ եմ տանում։ Եթե ավելի արագ շարժվեմ, նույն ժամանակում ավելի հեռու կհասնե՞մ։ Նախ կանխատեսիր, հետո ինձ հետ փորձ կատարիր։</p><button id="next-stage" class="button">Անել կանխատեսում ${icon("arrow-right")}</button></div>`, "motion:begin", "", "point-left")}${scene("intro")}` : s === 1 ? questionLayout(`<div class="story"><span class="eyebrow">Նախ մտածիր, հետո փորձիր</span><h2>Իսկ եթե ռոբոտը երկու անգամ արագ շարժվի՞։</h2><p>Շարժման ժամանակը նույնն է մնում։ Ի՞նչ կլինի անցած ճանապարհի հետ։</p>${prediction.map((o, i) => `<button class="answer ${data.prediction === i ? "selected" : ""}" data-predict="${i}" aria-pressed="${data.prediction === i}"><span>${String.fromCharCode(1329 + i)}</span>${o}${data.prediction === i ? icon("check") : ""}</button>`).join("")}${data.prediction !== null ? '<p class="feedback" role="status">Կանխատեսումը գրանցված է։ Հիմա ստուգենք այն փորձով։</p><button id="next-stage" class="button">Ստուգել փորձով ' + icon("arrow-right") + "</button>" : ""}</div>`, "motion:prediction", "Նախ մտածիր, հետո ընտրիր։") : s === 2 ? `${dialogue(`<h2>Եկ ստուգենք քո կանխատեսումը։</h2><p>Նախ ընտրիր 2 մ/վ արագություն և 5 վ տևողություն։ Հետո կրկնապատկիր միայն արագությունը ու համեմատիր արդյունքները։</p>`, "point-right", "motion:experiment")}${sim(true)}<div class="stage-bottom"><div><span class="eyebrow">Քո հաջորդ քայլը</span><p>Համեմատիր 2 մ/վ և 4 մ/վ արագությունները նույն՝ 5 վ տևողությամբ։</p></div><button id="next-stage" class="button secondary" ${!data.runs.length ? "disabled" : ""}>Գրանցել դիտարկումը ${icon("arrow-right")}</button></div>` : s === 3 ? observation() : s === 4 ? explanation() : application()}</section>`;
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
    if (!expanded)
      animate(
        $("#main-nav"),
        [
          { opacity: 0, transform: "translateY(-4px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 180 },
      );
  };
  $("#graph-details")?.addEventListener("toggle", (e) => {
    graphOpen = e.target.open;
    animateDisclosure(e.target);
  });
  $("#runs-details")?.addEventListener("toggle", (e) => {
    runsOpen = e.target.open;
    animateDisclosure(e.target);
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
    observationSelection = null;
    hint = 0;
    save();
    render();
  });
  $("#next-observation")?.addEventListener("click", () => {
    observationIndex++;
    observationSelection = null;
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
function path() { return pathView(data); }
function explanation() {
  const r = data.runs.at(-1) || { speed: 2, duration: 5, distance: 10 };
  return guidedContent(`<div class="story"><span class="eyebrow">ՔՈ ՓՈՐՁԻ ԱՊԱՑՈՒՅՑԸ</span><h2>Երեք մեծություն։ Մի պարզ կապ։</h2><p>Հաստատուն արագությամբ շարժվելիս անցած ճանապարհը գտնում ենք արագությունը բազմապատկելով ժամանակով։</p><div class="formula"><div><strong>s</strong><span>ճանապարհ, մ</span></div><b>=</b><div><strong>v</strong><span>արագություն, մ/վ</span></div><b>×</b><div><strong>t</strong><span>ժամանակ, վ</span></div></div><div class="evidence"><span>ՔՈ ՎԵՐՋԻՆ ՓՈՐՁԸ</span><h3>${num(r.speed)} մ/վ × ${r.duration} վ = ${num(r.distance)} մ</h3><p>Ամեն վայրկյան՝ ${num(r.speed)} մետր։ ${r.duration} վայրկյանում՝ ${num(r.distance)} մետր։</p></div><details><summary>Ավելի մանրամասն՝ միջին արագության մասին</summary><p>Միջին արագությունը ամբողջ անցած ճանապարհի և ամբողջ ժամանակի հարաբերությունն է՝ v<sub>միջ</sub> = s / t։ Հավասարաչափ շարժման դեպքում այն հավասար է հաստատուն արագությանը։ Եթե ճանապարհին կանգնես, կանգառի ժամանակն էլ պետք է հաշվել։</p></details><button id="next-stage" class="button">Փորձել նոր իրավիճակում ${icon("arrow-right")}</button></div>`, "motion:explanation", "", "thinking");
}
function application() {
  if (data.assessment)
    return guidedContent(`<div class="story"><span class="eyebrow">ՀԵՏԱԶՈՏՈՒԹՅՈՒՆԸ ԱՎԱՐՏՎԱԾ Է</span><h2>Դու արդեն մտածում ես որպես հետազոտող։</h2><p>Առաջին փորձից ճիշտ պատասխաններ՝ ${data.assessment.score} / 3։ Դու կանխատեսեցիր, փորձ կատարեցիր և բացատրեցիր կապը։ ${data.assessment.score < 3 ? "Վերանայիր ժամանակի և ճանապարհի կապը՝ նոր փորձով։" : "Այժմ կարող ես կապը կիրառել նոր իրավիճակներում։"}</p><div class="evidence"><h3>Ի՞նչ ցույց տվեցիր</h3><p>Հաստատուն արագությամբ՝ s = v × t։ Միջին արագությունը գտնելու համար հաշվում ենք ամբողջ ժամանակը։</p></div><label class="field-label" for="conclusion">Քո վերջնական եզրակացությունը</label><textarea id="conclusion" placeholder="Այս փորձից հասկացա, որ…">${escape(data.conclusion || "")}</textarea><button class="button secondary" id="save-lesson">Պահպանել տետրում ${icon("notebook-pen")}</button>${starsMarkup(starsFor(data.assessment.score,3))}${starsFor(data.assessment.score,3)>=2&&nextLesson(data,"motion",topics)?`<button class="button lesson-primary" data-module="pendulum">Անցնել հաջորդ դասին</button>`:""}<button class="text-button" data-page="path">Վերադառնալ ուսումնական ուղի</button><button class="${starsFor(data.assessment.score,3)<2?'button lesson-primary':'text-button'}" id="retry-quiz">Կրկին ստուգել գիտելիքը</button><p id="note-status" role="status"></p></div>`, `motion:complete:${data.assessment.created}`, "", "celebration");
  const q = assessment[quizIndex];
  return questionLayout(
    `<div class="story"><span class="eyebrow">ԿԻՐԱՌԻՐ ԻՆՔՆՈՒՐՈՒՅՆ · ${quizIndex + 1} / 3</span><h2>${quizIndex === 0 ? "Ռոբոտից՝ հեծանիվ։ Նույն կապը։" : "Մտածիր ամբողջ իրավիճակի մասին։"}</h2><p>${q.q}</p>${quizIndex===0?'<p class="assessment-criteria">Երեք հարց՝ մեկական միավորով։ Գնահատվում է առաջին պատասխանը։ 0–39%՝ 0, 40–69%՝ 1, 70–89%՝ 2, 90–100%՝ 3 աստղ։</p>':''}${q.options.map((o, i) => `<button class="answer ${selected === i ? "selected" : ""}" data-quiz="${i}" aria-pressed="${selected === i}">${o}</button>`).join("")}<p class="feedback" role="status">${feedback}</p>${feedback && !feedback.startsWith("Ճիշտ") && hint < 2 ? '<button class="text-button" id="quiz-hint">' + icon("lightbulb") + " Հաջորդ հուշումը</button>" : ""}<button class="button" id="submit-quiz" ${selected === null ? "disabled" : ""}>${feedback.startsWith("Ճիշտ") ? "Հաջորդը" : "Ստուգել պատասխանը"} ${icon("arrow-right")}</button></div>`,
    `motion:assessment:${assessmentAttempt}:${quizIndex}:answer:${selected}:hint:${hint}`,
    feedback.startsWith("Ճիշտ") ? "Դու ճիշտ կիրառեցիր կապը։" : "Մի շտապիր։ Ի՞նչ է ասում իրավիճակը։",
    feedback.startsWith("Ճիշտ") ? (quizIndex === 0 ? "eureka" : "success-answer") : feedback ? (hint > 0 ? "eureka" : "confused") : "thinking",
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
    `<div class="notebook-layout"><div class="journal-margin"><span>01</span><p>Քո փորձերն ու<br>բացահայտումները</p><small>${data.notes.length} գրառում</small></div><div>${editing !== null ? noteForm() : ""}${
      data.notes.length
        ? data.notes
            .map(
              (n) =>
                `<article class="note"><div class="section-title"><span class="eyebrow">${new Date(n.created).toLocaleDateString("hy-AM")} · ՀԵՏԱԶՈՏՈՒԹՅՈՒՆ 01</span><div><button class="icon-button" data-edit="${n.id}" aria-label="Խմբագրել գրառումը">${icon("pencil")}</button><button class="icon-button" data-delete="${n.id}" aria-label="Ջնջել գրառումը">${icon("trash-2")}</button></div></div><h3>${escape(n.lessonTitle || "Շարժում, ճանապարհ, ժամանակ")}</h3>${[
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
          '<h2>Այստեղ կմնան քո բացահայտումները։</h2><p>Սկսիր փորձից կամ ստեղծիր առաջին գրառումդ։</p><button class="text-button" data-page="lesson">Սկսել դասը →</button></div>'
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
function totalExperiments(){const ids=new Set([...Object.keys(data.electricLessons||{}),...Object.keys(data.investigations||{})]);return (data.lessonAttemptArchives||[]).reduce((n,a)=>n+(a.record.runs?.length||a.record.experiments?.length||0),0)+data.runs.length+[...ids].reduce((sum,id)=>sum+(data.investigations?.[id]?.runs.length??data.electricLessons?.[id]?.experiments?.length??0),0);}
function progress() {
  const archivedMotion=[...(data.lessonAttemptArchives||[])].reverse().find(a=>a.lessonId==='motion'&&a.record.assessment)?.record;
  const motionResult=data.assessment || archivedMotion?.assessment;
  const motionAnswers=Object.keys(data.answers||{}).length?data.answers:archivedMotion?.answers||{};
  const correct = questions.filter(
    (q, i) => motionAnswers[i] === q.correct,
  ).length;
  return (
    heading(
      "ԱՊԱՑՈՒՅՑԻ ՎՐԱ ՀԻՄՆՎԱԾ",
      "Իմ առաջընթացը",
      "Կարևոր է ոչ թե արագ ավարտել, այլ հասկանալ։",
    ) +
    masteryProgress(data) + `<div class="presence-overview">${renderMascot(motionResult ? "success-complete" : "idle-secondary", "Ամեն փորձից՝ մի նոր բացահայտում։", `motion:progress:${motionResult?.created || "first"}`)}<div class="progress-stats"><div><strong>${Object.values(data.learning.lessons).filter(x=>x.attempts?.length).length}</strong><span>Ավարտված հետազոտություն</span></div><div><strong>${totalExperiments()}</strong><span>Կատարված փորձ</span></div><div><strong>${data.notes.length}</strong><span>Գրառում տետրում</span></div></div></div><section class="note"><h2>Շարժում և արագություն</h2>${questions.map((q, i) => `<div class="concept">${icon(motionAnswers[i] === q.correct ? "circle-check" : "circle-dashed")}<span>${["Արագության և ճանապարհի կապը", "Ժամանակի և ճանապարհի կապը", "Հաստատուն արագություն"][i]}</span><small>${motionAnswers[i] === q.correct ? "Ցույց ես տվել" : "Դեռ ուսումնասիրելու ենք"}</small></div>`).join("")}<p>${motionResult ? `Գիտելիքի ստուգում՝ ${motionResult.score} / 3 ճիշտ պատասխան առաջին փորձից։` : "Գիտելիքի ստուգումը դեռ չի կատարվել։"}</p>${motionResult?.score < 3 ? '<p class="feedback">Լրացուցիչ փորձիր կանգառով շարժման միջին արագության հարցը։</p>' : ""}<button class="button" data-page="lesson">Վերադառնալ հետազոտությանը ${icon("arrow-right")}</button></section><section class="electric-progress"><h2>Նոր հետազոտությունները</h2>${electricLessons.map(l=>{const record=data.electricLessons?.[l.id];if(!record)return "";return `<div class="recent-run"><span>${l.title}</span><span>${record.completed?"Ավարտված է":`Քայլ ${record.stage+1} / 6`} · ${(record.experiments || []).length} գրանցված փորձ</span><button class="text-button" data-module="${l.id}">Շարունակել</button></div>`;}).join("") || "<p>Ընտրիր մի նոր հարց ուսուցման ճանապարհից։</p>"}</section><section class="runs"><h3>Վերջին փորձերը</h3>${
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
  const focusSnapshot=captureFocus($("#app"));
  cleanupExperiments();
  const incoming = document.createElement("div");
  incoming.id = "app";
  incoming.innerHTML = shell(
    {
      home,
      path,
      lesson,
      electric: () => journey.view(),
      notebook,
      progress,
    }[page](),
  );
  updateMascotLayout($("#app"), incoming);
  cleanupMascots();
  if (["lesson", "electric"].includes(page)) {
    const content = $(".lesson-content");
    const action = content.querySelector(".lesson-primary") || content.querySelector("#next-stage, #next-observation, #submit-quiz, #submit-observation, #save-lesson, #electric-next, #electric-submit-observation, #electric-check, #electric-save-reflection, #foundation-next, #foundation-check, #foundation-assess, #foundation-retry") || content.querySelector("#measure-electric");
    if (action) {
      const dock = document.createElement("div");
      dock.className = "lesson-action-dock";
      action.replaceWith(dock);
      dock.append(action);
      const experimentControls=content.querySelector('.science-controls,.circuit-tools,.sim-controls');
      if(experimentControls)experimentControls.after(dock);else content.append(dock);
    }
    $("#main-content").classList.add("focused-lesson");
  }
  if($(".learning-summary"))$("#main-content").classList.add("completion-screen");
  createIcons({ icons });
  bind();
  bindRedesign();
  cleanupMascots = mountMascots($("#app"));
  if (page === "electric") cleanupExperiments = journey.bind($("#main-content"));
  animateRender($("#main-content"), {
    view:
      page === "electric" ? journey.key() : page === "lesson"
        ? `${page}:${data.stage}:${data.stage === 3 ? observationIndex : data.stage === 5 ? quizIndex : 0}`
        : page,
    selection:
      page === "lesson"
        ? data.stage === 1
          ? data.prediction
          : data.stage === 3
            ? data.answers[observationIndex]
            : selected
        : null,
    feedback: $(".feedback")?.textContent || "",
    hint,
    runs: data.runs.length,
  });
  restoreFocus($("#app"),focusSnapshot);
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
  const angle = matchMedia("(prefers-reduced-motion: reduce)").matches
    ? 0
    : wheelAngle(distance(speed, time));
  document
    .querySelectorAll("#robot-lab [data-wheel-rotor]")
    .forEach((wheel) => wheel.setAttribute("transform", `rotate(${angle})`));
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
    playSound("complete");
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
function saveMotionNote() {
    const r = data.runs.at(-1);
    const note = {
      id: data.motionNoteId ||= crypto.randomUUID(),
      created: Date.now(),
      lessonId: "motion",
      prediction: prediction[data.prediction] || "",
      settings: r ? `${r.speed} մ/վ, ${r.duration} վ, ${r.distance} մ` : "",
      observation:
        data.verification ||
        "Արագությունն ու տևողությունն ազդում են անցած ճանապարհի վրա։",
      explanation: "Հաստատուն արագությամբ՝ s = v × t։",
      conclusion: data.conclusion,
    };
    const prior=data.notes.find(n=>n.id===note.id);
    if(prior)Object.assign(prior,note);else data.notes.push(note);
    save();
}
function bind() {
  document
    .querySelectorAll("[data-page]")
    .forEach((b) => (b.onclick = () => go(b.dataset.page)));
  document.querySelectorAll('[data-module]').forEach(button=>button.onclick=()=>openModule(button.dataset.module));
  document.querySelectorAll('[data-topic]').forEach(b=>b.onclick=()=>{data.learning.selectedTopic=b.dataset.topic;save();go('path');});
  document.querySelectorAll('[data-choose-topics]').forEach(b=>b.onclick=()=>{data.learning.selectedTopic=null;save();go('path');});
  document.querySelectorAll('[data-locked]').forEach(b=>b.onclick=()=>{const l=topics.flatMap(t=>t.lessons).find(l=>l.id===b.dataset.locked);$('#path-message').textContent=l.playable?'Այս դասը բացելու համար նախորդ դասից ստացիր առնվազն երկու աստղ։':'Այս դասը դեռ նախապատրաստվում է։ Աշխատող դասերը նշված են որպես հասանելի։';$('#path-message').scrollIntoView({block:'nearest'});});
  $(".brand").onclick = (e) => {
    e.preventDefault();
    go("home");
  };
  $("#sound").onclick = () => $("#audio-dialog").showModal();
  $("#close-audio").onclick = () => $("#audio-dialog").close();
  const syncAudio = () => {
    const state = audioState();
    $("#volume").value = state.volume;
    $("#audio-status").textContent = state.enabled ? "Ձայնը միացված է։" : "Ձայնն անջատված է։";
    $("#sound").innerHTML = icon(state.enabled ? "volume-2" : "volume-x");
    $("#enable-sound").disabled = state.enabled;
    createIcons({ icons, root: $("#sound") });
  };
  $("#volume").oninput = (e) => { setVolume(e.target.value); syncAudio(); };
  $("#enable-sound").onclick = () => { enableSound(); syncAudio(); };
  $("#mute").onclick = () => { muteSound(); syncAudio(); };
  $("#run")?.addEventListener("click", () => {
    playSound("control");
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
    playSound("control");
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
        observationSelection = j;
        hint = 0;
        save();
        render();
      }),
  );
  $("#submit-observation")?.addEventListener("click", () => {
    const chosen = observationSelection ?? data.answers[observationIndex];
    if (chosen === undefined) return;
    data.answers[observationIndex] = chosen;
    observationSelection = null;
    if (chosen === questions[observationIndex].correct) playSound("complete");
    save(); render();
  });
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
        recordResult(data,"motion",data.assessment.score,3,{questions:quizAnswers},topics);
        data.motionNoteId = null;
        saveMotionNote();
        quizIndex = 0;
        save();
      }
      render();
      return;
    }
    if (quizAnswers[quizIndex] === undefined)
      quizAnswers[quizIndex] = selected === q.correct;
    if (selected === q.correct) playSound("complete");
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
    assessmentAttempt = Date.now();
    data.assessment = null;
    quizIndex = 0;
    quizAnswers = [];
    save();
    render();
  });
  $("#save-lesson")?.addEventListener("click", () => {
    data.conclusion = $("#conclusion").value;
    saveMotionNote();
    $("#note-status").textContent = "Գրառումը պահպանվել է հետազոտական տետրում։";
    $("#note-status").classList.add("saved");
    playSound("complete");
    animateSaved($("#note-status"));
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
const initialHash=location.hash;
if(initialHash.startsWith('#lesson/'))openModule(decodeURIComponent(initialHash.slice(8)));
else {if(['#home','#path','#progress','#notebook'].includes(initialHash))page=initialHash.slice(1);render();if(!initialHash)history.replaceState(null,'','#path');}
window.addEventListener('hashchange',()=>{const h=location.hash;if(activeLesson()&&h!=='#main-content')history.replaceState(null,'',`#lesson/${activeLesson()}`);if(h==='#main-content'){$('#main-content').focus();return;}if(h.startsWith('#lesson/'))openModule(decodeURIComponent(h.slice(8)));else go(['#path','#progress','#notebook'].includes(h)?h.slice(1):'home');});

// Native confirmation is browser-controlled and requires a prior user interaction.
window.addEventListener('beforeunload',event=>{const id=activeLesson();if(id&&!lessonCompleted(data,id)){event.preventDefault();event.returnValue='';}});
window.addEventListener('pagehide',()=>{stop();cleanupExperiments();});
window.addEventListener('pageshow',event=>{if(event.persisted&&activeLesson()){finishLessonSession();go('path',true);}});

window.addEventListener("physics-audio-error", () => {
  if ($("#audio-status")) $("#audio-status").textContent = "Ձայնը չհաջողվեց նվագարկել։ Կարող ես կրկին միացնել այն։";
  $("#sound").innerHTML = icon("volume-x");
  createIcons({ icons, root: $("#sound") });
  if ($("#enable-sound")) $("#enable-sound").disabled = false;
});
