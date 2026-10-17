import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  airfoilForces,
  initialRocketState,
  stepRocket,
  simulateRocketFlight,
  dronePhysicsModel,
  supersonicMachModel,
  turbofanBraytonModel,
  orbitPhysicsModel,
  helicopterSwashplateModel,
  AERO_CHALLENGES,
  DIY_PROJECTS,
  AERO_BADGES,
} from '../src/labs/aerolab-models.js';

const near = (a, b, eps = 1e-3) =>
  assert.ok(Math.abs(a - b) < eps, `${a} is not near ${b} (diff: ${Math.abs(a - b)})`);

test('Airfoil aerodynamics: linear lift slope, drag and stall angle', () => {
  // At small positive angle (4°), positive lift and low drag
  const normal = airfoilForces({ angleDeg: 4, airSpeed: 20 });
  assert.equal(normal.stall, false);
  assert.ok(normal.lift > 0, 'Lift should be positive at 4°');
  assert.ok(normal.liftToDrag > 5, 'Lift to drag ratio should be high before stall');

  // At zero angle, slight positive lift due to camber
  const zero = airfoilForces({ angleDeg: 0, airSpeed: 20 });
  assert.ok(zero.lift > 0, 'Cambered wing has positive lift at 0°');

  // At high angle (20°), wing stalls
  const stalled = airfoilForces({ angleDeg: 20, airSpeed: 20 });
  assert.equal(stalled.stall, true, 'Wing must stall above 15.5°');
  assert.ok(stalled.drag > normal.drag * 2, 'Stalled drag should dramatically increase');
});

test('Rocket physics: initial mass calculation and fin stability margin', () => {
  const stable = initialRocketState({
    bottleVolume: 0.0015,
    waterFraction: 0.35,
    dryMass: 0.16,
    finCount: 3,
  });
  // Mass = dryMass + 0.35 * 0.0015 * 1000 = 0.16 + 0.525 = 0.685 kg
  near(stable.mass, 0.685);
  assert.equal(stable.isStable, true, 'Rocket with 3 fins should be stable');

  // Rocket with 0 fins is unstable (CoM behind CoP requirement fails)
  const unstable = initialRocketState({
    finCount: 0,
  });
  assert.equal(unstable.isStable, false, 'Rocket without fins should be unstable');
});

test('Rocket physics: water thrust and Bernoulli exit velocity', () => {
  const s = initialRocketState({
    pressureBar: 5, // 500,000 Pa
    waterFraction: 0.35,
    finCount: 3,
    angleDeg: 90,
  });

  // Step 1: In thrust phase, thrust is generated
  stepRocket(s, 0.01);
  assert.equal(s.status, 'thrust');
  assert.ok(s.thrust > 50, `Expected thrust > 50 N, got ${s.thrust}`);
  assert.ok(s.vy > 0, 'Upward velocity must increase under thrust');
  assert.ok(s.y > 0, 'Height must increase');
});

test('Rocket physics: 30-40% water sweet spot produces maximum apogee', () => {
  // Flight with 0% water (pure compressed air)
  const flightAirOnly = simulateRocketFlight({ waterFraction: 0.0, pressureBar: 5 });
  // Flight with optimal 35% water
  const flightOptimal = simulateRocketFlight({ waterFraction: 0.35, pressureBar: 5 });
  // Flight with 90% water (too little air space)
  const flightTooMuchWater = simulateRocketFlight({ waterFraction: 0.9, pressureBar: 5 });

  assert.ok(
    flightOptimal.apogee > flightAirOnly.apogee * 1.5,
    `Optimal 35% water (${flightOptimal.apogee}m) should reach much higher than air only (${flightAirOnly.apogee}m)`
  );
  assert.ok(
    flightOptimal.apogee > flightTooMuchWater.apogee,
    `Optimal 35% water (${flightOptimal.apogee}m) should beat 90% water (${flightTooMuchWater.apogee}m)`
  );
});

test('Rocket physics: unstable rocket tumbles and incurs heavy drag', () => {
  const stableFlight = simulateRocketFlight({ finCount: 3, angleDeg: 80 });
  const tumblingFlight = simulateRocketFlight({ finCount: 0, angleDeg: 80 });

  assert.equal(stableFlight.isStable, true);
  assert.equal(tumblingFlight.isStable, false);
  assert.ok(
    stableFlight.apogee > tumblingFlight.apogee,
    `Stable rocket (${stableFlight.apogee}m) must outperform tumbling rocket (${tumblingFlight.apogee}m)`
  );
});

