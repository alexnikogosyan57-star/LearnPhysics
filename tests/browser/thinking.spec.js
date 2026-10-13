import { test, expect } from "@playwright/test";
async function stage(page, number, extras = {}) {
  await page.goto("/");
  await page.evaluate(
    ({ number, extras }) =>
      localStorage.setItem(
        "physics-journal-v1",
        JSON.stringify({
          stage: number,
          unlockedStage: 5,
          runs: [],
          notes: [],
          answers: {},
          prediction: null,
          ...extras,
        }),
      ),
    { number, extras },
  );
  await page.reload();
  await page.locator('.hero [data-page="lesson"]').click();
}
test("thinking clip ends naturally, does not restart on prediction selection", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await stage(page, 1);
  const mascot = page.locator('[data-mascot-state="thinking"]');
  await expect(mascot).toHaveAttribute("data-phase", "playing");
  const video = mascot.locator("video");
  expect(
    await video.evaluate((v) => ({
      width: v.videoWidth,
      height: v.videoHeight,
      muted: v.muted,
      loop: v.loop,
    })),
  ).toEqual({ width: 1080, height: 1920, muted: true, loop: false });
  await page
    .locator(".lesson-content")
    .evaluate((el) =>
      Promise.all(el.getAnimations().map((animation) => animation.finished)),
    );
  const box = await mascot.locator(".mascot-media").boundingBox();
  await expect(mascot).toHaveAttribute("data-phase", "idle", {
    timeout: 12000,
  });
  expect(await mascot.locator(".mascot-media").boundingBox()).toEqual(box);
  await expect(mascot.locator("img")).toBeVisible();
  await page.locator('[data-predict="1"]').click();
  await expect(mascot).toHaveAttribute("data-phase", "idle");
  expect(await mascot.locator("video").getAttribute("src")).toBeNull();
  await expect(page.locator("#next-stage")).toBeEnabled();
  expect(errors).toEqual([]);
});
test("a new observation and explicit hint trigger separate thinking events", async ({
  page,
}) => {
  await stage(page, 3);
  const mascot = page.locator('[data-mascot-state="thinking"]');
  await expect(mascot).toHaveAttribute("data-phase", "playing");
  await page.locator('[data-observe="0:1"]').click();
  await expect(mascot).toHaveAttribute("data-phase", "idle");
  await page.locator('[data-hint="0"]').click();
  await expect(mascot).toHaveAttribute("data-phase", "playing");
  await expect(mascot).toHaveAttribute(
    "data-mascot-event",
    "motion:observation:0:hint:1",
  );
  await page.locator('[data-observe="0:0"]').click();
  await page.locator("#next-observation").click();
  await expect(mascot).toHaveAttribute("data-phase", "playing");
  await expect(mascot).toHaveAttribute(
    "data-mascot-event",
    "motion:observation:1:hint:0",
  );
});
test("assessment thinking and reduced motion remain usable on mobile", async ({
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
  ).toBe(64);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.locator('[data-quiz="0"]').click();
  await page.locator("#submit-quiz").click();
  await page.locator("#quiz-hint").click();
  await expect(mascot).toHaveAttribute("data-phase", "playing");
  await expect(mascot).toHaveAttribute(
    "data-mascot-event",
    "motion:assessment:0:hint:1",
  );
  await page.locator("#quiz-hint").click();
  await expect(mascot).toHaveAttribute(
    "data-mascot-event",
    "motion:assessment:0:hint:2",
  );
  await expect(page.locator("#quiz-hint")).toHaveCount(0);
  await expect(mascot).toHaveAttribute("data-phase", "playing");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(mascot).toHaveAttribute("data-phase", "poster");
  expect(await mascot.locator("video").evaluate((v) => v.paused)).toBe(true);
  await expect(page.locator('[data-quiz="1"]')).toBeEnabled();
});
test("thinking reduced motion and failed media preserve the question", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await stage(page, 1);
  const mascot = page.locator('[data-mascot-state="thinking"]');
  expect(await mascot.locator("video").getAttribute("src")).toBeNull();
  await expect(mascot.locator("img")).toBeVisible();
  await page.route("**/thinking.mp4", (route) => route.abort());
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(mascot.locator(".mascot-status")).toContainText("հասանելի չէ");
  await page.locator('[data-predict="1"]').click();
  await expect(page.locator("#next-stage")).toBeEnabled();
});
