// AeroLab - Dedicated Flying Objects & Rocketry Interactive Laboratory
import {
  initialRocketState,
  stepRocket,
  airfoilForces,
  dronePhysicsModel,
  supersonicMachModel,
  turbofanBraytonModel,
  DIY_PROJECTS,
  AERO_CHALLENGES,
  AERO_BADGES,
} from './aerolab-models.js';
import { rocketArt, airfoilTunnelArt, droneArt, supersonicMachArt, turbofanEngineArt } from './aerolab-art.js';
import { playSound } from '../audio.js';

const num = (n, dec = 1) => Number(n.toFixed(dec)).toLocaleString('hy-AM');

export function initialAeroLabState() {
  return {
    tab: 'rocket', // 'rocket' | 'drone' | 'tunnel' | 'supersonic' | 'jet' | 'diy' | 'badges' | 'quiz'
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
  if (aero.tab === 'tunnel') return renderWindTunnel(aero);
  if (aero.tab === 'supersonic') return renderSupersonicLab(aero);
  if (aero.tab === 'jet') return renderJetLab(aero);
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