test('Quadcopter physics: 4-rotor thrust balance, torque cancellation and differential steering', () => {
  // Balanced hover state
  const hover = dronePhysicsModel({ motors: [100, 100, 100, 100], mass: 0.8 });
  assert.equal(hover.isHovering, true, 'Quadcopter should hover when total thrust equals weight');
  near(hover.totalThrust, hover.weight, 0.05);
  near(hover.yawTorque, 0, 1e-4);
  near(hover.pitchTorque, 0, 1e-4);
  near(hover.rollTorque, 0, 1e-4);

  // Differential yaw: CW motors (M1, M3) spin faster than CCW motors (M2, M4)
  const yawLeft = dronePhysicsModel({ motors: [115, 85, 115, 85], mass: 0.8 });
  assert.ok(yawLeft.yawTorque > 0, 'CW motor excess creates positive reaction torque on drone');
  near(yawLeft.totalThrust, hover.totalThrust, 0.3); // overall lift remains approximately balanced

  // Differential pitch: Rear motor (M3) spins faster than front motor (M1)
  const pitchFwd = dronePhysicsModel({ motors: [75, 100, 125, 100], mass: 0.8 });
  assert.ok(pitchFwd.pitchTorque > 0, 'Rear motor excess tilts nose forward');
  assert.ok(pitchFwd.pitchDeg > 0, 'Pitch angle should be positive');
});

test('Supersonic physics: Mach cone half-angle and shock pressure ratio', () => {
  // Subsonic flight (M = 0.8)
  const sub = supersonicMachModel({ mach: 0.8 });
  assert.equal(sub.isSubsonic, true);
  assert.equal(sub.isSupersonic, false);
  assert.equal(sub.machAngleDeg, null, 'No Mach cone exists at subsonic speeds');
  assert.equal(sub.pressureRatio, 1.0);

  // Sonic transition (M = 1.0)
  const sonic = supersonicMachModel({ mach: 1.0 });
  assert.equal(sonic.isSonic, true);
  near(sonic.machAngleDeg, 90.0, 0.1); // sin(90°) = 1/1 = 1

  // Supersonic flight (M = 2.0): sin(mu) = 1/2 = 0.5 => mu = 30°
  const super2 = supersonicMachModel({ mach: 2.0 });
  assert.equal(super2.isSupersonic, true);
  near(super2.machAngleDeg, 30.0, 0.1);
  assert.ok(super2.pressureRatio > 4.0, 'Pressure ratio across shock at M=2 must exceed 4');
});

test('Turbofan Jet physics: Brayton cycle, bypass thrust dominance and altitude lapse', () => {
  // Takeoff at sea level (100% throttle, BPR = 10)
  const takeoff = turbofanBraytonModel({ throttle: 100, bypassRatio: 10.0, altitude: 0, airspeedKmh: 100 });
  assert.ok(takeoff.thrustKn > 80, `Full throttle thrust (${takeoff.thrustKn} kN) should exceed 80 kN`);
  assert.ok(takeoff.bypassThrustPercent > 75, `High BPR cold bypass should generate >75% of thrust (got ${takeoff.bypassThrustPercent}%)`);
  assert.ok(takeoff.thrustBypassKn > takeoff.thrustCoreKn * 3, 'Bypass thrust must exceed core thrust by factor of 3 at BPR=10');

  // Throttle response: 100% vs 20%
  const idle = turbofanBraytonModel({ throttle: 20, bypassRatio: 10.0, altitude: 0, airspeedKmh: 100 });
  assert.ok(takeoff.thrustKn > idle.thrustKn * 2.5, 'Full throttle thrust should be much higher than idle');
  assert.ok(takeoff.titC > idle.titC, 'Turbine inlet temperature must rise with throttle');

  // Altitude lapse: sea level vs 10,000m cruise
  const cruise = turbofanBraytonModel({ throttle: 80, bypassRatio: 10.0, altitude: 10000, airspeedKmh: 800 });
  const lowAlt = turbofanBraytonModel({ throttle: 80, bypassRatio: 10.0, altitude: 500, airspeedKmh: 800 });
  assert.ok(lowAlt.thrustKn > cruise.thrustKn * 1.5, 'Thrust at low altitude must be higher due to greater air density');
});

