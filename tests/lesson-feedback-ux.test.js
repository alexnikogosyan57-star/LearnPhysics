import test from 'node:test';
import assert from 'node:assert/strict';
import {ensureAssessment, assessmentBody, assessmentReaction} from '../src/learning/assessment-flow.js';
import {activityMarkup, isAnswered, scoreActivity} from '../src/learning/activities.js';
import {assessmentState, submitAssessment, continueAssessment} from '../src/learning/assessment-machine.js';
import {TeacherState, getTeacherPose} from '../src/teacher-state.js';

test('1. Selecting an answer changes its visual state and includes shortcut badge and accessible radio semantics', () => {
 const q = {
  type: 'choice',
  question: 'Ի՞նչ տեղի կունենա լամպի հետ, երբ բանալին բաց է։',
  options: ['Լամպը կվառվի', 'Լամպը չի վառվի', 'Լամպը կայրվի'],
  correct: 1,
  why: 'Բաց անջատիչը ընդհատում է շղթան, ուստի լամպով հոսանք չի անցնում։'
 };

 // Unselected state
 const unselectedMarkup = activityMarkup(q, {});
 assert.match(unselectedMarkup, /role="radiogroup"/);
 assert.match(unselectedMarkup, /class="answer\s*"/);
 assert.doesNotMatch(unselectedMarkup, /class="[^"]*selected/);
 assert.match(unselectedMarkup, /aria-checked="false"/);
 assert.match(unselectedMarkup, /<span class="answer-badge"[^>]*>1<\/span>/);
 assert.match(unselectedMarkup, /<span class="answer-indicator radio-dot"/);

 // Selected state (draft.choice === 0)
 const selectedMarkup = activityMarkup(q, {choice: 0});
 assert.match(selectedMarkup, /class="answer selected"/);
 assert.match(selectedMarkup, /data-activity-choice="0"[^>]*aria-checked="true"/);
 assert.match(selectedMarkup, /data-shortcut="1"/);
});

test('2. Selection does not submit automatically; requires explicit answer state', () => {
 const q = {type: 'choice', options: ['A', 'B'], correct: 0};
 const draft = {};
 assert.equal(isAnswered(q, draft), false);

 draft.choice = 1;
 assert.equal(isAnswered(q, draft), true);

 const machine = assessmentState();
 assert.equal(machine.phase, 'ANSWERING');
 assert.equal(machine.feedback, null);
});

test('3. Checking a correct answer shows success feedback in dedicated bottom Feedback Dock', () => {
 const items = [{
  type: 'choice',
  question: 'Հարց 1',
  options: ['Սխալ', 'Ճիշտ'],
  correct: 1,
  why: 'Բաց անջատիչը ընդհատում է շղթան, ուստի լամպով հոսանք չի անցնում։'
 }];
 const owner = {};
 const flow = ensureAssessment(owner);
 flow.draft = {choice: 1};

 submitAssessment(flow.machine, flow.draft, true);
 assert.equal(flow.machine.phase, 'FEEDBACK');
 assert.equal(flow.machine.feedback.correct, true);

 const html = assessmentBody(owner, items);

 // Dedicated feedback dock anchored at the bottom
 assert.match(html, /<div class="lesson-feedback-dock assessment-feedback correct" role="status" aria-live="polite">/);
 assert.match(html, /<strong class="feedback-heading correct">Ճիշտ է<\/strong>/);
 assert.match(html, /Բաց անջատիչը ընդհատում է շղթան/);
 assert.match(html, /<button class="button lesson-primary " id="assessment-continue">Շարունակել<\/button>/);

 // Check button must NOT be present in feedback state
 assert.doesNotMatch(html, /id="assessment-check"/);

 // Correct option is visibly marked with is-correct and checkmark icon
 assert.match(html, /class="[^"]*is-correct[^"]*"/);
 assert.match(html, /icon-check/);
});

