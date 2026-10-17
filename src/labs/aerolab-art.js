// AeroLab SVG Visual Art & Vector Illustrations
// High-fidelity, responsive vector components for Rocket Flight, Wind Tunnel, and DIY builds.

import { radians } from './aerolab-models.js';

/**
 * Rocket SVG markup for interactive simulation
 */
export function rocketArt({
  pitch = 0,
  finCount = 3,
  noseShape = 'conical',
  waterRemaining = 0.5,
  totalWater = 0.5,
  status = 'ready', // 'ready'|'thrust'|'coast'|'parachute'|'landed'|'tumble'
  speed = 0,
  thrust = 0,
  showVectors = true,
  gravity = 5,
  drag = 0,
} = {}) {
  const angleDeg = (pitch * 180) / Math.PI;
  const isThrusting = status === 'thrust' && thrust > 0;
  const isParachute = status === 'parachute';
  const isTumbling = status === 'tumble';

  // Water level in bottle (0 to 1)
  const waterFillRatio = totalWater > 0 ? Math.max(0, Math.min(1, waterRemaining / totalWater)) : 0;
  const waterHeight = Math.round(waterFillRatio * 90);

  // Fin configurations
  let finsSvg = '';
  if (finCount >= 3) {
    finsSvg = `
      <!-- Left Fin -->
      <path d="M -18 70 L -42 110 L -18 100 Z" fill="#1cb0f6" stroke="#0e83b8" stroke-width="2" stroke-linejoin="round"/>
      <!-- Right Fin -->
      <path d="M 18 70 L 42 110 L 18 100 Z" fill="#1cb0f6" stroke="#0e83b8" stroke-width="2" stroke-linejoin="round"/>
      <!-- Center Fin -->
      <path d="M -4 70 L 0 108 L 4 70 Z" fill="#0786bf" stroke="#045a82" stroke-width="1.5"/>
    `;
  }
  if (finCount === 4) {
    finsSvg += `
      <!-- 4th stabilizer accents -->
      <path d="M -12 75 L -28 105 L -12 98 Z" fill="#58cc02" opacity="0.6"/>
      <path d="M 12 75 L 28 105 L 12 98 Z" fill="#58cc02" opacity="0.6"/>
    `;
  }

  // Nosecone geometry
  const noseSvg =
    noseShape === 'conical'
      ? `<path d="M 0 -75 L 18 -10 L -18 -10 Z" fill="#ff4b4b" stroke="#d93038" stroke-width="2"/>
         <circle cx="0" cy="-68" r="4" fill="#ffd1d1"/>`
      : `<path d="M -18 -10 C -18 -55 18 -55 18 -10 Z" fill="#ff8a00" stroke="#d97000" stroke-width="2"/>`;

  // Exhaust plume / water jet
  let exhaustSvg = '';
  if (isThrusting) {
    const plumeLength = 35 + Math.min(65, thrust * 0.4);
    exhaustSvg = `
      <g class="rocket-plume">
        <!-- Water jet spray -->
        <path d="M -10 115 Q 0 ${115 + plumeLength * 1.2} 10 115 Q 0 ${115 + plumeLength * 0.4} -10 115 Z" fill="#3caaed" opacity="0.85"/>
        <path d="M -6 115 Q 0 ${115 + plumeLength * 0.8} 6 115 Z" fill="#ffffff" opacity="0.9"/>
        <!-- Droplet particles -->
        <circle cx="-14" cy="${120 + plumeLength * 0.6}" r="3" fill="#3caaed" opacity="0.7"/>
        <circle cx="15" cy="${125 + plumeLength * 0.7}" r="3.5" fill="#3caaed" opacity="0.7"/>
        <circle cx="3" cy="${130 + plumeLength * 1.1}" r="4" fill="#69c3f5" opacity="0.8"/>
      </g>
    `;
  }

  // Parachute canopy
  let chuteSvg = '';
  if (isParachute) {
    chuteSvg = `
      <g transform="translate(0, -95)">
        <path d="M -65 -35 Q 0 -95 65 -35 Q 35 -40 0 -40 Q -35 -40 -65 -35 Z" fill="#ffc800" stroke="#d9a000" stroke-width="2.5"/>
        <path d="M -20 -40 Q 0 -95 20 -40 Z" fill="#ff4b4b" opacity="0.85"/>
        <!-- Shroud lines -->
        <line x1="-60" y1="-35" x2="-8" y2="15" stroke="#777e90" stroke-width="1.5" stroke-dasharray="3 2"/>
        <line x1="-25" y1="-38" x2="-4" y2="15" stroke="#777e90" stroke-width="1.5"/>
        <line x1="25" y1="-38" x2="4" y2="15" stroke="#777e90" stroke-width="1.5"/>
        <line x1="60" y1="-35" x2="8" y2="15" stroke="#777e90" stroke-width="1.5" stroke-dasharray="3 2"/>
      </g>
    `;
  }

  // Vector overlays
  let vectorsSvg = '';
  if (showVectors && status !== 'ready' && status !== 'landed') {
    // Thrust vector (green, forward)
    if (thrust > 5) {
      const tLen = Math.min(80, thrust * 0.45);
      vectorsSvg += `
        <g stroke="#58cc02" stroke-width="3.5" fill="#58cc02">
          <line x1="0" y1="-10" x2="0" y2="${-10 - tLen}"/>
          <polygon points="0,${-18 - tLen} -6,${-10 - tLen} 6,${-10 - tLen}"/>
          <text x="12" y="${-10 - tLen / 2}" font-size="13" font-weight="700" fill="#235600">F_քարշ (${Math.round(thrust)} Ն)</text>
        </g>
      `;
    }
    // Drag vector (orange, backward)
    if (drag > 1) {
      const dLen = Math.min(65, drag * 3.5);
      vectorsSvg += `
        <g stroke="#ff8a00" stroke-width="3" fill="#ff8a00">
          <line x1="0" y1="40" x2="0" y2="${40 + dLen}"/>
          <polygon points="0,${46 + dLen} -5,${38 + dLen} 5,${38 + dLen}"/>
          <text x="10" y="${40 + dLen / 2}" font-size="12" font-weight="600" fill="#a65400">F_դիմադր (${Math.round(drag * 10) / 10} Ն)</text>
        </g>
      `;
    }
    // Gravity vector (red, always downward towards earth)
    const gLen = Math.min(50, gravity * 6);
    vectorsSvg += `
      <g transform="rotate(${-angleDeg})" stroke="#ea2b2b" stroke-width="3" fill="#ea2b2b">
        <line x1="0" y1="20" x2="0" y2="${20 + gLen}"/>
        <polygon points="0,${26 + gLen} -5,${18 + gLen} 5,${18 + gLen}"/>
        <text x="10" y="${20 + gLen / 2}" font-size="12" font-weight="600" fill="#8c1d1d">F_ծ (${Math.round(gravity * 10) / 10} Ն)</text>
      </g>
    `;
  }

  return `
    <g transform="rotate(${angleDeg})" class="rocket-assembly ${isTumbling ? 'is-tumbling' : ''}">
      ${chuteSvg}
      ${finsSvg}

      <!-- Main transparent bottle body -->
      <rect x="-18" y="-10" width="36" height="115" rx="10" fill="#f0f7fb" stroke="#778e9b" stroke-width="2.5"/>
      <line x1="-12" y1="0" x2="-12" y2="95" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>

      <!-- Water fill rectangle inside bottle -->
      ${
        waterHeight > 0
          ? `<rect x="-15" y="${102 - waterHeight}" width="30" height="${waterHeight}" rx="5" fill="#3caaed" opacity="0.6"/>
             <line x1="-14" y1="${102 - waterHeight}" x2="14" y2="${102 - waterHeight}" stroke="#65c7f8" stroke-width="2"/>`
          : ''
      }

      <!-- Nozzle / bottle cap opening -->
      <rect x="-9" y="105" width="18" height="12" rx="3" fill="#465365" stroke="#2e3e50" stroke-width="1.5"/>

      <!-- Nosecone -->
      ${noseSvg}

      <!-- Center of Mass (CoM) marker -->
      <g transform="translate(0, 38)" opacity="0.75" title="Ծանրության Կենտրոն (CoM)">
        <circle r="7" fill="#ffffff" stroke="#252525" stroke-width="1.5"/>
        <path d="M 0 -7 A 7 7 0 0 1 7 0 L 0 0 Z" fill="#252525"/>
        <path d="M 0 7 A 7 7 0 0 1 -7 0 L 0 0 Z" fill="#252525"/>
      </g>

      ${exhaustSvg}
      ${vectorsSvg}
    </g>
  `;
}

/**
 * Wind Tunnel Airfoil with Interactive Streamlines
 */
