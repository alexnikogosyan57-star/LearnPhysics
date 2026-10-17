// AeroLab - Dedicated Flying Objects & Rocketry Interactive Laboratory
import {
  initialRocketState,
  stepRocket,
  airfoilForces,
  dronePhysicsModel,
  supersonicMachModel,
  turbofanBraytonModel,
  orbitPhysicsModel,
  helicopterSwashplateModel,
  gliderThermalModel,
  ionThrusterModel,
  DIY_PROJECTS,
  AERO_CHALLENGES,
  AERO_BADGES,
} from './aerolab-models.js';
import {
  rocketArt,
  airfoilTunnelArt,
  droneArt,
  supersonicMachArt,
  turbofanEngineArt,
  orbitCannonArt,
  helicopterSwashplateArt,
  ionThrusterArt,
  gliderThermalArt,
} from './aerolab-art.js';
import { playSound } from '../audio.js';
import {
  AEROLAB_CURRICULUM,
  LEVEL_1_LESSONS,
  DIY_SAFE_PROJECT_GLIDER,
  ensureAeroLearningState,
  canOpenAeroLesson,
  recordAeroLessonCompletion,
  toggleDiyStep,
  toggleDiyMaterial,
} from './aerolab-path-data.js';
import { mountLessonWidget } from './aerolab-lesson-widgets.js';

const num = (n, dec = 1) => Number(n.toFixed(dec)).toLocaleString('hy-AM');

export function initialAeroLabState() {
  return {
    tab: 'rocket', // 'rocket' | 'drone' | 'helicopter' | 'tunnel' | 'supersonic' | 'jet' | 'orbit' | 'diy' | 'badges' | 'quiz'
    rocket: initialRocketState({
      bottleVolume: 0.0015,
      waterFraction: 0.35,
      pressureBar: 5,
      dryMass: 0.16,
      finCount: 3,
      angleDeg: 75,
      noseShape: 'conical',
      parachute: true,
    }),
    drone: {
      motors: [100, 100, 100, 100], // [M1_front_cw, M2_right_ccw, M3_rear_cw, M4_left_ccw]
      mass: 0.8,
      altitude: 1.5,
    },
    helicopter: {
      collective: 50,
      cyclicPitch: 0,
      cyclicRoll: 0,
      tailPedal: 50,
      mainRpm: 400,
    },
    tunnel: {
      angleDeg: 4,
      airSpeed: 20,
    },
    supersonic: {
      mach: 1.2,
      altitude: 5000,
    },
    jet: {
      throttle: 75,
      bypassRatio: 8.5,
      altitude: 0,
      airspeedKmh: 250,
    },
    orbit: {
      launchAltitudeKm: 400,
      horizontalVelocityKms: 7.67,
    },
    glider: {
      airSpeedKmh: 90,
      bankAngleDeg: 30,
      thermalStrength: 3.5,
      thermalRadius: 120,
    },
    ion: {
      beamVoltageV: 1500,
      beamCurrentA: 1.8,
      propellant: 'xenon',
      spacecraftMassKg: 650,
    },
    diySelected: 'water-rocket',
    quiz: {
      index: 0,
      selected: null,
      submitted: false,
      score: 0,
      answers: {},
    },
    running: false,
    showVectors: true,
  };
}

export function aerolabView(state) {
  state.aerolab ||= initialAeroLabState();
  const aero = state.aerolab;

  return `
    <div class="aerolab-container" data-tab="${aero.tab}">
      <!-- Lab Header & Introduction -->
      <div class="aerolab-header">
        <div class="aerolab-title-row">
          <div class="aerolab-badge">🚀 ԱԵՐՈԴԻՆԱՄԻԿԱ ԵՎ ԹՌԻՉՔ</div>
          <h1>Թռչող Սարքերի Լաբորատորիա</h1>
          <p class="aerolab-subtitle">
            Ֆիզիկայի տեսությունից մինչև տանը սարքվող հրթիռներ և սավառնակներ։ Ուսումնասիրի՛ր ռեակտիվ ուժերը, վերամբարձ ուժն ու աերոդինամիկան կենդանի փորձերով։
          </p>
        </div>

        <!-- Navigation Tabs (Duolingo Style 3D Pills) -->
        <nav class="aerolab-tabs" role="tablist" aria-label="Լաբորատորիայի բաժիններ">
          <button class="tab-button ${aero.tab === 'rocket' ? 'active' : ''}" data-aerotab="rocket" role="tab" aria-selected="${aero.tab === 'rocket'}">
            <span class="tab-icon">🚀</span>
            <span>Հրթիռի Թռիչք</span>
          </button>
          <button class="tab-button ${aero.tab === 'drone' ? 'active' : ''}" data-aerotab="drone" role="tab" aria-selected="${aero.tab === 'drone'}">
            <span class="tab-icon">🛸</span>
            <span>Քվադրոկոպտեր</span>
          </button>
          <button class="tab-button ${aero.tab === 'helicopter' ? 'active' : ''}" data-aerotab="helicopter" role="tab" aria-selected="${aero.tab === 'helicopter'}">
            <span class="tab-icon">🚁</span>
            <span>Ուղղաթիռ & Swashplate</span>
          </button>
          <button class="tab-button ${aero.tab === 'tunnel' ? 'active' : ''}" data-aerotab="tunnel" role="tab" aria-selected="${aero.tab === 'tunnel'}">
            <span class="tab-icon">💨</span>
            <span>Աերոդինամիկ Խողովակ</span>
          </button>
          <button class="tab-button ${aero.tab === 'supersonic' ? 'active' : ''}" data-aerotab="supersonic" role="tab" aria-selected="${aero.tab === 'supersonic'}">
            <span class="tab-icon">⚡</span>
            <span>Գերձայնային Թռիչք</span>
          </button>
          <button class="tab-button ${aero.tab === 'jet' ? 'active' : ''}" data-aerotab="jet" role="tab" aria-selected="${aero.tab === 'jet'}">
            <span class="tab-icon">✈️</span>
            <span>Տուրբոֆեն Շարժիչ</span>
          </button>
          <button class="tab-button ${aero.tab === 'orbit' ? 'active' : ''}" data-aerotab="orbit" role="tab" aria-selected="${aero.tab === 'orbit'}">
            <span class="tab-icon">🛰️</span>
            <span>Ուղեծրային Թնդանոթ</span>
          </button>
          <button class="tab-button ${aero.tab === 'glider' ? 'active' : ''}" data-aerotab="glider" role="tab" aria-selected="${aero.tab === 'glider'}">
            <span class="tab-icon">🌬️</span>
            <span>Թերմիկ Սավառնում</span>
          </button>
          <button class="tab-button ${aero.tab === 'ion' ? 'active' : ''}" data-aerotab="ion" role="tab" aria-selected="${aero.tab === 'ion'}">
            <span class="tab-icon">⚡</span>
            <span>Իոնային Շարժիչ</span>
          </button>
          <button class="tab-button ${aero.tab === 'diy' ? 'active' : ''}" data-aerotab="diy" role="tab" aria-selected="${aero.tab === 'diy'}">
            <span class="tab-icon">🛠️</span>
            <span>Տնային DIY Ինժեներիա</span>
          </button>
          <button class="tab-button ${aero.tab === 'badges' ? 'active' : ''}" data-aerotab="badges" role="tab" aria-selected="${aero.tab === 'badges'}">
            <span class="tab-icon">🏆</span>
            <span>Ձեռքբերումներ</span>
          </button>
          <button class="tab-button ${aero.tab === 'quiz' ? 'active' : ''}" data-aerotab="quiz" role="tab" aria-selected="${aero.tab === 'quiz'}">
            <span class="tab-icon">🎯</span>
            <span>Մինի-Ստուգում</span>
          </button>
        </nav>
      </div>

      <!-- Tab Content Area -->
      <div class="aerolab-content">
        ${renderTabContent(aero)}
      </div>
    </div>
  `;
}

function renderTabContent(aero) {
  if (aero.tab === 'rocket') return renderRocketLab(aero);
  if (aero.tab === 'drone') return renderDroneLab(aero);
  if (aero.tab === 'helicopter') return renderHelicopterLab(aero);
  if (aero.tab === 'tunnel') return renderWindTunnel(aero);
  if (aero.tab === 'supersonic') return renderSupersonicLab(aero);
  if (aero.tab === 'jet') return renderJetLab(aero);
  if (aero.tab === 'orbit') return renderOrbitLab(aero);
  if (aero.tab === 'glider') return renderGliderLab(aero);
  if (aero.tab === 'ion') return renderIonLab(aero);
  if (aero.tab === 'diy') return renderDiyGuide(aero);
  if (aero.tab === 'badges') return renderBadgesView(aero);
  if (aero.tab === 'quiz') return renderAeroQuiz(aero);
  return '';
}

/**
 * TAB 1: Brilliant-style Rocket Flight Simulator
 */
