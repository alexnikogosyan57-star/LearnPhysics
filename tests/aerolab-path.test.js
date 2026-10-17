import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  AEROLAB_CURRICULUM,
  LEVEL_1_LESSONS,
  DIY_SAFE_PROJECT_GLIDER,
  ensureAeroLearningState,
  canOpenAeroLesson,
  recordAeroLessonCompletion,
  toggleDiyStep,
  toggleDiyMaterial,
} from '../src/labs/aerolab-path-data.js';

test('AeroLab Curriculum structure: 7 levels with Level 1 fully active', () => {
  assert.equal(AEROLAB_CURRICULUM.length, 7);
  const lvl1 = AEROLAB_CURRICULUM[0];
  assert.equal(lvl1.level, 1);
  assert.equal(lvl1.status, 'active');
  assert.deepEqual(lvl1.lessons, ['1.1', '1.2', '1.3', '1.4', '1.5']);

  // Levels 2 to 7 are preview roadmaps
  for (let i = 1; i < 7; i++) {
    assert.equal(AEROLAB_CURRICULUM[i].level, i + 1);
    assert.equal(AEROLAB_CURRICULUM[i].status, 'preview');
    assert.ok(AEROLAB_CURRICULUM[i].title.length > 0);
    assert.ok(AEROLAB_CURRICULUM[i].subtitle.length > 0);
  }
});

test('Level 1 Lessons: 5 full lessons with 7-step pedagogical structure', () => {
  const lessonIds = ['1.1', '1.2', '1.3', '1.4', '1.5'];

  for (const id of lessonIds) {
    const lesson = LEVEL_1_LESSONS[id];
    assert.ok(lesson, `Lesson ${id} must exist`);
    assert.equal(lesson.id, id);
    assert.equal(lesson.level, 1);
    assert.ok(lesson.title.length > 0);
    assert.ok(lesson.subtitle.length > 0);
    assert.ok(lesson.badge.length > 0);
    assert.ok(lesson.xpReward >= 50);

    // Must have exactly 7 steps (0 to 6)
    assert.equal(lesson.steps.length, 7, `Lesson ${id} must have 7 pedagogical steps`);

    const expectedTypes = ['question', 'prediction', 'experiment', 'observation', 'explanation', 'challenge', 'complete'];
    lesson.steps.forEach((step, idx) => {
      assert.equal(step.stepIndex, idx);
      assert.equal(step.type, expectedTypes[idx], `Step ${idx} must be ${expectedTypes[idx]}`);
    });

    // Step 0: Question
    const s0 = lesson.steps[0];
    assert.ok(s0.prompt.length > 10);
    assert.ok(s0.detail.length > 5);

    // Step 1: Prediction
    const s1 = lesson.steps[1];
    assert.ok(s1.options.length >= 2);
    assert.ok(s1.options.some((o) => o.isInsight));

    // Step 2: Experiment
    const s2 = lesson.steps[2];
    assert.ok(s2.widgetType.length > 0);
    assert.ok(s2.instruction.length > 10);

    // Step 3: Observation
    const s3 = lesson.steps[3];
    assert.ok(s3.questions.length >= 2);

    // Step 4: Explanation
    const s4 = lesson.steps[4];
    assert.ok(s4.content.length > 50);

    // Step 5: Challenge
    const s5 = lesson.steps[5];
    assert.ok(s5.question.length > 10);
    assert.ok(s5.options.length >= 3);
    const correctOptions = s5.options.filter((o) => o.correct);
    assert.equal(correctOptions.length, 1, `Step 5 challenge must have exactly 1 correct answer in lesson ${id}`);
    assert.ok(s5.hint.length > 10);
    assert.ok(s5.explanation.length > 10);

    // Step 6: Complete
    const s6 = lesson.steps[6];
    assert.ok(s6.unlockedFormula);
    assert.ok(s6.unlockedFormula.symbol.length > 0);
    assert.ok(s6.unlockedFormula.name.length > 0);
    assert.ok(s6.unlockedFormula.units.length > 0);
  }
});