test('Orbital rocketry physics: circular orbit, suborbital crash, escape velocity, and Kepler period', () => {
  // LEO at 400 km altitude
  const leo = orbitPhysicsModel({ launchAltitudeKm: 400, horizontalVelocityKms: 7.67 });
  assert.equal(leo.status, 'circular', 'At 7.67 km/s, orbit should be circular LEO');
  assert.equal(leo.isStableOrbit, true);
  assert.equal(leo.hasCollided, false);
  assert.ok(leo.periapsisKm > 350, 'Periapsis should be close to 400 km');
  assert.ok(leo.periodMin >= 90 && leo.periodMin <= 95, `Expected ~92-93 min period, got ${leo.periodMin}`);
  assert.ok(leo.gravityAtAlt >= 8.5 && leo.gravityAtAlt <= 9.0, 'Gravity at 400 km should be ~8.7 m/s²');

  // Suborbital ballistic crash (v0 = 5.0 km/s)
  const sub = orbitPhysicsModel({ launchAltitudeKm: 400, horizontalVelocityKms: 5.0 });
  assert.equal(sub.status, 'suborbital_crash');
  assert.equal(sub.isStableOrbit, false);
  assert.equal(sub.hasCollided, true);
  assert.ok(sub.periapsisKm < 0, 'Periapsis must be below Earth surface for crash');

  // High Elliptical Orbit (v0 = 9.8 km/s)
  const heo = orbitPhysicsModel({ launchAltitudeKm: 400, horizontalVelocityKms: 9.8 });
  assert.equal(heo.status, 'elliptic');
  assert.equal(heo.isStableOrbit, true);
  assert.ok(heo.eccentricity > 0.4, 'High velocity produces substantial eccentricity');
  assert.ok(heo.apoapsisKm > 20000, 'Apoapsis should be tens of thousands of kilometers');

  // Escape velocity (v0 = 11.2 km/s)
  const esc = orbitPhysicsModel({ launchAltitudeKm: 400, horizontalVelocityKms: 11.2 });
  assert.ok(esc.status === 'hyperbolic' || esc.status === 'parabolic');
  assert.ok(esc.eccentricity >= 1.0, 'Escape trajectory must have e >= 1.0');
});

test('Helicopter aerodynamics: collective climb/hover, cyclic forward tilt, and anti-torque balance', () => {
  // Neutral Hover state
  const hover = helicopterSwashplateModel({ collective: 50, cyclicPitch: 0, tailPedal: 50 });
  assert.equal(hover.isHovering, true, 'Helicopter should hover when lift balances weight and yaw is zero');
  assert.equal(hover.yawState, 'balanced');
  near(hover.forwardThrustKn, 0, 0.1);

  // Cyclic Forward Flight
  const forward = helicopterSwashplateModel({ collective: 55, cyclicPitch: 30, tailPedal: 55 });
  assert.ok(forward.tiltForwardDeg > 5, 'Cyclic stick forward should tilt rotor disc');
  assert.ok(forward.forwardThrustKn > 2.0, 'Forward tilt generates forward propulsion');
  assert.equal(forward.flightState, 'forward');

  // Tail Rotor Imbalance / Spinout
  const spinLeft = helicopterSwashplateModel({ collective: 80, cyclicPitch: 0, tailPedal: 10 });
  assert.equal(spinLeft.yawState, 'yaw_left', 'Insufficient tail rotor thrust results in uncontrolled fuselage spin');
  assert.equal(spinLeft.isHovering, false);
});

test('AeroLab DIY projects, challenges, and mastery badges integrity', () => {
  assert.ok(DIY_PROJECTS.length >= 10, 'Must have at least 10 DIY maker projects');
  for (const project of DIY_PROJECTS) {
    assert.ok(project.title.length > 0);
    assert.ok(project.materials.length >= 3);
    assert.ok(project.steps.length >= 3);
    assert.ok(project.physicsSecret.length > 20);
  }

  assert.ok(AERO_CHALLENGES.length >= 10, 'Must have at least 10 conceptual challenges');
  for (const challenge of AERO_CHALLENGES) {
    assert.ok(challenge.question.length > 0);
    assert.equal(challenge.options.length, 4);
    assert.ok(challenge.correct >= 0 && challenge.correct < 4);
    assert.ok(challenge.explanation.length > 10);
  }

  assert.ok(AERO_BADGES.length >= 9, 'Must have at least 9 mastery badges');
  for (const badge of AERO_BADGES) {
    assert.ok(badge.id.length > 0);
    assert.ok(badge.title.length > 0);
    assert.ok(badge.points >= 100);
    assert.equal(typeof badge.check, 'function');
  }
});

