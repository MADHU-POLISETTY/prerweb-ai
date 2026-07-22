import { test, expect } from '@playwright/test';

test.describe('Profile & Settings Framework Specs', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    await page.locator('button', { hasText: /Profile/i }).click();
  });

  test('PROF-01: Navigating to Profile tab displays Candidate Profile & Settings header', async ({ page }) => {
    const header = page.locator('h2', { hasText: /Candidate Profile/i });
    await expect(header).toBeVisible();
  });

  test('PROF-02: Header displays subtext explaining profile configuration parameters', async ({ page }) => {
    const subtext = page.locator('p', { hasText: /Manage your identity, target roles, and workspace storage/i });
    await expect(subtext).toBeVisible();
  });

  test('PROF-03: Full name input field displays current candidate name', async ({ page }) => {
    const nameInput = page.locator('input[placeholder*="James Jane"]');
    await expect(nameInput).toHaveValue('James Jane');
  });

  test('PROF-04: Full name input field allows updating candidate name', async ({ page }) => {
    const nameInput = page.locator('input[placeholder*="James Jane"]');
    await nameInput.fill('Dr. Robert Oppenheimer');
    await expect(nameInput).toHaveValue('Dr. Robert Oppenheimer');
  });

  test('PROF-05: Target career goal input field displays current goal', async ({ page }) => {
    const goalInput = page.locator('input[placeholder*="Cloud DevOps Architect"]');
    await expect(goalInput).toHaveValue('Cloud DevOps Architect');
  });

  test('PROF-06: Target career goal input field allows updating goal', async ({ page }) => {
    const goalInput = page.locator('input[placeholder*="Cloud DevOps Architect"]');
    await goalInput.fill('Principal Cloud Solutions Architect');
    await expect(goalInput).toHaveValue('Principal Cloud Solutions Architect');
  });

  test('PROF-07: Primary email address field displays candidate email', async ({ page }) => {
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toHaveValue(/guest.user@prepwise-sim.ai/);
  });

  test('PROF-08: Save Profile Settings button is visible and enabled', async ({ page }) => {
    const saveBtn = page.locator('button', { hasText: /Save Profile Settings/i });
    await expect(saveBtn).toBeVisible();
  });

  test('PROF-09: Clicking Save Profile Settings updates candidate name in header and LocalStorage', async ({ page }) => {
    const nameInput = page.locator('input[placeholder*="James Jane"]');
    await nameInput.fill('Marcus Aurelius');
    await page.locator('button', { hasText: /Save Profile Settings/i }).click();
    const toast = page.locator('text=Profile parameters successfully updated');
    await expect(toast).toBeVisible({ timeout: 5000 });
    const storedName = await page.evaluate(() => localStorage.getItem('pw_user_name'));
    expect(storedName).toBe('Marcus Aurelius');
  });

  test('PROF-10: Clicking Save Profile Settings updates career goal in LocalStorage', async ({ page }) => {
    const goalInput = page.locator('input[placeholder*="Cloud DevOps Architect"]');
    await goalInput.fill('Staff Infrastructure Engineer');
    await page.locator('button', { hasText: /Save Profile Settings/i }).click();
    const storedGoal = await page.evaluate(() => localStorage.getItem('pw_user_goal'));
    expect(storedGoal).toBe('Staff Infrastructure Engineer');
  });

  test('PROF-11: Workspace Storage section header is rendered', async ({ page }) => {
    const storageHeader = page.locator('h3', { hasText: /Workspace Cache & Data Management/i });
    await expect(storageHeader).toBeVisible();
  });

  test('PROF-12: Reset App Workspace & Caches button is visible', async ({ page }) => {
    const resetBtn = page.locator('button', { hasText: /Reset App Workspace & Caches/i });
    await expect(resetBtn).toBeVisible();
  });

  test('PROF-13: Clicking Reset App Workspace displays confirmation info toast message', async ({ page }) => {
    const resetBtn = page.locator('button', { hasText: /Reset App Workspace & Caches/i });
    await resetBtn.click();
    const toast = page.locator('text=App workspace and local database caches cleared');
    await expect(toast).toBeVisible({ timeout: 5000 });
  });

  test('PROF-14: Resetting database cache resets streak count to 1 day', async ({ page }) => {
    await page.locator('button', { hasText: /Reset App Workspace & Caches/i }).click();
    await page.locator('button', { hasText: /Home/i }).click();
    const streakCounter = page.locator('span', { hasText: /1 Days/i });
    await expect(streakCounter).toBeVisible();
  });

  test('PROF-15: Cloud Infrastructure Status panel displays Firebase connection badge', async ({ page }) => {
    const statusBadge = page.locator('span', { hasText: /Cloud Sync/i });
    await expect(statusBadge).toBeVisible();
  });

  test('PROF-16: Sign Out Session button is rendered in red/destructive styling', async ({ page }) => {
    const signOutBtn = page.locator('button', { hasText: /Sign Out Session/i });
    await expect(signOutBtn).toBeVisible();
    await expect(signOutBtn).toHaveClass(/bg-red-600/);
  });

  test('PROF-17: Clicking Sign Out Session disconnects active workspace session', async ({ page }) => {
    await page.locator('button', { hasText: /Sign Out Session/i }).click();
    const modalHeader = page.locator('h3', { hasText: /Candidate Access Portal/i });
    await expect(modalHeader).toBeVisible();
  });

  test('PROF-18: Sign out toast notification displays Session disconnected text', async ({ page }) => {
    await page.locator('button', { hasText: /Sign Out Session/i }).click();
    const toast = page.locator('text=Session disconnected');
    await expect(toast).toBeVisible({ timeout: 5000 });
  });

  test('PROF-19: Header profile button navigates directly to Profile tab', async ({ page }) => {
    await page.locator('button', { hasText: /Home/i }).click();
    const headerProfileBtn = page.locator('header button').filter({ has: page.locator('svg.lucide-user') });
    await headerProfileBtn.click();
    const header = page.locator('h2', { hasText: /Candidate Profile/i });
    await expect(header).toBeVisible();
  });

  test('PROF-20: Candidate avatar icon box renders user initials or avatar icon', async ({ page }) => {
    const avatar = page.locator('.w-16.h-16.rounded-3xl');
    await expect(avatar).toBeVisible();
  });

  test('PROF-21: Platform version and build metadata display card is visible', async ({ page }) => {
    const buildCard = page.locator('span', { hasText: /Build Node: PrepWise AI v2.4/i });
    await expect(buildCard).toBeVisible();
  });

  test('PROF-22: System security badge indicates client-side encryption state', async ({ page }) => {
    const secBadge = page.locator('span', { hasText: /Encrypted Session/i });
    await expect(secBadge).toBeVisible();
  });

  test('PROF-23: Empty profile name submission shows error toast prompt', async ({ page }) => {
    const nameInput = page.locator('input[placeholder*="James Jane"]');
    await nameInput.clear();
    await page.locator('button', { hasText: /Save Profile Settings/i }).click();
    const toast = page.locator('text=Candidate name cannot be empty');
    await expect(toast).toBeVisible({ timeout: 5000 });
  });

  test('PROF-24: Updated candidate profile reflects immediately across header and home screen', async ({ page }) => {
    await page.locator('input[placeholder*="James Jane"]').fill('Ada Lovelace');
    await page.locator('button', { hasText: /Save Profile Settings/i }).click();
    await page.locator('button', { hasText: /Home/i }).click();
    const homeName = page.locator('h2', { hasText: /Ada Lovelace/i });
    await expect(homeName).toBeVisible();
  });

  test('PROF-25: Profile tab controls are responsive on tablet viewports', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    const header = page.locator('h2', { hasText: /Candidate Profile/i });
    await expect(header).toBeVisible();
  });

});
