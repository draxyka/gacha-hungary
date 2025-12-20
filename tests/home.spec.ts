import { expect, test } from '@playwright/test';

test.describe('Főoldal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('Videók elérhetők és betöltődnek', async ({ page }) => {
    const videos = page.locator('video');
    await expect(videos).toHaveCount(4);
  });

  test('Navigáció Wuthering Waves oldalra', async ({ page }) => {
    const wuwaLink = page.locator('.home-item.wuwa');
    await wuwaLink.click();

    await expect(page).toHaveURL(/.*\/wuthering-waves$/);
  });

  test('Le van tiltva a Star Rail link', async ({ page }) => {
    const hsrLink = page.locator('.home-item.hsr');

    await expect(hsrLink).toHaveClass(/is-disabled/);

    await hsrLink.click({ force: true });
    await expect(page).not.toHaveURL(/.*\/honkai-star-rail$/);
  });

  test('Le van tiltva a ZZZ link', async ({ page }) => {
    const zzzLink = page.locator('.home-item.zzz');

    await expect(zzzLink).toHaveClass(/is-disabled/);

    await zzzLink.click({ force: true });
    await expect(page).not.toHaveURL(/.*\/zenless-zone-zero$/);
  });

  test('Le van tiltva a Genshin link', async ({ page }) => {
    const genshinLink = page.locator('.home-item.genshin');

    await expect(genshinLink).toHaveClass(/is-disabled/);

    await genshinLink.click({ force: true });
    await expect(page).not.toHaveURL(/.*\/genshin-impact$/);
  });
});
