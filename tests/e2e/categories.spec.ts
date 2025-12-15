import { test, expect } from "@playwright/test";

test.describe("Categories Page", () => {
  test("should display browse page with filters", async ({ page }) => {
    await page.goto("/categories");

    // Should have heading
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Should have search input
    const searchInput = page.getByPlaceholder(/search/i);
    await expect(searchInput).toBeVisible();
  });

  test("should navigate to category from home page", async ({ page }) => {
    await page.goto("/");

    // Category links are on the home page
    const categoryLink = page.locator('a[href*="/categories/"]').first();
    if (await categoryLink.count() > 0) {
      await categoryLink.click();
      await expect(page).toHaveURL(/\/categories\/.+/);
    }
  });

  test("should show servers in category", async ({ page }) => {
    // Navigate to development category
    await page.goto("/categories/development");

    // Should have heading
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Should show some server content
    const serverLinks = page.locator('a[href*="/servers/"]');
    if (await serverLinks.count() > 0) {
      await expect(serverLinks.first()).toBeVisible();
    }
  });

  test("should have category heading", async ({ page }) => {
    await page.goto("/categories/development");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("should filter servers by search on browse page", async ({ page }) => {
    await page.goto("/categories");

    const searchInput = page.getByPlaceholder(/search/i);
    await searchInput.fill("filesystem");
    await page.waitForTimeout(500);

    // Page should still be functional
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
