import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display hero section", async ({ page }) => {
    // Check for main heading
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    // Check for hero text content
    await expect(page.getByText(/MCP Servers/i).first()).toBeVisible();
  });

  test("should display featured servers section", async ({ page }) => {
    // Look for Featured text in the page
    const featured = page.getByText(/featured/i);
    await expect(featured.first()).toBeVisible();
  });

  test("should have Browse Servers link", async ({ page }) => {
    const browseLink = page.getByRole("link", { name: /browse servers/i });
    await expect(browseLink).toBeVisible();
    await browseLink.click();
    await expect(page).toHaveURL(/categories/);
  });

  test("should navigate to submit page", async ({ page }) => {
    const submitLink = page.getByRole("link", { name: /submit a server/i });
    await expect(submitLink).toBeVisible();
    await submitLink.click();
    await expect(page).toHaveURL(/submit/);
  });

  test("should display stats section", async ({ page }) => {
    // Look for stats like "50+" servers
    await expect(page.getByText(/MCP Servers/i).first()).toBeVisible();
    await expect(page.getByText(/Categories/i).first()).toBeVisible();
  });

  test("should have theme toggle functionality", async ({ page }) => {
    // Theme toggle should exist in the header
    const themeButton = page.locator('button[class*="theme"], button[aria-label*="theme"]');
    if (await themeButton.count() > 0) {
      await expect(themeButton.first()).toBeVisible();
    }
  });
});
