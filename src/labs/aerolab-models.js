// AeroLab physics models - SI units throughout (m, s, kg, N, Pa, m/s, m/s²)
export const G = 9.81;
export const RHO_AIR = 1.225; // kg/m³ at sea level
export const RHO_WATER = 1000; // kg/m³
export const P_ATM = 101325; // Pa

export const radians = (d) => (d * Math.PI) / 180;
export const degrees = (r) => (r * 180) / Math.PI;

/**
 * Airfoil Aerodynamics Model (NACA 4-digit type approximation)
 * Computes lift, drag, and downwash for wind tunnel and glider wings.
 */
export function airfoilForces({
  angleDeg = 4,
  airSpeed = 20,
  chord = 0.2,
  span = 0.8,
} = {}) {
  const alpha = radians(angleDeg);
  const area = chord * span;
  const q = 0.5 * RHO_AIR * airSpeed * airSpeed; // Dynamic pressure

  // Stall occurs around +15° and -10°
  const isStalled = angleDeg > 15.5 || angleDeg < -11;

  let cl = 0;
  let cd = 0;

  if (!isStalled) {
    // Linear lift slope: 2 * pi * alpha + camber offset
    cl = 2 * Math.PI * (alpha + radians(2));
    // Induced and parasitic drag
    const aspectRatio = (span * span) / area;
    const cd0 = 0.018; // Parasitic profile drag
    cd = cd0 + (cl * cl) / (Math.PI * 0.85 * aspectRatio);
  } else {
    // Post-stall flow separation
    const sign = Math.sign(angleDeg);
    cl = sign * 0.85 * Math.cos(alpha);
    cd = 0.75 + 1.1 * Math.sin(Math.abs(alpha));
  }

  const lift = Math.max(-1000, cl * q * area);
  const drag = Math.max(0.001, cd * q * area);
  const downwashDeg = isStalled ? 2 : Math.max(0, angleDeg * 0.45);

  return {
    cl: Number(cl.toFixed(3)),
    cd: Number(cd.toFixed(3)),
    lift: Number(lift.toFixed(2)),
    drag: Number(drag.toFixed(2)),
    stall: isStalled,
    downwashDeg: Number(downwashDeg.toFixed(1)),
    liftToDrag: drag > 0.001 ? Number((lift / drag).toFixed(2)) : 0,
  };
}

/**
 * Quadcopter 4-Rotor Dynamics Model (Euler Rigid Body / Conservation of Angular Momentum)
 * Motor 1: Front (CW), Motor 2: Right (CCW), Motor 3: Rear (CW), Motor 4: Left (CCW)
 */
export function dronePhysicsModel({
  motors = [100, 100, 100, 100], // [M1_front_cw, M2_right_ccw, M3_rear_cw, M4_left_ccw]
  mass = 0.8, // kg
  armLength = 0.22, // meters (from CoM to motor hub)
  kt = 0.0001962, // thrust coefficient (N / (rad/s)^2) -> 100 rad/s = 1.962 N per motor
  kq = 0.000004, // reaction torque coefficient (N·m / (rad/s)^2)
} = {}) {
  const m1 = Math.max(0, motors[0] || 0);
  const m2 = Math.max(0, motors[1] || 0);
  const m3 = Math.max(0, motors[2] || 0);
  const m4 = Math.max(0, motors[3] || 0);

  // Individual thrusts (N)
  const t1 = kt * m1 * m1;
  const t2 = kt * m2 * m2;
  const t3 = kt * m3 * m3;
  const t4 = kt * m4 * m4;
  const totalThrust = t1 + t2 + t3 + t4;
  const weight = mass * G;

  // Pitch torque: rear motor (M3) vs front motor (M1)
  const pitchTorque = armLength * (t3 - t1);

  // Roll torque: left motor (M4) vs right motor (M2)
  const rollTorque = armLength * (t4 - t2);

  // Yaw torque: conservation of angular momentum
  // M1, M3 spin CW -> reaction torque on drone body is CCW (positive)
  // M2, M4 spin CCW -> reaction torque on drone body is CW (negative)
  const tauCW = kq * (m1 * m1 + m3 * m3);
  const tauCCW = kq * (m2 * m2 + m4 * m4);
  const yawTorque = tauCW - tauCCW;

  // Approximate equilibrium tilt angles for visual response (degrees)
  const pitchDeg = Math.max(-35, Math.min(35, (pitchTorque / (mass * armLength * 3)) * (180 / Math.PI)));
  const rollDeg = Math.max(-35, Math.min(35, (rollTorque / (mass * armLength * 3)) * (180 / Math.PI)));

  // Effective vertical thrust
  const pitchRad = (pitchDeg * Math.PI) / 180;
  const rollRad = (rollDeg * Math.PI) / 180;
  const verticalThrust = totalThrust * Math.cos(pitchRad) * Math.cos(rollRad);
  const netVerticalForce = verticalThrust - weight;
  const verticalAccel = netVerticalForce / mass;

  const isHovering = Math.abs(verticalAccel) < 0.15 && Math.abs(yawTorque) < 0.002 && Math.abs(pitchTorque) < 0.005 && Math.abs(rollTorque) < 0.005;
  const isClimbing = verticalAccel >= 0.15;
  const isDescending = verticalAccel <= -0.15;

  return {
    motors: [m1, m2, m3, m4],
    thrusts: [Number(t1.toFixed(2)), Number(t2.toFixed(2)), Number(t3.toFixed(2)), Number(t4.toFixed(2))],
    totalThrust: Number(totalThrust.toFixed(2)),
    weight: Number(weight.toFixed(2)),
    pitchTorque: Number(pitchTorque.toFixed(3)),
    rollTorque: Number(rollTorque.toFixed(3)),
    yawTorque: Number(yawTorque.toFixed(4)),
    pitchDeg: Number(pitchDeg.toFixed(1)),
    rollDeg: Number(rollDeg.toFixed(1)),
    netVerticalForce: Number(netVerticalForce.toFixed(2)),
    verticalAccel: Number(verticalAccel.toFixed(2)),
    isHovering,
    isClimbing,
    isDescending,
  };
}

/**
 * Supersonic Aerodynamics & Mach Shockwave Cone Model
 */
export function supersonicMachModel({
  mach = 1.0,
  speedOfSound = 340.3, // m/s at 15°C
} = {}) {
  const m = Math.max(0.3, Math.min(3.0, mach));
  const airspeedMs = m * speedOfSound;
  const airspeedKmh = airspeedMs * 3.6;

  const isSonic = Math.abs(m - 1.0) < 0.04;
  const isSupersonic = m >= 1.0;
  const isSubsonic = m < 1.0;

  // Mach cone half-angle: sin(mu) = 1 / Mach
  let machAngleRad = null;
  let machAngleDeg = null;
  if (isSupersonic) {
    machAngleRad = Math.asin(1 / m);
    machAngleDeg = Number(((machAngleRad * 180) / Math.PI).toFixed(1));
  }

  // Shockwave pressure ratio across normal shock (Rankine-Hugoniot)
  const gamma = 1.4; // ratio of specific heats for air
  let pressureRatio = 1.0;
  if (isSupersonic) {
    pressureRatio = 1 + ((2 * gamma) / (gamma + 1)) * (m * m - 1);
  }

  const dopplerCompression = isSubsonic ? Number((1 / (1 - m)).toFixed(2)) : Infinity;

  return {
    mach: Number(m.toFixed(2)),
    airspeedMs: Number(airspeedMs.toFixed(1)),
    airspeedKmh: Number(airspeedKmh.toFixed(0)),
    isSubsonic,
    isSonic,
    isSupersonic,
    machAngleRad,
    machAngleDeg,
    pressureRatio: Number(pressureRatio.toFixed(2)),
    dopplerCompression,
  };
}

/**
 * Turbofan Jet Engine Thermodynamic Model (Brayton Cycle with Dual-Spool & High-Bypass)
 * Calculates net thrust, core flow, bypass flow, temperatures, fuel burn, and propulsive efficiency.
 */
