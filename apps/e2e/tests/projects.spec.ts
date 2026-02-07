import { test, expect, type Page } from "@playwright/test";

async function signUpAndOpenProjects(page: Page, name = "E2E User") {
  const unique = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  const email = `e2e-${unique}@example.com`;
  const password = "Password123!";

  await page.goto("/");
  await page.getByRole("button", { name: "Sign up" }).click();
  await page.getByLabel("Name").fill(name);
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

test.describe("Projects", () => {
  test("should create project, edit details, and upload document", async ({
    page,
  }) => {
    await signUpAndOpenProjects(page);

    await page.getByLabel("Name").fill("Operations Portal");
    await page.getByLabel("Key").fill("OPS");
    await page.getByLabel("Description").fill("Initial project description");
    await page.getByRole("button", { name: "Create project" }).click();

    await expect(page.getByText("Project OPS created.")).toBeVisible();
    await page.getByRole("link", { name: /OPS/ }).first().click();

    await page.getByRole("button", { name: "Overview" }).click();
    await page
      .getByLabel("Project details")
      .fill("Updated project details for E2E coverage.");
    await page.getByRole("button", { name: "Save details" }).click();
    await expect(page.getByText("Project details saved.")).toBeVisible();

    await page.getByRole("button", { name: "Documents" }).click();
    await page
      .locator("input[type='file']")
      .setInputFiles({
        name: "notes.txt",
        mimeType: "text/plain",
        buffer: Buffer.from("hello document"),
      });
    await page.getByRole("button", { name: "Upload" }).click();

    await expect(page.getByText("Document uploaded.")).toBeVisible();
    await expect(page.getByText("notes.txt")).toBeVisible();
  });
});
