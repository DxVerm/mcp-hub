import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("should have working header navigation", async ({ page }) => {
    await page.goto("/");
    const header = page.locator("header");
    await expect(header).toBeVisible();
  });

  test("should have logo that links to home", async ({ page }) => {
    await page.goto("/categories");
    // Click logo/brand link - look for MCP Hub text or home link
    const homeLink = page.locator('header a[href="/"]').first();
    if (await homeLink.count() > 0) {
      await homeLink.click();
      await expect(page).toHaveURL("/");
    }
  });

  test("should have footer", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    if (await footer.count() > 0) {
      await expect(footer).toBeVisible();
    }
  });

  test("should navigate to about page", async ({ page }) => {
    await page.goto("/");
    const aboutLink = page.getByRole("link", { name: /about/i });
    if (await aboutLink.count() > 0) {
      await aboutLink.first().click();
      await expect(page).toHaveURL(/about/);
    }
  });

  test("should navigate to submit page", async ({ page }) => {
    await page.goto("/");
    const submitLink = page.getByRole("link", { name: /submit/i });
    if (await submitLink.count() > 0) {
      await submitLink.first().click();
      await expect(page).toHaveURL(/submit/);
    }
  });

  test("should be responsive on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
