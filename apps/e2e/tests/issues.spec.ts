import { test, expect, type Page } from "@playwright/test";

async function signUpAndOpenProjects(page: Page, name = "Issue User") {
  const unique = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  const email = `issues-${unique}@example.com`;
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
    await page.getByRole("button", { name: "Sign in" }).click();
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password").fill(password);
    await page.getByRole("button", { name: "Sign in" }).click();
  }

  await expect(page).toHaveURL(/\/projects/);
}

test.describe("Issues", () => {
  test("should create and manage issue in kanban, table, and detail views", async ({
    page,
  }) => {
    await signUpAndOpenProjects(page);

    await page.getByLabel("Name").fill("Issue Tracking Project");
    await page.getByLabel("Key").fill("ISS");
    await page.getByRole("button", { name: "Create project" }).click();
    await page.getByRole("link", { name: /ISS/ }).first().click();

    await page.getByRole("button", { name: "Issues" }).click();
    await page.getByLabel("Title").fill("Prepare release notes");
    await page.getByLabel("Description").fill("Initial issue description");
    await page.getByLabel("Due date").fill("2030-01-02");
    await page.getByRole("button", { name: "Add issue" }).click();
    await expect(page.getByText("Issue created.")).toBeVisible();

    await page.getByRole("button", { name: "Table" }).click();
    await expect(page.getByRole("link", { name: "Prepare release notes" })).toBeVisible();
    await page.getByRole("link", { name: "Prepare release notes" }).click();

    const assigneeOption = page.locator("select").nth(2).locator("option").nth(1);
    const assigneeText = (await assigneeOption.textContent()) ?? "";
    const handleMatch = assigneeText.match(/@\s*([a-zA-Z0-9._-]+)/);
    const handle = handleMatch?.[1] ?? "";

    await page.getByLabel("Description").fill(`Please review this @${handle}`);
    await page.getByRole("button", { name: "Save issue" }).click();
    await expect(page.getByText("Issue updated.")).toBeVisible();

    await expect(page.getByText(`@${handle}`)).toBeVisible();

    await page
      .locator("input[type='file']")
      .setInputFiles({
        name: "attachment.txt",
        mimeType: "text/plain",
        buffer: Buffer.from("hello attachment"),
      });
    await page.getByRole("button", { name: "Upload attachment" }).click();
    await expect(page.getByText("attachment.txt")).toBeVisible();
  });
});

