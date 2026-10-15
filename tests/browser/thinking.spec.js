import { test, expect } from "@playwright/test";
async function stage(page, number) {
  await page.goto("/");
  await page.evaluate(
    (number) =>
      localStorage.setItem(
        "physics-journal-v1",
        JSON.stringify({
          stage: number,
          unlockedStage: 5,
          runs: [],
          notes: [],
          answers: {},
          prediction: null,
        }),
      ),
    number,
  );
  await page.reload();
  await page.goto('/#lesson/motion');
}
test("thinking loops past its duration with no poster underneath and no restart on selection", async ({
  page,
}) => {
  await stage(page, 1);
  const mascot = page.locator('[data-mascot-state="thinking"]');
  await expect(mascot).toHaveAttribute("data-phase", "playing");
  await mascot.locator("video").evaluate((video) => {
    window.liveThinking = video;
    window.wraps = 0;
    let last = video.currentTime;
    video.addEventListener("timeupdate", () => {
      if (video.currentTime < last) window.wraps++;
      last = video.currentTime;
    });
  });
  await expect(mascot.locator("img")).not.toBeVisible();
  await page.waitForTimeout(8800);
  expect(await page.evaluate(() => window.wraps)).toBeGreaterThan(0);
  expect(
    await mascot
      .locator("video")
      .evaluate((v) => v.loop && !v.paused && !v.ended),
  ).toBe(true);
  await expect(mascot).toHaveAttribute("data-phase", "playing");
  const time = await mascot.locator("video").evaluate((v) => v.currentTime);
  await page.locator('[data-predict="1"]').click();
  expect(
    await mascot.locator("video").evaluate((v) => v === window.liveThinking),
  ).toBe(true);
  expect(
    await mascot.locator("video").evaluate((v) => v.currentTime),
  ).toBeGreaterThanOrEqual(time);
  await expect(mascot.locator("img")).not.toBeVisible();
  await expect(page.locator("#next-stage")).toBeEnabled();
});
test("thinking resumes after answer and hint reactions and persists into the next observation", async ({
  page,
}) => {
  await stage(page, 3);
  const mascot = page.locator('[data-mascot-state="thinking"]');
  await expect(mascot).toHaveAttribute("data-phase", "playing");
  await page.locator('[data-observe="0:1"]').click();
  await page.locator("#submit-observation").click();
  await expect(page.locator('[data-mascot-state="confused"]')).toHaveAttribute("data-phase", "playing");
  await page.locator('[data-hint="0"]').click();
  await expect(page.locator('[data-mascot-state="eureka"]')).toHaveAttribute("data-phase", "playing");
  await expect(mascot).toHaveAttribute("data-phase", "playing", {timeout:7000});
  await mascot.locator("video").evaluate((v) => (window.liveThinking = v));
  await page.locator('[data-observe="0:0"]').click();
  await page.locator("#submit-observation").click();
  await page.locator("#next-observation").click();
  await expect(mascot).toHaveAttribute("data-phase", "playing");
  expect(
    await mascot.locator("video").evaluate((v) => v === window.liveThinking),
  ).toBe(true);
});
test("continuous thinking on mobile pauses for reduced motion and resumes when disabled", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await stage(page, 5);
  const mascot = page.locator('[data-mascot-state="thinking"]');
  await expect(mascot).toHaveAttribute("data-phase", "playing");
  expect(
    await mascot
      .locator(".mascot-media")
      .evaluate((el) => el.getBoundingClientRect().width),
  ).toBe(78);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(mascot).toHaveAttribute("data-phase", "poster");
  await expect(mascot.locator("img")).toBeVisible();
  expect(await mascot.locator("video").evaluate((v) => v.paused)).toBe(true);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(mascot).toHaveAttribute("data-phase", "playing");
  await expect(mascot.locator("img")).not.toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
test("failed thinking media leaves a usable transparent fallback", async ({
  page,
}) => {
  await page.route("**/thinking-transparent.webm*", (route) =>
    route.request().resourceType() === "media"
      ? route.abort()
      : route.continue(),
  );
  await stage(page, 1);
  const mascot = page.locator('[data-mascot-state="thinking"]');
  await expect(mascot.locator(".mascot-status")).toContainText("հասանելի չէ");
  await expect(mascot.locator("img")).toBeVisible();
  await page.locator('[data-predict="1"]').click();
  await expect(page.locator("#next-stage")).toBeEnabled();
});
