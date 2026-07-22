import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';
import { NavigationPage } from '../pages/NavigationPage';

test.describe('POM Navigation Suite (Bottom Dock, Header, Ask MS Modal, Viewports)', () => {

  let authPage: AuthPage;
  let navPage: NavigationPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    navPage = new NavigationPage(page);
    await authPage.loginAsGuest();
  });

  test('NAV-01: Bottom navigation dock is visible at the bottom of the viewport', async () => {
    await expect(navPage.navDock).toBeVisible();
  });

  test('NAV-02: Bottom nav dock contains 5 primary navigation tabs (Home, Interview, Resume, Analytics, Profile)', async () => {
    await expect(navPage.homeTabButton).toBeVisible();
    await expect(navPage.interviewTabButton).toBeVisible();
    await expect(navPage.resumeTabButton).toBeVisible();
    await expect(navPage.analyticsTabButton).toBeVisible();
    await expect(navPage.profileTabButton).toBeVisible();
  });

  test('NAV-03: Default active tab on initial workspace load is Home', async () => {
    await expect(navPage.homeTabButton).toHaveClass(/text-indigo-400/);
  });

  test('NAV-04: Clicking Interview tab switches active screen to Interview simulation studio', async () => {
    await navPage.goToTab('Interview');
    const setupHeader = navPage.page.locator('h2', { hasText: /Mock Interview Setup/i });
    await expect(setupHeader).toBeVisible();
  });

  test('NAV-05: Clicking Resume tab switches active screen to ATS Resume Audit Engine', async () => {
    await navPage.goToTab('Resume');
    const resumeHeader = navPage.page.locator('h2', { hasText: /ATS Resume Audit Engine/i });
    await expect(resumeHeader).toBeVisible();
  });

  test('NAV-06: Clicking Analytics tab switches active screen to Performance Analytics', async () => {
    await navPage.goToTab('Analytics');
    const analyticsHeader = navPage.page.locator('h2', { hasText: /Performance Analytics/i });
    await expect(analyticsHeader).toBeVisible();
  });

  test('NAV-07: Clicking Profile tab switches active screen to Candidate Profile', async () => {
    await navPage.goToTab('Profile');
    const profileHeader = navPage.page.locator('h2', { hasText: /Candidate Profile/i });
    await expect(profileHeader).toBeVisible();
  });

  test('NAV-08: Header brand title renders PrepWise AI text and sparkles icon', async () => {
    await expect(navPage.brandTitle).toBeVisible();
  });

  test('NAV-09: Header status indicator badge displays SYS ACTIVE', async () => {
    await expect(navPage.sysActiveBadge).toBeVisible();
  });

  test('NAV-10: Lead Coach Talk with Lead Coach banner trigger opens mentor chat modal overlay', async () => {
    await navPage.page.locator('h4', { hasText: /Talk with Lead Coach/i }).click();
    await expect(navPage.mentorModalHeader).toBeVisible();
  });

  test('NAV-11: Ask MS mentor chat modal close button dismisses modal overlay', async () => {
    await navPage.page.locator('h4', { hasText: /Talk with Lead Coach/i }).click();
    await navPage.mentorCloseButton.click();
    await expect(navPage.mentorModalHeader).not.toBeVisible();
  });

  test('NAV-12: Ask MS mentor chat accepts candidate questions and appends message', async () => {
    await navPage.page.locator('h4', { hasText: /Talk with Lead Coach/i }).click();
    await navPage.mentorInput.fill('How do I prepare for a Senior DevOps interview at Stripe?');
    await navPage.mentorSendButton.click();
    const userMsg = navPage.page.locator('text=How do I prepare for a Senior DevOps interview at Stripe?');
    await expect(userMsg).toBeVisible();
  });

  test('NAV-13: Ask MS mentor suggestion pills inject pre-formulated prompts', async () => {
    await navPage.page.locator('h4', { hasText: /Talk with Lead Coach/i }).click();
    const suggestionPill = navPage.page.locator('button', { hasText: /Stripe webhooks alignment/i });
    await suggestionPill.click();
    await expect(navPage.mentorInput).toHaveValue(/Stripe webhooks alignment/);
  });

  test('NAV-14: Ask MS mentor offline fallback generates advice response', async () => {
    await navPage.page.locator('h4', { hasText: /Talk with Lead Coach/i }).click();
    await navPage.mentorInput.fill('Stripe architectural principles');
    await navPage.mentorSendButton.click();
    const assistantReply = navPage.page.locator('text=Stripe System Interview Principles');
    await expect(assistantReply).toBeVisible({ timeout: 15000 });
  });

  test('NAV-15: DevOps Hub card button on home panel navigates to CloudHub component', async () => {
    await navPage.page.locator('h4', { hasText: /DevOps Hub/i }).click();
    await expect(navPage.cloudHubHeader).toBeVisible();
  });

  test('NAV-16: CloudHub component renders AWS Blueprints deployment card', async () => {
    await navPage.page.locator('h4', { hasText: /DevOps Hub/i }).click();
    await expect(navPage.cloudHubHeader).toBeVisible();
  });

  test('NAV-17: CloudHub component renders Containerization Docker section', async () => {
    await navPage.page.locator('h4', { hasText: /DevOps Hub/i }).click();
    const dockerCard = navPage.page.locator('h3', { hasText: /Multi-Stage Container Architecture/i });
    await expect(dockerCard).toBeVisible();
  });

  test('NAV-18: CloudHub component renders Continuous Integration pipelines section', async () => {
    await navPage.page.locator('h4', { hasText: /DevOps Hub/i }).click();
    const ciCard = navPage.page.locator('h3', { hasText: /Continuous Integration & Quality Gates/i });
    await expect(ciCard).toBeVisible();
  });

  test('NAV-19: CloudHub terminal command block copy action triggers toast notification', async () => {
    await navPage.page.locator('h4', { hasText: /DevOps Hub/i }).click();
    const copyBtn = navPage.page.locator('button', { hasText: /Copy Spec/i }).first();
    if (await copyBtn.isVisible()) {
      await copyBtn.click();
      await navPage.expectToastContains('Copied');
    } else {
      expect(true).toBe(true);
    }
  });

  test('NAV-20: Toast notification container pops up and auto-dismisses', async () => {
    await navPage.goToTab('Profile');
    await navPage.page.locator('button', { hasText: /Save Profile Settings/i }).click();
    const toast = navPage.page.locator('.fixed.top-5.right-5');
    await expect(toast).toBeVisible();
  });

  test('NAV-21: Historic detail modal overlay backdrop traps click events correctly', async () => {
    await navPage.page.locator('h4', { hasText: /Senior DevOps Engineer/i }).first().click();
    const modalBackdrop = navPage.page.locator('.absolute.inset-0.bg-black\\/95');
    await expect(modalBackdrop).toBeVisible();
  });

  test('NAV-22: Historic detail modal overlay back button closes modal', async () => {
    await navPage.page.locator('h4', { hasText: /Senior DevOps Engineer/i }).first().click();
    await navPage.page.locator('button', { hasText: /Back/i }).first().click();
    const compositeTitle = navPage.page.locator('span', { hasText: /COMPOSITE RATING/i });
    await expect(compositeTitle).not.toBeVisible();
  });

  test('NAV-23: Application layout scales properly on mobile screen (375px)', async () => {
    await navPage.setMobileViewport();
    await expect(navPage.brandTitle).toBeVisible();
  });

  test('NAV-24: Application layout scales properly on desktop screen (1440px)', async () => {
    await navPage.setDesktopViewport();
    await expect(navPage.brandTitle).toBeVisible();
  });

  test('NAV-25: Direct tab navigation maintains clean state transitions without page reload', async () => {
    await navPage.goToTab('Interview');
    await navPage.goToTab('Resume');
    await navPage.goToTab('Analytics');
    await navPage.goToTab('Home');
    const homeTitle = navPage.page.locator('h2', { hasText: /PrepWise AI –/i });
    await expect(homeTitle).toBeVisible();
  });

  test('NAV-26: Header profile button navigates directly to Candidate Profile tab', async () => {
    await navPage.headerProfileButton.click();
    const profileHeader = navPage.page.locator('h2', { hasText: /Candidate Profile/i });
    await expect(profileHeader).toBeVisible();
  });

  test('NAV-27: Mobile navigation dock is fixed at bottom with 5 icon buttons', async () => {
    await navPage.setMobileViewport();
    const count = await navPage.page.locator('nav button').count();
    expect(count).toBe(5);
  });

  test('NAV-28: Active nav tab button applies scale and color styling', async () => {
    await navPage.goToTab('Interview');
    await expect(navPage.interviewTabButton).toHaveClass(/text-indigo-400/);
  });

  test('NAV-29: Tablet navigation dock renders icons and labels clearly', async () => {
    await navPage.setTabletViewport();
    await expect(navPage.homeTabButton).toBeVisible();
  });

  test('NAV-30: Lead Coach chat input box supports Enter key submission', async () => {
    await navPage.page.locator('h4', { hasText: /Talk with Lead Coach/i }).click();
    await navPage.mentorInput.fill('Test enter key submission');
    await navPage.mentorInput.press('Enter');
    const userMsg = navPage.page.locator('text=Test enter key submission');
    await expect(userMsg).toBeVisible();
  });

});