function renderRocketLab(aero) {
  const r = aero.rocket;
  const p = r.params;

  // Viewport camera and scale
  // Scene coordinates: ground is at y = 350
  const groundY = 350;
  const scale = 2.5; // pixels per meter
  const rocketScreenX = 70 + r.x * scale;
  const rocketScreenY = groundY - r.y * scale;

  return `
    <div class="aerolab-simulator-layout">
      <!-- Visual Canvas / Viewport Area -->
      <div class="sim-viewport-card">
        <div class="sim-viewport-header">
          <span class="sim-tag">ԿԵՆԴԱՆԻ ՖԻԶԻԿԱ · 60 FPS</span>
          <div class="sim-quick-toggles">
            <label class="toggle-label">
              <input type="checkbox" id="toggle-vectors" ${aero.showVectors ? 'checked' : ''}>
              <span>Ուժերի վեկտորներ</span>
            </label>
          </div>
        </div>

        <div class="rocket-scene-wrap">
          <svg id="rocket-canvas" viewBox="0 0 760 420" preserveAspectRatio="xMidYMid meet" aria-label="Հրթիռի թռիչքի սիմուլյատոր">
            <defs>
              <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#ddf3ff"/>
                <stop offset="65%" stop-color="#f0f9ff"/>
                <stop offset="100%" stop-color="#ffffff"/>
              </linearGradient>
              <linearGradient id="grass-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#58cc02"/>
                <stop offset="100%" stop-color="#46a302"/>
              </linearGradient>
            </defs>

            <!-- Sky background -->
            <rect width="760" height="420" fill="url(#sky-grad)"/>

            <!-- Altitude altitude grid lines -->
            <line x1="0" y1="${groundY - 10 * scale}" x2="760" y2="${groundY - 10 * scale}" stroke="#c5e4f5" stroke-dasharray="4 4"/>
            <text x="12" y="${groundY - 10 * scale - 4}" font-size="11" fill="#7ba3b8">10 մ</text>
            <line x1="0" y1="${groundY - 25 * scale}" x2="760" y2="${groundY - 25 * scale}" stroke="#c5e4f5" stroke-dasharray="4 4"/>
            <text x="12" y="${groundY - 25 * scale - 4}" font-size="11" fill="#7ba3b8">25 մ</text>
            <line x1="0" y1="${groundY - 50 * scale}" x2="760" y2="${groundY - 50 * scale}" stroke="#c5e4f5" stroke-dasharray="4 4"/>
            <text x="12" y="${groundY - 50 * scale - 4}" font-size="11" fill="#7ba3b8">50 մ</text>

            <!-- Trajectory Line -->
            <path id="rocket-trajectory" d="${renderTrajectoryPath(r.trajectory, scale, groundY)}" fill="none" stroke="#1cb0f6" stroke-width="2.5" stroke-dasharray="4 3" opacity="0.8"/>

            <!-- Launch pad on ground -->
            <g transform="translate(70, ${groundY})">
              <rect x="-24" y="0" width="48" height="12" rx="3" fill="#62666b"/>
              <line x1="-15" y1="0" x2="-2" y2="-20" stroke="#777e90" stroke-width="3"/>
              <line x1="15" y1="0" x2="2" y2="-20" stroke="#777e90" stroke-width="3"/>
            </g>

            <!-- Ground layer -->
            <rect x="0" y="${groundY}" width="760" height="70" fill="url(#grass-grad)"/>
            <line x1="0" y1="${groundY}" x2="760" y2="${groundY}" stroke="#389000" stroke-width="3"/>

            <!-- The Rocket Instance -->
            <g id="rocket-actor" transform="translate(${rocketScreenX}, ${rocketScreenY}) scale(0.7)">
              ${rocketArt({
                pitch: r.pitch,
                finCount: p.finCount,
                noseShape: p.noseShape,
                waterRemaining: r.waterRemaining,
                totalWater: p.bottleVolume * p.waterFraction,
                status: r.status,
                speed: r.speed,
                thrust: r.thrust,
                showVectors: aero.showVectors,
                gravity: r.gravity,
                drag: r.drag,
              })}
            </g>

            <!-- Apogee Marker -->
            ${
              r.apogee > 2
                ? `<g transform="translate(680, 50)">
                     <rect x="-8" y="-18" width="80" height="26" rx="6" fill="#ffc800" stroke="#d9a000" stroke-width="1.5"/>
                     <text x="32" y="-1" text-anchor="middle" font-size="12" font-weight="700" fill="#252525">Ապոգեյ՝ ${num(r.apogee)} մ</text>
                   </g>`
                : ''
            }
          </svg>
        </div>

        <!-- Telemetry Dashboard Cards -->
        <div class="telemetry-grid">
          <div class="telemetry-card">
            <span class="telemetry-label">Բարձրություն</span>
            <span class="telemetry-value" id="val-altitude">${num(r.y)} <small>մ</small></span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Առավելագույն (Apogee)</span>
            <span class="telemetry-value highlight" id="val-apogee">${num(r.apogee)} <small>մ</small></span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Արագություն</span>
            <span class="telemetry-value" id="val-speed">${num(r.speed)} <small>մ/վ</small></span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Քարշուժ</span>
            <span class="telemetry-value" id="val-thrust">${Math.round(r.thrust)} <small>Ն</small></span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Կարգավիճակ</span>
            <span class="telemetry-status ${r.status === 'tumble' ? 'is-warning' : 'is-good'}" id="val-status">
              ${statusText(r.status, r.isStable)}
            </span>
          </div>
        </div>
      </div>

      <!-- Controls Panel (Tactile Sliders & Parameters) -->
      <div class="sim-controls-card">
        <h3>Հրթիռի Կարգավորումներ</h3>

        <!-- Pressure Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-pressure">Սկզբնական Ճնշում (Օդամղում)</label>
            <strong id="label-pressure">${p.pressureBar} բար (մթն.)</strong>
          </div>
          <input type="range" id="param-pressure" min="1" max="8" step="0.5" value="${p.pressureBar}">
          <div class="range-marks"><span>1 բար (թույլ)</span><span>4 բար (տիպիկ)</span><span>8 բար (առավելագույն)</span></div>
        </div>

        <!-- Water Fraction Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-water">Ջրի Քանակ (Շշի ծավալի %-ը)</label>
            <strong id="label-water">${Math.round(p.waterFraction * 100)} %</strong>
          </div>
          <input type="range" id="param-water" min="0" max="0.9" step="0.05" value="${p.waterFraction}">
          <div class="range-marks"><span>0% (միայն օդ)</span><span>35% (օպտիմալ)</span><span>90% (ծանր)</span></div>
        </div>

        <!-- Fins Count -->
        <div class="control-row">
          <label>Կայունարար Թևեր (Fins)</label>
          <div class="button-toggle-group" id="fin-picker">
            <button class="toggle-btn ${p.finCount === 0 ? 'selected' : ''}" data-fincount="0">0 թև (անկայուն)</button>
            <button class="toggle-btn ${p.finCount === 3 ? 'selected' : ''}" data-fincount="3">3 թև (ստանդարտ)</button>
            <button class="toggle-btn ${p.finCount === 4 ? 'selected' : ''}" data-fincount="4">4 թև (գերկայուն)</button>
          </div>
        </div>

        <!-- Nosecone Shape -->
        <div class="control-row">
          <label>Քթամասի Ձև</label>
          <div class="button-toggle-group" id="nose-picker">
            <button class="toggle-btn ${p.noseShape === 'conical' ? 'selected' : ''}" data-noseshape="conical">Կոնաձև (աերոդինամիկ)</button>
            <button class="toggle-btn ${p.noseShape === 'blunt' ? 'selected' : ''}" data-noseshape="blunt">Հարթ (դիմադրող)</button>
          </div>
        </div>

        <!-- Launch Angle Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-angle">Արձակման Անկյուն</label>
            <strong id="label-angle">${p.angleDeg}°</strong>
          </div>
          <input type="range" id="param-angle" min="45" max="90" step="5" value="${p.angleDeg}">
          <div class="range-marks"><span>45° (հեռահար)</span><span>75° (հավասարակշռված)</span><span>90° (ուղղաձիգ)</span></div>
        </div>

        <!-- Primary Launch Action -->
        <div class="sim-actions-row">
          <button class="button lesson-primary" id="btn-launch-rocket">
            ${aero.running ? '⏸ Դադարեցնել' : r.status === 'landed' ? '🚀 Կրկին Արձակել' : '🚀 Արձակել Հրթիռը'}
          </button>
          <button class="button secondary" id="btn-reset-rocket">
            ↺ Սկզբնական դիրք
          </button>
        </div>

        ${
          !r.isStable
            ? `<div class="warning-callout">
                 <strong>⚠️ Ուշադրություն.</strong> Հրթիռն անկայուն է (CoM > CoP): Առանց թևերի այն օդում կսկսի պտտվել (tumble) և չի հասնի բարձրության։ Ավելացրու՛ թևեր։
               </div>`
            : ''
        }
      </div>
    </div>
  `;
}

function renderTrajectoryPath(trajectory, scale, groundY) {
  if (!trajectory || trajectory.length === 0) return '';
  const pts = trajectory.map((p) => `${70 + p.x * scale},${groundY - p.y * scale}`);
  return 'M ' + pts.join(' L ');
}

function statusText(st, isStable) {
  if (st === 'ready') return isStable ? 'Պատրաստ է արձակման' : 'Անկայուն կոնֆիգուրացիա';
  if (st === 'thrust') return '🚀 Ռեակտիվ քարշուժ';
  if (st === 'coast') return 'Ազատ իներցիոն թռիչք';
  if (st === 'tumble') return '🌀 Անկայուն պտույտ (tumble)';
  if (st === 'parachute') return '🪂 Պարաշյուտով վայրէջք';
  if (st === 'landed') return '✓ Բարեհաջող վայրէջք';
  return st;
}

/**
 * TAB 2: Interactive Wind Tunnel & Airfoil
 */
function renderWindTunnel(aero) {
  const t = aero.tunnel;
  const forces = airfoilForces({ angleDeg: t.angleDeg, airSpeed: t.airSpeed });

  return `
    <div class="aerolab-simulator-layout">
      <div class="sim-viewport-card">
        <div class="sim-viewport-header">
          <span class="sim-tag">ԱԵՐՈԴԻՆԱՄԻԿԱ · ՕԴԱՅԻՆ ԽՈՂՈՎԱԿ</span>
          <span class="flow-status ${forces.stall ? 'is-warning' : 'is-good'}">
            ${forces.stall ? '⚠️ Շեղում (Stall)' : '✓ Լամինար սահուն հոսք'}
          </span>
        </div>

        <div class="tunnel-scene-wrap">
          ${airfoilTunnelArt({
            angleDeg: t.angleDeg,
            airSpeed: t.airSpeed,
            lift: forces.lift,
            drag: forces.drag,
            stall: forces.stall,
          })}
        </div>

        <!-- Telemetry for Airfoil -->
        <div class="telemetry-grid">
          <div class="telemetry-card">
            <span class="telemetry-label">Գրոհի Անկյուն (α)</span>
            <span class="telemetry-value highlight">${t.angleDeg}°</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Վերամբարձ Ուժ (Lift)</span>
            <span class="telemetry-value">${forces.lift} <small>Ն</small></span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Դիմադրության Ուժ (Drag)</span>
            <span class="telemetry-value">${forces.drag} <small>Ն</small></span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Որակի Գործակից (L/D)</span>
            <span class="telemetry-value">${forces.liftToDrag}</span>
          </div>
        </div>
      </div>

      <!-- Tunnel Controls Panel -->
      <div class="sim-controls-card">
        <h3>Թևի Կարգավորումներ</h3>

        <div class="control-row">
          <div class="control-label-wrap">
            <label for="tunnel-angle">Գրոհի Անկյուն (Angle of Attack)</label>
            <strong id="label-tunnel-angle">${t.angleDeg}°</strong>
          </div>
          <input type="range" id="tunnel-angle" min="-5" max="25" step="1" value="${t.angleDeg}">
          <div class="range-marks"><span>-5° (բացասական)</span><span>4° (օպտիմալ)</span><span>16°+ (շեղում / stall)</span></div>
        </div>

        <div class="control-row">
          <div class="control-label-wrap">
            <label for="tunnel-speed">Օդի Հոսքի Արագություն</label>
            <strong id="label-tunnel-speed">${t.airSpeed} մ/վ</strong>
          </div>
          <input type="range" id="tunnel-speed" min="5" max="40" step="5" value="${t.airSpeed}">
          <div class="range-marks"><span>5 մ/վ</span><span>20 մ/վ</span><span>40 մ/վ</span></div>
        </div>

        <div class="physics-explanation-box">
          <h4>Բեռնուլիի Օրենքը և Downwash-ը</h4>
          <p>
            1. <strong>Արագություն և Ճնշում</strong>. Թևի վերին կոր մակերեսով օդն անցնում է ավելի արագ, ուստի ըստ Բեռնուլիի օրենքի՝ վերևում ճնշումը նվազում է ($P_{\\text{վեր}} < P_{\\text{վար}}$)։ Ճնշման տարբերությունը թևը ձգում է վեր։
          </p>
          <p>
            2. <strong>Օդի հոսքի շեղում</strong>. Թևը շեղում է օդի զանգվածը դեպի ներքև (downwash): Ըստ Նյուտոնի 3-րդ օրենքի՝ օդը հավասար ուժով թևին հրում է դեպի վեր։
          </p>
          <p>
            3. <strong>Ի՞նչ է Stall-ը</strong>. Եթե անկյունը չափազանց մեծ է (> 15°), օդի հոսքը պոկվում է թևի մակերեսից՝ ստեղծելով քաոսային մրրիկներ։ Վերամբարձ ուժը կտրուկ անկում է ապրում։
          </p>
        </div>
      </div>
    </div>
  `;
}

/**
 * TAB: Brilliant-style Quadcopter & Drone Dynamics Simulator
 */
