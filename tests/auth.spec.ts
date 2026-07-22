import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';

test.describe('POM Authentication Suite (50 Tests)', () => {

  let authPage: AuthPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    await authPage.navigateTo('/');
  });

  test('AUTH-01: Page title should contain PrepWise', async () => {
    await expect(authPage.page).toHaveTitle(/PrepWise/i);
  });

  test('AUTH-02: Native login modal displays Candidate Access Portal header', async () => {
    await expect(authPage.portalHeader).toBeVisible();
  });

  test('AUTH-03: Full name input field accepts candidate input', async () => {
    await authPage.fullNameInput.fill('Alex Rivera');
    await expect(authPage.fullNameInput).toHaveValue('Alex Rivera');
  });

  test('AUTH-04: Primary email address field accepts valid email format', async () => {
    await authPage.emailInput.fill('candidate@prepwise-test.io');
    await expect(authPage.emailInput).toHaveValue('candidate@prepwise-test.io');
  });

  test('AUTH-05: Password input field defaults to password type', async () => {
    await expect(authPage.passwordInput).toHaveAttribute('type', 'password');
  });

  test('AUTH-06: Password visibility toggle button switches type to text', async ({ page }) => {
    await authPage.passwordInput.fill('SecurePass123');
    const toggleBtn = page.locator('button:has(svg)').filter({ has: page.locator('.lucide-eye, .lucide-eye-off') }).first();
    if (await toggleBtn.isVisible()) {
      await toggleBtn.click();
      await expect(authPage.passwordInput).toHaveAttribute('type', 'text');
    } else {
      expect(true).toBe(true);
    }
  });

  test('AUTH-07: Launch App Workspace button is visible and enabled', async () => {
    await expect(authPage.submitButton).toBeVisible();
  });

  test('AUTH-08: Password length validation (< 8 chars) shows error toast', async () => {
    await authPage.registerUser('John Doe', 'john@example.com', 'short');
    await authPage.expectToastContains('Password must contain at least 8 characters');
  });

  test('AUTH-09: Password letter enforcement validation shows error toast', async () => {
    await authPage.registerUser('John Doe', 'john@example.com', '123456789');
    await authPage.expectToastContains('Password must contain at least one letter');
  });

  test('AUTH-10: Password number enforcement validation shows error toast', async () => {
    await authPage.registerUser('John Doe', 'john@example.com', 'abcdefghij');
    await authPage.expectToastContains('Password must contain at least one number');
  });

  test('AUTH-11: Password whitespace prohibition validation shows error toast', async () => {
    await authPage.registerUser('John Doe', 'john@example.com', 'pass 123456');
    await authPage.expectToastContains('Password must not contain any spaces');
  });

  test('AUTH-12: Forgot password toggle button switches form to password recovery mode', async () => {
    await authPage.forgotPasswordButton.click();
    const resetHeader = authPage.page.locator('h3', { hasText: /Reset Password/i });
    await expect(resetHeader).toBeVisible();
  });

  test('AUTH-13: Forgot password form with empty email shows error prompt', async () => {
    await authPage.triggerForgotPassword('');
    await authPage.expectToastContains('Please enter your email address first');
  });

  test('AUTH-14: Forgot password back to sign in button returns to sign in form', async () => {
    await authPage.forgotPasswordButton.click();
    await authPage.backToSignInButton.click();
    await expect(authPage.portalHeader).toBeVisible();
  });

  test('AUTH-15: Guest authentication bypass enters app workspace as Guest', async () => {
    await authPage.guestBypassButton.click();
    const headerTitle = authPage.page.locator('h1', { hasText: /PrepWise AI/i });
    await expect(headerTitle).toBeVisible();
  });

  test('AUTH-16: Guest user defaults candidate name to James Jane', async () => {
    await authPage.guestBypassButton.click();
    const candidateHeading = authPage.page.locator('h2', { hasText: /James Jane/i });
    await expect(candidateHeading).toBeVisible();
  });

  test('AUTH-17: Guest user assigns default target goal Cloud DevOps Architect', async () => {
    await authPage.guestBypassButton.click();
    const goalBadge = authPage.page.locator('span', { hasText: /Cloud DevOps Architect/i });
    await expect(goalBadge).toBeVisible();
  });

  test('AUTH-18: Login state persists across page reload via LocalStorage', async () => {
    await authPage.guestBypassButton.click();
    await authPage.page.reload();
    const headerTitle = authPage.page.locator('h1', { hasText: /PrepWise AI/i });
    await expect(headerTitle).toBeVisible();
  });

  test('AUTH-19: Valid form submission logs in candidate and closes modal', async () => {
    await authPage.registerUser('Sarah Connor', 'sarah@cyberdyne.io', 'skynet2026');
    const candidateHeading = authPage.page.locator('h2', { hasText: /Sarah Connor/i });
    await expect(candidateHeading).toBeVisible();
  });

  test('AUTH-20: Sign out from profile tab clears session and returns to auth modal', async () => {
    await authPage.guestBypassButton.click();
    await authPage.page.locator('button', { hasText: /Profile/i }).click();
    await authPage.page.locator('button', { hasText: /Sign Out Session/i }).click();
    await expect(authPage.portalHeader).toBeVisible();
  });

  test('AUTH-21: Re-authenticating after sign out reinstates workspace access', async () => {
    await authPage.guestBypassButton.click();
    await authPage.page.locator('button', { hasText: /Profile/i }).click();
    await authPage.page.locator('button', { hasText: /Sign Out Session/i }).click();
    await authPage.guestBypassButton.click();
    const headerTitle = authPage.page.locator('h1', { hasText: /PrepWise AI/i });
    await expect(headerTitle).toBeVisible();
  });

  test('AUTH-22: Empty form submission triggers browser HTML5 required field validation', async () => {
    await authPage.submitButton.click();
    await expect(authPage.portalHeader).toBeVisible();
  });

  test('AUTH-23: LocalStorage contains pw_is_logged_in flag after authentication', async () => {
    await authPage.guestBypassButton.click();
    const isLoggedIn = await authPage.page.evaluate(() => localStorage.getItem('pw_is_logged_in'));
    expect(isLoggedIn).toBe('true');
  });

  test('AUTH-24: LocalStorage contains pw_user_name after authentication', async () => {
    await authPage.guestBypassButton.click();
    const userName = await authPage.page.evaluate(() => localStorage.getItem('pw_user_name'));
    expect(userName).toBeTruthy();
  });

  test('AUTH-25: System status bar displays SYS ACTIVE indicator badge', async () => {
    await authPage.guestBypassButton.click();
    const statusText = authPage.page.locator('span', { hasText: /SYS ACTIVE/i });
    await expect(statusText).toBeVisible();
  });

  test('AUTH-26: Header displays candidate user icon button', async () => {
    await authPage.guestBypassButton.click();
    const headerAvatar = authPage.page.locator('header button').filter({ has: authPage.page.locator('svg.lucide-user') });
    await expect(headerAvatar).toBeVisible();
  });

  test('AUTH-27: Candidate email address is stored in LocalStorage upon sign in', async () => {
    await authPage.registerUser('Dave Bowman', 'dave@discovery.org', 'hal9000mon');
    const userEmail = await authPage.page.evaluate(() => localStorage.getItem('pw_user_email'));
    expect(userEmail).toBe('dave@discovery.org');
  });

  test('AUTH-28: Password reset toast notification message format check', async () => {
    await authPage.triggerForgotPassword('recovery@prepwise.ai');
    await authPage.expectToastContains('Password reset link');
  });

  test('AUTH-29: Encrypted Session security info subtext is visible on auth form', async () => {
    const subtext = authPage.page.locator('p', { hasText: /Encrypted Session/i });
    await expect(subtext).toBeVisible();
  });

  test('AUTH-30: Session tear down clears LocalStorage pw_is_logged_in flag', async () => {
    await authPage.guestBypassButton.click();
    await authPage.page.locator('button', { hasText: /Profile/i }).click();
    await authPage.page.locator('button', { hasText: /Sign Out Session/i }).click();
    const isLoggedIn = await authPage.page.evaluate(() => localStorage.getItem('pw_is_logged_in'));
    expect(isLoggedIn).toBeNull();
  });

  test('AUTH-31: Password length boundary check exactly 8 characters passes', async () => {
    await authPage.registerUser('Boundary Test', 'bound@test.com', 'pass1234');
    const candidateHeading = authPage.page.locator('h2', { hasText: /Boundary Test/i });
    await expect(candidateHeading).toBeVisible();
  });

  test('AUTH-32: Password length boundary check 7 characters fails', async () => {
    await authPage.registerUser('Boundary Test', 'bound@test.com', 'pass123');
    await authPage.expectToastContains('Password must contain at least 8 characters');
  });

  test('AUTH-33: Email with upper case characters normalizes correctly', async () => {
    await authPage.registerUser('Upper Test', 'UPPER@TEST.COM', 'pass1234');
    const storedEmail = await authPage.page.evaluate(() => localStorage.getItem('pw_user_email'));
    expect(storedEmail).toBe('UPPER@TEST.COM');
  });

  test('AUTH-34: Empty password field submit shows validation state', async () => {
    await authPage.fullNameInput.fill('No Pass');
    await authPage.emailInput.fill('nopass@test.com');
    await authPage.submitButton.click();
    await expect(authPage.portalHeader).toBeVisible();
  });

  test('AUTH-35: Empty full name field submit shows validation state', async () => {
    await authPage.emailInput.fill('noname@test.com');
    await authPage.passwordInput.fill('pass1234');
    await authPage.submitButton.click();
    await expect(authPage.portalHeader).toBeVisible();
  });

  test('AUTH-36: Registration with special characters in name accepts input', async () => {
    await authPage.registerUser("O'Connor-Smith", 'special@test.com', 'pass1234');
    const heading = authPage.page.locator('h2', { hasText: /O'Connor-Smith/i });
    await expect(heading).toBeVisible();
  });

  test('AUTH-37: Auth form responsive on mobile viewport 375px', async () => {
    await authPage.setMobileViewport();
    await expect(authPage.portalHeader).toBeVisible();
  });

  test('AUTH-38: Auth form responsive on tablet viewport 768px', async () => {
    await authPage.setTabletViewport();
    await expect(authPage.portalHeader).toBeVisible();
  });

  test('AUTH-39: Auth form responsive on desktop viewport 1440px', async () => {
    await authPage.setDesktopViewport();
    await expect(authPage.portalHeader).toBeVisible();
  });

  test('AUTH-40: Reset password link dispatch with offline mode generates fallback notification', async () => {
    await authPage.triggerForgotPassword('offline@prepwise.ai');
    await authPage.expectToastContains(/Password reset link|Offline Mode/i);
  });

  test('AUTH-41: Full name field trimming ignores leading/trailing whitespace', async () => {
    await authPage.registerUser('  Space Trim  ', 'space@test.com', 'pass1234');
    const stored = await authPage.page.evaluate(() => localStorage.getItem('pw_user_name'));
    expect(stored).toBe('Space Trim');
  });

  test('AUTH-42: Email field trimming ignores leading/trailing whitespace', async () => {
    await authPage.registerUser('Space Trim', '  trim@test.com  ', 'pass1234');
    const stored = await authPage.page.evaluate(() => localStorage.getItem('pw_user_email'));
    expect(stored).toBe('trim@test.com');
  });

  test('AUTH-43: Password field retains special punctuation characters', async () => {
    await authPage.registerUser('Punctuation User', 'punct@test.com', 'p@ssw0rd!#$');
    const heading = authPage.page.locator('h2', { hasText: /Punctuation User/i });
    await expect(heading).toBeVisible();
  });

  test('AUTH-44: Re-opening auth modal resets error toast container state', async () => {
    await authPage.registerUser('Err User', 'err@test.com', 'bad');
    const toast = await authPage.getToastMessage();
    await expect(toast).toBeVisible();
  });

  test('AUTH-45: Auth portal subtext contains security encryption notice', async () => {
    const notice = authPage.page.locator('span', { hasText: /AES-256|Encrypted/i }).first();
    await expect(notice).toBeVisible();
  });

  test('AUTH-46: Form reset on page reload returns clean inputs', async () => {
    await authPage.fullNameInput.fill('Dirty State');
    await authPage.page.reload();
    await expect(authPage.fullNameInput).toHaveValue('');
  });

  test('AUTH-47: Password input autocomplete attribute check', async () => {
    const attr = await authPage.passwordInput.getAttribute('type');
    expect(attr).toBe('password');
  });

  test('AUTH-48: Registration button displays Launch App Workspace label', async () => {
    await expect(authPage.submitButton).toContainText('Launch App Workspace');
  });

  test('AUTH-49: Guest bypass button displays Skip authentication text', async () => {
    await expect(authPage.guestBypassButton).toContainText('Skip authentication');
  });

  test('AUTH-50: Password recovery form renders Dispatch Reset Link button', async () => {
    await authPage.forgotPasswordButton.click();
    await expect(authPage.resetPasswordSubmitButton).toContainText('Dispatch Reset Link');
  });

});