test('4. Checking an incorrect answer shows error feedback in dedicated bottom Feedback Dock and marks misconception', () => {
 const items = [{
  type: 'choice',
  question: 'Հարց 1',
  options: ['Սխալ տարբերակ', 'Ճիշտ տարբերակ'],
  correct: 1,
  misconceptions: {
   0: 'Բաց անջատիչը հոսանք չի անցկացնում։'
  },
  why: 'Լամպը կհանգչի, քանի որ շղթան ընդհատված է։'
 }];
 const owner = {};
 const flow = ensureAssessment(owner);
 flow.draft = {choice: 0};

 submitAssessment(flow.machine, flow.draft, false);
 assert.equal(flow.machine.phase, 'FEEDBACK');
 assert.equal(flow.machine.feedback.correct, false);

 const html = assessmentBody(owner, items);

 assert.match(html, /<div class="lesson-feedback-dock assessment-feedback incorrect" role="status" aria-live="polite">/);
 assert.match(html, /<strong class="feedback-heading incorrect">Դեռ ճիշտ չէ<\/strong>/);
 assert.match(html, /Բաց անջատիչը հոսանք չի անցկացնում/);
 assert.match(html, /Լամպը կհանգչի, քանի որ շղթան ընդհատված է/);
 assert.match(html, /<button class="button lesson-primary danger" id="assessment-continue">Շարունակել<\/button>/);

 // Chosen incorrect option is visibly marked
 assert.match(html, /class="[^"]*is-incorrect[^"]*"/);
 assert.match(html, /icon-cross/);
});

test('5. Feedback is NOT duplicated inline or inside answer list', () => {
 const items = [{
  type: 'choice',
  question: 'Հարց 1',
  options: ['A', 'B'],
  correct: 1,
  why: 'Ճիշտ բացատրություն'
 }];
 const owner = {};
 const flow = ensureAssessment(owner);
 flow.draft = {choice: 1};
 submitAssessment(flow.machine, flow.draft, true);

 const html = assessmentBody(owner, items);

 // Exactly one assessment-feedback dock exists in the rendered output
 const feedbackMatches = html.match(/assessment-feedback/g);
 assert.equal(feedbackMatches?.length, 1);

 // Explanation appears exactly once
 const whyMatches = html.match(/Ճիշտ բացատրություն/g);
 assert.equal(whyMatches?.length, 1);
});

test('6. Continue advances exactly once and resets interaction state', () => {
 const machine = assessmentState();
 submitAssessment(machine, {choice: 1}, true);
 assert.equal(machine.phase, 'FEEDBACK');
 assert.equal(machine.index, 0);

 const advanced = continueAssessment(machine, 2);
 assert.equal(advanced, true);
 assert.equal(machine.index, 1);
 assert.equal(machine.phase, 'ANSWERING');
 assert.equal(machine.feedback, null);

 // Calling continue again when not in FEEDBACK returns false and does not skip questions
 const secondContinue = continueAssessment(machine, 2);
 assert.equal(secondContinue, false);
 assert.equal(machine.index, 1);
});

test('7. Mistake review queue remains functional and original score is immutable', () => {
 const machine = assessmentState();
 // Question 0: Wrong
 submitAssessment(machine, {choice: 0}, false);
 continueAssessment(machine, 2);

 // Question 1: Right
 submitAssessment(machine, {choice: 1}, true);
 continueAssessment(machine, 2);

 // Should enter MISTAKE_REVIEW
 assert.equal(machine.phase, 'MISTAKE_REVIEW');
 assert.deepEqual(machine.queue, [0]);
 assert.equal(machine.original[0].correct, false);
 assert.equal(machine.original[1].correct, true);

 // Correcting in review
 submitAssessment(machine, {choice: 1}, true);
 continueAssessment(machine, 2);

 assert.equal(machine.phase, 'COMPLETED');
 assert.deepEqual(machine.corrected, [0]);
 // Original score remains immutable
 assert.equal(machine.original[0].correct, false);
});

test('8. Robot state changes appropriately through question lifecycle', () => {
 const owner = {};
 const flow = ensureAssessment(owner);

 // Idle / Answering
 assert.equal(assessmentReaction(owner), 'thinking');
 assert.equal(getTeacherPose(TeacherState.WAITING), 'thinking');

 // After Correct Answer
 flow.machine.feedback = {index: 0, correct: true};
 assert.equal(assessmentReaction(owner), 'success-answer');
 assert.equal(getTeacherPose(TeacherState.CORRECT), 'success-answer');

 // After Incorrect Answer
 flow.machine.feedback = {index: 0, correct: false};
 assert.equal(assessmentReaction(owner), 'confused');
 assert.equal(getTeacherPose(TeacherState.INCORRECT), 'confused');

 // Completion
 assert.equal(getTeacherPose(TeacherState.COMPLETED), 'success-complete');
});