function renderDroneLab(aero) {
  const d = aero.drone;
  const physics = dronePhysicsModel({
    motors: d.motors,
    mass: d.mass,
  });

  const [m1, m2, m3, m4] = d.motors;

  return `
    <div class="aerolab-simulator-layout">
      <!-- Left Column: Simulation Canvas & Live Telemetry -->
      <div class="sim-viewport-card">
        <div class="sim-viewport-header">
          <div class="viewport-title-wrap">
            <span class="sim-tag">🛸 ԱԵՐՈԴԻՆԱՄԻԿԱ · ԴՐՈՆԻ ԿԱՅՈՒՆԱՑՈՒՄ</span>
            <span class="flow-status ${physics.isHovering ? 'is-good' : Math.abs(physics.yawTorque) < 0.001 ? 'is-good' : 'is-warning'}">
              ${physics.isHovering ? '✓ Կայուն Հովերինգ' : Math.abs(physics.yawTorque) < 0.001 ? '✓ Հավասարակշռված' : '⚠️ Անհավասար Պտույտ'}
            </span>
          </div>
          <div class="viewport-actions">
            <button class="action-btn-small" id="btn-drone-hover">✓ Ավտո-Հովերինգ</button>
            <button class="action-btn-small" id="btn-drone-yaw-left">↺ Ձախ Պտույտ</button>
            <button class="action-btn-small" id="btn-drone-yaw-right">↻ Աջ Պտույտ</button>
            <button class="action-btn-small" id="btn-drone-tilt-fwd">⬆ Թեքել Առաջ</button>
            <button class="action-btn-small secondary" id="btn-drone-reset">↺ Զրոյացնել</button>
          </div>
        </div>

        <!-- Drone SVG Viewport -->
        <div class="tunnel-scene-wrap">
          ${droneArt({
            motors: d.motors,
            thrusts: physics.thrusts,
            totalThrust: physics.totalThrust,
            weight: physics.weight,
            pitchDeg: physics.pitchDeg,
            rollDeg: physics.rollDeg,
            yawTorque: physics.yawTorque,
            showVectors: aero.showVectors,
          })}
        </div>

        <!-- Dynamic Telemetry Readouts -->
        <div class="telemetry-grid">
          <div class="telemetry-card">
            <span class="telemetry-label">Ընդհանուր Քարշուժ</span>
            <strong class="telemetry-value" id="val-drone-thrust">${num(physics.totalThrust)} <small>Ն</small></strong>
            <span class="telemetry-hint">4 շարժիչների գումար</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Դրոնի Ծանրություն (W)</span>
            <strong class="telemetry-value">${num(physics.weight)} <small>Ն</small></strong>
            <span class="telemetry-hint">m = ${d.mass} կգ</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Պտտող Մոմենտ (Yaw)</span>
            <strong class="telemetry-value ${Math.abs(physics.yawTorque) < 0.001 ? 'is-good' : 'is-warning'}">
              ${physics.yawTorque.toFixed(3)} <small>Ն·մ</small>
            </strong>
            <span class="telemetry-hint">CW vs CCW տարբերություն</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Ուղղաձիգ Դինամիկա</span>
            <strong class="telemetry-value" id="val-drone-status">
              ${physics.isHovering ? 'Հովերինգ' : physics.isClimbing ? 'Վերելք ↑' : 'Իջեցում ↓'}
            </strong>
            <span class="telemetry-hint">a = ${physics.verticalAccel > 0 ? '+' : ''}${physics.verticalAccel} մ/վ²</span>
          </div>
        </div>

        <!-- Brilliant Conceptual Insight -->
        <div class="physics-explanation-box">
          <h4>💡 Ինչպե՞ս է քվադրոկոպտերը կառավարում թռիչքը առանց ղեկերի</h4>
          <p>
            1. <strong>Իմպուլսի պտտման մոմենտի պահպանում</strong>․ 1-ին և 3-րդ շարժիչները պտտվում են ժամսլաքով (CW), իսկ 2-րդն ու 4-րդը՝ ժամսլաքին հակառակ (CCW)։ Նրանց օդային ռեակտիվ պտտող մոմենտները ճշգրիտ չեզոքացնում են միմյանց ($\\\\tau_{\\\\text{net}} = 0$)։
          </p>
          <p>
            2. <strong>Պտույտ իր առանցքի շուրջ (Yaw)</strong>․ Եթե մեծացնենք CW շարժիչների արագությունը և նվազեցնենք CCW շարժիչներինը, ընդհանուր քարշուժը չի փոխվի, բայց առաջացած չհավասարակշռված ռեակտիվ մոմենտի շնորհիվ դրոնը կսկսի պտտվել հակառակ ուղղությամբ։
          </p>
          <p>
            3. <strong>Առաջ/Ետ շարժում (Pitch)</strong>․ Ետևի շարժիչի (M3) քարշուժը մեծացնելիս դրոնի քիթը թեքվում է առաջ, և քարշուժի մի բաղադրիչը դրոնին առաջ է մղում։
          </p>
        </div>
      </div>

      <!-- Right Column: Tactile Parameter Controls -->
      <div class="sim-controls-card">
        <h3>Կառավարման Վահանակ</h3>
        <p class="sim-hint">Կարգավորի՛ր շարժիչների արագությունը կամ օգտվի՛ր վերևի արագ կոճակներից</p>

        <!-- Master Throttle Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="drone-master-throttle">Ընդհանուր Գազ (Master Throttle)</label>
            <strong id="label-drone-master">${Math.round(m1)}%</strong>
          </div>
          <input type="range" id="drone-master-throttle" min="0" max="150" step="1" value="${Math.round(m1)}">
          <div class="range-marks"><span>0% (Անջատված)</span><span>100% (Հովերինգ)</span><span>150% (Արագ վերելք)</span></div>
        </div>

        <!-- Motor 1 (Front CW) -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="motor-1">Շարժիչ 1 · Առջև (CW ↻)</label>
            <strong id="label-m1">${Math.round(m1)}%</strong>
          </div>
          <input type="range" id="motor-1" min="0" max="160" step="1" value="${Math.round(m1)}">
        </div>

        <!-- Motor 2 (Right CCW) -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="motor-2">Շարժիչ 2 · Աջ (CCW ↺)</label>
            <strong id="label-m2">${Math.round(m2)}%</strong>
          </div>
          <input type="range" id="motor-2" min="0" max="160" step="1" value="${Math.round(m2)}">
        </div>

        <!-- Motor 3 (Rear CW) -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="motor-3">Շարժիչ 3 · Ետև (CW ↻)</label>
            <strong id="label-m3">${Math.round(m3)}%</strong>
          </div>
          <input type="range" id="motor-3" min="0" max="160" step="1" value="${Math.round(m3)}">
        </div>

        <!-- Motor 4 (Left CCW) -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="motor-4">Շարժիչ 4 · Ձախ (CCW ↺)</label>
            <strong id="label-m4">${Math.round(m4)}%</strong>
          </div>
          <input type="range" id="motor-4" min="0" max="160" step="1" value="${Math.round(m4)}">
        </div>
      </div>
    </div>
  `;
}

/**
 * TAB: Brilliant-style Supersonic Mach Cone Simulator
 */
function renderSupersonicLab(aero) {
  const s = aero.supersonic;
  const physics = supersonicMachModel({
    mach: s.mach,
  });

  return `
    <div class="aerolab-simulator-layout">
      <!-- Left Column: Simulation Canvas & Live Telemetry -->
      <div class="sim-viewport-card">
        <div class="sim-viewport-header">
          <div class="viewport-title-wrap">
            <span class="sim-tag">⚡ ԳԵՐՁԱՅՆԱՅԻՆ ԱԵՐՈԴԻՆԱՄԻԿԱ</span>
            <span class="flow-status ${physics.isSupersonic ? 'is-good' : 'is-warning'}">
              ${physics.isSupersonic ? '🚀 Գերձայնային ռեժիմ (M > 1)' : '✈️ Ենթաձայնային (M < 1)'}
            </span>
          </div>
          <div class="viewport-actions">
            <button class="action-btn-small ${physics.mach === 0.85 ? 'selected' : ''}" data-mach="0.85">✈️ Boeing (0.85 M)</button>
            <button class="action-btn-small ${physics.isSonic ? 'selected' : ''}" data-mach="1.0">⚡ Պատնեշ (1.0 M)</button>
            <button class="action-btn-small ${physics.mach === 1.6 ? 'selected' : ''}" data-mach="1.6">🚀 Գերձայնային (1.6 M)</button>
            <button class="action-btn-small ${physics.mach === 2.2 ? 'selected' : ''}" data-mach="2.2">🔥 Concorde (2.2 M)</button>
          </div>
        </div>

        <!-- Supersonic Viewport SVG -->
        <div class="tunnel-scene-wrap">
          ${supersonicMachArt({
            mach: physics.mach,
            machAngleDeg: physics.machAngleDeg,
            airspeedKmh: physics.airspeedKmh,
            pressureRatio: physics.pressureRatio,
          })}
        </div>

        <!-- Dynamic Telemetry Readouts -->
        <div class="telemetry-grid">
          <div class="telemetry-card">
            <span class="telemetry-label">Մախի Թիվ (M)</span>
            <strong class="telemetry-value" id="val-mach">${physics.mach} <small>M</small></strong>
            <span class="telemetry-hint">M = v / a</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Իրական Արագություն</span>
            <strong class="telemetry-value">${physics.airspeedKmh} <small>կմ/ժ</small></strong>
            <span class="telemetry-hint">${physics.airspeedMs} մ/վ</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Մախի Կոնի Անկյուն (μ)</span>
            <strong class="telemetry-value ${physics.isSupersonic ? 'is-good' : ''}">
              ${physics.machAngleDeg !== null ? `${physics.machAngleDeg}°` : 'Գոյություն չունի'}
            </strong>
            <span class="telemetry-hint">${physics.isSupersonic ? 'sin(μ) = 1/M' : 'Ենթաձայնային (M < 1)'}</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Ճնշման Թռիչք (P₂/P₁)</span>
            <strong class="telemetry-value ${physics.isSupersonic ? 'is-warning' : ''}">
              ${physics.pressureRatio}x
            </strong>
            <span class="telemetry-hint">Հարվածային ալիքի ճակատ</span>
          </div>
        </div>

        <!-- Brilliant Conceptual Card -->
        <div class="physics-explanation-box">
          <h4>💡 Ինչու՞ է առաջանում ձայնային հարվածը (Sonic Boom)</h4>
          <p>
            1. <strong>Ենթաձայնային արագություն ($M < 1$)</strong>․ Ինքնաթիռի ստեղծած ձայնային ալիքները շարժվում են նրանից ավելի արագ (340 մ/վ) և հեռանում են առաջ (Դոպլերի խտացում)։
          </p>
          <p>
            2. <strong>Ձայնային պատնեշ ($M = 1$)</strong>․ Ինքնաթիռը հավասարվում է իր արձակած ալիքներին։ Բոլոր ալիքների ճակատները կուտակվում են քթամասի մոտ՝ ստեղծելով օդի ճնշման հսկայական «պատ» (խտացման թռիչք)։
          </p>
          <p>
            3. <strong>Գերձայնային ռեժիմ ($M > 1$)</strong>․ Ինքնաթիռը առաջ է անցնում իր սեփական ձայնից։ Ալիքները մնում են ետևում և դրանց շոշափողները ստեղծում են կոնաձև հարվածային ճակատ։ Այդ կոնի անկյունը որոշվում է $\\\\sin\\\\mu = 1/M$ բանաձևով։ Երբ կոնը հասնում է գետնին, լսվում է որոտանման պայթյուն (Sonic Boom)։
          </p>
        </div>
      </div>

      <!-- Right Column: Controls -->
      <div class="sim-controls-card">
        <h3>Կարգավորումներ</h3>
        <p class="sim-hint">Կարգավորի՛ր թռիչքի արագությունը կամ ընտրի՛ր ինքնաթիռի տիպը</p>

        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-mach">Մախի Թիվ (Mach)</label>
            <strong id="label-mach">${physics.mach} M</strong>
          </div>
          <input type="range" id="param-mach" min="0.3" max="2.8" step="0.05" value="${physics.mach}">
          <div class="range-marks"><span>0.3 M</span><span>1.0 M (Ձայնային)</span><span>2.8 M (Գերձայնային)</span></div>
        </div>
      </div>
    </div>
  `;
}

/**
 * TAB: Brilliant-style High-Bypass Turbofan Jet Engine Simulator
 */
