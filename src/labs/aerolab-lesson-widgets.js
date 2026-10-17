// AeroLab Interactive Lesson Simulation Widgets (Lessons 1.1 to 1.5)
// Physics engines with fixed timestep/rAF, Play/Pause/Reset, tactile scrub, and Eastern Armenian telemetry

import { playSound } from '../audio.js';

const num = (n, dec = 1) => Number(n.toFixed(dec)).toLocaleString('hy-AM');

/**
 * Universal widget controller wrapper
 */
export function mountLessonWidget(container, widgetType) {
  if (!container) return () => {};
  container.innerHTML = '';

  if (widgetType === 'relative-motion') {
    return mountRelativeMotionWidget(container);
  } else if (widgetType === 'speed-track') {
    return mountSpeedTrackWidget(container);
  } else if (widgetType === 'acceleration-ramp') {
    return mountAccelerationRampWidget(container);
  } else if (widgetType === 'mass-inertia') {
    return mountMassInertiaWidget(container);
  } else if (widgetType === 'galileo-drop') {
    return mountGalileoDropWidget(container);
  }

  container.innerHTML = `<p class="muted">Սիմուլյատորը հասանելի չէ։</p>`;
  return () => {};
}

// =========================================================================
// WIDGET 1.1: Relative Motion & Reference Frame / Distance vs Displacement
// =========================================================================
export function mountRelativeMotionWidget(container) {
  let mode = 'frame'; // 'frame' | 'lap'
  let observer = 'platform'; // 'platform' | 'train'
  let running = false;
  let trainX = 100;
  let lapAngle = 0;
  let distanceRan = 0;
  let rafId = null;
  let lastTime = performance.now();

  const wrap = document.createElement('div');
  wrap.className = 'aero-widget-box';
  wrap.innerHTML = `
    <div class="aero-widget-header">
      <div class="aero-mode-pills" role="tablist">
        <button class="aero-pill-btn active" data-submode="frame">🚂 Հաշվարկման համակարգ (Գնացք)</button>
        <button class="aero-pill-btn" data-submode="lap">🏃 Շրջանաձև վազքուղի (s vs Δr)</button>
      </div>
      <div class="aero-widget-actions">
        <button class="aero-icon-btn" id="btn-play-pause" title="Միացնել/Դադարեցնել">▶️ Սկսել</button>
        <button class="aero-icon-btn" id="btn-reset" title="Վերականգնել">🔄 Վերականգնել</button>
      </div>
    </div>

    <div class="aero-widget-viewport">
      <canvas id="cv-relative" width="700" height="320" style="width:100%; height:auto; display:block; background:#0b1329; border-radius:12px;"></canvas>
    </div>

    <div class="aero-widget-controls" id="controls-frame">
      <div class="aero-control-row">
        <label>Դիտորդի տեսանկյուն (Հաշվարկման մարմին)՝</label>
        <div class="btn-group">
          <button class="aero-toggle-btn active" id="btn-obs-plat">🏢 Կառամատույցի դիտորդ (Անշարժ կայարան)</button>
          <button class="aero-toggle-btn" id="btn-obs-train">💺 Վագոնի ուղևոր (Նստած գնացքում)</button>
        </div>
      </div>
      <div class="aero-telemetry-badge" id="telemetry-frame">
        <span>Գնացքի արագություն՝ <strong>72 կմ/ժ (20 մ/վ)</strong></span>
        <span>Ուղևորի արագություն դիտորդի նկատմամբ՝ <strong id="val-passenger-v">20 մ/վ</strong></span>
      </div>
    </div>

    <div class="aero-widget-controls" id="controls-lap" style="display:none;">
      <div class="aero-telemetry-grid">
        <div class="aero-stat-card">
          <span class="aero-stat-label">Անցած ճանապարհ (s)</span>
          <span class="aero-stat-value" id="val-lap-s" style="color:#58cc02;">0 մ</span>
          <span class="aero-stat-hint">Հետագծի լրիվ երկարությունը</span>
        </div>
        <div class="aero-stat-card">
          <span class="aero-stat-label">Տեղափոխության մոդուլ (|Δr|)</span>
          <span class="aero-stat-value" id="val-lap-dr" style="color:#1cb0f6;">0 մ</span>
          <span class="aero-stat-hint">Ուղիղ վեկտորը սկզբից դեպի վերջ</span>
        </div>
        <div class="aero-stat-card">
          <span class="aero-stat-label">Լրիվ պտույտներ</span>
          <span class="aero-stat-value" id="val-lap-count" style="color:#ffc800;">0</span>
          <span class="aero-stat-hint">400 մ շրջագիծ</span>
        </div>
      </div>
    </div>
  `;
  container.appendChild(wrap);

  const canvas = wrap.querySelector('#cv-relative');
  const ctx = canvas.getContext('2d');
  const playBtn = wrap.querySelector('#btn-play-pause');
  const resetBtn = wrap.querySelector('#btn-reset');
  const btnObsPlat = wrap.querySelector('#btn-obs-plat');
  const btnObsTrain = wrap.querySelector('#btn-obs-train');
  const passVText = wrap.querySelector('#val-passenger-v');
  const controlsFrame = wrap.querySelector('#controls-frame');
  const controlsLap = wrap.querySelector('#controls-lap');
  const valLapS = wrap.querySelector('#val-lap-s');
  const valLapDr = wrap.querySelector('#val-lap-dr');
  const valLapCount = wrap.querySelector('#val-lap-count');

  function renderScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (mode === 'frame') {
      // Sky & Horizon
      const skyGrad = ctx.createLinearGradient(0, 0, 0, 220);
      skyGrad.addColorStop(0, '#0d1b38');
      skyGrad.addColorStop(1, '#1b3260');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, canvas.width, 220);

      // Station ground & rails
      ctx.fillStyle = '#222938';
      ctx.fillRect(0, 220, canvas.width, 100);

      // Rails
      ctx.strokeStyle = '#4a5568';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(0, 260);
      ctx.lineTo(canvas.width, 260);
      ctx.stroke();

      // Scenery (trees / station sign)
      // When train is observer, scenery moves left!
      const sceneryOffset = observer === 'platform' ? 0 : -trainX % 700;
      ctx.save();
      ctx.translate(sceneryOffset, 0);

      // Station sign
      ctx.fillStyle = '#2b6cb0';
      ctx.fillRect(80, 160, 110, 32);
      ctx.strokeStyle = '#63b3ed';
      ctx.strokeRect(80, 160, 110, 32);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText('🏢 ԵՐԵՎԱՆ', 95, 182);
      ctx.fillStyle = '#718096';
      ctx.fillRect(130, 192, 10, 30);

      // Distant Trees
      for (let i = 0; i < 6; i++) {
        const tx = 250 + i * 160;
        ctx.fillStyle = '#2d3748';
        ctx.fillRect(tx + 12, 175, 8, 45);
        ctx.fillStyle = '#22543d';
        ctx.beginPath();
        ctx.arc(tx + 16, 165, 24, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Train Carriage
      const trainDrawX = observer === 'platform' ? trainX % (canvas.width + 300) - 200 : 220;

      // Carriage Body
      ctx.save();
      ctx.fillStyle = '#3182ce';
      ctx.strokeStyle = '#63b3ed';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(trainDrawX, 160, 260, 95, 10);
      ctx.fill();
      ctx.stroke();

      // Windows
      ctx.fillStyle = '#e2e8f0';
      for (let w = 0; w < 3; w++) {
        ctx.fillRect(trainDrawX + 25 + w * 75, 175, 55, 38);
        ctx.strokeStyle = '#2b6cb0';
        ctx.strokeRect(trainDrawX + 25 + w * 75, 175, 55, 38);
      }

      // Wheels
      ctx.fillStyle = '#1a202c';
      for (let wh = 0; wh < 4; wh++) {
        ctx.beginPath();
        ctx.arc(trainDrawX + 35 + wh * 60, 260, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#a0aec0';
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      // Passenger inside middle window
      const passX = trainDrawX + 127;
      const passY = 195;
      // Head
      ctx.fillStyle = '#f6ad55';
      ctx.beginPath();
      ctx.arc(passX, passY, 8, 0, Math.PI * 2);
      ctx.fill();
      // Body
      ctx.fillStyle = '#e53e3e';
      ctx.fillRect(passX - 7, passY + 8, 14, 12);
      // Book
      ctx.fillStyle = '#fefcbf';
      ctx.fillRect(passX - 4, passY + 12, 10, 6);

      // Observer Indicator
      ctx.font = '12px sans-serif';
      if (observer === 'platform') {
        // Platform Observer on ground
        ctx.fillStyle = '#48bb78';
        ctx.beginPath();
        ctx.arc(60, 225, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.fillText('👀 Դու (Կառամատույց)', 20, 255);
        passVText.textContent = '20 մ/վ (սլանում է)';
        passVText.style.color = '#e53e3e';
      } else {
        // Inside train
        ctx.fillStyle = '#fff';
        ctx.fillText('👀 Դու (Վագոնում նստած ես)', passX - 60, 150);
        passVText.textContent = '0 մ/վ (լրիվ անշարժ)';
        passVText.style.color = '#48bb78';
      }

      ctx.restore();
    } else {
      // LAP MODE: Oval runner track
      ctx.fillStyle = '#0a1020';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = 350;
      const centerY = 160;
      const rx = 230;
      const ry = 95;

      // Track outline
      ctx.strokeStyle = '#2d3748';
      ctx.lineWidth = 36;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, rx, ry, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Track surface
      ctx.strokeStyle = '#c53030';
      ctx.lineWidth = 26;
      ctx.stroke();

      // Lane line
      ctx.strokeStyle = '#fed7d7';
      ctx.setLineDash([8, 8]);
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.setLineDash([]);

      // Start line
      const startX = centerX + rx;
      const startY = centerY;
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(startX - 14, startY);
      ctx.lineTo(startX + 14, startY);
      ctx.stroke();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('ՍԿԻԶԲ / START', startX - 45, startY + 28);

      // Current Runner position
      const currX = centerX + rx * Math.cos(lapAngle);
      const currY = centerY + ry * Math.sin(lapAngle);

      // Displacement Vector Arrow (from start to current)
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(currX, currY);
      ctx.stroke();

      // Arrowhead
      const angle = Math.atan2(currY - startY, currX - startX);
      ctx.fillStyle = '#00f2fe';
      ctx.beginPath();
      ctx.moveTo(currX, currY);
      ctx.lineTo(currX - 10 * Math.cos(angle - Math.PI / 6), currY - 10 * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(currX - 10 * Math.cos(angle + Math.PI / 6), currY - 10 * Math.sin(angle + Math.PI / 6));
      ctx.fill();

      // Runner circle
      ctx.fillStyle = '#ffc800';
      ctx.beginPath();
      ctx.arc(currX, currY, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Vector label
      const dx = currX - startX;
      const dy = currY - startY;
      const dispPixels = Math.hypot(dx, dy);
      const dispMeters = (dispPixels / (rx * 2)) * 127.3; // scaled metric

      // Update HUD
      valLapS.textContent = `${num(distanceRan, 1)} մ`;
      valLapDr.textContent = `${num(dispMeters, 1)} մ`;
      valLapCount.textContent = `${Math.floor(distanceRan / 400)}`;
    }
  }

  function loop(now) {
    const dt = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;

    if (running) {
      if (mode === 'frame') {
        trainX += 160 * dt;
      } else {
        const speed = 0.85; // rad/s (~400m / 7.4s)
        lapAngle += speed * dt;
        distanceRan += (400 / (2 * Math.PI)) * speed * dt;
      }
      renderScene();
    }

    rafId = requestAnimationFrame(loop);
  }

  // Event handlers
  playBtn.onclick = () => {
    running = !running;
    playBtn.textContent = running ? '⏸️ Դադար' : '▶️ Սկսել';
    playSound('tap');
  };

  resetBtn.onclick = () => {
    running = false;
    playBtn.textContent = '▶️ Սկսել';
    trainX = 100;
    lapAngle = 0;
    distanceRan = 0;
    playSound('control');
    renderScene();
  };

  wrap.querySelectorAll('[data-submode]').forEach((btn) => {
    btn.onclick = () => {
      wrap.querySelectorAll('[data-submode]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      mode = btn.dataset.submode;
      if (mode === 'frame') {
        controlsFrame.style.display = 'block';
        controlsLap.style.display = 'none';
      } else {
        controlsFrame.style.display = 'none';
        controlsLap.style.display = 'block';
      }
      playSound('control');
      renderScene();
    };
  });

  btnObsPlat.onclick = () => {
    observer = 'platform';
    btnObsPlat.classList.add('active');
    btnObsTrain.classList.remove('active');
    playSound('control');
    renderScene();
  };

  btnObsTrain.onclick = () => {
    observer = 'train';
    btnObsTrain.classList.add('active');
    btnObsPlat.classList.remove('active');
    playSound('control');
    renderScene();
  };

  renderScene();
  rafId = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(rafId);
  };
}

// =========================================================================
// WIDGET 1.2: Speed Track (Runner vs Car with Red Light)
// =========================================================================
export function mountSpeedTrackWidget(container) {
  let running = false;
  let time = 0;
  let rafId = null;
  let lastTime = performance.now();

  // Positions
  let runnerX = 0; // v = 5 m/s constant
  let carX = 0;
  let carV = 0;

  const wrap = document.createElement('div');
  wrap.className = 'aero-widget-box';
  wrap.innerHTML = `
    <div class="aero-widget-header">
      <div class="aero-badge-pill">⏱️ ՃԱՆԱՊԱՐՀ ԵՎ ԱՐԱԳՈՒԹՅՈՒՆ (s-t & v-t)</div>
      <div class="aero-widget-actions">
        <button class="aero-icon-btn" id="btn-speed-play">▶️ Գործարկել</button>
        <button class="aero-icon-btn" id="btn-speed-reset">🔄 Սկզբնակետ</button>
      </div>
    </div>

    <div class="aero-widget-viewport">
      <canvas id="cv-speed" width="700" height="320" style="width:100%; height:auto; display:block; background:#0f172a; border-radius:12px;"></canvas>
    </div>

    <div class="aero-widget-controls">
      <div class="aero-telemetry-grid">
        <div class="aero-stat-card">
          <span class="aero-stat-label">Ժամանակ (t)</span>
          <span class="aero-stat-value" id="val-time" style="color:#ffc800;">0.0 վ</span>
          <span class="aero-stat-hint">Փորձի տևողությունը</span>
        </div>
        <div class="aero-stat-card">
          <span class="aero-stat-label">Վազորդ (Հավասարաչափ)</span>
          <span class="aero-stat-value" id="val-runner-stat" style="color:#58cc02;">v = 5.0 մ/վ</span>
          <span class="aero-stat-hint" id="val-runner-s">s = 0.0 մ</span>
        </div>
        <div class="aero-stat-card">
          <span class="aero-stat-label">Մեքենա (Անհավասարաչափ)</span>
          <span class="aero-stat-value" id="val-car-stat" style="color:#1cb0f6;">v = 0.0 մ/վ</span>
          <span class="aero-stat-hint" id="val-car-avg">v_միջ = 0.0 մ/վ</span>
        </div>
      </div>
      <div class="aero-graph-legend">
        <span><strong style="color:#58cc02;">— Վազորդ՝</strong> հաստատուն 5 մ/վ (ուղիղ թեք գիծ s-t գրաֆիկում)</span>
        <span><strong style="color:#1cb0f6;">— Մեքենա՝</strong> արագացում, կանգառ լուսացույցի տակ (հորիզոնական հարթ հատված), ապա սլացք</span>
      </div>
    </div>
  `;
  container.appendChild(wrap);

  const canvas = wrap.querySelector('#cv-speed');
  const ctx = canvas.getContext('2d');
  const playBtn = wrap.querySelector('#btn-speed-play');
  const resetBtn = wrap.querySelector('#btn-speed-reset');
  const valTime = wrap.querySelector('#val-time');
  const valRunnerStat = wrap.querySelector('#val-runner-stat');
  const valRunnerS = wrap.querySelector('#val-runner-s');
  const valCarStat = wrap.querySelector('#val-car-stat');
  const valCarAvg = wrap.querySelector('#val-car-avg');

  const history = []; // { t, sRunner, sCar, vRunner, vCar }

  function getCarState(t) {
    // 0 to 4s: accelerate to 15 m/s (a = 3.75)
    // 4 to 8s: cruise at 15 m/s
    // 8 to 11s: brake to stop at light (x ≈ 90m)
    // 11 to 16s: stopped at RED light (v = 0)
    // 16 to 20s: green light, accelerate to 25 m/s
    if (t < 4) {
      const a = 3.75;
      return { v: a * t, s: 0.5 * a * t * t };
    } else if (t < 8) {
      const s4 = 0.5 * 3.75 * 16;
      return { v: 15, s: s4 + 15 * (t - 4) };
    } else if (t < 11) {
      const s8 = 30 + 60; // 90m
      const dt = t - 8;
      const v = Math.max(0, 15 - 5 * dt);
      return { v, s: s8 + 15 * dt - 0.5 * 5 * dt * dt };
    } else if (t < 16) {
      const s11 = 90 + 22.5; // 112.5m
      return { v: 0, s: s11 };
    } else {
      const s16 = 112.5;
      const dt = t - 16;
      const a = 4.5;
      const v = Math.min(25, a * dt);
      return { v, s: s16 + 0.5 * a * Math.min(dt, 25 / a) ** 2 + (dt > 25 / a ? 25 * (dt - 25 / a) : 0) };
    }
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Split viewport: Top is physical road (0-150px), Bottom is s-t graph (155-320px)
    // Road background
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, canvas.width, 150);

    // Track 1: Runner lane
    ctx.fillStyle = '#27272a';
    ctx.fillRect(0, 15, canvas.width, 50);
    ctx.fillStyle = '#fff';
    ctx.font = '10px sans-serif';
    ctx.fillText('🏃 ՎԱԶՈՒՂԻ (v = 5 մ/վ const)', 10, 28);

    // Track 2: Highway lane
    ctx.fillStyle = '#18181b';
    ctx.fillRect(0, 75, canvas.width, 65);
    ctx.fillStyle = '#fff';
    ctx.fillText('🚗 ԱՎՏՈՄԱՅՐՈՒՂԻ (Լուսացույցով)', 10, 88);

    // Lane dashes
    ctx.strokeStyle = '#e4e4e7';
    ctx.lineWidth = 2;
    ctx.setLineDash([12, 12]);
    ctx.beginPath();
    ctx.moveTo(0, 110);
    ctx.lineTo(canvas.width, 110);
    ctx.stroke();
    ctx.setLineDash([]);

    // Traffic light at road position x = 420px (corresponds to s ≈ 112.5m)
    const tlX = 380;
    ctx.fillStyle = '#09090b';
    ctx.fillRect(tlX - 10, 50, 20, 40);
    // Red or Green
    const isRed = time >= 8 && time < 16;
    ctx.fillStyle = isRed ? '#ef4444' : '#27272a';
    ctx.beginPath();
    ctx.arc(tlX, 60, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = !isRed ? '#22c55e' : '#27272a';
    ctx.beginPath();
    ctx.arc(tlX, 78, 6, 0, Math.PI * 2);
    ctx.fill();

    // Scale road coordinates (max distance 300m -> 650px)
    const scale = (canvas.width - 80) / 300;
    const pxRunner = Math.min(canvas.width - 30, 40 + runnerX * scale);
    const pxCar = Math.min(canvas.width - 30, 40 + carX * scale);

    // Draw Runner
    ctx.fillStyle = '#58cc02';
    ctx.beginPath();
    ctx.arc(pxRunner, 45, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('🏃', pxRunner - 8, 49);

    // Draw Car
    ctx.fillStyle = '#1cb0f6';
    ctx.beginPath();
    ctx.roundRect(pxCar - 18, 100, 36, 18, 4);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.fillText('🚗', pxCar - 8, 114);

    // Bottom Graph: s-t curve
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 155, canvas.width, 165);

    // Axes
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(50, 165);
    ctx.lineTo(50, 305);
    ctx.lineTo(canvas.width - 20, 305);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px sans-serif';
    ctx.fillText('s (մ)', 15, 175);
    ctx.fillText('t (վ)', canvas.width - 35, 318);

    // Plot histories
    if (history.length > 1) {
      const maxT = 25;
      const maxS = 250;
      const graphW = canvas.width - 80;
      const graphH = 125;

      // Runner line
      ctx.strokeStyle = '#58cc02';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      history.forEach((pt, i) => {
        const gx = 50 + (pt.t / maxT) * graphW;
        const gy = 305 - (pt.sRunner / maxS) * graphH;
        if (i === 0) ctx.moveTo(gx, gy);
        else ctx.lineTo(gx, gy);
      });
      ctx.stroke();

      // Car line
      ctx.strokeStyle = '#1cb0f6';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      history.forEach((pt, i) => {
        const gx = 50 + (pt.t / maxT) * graphW;
        const gy = 305 - (pt.sCar / maxS) * graphH;
        if (i === 0) ctx.moveTo(gx, gy);
        else ctx.lineTo(gx, gy);
      });
      ctx.stroke();
    }
  }

  function loop(now) {
    const dt = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;

    if (running && time < 25) {
      time += dt;
      runnerX = 5.0 * time;
      const c = getCarState(time);
      carX = c.s;
      carV = c.v;

      history.push({
        t: time,
        sRunner: runnerX,
        sCar: carX,
        vRunner: 5.0,
        vCar: carV,
      });

      // Update telemetry
      valTime.textContent = `${num(time, 1)} վ`;
      valRunnerStat.textContent = `v = 5.0 մ/վ (${num(5.0 * 3.6, 0)} կմ/ժ)`;
      valRunnerS.textContent = `s = ${num(runnerX, 1)} մ`;
      valCarStat.textContent = `v = ${num(carV, 1)} մ/վ (${num(carV * 3.6, 0)} կմ/ժ)`;
      const avgV = time > 0 ? carX / time : 0;
      valCarAvg.textContent = `v_միջ = ${num(avgV, 1)} մ/վ (${num(avgV * 3.6, 0)} կմ/ժ)`;

      render();
    }

    rafId = requestAnimationFrame(loop);
  }

  playBtn.onclick = () => {
    running = !running;
    playBtn.textContent = running ? '⏸️ Դադար' : '▶️ Գործարկել';
    playSound('tap');
  };

  resetBtn.onclick = () => {
    running = false;
    time = 0;
    runnerX = 0;
    carX = 0;
    carV = 0;
    history.length = 0;
    playBtn.textContent = '▶️ Գործարկել';
    valTime.textContent = '0.0 վ';
    valRunnerStat.textContent = 'v = 5.0 մ/վ';
    valRunnerS.textContent = 's = 0.0 մ';
    valCarStat.textContent = 'v = 0.0 մ/վ';
    valCarAvg.textContent = 'v_միջ = 0.0 մ/վ';
    playSound('control');
    render();
  };

  render();
  rafId = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(rafId);
  };
}

// =========================================================================
// WIDGET 1.3: Acceleration Ramp (Galileo Incline & Strobe 1d, 3d, 5d)
// =========================================================================
export function mountAccelerationRampWidget(container) {
  let angleDeg = 20;
  let running = false;
  let time = 0;
  let rafId = null;
  let lastTime = performance.now();
  const strobeDots = []; // { x, y, t, dLabel }

  const wrap = document.createElement('div');
  wrap.className = 'aero-widget-box';
  wrap.innerHTML = `
    <div class="aero-widget-header">
      <div class="aero-badge-pill">🎢 ԳԱԼԻԼԵՅԻ ԹԵՔ ՀԱՐԹՈՒԹՅՈՒՆ ԵՎ ԱՐԱԳԱՑՈՒՄ</div>
      <div class="aero-widget-actions">
        <button class="aero-icon-btn" id="btn-ramp-play">▶️ Բաց թողնել գունդը</button>
        <button class="aero-icon-btn" id="btn-ramp-reset">🔄 Սկզբնակետ</button>
      </div>
    </div>

    <div class="aero-widget-viewport">
      <canvas id="cv-ramp" width="700" height="320" style="width:100%; height:auto; display:block; background:#0b1329; border-radius:12px;"></canvas>
    </div>

    <div class="aero-widget-controls">
      <div class="aero-control-row">
        <label>Հարթության թեքության անկյունը (θ)՝ <strong id="lbl-angle">20°</strong></label>
        <input type="range" id="rng-angle" min="10" max="40" step="5" value="20" style="flex:1; max-width:240px;" />
      </div>
      <div class="aero-telemetry-grid">
        <div class="aero-stat-card">
          <span class="aero-stat-label">Արագացում (a = g·sin θ)</span>
          <span class="aero-stat-value" id="val-ramp-a" style="color:#ffc800;">3.35 մ/վ²</span>
          <span class="aero-stat-hint">Հաստատուն թափ հարթությամբ</span>
        </div>
        <div class="aero-stat-card">
          <span class="aero-stat-label">Ակնթարթային արագություն (v)</span>
          <span class="aero-stat-value" id="val-ramp-v" style="color:#1cb0f6;">0.0 մ/վ</span>
          <span class="aero-stat-hint" id="val-ramp-kmh">0.0 կմ/ժ</span>
        </div>
        <div class="aero-stat-card">
          <span class="aero-stat-label">Անցած ճանապարհ (s)</span>
          <span class="aero-stat-value" id="val-ramp-s" style="color:#58cc02;">0.0 մ</span>
          <span class="aero-stat-hint">s = a·t² / 2</span>
        </div>
      </div>
      <div class="aero-strobe-legend">
        💡 <strong>Գալիլեյի կենտ թվերի օրենքը.</strong> Յուրաքանչյուր 1 վայրկյանում անցած ճանապարհների հարաբերությունն է <strong>1d : 3d : 5d : 7d...</strong>
      </div>
    </div>
  `;
  container.appendChild(wrap);

  const canvas = wrap.querySelector('#cv-ramp');
  const ctx = canvas.getContext('2d');
  const playBtn = wrap.querySelector('#btn-ramp-play');
  const resetBtn = wrap.querySelector('#btn-ramp-reset');
  const rngAngle = wrap.querySelector('#rng-angle');
  const lblAngle = wrap.querySelector('#lbl-angle');
  const valA = wrap.querySelector('#val-ramp-a');
  const valV = wrap.querySelector('#val-ramp-v');
  const valKmh = wrap.querySelector('#val-ramp-kmh');
  const valS = wrap.querySelector('#val-ramp-s');

  function getA() {
    return 9.81 * Math.sin((angleDeg * Math.PI) / 180);
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ramp geometry
    const startX = 60;
    const startY = 70;
    const rampLength = 580;
    const rad = (angleDeg * Math.PI) / 180;
    const endX = startX + rampLength * Math.cos(rad);
    const endY = startY + rampLength * Math.sin(rad);

    // Draw Triangular wedge
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.lineTo(startX, endY);
    ctx.closePath();
    ctx.fill();

    // Ramp surface board
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(startX - 10, startY - 2);
    ctx.lineTo(endX + 10, endY + 2);
    ctx.stroke();

    // Angle Arc
    ctx.strokeStyle = '#ffc800';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(startX, endY, 60, -rad, 0);
    ctx.stroke();
    ctx.fillStyle = '#ffc800';
    ctx.font = '12px sans-serif';
    ctx.fillText(`θ = ${angleDeg}°`, startX + 70, endY - 10);

    // Strobe dots (at t = 1s, 2s, 3s...)
    strobeDots.forEach((pt) => {
      ctx.fillStyle = '#00f2fe';
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText(pt.label, pt.x - 10, pt.y - 12);
    });

    // Current ball position
    const a = getA();
    const s = 0.5 * a * time * time;
    const visualS = Math.min(rampLength, s * 22); // visual scaling
    const ballX = startX + visualS * Math.cos(rad) - 14 * Math.sin(rad);
    const ballY = startY + visualS * Math.sin(rad) - 14 * Math.cos(rad);

    // Ball
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(ballX, ballY, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Velocity vector arrow from ball
    const v = a * time;
    if (v > 0.1) {
      const vLen = Math.min(60, v * 3.5);
      const vEndX = ballX + vLen * Math.cos(rad);
      const vEndY = ballY + vLen * Math.sin(rad);

      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(ballX, ballY);
      ctx.lineTo(vEndX, vEndY);
      ctx.stroke();
    }
  }

  let nextStrobeT = 1.0;
  let lastDotS = 0;

  function loop(now) {
    const dt = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;

    if (running) {
      time += dt;
      const a = getA();
      const s = 0.5 * a * time * time;
      const v = a * time;

      // Strobe check
      if (time >= nextStrobeT && s * 22 < 550) {
        const rad = (angleDeg * Math.PI) / 180;
        const visualS = s * 22;
        const px = 60 + visualS * Math.cos(rad);
        const py = 70 + visualS * Math.sin(rad);
        const intervalNum = Math.floor(nextStrobeT);
        const oddMultiplier = 2 * intervalNum - 1;
        strobeDots.push({
          x: px,
          y: py,
          t: nextStrobeT,
          label: `${intervalNum}վ (${oddMultiplier}d)`,
        });
        nextStrobeT += 1.0;
        playSound('tap');
      }

      valV.textContent = `${num(v, 1)} մ/վ`;
      valKmh.textContent = `${num(v * 3.6, 1)} կմ/ժ`;
      valS.textContent = `${num(s, 1)} մ`;

      if (s * 22 >= 580) {
        running = false;
        playBtn.textContent = '▶️ Բաց թողնել գունդը';
      }

      render();
    }

    rafId = requestAnimationFrame(loop);
  }

  rngAngle.oninput = () => {
    angleDeg = Number(rngAngle.value);
    lblAngle.textContent = `${angleDeg}°`;
    valA.textContent = `${num(getA(), 2)} մ/վ²`;
    render();
  };

  playBtn.onclick = () => {
    running = !running;
    playBtn.textContent = running ? '⏸️ Դադար' : '▶️ Բաց թողնել գունդը';
    playSound('tap');
  };

  resetBtn.onclick = () => {
    running = false;
    time = 0;
    nextStrobeT = 1.0;
    lastDotS = 0;
    strobeDots.length = 0;
    playBtn.textContent = '▶️ Բաց թողնել գունդը';
    valV.textContent = '0.0 մ/վ';
    valKmh.textContent = '0.0 կմ/ժ';
    valS.textContent = '0.0 մ';
    playSound('control');
    render();
  };

  valA.textContent = `${num(getA(), 2)} մ/վ²`;
  render();
  rafId = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(rafId);
  };
}

// =========================================================================
// WIDGET 1.4: Mass & Inertia Air Track (Frictionless F = m·a)
// =========================================================================
export function mountMassInertiaWidget(container) {
  let mass1 = 1; // 1 kg
  let mass2 = 5; // 5 kg
  let force = 10; // 10 N
  let running = false;
  let time = 0;
  let rafId = null;
  let lastTime = performance.now();

  const wrap = document.createElement('div');
  wrap.className = 'aero-widget-box';
  wrap.innerHTML = `
    <div class="aero-widget-header">
      <div class="aero-badge-pill">🏋️ ՕԴԱՅԻՆ ՌԵԼՍ ԵՎ ԻՆԵՐՑԻԱ (F = m·a)</div>
      <div class="aero-widget-actions">
        <button class="aero-icon-btn" id="btn-inertia-play">▶️ Կիրառել ուժը</button>
        <button class="aero-icon-btn" id="btn-inertia-reset">🔄 Սկզբնակետ</button>
      </div>
    </div>

    <div class="aero-widget-viewport">
      <canvas id="cv-inertia" width="700" height="320" style="width:100%; height:auto; display:block; background:#0b1329; border-radius:12px;"></canvas>
    </div>

    <div class="aero-widget-controls">
      <div class="aero-control-row">
        <label>Կիրառվող քարշող ուժը (F)՝ <strong id="lbl-force">10 Ն</strong></label>
        <input type="range" id="rng-force" min="5" max="25" step="5" value="10" style="flex:1; max-width:200px;" />
        <label style="margin-left:16px;">Ծանր սայլակի զանգվածը (m₂)՝</label>
        <select id="sel-mass2" class="aero-select" style="padding:4px 8px; border-radius:6px; background:#1e293b; color:#fff; border:1px solid #475569;">
          <option value="2">2 կգ</option>
          <option value="5" selected>5 կգ (5x ավելի ծանր)</option>
          <option value="10">10 կգ (10x ավելի ծանր)</option>
        </select>
      </div>
      <div class="aero-telemetry-grid">
        <div class="aero-stat-card">
          <span class="aero-stat-label">Սայլակ A (m₁ = 1 կգ)</span>
          <span class="aero-stat-value" id="val-a1" style="color:#58cc02;">a₁ = 10.0 մ/վ²</span>
          <span class="aero-stat-hint" id="val-v1">v₁ = 0.0 մ/վ</span>
        </div>
        <div class="aero-stat-card">
          <span class="aero-stat-label">Սայլակ B (m₂ = 5 կգ)</span>
          <span class="aero-stat-value" id="val-a2" style="color:#1cb0f6;">a₂ = 2.0 մ/վ²</span>
          <span class="aero-stat-hint" id="val-v2">v₂ = 0.0 մ/վ</span>
        </div>
        <div class="aero-stat-card">
          <span class="aero-stat-label">Արագացումների հարաբերություն</span>
          <span class="aero-stat-value" id="val-ratio" style="color:#ffc800;">a₁ / a₂ = 5.0</span>
          <span class="aero-stat-hint">Հավասար է m₂ / m₁ հարաբերությանը</span>
        </div>
      </div>
    </div>
  `;
  container.appendChild(wrap);

  const canvas = wrap.querySelector('#cv-inertia');
  const ctx = canvas.getContext('2d');
  const playBtn = wrap.querySelector('#btn-inertia-play');
  const resetBtn = wrap.querySelector('#btn-inertia-reset');
  const rngForce = wrap.querySelector('#rng-force');
  const lblForce = wrap.querySelector('#lbl-force');
  const selMass2 = wrap.querySelector('#sel-mass2');
  const valA1 = wrap.querySelector('#val-a1');
  const valV1 = wrap.querySelector('#val-v1');
  const valA2 = wrap.querySelector('#val-a2');
  const valV2 = wrap.querySelector('#val-v2');
  const valRatio = wrap.querySelector('#val-ratio');

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const a1 = force / mass1;
    const a2 = force / mass2;
    const s1 = 0.5 * a1 * time * time;
    const s2 = 0.5 * a2 * time * time;

    // Track 1 (Light Cart)
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(40, 50, 620, 60);
    // Air track holes
    ctx.fillStyle = '#64748b';
    for (let h = 0; h < 20; h++) {
      ctx.beginPath();
      ctx.arc(60 + h * 30, 80, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Track 2 (Heavy Cart)
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(40, 180, 620, 60);
    for (let h = 0; h < 20; h++) {
      ctx.beginPath();
      ctx.arc(60 + h * 30, 210, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Finish lines at x = 600px
    ctx.strokeStyle = '#e2e8f0';
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(600, 40);
    ctx.lineTo(600, 250);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px sans-serif';
    ctx.fillText('🏁 ԵԶՐԱԳԻԾ', 580, 32);

    // Cart 1 position
    const px1 = Math.min(560, 50 + s1 * 35);
    ctx.fillStyle = '#58cc02';
    ctx.beginPath();
    ctx.roundRect(px1, 60, 48, 36, 6);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('1 կգ', px1 + 10, 82);

    // Force vector arrow on Cart 1
    ctx.strokeStyle = '#ffc800';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(px1 + 48, 78);
    ctx.lineTo(px1 + 48 + force * 2.2, 78);
    ctx.stroke();
    ctx.fillStyle = '#ffc800';
    ctx.fillText(`F = ${force} Ն`, px1 + 52 + force * 2.2, 82);

    // Cart 2 position
    const px2 = Math.min(540, 50 + s2 * 35);
    ctx.fillStyle = '#1cb0f6';
    ctx.beginPath();
    ctx.roundRect(px2, 190, 72, 38, 6);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.fillText(`${mass2} կգ`, px2 + 20, 213);

    // Force vector arrow on Cart 2
    ctx.strokeStyle = '#ffc800';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(px2 + 72, 209);
    ctx.lineTo(px2 + 72 + force * 2.2, 209);
    ctx.stroke();
    ctx.fillStyle = '#ffc800';
    ctx.fillText(`F = ${force} Ն`, px2 + 76 + force * 2.2, 213);
  }

  function loop(now) {
    const dt = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;

    if (running) {
      time += dt;
      const a1 = force / mass1;
      const a2 = force / mass2;
      const v1 = a1 * time;
      const v2 = a2 * time;

      valV1.textContent = `v₁ = ${num(v1, 1)} մ/վ`;
      valV2.textContent = `v₂ = ${num(v2, 1)} մ/վ`;

      const s1 = 0.5 * a1 * time * time;
      if (s1 * 35 >= 520) {
        running = false;
        playBtn.textContent = '▶️ Կիրառել ուժը';
      }

      render();
    }

    rafId = requestAnimationFrame(loop);
  }

  function updateParams() {
    valA1.textContent = `a₁ = ${num(force / mass1, 1)} մ/վ²`;
    valA2.textContent = `a₂ = ${num(force / mass2, 1)} մ/վ²`;
    valRatio.textContent = `a₁ / a₂ = ${num(mass2 / mass1, 1)}`;
    lblForce.textContent = `${force} Ն`;
    render();
  }

  rngForce.oninput = () => {
    force = Number(rngForce.value);
    updateParams();
  };

  selMass2.onchange = () => {
    mass2 = Number(selMass2.value);
    updateParams();
  };

  playBtn.onclick = () => {
    running = !running;
    playBtn.textContent = running ? '⏸️ Դադար' : '▶️ Կիրառել ուժը';
    playSound('tap');
  };

  resetBtn.onclick = () => {
    running = false;
    time = 0;
    playBtn.textContent = '▶️ Կիրառել ուժը';
    valV1.textContent = 'v₁ = 0.0 մ/վ';
    valV2.textContent = 'v₂ = 0.0 մ/վ';
    playSound('control');
    render();
  };

  updateParams();
  rafId = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(rafId);
  };
}

// =========================================================================
// WIDGET 1.5: Galileo Free Fall Chamber (Air Atmosphere vs Vacuum)
// =========================================================================
export function mountGalileoDropWidget(container) {
  let isVacuum = false;
  let running = false;
  let time = 0;
  let slowMo = 1.0;
  let rafId = null;
  let lastTime = performance.now();

  // Objects
  // Ball: m = 5 kg, heavy, small area
  let ballY = 0;
  let ballV = 0;

  // Feather: m = 0.005 kg, light, large drag in air
  let featherY = 0;
  let featherV = 0;

  const wrap = document.createElement('div');
  wrap.className = 'aero-widget-box';
  wrap.innerHTML = `
    <div class="aero-widget-header">
      <div class="aero-badge-pill">🌍 ԳԱԼԻԼԵՅԻ ԱԶԱՏ ԱՆԿՄԱՆ ԽՑԻԿ (ԱՆՕԴ ՎԱԿՈՒՈՒՄ)</div>
      <div class="aero-widget-actions">
        <button class="aero-icon-btn" id="btn-drop-play">⬇️ Բաց թողնել</button>
        <button class="aero-icon-btn" id="btn-drop-reset">🔄 Սկզբնակետ</button>
      </div>
    </div>

    <div class="aero-widget-viewport">
      <canvas id="cv-drop" width="700" height="340" style="width:100%; height:auto; display:block; background:#070d1e; border-radius:12px;"></canvas>
    </div>

    <div class="aero-widget-controls">
      <div class="aero-control-row">
        <label>Միջավայրի ռեժիմ՝</label>
        <div class="btn-group">
          <button class="aero-toggle-btn active" id="btn-mode-air">💨 Օդային մթնոլորտ (Առկա է դիմադրություն)</button>
          <button class="aero-toggle-btn" id="btn-mode-vac">🌌 Վակուում (Ամբողջ օդը քաշված է)</button>
        </div>
      </div>
      <div class="aero-telemetry-grid">
        <div class="aero-stat-card">
          <span class="aero-stat-label">Ծանր երկաթե գունդ (5 կգ)</span>
          <span class="aero-stat-value" id="val-ball-v" style="color:#ef4444;">v = 0.0 մ/վ</span>
          <span class="aero-stat-hint" id="val-ball-y">h = 50.0 մ</span>
        </div>
        <div class="aero-stat-card">
          <span class="aero-stat-label">Թեթև փետուր (0.005 կգ)</span>
          <span class="aero-stat-value" id="val-feather-v" style="color:#ffc800;">v = 0.0 մ/վ</span>
          <span class="aero-stat-hint" id="val-feather-y">h = 50.0 մ</span>
        </div>
        <div class="aero-stat-card">
          <span class="aero-stat-label">Ազատ անկման արագացում</span>
          <span class="aero-stat-value" style="color:#58cc02;">g = 9.81 մ/վ²</span>
          <span class="aero-stat-hint">F_ձգ = m·g</span>
        </div>
      </div>
    </div>
  `;
  container.appendChild(wrap);

  const canvas = wrap.querySelector('#cv-drop');
  const ctx = canvas.getContext('2d');
  const playBtn = wrap.querySelector('#btn-drop-play');
  const resetBtn = wrap.querySelector('#btn-drop-reset');
  const btnModeAir = wrap.querySelector('#btn-mode-air');
  const btnModeVac = wrap.querySelector('#btn-mode-vac');
  const valBallV = wrap.querySelector('#val-ball-v');
  const valBallY = wrap.querySelector('#val-ball-y');
  const valFeatherV = wrap.querySelector('#val-feather-v');
  const valFeatherY = wrap.querySelector('#val-feather-y');

  const chamberTop = 40;
  const chamberBottom = 290;
  const chamberHeight = chamberBottom - chamberTop; // 250px representing 50 meters (5px / m)

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Glass Chamber tube
    ctx.fillStyle = isVacuum ? 'rgba(10, 20, 45, 0.9)' : 'rgba(30, 58, 95, 0.4)';
    ctx.fillRect(200, chamberTop, 300, chamberHeight);

    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 3;
    ctx.strokeRect(200, chamberTop, 300, chamberHeight);

    // Height markers
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px sans-serif';
    for (let m = 0; m <= 50; m += 10) {
      const my = chamberTop + (m / 50) * chamberHeight;
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(200, my);
      ctx.lineTo(215, my);
      ctx.stroke();
      ctx.fillText(`${50 - m} մ`, 170, my + 4);
    }

    // Atmosphere indicator text
    ctx.font = 'bold 12px sans-serif';
    if (isVacuum) {
      ctx.fillStyle = '#a855f7';
      ctx.fillText('🌌 ԿԱՏԱՐՅԱԼ ՎԱԿՈՒՈՒՄ (ՕԴԸ ՀԱՆՎԱԾ Է)', 240, 25);
    } else {
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('💨 ՕԴԱՅԻՆ ՄԹՆՈԼՈՐՏ (1.225 կգ/մ³)', 255, 25);

      // Draw faint air particle dots
      ctx.fillStyle = 'rgba(186, 230, 253, 0.25)';
      for (let p = 0; p < 25; p++) {
        const px = 210 + (p * 47) % 280;
        const py = chamberTop + 10 + (p * 37) % (chamberHeight - 20);
        ctx.fillRect(px, py, 2, 2);
      }
    }

    // Ball position
    const ballScreenY = chamberTop + (ballY / 50) * chamberHeight;
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(280, Math.min(chamberBottom - 12, ballScreenY + 12), 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('5 կգ', 270, Math.min(chamberBottom - 26, ballScreenY - 2));

    // Feather position
    const featherScreenY = chamberTop + (featherY / 50) * chamberHeight;
    ctx.save();
    ctx.translate(420, Math.min(chamberBottom - 10, featherScreenY + 10));
    // Feather sway in air
    if (!isVacuum && running && featherY < 49) {
      ctx.rotate(Math.sin(time * 6) * 0.35);
    }
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.ellipse(0, 0, 16, 6, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
    ctx.fillStyle = '#fef08a';
    ctx.fillText('0.005 կգ', 395, Math.min(chamberBottom - 26, featherScreenY - 2));
  }

  function loop(now) {
    const dt = Math.min((now - lastTime) / 1000, 0.05) * slowMo;
    lastTime = now;

    if (running) {
      time += dt;
      const g = 9.81;

      // Ball physics
      if (ballY < 50) {
        let dragBall = 0;
        if (!isVacuum) {
          // Cd ≈ 0.47, A ≈ 0.02 m², m = 5 kg
          dragBall = (0.5 * 1.225 * ballV * ballV * 0.47 * 0.02) / 5;
        }
        const aBall = g - dragBall;
        ballV += aBall * dt;
        ballY += ballV * dt;
        if (ballY >= 50) {
          ballY = 50;
          ballV = 0;
        }
      }

      // Feather physics
      if (featherY < 50) {
        let dragFeather = 0;
        if (!isVacuum) {
          // Cd ≈ 1.2, A ≈ 0.008 m², m = 0.005 kg
          // High drag relative to tiny mass!
          dragFeather = (0.5 * 1.225 * featherV * featherV * 1.2 * 0.008) / 0.005;
        }
        const aFeather = Math.max(0, g - dragFeather);
        featherV += aFeather * dt;
        featherY += featherV * dt;
        if (featherY >= 50) {
          featherY = 50;
          featherV = 0;
        }
      }

      valBallV.textContent = `v = ${num(ballV, 1)} մ/վ`;
      valBallY.textContent = `h = ${num(Math.max(0, 50 - ballY), 1)} մ`;
      valFeatherV.textContent = `v = ${num(featherV, 1)} մ/վ`;
      valFeatherY.textContent = `h = ${num(Math.max(0, 50 - featherY), 1)} մ`;

      if (ballY >= 50 && featherY >= 50) {
        running = false;
        playBtn.textContent = '⬇️ Բաց թողնել';
        playSound('complete');
      }

      render();
    }

    rafId = requestAnimationFrame(loop);
  }

  btnModeAir.onclick = () => {
    isVacuum = false;
    btnModeAir.classList.add('active');
    btnModeVac.classList.remove('active');
    playSound('control');
    render();
  };

  btnModeVac.onclick = () => {
    isVacuum = true;
    btnModeVac.classList.add('active');
    btnModeAir.classList.remove('active');
    playSound('control');
    render();
  };

  playBtn.onclick = () => {
    running = !running;
    playBtn.textContent = running ? '⏸️ Դադար' : '⬇️ Բաց թողնել';
    playSound('tap');
  };

  resetBtn.onclick = () => {
    running = false;
    time = 0;
    ballY = 0;
    ballV = 0;
    featherY = 0;
    featherV = 0;
    playBtn.textContent = '⬇️ Բաց թողնել';
    valBallV.textContent = 'v = 0.0 մ/վ';
    valBallY.textContent = 'h = 50.0 մ';
    valFeatherV.textContent = 'v = 0.0 մ/վ';
    valFeatherY.textContent = 'h = 50.0 մ';
    playSound('control');
    render();
  };

  render();
  rafId = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(rafId);
  };
}