export function turbofanBraytonModel({
  throttle = 75, // 0 to 100%
  bypassRatio = 8.5, // 1.0 to 12.0
  altitude = 0, // meters (0 to 12,000m)
  airspeedKmh = 250, // km/h (0 to 950 km/h)
} = {}) {
  const thr = Math.max(0, Math.min(100, throttle));
  const bpr = Math.max(1, Math.min(12, bypassRatio));
  const alt = Math.max(0, Math.min(12000, altitude));
  const speedKmh = Math.max(0, Math.min(950, airspeedKmh));
  const v0 = speedKmh / 3.6; // m/s

  // Standard atmospheric model (Troposphere up to 11km)
  const T0 = Math.max(216.65, 288.15 - 0.0065 * alt); // Kelvin
  const P0 = P_ATM * Math.pow(Math.max(0.1, 1 - (0.0065 * alt) / 288.15), 5.2561); // Pa
  const rho = P0 / (287.05 * T0); // kg/m³
  const speedOfSound = Math.sqrt(1.4 * 287.05 * T0);
  const mach = Number((v0 / speedOfSound).toFixed(2));

  // Spool factor N1 (Fan & LPC) and N2 (HPC)
  const n1 = 0.25 + 0.75 * (thr / 100);
  const n2 = 0.35 + 0.65 * (thr / 100);

  // Mass airflow (scaled to large high-bypass turbofan, e.g. CFM LEAP / GE90)
  const baseMassFlow = 320 * (rho / RHO_AIR); // kg/s at sea level
  const totalMassFlow = baseMassFlow * (0.2 + 0.8 * n1);
  const coreMassFlow = totalMassFlow / (1 + bpr);
  const bypassMassFlow = totalMassFlow - coreMassFlow;

  // Pressure & Temperature ratios
  const fanPressureRatio = 1 + 0.75 * n1;
  const compressorPressureRatio = 1 + 36 * Math.pow(n2, 1.5);
  // Turbine Inlet Temperature (TIT) at combustor exit
  const titK = 700 + 1050 * n2;
  const titC = titK - 273.15;

  // Exhaust velocities (isentropic expansion from nozzle, accounting for LPT work extraction to drive fan)
  const vBypass = Math.sqrt(Math.max(0, v0 * v0 + 2 * 1005 * T0 * (Math.pow(fanPressureRatio, 0.4 / 1.4) - 1) * 0.95));
  const vCore = Math.sqrt(Math.max(0, v0 * v0 + 2 * 1150 * T0 * (Math.pow(compressorPressureRatio, 0.286) - 1) * 0.45));

  // Net thrust = m_dot * (v_exit - v0)
  const thrustBypass = Math.max(0, bypassMassFlow * Math.max(0, vBypass - v0));
  const thrustCore = Math.max(0, coreMassFlow * Math.max(0, vCore - v0));
  const totalThrust = thrustBypass + thrustCore;
  const thrustKn = totalThrust / 1000;

  // Bypass thrust share (%)
  const bypassThrustPercent = totalThrust > 0 ? (thrustBypass / totalThrust) * 100 : 0;

  // Fuel consumption (Core burning kerosene/Jet-A)
  const fuelAirRatio = 0.018 * n2;
  const fuelFlowKgS = coreMassFlow * fuelAirRatio;
  const fuelFlowKgH = fuelFlowKgS * 3600;
  // Specific Fuel Consumption (TSFC) in g / (kN * s)
  const tsfc = thrustKn > 0.1 ? (fuelFlowKgS * 1000) / thrustKn : 0;

  // Propulsive efficiency
  const vAvgExit = totalMassFlow > 0 ? (bypassMassFlow * vBypass + coreMassFlow * vCore) / totalMassFlow : v0;
  const propulsiveEff = vAvgExit + v0 > 0 ? (2 * v0) / (vAvgExit + v0) : 0;

  return {
    throttle: thr,
    bypassRatio: bpr,
    altitude: alt,
    airspeedKmh: speedKmh,
    mach,
    totalMassFlow: Number(totalMassFlow.toFixed(1)),
    coreMassFlow: Number(coreMassFlow.toFixed(1)),
    bypassMassFlow: Number(bypassMassFlow.toFixed(1)),
    thrustKn: Number(thrustKn.toFixed(1)),
    thrustBypassKn: Number((thrustBypass / 1000).toFixed(1)),
    thrustCoreKn: Number((thrustCore / 1000).toFixed(1)),
    bypassThrustPercent: Number(bypassThrustPercent.toFixed(1)),
    fuelFlowKgS: Number(fuelFlowKgS.toFixed(3)),
    fuelFlowKgH: Number(fuelFlowKgH.toFixed(0)),
    tsfc: Number(tsfc.toFixed(2)),
    titC: Number(titC.toFixed(0)),
    titK: Number(titK.toFixed(0)),
    fanRpmPct: Math.round(n1 * 100),
    coreRpmPct: Math.round(n2 * 100),
    propulsiveEff: Number((propulsiveEff * 100).toFixed(1)),
    rho: Number(rho.toFixed(3)),
  };
}

export const MU_EARTH = 3.986004418e14; // m³/s² (Earth standard gravitational parameter)
export const R_EARTH = 6371000;          // m (6,371 km mean volumetric radius)

/**
 * Orbital Rocketry & Newton's Cannonball Physics Model
 * Computes Keplerian orbital parameters, velocities, and trajectory coordinates
 */
export function orbitPhysicsModel({
  launchAltitudeKm = 400, // km above surface
  horizontalVelocityKms = 7.67, // km/s
} = {}) {
  const h = Math.max(0, launchAltitudeKm * 1000);
  const r0 = R_EARTH + h;
  const v0 = Math.max(0.1, horizontalVelocityKms * 1000);

  // Circular orbital velocity at launch altitude: v1 = sqrt(mu / r0)
  const v1 = Math.sqrt(MU_EARTH / r0);
  // Escape velocity at launch altitude: vEsc = sqrt(2 * mu / r0)
  const vEsc = Math.sqrt((2 * MU_EARTH) / r0);

  // Specific orbital energy & angular momentum (purely tangential launch)
  const energy = (v0 * v0) / 2 - MU_EARTH / r0;
  const hAng = r0 * v0;

  // Semi-major axis
  const a = -MU_EARTH / (2 * energy);

  // Eccentricity
  const eTerm = 1 + (2 * energy * hAng * hAng) / (MU_EARTH * MU_EARTH);
  const e = Math.sqrt(Math.max(0, eTerm));

  let rPeriapsis, rApoapsis;
  if (v0 >= v1) {
    rPeriapsis = r0;
    rApoapsis = a > 0 ? 2 * a - r0 : Infinity;
  } else {
    rApoapsis = r0;
    rPeriapsis = 2 * a - r0;
  }

  const altPeriapsisKm = (rPeriapsis - R_EARTH) / 1000;
  const altApoapsisKm = isFinite(rApoapsis) ? (rApoapsis - R_EARTH) / 1000 : Infinity;

  // Orbital period (s & min)
  const periodSec = a > 0 ? 2 * Math.PI * Math.sqrt((a * a * a) / MU_EARTH) : null;
  const periodMin = periodSec ? periodSec / 60 : null;

  // Gravitational acceleration at altitude (m/s²)
  const gravityAtAlt = MU_EARTH / (r0 * r0);

  // Orbit classification
  let status = 'suborbital_crash'; // 'suborbital_crash' | 'circular' | 'elliptic' | 'parabolic' | 'hyperbolic'
  if (v0 >= vEsc * 0.9999) {
    status = v0 > vEsc * 1.0001 ? 'hyperbolic' : 'parabolic';
  } else if (Math.abs(v0 - v1) < 25) {
    status = 'circular';
  } else if (rPeriapsis > R_EARTH) {
    status = 'elliptic';
  } else {
    status = 'suborbital_crash';
  }

  // Generate 2D trajectory points (x, y in km relative to Earth center)
  const trajectoryPoints = [];
  const numSteps = 72;
  const thetaMax = (status === 'parabolic' || status === 'hyperbolic') ? 1.8 : 2 * Math.PI;
  const thetaStart = (status === 'parabolic' || status === 'hyperbolic') ? -thetaMax : 0;
  const dTheta = (status === 'parabolic' || status === 'hyperbolic') ? (2 * thetaMax) / numSteps : (2 * Math.PI) / numSteps;

  for (let i = 0; i <= numSteps; i++) {
    const th = thetaStart + i * dTheta;
    let r = 0;
    if (e < 1) {
      r = (a * (1 - e * e)) / (1 + e * Math.cos(th));
    } else {
      const p = (hAng * hAng) / MU_EARTH;
      const denom = 1 + e * Math.cos(th);
      if (denom <= 0.05) continue;
      r = p / denom;
    }
    
    const rKm = r / 1000;
    const x = rKm * Math.sin(th);
    const y = -rKm * Math.cos(th);

    trajectoryPoints.push({ x, y, rKm });
    if (r < R_EARTH && v0 < v1 && i > 0) {
      break;
    }
  }

  return {
    launchRadiusM: r0,
    launchAltitudeKm,
    horizontalVelocityKms,
    v1Kms: Number((v1 / 1000).toFixed(2)),
    vEscKms: Number((vEsc / 1000).toFixed(2)),
    semiMajorAxisKm: Number((a / 1000).toFixed(1)),
    eccentricity: Number(e.toFixed(4)),
    periapsisKm: Number(altPeriapsisKm.toFixed(1)),
    apoapsisKm: isFinite(altApoapsisKm) ? Number(altApoapsisKm.toFixed(1)) : null,
    periodMin: periodMin ? Number(periodMin.toFixed(1)) : null,
    periodSec: periodSec ? Number(periodSec.toFixed(0)) : null,
    gravityAtAlt: Number(gravityAtAlt.toFixed(2)),
    status,
    isStableOrbit: status === 'circular' || status === 'elliptic',
    hasCollided: rPeriapsis <= R_EARTH && v0 < v1,
    trajectoryPoints,
  };
}

/**
 * Helicopter Swashplate & Rotor Aerodynamics Model
 * Models collective pitch, cyclic pitch tilt, engine reaction torque, and tail rotor anti-torque.
 */