export function airfoilTunnelArt({
  angleDeg = 4,
  airSpeed = 20,
  lift = 15,
  drag = 2,
  stall = false,
  streamlineCount = 7,
} = {}) {
  const isStalled = stall || angleDeg > 15.5 || angleDeg < -11;

  // Streamlines passing over and under the wing
  const streamlines = [];
  const startY = 60;
  const spacing = 32;

  for (let i = 0; i < streamlineCount; i++) {
    const y0 = startY + i * spacing;
    let pathD = '';

    if (!isStalled) {
      // Smooth Bernoulli curve
      const isTop = y0 < 170;
      const deflectionY = isTop ? -22 * Math.sin(radians(Math.max(1, angleDeg))) : 16;
      const downwashY = y0 + angleDeg * 1.8;
      pathD = `M 20 ${y0} C 180 ${y0 + deflectionY}, 320 ${y0 + deflectionY * 1.2}, 440 ${downwashY} L 580 ${downwashY + 10}`;
    } else {
      // Turbulent stalled separation vortices
      if (y0 < 160) {
        pathD = `M 20 ${y0} C 160 ${y0 - 25}, 240 ${y0 + 35}, 300 ${y0 - 20} C 360 ${y0 + 30}, 420 ${y0 - 15}, 580 ${y0 + 20}`;
      } else {
        pathD = `M 20 ${y0} C 200 ${y0 + 15}, 380 ${y0 + 25}, 580 ${y0 + 35}`;
      }
    }

    const color = isStalled && y0 < 160 ? '#ea2b2b' : '#3caaed';
    const strokeDash = isStalled && y0 < 160 ? '6 4' : 'none';
    streamlines.push(
      `<path d="${pathD}" fill="none" stroke="${color}" stroke-width="2.5" opacity="0.65" stroke-dasharray="${strokeDash}"/>`
    );
  }

  // Force vectors on airfoil
  const liftLen = Math.min(90, Math.abs(lift) * 3);
  const dragLen = Math.min(75, Math.abs(drag) * 15);

  return `
    <svg viewBox="0 0 600 320" class="airfoil-wind-tunnel-svg" aria-label="Աերոդինամիկ խողովակ և թևի պրոֆիլ">
      <defs>
        <linearGradient id="tunnel-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#f5fafd"/>
          <stop offset="100%" stop-color="#eaf3f8"/>
        </linearGradient>
        <linearGradient id="wing-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#566376"/>
          <stop offset="50%" stop-color="#343f52"/>
          <stop offset="100%" stop-color="#232c3c"/>
        </linearGradient>
      </defs>

      <!-- Wind tunnel bounds -->
      <rect x="15" y="15" width="570" height="290" rx="14" fill="url(#tunnel-bg)" stroke="#cde0eb" stroke-width="2"/>
      <line x1="15" y1="15" x2="585" y2="15" stroke="#0875b0" stroke-width="4"/>
      <line x1="15" y1="305" x2="585" y2="305" stroke="#0875b0" stroke-width="4"/>

      <!-- Airflow streamlines -->
      <g class="streamlines-group">
        ${streamlines.join('')}
      </g>

      <!-- NACA Airfoil Profile placed at (280, 160) -->
      <g transform="translate(280, 160) rotate(${-angleDeg})">
        <!-- Airfoil shape (curved upper camber, flatter bottom) -->
        <path d="M -110 0 C -90 -28, 20 -38, 120 0 C 60 12, -70 14, -110 0 Z" fill="url(#wing-grad)" stroke="#1a222d" stroke-width="2.5"/>
        <line x1="-120" y1="0" x2="135" y2="0" stroke="#ffc800" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.6"/>
        <circle cx="0" cy="0" r="5" fill="#58cc02"/>
      </g>

      <!-- Vector Overlay at wing center (280, 160) -->
      <g transform="translate(280, 160)">
        <!-- Lift vector (green, vertical upward) -->
        ${
          liftLen > 5
            ? `<g stroke="#58cc02" stroke-width="3.5" fill="#58cc02">
                 <line x1="0" y1="0" x2="0" y2="${-liftLen}"/>
                 <polygon points="0,${-liftLen - 8} -6,${-liftLen} 6,${-liftLen}"/>
                 <text x="12" y="${-liftLen / 2}" font-size="13" font-weight="700" fill="#235600">Վերամբարձ ուժ L (${lift} Ն)</text>
               </g>`
            : ''
        }
        <!-- Drag vector (orange, horizontal right) -->
        ${
          dragLen > 4
            ? `<g stroke="#ff8a00" stroke-width="3" fill="#ff8a00">
                 <line x1="0" y1="0" x2="${dragLen}" y2="0"/>
                 <polygon points="${dragLen + 8},0 ${dragLen},-6 ${dragLen},6"/>
                 <text x="${dragLen / 2}" y="22" font-size="12" font-weight="600" fill="#a65400">Դիմադրություն D (${drag} Ն)</text>
               </g>`
            : ''
        }
      </g>

      <!-- Bernoulli Pressure Differential Labels -->
      ${
        !isStalled
          ? `
        <!-- Upper Suction Zone (P1 < P2) -->
        <g transform="translate(270, 115)">
          <rect x="-70" y="-13" width="140" height="24" rx="6" fill="#0284c7" fill-opacity="0.12" stroke="#0284c7" stroke-width="1.2"/>
          <text x="0" y="3" font-size="11" font-weight="700" fill="#0369a1" text-anchor="middle">ՑԱԾՐ ՃՆՇՈՒՄ P₁ (v₁ > v₂)</text>
        </g>
        <!-- Lower Pressure Zone (P2 > P1) -->
        <g transform="translate(270, 215)">
          <rect x="-70" y="-13" width="140" height="24" rx="6" fill="#ea580c" fill-opacity="0.12" stroke="#ea580c" stroke-width="1.2"/>
          <text x="0" y="3" font-size="11" font-weight="700" fill="#c2410c" text-anchor="middle">ԲԱՐՁՐ ՃՆՇՈՒՄ P₂ (v₂ < v₁)</text>
        </g>
        <!-- Bernoulli Equation Formula Box -->
        <g transform="translate(35, 260)">
          <rect width="210" height="30" rx="8" fill="#ffffff" fill-opacity="0.9" stroke="#94a3b8" stroke-width="1"/>
          <text x="10" y="20" font-size="11" font-weight="700" fill="#334155">Բեռնուլի՝ P + ½ρv² = const</text>
        </g>
        `
          : ''
      }

      <!-- Angle of attack indicator badge -->
      <g transform="translate(40, 48)">
        <rect width="165" height="36" rx="8" fill="#ffffff" stroke="#cde0eb" stroke-width="1.5"/>
        <text x="12" y="23" font-size="13" font-weight="600" fill="#252525">Գրոհի անկյուն՝ <strong>${angleDeg}°</strong></text>
      </g>

      <!-- Stall Warning Badge -->
      ${
        isStalled
          ? `<g transform="translate(380, 48)" class="stall-warning-badge">
               <rect width="180" height="36" rx="8" fill="#fff0ef" stroke="#ea2b2b" stroke-width="2"/>
               <text x="14" y="23" font-size="13" font-weight="700" fill="#b81b1b">⚠️ ՇԵՂՈՒՄ (STALL)</text>
             </g>`
          : `<g transform="translate(410, 48)">
               <rect width="150" height="36" rx="8" fill="#eff9eb" stroke="#58cc02" stroke-width="1.5"/>
               <text x="12" y="23" font-size="13" font-weight="600" fill="#235600">✓ Կայուն հոսք</text>
             </g>`
      }
    </svg>
  `;
}

/**
 * Quadcopter 4-Rotor Drone Visual Diagram with Dynamic Vectors & Torque Balance
 */
export function droneArt({
  motors = [100, 100, 100, 100],
  thrusts = [1.96, 1.96, 1.96, 1.96],
  totalThrust = 7.85,
  weight = 7.85,
  pitchDeg = 0,
  rollDeg = 0,
  yawTorque = 0,
  showVectors = true,
} = {}) {
  const [m1, m2, m3, m4] = motors;
  const [t1, t2, t3, t4] = thrusts;

  const isBalanced = Math.abs(yawTorque) < 0.001;
  const isHover = Math.abs(totalThrust - weight) < 0.2 && isBalanced && Math.abs(pitchDeg) < 0.5 && Math.abs(rollDeg) < 0.5;

  // Vector lengths (scaled for visual display)
  const vScale = 14;
  const lenT1 = Math.min(65, t1 * vScale);
  const lenT2 = Math.min(65, t2 * vScale);
  const lenT3 = Math.min(65, t3 * vScale);
  const lenT4 = Math.min(65, t4 * vScale);
  const lenTotal = Math.min(80, totalThrust * 4.5);
  const lenWeight = Math.min(80, weight * 4.5);

  return `
    <svg viewBox="0 0 600 360" class="drone-simulator-svg" aria-label="Քվադրոկոպտերի դինամիկա և հավասարակշռում">
      <defs>
        <radialGradient id="drone-grid-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#f8fcff"/>
          <stop offset="100%" stop-color="#eaf3f9"/>
        </radialGradient>
        <filter id="rotor-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5"/>
        </filter>
      </defs>

      <!-- Background Grid Plane -->
      <rect width="600" height="360" fill="url(#drone-grid-bg)"/>
      <g stroke="#d6e7f2" stroke-width="1" opacity="0.6">
        <line x1="50" y1="180" x2="550" y2="180" stroke-dasharray="4 4"/>
        <line x1="300" y1="30" x2="300" y2="330" stroke-dasharray="4 4"/>
        <ellipse cx="300" cy="180" rx="140" ry="110" fill="none"/>
        <ellipse cx="300" cy="180" rx="220" ry="150" fill="none"/>
      </g>

      <!-- Drone Body transformed by Roll and Pitch tilt -->
      <g transform="translate(300, 180) rotate(${rollDeg}) scale(${1 - Math.abs(pitchDeg) * 0.004})">
        <!-- Structural Arms (Crossed) -->
        <line x1="0" y1="-100" x2="0" y2="100" stroke="#252525" stroke-width="9" stroke-linecap="round"/>
        <line x1="-120" y1="0" x2="120" y2="0" stroke="#252525" stroke-width="9" stroke-linecap="round"/>
        <line x1="0" y1="-100" x2="0" y2="100" stroke="#777777" stroke-width="3" stroke-linecap="round"/>
        <line x1="-120" y1="0" x2="120" y2="0" stroke="#777777" stroke-width="3" stroke-linecap="round"/>

        <!-- Motor 1: Front (0, -100) CW -->
        <g transform="translate(0, -100)">
          <!-- Blurred spinning rotor disk -->
          <ellipse cx="0" cy="0" rx="42" ry="24" fill="#00b4d8" opacity="${0.25 + (m1 / 200) * 0.4}" filter="url(#rotor-blur)"/>
          <ellipse cx="0" cy="0" rx="40" ry="22" fill="none" stroke="#0096c7" stroke-width="2" stroke-dasharray="6 3"/>
          <circle cx="0" cy="0" r="10" fill="#333333" stroke="#1cb0f6" stroke-width="2"/>
          <!-- CW rotation arrow badge -->
          <text x="0" y="34" font-size="11" font-weight="700" text-anchor="middle" fill="#0077b6">M1 (CW ↻)</text>
          ${
            showVectors && lenT1 > 4
              ? `<g stroke="#58cc02" stroke-width="3" fill="#58cc02">
                   <line x1="0" y1="0" x2="0" y2="${-lenT1}"/>
                   <polygon points="0,${-lenT1 - 6} -4,${-lenT1} 4,${-lenT1}"/>
                   <text x="8" y="${-lenT1 / 2}" font-size="11" font-weight="700" fill="#2b6b00">${t1}Ն</text>
                 </g>`
              : ''
          }
        </g>

        <!-- Motor 2: Right (120, 0) CCW -->
        <g transform="translate(120, 0)">
          <ellipse cx="0" cy="0" rx="26" ry="38" fill="#ff9f1c" opacity="${0.25 + (m2 / 200) * 0.4}" filter="url(#rotor-blur)"/>
          <ellipse cx="0" cy="0" rx="24" ry="36" fill="none" stroke="#f77f00" stroke-width="2" stroke-dasharray="6 3"/>
          <circle cx="0" cy="0" r="10" fill="#333333" stroke="#ff9f1c" stroke-width="2"/>
          <text x="0" y="44" font-size="11" font-weight="700" text-anchor="middle" fill="#d97000">M2 (CCW ↺)</text>
          ${
            showVectors && lenT2 > 4
              ? `<g stroke="#58cc02" stroke-width="3" fill="#58cc02">
                   <line x1="0" y1="0" x2="0" y2="${-lenT2}"/>
                   <polygon points="0,${-lenT2 - 6} -4,${-lenT2} 4,${-lenT2}"/>
                   <text x="8" y="${-lenT2 / 2}" font-size="11" font-weight="700" fill="#2b6b00">${t2}Ն</text>
                 </g>`
              : ''
          }
        </g>

        <!-- Motor 3: Rear (0, 100) CW -->
        <g transform="translate(0, 100)">
          <ellipse cx="0" cy="0" rx="42" ry="24" fill="#00b4d8" opacity="${0.25 + (m3 / 200) * 0.4}" filter="url(#rotor-blur)"/>
          <ellipse cx="0" cy="0" rx="40" ry="22" fill="none" stroke="#0096c7" stroke-width="2" stroke-dasharray="6 3"/>
          <circle cx="0" cy="0" r="10" fill="#333333" stroke="#1cb0f6" stroke-width="2"/>
          <text x="0" y="34" font-size="11" font-weight="700" text-anchor="middle" fill="#0077b6">M3 (CW ↻)</text>
          ${
            showVectors && lenT3 > 4
              ? `<g stroke="#58cc02" stroke-width="3" fill="#58cc02">
                   <line x1="0" y1="0" x2="0" y2="${-lenT3}"/>
                   <polygon points="0,${-lenT3 - 6} -4,${-lenT3} 4,${-lenT3}"/>
                   <text x="8" y="${-lenT3 / 2}" font-size="11" font-weight="700" fill="#2b6b00">${t3}Ն</text>
                 </g>`
              : ''
          }
        </g>

        <!-- Motor 4: Left (-120, 0) CCW -->
        <g transform="translate(-120, 0)">
          <ellipse cx="0" cy="0" rx="26" ry="38" fill="#ff9f1c" opacity="${0.25 + (m4 / 200) * 0.4}" filter="url(#rotor-blur)"/>
          <ellipse cx="0" cy="0" rx="24" ry="36" fill="none" stroke="#f77f00" stroke-width="2" stroke-dasharray="6 3"/>
          <circle cx="0" cy="0" r="10" fill="#333333" stroke="#ff9f1c" stroke-width="2"/>
          <text x="0" y="44" font-size="11" font-weight="700" text-anchor="middle" fill="#d97000">M4 (CCW ↺)</text>
          ${
            showVectors && lenT4 > 4
              ? `<g stroke="#58cc02" stroke-width="3" fill="#58cc02">
                   <line x1="0" y1="0" x2="0" y2="${-lenT4}"/>
                   <polygon points="0,${-lenT4 - 6} -4,${-lenT4} 4,${-lenT4}"/>
                   <text x="8" y="${-lenT4 / 2}" font-size="11" font-weight="700" fill="#2b6b00">${t4}Ն</text>
                 </g>`
              : ''
          }
        </g>

        <!-- Central Fuselage / Controller Module -->
        <rect x="-26" y="-32" width="52" height="64" rx="14" fill="#1e232a" stroke="#3d4450" stroke-width="2.5"/>
        <rect x="-16" y="-22" width="32" height="30" rx="6" fill="#1cb0f6"/>
        <circle cx="0" cy="18" r="4.5" fill="${isHover ? '#58cc02' : '#ff9f1c'}"/>
        <!-- Front Heading Triangle -->
        <polygon points="0,-36 -8,-24 8,-24" fill="#ff4b4b"/>
      </g>

      <!-- Center Dynamic Force Balance Vectors (Total Lift vs Weight) -->
      ${
        showVectors
          ? `<g transform="translate(300, 180)">
               <!-- Net Lift Vector (Vertical Up) -->
               <g stroke="#1cb0f6" stroke-width="4" fill="#1cb0f6">
                 <line x1="0" y1="0" x2="0" y2="${-lenTotal}"/>
                 <polygon points="0,${-lenTotal - 8} -5,${-lenTotal} 5,${-lenTotal}"/>
                 <text x="12" y="${-lenTotal / 2}" font-size="12" font-weight="700" fill="#0369a1">Ընդհանուր քարշուժ՝ ${totalThrust} Ն</text>
               </g>
               <!-- Weight Vector (Vertical Down) -->
               <g stroke="#ea2b2b" stroke-width="4" fill="#ea2b2b">
                 <line x1="0" y1="0" x2="0" y2="${lenWeight}"/>
                 <polygon points="0,${lenWeight + 8} -5,${lenWeight} 5,${lenWeight}"/>
                 <text x="12" y="${lenWeight / 2}" font-size="12" font-weight="700" fill="#b91c1c">Ծանրություն (W)՝ ${weight} Ն</text>
               </g>
             </g>`
          : ''
      }

      <!-- Status Indicator Pill -->
      <g transform="translate(30, 30)">
        <rect width="180" height="38" rx="10" fill="#ffffff" stroke="#cde0eb" stroke-width="1.5"/>
        <circle cx="20" cy="19" r="6" fill="${isHover ? '#58cc02' : isBalanced ? '#1cb0f6' : '#ea2b2b'}"/>
        <text x="36" y="24" font-size="13" font-weight="700" fill="#252525">
          ${isHover ? 'ՀՈՎԵՐԻՆԳ (Կայուն)' : isBalanced ? 'ԹՌԻՉՔ (Հավասարակշռված)' : 'ՊՏՏՈՒՄ Է (Անհավասար)'}
        </text>
      </g>

      <!-- Yaw Torque Gauge (Top Right) -->
      <g transform="translate(420, 30)">
        <rect width="150" height="38" rx="10" fill="#ffffff" stroke="#cde0eb" stroke-width="1.5"/>
        <text x="14" y="24" font-size="12" font-weight="600" fill="#4b5563">
          Պտտող մոմենտ՝ <tspan font-weight="700" fill="${isBalanced ? '#166534' : '#b91c1c'}">${yawTorque.toFixed(3)} Ն·մ</tspan>
        </text>
      </g>
    </svg>
  `;
}

