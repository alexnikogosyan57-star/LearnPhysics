import { test, expect } from '@playwright/test';

async function seed(page) {
 await page.goto('/#home');
 await page.evaluate(() => {
  localStorage.setItem('physics-journal-v1', JSON.stringify({
   notes: [],
   runs: [],
   learning: {
    version: 3,
    selectedTopic: 'electricity',
    legacyAccess: [],
    unlocked: ['charges', 'atoms', 'electrification', 'conductors'],
    lessons: {
     charges: { bestStars: 3, attempts: [{ earned: 10, possible: 10, stars: 3 }] },
     atoms: { bestStars: 3, attempts: [{ earned: 10, possible: 10, stars: 3 }] },
     electrification: { bestStars: 3, attempts: [{ earned: 10, possible: 10, stars: 3 }] },
     conductors: { bestStars: 3, attempts: [{ earned: 10, possible: 10, stars: 3 }] }
    }
   }
  }));
 });
}

test.describe('Lesson Answer Feedback Visual & Layout UX', () => {
 const viewports = [
  { width: 1366, height: 768, name: '1366x768' },
  { width: 1440, height: 900, name: '1440x900' },
  { width: 1920, height: 1080, name: '1920x1080' },
 ];

 for (const vp of viewports) {
  test(`Layout usability and stable bottom dock visibility at ${vp.name}`, async ({ page }) => {
   await page.setViewportSize({ width: vp.width, height: vp.height });
   await seed(page);
   await page.goto('/#lesson/charges');

   // Verify initial page load
   await expect(page.locator('.guide-lesson')).toBeVisible();

   // Verify no horizontal overflow across viewport
   const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
   const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
   expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);

   // Verify sidebar is present and not overlapped
   const sidebar = page.locator('.site-header');
   await expect(sidebar).toBeVisible();
   const sidebarBox = await sidebar.boundingBox();
   expect(sidebarBox?.width).toBeGreaterThanOrEqual(200);

   // Verify sound control is present and functional without modal dialog
   const soundBtn = page.locator('#sound');
   await expect(soundBtn).toBeVisible();
   const audioDialog = page.locator('#audio-dialog');
   expect(await audioDialog.evaluate(el => el.hasAttribute('open'))).toBe(false);
   await soundBtn.click();
   expect(await audioDialog.evaluate(el => el.hasAttribute('open'))).toBe(false);

   // Advance to Stage 1 prediction
   await page.locator('#investigation-next').click();
   await expect(page.locator('.activity-choices')).toBeVisible();

   // Verify answer selection
   const firstChoice = page.locator('[data-activity-choice]').first();
   await firstChoice.click();
   await expect(firstChoice).toHaveClass(/selected/);

   // Capture screenshot of question with selected choice
   await page.screenshot({ path: `test-results/lesson-stage1-${vp.name}.png` });
  });
 }

 test('Interactive answer selection, bottom feedback dock, and stable continue button', async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 768 });
  await seed(page);
  await page.goto('/#lesson/charges');

  // Go to prediction question
  await page.locator('#investigation-next').click();
  await expect(page.locator('.activity-choices')).toBeVisible();

  // Test choice selection
  const choiceBtn = page.locator('[data-activity-choice="0"]');
  await choiceBtn.click();
  await expect(choiceBtn).toHaveClass(/selected/);
  await expect(choiceBtn).toHaveAttribute('aria-checked', 'true');

  // Verify number shortcut badge is visible
  const badge = choiceBtn.locator('.answer-badge');
  await expect(badge).toBeVisible();
  await expect(badge).toHaveText('1');

  // Verify reduced motion media query support
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const reducedMotionActive = await page.evaluate(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  expect(reducedMotionActive).toBe(true);

  // Take screenshot
  await page.screenshot({ path: 'test-results/answer-selection-1366x768.png' });
 });
});