export function helicopterSwashplateModel({
  collective = 50,    // 0 to 100 % (controls vertical blade pitch)
  cyclicPitch = 0,    // -50 (pitch back) to +50 (pitch forward)
  cyclicRoll = 0,     // -50 (roll left) to +50 (roll right)
  tailPedal = 50,     // 0 (left pedal) to 100 (right pedal), 50 is neutral
  mainRpm = 400,      // Main rotor RPM
} = {}) {
  // Blade pitch from collective (degrees): 4° to 18°
  const colPitchDeg = 4 + (Math.max(0, Math.min(100, collective)) / 100) * 14;
  // Rotor disc tilt from cyclic pitch (degrees): -12° to +12°
  const tiltForwardDeg = (Math.max(-50, Math.min(50, cyclicPitch)) / 50) * 12;
  const tiltRollDeg = (Math.max(-50, Math.min(50, cyclicRoll)) / 50) * 12;

  // Total lift thrust (kN)
  const rpmFactor = Math.pow(mainRpm / 400, 2);
  const totalThrustKn = 22 * (colPitchDeg / 12) * rpmFactor;

  // Directional thrust components
  const tiltRadFwd = (tiltForwardDeg * Math.PI) / 180;
  const tiltRadRoll = (tiltRollDeg * Math.PI) / 180;
  const verticalLiftKn = totalThrustKn * Math.cos(tiltRadFwd) * Math.cos(tiltRadRoll);
  const forwardThrustKn = totalThrustKn * Math.sin(tiltRadFwd);
  const lateralThrustKn = totalThrustKn * Math.sin(tiltRadRoll);

  // Helicopter gross weight ~ 20 kN (~2040 kg)
  const weightKn = 20.0;
  const netVerticalKn = verticalLiftKn - weightKn;

  // Main rotor reaction torque (Newton's 3rd Law, N·m)
  const mainTorqueNm = 4200 * (colPitchDeg / 11) * rpmFactor;

  // Tail rotor anti-torque (tail boom arm L = 7.5 m)
  const tailArm = 7.5;
  const tailThrustKn = 0.56 * (Math.max(0, Math.min(100, tailPedal)) / 50) * rpmFactor;
  const tailAntiTorqueNm = 4200 * (Math.max(0, Math.min(100, tailPedal)) / 50) * rpmFactor;

  // Yaw torque imbalance
  const netYawTorqueNm = tailAntiTorqueNm - mainTorqueNm;

  let yawState = 'balanced';
  if (netYawTorqueNm > 250) yawState = 'yaw_right';
  else if (netYawTorqueNm < -250) yawState = 'yaw_left';

  // Flight state classification
  let flightState = 'hover';
  if (Math.abs(netVerticalKn) < 1.5 && Math.abs(forwardThrustKn) < 0.6 && yawState === 'balanced') {
    flightState = 'hover';
  } else if (netVerticalKn > 1.5) {
    flightState = 'climb';
  } else if (netVerticalKn < -1.5) {
    flightState = 'descent';
  } else if (Math.abs(forwardThrustKn) >= 0.6) {
    flightState = forwardThrustKn > 0 ? 'forward' : 'backward';
  }

  return {
    colPitchDeg: Number(colPitchDeg.toFixed(1)),
    tiltForwardDeg: Number(tiltForwardDeg.toFixed(1)),
    tiltRollDeg: Number(tiltRollDeg.toFixed(1)),
    totalThrustKn: Number(totalThrustKn.toFixed(2)),
    verticalLiftKn: Number(verticalLiftKn.toFixed(2)),
    forwardThrustKn: Number(forwardThrustKn.toFixed(2)),
    lateralThrustKn: Number(lateralThrustKn.toFixed(2)),
    netVerticalKn: Number(netVerticalKn.toFixed(2)),
    mainTorqueNm: Math.round(mainTorqueNm),
    tailAntiTorqueNm: Math.round(tailAntiTorqueNm),
    netYawTorqueNm: Math.round(netYawTorqueNm),
    yawState,
    flightState,
    isHovering: flightState === 'hover',
  };
}


/**
 * Water & Air Pressure Rocket Physics State Initialization
 */
export function initialRocketState(params = {}) {
  const defaults = {
    bottleVolume: 0.0015, // 1.5 L in m³
    waterFraction: 0.35, // 35% water
    pressureBar: 5, // 5 bar gauge = 500,000 Pa
    dryMass: 0.16, // 160g empty rocket + nosecone
    nozzleDiameter: 0.021, // standard 21mm bottle mouth
    rocketDiameter: 0.09, // 90mm bottle diameter
    finCount: 3, // 0, 3, 4 fins
    finSpanCm: 6, // 6cm fin span
    noseShape: "conical", // 'conical' (streamlined) or 'blunt'
    angleDeg: 75, // launch angle
    windSpeed: 0, // ambient headwind
    parachute: true, // deploys at apogee
  };

  const p = { ...defaults, ...params };
  const waterVolume = p.bottleVolume * Math.max(0, Math.min(0.95, p.waterFraction));
  const waterMass = waterVolume * RHO_WATER;
  const initialMass = p.dryMass + waterMass;

  // Frontal cross-sectional area
  const rocketArea = Math.PI * Math.pow(p.rocketDiameter / 2, 2);
  const nozzleArea = Math.PI * Math.pow(p.nozzleDiameter / 2, 2);

  // Drag coefficient based on nosecone and fins
  let cd = p.noseShape === "conical" ? 0.28 : 0.65;
  if (p.finCount === 0) cd += 0.08; // turbulence from unstable body
  else cd += p.finCount * 0.015;

  // Stability margin: Center of Mass (CoM) vs Center of Pressure (CoP)
  // Measured from nosecone (0 = tip, 1 = tail)
  // Conical nose shifts CoM forward (0.35). Fins shift CoP backward (0.75).
  const comRatio = (0.28 * p.dryMass + 0.65 * waterMass) / initialMass;
  const copRatio = p.finCount === 0 ? 0.42 : 0.42 + (p.finCount * p.finSpanCm) / 80;
  const isStable = copRatio - comRatio > 0.05;

  const theta = radians(p.angleDeg);

  return {
    params: p,
    t: 0,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    speed: 0,
    pitch: theta,
    mass: initialMass,
    waterRemaining: waterVolume,
    pressureGauge: p.pressureBar * 100000,
    thrust: 0,
    drag: 0,
    gravity: initialMass * G,
    apogee: 0,
    apogeeTime: 0,
    flightDuration: 0,
    maxSpeed: 0,
    status: "ready", // 'ready' | 'thrust' | 'coast' | 'parachute' | 'landed' | 'tumble'
    trajectory: [{ x: 0, y: 0, t: 0, status: "ready" }],
    isStable,
    rocketArea,
    nozzleArea,
    cd,
    copRatio,
    comRatio,
  };
}

/**
 * Step rocket physics by dt (seconds)
 */
export function stepRocket(s, dt) {
  if (s.status === "landed" || s.y < 0) {
    s.y = 0;
    s.status = "landed";
    return s;
  }

  s.t += dt;

  const theta = s.pitch;
  const vTotal = Math.hypot(s.vx, s.vy);
  s.speed = vTotal;
  s.maxSpeed = Math.max(s.maxSpeed, vTotal);

  // 1. Water Thrust Phase
  let currentThrust = 0;
  if (s.waterRemaining > 0 && s.pressureGauge > 1000) {
    s.status = "thrust";
    // Bernoulli exit velocity: v_e = sqrt(2 * P_gauge / rho_water)
    const exitVelocity = Math.sqrt((2 * s.pressureGauge) / RHO_WATER);
    // Mass flow rate: m_dot = rho_water * A_nozzle * v_e
    const mDot = RHO_WATER * s.nozzleArea * exitVelocity;
    const waterDrained = Math.min(s.waterRemaining, (mDot / RHO_WATER) * dt);

    // Thrust = mDot * exitVelocity + P_gauge * A_nozzle
    currentThrust = mDot * exitVelocity + s.pressureGauge * s.nozzleArea;
    s.waterRemaining = Math.max(0, s.waterRemaining - waterDrained);

    // Adiabatic expansion: P * V^gamma = const
    const airInit = s.params.bottleVolume * (1 - s.params.waterFraction);
    const airCurrent = s.params.bottleVolume - s.waterRemaining;
    const initialAbsoluteP = s.params.pressureBar * 100000 + P_ATM;
    const pCurrentAbs = initialAbsoluteP * Math.pow(airInit / Math.max(0.0001, airCurrent), 1.4);
    s.pressureGauge = Math.max(0, pCurrentAbs - P_ATM);

    s.mass = s.params.dryMass + s.waterRemaining * RHO_WATER;
  } else if (s.status === "thrust") {
    s.status = "coast";
    s.thrust = 0;
  }

  s.thrust = currentThrust;

  // Unstable check (if no fins or CoM > CoP, rocket tumbles in air)
  if (!s.isStable && s.t > 0.15 && s.status !== "parachute" && s.status !== "landed") {
    s.status = "tumble";
  }

  // 2. Aerodynamic Drag
  let effectiveCd = s.cd;
  let effectiveArea = s.rocketArea;

  if (s.status === "tumble") {
    effectiveCd = 1.35; // broadside tumbling drag
    effectiveArea = s.rocketArea * 2.8;
  } else if (s.status === "parachute") {
    effectiveCd = 1.75; // parachute canopy drag
    effectiveArea = 0.25; // 0.25 m² parachute
  }

  const dragForce = 0.5 * RHO_AIR * (vTotal * vTotal) * effectiveCd * effectiveArea;
  s.drag = dragForce;

  // Drag vector is opposite to velocity
  const dragX = vTotal > 0.01 ? -dragForce * (s.vx / vTotal) : 0;
  const dragY = vTotal > 0.01 ? -dragForce * (s.vy / vTotal) : 0;

  // Thrust vector is along pitch (or erratic if tumbling)
  let thrustX = 0;
  let thrustY = 0;
  if (s.status === "tumble") {
    const tumbleAngle = s.pitch + Math.sin(s.t * 25) * 1.2;
    thrustX = currentThrust * Math.cos(tumbleAngle);
    thrustY = currentThrust * Math.sin(tumbleAngle);
    s.pitch = tumbleAngle;
  } else {
    thrustX = currentThrust * Math.cos(s.pitch);
    thrustY = currentThrust * Math.sin(s.pitch);
  }

  // Gravity
  const gravityY = -s.mass * G;
  s.gravity = s.mass * G;

  // Total force & acceleration
  const netFx = thrustX + dragX;
  const netFy = thrustY + dragY + gravityY;

  const ax = netFx / Math.max(0.01, s.mass);
  const ay = netFy / Math.max(0.01, s.mass);

  // Integrate velocity & position
  s.vx += ax * dt;
  s.vy += ay * dt;

  s.x += s.vx * dt;
  s.y += s.vy * dt;

  // Update pitch to align with velocity vector during coast
  if (s.status === "coast" && vTotal > 1) {
    s.pitch = Math.atan2(s.vy, s.vx);
  }

  // Apogee detection: when vertical velocity flips from positive to negative
  if (s.y > s.apogee) {
    s.apogee = s.y;
    s.apogeeTime = s.t;
  }

  // Parachute deployment at or just after apogee
  if (s.params.parachute && s.status === "coast" && s.vy < 0 && s.t > s.apogeeTime + 0.1) {
    s.status = "parachute";
  }

  // Impact / landing
  if (s.y <= 0 && s.t > 0.1) {
    s.y = 0;
    s.vy = 0;
    s.vx = 0;
    s.status = "landed";
    s.flightDuration = s.t;
  }

  // Record trajectory point every 0.05s
  if (s.trajectory.length === 0 || s.t - s.trajectory[s.trajectory.length - 1].t >= 0.05) {
    s.trajectory.push({
      x: Number(s.x.toFixed(2)),
      y: Number(s.y.toFixed(2)),
      t: Number(s.t.toFixed(2)),
      status: s.status,
    });
  }

  return s;
}