/**
 * Supersonic Shockwave & Mach Cone Visual Scene
 */
export function supersonicMachArt({
  mach = 1.0,
  machAngleDeg = null,
  airspeedKmh = 1225,
  pressureRatio = 1.0,
  time = 0,
} = {}) {
  const isSonic = Math.abs(mach - 1.0) < 0.04;
  const isSupersonic = mach >= 1.0;
  const isSubsonic = mach < 1.0;

  // Aircraft nose position on canvas
  const noseX = 400;
  const noseY = 170;

  // Number of circular acoustic wavefronts
  const waveCount = 8;
  const spacing = 32;
  const wavesSvg = [];

  for (let k = 1; k <= waveCount; k++) {
    // Past emission position
    const pastX = noseX - k * spacing;
    // Acoustic wave radius = distance traveled by sound since emission
    // Distance jet traveled = k * spacing
    // Since v = M * a, r = (k * spacing) / M
    const radius = (k * spacing) / mach;

    if (radius > 5 && radius < 380) {
      const opacity = Math.max(0.12, 0.7 - (k / waveCount) * 0.55);
      const strokeColor = isSupersonic ? '#00b4d8' : '#38bdf8';
      wavesSvg.push(
        `<circle cx="${pastX}" cy="${noseY}" r="${radius}" fill="none" stroke="${strokeColor}" stroke-width="${isSonic && k <= 2 ? '3.5' : '1.8'}" opacity="${opacity}"/>`
      );
    }
  }

  // Mach Cone Lines (Tangents to acoustic circles)
  let machConeSvg = '';
  if (isSupersonic && machAngleDeg !== null) {
    const muRad = (machAngleDeg * Math.PI) / 180;
    const coneLen = 320;
    const coneTopX = noseX - coneLen * Math.cos(muRad);
    const coneTopY = noseY - coneLen * Math.sin(muRad);
    const coneBotX = noseX - coneLen * Math.cos(muRad);
    const coneBotY = noseY + coneLen * Math.sin(muRad);

    machConeSvg = `
      <!-- Glowing Mach Shockwave Cone -->
      <polygon points="${noseX},${noseY} ${coneTopX},${coneTopY} ${coneTopX - 40},${coneTopY} ${coneBotX - 40},${coneBotY} ${coneBotX},${coneBotY}" fill="#38bdf8" opacity="0.12"/>
      <line x1="${noseX}" y1="${noseY}" x2="${coneTopX}" y2="${coneTopY}" stroke="#0284c7" stroke-width="3.5" stroke-linecap="round"/>
      <line x1="${noseX}" y1="${noseY}" x2="${coneBotX}" y2="${coneBotY}" stroke="#0284c7" stroke-width="3.5" stroke-linecap="round"/>
      <!-- Angle Arc -->
      <path d="M ${noseX - 50} ${noseY} A 50 50 0 0 0 ${noseX - 50 * Math.cos(muRad)} ${noseY - 50 * Math.sin(muRad)}" fill="none" stroke="#e11d48" stroke-width="2.5"/>
      <text x="${noseX - 82}" y="${noseY - 14}" font-size="13" font-weight="700" fill="#be123c">μ = ${machAngleDeg}°</text>
    `;
  }

  // Sonic Barrier Shock Wall (vertical line at nose when M ≈ 1)
  let sonicWallSvg = '';
  if (isSonic) {
    sonicWallSvg = `
      <line x1="${noseX}" y1="40" x2="${noseX}" y2="300" stroke="#f59e0b" stroke-width="4" stroke-dasharray="8 4"/>
      <text x="${noseX - 140}" y="70" font-size="13" font-weight="800" fill="#b45309">⚡ ՁԱՅՆԱՅԻՆ ՊԱՏՆԵՇ (M=1.0)</text>
    `;
  }

  return `
    <svg viewBox="0 0 600 340" class="supersonic-simulator-svg" aria-label="Գերձայնային թռիչք և Մախի հարվածային կոն">
      <defs>
        <linearGradient id="sky-supersonic" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0f172a"/>
          <stop offset="100%" stop-color="#1e293b"/>
        </linearGradient>
      </defs>

      <!-- Night / High Altitude Stratosphere Sky -->
      <rect width="600" height="340" fill="url(#sky-supersonic)"/>

      <!-- Flight Path Centerline -->
      <line x1="20" y1="${noseY}" x2="580" y2="${noseY}" stroke="#334155" stroke-width="1.5" stroke-dasharray="6 6"/>

      <!-- Expanding Acoustic Wavefronts -->
      <g>
        ${wavesSvg.join('')}
      </g>

      <!-- Mach Shockwave Cone Envelope -->
      ${machConeSvg}
      ${sonicWallSvg}

      <!-- Jet Aircraft Vector Graphic (Nose at noseX, noseY) -->
      <g transform="translate(${noseX - 110}, ${noseY - 18})">
        <!-- Exhaust Fire -->
        <polygon points="-25,18 -8,13 -8,23" fill="#f97316"/>
        <polygon points="-16,18 -8,15 -8,21" fill="#fef08a"/>
        <!-- Delta Wing -->
        <polygon points="20,18 -5,-8 15,18" fill="#475569" stroke="#94a3b8" stroke-width="1.5"/>
        <polygon points="20,18 -5,44 15,18" fill="#475569" stroke="#94a3b8" stroke-width="1.5"/>
        <!-- Fuselage -->
        <path d="M 0 14 L 85 17 Q 110 18 85 19 L 0 22 Z" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1.5"/>
        <!-- Cockpit Canopy -->
        <ellipse cx="60" cy="18" rx="14" ry="4" fill="#0284c7" stroke="#38bdf8" stroke-width="1"/>
        <!-- Vertical Stabilizer Fin -->
        <polygon points="5,18 -15,0 0,18" fill="#ef4444"/>
      </g>

      <!-- Telemetry Info Card (Top Left) -->
      <g transform="translate(30, 24)">
        <rect width="210" height="74" rx="12" fill="#0f172a" fill-opacity="0.85" stroke="#334155" stroke-width="1.5"/>
        <text x="14" y="24" font-size="14" font-weight="700" fill="#38bdf8">Արագություն՝ ${mach} M</text>
        <text x="14" y="44" font-size="12" font-weight="600" fill="#94a3b8">Իրական՝ ~${airspeedKmh} կմ/ժ (${(airspeedKmh / 3.6).toFixed(0)} մ/վ)</text>
        <text x="14" y="62" font-size="12" font-weight="600" fill="${isSupersonic ? '#34d399' : '#fbbf24'}">
          ${isSupersonic ? `Մախի անկյուն՝ μ = ${machAngleDeg}°` : 'Ենթաձայնային (ալիքները առաջ են)'}
        </text>
      </g>

      <!-- Shockwave Pressure Jump Card (Top Right) -->
      ${
        isSupersonic
          ? `<g transform="translate(420, 24)">
               <rect width="150" height="42" rx="10" fill="#0f172a" fill-opacity="0.85" stroke="#0284c7" stroke-width="1.5"/>
               <text x="12" y="26" font-size="12" font-weight="700" fill="#e0f2fe">Ճնշման թռիչք՝ P₂/P₁ = ${pressureRatio}x</text>
             </g>`
          : ''
      }
    </svg>
  `;
}

/**
 * High-Bypass Turbofan Jet Engine Cutaway Art (SVG)
 * Shows Fan, Bypass Duct, LPC/HPC, Annular Combustor, Dual Concentric Shafts, HPT/LPT, and Nozzle.
 */
