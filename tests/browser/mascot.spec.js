import { test, expect } from "@playwright/test";
for (const width of [1440, 390])
  test(`transparent greeting plays on entry then stays present at ${width}px`, async ({
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
    const alpha = await video.evaluate((v) => {
      const c = document.createElement("canvas");
      c.width = v.videoWidth;
      c.height = v.videoHeight;
      const x = c.getContext("2d");
      x.drawImage(v, 0, 0);
      return {
        corner: x.getImageData(0, 0, 1, 1).data[3],
        face: x.getImageData(216, 260, 1, 1).data[3],
      };
    });
    expect(alpha).toEqual({ corner: 0, face: 255 });
    await expect(page.locator(".mascot-poster")).not.toBeVisible();
    expect(state).toEqual({
      width: 432,
      height: 768,
      muted: true,
      loop: false,
      controls: false,
      inline: true,
      fit: "contain",
    });
    expect(Math.abs(box.width / box.height - 9 / 16)).toBeLessThan(0.002);
    await expect(page.locator(".video-companion")).toHaveAttribute("data-mascot-state", "idle", {timeout:10000});
    await expect(page.locator(".video-companion")).toHaveAttribute("data-phase", "playing");
    expect(await video.evaluate((el) => el.loop && !el.paused)).toBe(true);
    expect(await media.boundingBox()).toEqual(box);
    expect(
      await page
        .locator(".mascot-poster")
        .evaluate((el) => el.complete && el.naturalWidth > 0),
    ).toBe(true);
    await expect(page.locator(".mascot-poster")).not.toBeVisible();
    await page.locator('.hero [data-page="lesson"]').click();
    await page.locator(".brand").click();
    await expect(page.locator(".video-companion")).toHaveAttribute(
      "data-phase",
      "playing",
    );
    await expect(page.locator(".video-companion")).toHaveAttribute("data-mascot-state", "idle");
    expect(await page.locator(".mascot-video").getAttribute("src")).not.toBeNull();
    await page.reload();
    await expect(page.locator(".video-companion")).toHaveAttribute(
      "data-phase",
      "playing",
    );
    expect(
      await page.locator(".mascot-video").getAttribute("src"),
    ).not.toBeNull();
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
  expect(
    requests.some((url) => url.includes("greeting-transparent.webm")),
  ).toBe(false);
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
test("failed video uses the real animated image fallback and leaves lesson usable", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.route("**/greeting-transparent.webm*", (route) =>
    route.request().resourceType() === "media"
      ? route.abort()
      : route.continue(),
  );
  await page.goto("/");
  await expect(page.locator(".video-companion")).toHaveAttribute(
    "data-phase",
    "image-playing",
  );
  await expect(page.locator(".mascot-poster")).toHaveAttribute(
    "src",
    /greeting-transparent-animated/,
  );
  await page
    .locator(".hero")
    .evaluate((el) => Promise.all(el.getAnimations().map((a) => a.finished)));
  await page.waitForTimeout(200);
  const before = await page.locator(".mascot-media").screenshot();
  await page.waitForTimeout(1600);
  const after = await page.locator(".mascot-media").screenshot();
  expect(before.equals(after)).toBe(false);
  await expect(page.locator(".mascot-poster")).toBeVisible();
  await page.locator('.hero [data-page="lesson"]').click();
  await expect(page.locator("#next-stage")).toBeEnabled();
  expect(errors).toEqual([]);
});