/**
 * Run full simulation until landing or timeout
 */
export function simulateRocketFlight(params = {}, maxTime = 30, dt = 0.01) {
  const state = initialRocketState(params);
  state.status = "thrust";

  while (state.status !== "landed" && state.t < maxTime) {
    stepRocket(state, dt);
  }

  return {
    apogee: Number(state.apogee.toFixed(1)),
    range: Number(state.x.toFixed(1)),
    maxSpeed: Number(state.maxSpeed.toFixed(1)),
    flightDuration: Number(state.t.toFixed(1)),
    isStable: state.isStable,
    status: state.status,
    trajectory: state.trajectory,
  };
}

/**
 * Educational DIY Projects Data
 */
export const DIY_PROJECTS = [
  {
    id: "water-rocket",
    title: "Պնևմատիկ/Ջրային Շշե Հրթիռ",
    subtitle: "Նյուտոնի 3-րդ օրենքը գործողության մեջ · Թռիչք մինչև 40 մետր",
    difficulty: "Միջին",
    buildTime: "30 րոպե",
    materials: [
      "1.5 լ կամ 2 լ գազավորված ըմպելիքի ամուր պլաստիկ շիշ",
      "Հեծանվային պոմպ (մանոմետրով) և ավտոմեքենայի/հեծանիվի փական (վենտիլ)",
      "Ռետինե խցան կամ գինու խցան՝ շշի բերանին հերմետիկ հարմարվող",
      "Հաստ ստվարաթուղթ կամ պլաստիկ թիթեղ՝ 3-4 կայունարար թևերի համար",
      "Կպչուն ժապավեն (սկոչ) կամ տաք սոսինձ",
      "Ջուր (շշի ծավալի 1/3-ը)",
    ],
    physicsSecret:
      "Ինչու՞ ջուր։ Միայն սեղմված օդով շշի արտանետած զանգվածը շատ փոքր է ($m_{\\text{օդ}} \\approx 2\\text{ գ}$), ուստի իմպուլսը ($p = mv$) չի բավականացնում։ Ջրի խտությունը 800 անգամ մեծ է օդից։ Երբ սեղմված օդը դուրս է մղում ջուրը մեծ արագությամբ, ռեակտիվ ուժը հրթիռը նետում է տասնյակ մետրեր վեր։ Իսկ հետևի թևերը Ճնշման Կենտրոնը (CoP) տանում են ետ՝ կանխելով օդում գլխիվայր պտտվելը (tumble)։",
    steps: [
      {
        title: "Քթամասի պատրաստում",
        detail: "Մեկ այլ շշի վերին մասը կտրիր կոնաձև և ամրացրու հրթիռի հատակին։ Քթամասի մեջ ավելացրու 20-30 գրամ պլաստիլին կամ թուղթ, որպեսզի Ծանրության Կենտրոնը (CoM) առաջ տեղափոխվի։",
      },
      {
        title: "Կայունարար թևերի ամրացում",
        detail: "Ստվարաթղթից կտրիր 3 կամ 4 եռանկյուն թև։ Շշի ներքևի մասում (փողակի մոտ) սիմետրիկորեն՝ 120° (կամ 90°) անկյան տակ, ամուր սոսնձիր թևերը։ Դրանք պետք է լինեն ուղիղ, ոչ ծուռ։",
      },
      {
        title: "Փականով խցանի հավաքում",
        detail: "Խցանի կենտրոնով անցկացրու հեծանվային փականը։ Այն պետք է լինի բացարձակ հերմետիկ, որպեսզի օդը չարտահոսի։",
      },
      {
        title: "Լիցքավորում և արձակում",
        detail: "Շշի մեջ լցրու 1/3 ջուր։ Հերմետիկ փակիր խցանով, հրթիռը տեղադրիր արձակման հենարանին (բաց տարածքում, մարդկանցից հեռու)։ Միացրու պոմպը և սկսիր օդ մղել մինչև 3–4 մթնոլորտ (բար)։ Խցանը դուրս կթռչի, և հրթիռը վեր կսլանա։",
      },
    ],
    troubleshooting: [
      "Եթե հրթիռը օդում պտտվում է կամ չի բարձրանում՝ թևերը բացակայում են, ծուռ են, կամ քթամասը բավարար ծանր չէ։",
      "Եթե շատ քիչ է թռչում՝ ջուրը կամ չափազանց շատ է (օդի տեղ չկա), կամ չափազանց քիչ (արտանետվող զանգված չկա)։ Օպտիմալը 30–35% ջուրն է։",
    ],
  },
  {
    id: "balloon-rocket",
    title: "Սենյակային Ռեակտիվ Փուչիկ-Հրթիռ",
    subtitle: "Գերարագ ցուցադրություն լարի վրա · 0 ծախս, 100% ֆիզիկա",
    difficulty: "Հեշտ",
    buildTime: "10 րոպե",
    materials: [
      "Երկարավուն կամ սովորական ռետինե փուչիկ",
      "Հյութի պլաստիկ ձողիկ (սլամիկ)",
      "4-6 մետր բարակ թել կամ ձկնորսական լար (մոնոֆիլամենտ)",
      "Կպչուն ժապավեն (սկոչ)",
      "Երկու աթոռ կամ հենարան՝ լարը ձգելու համար",
    ],
    physicsSecret:
      "Երբ փուչիկը փչում ենք, ռետինե պատերը սեղմում են ներսի օդը։ Բաց թողնելիս օդը բարձր արագությամբ դուրս է նետվում դեպի ետ։ Ըստ Նյուտոնի 3-րդ օրենքի՝ դուրս ժայթքող օդը հավասար և հակառակ ուղղված ուժով (ռեակտիվ քարշուժ) փուչիկին հրում է առաջ։ Ուղղորդող լարը վերացնում է քաոսային պտույտները և ցույց է տալիս ուղղագիծ արագացումը։",
    steps: [
      {
        title: "Լարի անցկացում",
        detail: "Թելն անցկացրու ձողիկի միջով և երկու ծայրերն ամուր կապիր երկու աթոռների միջև՝ սենյակի ողջ երկարությամբ։ Լարը պետք է լինի ձիգ։",
      },
      {
        title: "Փուչիկի պատրաստում",
        detail: "Փչիր փուչիկը, բայց մի՛ կապիր բերանը․ պահիր մատներով կամ փակիր գրասենյակային սեղմակով։",
      },
      {
        title: "Ամրացում ձողիկին",
        detail: "Երկու կտոր կպչուն ժապավենով փուչիկը զուգահեռ ամրացրու ձողիկի ներքևի մասին այնպես, որ փուչիկի բերանը նայի դեպի մեկնարկի կողմը։",
      },
      {
        title: "3… 2… 1… Մեկնարկ",
        detail: "Բաց թող փուչիկի բերանը։ Փուչիկը վայրկյանների ընթացքում սլանում է լարի ողջ երկայնքով։",
      },
    ],
    troubleshooting: [
      "Եթե փուչիկը կանգ է առնում կեսից՝ թելը բավարար ձիգ չէ կամ ձողիկը ծռվել է։ Օգտագործիր ավելի հարթ ձկնորսական թել։",
    ],
  },
  {
    id: "aeroglider",
    title: "Գերճշգրիտ Աերոդինամիկ Ճախրասավառնակ",
    subtitle: "Վերամբարձ ուժ, Բեռնուլիի օրենք և ինքնակայունացում",
    difficulty: "Միջին",
    buildTime: "20 րոպե",
    materials: [
      "A4 ֆորմատի խիտ գրասենյակային թուղթ կամ բարակ պենոպլաստ",
      "Մետաղական թղթի սեղմակ (սկրեպկա)՝ քթամասի ծանրության համար",
      "Մկրատ և քանոն",
      "Կպչուն ժապավեն",
    ],
    physicsSecret:
      "Ճախրասավառնակը շարժիչ չունի․ այն առաջ է շարժվում սկզբնական նետման էներգիայով և ծանրության հաշվին՝ սահելով օդի վրայով։ Թևերի թեթևակի V-աձև բարձրացումը (Dihedral angle) ստեղծում է ինքնակայունացում․ եթե սավառնակը թեքվում է մի կողմ, այդ կողմի թևն ավելի շատ վերամբարձ ուժ է ստանում և ուղղում է թռիչքը։ Ետևի եզրերի թեթև ծալքերը (էլևոններ) կարգավորում են բարձրությունը։",
    steps: [
      {
        title: "Թևերի ծալում և ձևավորում",
        detail: "Թուղթը երկայնքով ծալիր կիսով չափ։ Ստեղծիր լայն թևեր՝ հետևի եզրում ունենալով 5-8 մմ ազատ ղեկային շերտ (էլևոններ)։",
      },
      {
        title: "Dihedral (V-աձև) անկյան ստեղծում",
        detail: "Թևերը մի՛ պահիր հորիզոնական հարթ։ Կորպուսից թևերը թեթևակի (5-10°) բարձրացրու դեպի վեր, որպեսզի առջևից նայելիս ունենան V-աձև տեսք։",
      },
      {
        title: "Քթամասի բալանսավորում",
        detail: "Քթամասին ամրացրու 1 կամ 2 թղթի սեղմակ։ Առանց ծանր քթամասի սավառնակը օդում կտատանվի (stall) և կընկնի պոչի վրա։",
      },
      {
        title: "Կարգավորող թռիչքներ",
        detail: "Նետիր հարթ և մեղմ։ Եթե քթով ընկնում է՝ թեթևացրու քիթը կամ էլևոնները 1 մմ բարձրացրու վեր։ Եթե ալիքաձև է շարժվում՝ ծանրացրու քիթը։",
      },
    ],
    troubleshooting: [
      "Անկայուն թռիչք (դեպի վեր, ապա կտրուկ անկում) = Ծանրության կենտրոնը շատ ետ է։ Ավելացրու քթամասի սեղմակը։",
      "Շրջադարձ մի կողմ = Թևերից մեկը ծռված է։ Համեմատիր թևերի սիմետրիան քանոնով։",
    ],
  },
  {
    id: "paper-rotorcraft",
    title: "Ավտորոտացիոն Միկրո-Ուղղաթիռ",
    subtitle: "Օդի հանդիպակաց հոսքից ստեղծվող պտտող մոմենտ և սահուն վայրէջք",
    difficulty: "Հեշտ",
    buildTime: "5 րոպե",
    materials: [
      "Սովորական թուղթ (15 × 5 սմ շերտ)",
      "Մկրատ",
      "1 հատ մետաղական թղթի սեղմակ",
    ],
    physicsSecret:
      "Երբ սարքն ընկնում է, ներքևից բարձրացող օդի հոսքը ճնշում է երկու հակադիր ծալված թևերին։ Քանի որ թևերը ծալված են հակառակ ուղղություններով, օդի դիմադրության ուժերը ստեղծում են պտտող մոմենտ (Torque): Սարքը սկսում է արագ պտտվել (ավտորոտացիա)։ Պտտվող թևերը վերածվում են «օդային պտուտակի», որը դանդաղեցնում է վայրէջքը ճիշտ պարաշյուտի պես։ Բնության մեջ նույն սկզբունքով են պտտվելով իջնում թխկենու (կլյոնի) սերմերը։",
    steps: [
      {
        title: "Կտրվածքների պատրաստում",
        detail: "Թղթի վերին կեսը երկայնքով կտրիր կենտրոնից՝ ստեղծելով երկու թև (A և B)։ Մեջտեղից կատարիր երկու փոքր հորիզոնական կտրվածք կողքերից։",
      },
      {
        title: "Թևերի հակառակ ծալում",
        detail: "Մեկ թևը ծալիր առաջ, իսկ մյուսը՝ ետ (մոտ 80-90° անկյան տակ)։",
      },
      {
        title: "Ուղղաձիգ ոտքի ձևավորում",
        detail: "Ներքևի կողային մասերը ծալիր դեպի ներս, ապա ծայրը 1 սմ ծալիր վեր և ամրացրու թղթի սեղմակով՝ ծանրության համար։",
      },
      {
        title: "Արձակում բարձրությունից",
        detail: "Բարձրացրու գլխավերև և բաց թող։ Այն միլիվայրկյանների ընթացքում կսկսի սահուն պտտվել և հանդարտ իջնել հատակին։",
      },
    ],
    troubleshooting: [
      "Եթե ընկնում է առանց պտտվելու՝ սեղմակը չափազանց ծանր է կամ թևերը բավարար բացված չեն։ Թևերը թեթևակի բացիր հորիզոնականից վեր։",
    ],
  },
  {
    id: "walkalong-glider",
    title: "Քայլող Սավառնակ (Air Surfer)",
    subtitle: "Անվերջ սավառնում՝ ստվարաթղթով ստեղծվող արհեստական վերընթաց հոսանքի վրա",
    difficulty: "Միջին",
    buildTime: "15 րոպե",
    materials: [
      "Թեթև նոթատետրի թուղթ կամ պոլիստիրոլ (տարրա) շերտ",
      "Մկրատ և քանոն",
      "Մեծ ստվարաթուղթ (40 × 50 սմ)՝ որպես օդային սերֆինգի վահան",
    ],
    physicsSecret:
      "Երբ դու քայլում ես առաջ՝ ստվարաթուղթը պահելով 45° անկյան տակ, հանդիպակաց օդի հոսքը շեղվում է վեր՝ ստեղծելով ուժեղ լեռնային վերընթաց հոսանք (Ridge Updraft)։ Սավառնակը տեղադրվում է այդ հոսանքի գագաթին․ նրա բնական իջեցման արագությունը (sink rate) հավասարակշռվում է բարձրացող օդով, և այն թռչում է անվերջ՝ առանց որևէ շարժիչի կամ մարտկոցի։",
    steps: [
      {
        title: "Գերթեթև թևի կտրում",
        detail: "Թղթից կտրիր 20 × 5 սմ շերտ։ Առջևի եզրը 3 անգամ բարակ (3 մմ) ծալիր առաջ՝ քաշը կենտրոնացնելու համար։",
      },
      {
        title: "Կայունարար ականջների (winglets) ծալում",
        detail: "Երկու կողմերի ծայրերից 1.5 սմ ծալիր ուղղահայաց վեր (90°), որպեսզի սավառնակը չշեղվի կուրսից։",
      },
      {
        title: "Ստվարաթղթե ալիքի ստեղծում",
        detail: "Վերցրու ստվարաթուղթը, բռնիր երկու ձեռքով 45° թեքությամբ և սկսիր հանգիստ քայլել սենյակով մեկ։",
      },
      {
        title: "Սերֆինգ օդային ալիքի վրա",
        detail: "Սավառնակը զգուշորեն բաց թող ստվարաթղթի վերին եզրից 15 սմ առաջ։ Քայլիր նրա ետևից՝ պահպանելով հեռավորությունը։ Սավառնակը կսահի օդի ալիքի վրայով։",
      },
    ],
    troubleshooting: [
      "Եթե սավառնակը կտրուկ ընկնում է՝ քայլիր մի փոքր ավելի արագ կամ թեքիր ստվարաթուղթը մի փոքր ավելի կտրուկ։",
      "Եթե շրջվում է դեպի քեզ՝ ստվարաթուղթը շատ մոտ է սավառնակին։",
    ],
  },
  {
    id: "micro-drone-rig",
    title: "Քվադրոկոպտերի Իմպուլսի Մոմենտների Ստենդ",
    subtitle: "Հակադիր պտտվող զույգերի (CW/CCW) ռեակտիվ պտտող մոմենտի ցուցադրություն",
    difficulty: "Բարդ",
    buildTime: "30 րոպե",
    materials: [
      "2 հատ պլաստիկ հյութի ձողիկ (խաչաձև ամրացված)",
      "4 հատ փոքր խաղալիք պտուտակ (2 CW, 2 CCW)",
      "Թել կամ առանցքակալով ասեղ կենտրոնում",
    ],
    physicsSecret:
      "Եթե միացնենք միայն 1 շարժիչ, ձողիկների խաչը կսկսի կատաղի պտտվել հակառակ ուղղությամբ (Նյուտոնի 3-րդ օրենք և իմպուլսի պտտման մոմենտի պահպանում)։ Բայց երբ միացնում ենք 2 ժամսլաքով (CW) և 2 հակառակ (CCW) պտուտակները հավասար արագությամբ, նրանց օդային ռեակտիվ մոմենտները ճշգրիտ զրոյացնում են միմյանց ($\\\\tau_{\\\\text{net}} = 0$), և դրոնը մնում է կատարյալ անշարժ։",
    steps: [
      {
        title: "Խաչաձև կորպուսի պատրաստում",
        detail: "Երկու ձողիկները մեջտեղից սոսնձիր խաչաձև (90° անկյան տակ)։ Կենտրոնում անցկացրու բարակ ասեղ՝ ազատ պտտման առանցք ապահովելու համար։",
      },
      {
        title: "Պտուտակների ճիշտ տեղադրում",
        detail: "1-ին և 3-րդ ծայրերին տեղադրիր CW պտուտակները, իսկ 2-րդ և 4-րդ ծայրերին՝ CCW պտուտակները։",
      },
      {
        title: "Ռեակտիվ պտույտի (Yaw) փորձ",
        detail: "Պտտիր միայն 1 պտուտակը․ ամբողջ կառուցվածքը կսկսի պտտվել հակառակ ուղղությամբ։ Այժմ պտտիր բոլոր 4-ը․ կառուցվածքը կմնա անշարժ՝ բարձրանալով վեր։",
      },
    ],
    troubleshooting: [
      "Եթե ստենդը ինքնաբերաբար պտտվում է՝ ստուգիր, որ CW և CCW պտուտակները շփոթված չլինեն տեղերով։",
    ],
  },
  {
    id: "jet-car",
    title: "Պնևմատիկ Ռեակտիվ Ավտոմեքենա (Jet Car)",
    subtitle: "Նյուտոնի 3-րդ օրենքը ցամաքային արագության վրա · Փուչիկային ռեակտիվ քարշ",
    difficulty: "Հեշտ",
    buildTime: "20 րոպե",
    materials: [
      "1 հատ թեթև պլաստիկ շիշ կամ հյութի տուփ (կորպուս)",
      "4 հատ պլաստիկ կափարիչ (անիվներ) և 2 հատ փայտե շամփուր (առանցքներ)",
      "2 հատ ըմպելիքի ձողիկ (առանցքակալներ)",
      "1 հատ մեծ փուչիկ և 1 հատ լայն ձողիկ (ռեակտիվ ծայրափողակ)",
    ],
    physicsSecret:
      "Երբ փուչիկից սեղմված օդը մեծ արագությամբ դուրս է ժայթքում ետևի ծայրափողակից, օդի իմպուլսը ($p = m v$) առաջ է մղում մեքենան ճիշտ նույն հակադիր ուժով ($F = \\dot{m} v_e$)։ Ծայրափողակի տրամագծի մեծացումը մեծացնում է քարշուժը, բայց արագ սպառում է օդը, իսկ նեղ ծայրափողակն ապահովում է երկարատև սահուն արագացում։",
    steps: [
      {
        title: "Շասսիի և անիվների հավաքում",
        detail: "Շշի կողքերին սոսնձիր երկու լայն ձողիկներ։ Դրանց միջով անցկացրու փայտե շամփուրները և ծայրերին ամրացրու կափարիչ-անիվները։ Ստուգիր, որ անիվները ազատ պտտվեն։",
      },
      {
        title: "Ռեակտիվ շարժիչի մոնտաժ",
        detail: "Փուչիկի բերանին ամուր իզոլենտով ամրացրու լայն ձողիկը։ Ամբողջ հանգույցը հորիզոնական ամրացրու մեքենայի տանիքին՝ ձողիկի ծայրը ուղղելով ետ։",
      },
      {
        title: "Լիցքավորում և արշավ",
        detail: "Փչիր փուչիկը ձողիկի միջով, փակիր մատով, տեղադրիր հարթ հատակին և բաց թող։ Ռեակտիվ շիթը մեքենան առաջ կնետի հսկայական արագությամբ։",
      },
    ],
    troubleshooting: [
      "Եթե մեքենան շեղվում է կողք՝ անիվների առանցքները զուգահեռ չեն։",
      "Եթե տեղից չի շարժվում՝ շփումը մեծ է առանցքների վրա, կամ փուչիկը չափազանց ծանր է նստած անիվների վրա։",
    ],
  },
  {
    id: "diy-wind-tunnel",
    title: "Ծխային Աերոդինամիկ Խողովակ (DIY Smoke Tunnel)",
    subtitle: "Հոսքագծերի և Բեռնուլիի վերամբարձ ուժի տեսանելի փորձարկում",
    difficulty: "Բարդ",
    buildTime: "40 րոպե",
    materials: [
      "Թափանցիկ երկար պլաստիկ արկղ կամ մեծ 2.5լ շիշ (երկու ծայրերը կտրված)",
      "12V համակարգչային հովացուցիչ (cooler fan) կամ վարսահարդարիչ (սառը ռեժիմով)",
      "30 հատ հյութի ձողիկներ (մեղրախորիսխային հոսքի ուղղիչ / honeycomb grid)",
      "Խնկի ձողիկ (անվնաս ծխի աղբյուր) և ստվարաթղթե թևի մոդել",
    ],
    physicsSecret:
      "Համակարգչային հովացուցիչը ստեղծում է քաշող օդահոսք։ Ձողիկների մեղրախորիսխը (Honeycomb) հեռացնում է քաոսային տուրբուլենտությունը և ստեղծում զուգահեռ լամինար հոսք։ Երբ խնկի ծուխը մտնում է խողովակ, ծխի բարակ շերտերը հստակ ցույց են տալիս, թե ինչպես են մասնիկները շրջանցում թևի կորությունը և արագանում վերին մակերեսին։",
    steps: [
      {
        title: "Մեղրախորիսխի պատրաստում",
        detail: "Ձողիկները կտրիր 4 սմ երկարությամբ և կապոցով սոսնձիր իրար։ Տեղադրիր խողովակի մուտքին՝ օդի հոսքը հարթելու համար։",
      },
      {
        title: "Փորձարկման խցիկի տեղադրում",
        detail: "Խողովակի կենտրոնում բարակ մետաղալարով կախիր փոքրիկ թևի պրոֆիլը՝ թույլ տալով փոխել գրոհի անկյունը։",
      },
      {
        title: "Ծխի մատակարարում և աշխատանք",
        detail: "Միացրու հովացուցիչը։ Մուտքի մոտ տեղադրիր ծխացող խնկի ձողիկը։ Դիտիր, թե ինչպես են ծխի շերտերը սահում թևի վրայով և ինչպես է առաջանում հոսքի պոկում (stall) մեծ անկյունների դեպքում։",
      },
    ],
    troubleshooting: [
      "Եթե ծուխը խառնվում է քաոսային՝ հովացուցիչը շատ ուժեղ է կամ մեղրախորիսխը շատ կարճ է։",
    ],
  },
  {
    id: "flettner-glider",
    title: "Մագնուսի Էֆեկտով Թռչող Գլան (Ֆլետների Սավառնակ)",
    subtitle: "Պտտվող մարմնի աերոդինամիկ վերամբարձ ուժ · Բեռնուլիի օրենքը գործողության մեջ",
    difficulty: "Հեշտ",
    buildTime: "15 րոպե",
    materials: [
      "2 միատեսակ թղթե կամ պլաստիկ բաժակ (200-300 մլ)",
      "Կպչուն ժապավեն (սկոչ կամ էլեկտրոիզոլացիոն ժապավեն)",
      "3-4 հատ սովորական ռետինե օղակներ (փողկապ ռետիններ)",
      "Փայտե քանոն կամ ձողիկ (որպես արձակման բռնակ)",
    ],
    physicsSecret:
      "Մագնուսի էֆեկտ. Երբ ետադարձ պտույտով (backspin) արձակված գլանը սլանում է առաջ, վերին մակերևույթի պտույտի ուղղությունը համընկնում է հանդիպակաց օդահոսքին՝ արագացնելով այն (նվազեցնելով ճնշումը ըստ Բեռնուլիի)։ Ներքևում շարժումը հակառակ է, և ճնշումը բարձրանում է։ Առաջացած հսկայական վերամբարձ ուժը և ներքև շեղված օդահոսքը (downwash) ստիպում են գլանին սահուն ճախրել օդում՝ հաղթահարելով գրավիտացիան։",
    steps: [
      {
        title: "Գլանի միացում",
        detail: "Երկու բաժակների հատակները դեմ-դիմաց ամուր կպցրու լայն կպչուն ժապավենով։ Պետք է ստացվի ավազե ժամացույցի տեսք ունեցող համաչափ գլան։",
      },
      {
        title: "Ռետինե շղթայի պատրաստում",
        detail: "3 կամ 4 ռետինները հանգույցով միացրու իրար՝ ստանալով 30-40 սմ երկարությամբ առաձգական շղթա։ Մի ծայրը կապիր քանոնի ծայրին։",
      },
      {
        title: "Լիցքավորում ետադարձ պտույտով",
        detail: "Ռետինի ազատ ծայրը սեղմիր բաժակների միացման հատվածին և ռետինը 2-3 պտույտով ամուր փաթաթիր մեջտեղում՝ ՆԵՐՔԵՎԻՑ ՎԵՐԵՎ, որպեսզի բաց թողնելիս այն պտտվի դեպի ետ (backspin)։",
      },
      {
        title: "Արձակում",
        detail: "Ձախ ձեռքով առաջ մեկնիր քանոնը, աջով ձգիր գլանը դեպի քեզ (ինչպես պարսատիկը) և բաց թող։ Գլանը կտրուկ վեր կսլանա և կսկսի ճախրել։",
      },
    ],
    troubleshooting: [
      "Եթե գլանը անմիջապես սուզվում է գետին՝ ռետինը փաթաթել ես սխալ ուղղությամբ (topspin), որն առաջացնում է ներքև սեղմող ուժ։ Փաթաթիր ներքևից վերև։",
      "Եթե թռիչքը ծուռ է՝ բաժակները սոսնձված են ոչ կենտրոնական։ Ուղղիր սիմետրիան։",
    ],
  },
  {
    id: "gravity-well",
    title: "Տարածաժամանակի և Օրբիտալ Գրավիտացիոն Ջրհոր",
    subtitle: "Կեպլերի օրբիտաներ, արբանյակների պտույտ և էյնշտեյնյան տարածության կորություն",
    difficulty: "Միջին",
    buildTime: "30 րոպե",
    materials: [
      "Էլաստիկ ձգվող կտոր (սպանդեքս կամ լայկրա, 1x1 մետր)",
      "Մեծ կլոր շրջանակ կամ օղակ (հուլա-հուպ կամ կլոր սեղանի հիմք, 80-100 սմ)",
      "6-8 հատ գրասենյակային ամուր սեղմակներ (կլիպսեր)",
      "Կենտրոնական ծանր գունդ (500 գ - 1 կգ մետաղական գունդ կամ ծանրաքար)",
      "Մանր մետաղական և ապակե գնդիկներ (մարբլներ, 5-20 գրամ)",
    ],
    physicsSecret:
      "Կտորի կորությունը մոդելավորում է $U(r) \\sim -1/r$ գրավիտացիոն պոտենցիալ դաշտը։ Շոշափող արագությամբ նետված գնդիկները գծում են էլիպսաձև Կեպլերյան ուղեծրեր։ Երբ շփումը դանդաղեցնում է գնդիկը, նրա օրբիտան պարուրաձև նեղանում է՝ ցուցադրելով արհեստական արբանյակների մթնոլորտային արգելակումն ու անկումը։",
    steps: [
      {
        title: "Թաղանթի ձգում",
        detail: "Սպանդեքս կտորը հավասարաչափ ձգիր օղակի վրա և ամրացրու սեղմակներով։ Կտորը պետք է լինի հարթ, առանց ծալքերի։",
      },
      {
        title: "Ձգողության կենտրոնի ստեղծում",
        detail: "Ծանր գունդը դիր կտորի ճիշտ կենտրոնում։ Այն կձևավորի խորը գրավիտացիոն փոս (ջրհոր)։",
      },
      {
        title: "Օրբիտալ արձակում",
        detail: "Վերցրու փոքր գնդիկը և նետիր կենտրոնի շուրջ շոշափող ուղղությամբ (ոչ թե դեպի կենտրոն)։ Գտիր այն արագությունը, որի դեպքում գնդիկը կատարում է կայուն շրջանաձև պտույտ։",
      },
    ],
    troubleshooting: [
      "Եթե գնդիկը միանգամից ընկնում է կենտրոն՝ նետման հորիզոնական արագությունը փոքր է առաջին տիեզերական արագությունից ($v_0 < v_1$)։",
      "Եթե գնդիկը դուրս է թռչում օղակից՝ արագությունը գերազանցել է խույսի արագությունը ($v_0 > v_{\\text{esc}}$)։",
    ],
  },
];