export function turbofanEngineArt({
  throttle = 75,
  bypassRatio = 8.5,
  thrustKn = 120,
  thrustBypassKn = 98,
  thrustCoreKn = 22,
  bypassThrustPercent = 81.7,
  titC = 1100,
  fanRpmPct = 81,
  coreRpmPct = 84,
  showVectors = true,
} = {}) {
  const flameIntensity = 0.3 + 0.7 * (throttle / 100);
  const flameLen = 20 + 32 * (throttle / 100);
  const corePlumeLen = 30 + 65 * (throttle / 100);

  const bypassVectorLen = Math.min(80, (thrustBypassKn / 150) * 80);
  const coreVectorLen = Math.min(65, (thrustCoreKn / 60) * 65);

  return `
    <svg viewBox="0 0 680 340" class="turbofan-simulator-svg" aria-label="Երկկոնտուր տուրբոօդափոխիչային շարժիչի կտրվածք">
      <defs>
        <linearGradient id="cowl-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#cbd5e1"/>
          <stop offset="50%" stop-color="#94a3b8"/>
          <stop offset="100%" stop-color="#64748b"/>
        </linearGradient>
        <linearGradient id="core-casing" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#475569"/>
          <stop offset="100%" stop-color="#1e293b"/>
        </linearGradient>
        <linearGradient id="bypass-air" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#0284c7" stop-opacity="0.1"/>
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.4"/>
        </linearGradient>
        <linearGradient id="combustor-flame" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#f97316"/>
          <stop offset="40%" stop-color="#eab308"/>
          <stop offset="80%" stop-color="#ef4444"/>
          <stop offset="100%" stop-color="#ffffff"/>
        </linearGradient>
        <linearGradient id="exhaust-plume" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#f97316" stop-opacity="0.8"/>
          <stop offset="60%" stop-color="#fbbf24" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
        </linearGradient>
      </defs>

      <!-- Background chamber tint -->
      <rect x="10" y="10" width="660" height="320" rx="14" fill="#0b1324"/>

      <!-- Centerline axis of symmetry -->
      <line x1="30" y1="170" x2="650" y2="170" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 5"/>

      <!-- 1. Cold Bypass Flow Streams (Top & Bottom) -->
      <path d="M 120 45 L 360 45 L 360 85 L 150 95 Z" fill="url(#bypass-air)"/>
      <path d="M 120 295 L 360 295 L 360 255 L 150 245 Z" fill="url(#bypass-air)"/>
      
      <!-- Flow stream arrows in bypass duct -->
      <g stroke="#38bdf8" stroke-width="2" stroke-linecap="round" opacity="0.75">
        <line x1="160" y1="65" x2="330" y2="65" stroke-dasharray="8 6"/>
        <line x1="160" y1="275" x2="330" y2="275" stroke-dasharray="8 6"/>
      </g>

      <!-- 2. Outer Nacelle / Cowling (Upper & Lower) -->
      <path d="M 60 70 C 50 40, 100 30, 200 30 L 370 35 L 360 55 L 140 55 C 80 55, 70 65, 60 70 Z" fill="url(#cowl-grad)" stroke="#475569" stroke-width="2"/>
      <path d="M 60 270 C 50 300, 100 310, 200 310 L 370 305 L 360 285 L 140 285 C 80 285, 70 275, 60 270 Z" fill="url(#cowl-grad)" stroke="#475569" stroke-width="2"/>

      <!-- 3. Engine Core Cowling / Center Body -->
      <path d="M 140 100 L 320 90 L 460 115 L 490 145 L 490 195 L 460 225 L 320 250 L 140 240 Z" fill="url(#core-casing)" stroke="#64748b" stroke-width="2"/>

      <!-- 4. Concentric Shafts (Spools) along Centerline -->
      <!-- Outer HP Spool N2 (Bronze/gold hollow shaft connecting HPC & HPT) -->
      <rect x="235" y="165" width="165" height="10" rx="2" fill="#d97706" stroke="#b45309" stroke-width="1.5"/>
      <!-- Inner LP Spool N1 (Silver/steel shaft connecting Fan/LPC & LPT) -->
      <rect x="110" y="167.5" width="345" height="5" rx="1.5" fill="#94a3b8" stroke="#475569" stroke-width="1"/>

      <!-- 5. Front Spinner Nosecone -->
      <path d="M 60 170 C 60 140, 115 155, 125 170 C 115 185, 60 200, 60 170 Z" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
      <circle cx="85" cy="170" r="3" fill="#38bdf8"/>

      <!-- 6. Intake Fan (Large Titanium Blades) -->
      <g stroke="#e2e8f0" stroke-width="3.5" stroke-linecap="round">
        <line x1="120" y1="52" x2="128" y2="160"/>
        <line x1="120" y1="288" x2="128" y2="180"/>
        <line x1="115" y1="75" x2="125" y2="155"/>
        <line x1="115" y1="265" x2="125" y2="185"/>
      </g>
      <rect x="118" y="152" width="16" height="36" rx="4" fill="#64748b"/>

      <!-- 7. Low Pressure Compressor (LPC / Booster - 3 stages on N1) -->
      <g stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round">
        <line x1="150" y1="110" x2="152" y2="160"/>
        <line x1="150" y1="230" x2="152" y2="180"/>
        <line x1="165" y1="115" x2="167" y2="160"/>
        <line x1="165" y1="225" x2="167" y2="180"/>
        <line x1="180" y1="120" x2="182" y2="160"/>
        <line x1="180" y1="220" x2="182" y2="180"/>
      </g>

      <!-- 8. High Pressure Compressor (HPC - 5 stages on N2) -->
      <g stroke="#cbd5e1" stroke-width="2" stroke-linecap="round">
        <line x1="210" y1="125" x2="211" y2="160"/>
        <line x1="210" y1="215" x2="211" y2="180"/>
        <line x1="225" y1="128" x2="226" y2="160"/>
        <line x1="225" y1="212" x2="226" y2="180"/>
        <line x1="240" y1="131" x2="241" y2="160"/>
        <line x1="240" y1="209" x2="241" y2="180"/>
        <line x1="255" y1="134" x2="256" y2="160"/>
        <line x1="255" y1="206" x2="256" y2="180"/>
        <line x1="270" y1="137" x2="271" y2="160"/>
        <line x1="270" y1="203" x2="271" y2="180"/>
      </g>

      <!-- 9. Annular Combustion Chamber (Combustor & Fuel Injectors) -->
      <rect x="290" y="125" width="55" height="25" rx="5" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
      <rect x="295" y="129" width="${flameLen}" height="17" rx="3" fill="url(#combustor-flame)" opacity="${flameIntensity}"/>
      <rect x="290" y="190" width="55" height="25" rx="5" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
      <rect x="295" y="194" width="${flameLen}" height="17" rx="3" fill="url(#combustor-flame)" opacity="${flameIntensity}"/>
      
      <line x1="285" y1="137" x2="295" y2="137" stroke="#ef4444" stroke-width="3"/>
      <line x1="285" y1="202" x2="295" y2="202" stroke="#ef4444" stroke-width="3"/>

      <!-- 10. High Pressure Turbine (HPT on N2) -->
      <g stroke="#f97316" stroke-width="3" stroke-linecap="round">
        <line x1="365" y1="125" x2="366" y2="160"/>
        <line x1="365" y1="215" x2="366" y2="180"/>
      </g>

      <!-- 11. Low Pressure Turbine (LPT on N1) -->
      <g stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round">
        <line x1="390" y1="120" x2="391" y2="160"/>
        <line x1="390" y1="220" x2="391" y2="180"/>
        <line x1="410" y1="115" x2="411" y2="160"/>
        <line x1="410" y1="225" x2="411" y2="180"/>
        <line x1="430" y1="110" x2="431" y2="160"/>
        <line x1="430" y1="230" x2="431" y2="180"/>
      </g>

      <!-- 12. Exhaust Cone & Core Jet Nozzle Plume -->
      <polygon points="490,150 490,190 ${490 + corePlumeLen},170" fill="url(#exhaust-plume)"/>
      <path d="M 455 160 L 515 170 L 455 180 Z" fill="#334155"/>

      <!-- Bypass Exhaust stream plumes (Top & Bottom exits) -->
      <polygon points="360,50 360,70 ${360 + bypassVectorLen * 1.5},60" fill="#38bdf8" opacity="0.3"/>
      <polygon points="360,270 360,290 ${360 + bypassVectorLen * 1.5},280" fill="#38bdf8" opacity="0.3"/>

      <!-- 13. Component Labels / Callouts -->
      <g font-size="11" font-weight="700">
        <text x="95" y="24" fill="#38bdf8">Ֆեն (Fan N₁)</text>
        <line x1="120" y1="27" x2="120" y2="48" stroke="#38bdf8" stroke-width="1.5"/>
        <text x="210" y="22" fill="#7dd3fc">Շրջանցիկ Կոնտուր (Bypass ${bypassRatio}:1)</text>
        <text x="280" y="115" fill="#f97316">Այրման Խցիկ (${titC}°C)</text>
        <text x="380" y="102" fill="#cbd5e1">Տուրբիններ (HPT/LPT)</text>
      </g>

      <!-- 14. Live Force Vectors Overlay -->
      ${
        showVectors
          ? `
        <!-- Bypass Thrust Vector (Top) -->
        <g stroke="#38bdf8" stroke-width="3" fill="#38bdf8">
          <line x1="375" y1="60" x2="${375 + bypassVectorLen}" y2="60"/>
          <polygon points="${375 + bypassVectorLen + 8},60 ${375 + bypassVectorLen},55 ${375 + bypassVectorLen},65"/>
          <text x="${390 + bypassVectorLen}" y="64" font-size="11" font-weight="700" fill="#7dd3fc">F_շրջ (${thrustBypassKn} կՆ)</text>
        </g>
        <!-- Bypass Thrust Vector (Bottom) -->
        <g stroke="#38bdf8" stroke-width="3" fill="#38bdf8">
          <line x1="375" y1="280" x2="${375 + bypassVectorLen}" y2="280"/>
          <polygon points="${375 + bypassVectorLen + 8},280 ${375 + bypassVectorLen},275 ${375 + bypassVectorLen},285"/>
          <text x="${390 + bypassVectorLen}" y="284" font-size="11" font-weight="700" fill="#7dd3fc">F_շրջ (${thrustBypassKn} կՆ)</text>
        </g>
        <!-- Core Jet Thrust Vector (Center) -->
        <g stroke="#f97316" stroke-width="3" fill="#f97316">
          <line x1="520" y1="170" x2="${520 + coreVectorLen}" y2="170"/>
          <polygon points="${520 + coreVectorLen + 8},170 ${520 + coreVectorLen},165 ${520 + coreVectorLen},175"/>
          <text x="${535 + coreVectorLen}" y="174" font-size="11" font-weight="700" fill="#fb923c">F_կորիզ (${thrustCoreKn} կՆ)</text>
        </g>
        `
          : ''
      }

      <!-- Bottom Status Pill -->
      <g transform="translate(25, 290)">
        <rect width="250" height="34" rx="8" fill="#0f172a" fill-opacity="0.9" stroke="#334155" stroke-width="1.5"/>
        <text x="12" y="21" font-size="12" font-weight="700" fill="#22c55e">
          ✓ Շրջանցման Բաժին՝ ${bypassThrustPercent}%
        </text>
        <text x="175" y="21" font-size="11" font-weight="600" fill="#94a3b8">
          N₁: ${fanRpmPct}% | N₂: ${coreRpmPct}%
        </text>
      </g>
    </svg>
  `;
}

/**
 * TAB: Newton's Orbital Cannonball & Keplerian Satellite Simulator
 * Renders Earth globe, atmospheric glow, mountain launcher, orbital trajectories,
 * and live centripetal gravity vs tangential velocity vectors.
 */