test('Physical calculation verification in lessons 1.1 to 1.5', () => {
  // Lesson 1.1: Closed loop perimeter = 400m -> displacement = 0
  const l1 = LEVEL_1_LESSONS['1.1'];
  const l1Correct = l1.steps[5].options.find((o) => o.correct);
  assert.ok(l1Correct.text.includes('0 մ') && l1Correct.text.includes('400 մ'));

  // Lesson 1.2: Average speed (300 km at 300 km/h [1h] + 300 km at 600 km/h [0.5h])
  // s_tot = 600 km, t_tot = 1.5 h -> v_avg = 400 km/h (NOT arithmetic mean 450 km/h)
  const l2 = LEVEL_1_LESSONS['1.2'];
  const l2Correct = l2.steps[5].options.find((o) => o.correct);
  assert.ok(l2Correct.text.includes('400 կմ/ժ'));

  // Lesson 1.3: Acceleration v = a * t, for a = 4 m/s^2, t = 5 s -> v = 20 m/s
  const l3 = LEVEL_1_LESSONS['1.3'];
  const l3Correct = l3.steps[5].options.find((o) => o.correct);
  assert.ok(l3Correct.text.includes('20 մ/վ'));

  // Lesson 1.4: Newton 2nd Law a = F / m
  // For satellite: m = 10 kg, F = 50 N -> a = 5 m/s^2
  // For ship: m = 1000 kg, F = 50 N -> a = 0.05 m/s^2
  const l4 = LEVEL_1_LESSONS['1.4'];
  const l4Correct = l4.steps[5].options.find((o) => o.correct);
  assert.ok(l4Correct.text.includes('5 մ/վ²') && l4Correct.text.includes('0.05 մ/վ²'));

  // Lesson 1.5: Free fall on Moon (vacuum) - hammer and feather hit at exact same time
  const l5 = LEVEL_1_LESSONS['1.5'];
  const l5Correct = l5.steps[5].options.find((o) => o.correct);
  assert.ok(l5Correct.text.includes('միաժամանակ'));
});

test('Safe DIY Home Glider Maker Project integrity', () => {
  const diy = DIY_SAFE_PROJECT_GLIDER;
  assert.equal(diy.id, 'diy-glider-co-m');
  assert.ok(diy.materials.length >= 4);
  assert.ok(diy.safetyWarning.includes('անվտանգ'));
  assert.ok(diy.steps.length >= 6);
  assert.ok(diy.engineeringTakeaway.includes('CoM') && diy.engineeringTakeaway.includes('CoL'));

  // Ensure no dangerous or chemical materials
  for (const m of diy.materials) {
    assert.ok(!m.name.includes('վառելիք'));
    assert.ok(!m.name.includes('կրակ'));
    assert.ok(!m.name.includes('ճնշում'));
  }
});

test('State management: progressive unlocking and persistence', () => {
  const data = {};
  const s = ensureAeroLearningState(data);
  assert.equal(s.activeMode, 'path');
  assert.deepEqual(s.completedLessons, []);
  assert.equal(s.xp, 0);

  // Lesson 1.1 is unlocked by default
  assert.equal(canOpenAeroLesson(s, '1.1'), true);

  // Lesson 1.2 is locked until 1.1 is completed
  assert.equal(canOpenAeroLesson(s, '1.2'), false);

  // Complete Lesson 1.1
  recordAeroLessonCompletion(data, '1.1', 50);
  assert.deepEqual(data.aerolabLearning.completedLessons, ['1.1']);
  assert.equal(data.aerolabLearning.xp, 50);

  // Now Lesson 1.2 is unlocked!
  assert.equal(canOpenAeroLesson(data.aerolabLearning, '1.2'), true);
  assert.equal(canOpenAeroLesson(data.aerolabLearning, '1.3'), false);

  // Completing again does not duplicate XP or entries
  recordAeroLessonCompletion(data, '1.1', 50);
  assert.equal(data.aerolabLearning.xp, 50);
  assert.equal(data.aerolabLearning.completedLessons.length, 1);

  // Complete rest of lessons up to 1.5
  recordAeroLessonCompletion(data, '1.2', 50);
  recordAeroLessonCompletion(data, '1.3', 50);
  recordAeroLessonCompletion(data, '1.4', 50);
  recordAeroLessonCompletion(data, '1.5', 100);

  assert.equal(data.aerolabLearning.completedLessons.length, 5);
  assert.equal(data.aerolabLearning.xp, 300);

  // DIY checklists toggling
  toggleDiyMaterial(data, 'paper');
  assert.deepEqual(data.aerolabLearning.diyProgress.materialsChecked, ['paper']);
  toggleDiyMaterial(data, 'paper');
  assert.deepEqual(data.aerolabLearning.diyProgress.materialsChecked, []);

  toggleDiyStep(data, 1);
  assert.deepEqual(data.aerolabLearning.diyProgress.stepsCompleted, [1]);
  toggleDiyStep(data, 1);
  assert.deepEqual(data.aerolabLearning.diyProgress.stepsCompleted, []);
});
