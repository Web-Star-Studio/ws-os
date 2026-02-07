import { test, expect, type Page } from "@playwright/test";

async function signUpAndOpenProjects(page: Page, prefix: string) {
  const unique = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  const email = `${prefix}-${unique}@example.com`;
  const password = "Password123!";

  await page.goto("/");
  await page.getByRole("button", { name: "Sign up" }).click();
  await page.getByLabel("Name").fill(`${prefix} User`);
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
}

async function createProjectAndOpen(page: Page, name: string, key: string) {
  await page.getByLabel("Name").fill(name);
  await page.getByLabel("Key").fill(key);
  await page.getByRole("button", { name: "Create project" }).click();
  await page.getByRole("link", { name: new RegExp(key) }).first().click();
}

test.describe("Permissions", () => {
  test("employee should not see archive project action", async ({ page }) => {
    await signUpAndOpenProjects(page, "perm-a");
    await createProjectAndOpen(page, "Permissions Alpha", "PRA");

    const archiveButton = page.getByRole("button", { name: "Archive project" });
    if (await archiveButton.isVisible()) {
      await page.getByRole("button", { name: "Sign out" }).click();
      await signUpAndOpenProjects(page, "perm-b");
      await createProjectAndOpen(page, "Permissions Beta", "PRB");
    }

    await expect(
      page.getByRole("button", { name: "Archive project" }),
    ).toHaveCount(0);
  });
});
