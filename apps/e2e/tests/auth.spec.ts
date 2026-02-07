import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test("should have auth API endpoint available", async ({ request }) => {
    const response = await request.get("/api/auth/ok");
    expect(response.ok()).toBeTruthy();
  });

  test("should allow sign up from the home page", async ({ page }) => {
    const unique = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const email = `e2e-${unique}@example.com`;
    await page.goto("/");

    await page.getByRole("button", { name: "Sign up" }).click();
    await page.getByLabel("Name").fill("E2E User");
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password").fill("Password123!");
    await page.getByRole("button", { name: "Create account" }).click();

    await expect(page.getByRole("link", { name: "Open projects" })).toBeVisible();
  });
});
