import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test("should allow sign up from the home page", async ({ page }) => {
    const unique = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const email = `e2e-${unique}@example.com`;
    const password = "Password123!";
    await page.goto("/");

    await page.getByRole("button", { name: "Sign up" }).click();
    await page.getByLabel("Name").fill("E2E User");
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password").fill(password);
    await page.getByRole("button", { name: "Create account" }).click();

    if (await page.getByRole("link", { name: "Open projects" }).isVisible()) {
      await page.getByRole("link", { name: "Open projects" }).click();
    } else {
      await page
        .locator(".tab-row")
        .getByRole("button", { name: "Sign in" })
        .click();
      await page.getByLabel("Email").fill(email);
      await page.getByLabel("Password").fill(password);
      await page.locator("form").getByRole("button", { name: "Sign in" }).click();
    }

    await expect(page).toHaveURL(/\/projects/);
  });
});