export function orbitCannonArt({
  launchAltitudeKm = 400,
  horizontalVelocityKms = 7.67,
  orbitModel,
  showVectors = true,
} = {}) {
  const m = orbitModel || {};
  const status = m.status || 'circular';
  const v0 = horizontalVelocityKms || 7.67;
  const v1 = m.v1Kms || 7.67;
  const vEsc = m.vEscKms || 10.85;

  // Scale: Earth radius R_E = 6371 km -> 105 px
  const rEarth = 105;
  const scale = rEarth / 6371; // px per km
  const r0 = rEarth + Math.min(1800, launchAltitudeKm) * scale;

  // Earth center in SVG
  const cx = 300;
  const cy = 250;

  // Trajectory points string
  let pathD = '';
  if (m.trajectoryPoints && m.trajectoryPoints.length > 1) {
    const pts = m.trajectoryPoints.map((pt, idx) => {
      const px = cx + pt.x * scale;
      const py = cy + pt.y * scale;
      return `${idx === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)}`;
    });
    if (m.isStableOrbit && status !== 'hyperbolic' && status !== 'parabolic') {
      pts.push('Z');
    }
    pathD = pts.join(' ');
  } else {
    // Fallback circular path
    pathD = `M ${cx} ${cy - r0} A ${r0} ${r0} 0 1 0 ${cx} ${cy + r0} A ${r0} ${r0} 0 1 0 ${cx} ${cy - r0} Z`;
  }

  // Trajectory stroke styling
  let orbitColor = '#22c55e'; // Green for circular LEO
  let orbitGlow = 'rgba(34, 197, 94, 0.4)';
  let statusBadgeBg = '#14532d';
  let statusBadgeText = '#86efac';
  let statusLabel = '✓ Կայուն Շրջանաձև Ուղեծիր (1-ին տիեզերական)';

  if (status === 'suborbital_crash') {
    orbitColor = '#ef4444';
    orbitGlow = 'rgba(239, 68, 68, 0.4)';
    statusBadgeBg = '#7f1d1d';
    statusBadgeText = '#fca5a5';
    statusLabel = '⚠️ Ենթաուղեծրային Բալիստիկ Անկում (v < v₁)';
  } else if (status === 'elliptic') {
    orbitColor = '#f59e0b';
    orbitGlow = 'rgba(245, 158, 11, 0.4)';
    statusBadgeBg = '#78350f';
    statusBadgeText = '#fde68a';
    statusLabel = '⬭ Էլիպսաձև Կեպլերյան Ուղեծիր (Կայուն)';
  } else if (status === 'parabolic' || status === 'hyperbolic') {
    orbitColor = '#c084fc';
    orbitGlow = 'rgba(192, 132, 252, 0.4)';
    statusBadgeBg = '#581c87';
    statusBadgeText = '#e9d5ff';
    statusLabel = '🌌 Խույսի Հետագիծ (2-րդ տիեզերական / Հեռացում)';
  }

  // Velocity vector length (px)
  const vLen = Math.min(90, Math.max(25, v0 * 6.5));
  // Gravity vector length (px)
  const gLen = Math.min(55, Math.max(20, (m.gravityAtAlt || 8.7) * 4.5));

  // Satellite position (at launch apoapsis/periapsis on top)
  const satX = cx;
  const satY = cy - r0;

  return `
    <svg viewBox="0 0 600 440" class="orbit-simulator-svg" aria-label="Նյուտոնի ուղեծրային թնդանոթ և Երկիր">
      <defs>
        <!-- Deep Space Canvas Gradient -->
        <radialGradient id="space-bg" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#0a1122"/>
          <stop offset="100%" stop-color="#040711"/>
        </radialGradient>
        <!-- Earth Radial Ocean Gradient -->
        <radialGradient id="earth-ocean" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#1d4ed8"/>
          <stop offset="50%" stop-color="#1e3a8a"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </radialGradient>
        <!-- Atmosphere Glow Filter -->
        <filter id="atmo-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6"/>
        </filter>
        <filter id="orbit-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3"/>
        </filter>
      </defs>

      <!-- Space Background -->
      <rect width="600" height="440" rx="14" fill="url(#space-bg)"/>

      <!-- Distant Stars -->
      <g fill="#ffffff" opacity="0.35">
        <circle cx="45" cy="40" r="1"/>
        <circle cx="120" cy="85" r="1.5"/>
        <circle cx="210" cy="35" r="1"/>
        <circle cx="510" cy="65" r="1.5"/>
        <circle cx="560" cy="140" r="1"/>
        <circle cx="80" cy="380" r="1"/>
        <circle cx="530" cy="390" r="1.5"/>
        <circle cx="480" cy="320" r="1"/>
        <circle cx="35" cy="220" r="1.2"/>
        <circle cx="560" cy="270" r="1"/>
      </g>

      <!-- Circular LEO Reference Ring (Subtle Dashed) -->
      <circle cx="${cx}" cy="${cy}" r="${rEarth + 400 * scale}" fill="none" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="4 4" opacity="0.3"/>

      <!-- Atmospheric Haze Ring (Kármán line 100km) -->
      <circle cx="${cx}" cy="${cy}" r="${rEarth + 100 * scale}" fill="none" stroke="#38bdf8" stroke-width="3" opacity="0.5" filter="url(#atmo-glow)"/>

      <!-- Actual Orbital Trajectory Path (Glow underlayer + Crisp curve) -->
      ${
        pathD
          ? `
        <path d="${pathD}" fill="none" stroke="${orbitColor}" stroke-width="6" opacity="0.4" filter="url(#orbit-glow-filter)"/>
        <path d="${pathD}" fill="none" stroke="${orbitColor}" stroke-width="2.5" stroke-dasharray="${status === 'circular' ? 'none' : '6 3'}"/>
      `
          : ''
      }

      <!-- Earth Globe -->
      <g id="earth-globe">
        <!-- Ocean Base -->
        <circle cx="${cx}" cy="${cy}" r="${rEarth}" fill="url(#earth-ocean)" stroke="#60a5fa" stroke-width="1.5"/>
        
        <!-- Continents (Curved stylized landmasses) -->
        <path d="M ${cx - 60} ${cy - 40} C ${cx - 30} ${cy - 70}, ${cx + 20} ${cy - 60}, ${cx + 40} ${cy - 30} C ${cx + 50} ${cy}, ${cx + 10} ${cy + 30}, ${cx - 20} ${cy + 15} C ${cx - 50} ${cy + 10}, ${cx - 70} ${cy - 10}, ${cx - 60} ${cy - 40} Z" fill="#15803d" opacity="0.85"/>
        <path d="M ${cx + 10} ${cy + 25} C ${cx + 35} ${cy + 15}, ${cx + 65} ${cy + 35}, ${cx + 55} ${cy + 75} C ${cx + 35} ${cy + 85}, ${cx + 15} ${cy + 60}, ${cx + 10} ${cy + 25} Z" fill="#166534" opacity="0.85"/>
        <path d="M ${cx - 75} ${cy + 10} C ${cx - 45} ${cy + 20}, ${cx - 35} ${cy + 60}, ${cx - 60} ${cy + 70} C ${cx - 80} ${cy + 60}, ${cx - 85} ${cy + 30}, ${cx - 75} ${cy + 10} Z" fill="#15803d" opacity="0.8"/>
        
        <!-- Polar Ice Caps -->
        <ellipse cx="${cx}" cy="${cy - rEarth + 6}" rx="32" ry="8" fill="#f8fafc" opacity="0.9"/>
        <ellipse cx="${cx}" cy="${cy + rEarth - 6}" rx="28" ry="7" fill="#f8fafc" opacity="0.9"/>

        <!-- Earth Radius Label -->
        <line x1="${cx}" y1="${cy}" x2="${cx + rEarth}" y2="${cy}" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3 3"/>
        <text x="${cx + 35}" y="${cy - 6}" font-size="10" font-weight="700" fill="#93c5fd">R_E = 6,371 կմ</text>
        <circle cx="${cx}" cy="${cy}" r="3.5" fill="#38bdf8"/>
      </g>

      <!-- Launch Mountain / Orbital Station Tower -->
      <g id="launch-tower">
        <polygon points="${cx - 7},${cy - rEarth} ${cx + 7},${cy - rEarth} ${cx},${satY}" fill="#64748b" stroke="#334155" stroke-width="1.2"/>
        <rect x="${cx - 4}" y="${satY - 3}" width="8" height="6" rx="2" fill="#38bdf8"/>
        <!-- Tower Height Indicator -->
        <text x="${cx - 14}" y="${(cy - rEarth + satY) / 2 + 3}" font-size="9" font-weight="700" fill="#cbd5e1" text-anchor="end">h = ${launchAltitudeKm} կմ</text>
      </g>

      <!-- Satellite at Orbital Launch Point (satX, satY) -->
      <g transform="translate(${satX}, ${satY})">
        <!-- Satellite Main Bus -->
        <rect x="-8" y="-6" width="16" height="12" rx="3" fill="#e2e8f0" stroke="#0f172a" stroke-width="1.5"/>
        <!-- Solar Panels (Left & Right) -->
        <rect x="-26" y="-5" width="16" height="10" rx="1.5" fill="#0284c7" stroke="#38bdf8" stroke-width="1"/>
        <line x1="-18" y1="-5" x2="-18" y2="5" stroke="#bae6fd" stroke-width="0.8"/>
        <rect x="10" y="-5" width="16" height="10" rx="1.5" fill="#0284c7" stroke="#38bdf8" stroke-width="1"/>
        <line x1="18" y1="-5" x2="18" y2="5" stroke="#bae6fd" stroke-width="0.8"/>
        <circle cx="0" cy="0" r="2.5" fill="#22c55e"/>
      </g>

      <!-- Live Dynamic Vectors Overlay -->
      ${
        showVectors
          ? `
        <!-- Tangential Velocity Vector (Horizontal, Cyan/Green) -->
        <g stroke="${orbitColor}" stroke-width="3" fill="${orbitColor}">
          <line x1="${satX}" y1="${satY}" x2="${satX + vLen}" y2="${satY}"/>
          <polygon points="${satX + vLen + 7},${satY} ${satX + vLen},${satY - 4.5} ${satX + vLen},${satY + 4.5}"/>
          <text x="${satX + vLen + 12}" y="${satY - 6}" font-size="11" font-weight="700" fill="${orbitColor}">
            v₀ = ${v0} կմ/վ (Հորիզոնական արագություն)
          </text>
        </g>

        <!-- Gravitational Centripetal Acceleration Vector (Points to Earth Center, Red) -->
        <g stroke="#ef4444" stroke-width="3" fill="#ef4444">
          <line x1="${satX}" y1="${satY}" x2="${satX}" y2="${satY + gLen}"/>
          <polygon points="${satX},${satY + gLen + 7} ${satX - 4.5},${satY + gLen} ${satX + 4.5},${satY + gLen}"/>
          <text x="${satX + 8}" y="${satY + gLen / 2 + 4}" font-size="11" font-weight="700" fill="#fca5a5">
            g = ${m.gravityAtAlt || 8.7} մ/վ² (Ազատ անկում)
          </text>
        </g>
      `
          : ''
      }

      <!-- Apoapsis / Periapsis Markers if Elliptic -->
      ${
        status === 'elliptic'
          ? `
        <g transform="translate(25, 60)">
          <rect width="180" height="48" rx="8" fill="#1e293b" fill-opacity="0.9" stroke="#f59e0b" stroke-width="1.5"/>
          <text x="10" y="20" font-size="11" font-weight="700" fill="#fde68a">Ապոգեյ (h_a)՝ ${m.apoapsisKm} կմ</text>
          <text x="10" y="38" font-size="11" font-weight="700" fill="#93c5fd">Պերիգեյ (h_p)՝ ${m.periapsisKm} կմ</text>
        </g>
      `
          : ''
      }

      <!-- Top Status Banner Pill -->
      <g transform="translate(20, 18)">
        <rect width="360" height="34" rx="8" fill="${statusBadgeBg}" fill-opacity="0.92" stroke="${orbitColor}" stroke-width="1.5"/>
        <text x="14" y="22" font-size="12" font-weight="700" fill="${statusBadgeText}">
          ${statusLabel}
        </text>
      </g>

      <!-- Bottom Right Telemetry Box -->
      <g transform="translate(380, 360)">
        <rect width="200" height="64" rx="8" fill="#0f172a" fill-opacity="0.92" stroke="#334155" stroke-width="1.5"/>
        <text x="12" y="20" font-size="11" font-weight="700" fill="#38bdf8">1-ին տիեզերական v₁՝ ${v1} կմ/վ</text>
        <text x="12" y="38" font-size="11" font-weight="700" fill="#c084fc">2-րդ տիեզերական v_esc՝ ${vEsc} կմ/վ</text>
        <text x="12" y="54" font-size="10" font-weight="600" fill="#94a3b8">
          Պարբերություն T՝ ${m.periodMin ? m.periodMin + ' րոպե' : 'Անվերջ / Անկում'}
        </text>
      </g>
    </svg>
  `;
}

/**
 * TAB: Helicopter Swashplate & Rotor Aerodynamics
 * Renders main rotor mast, swashplate assembly (rotating and stationary plates),
 * dynamic blade pitch angle, tail boom anti-torque, and lift/thrust decomposition.
 */
