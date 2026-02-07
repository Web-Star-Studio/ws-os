import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should display auth entry page", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Project Work Management" })).toBeVisible();
    await expect(
      page.locator(".tab-row").getByRole("button", { name: "Sign in" }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign up" })).toBeVisible();
  });
});