/**
 * Bite-sized Conceptual Challenges (AeroQuiz)
 */
export const AERO_CHALLENGES = [
  {
    id: "rocket-water-why",
    question: "Ինչու՞ է 1/3 ջրով լցված հրթիռը թռչում շատ ավելի բարձր, քան միայն սեղմված օդով լցված նույն հրթիռը։",
    options: [
      "Ջուրը հեղուկ է և քսանյութի պես նվազեցնում է շշի շփումը օդի հետ",
      "Ջրի խտությունը մեծ է, ուստի արտանետվող զանգվածն ու ռեակտիվ իմպուլսը շատ ավելի հզոր են",
      "Ջուրը շոգիանում է և ստեղծում գերտաք գոլորշու ատոմային ճնշում",
      "Միայն օդով հրթիռը չափազանց թեթև է, ուստի ձգողականության ուժը նրան չի կարողանում հրել",
    ],
    correct: 1,
    explanation:
      "Ճիշտ է։ Ռեակտիվ շարժման իմպուլսը որոշվում է արտանետվող զանգվածի և արագության արտադրյալով ($p = m v$): Ջրի խտությունը 800 անգամ մեծ է օդից, ուստի նույն ճնշման տակ դուրս ժայթքող ջուրը հաղորդում է շատ ավելի մեծ քարշուժ ($F_{\\text{քարշ}} = \\dot{m} v_e$):",
  },
  {
    id: "rocket-fin-stability",
    question: "Ի՞նչ տեղի կունենա, եթե հրթիռի վրայից ամբողջությամբ հեռացնենք հետևի կայունարար թևերը (fins)։",
    options: [
      "Հրթիռը կթռչի շատ ավելի ուղիղ, քանի որ չկա թևերի ավելորդ քաշ",
      "Հրթիռը կհասնի լուսնին, քանի որ օդի դիմադրությունը կդառնա զրո",
      "Հրթիռը օդում կկորցնի կայունությունը, կսկսի քաոսային պտտվել (tumble) և կընկնի",
      "Հրթիռը կմնա արձակման հարթակին և ընդհանրապես չի պոկվի գետնից",
    ],
    correct: 2,
    explanation:
      "Ճիշտ է։ Կայուն թռիչքի համար Ճնշման Կենտրոնը (CoP) պետք է գտնվի Ծանրության Կենտրոնից (CoM) ետ։ Թևերը մեծացնում են հետևամասի մակերեսը և CoP-ն տանում են ետ։ Առանց թևերի հրթիռն անկայուն է և օդում սկսում է պտտվել։",
  },
  {
    id: "airfoil-stall",
    question: "Երբ ինքնաթիռի թևի գրոհի անկյունը (Angle of Attack) գերազանցում է ~15°-ը, ի՞նչ է տեղի ունենում (Stall երևույթ)։",
    options: [
      "Վերամբարձ ուժը անվերջ աճում է և ինքնաթիռը դուրս է գալիս տիեզերք",
      "Օդի հոսքը պոկվում է թևի վերին մակերեսից (separation), վերամբարձ ուժը կտրուկ ընկնում է, իսկ դիմադրությունը՝ աճում",
      "Օդի ջերմաստիճանը թևի վրա հասնում է 1000°C-ի և հալեցնում այն",
      "Թևը սկսում է ինքնուրույն թափահարել թռչունի պես",
    ],
    correct: 1,
    explanation:
      "Ճիշտ է։ Շեղման (stall) կետում օդի հոսքը չի հասցնում շրջանցել թևի կորությունը, առաջանում են հզոր մրրիկներ, և վերամբարձ ուժը կտրուկ նվազում է։ Օդաչուները պետք է իջեցնեն քիթը՝ հոսքը վերականգնելու համար։",
  },
  {
    id: "quadcopter-angular-momentum",
    question: "Ինչու՞ են քվադրոկոպտերի 4 պտուտակներից 2-ը պտտվում ժամսլաքի (CW), իսկ 2-ը՝ հակառակ (CCW) ուղղությամբ։",
    options: [
      "Իմպուլսի պտտման մոմենտների փոխադարձ չեզոքացման համար, որպեսզի դրոնի կորպուսը չպտտվի իր առանցքի շուրջ",
      "Որպեսզի մարտկոցը ավելի քիչ տաքանա",
      "Քամուց պաշտպանվելու համար",
      "Զուտ գեղագիտական սիմետրիայի համար",
    ],
    correct: 0,
    explanation:
      "Ճիշտ է։ Յուրաքանչյուր պտտվող պտուտակ օդի դիմադրության պատճառով ստեղծում է հակադարձ ռեակտիվ մոմենտ։ Զույգերով հակառակ պտտելով՝ CW և CCW մոմենտները չեզոքացնում են միմյանց, և դրոնը մնում է ուղիղ։ Եթե ցանկանում ենք դրոնը պտտել (Yaw), մի զույգի արագությունը մեծացնում ենք մյուսի համեմատ։",
  },
  {
    id: "supersonic-mach-cone",
    question: "Ինչու՞ է գերձայնային արագությամբ ($M > 1$) թռչող ինքնաթիռի ետևում առաջանում կոնաձև հարվածային ալիք (Մախի կոն)։",
    options: [
      "Ինքնաթիռի շարժիչից արտանետվող գազերն են ստեղծում այդ կոնաձև տեսքը",
      "Ինքնաթիռը շարժվում է ձայնային ալիքներից ավելի արագ, ուստի նրա առաջացրած ակուստիկ ալիքները չեն հասցնում առաջ անցնել և կուտակվում են կոնի մակերևույթին",
      "Օդը սառչում է և վերածվում սառցե կոնի",
      "Ինքնաթիռի զանգվածը կրկնապատկվում է ձայնային պատնեշի մոտ",
    ],
    correct: 1,
    explanation:
      "Ճիշտ է։ Ձայնը տարածվում է գնդաձև ալիքներով։ Երբ $v > a$, ինքնաթիռը առաջ է անցնում իր սեփական ձայնային ալիքներից։ Բոլոր անցյալ ալիքների շոշափող եզրերը միասին ձևավորում են կոնաձև ճակատ՝ Մախի կոնը, որտեղ անկյունը որոշվում է $\\sin\\mu = 1/M$ բանաձևով։",
  },
  {
    id: "rotorcraft-autorotation",
    question: "Ինչի՞ շնորհիվ է թղթե միկրո-ուղղաթիռը կամ թխկենու սերմը պտտվելով դանդաղ իջնում գետնին։",
    options: [
      "Թևերի հակառակ ծալվածքի վրա ներքևից եկող օդի հոսքը ստեղծում է պտտող մոմենտ (ավտորոտացիա)",
      "Ներսում թաքնված փոքրիկ մարտկոցը պտտում է առանցքը",
      "Երկրի մագնիսական դաշտը վանում է թուղթը դեպի վեր",
      "Թուղթը տաքանում է արևից և բարձրանում օդապարիկի նման",
    ],
    correct: 0,
    explanation:
      "Ճիշտ է։ Իջնելիս հանդիպակաց օդի հոսքը հրում է թևերին։ Շնորհիվ հակադիր թեքության՝ առաջանում է պտտող մոմենտ։ Պտույտի շնորհիվ թևերը աշխատում են որպես պտուտակ՝ ստեղծելով վերամբարձ ուժ և ապահովելով սահուն վայրէջք։",
  },
  {
    id: "turbofan-bypass-ratio",
    question: "Ինչու՞ են ժամանակակից ուղևորատար ինքնաթիռներում օգտագործվում բարձր երկկոնտուրության (High-Bypass, BPR > 8) տուրբովենտիլյատորային շարժիչներ։",
    options: [
      "Նրանք ավելի գեղեցիկ և փայլուն տեսք ունեն թևի տակ",
      "Շրջանցման հոսքի մեծ զանգվածը ավելի ցածր արագությամբ արտանետելով՝ կտրուկ բարձրանում է պրոպուլսիվ օ.գ.գ.-ն և նվազում վառելիքի ծախսը",
      "Որովհետև նրանց ներսում վառելիք ընդհանրապես չի այրվում",
      "Որպեսզի ինքնաթիռը կարողանա թռչել միայն հակառակ ուղղությամբ",
    ],
    correct: 1,
    explanation:
      "Ճիշտ է։ Շարժիչի պրոպուլսիվ օգտակար գործողության գործակիցը $\\eta = 2 v_0 / (v_e + v_0)$ է։ Փոքր քանակությամբ գազը գերարագ արտանետելու փոխարեն, բարձր BPR ֆենը մղում է հսկայական զանգվածով սառը օդ համեմատաբար ցածր արագությամբ։ Արդյունքում ստացվում է նույն հզոր քարշուժը ($F = \\dot{m}\\Delta v$), սակայն ծախսվում է 25-30% ավելի քիչ վառելիք և շարժիչը շատ ավելի անաղմուկ է։",
  },
  {
    id: "bernoulli-camber-pressure",
    question: "Ինչի՞ հետևանքով է թռչող ինքնաթիռի թևի վերին կոր մակերեսին (camber) առաջանում ցածր ճնշման գոտի (վերամբարձ ուժ)։",
    options: [
      "Վերևի օդը տաքանում է արևից և նոսրանում",
      "Թևի կորության պատճառով վերին օդահոսքի մասնիկները արագանում են ($v_1 > v_2$), ինչը ըստ Բեռնուլիի օրենքի ($P + \\frac{1}{2}\\rho v^2 = \\text{const}$) առաջացնում է ճնշման անկում",
      "Թևի վերևում առաջանում է բացարձակ վակուում",
      "Երկրի մագնիսական դաշտը վանում է օդի մոլեկուլները",
    ],
    correct: 1,
    explanation:
      "Ճիշտ է։ Թևի վերին ուռուցիկ մակերեսով անցնելիս հոսքագծերը խտանում են, և օդի մասնիկներն արագանում են։ Համաձայն Բեռնուլիի հավասարման՝ արագության աճը հանգեցնում է ստատիկ ճնշման նվազման ($P_{\\text{վերև}} < P_{\\text{ներքև}}$)։ Ճնշումների այս տարբերությունն էլ ($\Delta P$) ստեղծում է վերամբարձ ուժը ($L = \\Delta P \\cdot S$)։",
  },
  {
    id: "orbital-newton-cannon",
    question: "Ինչու՞ տիեզերակայանում (ISS, բարձրությունը 400 կմ) գտնվող տիեզերագնացները գտնվում են անկշռության վիճակում։",
    options: [
      "Որովհետև 400 կմ բարձրության վրա Երկրի ձգողականության ուժը (գրավիտացիան) դառնում է զրո",
      "Որովհետև տիեզերակայանն ու տիեզերագնացները գտնվում են Երկրի շուրջ շարունակական անվերջ ազատ անկման մեջ ($v_1 \\approx 7.7$ կմ/վ արագությամբ), իսկ գրավիտացիան այնտեղ նվազել է ընդամենը ~10%-ով ($g \\approx 8.7$ մ/վ²)",
      "Որովհետև կայանի պատերը պաշտպանում են գրավիտացիոն դաշտից",
      "Որովհետև այնտեղ օդի բացակայությունը վերացնում է զանգվածը",
    ],
    correct: 1,
    explanation:
      "Ճիշտ է։ Շատ տարածված սխալ է կարծել, թե ուղեծրում գրավիտացիա չկա։ 400 կմ բարձրության վրա Երկրի գրավիտացիոն ձգողությունը $g = 8.7$ մ/վ² է (գետնի 90%-ը)։ Անկշռությունը առաջանում է նրանից, որ կայանն անընդհատ «ընկնում է» Երկրի վրա, բայց իր հորիզոնական մեծ արագության ($v_1$) պատճառով Երկրի մակերևույթը նույն տեմպով կորանում է նրա տակ, և կայանը երբեք չի հասնում գետնին։",
  },
  {
    id: "helicopter-swashplate-physics",
    question: "Ի՞նչ տարբերություն կա ուղղաթիռի Համատարած քայլի (Collective Pitch) և Շրջափուլային քայլի (Cyclic Pitch) միջև։",
    options: [
      "Համատարած քայլը փոխում է պտուտակի գույնը, իսկ շրջափուլայինը՝ երկարությունը",
      "Համատարած քայլը (Collective) միաժամանակ փոխում է բոլոր թիակների անկյունը՝ կառավարելով վերելքն ու իջեցումը, իսկ Շրջափուլային քայլը (Cyclic) փոխում է թիակների անկյունը պտույտի փուլին համապատասխան՝ թեքելով սկավառակը առաջ/ետ/կողք",
      "Ուղղաթիռը միայն շրջափուլային քայլ ունի, համատարածը ինքնաթիռներինն է",
      "Համատարած քայլը պտտում է պոչը, իսկ շրջափուլայինը՝ անիվները",
    ],
    correct: 1,
    explanation:
      "Ճիշտ է։ Swashplate (լիցքաթիթեղ) մեխանիզմը կատարում է այս հրաշալի ֆունկցիան։ Լիցքաթիթեղը վեր-վար շարժելով՝ մեծանում է բոլոր թիակների գրոհի անկյունը (վերամբարձ ուժ $L$), իսկ այն թեքելով՝ առաջանում է ցիկլիկ անկյունային փոփոխություն, որը 90° գիրոսկոպիկ պրեցեսիայի շնորհիվ թեքում է ողջ քարշուժի վեկտորը թռիչքի ուղղությամբ։",
  },
];