export function helicopterSwashplateArt({
  colPitchDeg = 11,
  tiltForwardDeg = 0,
  tiltRollDeg = 0,
  mainTorqueNm = 4200,
  tailAntiTorqueNm = 4200,
  netYawTorqueNm = 0,
  yawState = 'balanced',
  isHover = true,
  flightState = 'hover',
  totalThrustKn = 20.16,
  verticalLiftKn = 20.16,
  forwardThrustKn = 0,
  showVectors = true,
} = {}) {
  // Swashplate vertical displacement (collective): 0 to 20 px
  const swashplateY = 200 - (colPitchDeg - 4) * 1.5;
  // Swashplate tilt angle (degrees): cyclic forward tilt
  const swashplateAngle = -tiltForwardDeg; // negative tilts forward

  // Rotor blade tilt angle
  const bladeAngle = colPitchDeg;

  // Lift and forward propulsion vectors
  const liftLen = Math.min(85, Math.max(15, verticalLiftKn * 3.8));
  const fwdLen = Math.min(65, Math.abs(forwardThrustKn) * 12);

  // Status colors
  let yawColor = '#22c55e';
  let yawLabel = '✓ Կայուն Կուրս (Հակապտտող մոմենտը հավասարակշռված է)';
  if (yawState === 'yaw_left') {
    yawColor = '#ef4444';
    yawLabel = '⚠️ Պոչային հակամոմենտը թույլ է → Անկառավարելի պտույտ ձախ';
  } else if (yawState === 'yaw_right') {
    yawColor = '#f59e0b';
    yawLabel = '⚠️ Պոչային հակամոմենտը ավելցուկային է → Պտույտ աջ';
  }

  return `
    <svg viewBox="0 0 600 380" class="helicopter-simulator-svg" aria-label="Ուղղաթիռի լիցքաթիթեղ և ռոտորի աերոդինամիկա">
      <defs>
        <linearGradient id="heli-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#f8fafc"/>
          <stop offset="100%" stop-color="#e2e8f0"/>
        </linearGradient>
        <linearGradient id="mast-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#64748b"/>
          <stop offset="50%" stop-color="#94a3b8"/>
          <stop offset="100%" stop-color="#475569"/>
        </linearGradient>
        <linearGradient id="blade-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#1e293b"/>
          <stop offset="50%" stop-color="#334155"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
      </defs>

      <!-- Background Box -->
      <rect width="600" height="380" rx="14" fill="url(#heli-bg)" stroke="#cbd5e1" stroke-width="2"/>

      <!-- Tail Boom & Tail Rotor Silhouette (Right Side) -->
      <g id="tail-section" transform="translate(360, 250)">
        <!-- Tail Boom Tube -->
        <polygon points="0,0 180,-15 180,-5 0,15" fill="#475569"/>
        <!-- Vertical Stabilizer Fin -->
        <polygon points="170,-45 195,-55 190,15 170,10" fill="#334155"/>
        <!-- Tail Rotor Hub & Blades -->
        <circle cx="185" cy="-20" r="6" fill="#f97316"/>
        <line x1="185" y1="-50" x2="185" y2="10" stroke="#f97316" stroke-width="4" stroke-linecap="round"/>
        <!-- Tail Rotor Anti-Torque Thrust Arrow -->
        <g stroke="#06b6d4" stroke-width="3" fill="#06b6d4">
          <line x1="185" y1="-20" x2="185" y2="-70"/>
          <polygon points="185,-78 180,-70 190,-70"/>
          <text x="140" y="-82" font-size="11" font-weight="700" fill="#0891b2">F_պոչ (${tailAntiTorqueNm} Ն·մ)</text>
        </g>
      </g>

      <!-- Main Helicopter Fuselage Base -->
      <g id="fuselage" transform="translate(180, 240)">
        <!-- Cabin Silhouette -->
        <path d="M 0 35 C -40 35, -70 10, -70 -20 C -70 -45, -30 -50, 20 -50 C 90 -50, 180 -15, 180 15 C 180 35, 120 35, 0 35 Z" fill="#334155"/>
        <!-- Cockpit Glass Window -->
        <path d="M -20 -45 C -55 -40, -65 -25, -65 -15 C -45 -15, -10 -25, 0 -45 Z" fill="#38bdf8" opacity="0.8"/>
        <!-- Landing Skids -->
        <line x1="-50" y1="45" x2="140" y2="45" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/>
        <line x1="-20" y1="35" x2="-30" y2="45" stroke="#1e293b" stroke-width="3"/>
        <line x1="80" y1="35" x2="70" y2="45" stroke="#1e293b" stroke-width="3"/>
      </g>

      <!-- Main Rotor Mast (Vertical Steel Shaft) -->
      <rect x="232" y="90" width="16" height="150" fill="url(#mast-grad)" stroke="#334155" stroke-width="1.5"/>

      <!-- Main Rotor Torque Reaction Spiral (Orange Arrow) -->
      <g stroke="#f97316" stroke-width="2.5" fill="none">
        <path d="M 220 220 C 210 230, 270 235, 260 215" stroke-dasharray="4 2"/>
        <polygon points="262,210 256,218 266,217" fill="#f97316"/>
        <text x="272" y="225" font-size="10" font-weight="700" fill="#ea580c">τ_ռեակցիա (${mainTorqueNm} Ն·մ)</text>
      </g>

      <!-- Swashplate Assembly (Լիցքաթիթեղ) -->
      <g id="swashplate-assembly" transform="translate(240, ${swashplateY}) rotate(${swashplateAngle})">
        <!-- Lower Fixed (Stationary) Swashplate -->
        <rect x="-36" y="10" width="72" height="10" rx="4" fill="#64748b" stroke="#334155" stroke-width="1.5"/>
        <text x="42" y="18" font-size="9" font-weight="700" fill="#475569">Անշարժ սկավառակ</text>
        
        <!-- Ball Bearing Divider -->
        <circle cx="-20" cy="8" r="2.5" fill="#e2e8f0"/>
        <circle cx="0" cy="8" r="2.5" fill="#e2e8f0"/>
        <circle cx="20" cy="8" r="2.5" fill="#e2e8f0"/>

        <!-- Upper Rotating Swashplate -->
        <rect x="-38" y="-2" width="76" height="9" rx="3.5" fill="#0284c7" stroke="#0369a1" stroke-width="1.5"/>
        <text x="42" y="5" font-size="9" font-weight="700" fill="#0284c7">Պտտվող սկավառակ</text>

        <!-- Pushrod Links up to Rotor Head -->
        <line x1="-28" y1="-2" x2="-28" y2="-50" stroke="#0284c7" stroke-width="3" stroke-linecap="round"/>
        <line x1="28" y1="-2" x2="28" y2="-50" stroke="#0284c7" stroke-width="3" stroke-linecap="round"/>
      </g>

      <!-- Rotor Head & Blade Grips at Mast Top (240, 90) -->
      <g id="rotor-head" transform="translate(240, 90) rotate(${swashplateAngle})">
        <circle cx="0" cy="0" r="12" fill="#1e293b" stroke="#0f172a" stroke-width="2"/>
        
        <!-- Left Blade (Advancing Blade) -->
        <g transform="translate(-12, 0) rotate(${bladeAngle})">
          <polygon points="0,-4 -190,-7 -190,7 0,4" fill="url(#blade-grad)" stroke="#0f172a" stroke-width="1.5"/>
          <line x1="-185" y1="0" x2="-5" y2="0" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4 3"/>
          <text x="-150" y="-12" font-size="10" font-weight="700" fill="#1e293b">Թիակ 1 (Առաջընթաց)</text>
        </g>

        <!-- Right Blade (Retreating Blade) -->
        <g transform="translate(12, 0) rotate(${-bladeAngle})">
          <polygon points="0,-4 190,-7 190,7 0,4" fill="url(#blade-grad)" stroke="#0f172a" stroke-width="1.5"/>
          <line x1="5" y1="0" x2="185" y2="0" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4 3"/>
          <text x="90" y="-12" font-size="10" font-weight="700" fill="#1e293b">Թիակ 2 (Հետընթաց)</text>
        </g>
      </g>

      <!-- Live Force Vectors at Rotor Hub (240, 90) -->
      ${
        showVectors
          ? `
        <!-- Vertical Lift Vector (Green) -->
        <g stroke="#22c55e" stroke-width="3.5" fill="#22c55e">
          <line x1="240" y1="90" x2="240" y2="${90 - liftLen}"/>
          <polygon points="240,${90 - liftLen - 8} 234,${90 - liftLen} 246,${90 - liftLen}"/>
          <text x="248" y="${90 - liftLen / 2}" font-size="11" font-weight="700" fill="#15803d">
            L_վերամբարձ = ${verticalLiftKn} կՆ
          </text>
        </g>

        <!-- Forward Propulsion Vector (Cyan, if cyclic tilt active) -->
        ${
          fwdLen > 4
            ? `
          <g stroke="#0284c7" stroke-width="3" fill="#0284c7">
            <line x1="240" y1="90" x2="${240 - forwardThrustKn * 10}" y2="90"/>
            <polygon points="${240 - forwardThrustKn * 10 - 7},90 ${240 - forwardThrustKn * 10},85 ${240 - forwardThrustKn * 10},95"/>
            <text x="${240 - forwardThrustKn * 10 - 15}" y="82" font-size="11" font-weight="700" fill="#0284c7" text-anchor="end">
              T_առաջ = ${forwardThrustKn} կՆ
            </text>
          </g>
        `
            : ''
        }
      `
          : ''
      }

      <!-- Top Status Banner Pill -->
      <g transform="translate(20, 20)">
        <rect width="360" height="34" rx="8" fill="#0f172a" fill-opacity="0.9" stroke="${yawColor}" stroke-width="1.5"/>
        <text x="14" y="22" font-size="12" font-weight="700" fill="${yawColor}">
          ${yawLabel}
        </text>
      </g>

      <!-- Bottom Swashplate Callout -->
      <g transform="translate(20, 320)">
        <rect width="320" height="42" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="12" y="18" font-size="11" font-weight="700" fill="#0f172a">
          ⚙️ Լիցքաթիթեղ (Swashplate)՝
        </text>
        <text x="12" y="34" font-size="10" font-weight="600" fill="#64748b">
          Կոլեկտիվ քայլ՝ ${colPitchDeg}° | Ցիկլիկ թեքում՝ ${tiltForwardDeg}°
        </text>
      </g>
    </svg>
  `;
}

/**
 * Ion Space Thruster & Deep Space Continuous Spiral Artwork
 */