function renderJetLab(aero) {
  const j = aero.jet;
  const physics = turbofanBraytonModel({
    throttle: j.throttle,
    bypassRatio: j.bypassRatio,
    altitude: j.altitude,
    airspeedKmh: j.airspeedKmh,
  });

  return `
    <div class="aerolab-simulator-layout">
      <!-- Left Column: Simulation Canvas & Live Telemetry -->
      <div class="sim-viewport-card">
        <div class="sim-viewport-header">
          <div class="viewport-title-wrap">
            <span class="sim-tag">✈️ ՏՈՒՐԲՈՎԵՆՏԻԼՅԱՏՈՐԱՅԻՆ ՌԵԱԿՏԻՎ ՇԱՐԺԻՉ</span>
            <span class="flow-status ${physics.bypassThrustPercent >= 75 ? 'is-good' : 'is-warning'}">
              ${physics.bypassThrustPercent >= 75 ? '✓ Բարձր Երկկոնտուրություն (High BPR)' : '⚠️ Ցածր Շրջանցում (Low BPR)'}
            </span>
          </div>
          <div class="viewport-actions">
            <button class="action-btn-small" data-jetpreset="takeoff">🛫 Մեկնարկ (100%)</button>
            <button class="action-btn-small" data-jetpreset="cruise">✈️ Կրուիզ (10,500մ)</button>
            <button class="action-btn-small" data-jetpreset="dash">⚡ Կործանիչ (BPR 2.0)</button>
            <button class="action-btn-small secondary" data-jetpreset="idle">🛬 Պարապ (Idle)</button>
          </div>
        </div>

        <!-- Jet Viewport SVG -->
        <div class="tunnel-scene-wrap">
          ${turbofanEngineArt({
            throttle: physics.throttle,
            bypassRatio: physics.bypassRatio,
            thrustKn: physics.thrustKn,
            thrustBypassKn: physics.thrustBypassKn,
            thrustCoreKn: physics.thrustCoreKn,
            bypassThrustPercent: physics.bypassThrustPercent,
            titC: physics.titC,
            fanRpmPct: physics.fanRpmPct,
            coreRpmPct: physics.coreRpmPct,
            showVectors: aero.showVectors,
          })}
        </div>

        <!-- Dynamic Telemetry Readouts -->
        <div class="telemetry-grid">
          <div class="telemetry-card">
            <span class="telemetry-label">Ընդհանուր Քարշուժ (F_net)</span>
            <strong class="telemetry-value" id="val-thrust-kn">${physics.thrustKn} <small>կՆ</small></strong>
            <span class="telemetry-hint">Շրջանցիկ՝ ${physics.thrustBypassKn} կՆ | Կորիզ՝ ${physics.thrustCoreKn} կՆ</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Շրջանցման Քարշի Բաժին</span>
            <strong class="telemetry-value ${physics.bypassThrustPercent >= 75 ? 'is-good' : ''}">
              ${physics.bypassThrustPercent} <small>%</small>
            </strong>
            <span class="telemetry-hint">BPR = ${physics.bypassRatio} : 1</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Տեսակարար Ծախս (TSFC)</span>
            <strong class="telemetry-value ${physics.tsfc < 16 ? 'is-good' : ''}">
              ${physics.tsfc} <small>գ/(կՆ·վ)</small>
            </strong>
            <span class="telemetry-hint">Վառելիք՝ ${physics.fuelFlowKgH} կգ/ժ</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Տուրբինի Ջերմաստիճան (TIT)</span>
            <strong class="telemetry-value ${physics.titC > 1400 ? 'is-warning' : ''}">
              ${physics.titC} <small>°C</small>
            </strong>
            <span class="telemetry-hint">${physics.titK} Կելվին</span>
          </div>
        </div>

        <!-- Brilliant Conceptual Card -->
        <div class="physics-explanation-box">
          <h4>💡 Ինչու՞ են ժամանակակից ինքնաթիռներում տեղադրվում մեծ տուրբոֆեններ (BPR > 8)</h4>
          <p>
            Նյուտոնի 2-րդ և 3-րդ օրենքներով քարշուժը հավասար է արտանետվող գազի զանգվածային ծախսի և արագության աճի արտադրյալին՝ $F = \\dot{m} (v_e - v_0)$։ Բայց շարժիչի կորցրած կինետիկ էներգիան համեմատական է արագության քառակուսուն ($E_k \\propto v_e^2$)։
          </p>
          <p>
            Ուստի էներգետիկորեն շատ ավելի շահավետ է <strong>հսկայական զանգվածով սառը օդ մղել չափավոր արագությամբ</strong>, քան քիչ քանակությամբ շիկացած գազ արտանետել գերձայնային արագությամբ։ Արդյունքում քաղաքացիական ինքնաթիռների քարշուժի <strong>80-85%-ը ստեղծում է սառը շրջանցիկ հոսքը</strong>, իսկ վառելիքի ծախսը նվազում է ~30%-ով։
          </p>
        </div>
      </div>

      <!-- Right Column: Controls -->
      <div class="sim-controls-card">
        <h3>Կառավարման Լծակներ</h3>
        <p class="sim-hint">Կարգավորի՛ր գազը, շրջանցման գործակիցը և թռիչքի բարձրությունը</p>

        <!-- Throttle Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-jet-throttle">Քարշի Լծակ (Throttle / Գազ)</label>
            <strong id="label-jet-throttle">${physics.throttle} %</strong>
          </div>
          <input type="range" id="param-jet-throttle" min="10" max="100" step="1" value="${physics.throttle}">
          <div class="range-marks"><span>10% (Idle)</span><span>75% (Cruise)</span><span>100% (Takeoff)</span></div>
        </div>

        <!-- Bypass Ratio Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-jet-bpr">Երկկոնտուրություն (Bypass Ratio)</label>
            <strong id="label-jet-bpr">${physics.bypassRatio} : 1</strong>
          </div>
          <input type="range" id="param-jet-bpr" min="1" max="12" step="0.5" value="${physics.bypassRatio}">
          <div class="range-marks"><span>1:1 (Կործանիչ)</span><span>8:1 (A320/B737)</span><span>12:1 (B787/GE9X)</span></div>
        </div>

        <!-- Altitude Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-jet-alt">Թռիչքի Բարձրություն (Altitude)</label>
            <strong id="label-jet-alt">${physics.altitude.toLocaleString('hy-AM')} մ</strong>
          </div>
          <input type="range" id="param-jet-alt" min="0" max="12000" step="500" value="${physics.altitude}">
          <div class="range-marks"><span>0 մ (Ծովի մակարդակ)</span><span>6,000 մ</span><span>12,000 մ (Էշելոն)</span></div>
        </div>

        <!-- Airspeed Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-jet-speed">Թռիչքի Արագություն</label>
            <strong id="label-jet-speed">${physics.airspeedKmh} կմ/ժ (M ${physics.mach})</strong>
          </div>
          <input type="range" id="param-jet-speed" min="0" max="950" step="25" value="${physics.airspeedKmh}">
          <div class="range-marks"><span>0 (Ստատիկ)</span><span>500 կմ/ժ</span><span>950 կմ/ժ (0.85 M)</span></div>
        </div>
      </div>
    </div>
  `;
}

/**
 * TAB: Brilliant-style Helicopter Swashplate & Rotor Aerodynamics Simulator
 */
function renderHelicopterLab(aero) {
  const h = aero.helicopter;
  const physics = helicopterSwashplateModel({
    collective: h.collective,
    cyclicPitch: h.cyclicPitch,
    cyclicRoll: h.cyclicRoll,
    tailPedal: h.tailPedal,
    mainRpm: h.mainRpm,
  });

  return `
    <div class="aerolab-simulator-layout">
      <!-- Left Column: Simulation Canvas & Telemetry -->
      <div class="sim-viewport-card">
        <div class="sim-viewport-header">
          <div class="viewport-title-wrap">
            <span class="sim-tag">🚁 ՈՒՂՂԱԹԻՌԻ ՌՈՏՈՐ & SWASHPLATE</span>
            <span class="flow-status ${physics.yawState === 'balanced' ? 'is-good' : 'is-stalled'}">
              ${
                physics.yawState === 'balanced'
                  ? (physics.isHovering ? '✓ Կատարյալ Հովերինգ (Կախում)' : '✓ Հավասարակշռված Թռիչք')
                  : '⚠️ Պոչային Հակամոմենտի Շեղում (Spinout)'
              }
            </span>
          </div>
          <div class="viewport-actions">
            <button class="action-btn-small" data-helipreset="hover">🚁 Հովերինգ (50%)</button>
            <button class="action-btn-small" data-helipreset="forward">⏩ Առաջընթաց (Cyclic +25)</button>
            <button class="action-btn-small" data-helipreset="climb">⬆️ Վերելք (Collective 75%)</button>
            <button class="action-btn-small secondary" data-helipreset="spinout">🌀 Պտտահողմ (Spinout)</button>
          </div>
        </div>

        <!-- Helicopter Viewport SVG -->
        <div class="tunnel-scene-wrap">
          ${helicopterSwashplateArt({
            colPitchDeg: physics.colPitchDeg,
            tiltForwardDeg: physics.tiltForwardDeg,
            tiltRollDeg: physics.tiltRollDeg,
            mainTorqueNm: physics.mainTorqueNm,
            tailAntiTorqueNm: physics.tailAntiTorqueNm,
            netYawTorqueNm: physics.netYawTorqueNm,
            yawState: physics.yawState,
            isHover: physics.isHovering,
            flightState: physics.flightState,
            totalThrustKn: physics.totalThrustKn,
            verticalLiftKn: physics.verticalLiftKn,
            forwardThrustKn: physics.forwardThrustKn,
            showVectors: aero.showVectors,
          })}
        </div>

        <!-- Dynamic Telemetry Readouts -->
        <div class="telemetry-grid">
          <div class="telemetry-card">
            <span class="telemetry-label">Վերամբարձ Ուժ (L_վեր)</span>
            <strong class="telemetry-value ${physics.verticalLiftKn >= 20 ? 'is-good' : ''}" id="val-heli-lift">
              ${physics.verticalLiftKn} <small>կՆ</small>
            </strong>
            <span class="telemetry-hint">Քաշ՝ 20.0 կՆ | Քայլ՝ ${physics.colPitchDeg}°</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Առաջ Մղող Քարշուժ (T_առաջ)</span>
            <strong class="telemetry-value ${Math.abs(physics.forwardThrustKn) > 0.5 ? 'is-good' : ''}">
              ${physics.forwardThrustKn} <small>կՆ</small>
            </strong>
            <span class="telemetry-hint">Սկավառակի թեքում՝ ${physics.tiltForwardDeg}°</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Պտտող Մոմենտների Հաշվեկշիռ</span>
            <strong class="telemetry-value ${physics.yawState === 'balanced' ? 'is-good' : 'is-stalled'}">
              ${physics.netYawTorqueNm} <small>Ն·մ</small>
            </strong>
            <span class="telemetry-hint">Ռեակցիա՝ ${physics.mainTorqueNm} Ն·մ | Պոչ՝ ${physics.tailAntiTorqueNm} Ն·մ</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Թռիչքային Կարգավիճակ</span>
            <strong class="telemetry-value is-good">
              ${
                physics.flightState === 'hover'
                  ? 'Հովերինգ'
                  : physics.flightState === 'climb'
                  ? 'Վերելք'
                  : physics.flightState === 'descent'
                  ? 'Վայրէջք'
                  : physics.flightState === 'forward'
                  ? 'Առաջընթաց'
                  : 'Հետընթաց'
              }
            </strong>
            <span class="telemetry-hint">Կուրս՝ ${physics.yawState === 'balanced' ? 'Հաստատուն' : 'Անկայուն'}</span>
          </div>
        </div>

        <!-- Brilliant Conceptual Card -->
        <div class="physics-explanation-box">
          <h4>💡 Ինչպե՞ս է աշխատում Լիցքաթիթեղը (Swashplate) և Պոչային Պտուտակը</h4>
          <p>
            Ուղղաթիռի հիմնական պտուտակը կատարում է երկու կարևորագույն դեր.
            <strong>1. Համատարած քայլ (Collective Pitch)՝</strong> բարձրացնում կամ իջեցնում է լիցքաթիթեղը՝ բոլոր թիակների անկյունը փոխելով միաժամանակ, ինչը ապահովում է վերելքը։
            <strong>2. Շրջափուլային քայլ (Cyclic Pitch)՝</strong> թեքում է լիցքաթիթեղը։ Շնորհիվ 90° գիրոսկոպիկ պրեցեսիայի և աերոդինամիկ փուլային շեղման, թիակների հարթությունը թեքվում է թռիչքի ուղղությամբ։
            <strong>3. Նյուտոնի 3-րդ օրենքը՝</strong> շարժիչը պտտում է գլխավոր ռոտորը, իսկ ֆյուզելյաժը հակառակ ուղղությամբ ստանում է հզոր ռեակտիվ պտտող մոմենտ։ Պոչային պտուտակը (Tail Rotor) չեզոքացնում է այս պտույտը՝ պահելով ուղղաթիռի կայուն ուղղությունը։
          </p>
        </div>
      </div>

      <!-- Right Column: Interactive Sliders & Controls -->
      <div class="sim-controls-card">
        <h3>Ուղղաթիռի Ղեկավարում</h3>

        <!-- Collective Pitch Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-heli-collective">Համատարած Քայլ (Collective Pitch)</label>
            <strong id="label-heli-collective">${h.collective} % (${physics.colPitchDeg}°)</strong>
          </div>
          <input type="range" id="param-heli-collective" min="0" max="100" step="1" value="${h.collective}">
          <div class="range-marks"><span>0% (4° - Իջեցում)</span><span>50% (11° - Հովերինգ)</span><span>100% (18° - Վերելք)</span></div>
        </div>

        <!-- Cyclic Pitch Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-heli-cyclic">Ցիկլիկ Թեքում (Cyclic Pitch Stick)</label>
            <strong id="label-heli-cyclic">${h.cyclicPitch > 0 ? '+' : ''}${h.cyclicPitch} (${physics.tiltForwardDeg}°)</strong>
          </div>
          <input type="range" id="param-heli-cyclic" min="-50" max="50" step="2" value="${h.cyclicPitch}">
          <div class="range-marks"><span>-50 (Ետ)</span><span>0 (Չեզոք)</span><span>+50 (Առաջ)</span></div>
        </div>

        <!-- Tail Rotor Pedal Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-heli-tail">Պոչային Պտուտակ (Anti-Torque Pedals)</label>
            <strong id="label-heli-tail">${h.tailPedal} %</strong>
          </div>
          <input type="range" id="param-heli-tail" min="0" max="100" step="1" value="${h.tailPedal}">
          <div class="range-marks"><span>0% (Ձախ)</span><span>50% (Հավասարակշռված)</span><span>100% (Աջ)</span></div>
        </div>
      </div>
    </div>
  `;
}

/**
 * TAB: Brilliant-style Newton's Orbital Cannonball & Satellite Simulator
 */
