import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should display the landing page", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "WS Starter" }),
    ).toBeVisible();
  });

  test("should show unauthenticated state by default", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("You are not signed in")).toBeVisible();
  });
});