export function ionThrusterArt({
  beamVoltageV = 1500,
  beamCurrentA = 1.8,
  propellant = 'xenon',
  thrustMilliN = 128,
  specificImpulseSec = 4788,
  exhaustVelocityKms = 46.95,
  beamPowerKw = 2.7,
  showVectors = true,
} = {}) {
  const PROPELLANT_COLORS = {
    xenon: { primary: '#38bdf8', secondary: '#818cf8', plasma: '#a855f7' },
    krypton: { primary: '#4ade80', secondary: '#2dd4bf', plasma: '#34d399' },
    argon: { primary: '#c084fc', secondary: '#e879f9', plasma: '#d946ef' },
    iodine: { primary: '#f43f5e', secondary: '#fb7185', plasma: '#e11d48' },
  };
  const colors = PROPELLANT_COLORS[propellant] || PROPELLANT_COLORS.xenon;
  const beamIntensity = Math.min(1, Math.max(0.3, beamCurrentA / 3.0));
  const plumeLength = Math.min(220, Math.max(80, 100 + (beamVoltageV - 1000) * 0.05));

  return `
    <svg viewBox="0 0 680 380" class="aerolab-art ion-art" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Իոնային շարժիչ և տիեզերական պարուրաձև ուղեծիր">
      <defs>
        <!-- Deep Space Background Gradient -->
        <radialGradient id="space-bg" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#0b132b"/>
          <stop offset="60%" stop-color="#050a18"/>
          <stop offset="100%" stop-color="#020617"/>
        </radialGradient>

        <!-- Ion Plume Gradient -->
        <linearGradient id="ion-plume-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${colors.primary}" stop-opacity="${0.95 * beamIntensity}"/>
          <stop offset="40%" stop-color="${colors.secondary}" stop-opacity="${0.75 * beamIntensity}"/>
          <stop offset="85%" stop-color="${colors.plasma}" stop-opacity="${0.35 * beamIntensity}"/>
          <stop offset="100%" stop-color="${colors.primary}" stop-opacity="0"/>
        </linearGradient>

        <!-- Plasma Glow in Chamber -->
        <radialGradient id="plasma-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
          <stop offset="30%" stop-color="${colors.primary}" stop-opacity="0.8"/>
          <stop offset="70%" stop-color="${colors.plasma}" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0"/>
        </radialGradient>

        <!-- Metallic Grid Shader -->
        <linearGradient id="metal-chassis" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#64748b"/>
          <stop offset="30%" stop-color="#334155"/>
          <stop offset="70%" stop-color="#1e293b"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>

        <!-- Solar Panel Cell Pattern -->
        <pattern id="solar-grid" width="12" height="10" patternUnits="userSpaceOnUse">
          <rect width="12" height="10" fill="#1e3a8a" stroke="#3b82f6" stroke-width="0.8"/>
          <line x1="0" y1="5" x2="12" y2="5" stroke="#60a5fa" stroke-width="0.5"/>
        </pattern>
      </defs>

      <!-- Background with Stars -->
      <rect width="680" height="380" fill="url(#space-bg)"/>
      <g fill="#94a3b8" opacity="0.6">
        <circle cx="45" cy="35" r="1.2"/>
        <circle cx="120" cy="70" r="0.8"/>
        <circle cx="210" cy="25" r="1.5"/>
        <circle cx="340" cy="65" r="1.0"/>
        <circle cx="450" cy="40" r="1.2"/>
        <circle cx="560" cy="85" r="1.0"/>
        <circle cx="630" cy="30" r="1.4"/>
        <circle cx="90" cy="340" r="1.0"/>
        <circle cx="230" cy="360" r="1.2"/>
        <circle cx="480" cy="350" r="0.8"/>
        <circle cx="620" cy="320" r="1.3"/>
      </g>

      <!-- Left Section: Cutaway Schematic of Ion Thruster -->
      <g id="thruster-schematic" transform="translate(40, 180)">
        <!-- Spacecraft Body / Avionics Hull -->
        <polygon points="-30,-85 30,-85 30,85 -30,85 -40,60 -40,-60" fill="url(#metal-chassis)" stroke="#475569" stroke-width="2"/>
        <text x="-25" y="-92" font-size="10" font-weight="700" fill="#94a3b8">Տիեզերանավի Կորպուս</text>

        <!-- Solar Array Wing (Top Left) -->
        <rect x="-35" y="-140" width="85" height="45" rx="3" fill="url(#solar-grid)" stroke="#60a5fa" stroke-width="1.5"/>
        <line x1="5" y1="-95" x2="5" y2="-85" stroke="#94a3b8" stroke-width="3"/>
        <text x="7" y="-120" font-size="9" font-weight="700" fill="#93c5fd" text-anchor="middle">Արևային Մարտկոց</text>

        <!-- Xenon Propellant Tank (Spherical COPV) -->
        <circle cx="0" cy="0" r="26" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
        <path d="M -18 -18 C -5 -30, 20 -20, 22 5" fill="none" stroke="#38bdf8" stroke-width="1.5" opacity="0.6"/>
        <text x="0" y="4" font-size="9" font-weight="700" fill="#e0f2fe" text-anchor="middle">${propellant.toUpperCase()}</text>
        <text x="0" y="15" font-size="8" font-weight="600" fill="#7dd3fc" text-anchor="middle">Բալոն</text>

        <!-- Propellant Feed Line & Valve -->
        <path d="M 26 0 L 50 0" stroke="#0284c7" stroke-width="3" fill="none"/>
        <polygon points="40,-4 46,0 40,4" fill="#38bdf8"/>

        <!-- Ionization Discharge Chamber -->
        <path d="M 50,-50 L 125,-50 L 125,50 L 50,50 Z" fill="#0f172a" stroke="#64748b" stroke-width="2"/>
        
        <!-- Permanent Ring Magnets (Cusp Magnetic Confinement) -->
        <rect x="52" y="-48" width="10" height="8" rx="2" fill="#ef4444"/>
        <rect x="80" y="-48" width="10" height="8" rx="2" fill="#3b82f6"/>
        <rect x="108" y="-48" width="10" height="8" rx="2" fill="#ef4444"/>
        <rect x="52" y="40" width="10" height="8" rx="2" fill="#ef4444"/>
        <rect x="80" y="40" width="10" height="8" rx="2" fill="#3b82f6"/>
        <rect x="108" y="40" width="10" height="8" rx="2" fill="#ef4444"/>

        <!-- Plasma Glow Inside Chamber -->
        <ellipse cx="88" cy="0" rx="32" ry="38" fill="url(#plasma-core)"/>
        
        <!-- Ions (Xe+) and Electrons (e-) floating in plasma -->
        <g font-size="9" font-weight="800">
          <text x="70" y="-12" fill="#38bdf8">${propellant === 'xenon' ? 'Xe⁺' : 'Ion⁺'}</text>
          <text x="95" y="15" fill="#38bdf8">${propellant === 'xenon' ? 'Xe⁺' : 'Ion⁺'}</text>
          <text x="80" y="28" fill="#fbbf24">e⁻</text>
          <text x="100" y="-18" fill="#fbbf24">e⁻</text>
        </g>

        <!-- Electrostatic Accelerator Grids (Screen Grid & Accel Grid) -->
        <!-- Screen Grid (+1500V) -->
        <line x1="126" y1="-48" x2="126" y2="48" stroke="#38bdf8" stroke-width="3" stroke-dasharray="4 2"/>
        <text x="126" y="-55" font-size="8" font-weight="700" fill="#38bdf8" text-anchor="middle">+${beamVoltageV}V</text>
        <text x="126" y="-65" font-size="8" font-weight="700" fill="#94a3b8" text-anchor="middle">Էկրանային ցանց</text>

        <!-- Accelerator Grid (-300V) -->
        <line x1="133" y1="-48" x2="133" y2="48" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="4 2"/>
        <text x="133" y="60" font-size="8" font-weight="700" fill="#ef4444" text-anchor="middle">-300V</text>
        <text x="133" y="70" font-size="8" font-weight="700" fill="#94a3b8" text-anchor="middle">Արագացնող ցանց</text>

        <!-- High-Velocity Ion Plume Ejection -->
        <path d="M 134,-44 Q ${134 + plumeLength * 0.6} -65 ${134 + plumeLength} -75 L ${134 + plumeLength} 75 Q ${134 + plumeLength * 0.6} 65 134 44 Z" fill="url(#ion-plume-grad)"/>

        <!-- Fast Ion Streamers -->
        <g stroke="${colors.primary}" stroke-width="1.8" opacity="0.8">
          <line x1="135" y1="-25" x2="${135 + plumeLength * 0.9}" y2="-38" stroke-dasharray="10 4"/>
          <line x1="135" y1="0" x2="${135 + plumeLength}" y2="0" stroke-dasharray="12 4"/>
          <line x1="135" y1="25" x2="${135 + plumeLength * 0.9}" y2="38" stroke-dasharray="10 4"/>
        </g>

        <!-- Hollow Cathode Neutralizer (spraying electrons into plume) -->
        <g id="neutralizer" transform="translate(142, -58)">
          <rect x="0" y="0" width="14" height="8" rx="2" fill="#e2e8f0" stroke="#475569" stroke-width="1"/>
          <!-- Electron spray path -->
          <path d="M 14 4 Q 30 10 45 28" fill="none" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="2 2"/>
          <circle cx="45" cy="28" r="2" fill="#fbbf24"/>
          <text x="20" y="-6" font-size="8" font-weight="700" fill="#fbbf24">Չեզոքացուցիչ (e⁻)</text>
        </g>

        <!-- Live Force Vectors -->
        ${
          showVectors
            ? `
          <!-- Exhaust Ion Thrust Vector (Right, blue) -->
          <g stroke="${colors.primary}" stroke-width="2.5" fill="${colors.primary}">
            <line x1="135" y1="0" x2="${135 + 85}" y2="0"/>
            <polygon points="${135 + 92},0 ${135 + 83},-5 ${135 + 83},5"/>
            <text x="${135 + 96}" y="-8" font-size="10" font-weight="700" fill="${colors.primary}">v_e = ${exhaustVelocityKms} կմ/վ</text>
          </g>

          <!-- Reaction Thrust on Spacecraft (Left, orange) -->
          <g stroke="#f97316" stroke-width="3" fill="#f97316">
            <line x1="-30" y1="0" x2="-95" y2="0"/>
            <polygon points="-102,0 -93,-5 -93,5"/>
            <text x="-106" y="-8" font-size="10" font-weight="700" fill="#f97316" text-anchor="end">F_քարշ = ${thrustMilliN} մՆ</text>
          </g>
        `
            : ''
        }
      </g>

      <!-- Right Section: Continuous Interplanetary Spiral Trajectory Inset -->
      <g id="orbital-spiral-inset" transform="translate(425, 45)">
        <rect width="235" height="190" rx="12" fill="#0f172a" fill-opacity="0.85" stroke="#334155" stroke-width="1.5"/>
        <text x="14" y="24" font-size="11" font-weight="700" fill="#38bdf8">Տիեզերական Պարույր (Low-Thrust)</text>

        <!-- Center: Sun -->
        <g transform="translate(118, 105)">
          <circle cx="0" cy="0" r="10" fill="#f59e0b" filter="drop-shadow(0 0 6px #f59e0b)"/>
          
          <!-- Inner Planet (Earth Orbit) -->
          <circle cx="0" cy="0" r="32" fill="none" stroke="#38bdf8" stroke-width="1" stroke-dasharray="3 3" opacity="0.6"/>
          <circle cx="32" cy="0" r="3.5" fill="#38bdf8"/>
          <text x="36" y="10" font-size="7" font-weight="700" fill="#38bdf8">Երկիր</text>

          <!-- Outer Target (Mars / Asteroid Belt) -->
          <circle cx="0" cy="0" r="72" fill="none" stroke="#ef4444" stroke-width="1" stroke-dasharray="4 3" opacity="0.6"/>
          <circle cx="-72" cy="0" r="3.5" fill="#ef4444"/>
          <text x="-72" y="-6" font-size="7" font-weight="700" fill="#ef4444" text-anchor="middle">Մարս</text>

          <!-- Continuous Outward Ion Spiral Trajectory -->
          <path d="M 32 0 
                   C 32 25, 10 38, -10 38 
                   C -35 38, -48 15, -48 -10
                   C -48 -40, -15 -58, 15 -58
                   C 48 -58, 68 -25, 68 10
                   C 68 45, 30 72, -15 72
                   C -50 72, -72 40, -72 0"
                fill="none" stroke="${colors.primary}" stroke-width="2" stroke-dasharray="5 3"/>
          
          <!-- Spacecraft Icon on Spiral -->
          <circle cx="15" cy="-58" r="3" fill="#ffffff" stroke="${colors.primary}" stroke-width="1.5"/>
          <polygon points="12,-63 20,-58 12,-53" fill="${colors.primary}"/>
        </g>

        <text x="14" y="174" font-size="9" font-weight="600" fill="#94a3b8">
          Անընդհատ միկրոքարշուժով պարուրաձև թռիչք
        </text>
      </g>

      <!-- Bottom Telemetry HUD Bar -->
      <g transform="translate(425, 250)">
        <rect width="235" height="110" rx="10" fill="#1e293b" fill-opacity="0.9" stroke="#475569" stroke-width="1.5"/>
        <text x="14" y="24" font-size="11" font-weight="700" fill="#e2e8f0">Իոնային Տելեմետրիա</text>
        <line x1="14" y1="32" x2="220" y2="32" stroke="#334155" stroke-width="1"/>
        
        <text x="14" y="52" font-size="10" font-weight="600" fill="#94a3b8">Տեսակարար Իմպուլս (I_sp)՝</text>
        <text x="220" y="52" font-size="11" font-weight="700" fill="#38bdf8" text-anchor="end">${specificImpulseSec} վ</text>
        
        <text x="14" y="72" font-size="10" font-weight="600" fill="#94a3b8">Արտահոսքի Արագություն՝</text>
        <text x="220" y="72" font-size="11" font-weight="700" fill="#22c55e" text-anchor="end">${exhaustVelocityKms} կմ/վ</text>
        
        <text x="14" y="92" font-size="10" font-weight="600" fill="#94a3b8">Էլեկտրական Հզորություն՝</text>
        <text x="220" y="92" font-size="11" font-weight="700" fill="#fbbf24" text-anchor="end">${beamPowerKw} կՎտ</text>
      </g>
    </svg>
  `;
}