function renderOrbitLab(aero) {
  const o = aero.orbit;
  const physics = orbitPhysicsModel({
    launchAltitudeKm: o.launchAltitudeKm,
    horizontalVelocityKms: o.horizontalVelocityKms,
  });

  return `
    <div class="aerolab-simulator-layout">
      <!-- Left Column: Orbital Canvas & Telemetry -->
      <div class="sim-viewport-card">
        <div class="sim-viewport-header">
          <div class="viewport-title-wrap">
            <span class="sim-tag">🛰️ ՆՅՈՒՏՈՆԻ ԹՆԴԱՆՈԹ & ՈՒՂԵԾԻՐ</span>
            <span class="flow-status ${physics.isStableOrbit ? 'is-good' : (physics.status === 'hyperbolic' || physics.status === 'parabolic') ? 'is-warning' : 'is-stalled'}">
              ${
                physics.status === 'circular'
                  ? '✓ Շրջանաձև LEO Ուղեծիր (1-ին տիեզերական)'
                  : physics.status === 'elliptic'
                  ? '✓ Էլիպսաձև Կեպլերյան Ուղեծիր'
                  : (physics.status === 'hyperbolic' || physics.status === 'parabolic')
                  ? '🌌 Խույսի Հետագիծ (2-րդ տիեզերական)'
                  : '⚠️ Բալիստիկ Անկում (v < v₁)'
              }
            </span>
          </div>
          <div class="viewport-actions">
            <button class="action-btn-small" data-orbitpreset="suborbital">☄️ Ենթաուղեծրային (4.5 կմ/վ)</button>
            <button class="action-btn-small" data-orbitpreset="leo">🛰️ Կայուն LEO (7.67 կմ/վ)</button>
            <button class="action-btn-small" data-orbitpreset="gto">⬭ Էլիպս (9.8 կմ/վ)</button>
            <button class="action-btn-small secondary" data-orbitpreset="escape">🌌 Խույս (11.0 կմ/վ)</button>
          </div>
        </div>

        <!-- Orbit Viewport SVG -->
        <div class="tunnel-scene-wrap">
          ${orbitCannonArt({
            launchAltitudeKm: o.launchAltitudeKm,
            horizontalVelocityKms: o.horizontalVelocityKms,
            orbitModel: physics,
            showVectors: aero.showVectors,
          })}
        </div>

        <!-- Dynamic Telemetry Readouts -->
        <div class="telemetry-grid">
          <div class="telemetry-card">
            <span class="telemetry-label">Հորիզոնական Արագություն (v₀)</span>
            <strong class="telemetry-value" id="val-orbit-v0">${o.horizontalVelocityKms} <small>կմ/վ</small></strong>
            <span class="telemetry-hint">1-ին տիեզերական v₁՝ ${physics.v1Kms} կմ/վ</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Էքսցենտրիսիտետ (e)</span>
            <strong class="telemetry-value ${physics.status === 'circular' ? 'is-good' : ''}">
              ${physics.eccentricity}
            </strong>
            <span class="telemetry-hint">${physics.status === 'circular' ? 'Շրջան (e ≈ 0)' : physics.eccentricity < 1 ? 'Էլիպս (e < 1)' : 'Պարաբոլ/Հիպերբոլ (e ≥ 1)'}</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Պերիգեյ / Ապոգեյ (h_p / h_a)</span>
            <strong class="telemetry-value ${physics.hasCollided ? 'is-stalled' : 'is-good'}">
              ${physics.periapsisKm} <small>կմ</small> / ${physics.apoapsisKm !== null ? physics.apoapsisKm + ' կմ' : '∞'}
            </strong>
            <span class="telemetry-hint">${physics.hasCollided ? 'Բախում Երկրի մակերևույթին' : 'Անվտանգ բարձրություն մթնոլորտից'}</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Պարբերություն (T) & Գրավիտացիա (g)</span>
            <strong class="telemetry-value">
              ${physics.periodMin ? physics.periodMin + ' րոպե' : '—'}
            </strong>
            <span class="telemetry-hint">g = ${physics.gravityAtAlt} մ/վ² (${Math.round((physics.gravityAtAlt / 9.81) * 100)}% g₀)</span>
          </div>
        </div>

        <!-- Brilliant Conceptual Card -->
        <div class="physics-explanation-box">
          <h4>💡 Ինչու՞ արբանյակը չի ընկնում Երկրի վրա (Նյուտոնի մտային փորձը)</h4>
          <p>
            Եթե բարձր լեռան գագաթից թնդանոթով հորիզոնական կրակենք, յուրաքանչյուր 8,000 մետր հորիզոնական թռիչքի դեպքում Երկրի գնդաձև մակերևույթը կորանում և իջնում է ուղիղ 4.9 մետրով։ Իսկ ազատ անկման արագացման պատճառով արկը առաջին վայրկյանում իջնում է հենց $h = \\frac{1}{2}gt^2 \\approx 4.9$ մետրով։ Երբ արկի հորիզոնական արագությունը հասնում է $v_1 \\approx 7.9$ կմ/վ ($7.67$ կմ/վ 400 կմ բարձրության վրա), արկն անընդհատ ընկնում է Երկրի վրա, սակայն Երկրի մակերեսը նույնքանով «փախչում է» նրա տակից։ Անկշռությունը ոչ թե գրավիտացիայի բացակայությունն է, այլ անվերջանալի ազատ անկում։
          </p>
        </div>
      </div>

      <!-- Right Column: Interactive Sliders & Presets -->
      <div class="sim-controls-card">
        <h3>Տիեզերական Պարամետրեր</h3>

        <!-- Horizontal Launch Velocity Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-orbit-v0">Հորիզոնական Արագություն (v₀)</label>
            <strong id="label-orbit-v0">${o.horizontalVelocityKms} կմ/վ</strong>
          </div>
          <input type="range" id="param-orbit-v0" min="1.0" max="12.5" step="0.05" value="${o.horizontalVelocityKms}">
          <div class="range-marks">
            <span>1.0 կմ/վ</span>
            <span>7.67 կմ/վ (LEO)</span>
            <span>10.85 կմ/վ (Խույս)</span>
            <span>12.5 կմ/վ</span>
          </div>
        </div>

        <!-- Launch Altitude Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-orbit-alt">Ուղեծրային Բարձրություն (h)</label>
            <strong id="label-orbit-alt">${o.launchAltitudeKm} կմ</strong>
          </div>
          <input type="range" id="param-orbit-alt" min="100" max="1500" step="50" value="${o.launchAltitudeKm}">
          <div class="range-marks"><span>100 կմ (Կարմանի գիծ)</span><span>400 կմ (ISS)</span><span>1,500 կմ</span></div>
        </div>

        <!-- Velocity Indicator Thresholds -->
        <div class="orbit-hud-card" style="margin-top: 1.25rem; padding: 1rem; border-radius: 12px; background: #0f172a; border: 1.5px solid #334155;">
          <h4 style="margin: 0 0 0.5rem 0; font-size: 0.95rem; color: #f8fafc;">🚀 Տիեզերական Արագության Սանդղակ</h4>
          <div style="display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.85rem;">
            <div style="display: flex; justify-content: space-between; color: ${o.horizontalVelocityKms < physics.v1Kms ? '#f87171' : '#94a3b8'};">
              <span>☄️ Ենթաուղեծրային տիրույթ՝</span>
              <strong>&lt; ${physics.v1Kms} կմ/վ</strong>
            </div>
            <div style="display: flex; justify-content: space-between; color: ${physics.status === 'circular' ? '#4ade80' : '#94a3b8'};">
              <span>🛰️ 1-ին տիեզերական (Շրջան)՝</span>
              <strong>${physics.v1Kms} կմ/վ</strong>
            </div>
            <div style="display: flex; justify-content: space-between; color: ${physics.status === 'elliptic' ? '#fbbf24' : '#94a3b8'};">
              <span>⬭ Էլիպսաձև փակ ուղեծիր՝</span>
              <strong>${physics.v1Kms} – ${physics.vEscKms} կմ/վ</strong>
            </div>
            <div style="display: flex; justify-content: space-between; color: ${o.horizontalVelocityKms >= physics.vEscKms ? '#c084fc' : '#94a3b8'};">
              <span>🌌 2-րդ տիեզերական (Հեռացում)՝</span>
              <strong>&ge; ${physics.vEscKms} կմ/վ</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * TAB: Brilliant-style Atmospheric Thermal Soaring & Glider Polar Simulator
 */
function renderGliderLab(aero) {
  const g = aero.glider;
  const physics = gliderThermalModel({
    airSpeedKmh: g.airSpeedKmh,
    bankAngleDeg: g.bankAngleDeg,
    thermalStrength: g.thermalStrength,
    thermalRadius: g.thermalRadius,
  });

  return `
    <div class="aerolab-simulator-layout">
      <!-- Left Column: Simulation Viewport & Telemetry -->
      <div class="sim-viewport-card">
        <div class="sim-viewport-header">
          <div class="viewport-title-wrap">
            <span class="sim-tag">🌬️ ԹԵՐՄԻԿ ՍԱՎԱՌՆՈՒՄ & ՊՈԼՅԱՐԱ</span>
            <span class="flow-status ${physics.isClimbing ? 'is-good' : 'is-stalled'}">
              ${
                physics.isClimbing
                  ? `✓ Դրական Վերելք (+${physics.netClimbRate} մ/վ)`
                  : `⚠️ Բարձրության Կորուստ (${physics.netClimbRate} մ/վ)`
              }
            </span>
          </div>
          <div class="viewport-actions">
            <button class="action-btn-small" data-gliderpreset="optimal">🌀 Օպտիմալ Թերմիկ (30°)</button>
            <button class="action-btn-small" data-gliderpreset="level">➡️ Ուղիղ Սավառնում (Max L/D)</button>
            <button class="action-btn-small" data-gliderpreset="steep">⚡ Կտրուկ Թեքում (55°, 1.7g)</button>
            <button class="action-btn-small secondary" data-gliderpreset="weak">☁️ Թույլ Թերմիկ (1.5 մ/վ)</button>
          </div>
        </div>

        <!-- Glider Viewport SVG -->
        <div class="tunnel-scene-wrap">
          ${gliderThermalArt({
            airSpeedKmh: physics.forwardSpeedKmh,
            bankAngleDeg: physics.bankAngleDeg,
            thermalStrength: g.thermalStrength,
            thermalRadius: g.thermalRadius,
            turnRadiusM: physics.turnRadiusM,
            loadFactor: physics.loadFactor,
            turnSinkRate: physics.turnSinkRate,
            thermalUpdraft: physics.thermalUpdraft,
            netClimbRate: physics.netClimbRate,
            bestLd: physics.bestLd,
            isClimbing: physics.isClimbing,
            showVectors: aero.showVectors,
          })}
        </div>

        <!-- Telemetry HUD Cards -->
        <div class="telemetry-grid">
          <div class="telemetry-card">
            <span class="telemetry-label">Արդյունարար Վերելք (Net Climb)</span>
            <strong class="telemetry-value ${physics.isClimbing ? 'is-good' : 'is-stalled'}" id="val-glider-net">
              ${physics.netClimbRate > 0 ? '+' : ''}${physics.netClimbRate} <small>մ/վ</small>
            </strong>
            <span class="telemetry-hint">Թերմիկ (${physics.thermalUpdraft} մ/վ) - Իջեցում (${physics.turnSinkRate} մ/վ)</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Շրջադարձի Շառավիղ (R)</span>
            <strong class="telemetry-value">
              ${physics.turnRadiusM < 9999 ? physics.turnRadiusM + ' մ' : 'Ուղղագիծ'}
            </strong>
            <span class="telemetry-hint">R = v² / (g · tan φ)</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Գերբեռնվածություն (n = 1/cos φ)</span>
            <strong class="telemetry-value ${physics.loadFactor > 1.5 ? 'is-warning' : ''}">
              ${physics.loadFactor} <small>g</small>
            </strong>
            <span class="telemetry-hint">Թևերի բեռնվածություն շրջադարձում</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Աերոդինամիկ Որակ (L/D)</span>
            <strong class="telemetry-value is-good">
              ${physics.bestLd} : 1
            </strong>
            <span class="telemetry-hint">Օպտիմալ արագություն՝ ${physics.bestSpeedKmh} կմ/ժ</span>
          </div>
        </div>

        <!-- Brilliant Conceptual Explanation -->
        <div class="physics-explanation-box">
          <h4>💡 Ինչպե՞ս են սավառնորդները ժամերով մնում օդում առանց շարժիչի</h4>
          <p>
            Արևի ճառագայթներից տաքացած գետնի մակերևույթը տաքացնում է սահմանամերձ օդը։ Տաք օդը, լինելով ավելի թեթև, վեր է բարձրանում հզոր կոնվեկտիվ սյուներով (թերմիկներ)՝ 2-6 մ/վ արագությամբ։ Երբ սավառնակը կողաթեքվում է ($\phi = 30^\circ$) և պտտվում է թերմիկի ներսում, նրա սեփական իջեցման արագությունը (օր. $1.0$ մ/վ) փոքր է օդի վերընթաց արագությունից ($+3.5$ մ/վ), և սավառնակը բարձրանում է $+2.5$ մ/վ արագությամբ՝ կուտակելով հսկայական պոտենցիալ էներգիա։
          </p>
        </div>
      </div>

      <!-- Right Column: Interactive Sliders -->
      <div class="sim-controls-card">
        <h3>Սավառնման Պարամետրեր</h3>

        <!-- Forward Airspeed Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-glider-speed">Առաջընթաց Արագություն (v_a)</label>
            <strong id="label-glider-speed">${g.airSpeedKmh} կմ/ժ</strong>
          </div>
          <input type="range" id="param-glider-speed" min="60" max="180" step="2" value="${g.airSpeedKmh}">
          <div class="range-marks">
            <span>60 կմ/ժ (Stall-ի մոտ)</span>
            <span>90 կմ/ժ (Best L/D)</span>
            <span>180 կմ/ժ (Արագ անցում)</span>
          </div>
        </div>

        <!-- Bank Angle Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-glider-bank">Կողաթեքման Անկյուն (Bank Angle φ)</label>
            <strong id="label-glider-bank">${g.bankAngleDeg}°</strong>
          </div>
          <input type="range" id="param-glider-bank" min="0" max="65" step="1" value="${g.bankAngleDeg}">
          <div class="range-marks">
            <span>0° (Ուղիղ)</span>
            <span>30° (Օպտիմալ)</span>
            <span>60° (2.0 g ծանրաբեռնվածություն)</span>
          </div>
        </div>

        <!-- Thermal Core Strength Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-glider-thermal">Թերմիկի Ուժգնություն (w_core)</label>
            <strong id="label-glider-thermal">+${g.thermalStrength} մ/վ</strong>
          </div>
          <input type="range" id="param-glider-thermal" min="0" max="8.0" step="0.2" value="${g.thermalStrength}">
          <div class="range-marks">
            <span>0 մ/վ (Հանդարտ օդ)</span>
            <span>3.5 մ/վ (Միջին)</span>
            <span>8.0 մ/վ (Հզոր կոնվեկցիա)</span>
          </div>
        </div>

        <!-- Thermal Radius Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-glider-radius">Թերմիկ Սյան Շառավիղ (R_thermal)</label>
            <strong id="label-glider-radius">${g.thermalRadius} մ</strong>
          </div>
          <input type="range" id="param-glider-radius" min="50" max="250" step="10" value="${g.thermalRadius}">
          <div class="range-marks">
            <span>50 մ (Նեղ սյուն)</span>
            <span>120 մ</span>
            <span>250 մ (Լայն ամպատակ)</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * TAB: Brilliant-style Ion Space Thruster & Electric Propulsion Simulator
 */
function renderIonLab(aero) {
  const ion = aero.ion;
  const physics = ionThrusterModel({
    beamVoltageV: ion.beamVoltageV,
    beamCurrentA: ion.beamCurrentA,
    propellant: ion.propellant,
    spacecraftMassKg: ion.spacecraftMassKg,
  });

  return `
    <div class="aerolab-simulator-layout">
      <!-- Left Column: Simulation Viewport & Telemetry -->
      <div class="sim-viewport-card">
        <div class="sim-viewport-header">
          <div class="viewport-title-wrap">
            <span class="sim-tag">⚡ ԻՈՆԱՅԻՆ ՇԱՐԺԻՉ & ԽՈՐ ՏԻԵԶԵՐՔ</span>
            <span class="flow-status is-good">
              ✓ Isp = ${physics.specificImpulseSec.toLocaleString('hy-AM')} վ (>10x քիմիական հրթիռից)
            </span>
          </div>
          <div class="viewport-actions">
            <button class="action-btn-small" data-ionpreset="dawn">🛰️ NASA Dawn (Ceres)</button>
            <button class="action-btn-small" data-ionpreset="starlink">📡 Starlink (Kr/Ar)</button>
            <button class="action-btn-small" data-ionpreset="bepi">🪐 BepiColombo (Mercury)</button>
            <button class="action-btn-small secondary" data-ionpreset="deepspace">🌌 Deep Space 1 (NSTAR)</button>
          </div>
        </div>

        <!-- Ion Viewport SVG -->
        <div class="tunnel-scene-wrap">
          ${ionThrusterArt({
            beamVoltageV: ion.beamVoltageV,
            beamCurrentA: ion.beamCurrentA,
            propellant: ion.propellant,
            thrustMilliN: physics.thrustMilliN,
            specificImpulseSec: physics.specificImpulseSec,
            exhaustVelocityKms: physics.exhaustVelocityKms,
            beamPowerKw: physics.beamPowerKw,
            showVectors: aero.showVectors,
          })}
        </div>

        <!-- Telemetry HUD Cards -->
        <div class="telemetry-grid">
          <div class="telemetry-card">
            <span class="telemetry-label">Տեսակարար Իմպուլս (I_sp)</span>
            <strong class="telemetry-value is-good" id="val-ion-isp">
              ${physics.specificImpulseSec.toLocaleString('hy-AM')} <small>վ</small>
            </strong>
            <span class="telemetry-hint">Արտահոսքի արագություն՝ ${physics.exhaustVelocityKms} կմ/վ</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Շարունակական Քարշուժ (F)</span>
            <strong class="telemetry-value">
              ${physics.thrustMilliN} <small>մՆ</small>
            </strong>
            <span class="telemetry-hint">Ծախս՝ ${physics.massFlowMgS} մգ/վ (աննշան կորուստ)</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Օրական Արագացում (Δv / օր)</span>
            <strong class="telemetry-value is-good">
              +${physics.deltaVPerDayMs} <small>մ/վ / օր</small>
            </strong>
            <span class="telemetry-hint">Արագացում՝ ${physics.accelerationMmS2} մմ/վ²</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Էլեկտրական Հզորություն (P)</span>
            <strong class="telemetry-value">
              ${physics.totalPowerKw} <small>կՎտ</small>
            </strong>
            <span class="telemetry-hint">Քարշ/Հզորություն՝ ${physics.thrustToPowerRatio} մՆ/կՎտ</span>
          </div>
        </div>

        <!-- Brilliant Conceptual Explanation -->
        <div class="physics-explanation-box">
          <h4>💡 Ինչու՞ իոնային շարժիչներն անփոխարինելի են խոր տիեզերքում</h4>
          <p>
            Քիմիական հրթիռների այրման արգասիքները դուրս են նետվում առավելագույնը 3-4.5 կմ/վ արագությամբ ($I_{\\text{sp}} \\approx 300-450$ վ)։ Իսկ էլեկտրաստատիկ դաշտով արագացվող Քսենոնի իոնները սլանում են <b>40-50 կմ/վ արագությամբ</b> ($I_{\\text{sp}} > 4,500$ վ)։ Ցիոլկովսկու բանաձևի համաձայն՝ $\\Delta v = v_e \\ln(m_0/m_f)$․ իոնային շարժիչի դեպքում միջմոլորակային թռիչքի համար պահանջվում է <b>10 անգամ ավելի քիչ վառելիք</b>։ Տիեզերանավի քաշի 80%-ը դառնում է գիտական օգտակար բեռ, այլ ոչ թե ծանր վառելիքային բաքեր։
          </p>
        </div>
      </div>

      <!-- Right Column: Interactive Sliders -->
      <div class="sim-controls-card">
        <h3>Էլեկտրական Շարժիչի Պարամետրեր</h3>

        <!-- Beam Voltage Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-ion-voltage">Արագացնող Լարում (Beam Voltage)</label>
            <strong id="label-ion-voltage">${ion.beamVoltageV} Վ</strong>
          </div>
          <input type="range" id="param-ion-voltage" min="800" max="3500" step="50" value="${ion.beamVoltageV}">
          <div class="range-marks">
            <span>800 Վ (34 կմ/վ)</span>
            <span>1,500 Վ (47 կմ/վ)</span>
            <span>3,500 Վ (72 կմ/վ)</span>
          </div>
        </div>

        <!-- Beam Current Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-ion-current">Իոնային Փնջի Հոսանք (Beam Current)</label>
            <strong id="label-ion-current">${ion.beamCurrentA} Ա</strong>
          </div>
          <input type="range" id="param-ion-current" min="0.5" max="3.5" step="0.1" value="${ion.beamCurrentA}">
          <div class="range-marks">
            <span>0.5 Ա (35 մՆ)</span>
            <span>1.8 Ա (128 մՆ)</span>
            <span>3.5 Ա (250 մՆ)</span>
          </div>
        </div>

        <!-- Propellant Gas Selector -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-ion-propellant">Աշխատանքային Մարմին (Propellant)</label>
            <strong id="label-ion-propellant">${physics.propellantName}</strong>
          </div>
          <select id="param-ion-propellant" class="propellant-select" style="width: 100%; padding: 0.6rem; border-radius: 8px; font-weight: 700; background: #0f172a; color: #f8fafc; border: 1.5px solid #334155;">
            <option value="xenon" ${ion.propellant === 'xenon' ? 'selected' : ''}>Քսենոն (Xenon Xe, 131.3 amu) · Դասական ստանդարտ</option>
            <option value="krypton" ${ion.propellant === 'krypton' ? 'selected' : ''}>Կրիպտոն (Krypton Kr, 83.8 amu) · Starlink մատչելի</option>
            <option value="argon" ${ion.propellant === 'argon' ? 'selected' : ''}>Արգոն (Argon Ar, 39.9 amu) · Գերբարձր Isp</option>
            <option value="iodine" ${ion.propellant === 'iodine' ? 'selected' : ''}>Յոդ (Iodine I₂, 126.9 amu) · Պինդ պահեստավորում</option>
          </select>
        </div>

        <!-- Spacecraft Mass Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-ion-mass">Տիեզերանավի Զանգված (Mass)</label>
            <strong id="label-ion-mass">${ion.spacecraftMassKg} կգ</strong>
          </div>
          <input type="range" id="param-ion-mass" min="200" max="2000" step="50" value="${ion.spacecraftMassKg}">
          <div class="range-marks">
            <span>200 կգ (CubeSat)</span>
            <span>650 կգ (Dawn)</span>
            <span>2,000 կգ (Ծանր զոնդ)</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * TAB 3: DIY Home Engineering Guide
 */
function renderDiyGuide(aero) {
  const selectedProj = DIY_PROJECTS.find((p) => p.id === aero.diySelected) || DIY_PROJECTS[0];

  return `
    <div class="diy-guide-container">
      <!-- Project Selection Cards Grid -->
      <div class="diy-cards-grid">
        ${DIY_PROJECTS.map(
          (p) => `
          <button class="diy-project-card ${p.id === aero.diySelected ? 'selected' : ''}" data-diyselect="${p.id}">
            <div class="diy-card-header">
              <span class="diy-badge">${p.difficulty}</span>
              <span class="diy-time">⏱ ${p.buildTime}</span>
            </div>
            <h4>${p.title}</h4>
            <p>${p.subtitle}</p>
          </button>
        `
        ).join('')}
      </div>

      <!-- Selected Project Detailed Blueprint -->
      <article class="diy-blueprint-card">
        <div class="blueprint-header">
          <span class="eyebrow">ԻՆԺԵՆԵՐԱԿԱՆ ՈՒՂԵՑՈՒՅՑ · DIY</span>
          <h2>${selectedProj.title}</h2>
          <p class="blueprint-sub">${selectedProj.subtitle}</p>
        </div>

        <div class="blueprint-body">
          <!-- Physics Secret Box -->
          <div class="blueprint-secret-box">
            <h4>💡 Ֆիզիկական Գաղտնիքը</h4>
            <p>${selectedProj.physicsSecret}</p>
          </div>

          <!-- Materials Checklist -->
          <div class="blueprint-section">
            <h3>📦 Անհրաժեշտ Նյութեր (գրեթե 0 ծախս)</h3>
            <ul class="materials-list">
              ${selectedProj.materials.map((m) => `<li><span class="check-icon">✓</span> <span>${m}</span></li>`).join('')}
            </ul>
          </div>

          <!-- Step-by-Step Instructions -->
          <div class="blueprint-section">
            <h3>🔨 Քայլ առ Քայլ Պատրաստման Ընթացք</h3>
            <div class="steps-flow">
              ${selectedProj.steps
                .map(
                  (s, idx) => `
                <div class="step-card">
                  <div class="step-num">${idx + 1}</div>
                  <div class="step-content">
                    <h4>${s.title}</h4>
                    <p>${s.detail}</p>
                  </div>
                </div>
              `
                )
                .join('')}
            </div>
          </div>

          <!-- Troubleshooting Box -->
          <div class="blueprint-section">
            <h3>🔧 Հնարավոր Խնդիրներ և Շտկումներ</h3>
            <ul class="trouble-list">
              ${selectedProj.troubleshooting.map((t) => `<li>${t}</li>`).join('')}
            </ul>
          </div>
        </div>
      </article>
    </div>
  `;
}

/**
 * TAB 7: Duolingo-style Mastery Badges & Achievements
 */
function renderBadgesView(aero) {
  let earnedCount = 0;
  let totalXp = 0;

  const badgesHtml = AERO_BADGES.map((b) => {
    const isUnlocked = b.check(aero);
    if (isUnlocked) {
      earnedCount++;
      totalXp += b.points;
    }
    return `
      <div class="aero-badge-card ${isUnlocked ? 'unlocked' : 'locked'}">
        <div class="badge-icon-wrap">
          <span class="badge-big-icon">${b.icon}</span>
          ${isUnlocked ? '<span class="badge-check-mark">✓</span>' : '<span class="badge-lock-mark">🔒</span>'}
        </div>
        <div class="badge-info">
          <h4>${b.title}</h4>
          <p>${b.desc}</p>
          <div class="badge-reward">
            <span class="xp-pill ${isUnlocked ? 'is-good' : ''}">
              ${isUnlocked ? '✓ Ձեռքբերված' : 'Չբացված'} · +${b.points} XP
            </span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="badges-view-container">
      <div class="badges-header-card">
        <div class="badges-summary-info">
          <span class="eyebrow">ԽԱՂԱՅԻՆ ՁԵՌՔԲԵՐՈՒՄՆԵՐ · DUOLINGO STYLE</span>
          <h2>Ավիացիոն Լաբորատորիայի Պարգևներ</h2>
          <p>Կատարի՛ր հետազոտական փորձերը բոլոր սիմուլյատորներում և բացի՛ր բոլոր վարպետության բեյջերը։</p>
        </div>
        <div class="badges-score-box">
          <div class="score-circle">
            <strong>${earnedCount} / ${AERO_BADGES.length}</strong>
            <span>Բեյջ</span>
          </div>
          <div class="xp-total-display">
            <strong>⚡ ${totalXp} XP</strong>
            <small>Վաստակած միավոր</small>
          </div>
        </div>
      </div>

      <div class="aero-badges-grid">
        ${badgesHtml}
      </div>
    </div>
  `;
}

/**
 * TAB 4: Duolingo-style Bite-sized Conceptual Challenges (AeroQuiz)
 */
function renderAeroQuiz(aero) {
  const qState = aero.quiz;
  const q = AERO_CHALLENGES[qState.index];
  const chosen = qState.selected;
  const submitted = qState.submitted;
  const isCorrect = submitted && chosen === q.correct;
  const isFinished = qState.index >= AERO_CHALLENGES.length;

  if (isFinished) {
    return `
      <div class="quiz-completion-card">
        <div class="completion-icon">🏆</div>
        <h2>Հիանալի՛ է, Հետազոտող։</h2>
        <p>Դու հաջողությամբ յուրացրիր թռիչքի և աերոդինամիկայի բոլոր հիմնարար օրենքները։</p>
        <div class="score-pill">Արդյունք՝ ${qState.score} / ${AERO_CHALLENGES.length} ճիշտ</div>
        <button class="button lesson-primary" id="btn-restart-quiz">Սկսել նորից</button>
      </div>
    `;
  }

  return `
    <div class="aero-quiz-container">
      <div class="quiz-progress-bar">
        <div class="quiz-progress-fill" style="width: ${(qState.index / AERO_CHALLENGES.length) * 100}%"></div>
      </div>

      <div class="quiz-header">
        <span class="eyebrow">Հարց ${qState.index + 1} / ${AERO_CHALLENGES.length}</span>
        <h2>${q.question}</h2>
      </div>

      <!-- Tactile Duolingo Choice Cards -->
      <div class="activity-choices" role="radiogroup">
        ${q.options
          .map((opt, i) => {
            const isSelected = chosen === i;
            let statusClass = '';
            if (submitted) {
              if (i === q.correct) statusClass = 'is-correct';
              else if (isSelected) statusClass = 'is-incorrect';
              else statusClass = 'is-neutral';
            }

            return `
            <button class="answer ${isSelected ? 'selected' : ''} ${statusClass}" 
                    data-aerochoice="${i}" 
                    role="radio" 
                    aria-checked="${isSelected}" 
                    ${submitted ? 'disabled' : ''}>
              <span class="answer-badge">${i + 1}</span>
              <span class="answer-text">${opt}</span>
              <span class="answer-indicator radio-dot">
                ${statusClass === 'is-correct' ? '<span class="icon-check">✓</span>' : statusClass === 'is-incorrect' ? '<span class="icon-cross">✕</span>' : ''}
              </span>
            </button>
          `;
          })
          .join('')}
      </div>

      <!-- Anchored Feedback Dock -->
      ${
        submitted
          ? `
        <div class="lesson-feedback-dock assessment-feedback ${isCorrect ? 'correct' : 'incorrect'}">
          <div class="feedback-dock-content">
            <div class="feedback-status-row">
              <span class="feedback-status-badge">${isCorrect ? '✓' : '✕'}</span>
              <h3 class="feedback-heading">${isCorrect ? 'Ճիշտ է' : 'Դեռ ճիշտ չէ'}</h3>
            </div>
            <p class="feedback-explanation">${q.explanation}</p>
          </div>
          <div class="feedback-dock-actions">
            <button class="button lesson-primary ${isCorrect ? '' : 'danger'}" id="btn-aero-continue">
              Շարունակել →
            </button>
          </div>
        </div>
      `
          : `
        <div class="lesson-feedback-dock">
          <div class="feedback-dock-actions">
            <button class="button lesson-primary" id="btn-aero-check" ${chosen === null ? 'disabled' : ''}>
              Ստուգել
            </button>
          </div>
        </div>
      `
      }
    </div>
  `;
}

/**
 * Event Bindings and 60fps Simulation Loop
 */
export function bindAeroLab(root, state, save, render) {
  state.aerolab ||= initialAeroLabState();
  const aero = state.aerolab;
  let disposed = false;
  let raf = null;
  let lastTime = performance.now();

  // Tab switching with delegation & direct handlers
  root.querySelectorAll('[data-aerotab]').forEach((b) => {
    b.onclick = (e) => {
      aero.tab = b.dataset.aerotab;
      save();
      render();
    };
  });

  // Toggle force vectors
  const vecToggle = root.querySelector('#toggle-vectors');
  if (vecToggle) {
    vecToggle.onchange = (e) => {
      aero.showVectors = e.target.checked;
      render();
    };
  }

  // Parameter sliders: Rocket
  const p = aero.rocket.params;
  const sliderP = root.querySelector('#param-pressure');
  if (sliderP) {
    sliderP.oninput = (e) => {
      p.pressureBar = Number(e.target.value);
      root.querySelector('#label-pressure').textContent = `${p.pressureBar} բար (մթն.)`;
      resetRocketSim();
    };
  }

  const sliderW = root.querySelector('#param-water');
  if (sliderW) {
    sliderW.oninput = (e) => {
      p.waterFraction = Number(e.target.value);
      root.querySelector('#label-water').textContent = `${Math.round(p.waterFraction * 100)} %`;
      resetRocketSim();
    };
  }

  const sliderA = root.querySelector('#param-angle');
  if (sliderA) {
    sliderA.oninput = (e) => {
      p.angleDeg = Number(e.target.value);
      root.querySelector('#label-angle').textContent = `${p.angleDeg}°`;
      resetRocketSim();
    };
  }

  // Fin buttons
  root.querySelectorAll('[data-fincount]').forEach((btn) => {
    btn.onclick = () => {
      p.finCount = Number(btn.dataset.fincount);
      resetRocketSim();
      render();
    };
  });

  // Nose buttons
  root.querySelectorAll('[data-noseshape]').forEach((btn) => {
    btn.onclick = () => {
      p.noseShape = btn.dataset.noseshape;
      resetRocketSim();
      render();
    };
  });

  // Rocket Action Buttons
  const launchBtn = root.querySelector('#btn-launch-rocket');
  if (launchBtn) {
    launchBtn.onclick = () => {
      if (aero.running) {
        aero.running = false;
        cancelAnimationFrame(raf);
        render();
      } else {
        if (aero.rocket.status === 'landed') {
          resetRocketSim();
        }
        aero.running = true;
        aero.rocket.status = 'thrust';
        playSound('control');
        lastTime = performance.now();
        raf = requestAnimationFrame(rocketTick);
        render();
      }
    };
  }

  const resetBtn = root.querySelector('#btn-reset-rocket');
  if (resetBtn) {
    resetBtn.onclick = () => {
      aero.running = false;
      cancelAnimationFrame(raf);
      resetRocketSim();
      render();
    };
  }

  function resetRocketSim() {
    aero.rocket = initialRocketState(p);
  }

  function rocketTick(now) {
    if (disposed || !aero.running) return;

    const dt = Math.min(0.04, (now - lastTime) / 1000);
    lastTime = now;

    // Substep physics for numerical stability
    const subSteps = 3;
    const subDt = dt / subSteps;
    for (let i = 0; i < subSteps; i++) {
      stepRocket(aero.rocket, subDt);
    }

    if (aero.rocket.status === 'landed') {
      aero.running = false;
      playSound('complete');
      render();
      return;
    }

    // Dynamic UI update
    updateRocketDom();
    raf = requestAnimationFrame(rocketTick);
  }

  function updateRocketDom() {
    const r = aero.rocket;
    const groundY = 350;
    const scale = 2.5;
    const rocketScreenX = 70 + r.x * scale;
    const rocketScreenY = groundY - r.y * scale;

    const actor = root.querySelector('#rocket-actor');
    if (actor) {
      actor.setAttribute('transform', `translate(${rocketScreenX}, ${rocketScreenY}) scale(0.7)`);
      actor.innerHTML = rocketArt({
        pitch: r.pitch,
        finCount: p.finCount,
        noseShape: p.noseShape,
        waterRemaining: r.waterRemaining,
        totalWater: p.bottleVolume * p.waterFraction,
        status: r.status,
        speed: r.speed,
        thrust: r.thrust,
        showVectors: aero.showVectors,
        gravity: r.gravity,
        drag: r.drag,
      });
    }

    const traj = root.querySelector('#rocket-trajectory');
    if (traj) {
      traj.setAttribute('d', renderTrajectoryPath(r.trajectory, scale, groundY));
    }

    // Update readouts
    const elAlt = root.querySelector('#val-altitude');
    if (elAlt) elAlt.innerHTML = `${num(r.y)} <small>մ</small>`;
    const elApo = root.querySelector('#val-apogee');
    if (elApo) elApo.innerHTML = `${num(r.apogee)} <small>մ</small>`;
    const elSpd = root.querySelector('#val-speed');
    if (elSpd) elSpd.innerHTML = `${num(r.speed)} <small>մ/վ</small>`;
    const elThr = root.querySelector('#val-thrust');
    if (elThr) elThr.innerHTML = `${Math.round(r.thrust)} <small>Ն</small>`;
    const elSt = root.querySelector('#val-status');
    if (elSt) {
      elSt.textContent = statusText(r.status, r.isStable);
      elSt.className = `telemetry-status ${r.status === 'tumble' ? 'is-warning' : 'is-good'}`;
    }
  }

  // Wind Tunnel Slider Bindings
  const tAngle = root.querySelector('#tunnel-angle');
  if (tAngle) {
    tAngle.oninput = (e) => {
      aero.tunnel.angleDeg = Number(e.target.value);
      render();
    };
  }

  const tSpeed = root.querySelector('#tunnel-speed');
  if (tSpeed) {
    tSpeed.oninput = (e) => {
      aero.tunnel.airSpeed = Number(e.target.value);
      render();
    };
  }

  // Drone Sliders & Buttons
  const droneMaster = root.querySelector('#drone-master-throttle');
  if (droneMaster) {
    droneMaster.oninput = (e) => {
      const val = Number(e.target.value);
      aero.drone.motors = [val, val, val, val];
      render();
    };
  }

  ['1', '2', '3', '4'].forEach((nStr, idx) => {
    const mInput = root.querySelector(`#motor-${nStr}`);
    if (mInput) {
      mInput.oninput = (e) => {
        aero.drone.motors[idx] = Number(e.target.value);
        render();
      };
    }
  });

  const droneHover = root.querySelector('#btn-drone-hover');
  if (droneHover) {
    droneHover.onclick = () => {
      aero.drone.motors = [100, 100, 100, 100];
      playSound('control');
      render();
    };
  }

  const droneYawLeft = root.querySelector('#btn-drone-yaw-left');
  if (droneYawLeft) {
    droneYawLeft.onclick = () => {
      aero.drone.motors[0] = Math.min(160, aero.drone.motors[0] + 15);
      aero.drone.motors[2] = Math.min(160, aero.drone.motors[2] + 15);
      aero.drone.motors[1] = Math.max(20, aero.drone.motors[1] - 15);
      aero.drone.motors[3] = Math.max(20, aero.drone.motors[3] - 15);
      playSound('control');
      render();
    };
  }

  const droneYawRight = root.querySelector('#btn-drone-yaw-right');
  if (droneYawRight) {
    droneYawRight.onclick = () => {
      aero.drone.motors[1] = Math.min(160, aero.drone.motors[1] + 15);
      aero.drone.motors[3] = Math.min(160, aero.drone.motors[3] + 15);
      aero.drone.motors[0] = Math.max(20, aero.drone.motors[0] - 15);
      aero.drone.motors[2] = Math.max(20, aero.drone.motors[2] - 15);
      playSound('control');
      render();
    };
  }

  const droneTiltFwd = root.querySelector('#btn-drone-tilt-fwd');
  if (droneTiltFwd) {
    droneTiltFwd.onclick = () => {
      aero.drone.motors[2] = Math.min(160, aero.drone.motors[2] + 25);
      aero.drone.motors[0] = Math.max(30, aero.drone.motors[0] - 25);
      playSound('control');
      render();
    };
  }

  const droneReset = root.querySelector('#btn-drone-reset');
  if (droneReset) {
    droneReset.onclick = () => {
      aero.drone.motors = [100, 100, 100, 100];
      render();
    };
  }

  // Supersonic Slider & Presets
  const machInput = root.querySelector('#param-mach');
  if (machInput) {
    machInput.oninput = (e) => {
      aero.supersonic.mach = Number(e.target.value);
      render();
    };
  }

  root.querySelectorAll('[data-mach]').forEach((btn) => {
    btn.onclick = () => {
      aero.supersonic.mach = Number(btn.dataset.mach);
      playSound('control');
      render();
    };
  });

  // Turbofan Jet Controls
  const jetThrottle = root.querySelector('#param-jet-throttle');
  if (jetThrottle) {
    jetThrottle.oninput = (e) => {
      aero.jet.throttle = Number(e.target.value);
      render();
    };
  }

  const jetBpr = root.querySelector('#param-jet-bpr');
  if (jetBpr) {
    jetBpr.oninput = (e) => {
      aero.jet.bypassRatio = Number(e.target.value);
      render();
    };
  }

  const jetAlt = root.querySelector('#param-jet-alt');
  if (jetAlt) {
    jetAlt.oninput = (e) => {
      aero.jet.altitude = Number(e.target.value);
      render();
    };
  }

  const jetSpeed = root.querySelector('#param-jet-speed');
  if (jetSpeed) {
    jetSpeed.oninput = (e) => {
      aero.jet.airspeedKmh = Number(e.target.value);
      render();
    };
  }

  root.querySelectorAll('[data-jetpreset]').forEach((btn) => {
    btn.onclick = () => {
      const preset = btn.dataset.jetpreset;
      if (preset === 'takeoff') {
        aero.jet.throttle = 100;
        aero.jet.bypassRatio = 8.5;
        aero.jet.altitude = 0;
        aero.jet.airspeedKmh = 180;
      } else if (preset === 'cruise') {
        aero.jet.throttle = 75;
        aero.jet.bypassRatio = 10.0;
        aero.jet.altitude = 10500;
        aero.jet.airspeedKmh = 850;
      } else if (preset === 'dash') {
        aero.jet.throttle = 95;
        aero.jet.bypassRatio = 2.0;
        aero.jet.altitude = 5000;
        aero.jet.airspeedKmh = 900;
      } else if (preset === 'idle') {
        aero.jet.throttle = 15;
        aero.jet.bypassRatio = 8.5;
        aero.jet.altitude = 1000;
        aero.jet.airspeedKmh = 200;
      }
      playSound('control');
      render();
    };
  });

  // Helicopter Swashplate & Rotor Controls
  const heliCol = root.querySelector('#param-heli-collective');
  if (heliCol) {
    heliCol.oninput = (e) => {
      aero.helicopter.collective = Number(e.target.value);
      render();
    };
  }

  const heliCyc = root.querySelector('#param-heli-cyclic');
  if (heliCyc) {
    heliCyc.oninput = (e) => {
      aero.helicopter.cyclicPitch = Number(e.target.value);
      render();
    };
  }

  const heliTail = root.querySelector('#param-heli-tail');
  if (heliTail) {
    heliTail.oninput = (e) => {
      aero.helicopter.tailPedal = Number(e.target.value);
      render();
    };
  }

  root.querySelectorAll('[data-helipreset]').forEach((btn) => {
    btn.onclick = () => {
      const preset = btn.dataset.helipreset;
      if (preset === 'hover') {
        aero.helicopter.collective = 50;
        aero.helicopter.cyclicPitch = 0;
        aero.helicopter.tailPedal = 50;
      } else if (preset === 'forward') {
        aero.helicopter.collective = 55;
        aero.helicopter.cyclicPitch = 25;
        aero.helicopter.tailPedal = 55;
      } else if (preset === 'climb') {
        aero.helicopter.collective = 75;
        aero.helicopter.cyclicPitch = 0;
        aero.helicopter.tailPedal = 68;
      } else if (preset === 'spinout') {
        aero.helicopter.collective = 80;
        aero.helicopter.cyclicPitch = 0;
        aero.helicopter.tailPedal = 10;
      }
      playSound('control');
      render();
    };
  });

  // Orbital Cannonball & Keplerian Controls
  const orbitV0 = root.querySelector('#param-orbit-v0');
  if (orbitV0) {
    orbitV0.oninput = (e) => {
      aero.orbit.horizontalVelocityKms = Number(e.target.value);
      render();
    };
  }

  const orbitAlt = root.querySelector('#param-orbit-alt');
  if (orbitAlt) {
    orbitAlt.oninput = (e) => {
      aero.orbit.launchAltitudeKm = Number(e.target.value);
      render();
    };
  }

  root.querySelectorAll('[data-orbitpreset]').forEach((btn) => {
    btn.onclick = () => {
      const preset = btn.dataset.orbitpreset;
      if (preset === 'suborbital') {
        aero.orbit.horizontalVelocityKms = 4.5;
        aero.orbit.launchAltitudeKm = 400;
      } else if (preset === 'leo') {
        aero.orbit.horizontalVelocityKms = 7.67;
        aero.orbit.launchAltitudeKm = 400;
      } else if (preset === 'gto') {
        aero.orbit.horizontalVelocityKms = 9.8;
        aero.orbit.launchAltitudeKm = 400;
      } else if (preset === 'escape') {
        aero.orbit.horizontalVelocityKms = 11.0;
        aero.orbit.launchAltitudeKm = 400;
      }
      playSound('control');
      render();
    };
  });

  // Atmospheric Glider & Thermal Soaring Controls
  const gliderSpeed = root.querySelector('#param-glider-speed');
  if (gliderSpeed) {
    gliderSpeed.oninput = (e) => {
      aero.glider.airSpeedKmh = Number(e.target.value);
      render();
    };
  }

  const gliderBank = root.querySelector('#param-glider-bank');
  if (gliderBank) {
    gliderBank.oninput = (e) => {
      aero.glider.bankAngleDeg = Number(e.target.value);
      render();
    };
  }

  const gliderThermal = root.querySelector('#param-glider-thermal');
  if (gliderThermal) {
    gliderThermal.oninput = (e) => {
      aero.glider.thermalStrength = Number(e.target.value);
      render();
    };
  }

  const gliderRadius = root.querySelector('#param-glider-radius');
  if (gliderRadius) {
    gliderRadius.oninput = (e) => {
      aero.glider.thermalRadius = Number(e.target.value);
      render();
    };
  }

  root.querySelectorAll('[data-gliderpreset]').forEach((btn) => {
    btn.onclick = () => {
      const preset = btn.dataset.gliderpreset;
      if (preset === 'optimal') {
        aero.glider.airSpeedKmh = 85;
        aero.glider.bankAngleDeg = 30;
        aero.glider.thermalStrength = 4.0;
        aero.glider.thermalRadius = 120;
      } else if (preset === 'level') {
        aero.glider.airSpeedKmh = 92;
        aero.glider.bankAngleDeg = 0;
        aero.glider.thermalStrength = 0;
      } else if (preset === 'steep') {
        aero.glider.airSpeedKmh = 95;
        aero.glider.bankAngleDeg = 55;
        aero.glider.thermalStrength = 4.0;
      } else if (preset === 'weak') {
        aero.glider.airSpeedKmh = 80;
        aero.glider.bankAngleDeg = 20;
        aero.glider.thermalStrength = 1.5;
        aero.glider.thermalRadius = 90;
      }
      playSound('control');
      render();
    };
  });

  // Ion Thruster & Spacecraft Electric Propulsion Controls
  const ionVoltage = root.querySelector('#param-ion-voltage');
  if (ionVoltage) {
    ionVoltage.oninput = (e) => {
      aero.ion.beamVoltageV = Number(e.target.value);
      render();
    };
  }

  const ionCurrent = root.querySelector('#param-ion-current');
  if (ionCurrent) {
    ionCurrent.oninput = (e) => {
      aero.ion.beamCurrentA = Number(e.target.value);
      render();
    };
  }

  const ionPropellant = root.querySelector('#param-ion-propellant');
  if (ionPropellant) {
    ionPropellant.onchange = (e) => {
      aero.ion.propellant = e.target.value;
      render();
    };
  }

  const ionMass = root.querySelector('#param-ion-mass');
  if (ionMass) {
    ionMass.oninput = (e) => {
      aero.ion.spacecraftMassKg = Number(e.target.value);
      render();
    };
  }

  root.querySelectorAll('[data-ionpreset]').forEach((btn) => {
    btn.onclick = () => {
      const preset = btn.dataset.ionpreset;
      if (preset === 'dawn') {
        aero.ion.beamVoltageV = 1500;
        aero.ion.beamCurrentA = 1.8;
        aero.ion.propellant = 'xenon';
        aero.ion.spacecraftMassKg = 650;
      } else if (preset === 'starlink') {
        aero.ion.beamVoltageV = 1200;
        aero.ion.beamCurrentA = 2.4;
        aero.ion.propellant = 'krypton';
        aero.ion.spacecraftMassKg = 300;
      } else if (preset === 'bepi') {
        aero.ion.beamVoltageV = 2200;
        aero.ion.beamCurrentA = 2.8;
        aero.ion.propellant = 'xenon';
        aero.ion.spacecraftMassKg = 1500;
      } else if (preset === 'deepspace') {
        aero.ion.beamVoltageV = 1100;
        aero.ion.beamCurrentA = 1.2;
        aero.ion.propellant = 'xenon';
        aero.ion.spacecraftMassKg = 490;
      }
      playSound('control');
      render();
    };
  });

  // DIY Project Picker
  root.querySelectorAll('[data-diyselect]').forEach((b) => {
    b.onclick = () => {
      aero.diySelected = b.dataset.diyselect;
      render();
    };
  });

  // AeroQuiz Bindings
  root.querySelectorAll('[data-aerochoice]').forEach((b) => {
    b.onclick = () => {
      if (aero.quiz.submitted) return;
      aero.quiz.selected = Number(b.dataset.aerochoice);
      render();
    };
  });

  const quizCheck = root.querySelector('#btn-aero-check');
  if (quizCheck) {
    quizCheck.onclick = () => {
      if (aero.quiz.selected === null) return;
      aero.quiz.submitted = true;
      const q = AERO_CHALLENGES[aero.quiz.index];
      if (aero.quiz.selected === q.correct) {
        aero.quiz.score++;
        playSound('complete');
      }
      render();
    };
  }

  const quizCont = root.querySelector('#btn-aero-continue');
  if (quizCont) {
    quizCont.onclick = () => {
      aero.quiz.index++;
      aero.quiz.selected = null;
      aero.quiz.submitted = false;
      render();
    };
  }

  const quizRestart = root.querySelector('#btn-restart-quiz');
  if (quizRestart) {
    quizRestart.onclick = () => {
      aero.quiz.index = 0;
      aero.quiz.score = 0;
      aero.quiz.selected = null;
      aero.quiz.submitted = false;
      render();
    };
  }

  return () => {
    disposed = true;
    aero.running = false;
    cancelAnimationFrame(raf);
  };
}
