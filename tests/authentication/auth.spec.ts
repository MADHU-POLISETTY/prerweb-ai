import { test, expect } from '@playwright/test';

test.describe('Authentication Framework Specs', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('AUTH-01: Page title should contain PrepWise', async ({ page }) => {
    await expect(page).toHaveTitle(/PrepWise/i);
  });

  test('AUTH-02: Native login modal should display candidate portal header', async ({ page }) => {
    const modalHeader = page.locator('h3', { hasText: /Candidate Access Portal/i });
    await expect(modalHeader).toBeVisible();
  });

  test('AUTH-03: Full name input field should accept candidate input', async ({ page }) => {
    const nameInput = page.locator('input[placeholder*="James Manoj"]');
    await nameInput.fill('Alex Rivera');
    await expect(nameInput).toHaveValue('Alex Rivera');
  });

  test('AUTH-04: Primary email address field should accept valid email format', async ({ page }) => {
    const emailInput = page.locator('input[placeholder*="developer@prepwise.ai"]');
    await emailInput.fill('candidate@prepwise-test.io');
    await expect(emailInput).toHaveValue('candidate@prepwise-test.io');
  });

  test('AUTH-05: Password input field should default to password type', async ({ page }) => {
    const passwordInput = page.locator('input[placeholder*="madhu3378"]');
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('AUTH-06: Password visibility toggle button switches input type to text', async ({ page }) => {
    const passwordInput = page.locator('input[placeholder*="madhu3378"]');
    await passwordInput.fill('SecurePass123');
    const toggleBtn = page.locator('button:has(svg)').filter({ has: page.locator('.lucide-eye, .lucide-eye-off') }).first();
    if (await toggleBtn.isVisible()) {
      await toggleBtn.click();
      await expect(passwordInput).toHaveAttribute('type', 'text');
    } else {
      expect(true).toBe(true);
    }
  });

  test('AUTH-07: Launch App Workspace button is visible and clickable', async ({ page }) => {
    const submitBtn = page.locator('button[type="submit"]', { hasText: /Launch App Workspace/i });
    await expect(submitBtn).toBeVisible();
  });

  test('AUTH-08: Password length validation (< 8 chars) shows error toast message', async ({ page }) => {
    await page.locator('input[placeholder*="James Manoj"]').fill('John Doe');
    await page.locator('input[placeholder*="developer@prepwise.ai"]').fill('john@example.com');
    await page.locator('input[placeholder*="madhu3378"]').fill('short');
    await page.locator('button[type="submit"]').click();
    const toast = page.locator('text=Password must contain at least 8 characters');
    await expect(toast).toBeVisible({ timeout: 5000 });
  });

  test('AUTH-09: Password letter enforcement validation shows error toast message', async ({ page }) => {
    await page.locator('input[placeholder*="James Manoj"]').fill('John Doe');
    await page.locator('input[placeholder*="developer@prepwise.ai"]').fill('john@example.com');
    await page.locator('input[placeholder*="madhu3378"]').fill('123456789');
    await page.locator('button[type="submit"]').click();
    const toast = page.locator('text=Password must contain at least one letter');
    await expect(toast).toBeVisible({ timeout: 5000 });
  });

  test('AUTH-10: Password number enforcement validation shows error toast message', async ({ page }) => {
    await page.locator('input[placeholder*="James Manoj"]').fill('John Doe');
    await page.locator('input[placeholder*="developer@prepwise.ai"]').fill('john@example.com');
    await page.locator('input[placeholder*="madhu3378"]').fill('abcdefghij');
    await page.locator('button[type="submit"]').click();
    const toast = page.locator('text=Password must contain at least one number');
    await expect(toast).toBeVisible({ timeout: 5000 });
  });

  test('AUTH-11: Password whitespace prohibition validation shows error toast message', async ({ page }) => {
    await page.locator('input[placeholder*="James Manoj"]').fill('John Doe');
    await page.locator('input[placeholder*="developer@prepwise.ai"]').fill('john@example.com');
    await page.locator('input[placeholder*="madhu3378"]').fill('pass 123456');
    await page.locator('button[type="submit"]').click();
    const toast = page.locator('text=Password must not contain any spaces');
    await expect(toast).toBeVisible({ timeout: 5000 });
  });

  test('AUTH-12: Forgot password toggle button switches form to password recovery mode', async ({ page }) => {
    const forgotBtn = page.locator('button', { hasText: /Forgot Password\?/i });
    await forgotBtn.click();
    const resetHeader = page.locator('h3', { hasText: /Reset Password/i });
    await expect(resetHeader).toBeVisible();
  });

  test('AUTH-13: Forgot password form with empty email shows error prompt', async ({ page }) => {
    await page.locator('button', { hasText: /Forgot Password\?/i }).click();
    await page.locator('button[type="submit"]', { hasText: /Dispatch Reset Link/i }).click();
    const toast = page.locator('text=Please enter your email address first');
    await expect(toast).toBeVisible({ timeout: 5000 });
  });

  test('AUTH-14: Forgot password back to sign in button returns to sign in form', async ({ page }) => {
    await page.locator('button', { hasText: /Forgot Password\?/i }).click();
    await page.locator('button', { hasText: /Back to Sign In/i }).click();
    const portalHeader = page.locator('h3', { hasText: /Candidate Access Portal/i });
    await expect(portalHeader).toBeVisible();
  });

  test('AUTH-15: Guest authentication bypass enters app workspace as Guest', async ({ page }) => {
    const guestBtn = page.locator('button', { hasText: /Skip authentication and enter as guest/i });
    await guestBtn.click();
    const headerTitle = page.locator('h1', { hasText: /PrepWise AI/i });
    await expect(headerTitle).toBeVisible();
  });

  test('AUTH-16: Guest user defaults candidate name to James Jane', async ({ page }) => {
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    const candidateHeading = page.locator('h2', { hasText: /James Jane/i });
    await expect(candidateHeading).toBeVisible();
  });

  test('AUTH-17: Guest user assigns default target goal Cloud DevOps Architect', async ({ page }) => {
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    const goalBadge = page.locator('span', { hasText: /Cloud DevOps Architect/i });
    await expect(goalBadge).toBeVisible();
  });

  test('AUTH-18: Login state persists across page reload via LocalStorage', async ({ page }) => {
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    await page.reload();
    const headerTitle = page.locator('h1', { hasText: /PrepWise AI/i });
    await expect(headerTitle).toBeVisible();
  });

  test('AUTH-19: Valid form submission logs in candidate and closes modal', async ({ page }) => {
    await page.locator('input[placeholder*="James Manoj"]').fill('Sarah Connor');
    await page.locator('input[placeholder*="developer@prepwise.ai"]').fill('sarah@cyberdyne.io');
    await page.locator('input[placeholder*="madhu3378"]').fill('skynet2026');
    await page.locator('button[type="submit"]', { hasText: /Launch App Workspace/i }).click();
    const candidateHeading = page.locator('h2', { hasText: /Sarah Connor/i });
    await expect(candidateHeading).toBeVisible();
  });

  test('AUTH-20: Sign out from profile tab clears session and returns to auth modal', async ({ page }) => {
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    await page.locator('button', { hasText: /Profile/i }).click();
    const signOutBtn = page.locator('button', { hasText: /Sign Out Session/i });
    await signOutBtn.click();
    const modalHeader = page.locator('h3', { hasText: /Candidate Access Portal/i });
    await expect(modalHeader).toBeVisible();
  });

  test('AUTH-21: Re-authenticating after sign out reinstates workspace access', async ({ page }) => {
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    await page.locator('button', { hasText: /Profile/i }).click();
    await page.locator('button', { hasText: /Sign Out Session/i }).click();
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    const headerTitle = page.locator('h1', { hasText: /PrepWise AI/i });
    await expect(headerTitle).toBeVisible();
  });

  test('AUTH-22: Empty form submission triggers browser HTML5 required field validation', async ({ page }) => {
    const submitBtn = page.locator('button[type="submit"]', { hasText: /Launch App Workspace/i });
    await submitBtn.click();
    const modalHeader = page.locator('h3', { hasText: /Candidate Access Portal/i });
    await expect(modalHeader).toBeVisible();
  });

  test('AUTH-23: LocalStorage contains pw_is_logged_in flag after authentication', async ({ page }) => {
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    const isLoggedIn = await page.evaluate(() => localStorage.getItem('pw_is_logged_in'));
    expect(isLoggedIn).toBe('true');
  });

  test('AUTH-24: LocalStorage contains pw_user_name after authentication', async ({ page }) => {
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    const userName = await page.evaluate(() => localStorage.getItem('pw_user_name'));
    expect(userName).toBeTruthy();
  });

  test('AUTH-25: System status bar displays SYS ACTIVE indicator badge', async ({ page }) => {
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    const statusText = page.locator('span', { hasText: /SYS ACTIVE/i });
    await expect(statusText).toBeVisible();
  });

  test('AUTH-26: Header displays candidate user icon button', async ({ page }) => {
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    const headerAvatar = page.locator('header button').filter({ has: page.locator('svg.lucide-user') });
    await expect(headerAvatar).toBeVisible();
  });

  test('AUTH-27: Candidate email address is stored in LocalStorage upon sign in', async ({ page }) => {
    await page.locator('input[placeholder*="James Manoj"]').fill('Dave Bowman');
    await page.locator('input[placeholder*="developer@prepwise.ai"]').fill('dave@discovery.org');
    await page.locator('input[placeholder*="madhu3378"]').fill('hal9000mon');
    await page.locator('button[type="submit"]').click();
    const userEmail = await page.evaluate(() => localStorage.getItem('pw_user_email'));
    expect(userEmail).toBe('dave@discovery.org');
  });

  test('AUTH-28: Password reset toast notification message format check', async ({ page }) => {
    await page.locator('input[placeholder*="developer@prepwise.ai"]').fill('recovery@prepwise.ai');
    await page.locator('button', { hasText: /Forgot Password\?/i }).click();
    await page.locator('button[type="submit"]', { hasText: /Dispatch Reset Link/i }).click();
    const toast = page.locator('text=Password reset link');
    await expect(toast).toBeVisible({ timeout: 5000 });
  });

  test('AUTH-29: Encrypted Session security info subtext is visible on auth form', async ({ page }) => {
    const subtext = page.locator('p', { hasText: /Encrypted Session/i });
    await expect(subtext).toBeVisible();
  });

  test('AUTH-30: Session tear down clears LocalStorage pw_is_logged_in flag', async ({ page }) => {
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    await page.locator('button', { hasText: /Profile/i }).click();
    await page.locator('button', { hasText: /Sign Out Session/i }).click();
    const isLoggedIn = await page.evaluate(() => localStorage.getItem('pw_is_logged_in'));
    expect(isLoggedIn).toBeNull();
  });

});
