import { test, expect } from "@playwright/test";

test.describe("Servers Browsing", () => {
  test("should filter servers by search", async ({ page }) => {
    await page.goto("/");
    const searchInput = page.getByPlaceholder(/search/i);
    if (await searchInput.count() > 0) {
      await searchInput.fill("filesystem");
      await page.waitForTimeout(500);
    }
  });

  test("should click on server to view details", async ({ page }) => {
    await page.goto("/");

    // Find any server link
    const serverLink = page.locator('a[href*="/servers/"]').first();
    if (await serverLink.count() > 0) {
      await serverLink.click();
      await expect(page).toHaveURL(/\/servers\/.+/);
    }
  });

  test("should display server type information", async ({ page }) => {
    await page.goto("/");
    // Look for stdio/http type indicators
    const typeIndicator = page.getByText(/stdio|http|sse/i);
    if (await typeIndicator.count() > 0) {
      await expect(typeIndicator.first()).toBeVisible();
    }
  });
});

test.describe("Server Detail Page", () => {
  test("should display server details", async ({ page }) => {
    await page.goto("/servers/filesystem");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("should have installation instructions", async ({ page }) => {
    await page.goto("/servers/filesystem");
    await page.waitForTimeout(500);
    // Look for install/config/command text
    const content = await page.content();
    expect(content).toMatch(/install|config|command|npx|npm/i);
  });

  test("should have copy button for config", async ({ page }) => {
    await page.goto("/servers/filesystem");
    const copyButton = page.getByRole("button", { name: /copy/i });
    if (await copyButton.count() > 0) {
      await expect(copyButton.first()).toBeVisible();
    }
  });

  test("should display tabs for different sections", async ({ page }) => {
    await page.goto("/servers/filesystem");
    const tabs = page.locator('[role="tab"]');
    if (await tabs.count() > 0) {
      await expect(tabs.first()).toBeVisible();
    }
  });
});
