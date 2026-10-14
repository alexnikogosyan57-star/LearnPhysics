import { test, expect } from "@playwright/test";
for (const width of [1440, 390])
  test(`exact greeting plays once and rests at ${width}px`, async ({
    page,
  }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const video = page.locator(".mascot-video"),
      media = page.locator(".mascot-media");
    await expect(page.locator(".video-companion")).toHaveAttribute(
      "data-phase",
      "playing",
    );
    await page
      .locator(".hero")
      .evaluate((el) =>
        Promise.all(el.getAnimations().map((animation) => animation.finished)),
      );
    const box = await media.boundingBox();
    const state = await video.evaluate((el) => ({
      width: el.videoWidth,
      height: el.videoHeight,
      muted: el.muted,
      loop: el.loop,
      controls: el.controls,
      inline: el.playsInline,
      fit: getComputedStyle(el).objectFit,
    }));
    expect(state).toEqual({
      width: 1080,
      height: 1920,
      muted: true,
      loop: false,
      controls: false,
      inline: true,
      fit: "contain",
    });
    expect(Math.abs(box.width / box.height - 9 / 16)).toBeLessThan(0.002);
    await expect(page.locator(".video-companion")).toHaveAttribute(
      "data-phase",
      "idle",
      { timeout: 10000 },
    );
    expect(await video.evaluate((el) => el.ended)).toBe(true);
    expect(await media.boundingBox()).toEqual(box);
    expect(
      await page
        .locator(".mascot-poster")
        .evaluate((el) => el.complete && el.naturalWidth > 0),
    ).toBe(true);
    await expect(page.locator(".mascot-poster")).toBeVisible();
    await page.locator('.hero [data-page="lesson"]').click();
    await page.locator(".brand").click();
    await expect(page.locator(".video-companion")).toHaveAttribute(
      "data-phase",
      "idle",
    );
    expect(await page.locator(".mascot-video").getAttribute("src")).toBeNull();
    await page.reload();
    await expect(page.locator(".video-companion")).toHaveAttribute(
      "data-phase",
      "idle",
    );
    expect(await page.locator(".mascot-video").getAttribute("src")).toBeNull();
    expect(errors).toEqual([]);
  });
test("reduced motion shows only a poster without fetching the video", async ({
  page,
}) => {
  const requests = [];
  page.on("request", (request) => {
    if (request.resourceType() === "media") requests.push(request.url());
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".mascot-poster")).toBeVisible();
  expect(await page.locator(".mascot-video").getAttribute("src")).toBeNull();
  expect(requests.some((url) => url.includes("greeting.mp4"))).toBe(false);
  await expect(page.locator(".mascot-play")).not.toBeVisible();
  expect(
    await page
      .locator(".mascot-poster")
      .evaluate((el) => el.complete && el.naturalWidth > 0),
  ).toBe(true);
});
test("blocked autoplay offers a keyboard-accessible greeting action", async ({
  page,
}) => {
  await page.addInitScript(() => {
    window.blockGreeting = true;
    const native = HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play = function () {
      return window.blockGreeting
        ? Promise.reject(new DOMException("Blocked", "NotAllowedError"))
        : native.call(this);
    };
  });
  await page.goto("/");
  await expect(page.locator(".mascot-play")).toBeVisible();
  await expect(page.locator(".mascot-poster")).toBeVisible();
  await page.evaluate(() => {
    window.blockGreeting = false;
  });
  await page.locator(".mascot-play").focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".video-companion")).toHaveAttribute(
    "data-phase",
    "playing",
  );
  await expect(page.locator(".mascot-play")).not.toBeVisible();
});
test("failed video retains poster and leaves lesson usable", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.route("**/greeting.mp4", (route) => route.abort());
  await page.goto("/");
  await expect(page.locator(".mascot-status")).toContainText("հասանելի չէ");
  await expect(page.locator(".mascot-poster")).toBeVisible();
  await page.locator('.hero [data-page="lesson"]').click();
  await expect(page.locator("#next-stage")).toBeEnabled();
  expect(errors).toEqual([]);
});
