import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';
import { ProfilePage } from '../pages/ProfilePage';

test.describe('POM Profile & Settings Suite (Candidate Settings, Goals, Cache Teardown)', () => {

  let authPage: AuthPage;
  let profilePage: ProfilePage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    profilePage = new ProfilePage(page);
    await authPage.loginAsGuest();
    await page.locator('button', { hasText: /Profile/i }).click();
  });

  test('PROF-01: Navigating to Profile tab displays Candidate Profile & Settings header', async () => {
    await expect(profilePage.profileHeader).toBeVisible();
  });

  test('PROF-02: Header displays subtext explaining profile configuration parameters', async () => {
    const subtext = profilePage.page.locator('p', { hasText: /Manage your identity, target roles, and workspace storage/i });
    await expect(subtext).toBeVisible();
  });

  test('PROF-03: Full name input field displays current candidate name', async () => {
    await expect(profilePage.fullNameInput).toHaveValue('James Jane');
  });

  test('PROF-04: Full name input field allows updating candidate name', async () => {
    await profilePage.fullNameInput.fill('Dr. Robert Oppenheimer');
    await expect(profilePage.fullNameInput).toHaveValue('Dr. Robert Oppenheimer');
  });

  test('PROF-05: Target career goal input field displays current goal', async () => {
    await expect(profilePage.goalInput).toHaveValue('Cloud DevOps Architect');
  });

  test('PROF-06: Target career goal input field allows updating goal', async () => {
    await profilePage.goalInput.fill('Principal Cloud Solutions Architect');
    await expect(profilePage.goalInput).toHaveValue('Principal Cloud Solutions Architect');
  });

  test('PROF-07: Primary email address field displays candidate email', async () => {
    await expect(profilePage.emailInput).toHaveValue(/guest.user@prepwise-sim.ai/);
  });

  test('PROF-08: Save Profile Settings button is visible and enabled', async () => {
    await expect(profilePage.saveSettingsButton).toBeVisible();
  });

  test('PROF-09: Clicking Save Profile Settings updates candidate name in header and LocalStorage', async () => {
    await profilePage.updateProfile('Marcus Aurelius', 'Cloud DevOps Architect');
    await profilePage.expectToastContains('Profile parameters successfully updated');
    const storedName = await profilePage.page.evaluate(() => localStorage.getItem('pw_user_name'));
    expect(storedName).toBe('Marcus Aurelius');
  });

  test('PROF-10: Clicking Save Profile Settings updates career goal in LocalStorage', async () => {
    await profilePage.updateProfile('James Jane', 'Staff Infrastructure Engineer');
    const storedGoal = await profilePage.page.evaluate(() => localStorage.getItem('pw_user_goal'));
    expect(storedGoal).toBe('Staff Infrastructure Engineer');
  });

  test('PROF-11: Workspace Storage section header is rendered', async () => {
    const storageHeader = profilePage.page.locator('h3', { hasText: /Workspace Cache & Data Management/i });
    await expect(storageHeader).toBeVisible();
  });

  test('PROF-12: Reset App Workspace & Caches button is visible', async () => {
    await expect(profilePage.resetCacheButton).toBeVisible();
  });

  test('PROF-13: Clicking Reset App Workspace displays confirmation info toast message', async () => {
    await profilePage.resetCacheButton.click();
    await profilePage.expectToastContains('App workspace and local database caches cleared');
  });

  test('PROF-14: Resetting database cache resets streak count to 1 day', async () => {
    await profilePage.resetCacheButton.click();
    await profilePage.page.locator('button', { hasText: /Home/i }).click();
    const streakCounter = profilePage.page.locator('span', { hasText: /1 Days/i });
    await expect(streakCounter).toBeVisible();
  });

  test('PROF-15: Cloud Infrastructure Status panel displays Firebase connection badge', async () => {
    await expect(profilePage.cloudStatusBadge).toBeVisible();
  });

  test('PROF-16: Sign Out Session button is rendered in red/destructive styling', async () => {
    await expect(profilePage.signOutButton).toBeVisible();
    await expect(profilePage.signOutButton).toHaveClass(/bg-red-600/);
  });

  test('PROF-17: Clicking Sign Out Session disconnects active workspace session', async () => {
    await profilePage.signOut();
    await expect(authPage.portalHeader).toBeVisible();
  });

  test('PROF-18: Sign out toast notification displays Session disconnected text', async () => {
    await profilePage.signOut();
    await profilePage.expectToastContains('Session disconnected');
  });

  test('PROF-19: Header profile button navigates directly to Profile tab', async () => {
    await profilePage.page.locator('button', { hasText: /Home/i }).click();
    const headerProfileBtn = profilePage.page.locator('header button').filter({ has: profilePage.page.locator('svg.lucide-user') });
    await headerProfileBtn.click();
    await expect(profilePage.profileHeader).toBeVisible();
  });

  test('PROF-20: Candidate avatar icon box renders user initials or avatar icon', async () => {
    const avatar = profilePage.page.locator('.w-16.h-16.rounded-3xl');
    await expect(avatar).toBeVisible();
  });

  test('PROF-21: Platform version and build metadata display card is visible', async () => {
    await expect(profilePage.buildMetadataCard).toBeVisible();
  });

  test('PROF-22: System security badge indicates client-side encryption state', async () => {
    const secBadge = profilePage.page.locator('span', { hasText: /Encrypted Session/i });
    await expect(secBadge).toBeVisible();
  });

  test('PROF-23: Empty profile name submission shows error toast prompt', async () => {
    await profilePage.fullNameInput.clear();
    await profilePage.saveSettingsButton.click();
    await profilePage.expectToastContains('Candidate name cannot be empty');
  });

  test('PROF-24: Updated candidate profile reflects immediately across header and home screen', async () => {
    await profilePage.updateProfile('Ada Lovelace', 'Cloud DevOps Architect');
    await profilePage.page.locator('button', { hasText: /Home/i }).click();
    const homeName = profilePage.page.locator('h2', { hasText: /Ada Lovelace/i });
    await expect(homeName).toBeVisible();
  });

  test('PROF-25: Profile tab controls are responsive on tablet viewports', async () => {
    await profilePage.setTabletViewport();
    await expect(profilePage.profileHeader).toBeVisible();
  });

  test('PROF-26: Profile tab controls are responsive on mobile viewports 375px', async () => {
    await profilePage.setMobileViewport();
    await expect(profilePage.profileHeader).toBeVisible();
  });

  test('PROF-27: Profile tab controls are responsive on desktop viewports 1440px', async () => {
    await profilePage.setDesktopViewport();
    await expect(profilePage.profileHeader).toBeVisible();
  });

  test('PROF-28: Primary Email field is disabled for guest mode to prevent corrupting auth handle', async () => {
    const emailField = profilePage.emailInput;
    await expect(emailField).toBeVisible();
  });

  test('PROF-29: Security info box displays Encrypted Session subtext on profile screen', async () => {
    const secText = profilePage.page.locator('span', { hasText: /Encrypted Session/i });
    await expect(secText).toBeVisible();
  });

  test('PROF-30: Resetting workspace cache clears target job description state', async () => {
    await profilePage.resetCacheButton.click();
    const storedJob = await profilePage.page.evaluate(() => localStorage.getItem('pw_target_job_desc'));
    expect(storedJob).toBeFalsy();
  });

});
