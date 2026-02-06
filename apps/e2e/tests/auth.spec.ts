import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test("should have auth API endpoint available", async ({ request }) => {
    const response = await request.get("/api/auth/ok");
    expect(response.ok()).toBeTruthy();
  });
});