/**
 * Duolingo-style Achievement Badges & Lab Mastery System
 */
export const AERO_BADGES = [
  {
    id: "badge-rocket",
    icon: "🚀",
    title: "Հրթիռաշինարար",
    desc: "Արձակիր ջրային հրթիռը 30 մետրից ավելի բարձր",
    points: 200,
    check: (aero) => (aero.rocket?.apogee || 0) >= 30,
  },
  {
    id: "badge-drone",
    icon: "🛸",
    title: "Աերոդինամիկայի Վարպետ",
    desc: "Դրոնի կատարյալ հովերինգ առանց շեղման (Yaw = 0)",
    points: 250,
    check: (aero) => {
      const p = dronePhysicsModel({ motors: aero.drone?.motors || [] });
      return p.isHovering;
    },
  },
  {
    id: "badge-bernoulli",
    icon: "💨",
    title: "Բեռնուլիի Հետազոտող",
    desc: "Հասիր L/D > 8 գործակցի առանց թևի շեղման (stall)",
    points: 250,
    check: (aero) => {
      const f = airfoilForces({ angleDeg: aero.tunnel?.angleDeg, airSpeed: aero.tunnel?.airSpeed });
      return !f.stall && f.liftToDrag >= 8;
    },
  },
  {
    id: "badge-supersonic",
    icon: "⚡",
    title: "Գերձայնային Պիլոտ",
    desc: "Ճեղքիր ձայնային պատնեշը (Mach ≥ 1.2)",
    points: 350,
    check: (aero) => (aero.supersonic?.mach || 0) >= 1.2,
  },
  {
    id: "badge-turbofan",
    icon: "✈️",
    title: "Ռեակտիվ Ճարտարագետ",
    desc: "Բարձր երկկոնտուրային շարժիչով հասիր >80% քարշուժի բաժնեմասի շրջանցման հոսքում",
    points: 500,
    check: (aero) => {
      const j = turbofanBraytonModel(aero.jet || {});
      return j.bypassThrustPercent >= 80;
    },
  },
  {
    id: "badge-orbital",
    icon: "🛰️",
    title: "Ուղեծրային Պիոներ",
    desc: "Արբանյակը դուրս բեր կայուն շրջանաձև LEO ուղեծիր (1-ին տիեզերական արագություն)",
    points: 450,
    check: (aero) => {
      const o = orbitPhysicsModel(aero.orbit || {});
      return o.status === 'circular';
    },
  },
  {
    id: "badge-escape",
    icon: "🌌",
    title: "Տիեզերագնաց",
    desc: "Հասիր խույսի արագության (2-րդ տիեզերական արագություն, v ≥ 10.8 կմ/վ)",
    points: 600,
    check: (aero) => {
      const o = orbitPhysicsModel(aero.orbit || {});
      return o.status === 'hyperbolic' || o.status === 'parabolic';
    },
  },
  {
    id: "badge-helicopter",
    icon: "🚁",
    title: "Ուղղաթիռի Աս",
    desc: "Ստացիր հովերինգի կատարյալ հավասարակշռություն և կառավարիր պոչային հակամոմենտը",
    points: 400,
    check: (aero) => {
      const h = helicopterSwashplateModel(aero.helicopter || {});
      return h.isHovering;
    },
  },
  {
    id: "badge-aeroquiz",
    icon: "🏆",
    title: "Ավիացիայի Գիտնական",
    desc: "Պատասխանիր բոլոր հարցերին AeroQuiz-ում",
    points: 300,
    check: (aero) => (aero.quiz?.score || 0) >= 8,
  },
];