/**
 * Atmospheric Thermal Soaring & Glider Polar Artwork
 */
export function gliderThermalArt({
  airSpeedKmh = 90,
  bankAngleDeg = 30,
  thermalStrength = 3.5,
  thermalRadius = 120,
  turnRadiusM = 78,
  loadFactor = 1.15,
  turnSinkRate = 1.1,
  thermalUpdraft = 3.2,
  netClimbRate = 2.1,
  bestLd = 38,
  isClimbing = true,
  showVectors = true,
} = {}) {
  const isUp = netClimbRate > 0;
  const statusColor = isUp ? '#22c55e' : '#ef4444';
  const statusText = isUp
    ? `🟢 ՎԵՐԵԼՔ ԹԵՐՄԻԿՈՒՄ՝ +${netClimbRate} մ/վ`
    : `🔴 ԻՋԵՑՈՒՄ (ԿՈՐՈՒՍՏ)՝ ${netClimbRate} մ/վ`;

  // Scale turn radius for visual inside 360px wide column
  const visualRadius = Math.max(30, Math.min(130, (turnRadiusM / 150) * 100));

  return `
    <svg viewBox="0 0 680 380" class="aerolab-art glider-art" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Սավառնակը թերմիկ օդային հոսանքում և բևեռային կորը">
      <defs>
        <!-- Atmospheric Sky Gradient -->
        <linearGradient id="sky-thermal" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#bae6fd"/>
          <stop offset="55%" stop-color="#e0f2fe"/>
          <stop offset="85%" stop-color="#f0fdf4"/>
          <stop offset="100%" stop-color="#bbf7d0"/>
        </linearGradient>

        <!-- Thermal Convection Heatmap Gradient -->
        <radialGradient id="thermal-column" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fef08a" stop-opacity="0.85"/>
          <stop offset="45%" stop-color="#fed7aa" stop-opacity="0.55"/>
          <stop offset="80%" stop-color="#fecaca" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="#e0f2fe" stop-opacity="0"/>
        </radialGradient>

        <!-- Glider Wing Gradient -->
        <linearGradient id="glider-wing" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="50%" stop-color="#e2e8f0"/>
          <stop offset="100%" stop-color="#cbd5e1"/>
        </linearGradient>
      </defs>

      <!-- Sky & Landscape Background -->
      <rect width="680" height="380" fill="url(#sky-thermal)"/>

      <!-- Horizon Ground Landscape -->
      <path d="M 0 330 Q 180 310 360 335 T 680 325 L 680 380 L 0 380 Z" fill="#86efac" opacity="0.6"/>
      <path d="M 0 345 Q 220 330 440 350 T 680 340 L 680 380 L 0 380 Z" fill="#4ade80" opacity="0.8"/>

      <!-- Convective Thermal Column (Center at X=240, Y=180) -->
      <g id="thermal-updraft-column" transform="translate(240, 180)">
        <ellipse cx="0" cy="0" rx="140" ry="150" fill="url(#thermal-column)"/>

        <!-- Upward Flow Streamline Arrows -->
        <g stroke="#f59e0b" stroke-width="2" stroke-linecap="round" fill="#f59e0b" opacity="0.75">
          <line x1="-70" y1="90" x2="-70" y2="-90" stroke-dasharray="8 6"/>
          <polygon points="-70,-96 -74,-88 -66,-88"/>
          
          <line x1="-25" y1="110" x2="-25" y2="-110" stroke-width="2.5" stroke-dasharray="10 5"/>
          <polygon points="-25,-118 -30,-108 -20,-108"/>

          <line x1="25" y1="110" x2="25" y2="-110" stroke-width="2.5" stroke-dasharray="10 5"/>
          <polygon points="25,-118 20,-108 30,-108"/>

          <line x1="70" y1="90" x2="70" y2="-90" stroke-dasharray="8 6"/>
          <polygon points="70,-96 66,-88 74,-88"/>
        </g>
        <text x="0" y="-128" font-size="11" font-weight="700" fill="#b45309" text-anchor="middle">
          Թերմիկ Կոնվեկտիվ Սյուն (w_core = ${thermalStrength} մ/վ)
        </text>

        <!-- Circling Track Oval (3D projection) -->
        <ellipse cx="0" cy="0" rx="${visualRadius}" ry="${visualRadius * 0.45}" fill="none" stroke="#0284c7" stroke-width="2" stroke-dasharray="6 4" opacity="0.7"/>

        <!-- Glider Position on Orbit -->
        <g id="glider-actor" transform="translate(${visualRadius * 0.75}, ${-visualRadius * 0.3}) rotate(${bankAngleDeg})">
          <!-- Sailplane Body (Fuselage) -->
          <ellipse cx="0" cy="0" rx="26" ry="4.5" fill="#ffffff" stroke="#334155" stroke-width="1.5"/>
          <!-- Cockpit Canopy (Blue tint) -->
          <ellipse cx="6" cy="-1.5" rx="9" ry="2.5" fill="#38bdf8" stroke="#0284c7" stroke-width="1"/>
          <!-- High-Aspect-Ratio Slender Wings -->
          <polygon points="-4,-4 -75,-6 -75,6 -4,4" fill="url(#glider-wing)" stroke="#334155" stroke-width="1.2"/>
          <polygon points="4,-4 75,-6 75,6 4,4" fill="url(#glider-wing)" stroke="#334155" stroke-width="1.2"/>
          <!-- T-Tail Stabilizer -->
          <line x1="-22" y1="0" x2="-22" y2="-12" stroke="#334155" stroke-width="2"/>
          <line x1="-27" y1="-12" x2="-17" y2="-12" stroke="#334155" stroke-width="2"/>

          <!-- Dynamic Force Vectors on Banked Glider -->
          ${
            showVectors
              ? `
            <!-- Lift Vector L (Perpendicular to wings, green) -->
            <g stroke="#22c55e" stroke-width="2.5" fill="#22c55e">
              <line x1="0" y1="0" x2="0" y2="-48"/>
              <polygon points="0,-55 -4,-47 4,-47"/>
              <text x="6" y="-35" font-size="9" font-weight="700" fill="#15803d">L_վերամբարձ</text>
            </g>

            <!-- Centrifugal Force (Horizontal, orange) -->
            <g stroke="#f97316" stroke-width="2" fill="#f97316">
              <line x1="0" y1="0" x2="35" y2="0"/>
              <polygon points="41,0 33,-4 33,4"/>
              <text x="12" y="14" font-size="8" font-weight="700" fill="#c2410c">F_կենտրոնախույս</text>
            </g>
          `
              : ''
          }
        </g>

        <!-- Circling Radius Indicator -->
        <line x1="0" y1="0" x2="${visualRadius * 0.75}" y2="${-visualRadius * 0.3}" stroke="#0369a1" stroke-width="1.5" stroke-dasharray="3 3"/>
        <circle cx="0" cy="0" r="3" fill="#0369a1"/>
        <text x="${visualRadius * 0.35}" y="${-visualRadius * 0.15 - 5}" font-size="9" font-weight="700" fill="#0369a1">
          R = ${turnRadiusM} մ
        </text>
      </g>

      <!-- Left Inset: Glider Drag Polar Graph -->
      <g id="polar-curve-graph" transform="translate(25, 45)">
        <rect width="180" height="155" rx="10" fill="#ffffff" fill-opacity="0.9" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="12" y="20" font-size="11" font-weight="700" fill="#0f172a">Սավառնակի Պոլյարա</text>
        <text x="12" y="32" font-size="8" font-weight="600" fill="#64748b">v_sink vs v_forward</text>

        <!-- Coordinate axes -->
        <g stroke="#94a3b8" stroke-width="1.2">
          <!-- Forward Speed axis (X) -->
          <line x1="25" y1="42" x2="165" y2="42"/>
          <text x="160" y="38" font-size="8" fill="#64748b" text-anchor="end">v_արագ (կմ/ժ)</text>
          
          <!-- Sink axis (Y pointing DOWN) -->
          <line x1="25" y1="42" x2="25" y2="140"/>
          <text x="28" y="136" font-size="8" fill="#64748b">v_իջեցում (մ/վ)</text>
        </g>

        <!-- Polar Curve (Characteristic Parabolic Sink Curve) -->
        <path d="M 35 110 Q 75 60 110 75 T 160 135" fill="none" stroke="#2563eb" stroke-width="2.5"/>

        <!-- Tangent Line for Best Glide Ratio (Max L/D) -->
        <line x1="25" y1="42" x2="145" y2="120" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3 2"/>
        <text x="135" y="115" font-size="8" font-weight="700" fill="#d97706">L/D = ${bestLd}</text>

        <!-- Current Operating Point Dot -->
        <circle cx="${Math.min(155, Math.max(35, 25 + (airSpeedKmh - 60) * 1.1))}" 
                cy="${Math.min(140, Math.max(50, 42 + turnSinkRate * 25))}" 
                r="4.5" fill="#ef4444" stroke="#ffffff" stroke-width="1.5"/>
      </g>

      <!-- Top Status Banner Pill -->
      <g transform="translate(240, 25)">
        <rect width="250" height="34" rx="8" fill="#0f172a" fill-opacity="0.9" stroke="${statusColor}" stroke-width="1.5"/>
        <text x="125" y="22" font-size="11" font-weight="700" fill="${statusColor}" text-anchor="middle">
          ${statusText}
        </text>
      </g>

      <!-- Right Telemetry Panel -->
      <g transform="translate(480, 45)">
        <rect width="180" height="230" rx="10" fill="#0f172a" fill-opacity="0.9" stroke="#334155" stroke-width="1.5"/>
        <text x="14" y="24" font-size="11" font-weight="700" fill="#f8fafc">Թռիչքային Տվյալներ</text>
        <line x1="14" y1="32" x2="166" y2="32" stroke="#334155" stroke-width="1"/>
        
        <text x="14" y="52" font-size="10" font-weight="600" fill="#94a3b8">Առաջընթաց Արագություն՝</text>
        <text x="166" y="52" font-size="11" font-weight="700" fill="#38bdf8" text-anchor="end">${airSpeedKmh} կմ/ժ</text>
        
        <text x="14" y="80" font-size="10" font-weight="600" fill="#94a3b8">Կողաթեքում (phi)՝</text>
        <text x="166" y="80" font-size="11" font-weight="700" fill="#e2e8f0" text-anchor="end">${bankAngleDeg}°</text>

        <text x="14" y="108" font-size="10" font-weight="600" fill="#94a3b8">Գերբեռնվածություն (n)՝</text>
        <text x="166" y="108" font-size="11" font-weight="700" fill="#fbbf24" text-anchor="end">${loadFactor} g</text>

        <text x="14" y="136" font-size="10" font-weight="600" fill="#94a3b8">Թերմիկ Վերելք՝</text>
        <text x="166" y="136" font-size="11" font-weight="700" fill="#22c55e" text-anchor="end">+${thermalUpdraft} մ/վ</text>

        <text x="14" y="164" font-size="10" font-weight="600" fill="#94a3b8">Սավառնակի Իջեցում՝</text>
        <text x="166" y="164" font-size="11" font-weight="700" fill="#f87171" text-anchor="end">-${turnSinkRate} մ/վ</text>

        <line x1="14" y1="180" x2="166" y2="180" stroke="#334155" stroke-width="1"/>

        <text x="14" y="202" font-size="10" font-weight="700" fill="#e2e8f0">Արդյունարար Վերելք՝</text>
        <text x="166" y="202" font-size="12" font-weight="800" fill="${statusColor}" text-anchor="end">
          ${isUp ? '+' : ''}${netClimbRate} մ/վ
        </text>
      </g>
    </svg>
  `;
}


