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

