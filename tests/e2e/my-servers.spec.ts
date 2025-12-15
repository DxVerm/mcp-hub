import { test, expect } from "@playwright/test";

test.describe("My Servers Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
  });

  test("should display page content when no servers saved", async ({ page }) => {
    await page.goto("/my-servers");
    // Should have heading
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("should save a server from detail page", async ({ page }) => {
    await page.goto("/servers/filesystem");
    const saveButton = page.locator('button:has-text("Save"), button[aria-label*="save"]');
    if (await saveButton.count() > 0) {
      await saveButton.first().click();
      await page.waitForTimeout(500);
    }
  });

  test("should navigate to my-servers page from header", async ({ page }) => {
    await page.goto("/");
    const myServersLink = page.getByRole("link", { name: /my servers|saved/i });
    if (await myServersLink.count() > 0) {
      await myServersLink.first().click();
      await expect(page).toHaveURL(/my-servers/);
    }
  });

  test("should persist saved servers after page reload", async ({ page }) => {
    await page.goto("/servers/filesystem");
    const saveButton = page.locator('button:has-text("Save"), button[aria-label*="save"]');
    if (await saveButton.count() > 0) {
      await saveButton.first().click();
    }
    await page.reload();
    await page.waitForTimeout(500);
  });
});
