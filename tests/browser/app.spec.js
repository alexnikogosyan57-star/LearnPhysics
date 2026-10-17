import { test, expect } from "@playwright/test";
test.beforeEach(({page})=>{page.on('dialog',d=>{if(d.type()==='beforeunload')return d.accept();if(page.listeners('dialog').length===1)return d.dismiss();});});
test("full investigation, simulation, notebook and reload", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/#home");
  await expect(page.locator("h1")).toContainText("Բարև");
  await page.goto('/#lesson/motion');
  await page.locator("#next-stage").click();
  await page.locator('[data-predict="1"]').click();
  await page.locator("#next-stage").click();
  await page.locator("#runs-details summary").click();
  await page.locator("#graph-details summary").click();
  await page.locator("#run").click();
  await page.waitForTimeout(550);
  await page.locator("#run").click();
  const paused = await page.locator("#read-time").textContent();
  await page.waitForTimeout(300);
  expect(await page.locator("#read-time").textContent()).toBe(paused);
  await page.locator("#run").click();
  await page.waitForTimeout(5300);
  await expect(page.locator("#read-distance")).toContainText("10");
  await expect(page.locator("tbody tr")).toHaveCount(1);
  await page.locator("#speed").fill("4");
  await expect(page.locator("#read-distance")).toContainText("0");
  await page.locator("#run").click();
  await page.waitForTimeout(5400);
  await expect(page.locator("#read-distance")).toContainText("20");
  await expect(page.locator("tbody tr")).toHaveCount(2);
  await page.locator("#reset").click();
  await expect(page.locator("#read-time")).toContainText("0");
  await page.locator("#next-stage").click();
  await page.locator('[data-observe="0:1"]').click();
  await page.locator("#submit-observation").click();
  await expect(page.locator(".feedback").first()).toContainText("Վերադառնանք");
  await page.locator('[data-hint="0"]').click();
  await page.locator('[data-observe="0:0"]').click();
  await page.locator("#submit-observation").click();
  await page.locator("#next-observation").click();
  await page.locator('[data-observe="1:1"]').click();
  await page.locator("#submit-observation").click();
  await page.locator("#next-observation").click();
  await page.locator('[data-observe="2:2"]').click();
  await page.locator("#submit-observation").click();
  await page.locator("#next-observation").click();
  await page.locator("#verify").fill("Կփոխեմ միայն ժամանակը։");
  await page.locator("#next-stage").click();
  await expect(page.locator(".evidence")).toContainText("20");
  await page.locator("summary").click();
  await page.locator("#next-stage").click();
  for (const correct of [1, 0, 2]) {
    await page.locator(`[data-activity-choice="${correct}"]`).click();
    await page.locator("#assessment-check").click();
    await expect(page.locator(".assessment-feedback")).toContainText("Ճիշտ");
    await page.locator("#assessment-continue").click();
  }
  await expect(page.locator(".robot-dialogue")).toContainText("3 / 3");
  await page
    .locator("#conclusion")
    .fill(
      "Նույն ժամանակում արագությունը կրկնապատկելիս ճանապարհը կրկնապատկվում է։",
    );
  await page.locator("#save-lesson").click();
  await page.locator('[data-page="notebook"]').first().click();
  await expect(page.locator(".note")).toHaveCount(1);
  await page.locator("[data-edit]").click();
  await page.locator("#note-conclusion").fill("Իմ խմբագրված եզրակացությունը");
  await page.locator('#note-form button[type="submit"]').click();
  await page.reload();
  await page.locator('[data-page="notebook"]').first().click();
  await expect(page.locator(".note")).toContainText("Իմ խմբագրված");
  await page.locator("#sound").click();
  await expect(page.locator("#sound")).toHaveAttribute("aria-pressed", "false");
  await page.locator("#sound").click();
  await expect(page.locator("#sound")).toHaveAttribute("aria-pressed", "true");
  await page.locator('[data-page="progress"]').first().click();
  await expect(page.locator(".progress-stats")).toContainText("2");
  page.once("dialog", (d) => d.accept());
  await page.locator('[data-page="notebook"]').first().click();
  await page.locator("[data-delete]").click();
  await expect(page.locator(".note")).toHaveCount(0);
  expect(errors).toEqual([]);
});
for (const width of [390, 768, 1440])
  test(`responsive ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/#home");
    await expect(page.locator("h1")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `test-results/home-${width}.png`,
      fullPage: true,
    });
    if (width < 501) await page.locator("#nav-toggle").click();
    await page.evaluate(()=>{const d=JSON.parse(localStorage.getItem('physics-journal-v1'));d.stage=2;d.unlockedStage=Math.max(2,d.unlockedStage||0);localStorage.setItem('physics-journal-v1',JSON.stringify(d));});await page.reload();await page.goto('/#lesson/motion');
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await expect(page.locator("#graph")).not.toBeVisible();
    await page.locator("#graph-details summary").click();
    await expect(page.locator("#graph")).toBeVisible();
    await page.screenshot({
      path: `test-results/lab-${width}.png`,
      fullPage: true,
    });
  });

test("duration changes, same-model graph and comparison", async ({ page }) => {
  await page.goto("/#home");
  await page.evaluate(()=>{const d=JSON.parse(localStorage.getItem('physics-journal-v1'));d.stage=2;d.unlockedStage=Math.max(2,d.unlockedStage||0);localStorage.setItem('physics-journal-v1',JSON.stringify(d));});await page.reload();await page.goto('/#lesson/motion');
  await page.locator("#duration").fill("10");
  await page.locator("#graph-details summary").click();
  await page.locator("#run").click();
  await page.waitForTimeout(700);
  await page.locator("#run").click();
  const value = await page.locator("#read-distance").textContent();
  const transform = await page.locator("#robot-lab").getAttribute("transform");
  await page.waitForTimeout(250);
  expect(await page.locator("#read-distance").textContent()).toBe(value);
  expect(await page.locator("#robot-lab").getAttribute("transform")).toBe(
    transform,
  );
  await page.locator("#run").click();
  await page.waitForTimeout(10100);
  await expect(page.locator("#read-distance")).toContainText("20");
  await expect(page.locator("#robot-lab")).toHaveAttribute(
    "transform",
    `translate(${110 + (20 / 60) * 680} 270)`,
  );
  const line = page.locator('#graph path[stroke="#58634d"]');
  await expect(line).toHaveAttribute("d", "M52 170 L452 30");
  await page.locator("#compare-run").selectOption("none");
  await expect(page.locator('#graph path[stroke="#b56b50"]')).toHaveCount(0);
  await page.locator("#compare-run").selectOption({ index: 1 });
  await expect(page.locator('#graph path[stroke="#b56b50"]')).toHaveCount(1);
  await page.locator("#speed").fill("4");
  await expect(page.locator("#read-time")).toContainText("0");
  await expect(line).toHaveAttribute("d", "M52 170 L52 170");
});
test("existing journal and progress survive redesign; reduced motion and assets", async ({
  page,
}) => {
  const failures = [];
  page.on("response", (r) => {
    if (r.status() >= 400) failures.push(r.url());
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#home");
  await expect(page.locator(".companion img")).toBeVisible();
  expect(
    await page
      .locator(".companion img")
      .evaluate((el) => el.complete && el.naturalWidth > 0),
  ).toBe(true);
  expect(
    await page
      .locator(".companion img")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  await page.evaluate(() =>
    localStorage.setItem(
      "physics-journal-v1",
      JSON.stringify({
        stage: 4,
        unlockedStage: 4,
        prediction: 1,
        runs: [
          {
            id: "legacy-run",
            speed: 2,
            duration: 5,
            distance: 10,
            created: Date.now(),
          },
        ],
        notes: [
          {
            id: "legacy-note",
            created: Date.now(),
            conclusion: "Իմ նախորդ գրառումը",
          },
        ],
        answers: { 0: 0, 1: 1, 2: 2 },
      }),
    ),
  );
  await page.reload();
  await page.locator('[data-page="notebook"]').first().click();
  await expect(page.locator(".note")).toContainText("Իմ նախորդ");
  await page.locator(".brand").click();
  await page.goto('/#lesson/motion');
  await expect(page.locator(".evidence")).toContainText("10");
  await page.locator("#stage-select").selectOption("1");
  await expect(page.locator('[data-predict="1"]')).toHaveClass(/selected/);
  await page.locator("#stage-select").selectOption("4");
  await expect(page.locator(".formula")).toBeVisible();
  await page.keyboard.press("Tab");
  expect(
    await page.evaluate(() => document.activeElement !== document.body),
  ).toBe(true);
  expect(failures).toEqual([]);
});
