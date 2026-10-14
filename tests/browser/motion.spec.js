import { test, expect } from "@playwright/test";
test("thinking video and resting poster have actual transparent pixels", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator('.hero [data-page="lesson"]').click();
  await page.locator("#next-stage").click();
  const mascot = page.locator('[data-mascot-state="thinking"]');
  await expect(mascot).toHaveAttribute("data-phase", "playing");
  const pixels = await mascot.locator("video").evaluate((v) => {
    const canvas = document.createElement("canvas");
    canvas.width = v.videoWidth;
    canvas.height = v.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(v, 0, 0);
    return {
      corner: ctx.getImageData(0, 0, 1, 1).data[3],
      body: ctx.getImageData(216, 290, 1, 1).data[3],
    };
  });
  expect(pixels).toEqual({ corner: 0, body: 255 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(mascot).toHaveAttribute("data-phase", "poster");
  expect(
    await mascot.locator("img").evaluate((img) => {
      const c = document.createElement("canvas");
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      const x = c.getContext("2d");
      x.drawImage(img, 0, 0);
      return x.getImageData(0, 0, 1, 1).data[3];
    }),
  ).toBe(0);
});
test("transitions respond to selection, disclosures, and actual wheel travel", async ({
  page,
}) => {
  await page.addInitScript(() => {
    window.graphTransitions = 0;
    const original = Element.prototype.animate;
    Element.prototype.animate = function (frames, options) {
      if (this.classList.contains("graph-wrap")) window.graphTransitions++;
      return original.call(this, frames, options);
    };
  });
  await page.goto("/");
  await page.locator('.hero [data-page="lesson"]').click();
  await page.locator("#next-stage").click();
  await page
    .locator(".lesson-content")
    .evaluate((el) => Promise.all(el.getAnimations().map((a) => a.finished)));
  await page.locator('[data-predict="1"]').click();
  expect(
    await page
      .locator(".answer.selected")
      .evaluate((el) => el.getAnimations().length),
  ).toBeGreaterThan(0);
  expect(
    await page
      .locator(".lesson-content")
      .evaluate((el) => el.getAnimations().length),
  ).toBe(0);
  await page.locator("#next-stage").click();
  await page.locator("#graph-details summary").click();
  await expect.poll(() => page.evaluate(() => window.graphTransitions)).toBeGreaterThan(0);
  await page.locator("#run").click();
  await page.waitForTimeout(300);
  await page.locator("#run").click();
  const wheel = page.locator("#robot-lab [data-wheel-rotor]").first();
  const paused = await wheel.getAttribute("transform");
  expect(paused).not.toBe("rotate(0)");
  await page.waitForTimeout(150);
  await expect(wheel).toHaveAttribute("transform", paused);
  await page.locator("#reset").click();
  await expect(wheel).toHaveAttribute("transform", "rotate(0)");
});
test("reduced motion disables added transitions and wheel decoration", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator('.hero [data-page="lesson"]').click();
  await page.locator("#next-stage").click();
  await page.locator('[data-predict="1"]').click();
  expect(
    await page
      .locator(".answer.selected")
      .evaluate((el) => el.getAnimations().length),
  ).toBe(0);
  await page.locator("#next-stage").click();
  await page.locator("#run").click();
  await page.waitForTimeout(300);
  await expect(
    page.locator("#robot-lab [data-wheel-rotor]").first(),
  ).toHaveAttribute("transform", "rotate(0)");
  expect(await page.locator("#read-distance").textContent()).not.toMatch(/^0 /);
});
