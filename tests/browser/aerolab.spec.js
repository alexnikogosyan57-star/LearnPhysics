import { test, expect } from '@playwright/test';

test.describe('AeroLab Interactive Flight & Rocketry Laboratory', () => {
  test('AeroLab navigation, 4 tabs, and rocket simulation across viewports', async ({ page }) => {
    // 1. Desktop Viewport 1366x768
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto('/#aerolab');

    await expect(page.locator('.aerolab-header h1')).toContainText('Թռչող Սարքերի Լաբորատորիա');
    await expect(page.locator('.aerolab-tabs')).toBeVisible();

    // Verify 0 horizontal overflow
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
    expect(overflow).toBe(true);

    // 2. Rocket Simulation Tab
    await expect(page.locator('#rocket-canvas')).toBeVisible();
    await expect(page.locator('#btn-launch-rocket')).toBeVisible();
    await expect(page.locator('#val-altitude')).toContainText('0');

    // Click launch
    await page.locator('#btn-launch-rocket').click();
    // Wait a brief moment for simulation to tick
    await page.waitForTimeout(600);

    // Altitude should have climbed
    const altText = await page.locator('#val-altitude').textContent();
    expect(altText).not.toBe('0');

    // Reset rocket
    await page.locator('#btn-reset-rocket').click();
    await expect(page.locator('#val-altitude')).toContainText('0');

    // 3. Switch to Drone Simulation Tab
    await page.locator('[data-aerotab="drone"]').click();
    await expect(page.locator('.drone-simulator-svg')).toBeVisible();
    await expect(page.locator('#val-drone-thrust')).toBeVisible();
    // Test hover button
    await page.locator('#btn-drone-hover').click();
    await expect(page.locator('#val-drone-status')).toContainText('Հովերինգ');
    // Test yaw left button
    await page.locator('#btn-drone-yaw-left').click();
    await page.locator('#btn-drone-hover').click();

    // 4. Switch to Wind Tunnel Tab
    await page.locator('[data-aerotab="tunnel"]').click();
    await expect(page.locator('.airfoil-wind-tunnel-svg')).toBeVisible();
    await expect(page.locator('#tunnel-angle')).toBeVisible();

    // Adjust angle slider to 20° (stall condition)
    await page.locator('#tunnel-angle').fill('20');
    await page.locator('#tunnel-angle').dispatchEvent('input');
    await expect(page.locator('.flow-status')).toContainText('Շեղում');

    // 5. Switch to Supersonic Tab
    await page.locator('[data-aerotab="supersonic"]').click();
    await expect(page.locator('.supersonic-simulator-svg')).toBeVisible();
    await expect(page.locator('#val-mach')).toContainText('1.2');
    // Click Mach 2.2 Concorde preset
    await page.locator('button[data-mach="2.2"]').click();
    await expect(page.locator('#val-mach')).toContainText('2.2');

    // 6. Switch to Turbofan Jet Engine Tab
    await page.locator('[data-aerotab="jet"]').click();
    await expect(page.locator('.turbofan-simulator-svg')).toBeVisible();
    await expect(page.locator('#val-thrust-kn')).toBeVisible();
    // Click Takeoff preset
    await page.locator('button[data-jetpreset="takeoff"]').click();
    await expect(page.locator('#label-jet-throttle')).toContainText('100 %');

    // 7. Switch to DIY Guide Tab (8 projects)
    await page.locator('[data-aerotab="diy"]').click();
    await expect(page.locator('.diy-cards-grid')).toBeVisible();
    await expect(page.locator('.diy-project-card')).toHaveCount(8);

    // Select Guided Balloon Rocket
    await page.locator('[data-diyselect="balloon-rocket"]').click();
    await expect(page.locator('.blueprint-header h2')).toContainText('Սենյակային Ռեակտիվ Փուչիկ-Հրթիռ');
    await expect(page.locator('.blueprint-secret-box')).toContainText('Նյուտոնի 3-րդ օրենք');

    // 8. Switch to Badges Tab
    await page.locator('[data-aerotab="badges"]').click();
    await expect(page.locator('.badges-view-container')).toBeVisible();
    await expect(page.locator('.aero-badge-card')).toHaveCount(6);

    // 9. Switch to AeroQuiz Tab
    await page.locator('[data-aerotab="quiz"]').click();
    await expect(page.locator('.aero-quiz-container')).toBeVisible();
    await expect(page.locator('[data-aerochoice="1"]')).toBeVisible();

    // Select second option (correct answer for water rocket)
    await page.locator('[data-aerochoice="1"]').click();
    await expect(page.locator('[data-aerochoice="1"]')).toHaveClass(/selected/);

    // Submit answer
    await page.locator('#btn-aero-check').click();
    await expect(page.locator('.lesson-feedback-dock')).toBeVisible();
    await expect(page.locator('.feedback-heading')).toContainText('Ճիշտ է');
    await expect(page.locator('[data-aerochoice="1"]')).toHaveClass(/is-correct/);

    // Continue to next question
    await page.locator('#btn-aero-continue').click();
    await expect(page.locator('.quiz-header span')).toContainText('Հարց 2 / 8');
  });

  test('AeroLab responsive layout at 1440x900 and 1920x1080', async ({ page }) => {
    for (const size of [
      { width: 1440, height: 900 },
      { width: 1920, height: 1080 },
    ]) {
      await page.setViewportSize(size);
      await page.goto('/#aerolab');
      await expect(page.locator('.aerolab-container')).toBeVisible();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
      expect(overflow).toBe(true);
    }
  });
});
